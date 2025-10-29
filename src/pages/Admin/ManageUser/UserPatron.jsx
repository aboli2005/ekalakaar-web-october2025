import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit, FaPlus, FaFileExport } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import "./User.css";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Admin/Navbar/Navbar1";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserArtist = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("1");

  const itemsPerPage = 10;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const toastId = toast.loading("Loading...");

      try {
        const response = await makeAuthenticatedGETRequest(
          `${BASE_URL}/admin/users?role=${getRoleByFilterOption()}`,
          token
        );

        setData(response.data);
        toast.dismiss(toastId);

        switch (filterOption) {
          case "0":
            toast.success("Artists loaded successfully");
            break;
          case "1":
            toast.success("Patrons loaded successfully");
            break;
          case "2":
            toast.success("Partners loaded successfully");
            break;
          case "3":
            toast.success("Art-Lovers loaded successfully");
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
        toast.dismiss(toastId);
        toast.error(error);
      }
    };

    getUser();
  }, [filterOption, token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    setSearchQuery("");
    setCurrentPage(0);
  };

  const getRoleByFilterOption = () => {
    switch (filterOption) {
      case "1":
        return "Patron";
      case "2":
        return "Partner";
      case "3":
        return "Art-lover";
      default:
        return "Artist";
    }
  };

  // Export to CSV function
  const exportToCSV = () => {
    if (!filteredData || filteredData.length === 0) {
      toast.warning("No data to export");
      return;
    }

    const toastId = toast.loading("Preparing export...");

    try {
      const headers = [
        "Custom ID",
        "First Name",
        "Email",
        "Phone No",
        "Registered On",
        "Status",
        "Approval",
        "Role",
      ];

      const csvRows = [
        headers.join(","),
        ...filteredData.map((item) => {
          return [
            `"${item.customID || ""}"`,
            `"${item.firstName || ""}"`,
            `"${item.email || ""}"`,
            `"${item.phoneNumber?.number || ""}"`,
            `"${item.createdAt || ""}"`,
            item.blocked ? "Blocked" : "Active",
            item.approved ? "Approved" : "Rejected",
            `"${getRoleByFilterOption()}"`,
          ].join(",");
        }),
      ];

      const csvContent = csvRows.join("\n");
      const BOM = "\uFEFF";

      const blob = new Blob([BOM + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${getRoleByFilterOption().toLowerCase()}_users_${
          new Date().toISOString().split("T")[0]
        }.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.dismiss(toastId);
      toast.success("Data exported successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to export data");
      console.error("Export error:", error);
    }
  };

  // Export to Excel function
  const exportToExcel = () => {
    if (!filteredData || filteredData.length === 0) {
      toast.warning("No data to export");
      return;
    }

    const toastId = toast.loading("Preparing export...");

    try {
      let tableHTML = `
        <table border="1">
          <thead>
            <tr>
              <th>Custom ID</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Registered On</th>
              <th>Status</th>
              <th>Approval</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
      `;

      filteredData.forEach((item) => {
        tableHTML += `
          <tr>
            <td>${item.customID || ""}</td>
            <td>${item.firstName || ""}</td>
            <td>${item.email || ""}</td>
            <td>${item.phoneNumber?.number || ""}</td>
            <td>${item.createdAt || ""}</td>
            <td>${item.blocked ? "Blocked" : "Active"}</td>
            <td>${item.approved ? "Approved" : "Rejected"}</td>
            <td>${getRoleByFilterOption()}</td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      const blob = new Blob([tableHTML], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${getRoleByFilterOption().toLowerCase()}_users_${
          new Date().toISOString().split("T")[0]
        }.xls`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.dismiss(toastId);
      toast.success("Data exported successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to export data");
      console.error("Export error:", error);
    }
  };

  const filteredData =
    data &&
    data.filter(
      (item) =>
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.phoneNumber &&
          item.phoneNumber.number.includes(searchQuery.toLowerCase()))
    );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  function toggleBlock(e) {
    if (e.target.textContent === "Block") {
      e.target.style.color = "#00FF38";
      e.target.textContent = "Unblock";
    } else {
      e.target.style.color = "#FF0018";
      e.target.textContent = "Block";
    }
  }

  function toggleApproved(e) {
    if (e.target.textContent === "Rejected") {
      e.target.style.color = "#00FF38";
      e.target.textContent = "Approved";
    } else {
      e.target.style.color = "#FF0018";
      e.target.textContent = "Rejected";
    }
  }

  function toggleverify(e) {
    if (e.target.textContent === "Verify") {
      e.target.style.color = "#00FF38";
      e.target.textContent = "Verified";
    } else {
      e.target.style.color = "#FC9904";
      e.target.textContent = "Verify";
    }
  }

  return (
    <div className="usercontainer">
      <AdminNavbar />
      <div className="row-container">
        <h2>
          Manage Users -
          <span style={{ color: "#AD2F3B" }}>
            {filterOption === "0" && "Artists"}
            {filterOption === "1" && "Patrons"}
            {filterOption === "2" && "Partners"}
            {filterOption === "3" && "Art-Lovers"}
          </span>
        </h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={exportToExcel} className="export-btn">
            <FaFileExport /> Export to Excel
          </button>
          <FaPlus className="plus" title={`Add ${getRoleByFilterOption()}`} />
        </div>
      </div>
      <div className="filter-dropdown">
        <div className="searchbar">
          <IoSearch className="searchicon" />
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filterdrop">
          Filter
          <select
            className="artistfilter"
            onChange={handleFilterChange}
            value={filterOption}
          >
            <option value="0">Artist</option>
            <option value="1">Patron</option>
            <option value="2">Partner</option>
            <option value="3">Art-Lover</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Custom Id</th>
            <th>
              First <br /> Name
            </th>
            <th>Email</th>
            <th>Phone No</th>
            <th>
              Registered
              <br /> On
            </th>
            <th>
              Block/ <br /> Unblock
            </th>
            <th>
              Approve/ <br />
              Reject
            </th>
            <th>Verify</th>
             <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="table_body">
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.customID}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber?.number}</td>
                <td>{item.createdAt}</td>
                <td className="block" onClick={(e) => toggleBlock(e)}>
                  {item.blocked ? "Unblock" : "Block"}
                </td>
                <td className="approve" onClick={(e) => toggleApproved(e)}>
                  {item.approved ? "Approved" : "Rejected"}
                </td>
                <td className="verify" onClick={(e) => toggleverify(e)}>
                  {item.approved ? "Verify" : "Verified"}
                </td>
                <td className="viewicon">
                  {/* <FaRegEdit title="Edit" className="edit" /> */}
                  <BsFillEyeFill
                    title="View"
                    onClick={() => {
                      localStorage.setItem("artId", item._id);
                      navigate("/artistProfile");
                    }}
                    className="view"
                  />
                  <RiDeleteBin6Line title="Delete" className="delete" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default UserArtist;
