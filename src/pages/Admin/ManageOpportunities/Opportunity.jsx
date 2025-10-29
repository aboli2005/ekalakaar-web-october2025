// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { toast } from "react-toastify";
// import {
//   FaPlus,
//   FaRegEdit,
// } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { BsFillEyeFill } from "react-icons/bs";
// import AdminNavbar from "../../Admin/Navbar/Navbar1";
// import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
// import "../ManageUser/User.css";
// import "react-toastify/dist/ReactToastify.css";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const ManageOpportunity = () => {
//   const [data, setData] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [oppApp, setOppApp] = useState([]);
//   const itemsPerPage = 10;

//   const navigateto = useNavigate();
//   const token = localStorage.getItem("accessToken");

//   const pageCount = Math.ceil(data?.length / itemsPerPage);

//   const handlePageClick = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   const getOppApplications = async (id) => {
//     try {
//       const response = await makeAuthenticatedGETRequest(
//         `${BASE_URL}/admin/oppapps?opportunityId=${id}`,
//         token
//       );
//       return response.length;
//     } catch (error) {
//       console.log("Error fetching application data:", error);
//     }
//   };

//   const getOpportunity = async () => {
//     const toastId = toast.loading("Loading...");
//     try {
//       const response = await makeAuthenticatedGETRequest(
//         `${BASE_URL}/admin/opps`,
//         token
//       );

//       setData(response.data);

//       const newOppAppPromises = response.data.map((item) =>
//         getOppApplications(item.id)
//       );
//       const newOppApp = await Promise.all(newOppAppPromises);
//       setOppApp(newOppApp);

//       toast.dismiss(toastId);
//       toast.success("Opportunities loaded successfully");
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error("Error fetching opportunity data");
//     }
//   };

//   useEffect(() => {
//     getOpportunity();
//   }, []);

//   const deleteOpportunity = async (id) => {
//     const toastId = toast.loading("Deleting...");
//     try {
//       const response = await fetch(`${BASE_URL}/admin/deleteopps?id=${id}`, {
//         method: "DELETE",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const responsedata = await response.json();
//       toast.dismiss(toastId);

//       if (responsedata.success) {
//         toast.success("Successfully deleted opportunity");
//         getOpportunity();
//       }
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error("Error deleting opportunity");
//     }
//   };

//   const handleSearch = () => {
//     if (!searchId) {
//       getOpportunity();
//       return;
//     }
//     const filteredData = data.filter((item) =>
//       item.purpose.toLowerCase().includes(searchId.toLowerCase())
//     );
//     setData(filteredData);
//   };

//   const indexOfLastItem = (currentPage + 1) * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

//   const Clicked = (id) => {
//     navigateto("/OppProfile");
//     localStorage.setItem("oppid", id);
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="usercontainer">
//         {/* Header Row */}
//         <div className="row-container">
//           <h2>Manage Opportunities</h2>
//           <Link to="/UploadOpportunities" className="add-btn">
//             <FaPlus /> Add Opportunity
//           </Link>
//         </div>

//         {/* Search Bar */}
//         <div className="filter-bar">
//           <div className="searchbar">
//             <IoSearch className="searchicon" />
//             <input
//               type="search"
//               placeholder="Search by Name"
//               onChange={(e) => setSearchId(e.target.value)}
//               className="search"
//             />
//             <button onClick={handleSearch} className="search-btn">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-wrapper">
//           <table className="styled-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Actions</th>
//                 <th>Status</th>
//                 <th>Approval</th>
//                 <th>Language</th>
//                 <th>Budget</th>
//                 <th>Location</th>
//                 <th>Applications</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems &&
//                 currentItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.purpose}</td>
//                     <td className="action-icons">
//                       <FaRegEdit
//                         title="Edit"
//                         onClick={() => {
//                           localStorage.setItem("oppid", item.id);
//                           navigateto("/EditOpportunity");
//                         }}
//                       />
//                       <BsFillEyeFill
//                         title="View"
//                         onClick={() => Clicked(item.id)}
//                       />
//                       <RiDeleteBin6Line
//                         title="Delete"
//                         onClick={() => deleteOpportunity(item.id)}
//                       />
//                     </td>
//                     <td className={`status ${item.blocked ? "blocked" : "active"}`}>
//                       {item.blocked ? "Blocked" : "Active"}
//                     </td>
//                     <td
//                       className={`approval ${
//                         item.approved ? "approved" : "rejected"
//                       }`}
//                     >
//                       {item.approved ? "Approved" : "Rejected"}
//                     </td>
//                     <td>{item.languages}</td>
//                     <td>₹{item.budget}</td>
//                     <td>{item.location}</td>
//                     <td className="applications">
//                       <Link
//                         to="/OppApplications"
//                         onClick={() =>
//                           localStorage.setItem("oppApplicationsId", item.id)
//                         }
//                         className="Opp_App_button"
//                       >
//                         {oppApp[index]}
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <ReactPaginate
//           previousLabel={"<"}
//           nextLabel={">"}
//           breakLabel={"..."}
//           pageCount={pageCount}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     </>
//   );
// };

// export default ManageOpportunity;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaRegEdit,
  FaFileExport,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import "../ManageUser/User.css";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ManageOpportunity = () => {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [oppApp, setOppApp] = useState([]);
  const itemsPerPage = 10;

  const navigateto = useNavigate();
  const token = localStorage.getItem("accessToken");

  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const getOppApplications = async (id) => {
    try {
      const response = await makeAuthenticatedGETRequest(
        `${BASE_URL}/admin/oppapps?opportunityId=${id}`,
        token
      );
      return response.length;
    } catch (error) {
      console.log("Error fetching application data:", error);
    }
  };

  const getOpportunity = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await makeAuthenticatedGETRequest(
        `${BASE_URL}/admin/opps`,
        token
      );

      setData(response.data);

      const newOppAppPromises = response.data.map((item) =>
        getOppApplications(item.id)
      );
      const newOppApp = await Promise.all(newOppAppPromises);
      setOppApp(newOppApp);

      toast.dismiss(toastId);
      toast.success("Opportunities loaded successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error fetching opportunity data");
    }
  };

  useEffect(() => {
    getOpportunity();
  }, []);

  const deleteOpportunity = async (id) => {
    const toastId = toast.loading("Deleting...");
    try {
      const response = await fetch(`${BASE_URL}/admin/deleteopps?id=${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responsedata = await response.json();
      toast.dismiss(toastId);

      if (responsedata.success) {
        toast.success("Successfully deleted opportunity");
        getOpportunity();
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error deleting opportunity");
    }
  };

  const handleSearch = () => {
    if (!searchId) {
      getOpportunity();
      return;
    }
    const filteredData = data.filter((item) =>
      item.purpose.toLowerCase().includes(searchId.toLowerCase())
    );
    setData(filteredData);
  };

  // Export to CSV function
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      toast.warning("No data to export");
      return;
    }

    const toastId = toast.loading("Preparing export...");

    try {
      // Define CSV headers
      const headers = [
        "Name",
        "Status",
        "Approval",
        "Language",
        "Budget",
        "Location",
        "Applications",
        "ID",
      ];

      // Create CSV rows
      const csvRows = [
        headers.join(","), // Header row
        ...data.map((item, index) => {
          return [
            `"${item.purpose || ""}"`,
            item.blocked ? "Blocked" : "Active",
            item.approved ? "Approved" : "Rejected",
            `"${item.languages || ""}"`,
            item.budget || 0,
            `"${item.location || ""}"`,
            oppApp[index] || 0,
            item.id || "",
          ].join(",");
        }),
      ];

      // Combine all rows
      const csvContent = csvRows.join("\n");

      // Create Blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `opportunities_${new Date().toISOString().split("T")[0]}.csv`
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

  // Export to Excel function (using HTML table method)
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      toast.warning("No data to export");
      return;
    }

    const toastId = toast.loading("Preparing export...");

    try {
      // Create HTML table
      let tableHTML = `
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Approval</th>
              <th>Language</th>
              <th>Budget</th>
              <th>Location</th>
              <th>Applications</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach((item, index) => {
        tableHTML += `
          <tr>
            <td>${item.purpose || ""}</td>
            <td>${item.blocked ? "Blocked" : "Active"}</td>
            <td>${item.approved ? "Approved" : "Rejected"}</td>
            <td>${item.languages || ""}</td>
            <td>${item.budget || 0}</td>
            <td>${item.location || ""}</td>
            <td>${oppApp[index] || 0}</td>
            <td>${item.id || ""}</td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      // Create Blob and download
      const blob = new Blob([tableHTML], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `opportunities_${new Date().toISOString().split("T")[0]}.xls`
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

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const Clicked = (id) => {
    navigateto("/OppProfile");
    localStorage.setItem("oppid", id);
  };

  return (
    <>
      <AdminNavbar />
      <div className="usercontainer">
        {/* Header Row */}
        <div className="row-container">
          <h2>Manage Opportunities</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={exportToExcel} className="export-btn">
              <FaFileExport /> Export to Excel
            </button>
            <Link to="/UploadOpportunities" className="add-btn">
              <FaPlus /> Add Opportunity
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="filter-bar">
          <div className="searchbar">
            <IoSearch className="searchicon" />
            <input
              type="search"
              placeholder="Search by Name"
              onChange={(e) => setSearchId(e.target.value)}
              className="search"
            />
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
                <th> Approval</th>
                <th>Status</th>
                <th>Language</th>
                <th>Budget</th>
                <th>Location</th>
                <th>Applications</th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.purpose}</td>
                    <td className="action-icons">
                      <FaRegEdit
                        title="Edit"
                        onClick={() => {
                          localStorage.setItem("oppid", item.id);
                          navigateto("/EditOpportunity");
                        }}
                      />
                      <BsFillEyeFill
                        title="View"
                        onClick={() => Clicked(item.id)}
                      />
                      <RiDeleteBin6Line
                        title="Delete"
                        onClick={() => deleteOpportunity(item.id)}
                      />
                    </td>
                     <td
                      className={`approval ${
                        item.approved ? "approved" : "Not hired"
                      }`}
                    >
                      {item.approved ? "Approved" : "Not hired"}
                    </td>
                    <td className={`status ${item.blocked ? "blocked" : "active"}`}>
                      {item.blocked ? "Blocked" : "Active"}
                    </td>
                   
                    <td>{item.languages}</td>
                    <td>₹{item.budget}</td>
                    <td>{item.location}</td>
                    <td className="applications">
                      <Link
                        to="/OppApplications"
                        onClick={() =>
                          localStorage.setItem("oppApplicationsId", item.id)
                        }
                        className="Opp_App_button"
                      >
                        {oppApp[index]}
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default ManageOpportunity;