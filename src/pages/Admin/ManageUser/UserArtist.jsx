import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit, FaPlus, FaFileExport } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "../../Admin/Navbar/Navbar1";
import "./User.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserArtist = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("0");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const getUser = async () => {
      const toastId = toast.loading("Loading...");
      try {
        const response = await fetch(
          `${BASE_URL}/admin/user?role=${getRoleByFilterOption()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();

        // ✅ Sort latest first on load
        const sorted = responseData.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setData(sorted);
        toast.dismiss(toastId);
        toast.success(`${getRoleByFilterOption()}s loaded successfully`);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.dismiss(toastId);
        toast.error("Failed to load data");
      }
    };

    getUser();
  }, [filterOption]);

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

  // 🔎 Search + Filters + Sorting
  let filteredData = data.filter((item) => {
    const matchesSearch =
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phoneNumber && item.phoneNumber.number.includes(searchQuery));

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "approved"
        ? item.approved
        : !item.approved;

    const matchesDate = dateFilter
      ? new Date(item.createdAt).toDateString() ===
        new Date(dateFilter).toDateString()
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // ✅ Sorting
  filteredData = filteredData.sort((a, b) => {
    switch (sortOption) {
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "name-asc":
        return a.firstName.localeCompare(b.firstName);
      case "name-desc":
        return b.firstName.localeCompare(a.firstName);
      case "email-asc":
        return a.email.localeCompare(b.email);
      case "email-desc":
        return b.email.localeCompare(a.email);
      default: // latest
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // 📄 Pagination
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Export to Excel function
  const exportToExcel = () => {
    if (!filteredData || filteredData.length === 0) {
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
              <th>Custom ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Registered On</th>
              <th>Status</th>
              <th>Approval</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
      `;

      filteredData.forEach((item) => {
        tableHTML += `
          <tr>
            <td>${item.customID || ""}</td>
            <td>${item.firstName || ""}</td>
            <td>${item.lastName || ""}</td>
            <td>${item.email || ""}</td>
            <td>${item.phoneNumber?.number || ""}</td>
            <td>${getRoleByFilterOption()}</td>
            <td>${new Date(item.createdAt).toLocaleString()}</td>
            <td>${item.blocked ? "Blocked" : "Active"}</td>
            <td>${item.approved ? "Approved" : "Rejected"}</td>
            <td>${item.verified ? "Verified" : "Not Verified"}</td>
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
        `${getRoleByFilterOption()}_users_${
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

  // 🗑️ Delete
  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user?")) return;

    const toastId = toast.loading("Deleting...");
    try {
      const response = await fetch(`${BASE_URL}/admin/deleteuser/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setData((prev) => prev.filter((u) => u._id !== userId));
        toast.update(toastId, {
          render: "User deleted",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      toast.update(toastId, {
        render: `Error: ${err.message}`,
        type: "error",
        isLoading: false,
      });
    }
  };

  // 🗑️ Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast.warning("Select at least one user");
      return;
    }

    if (!window.confirm("Delete selected users?")) return;

    const toastId = toast.loading("Deleting...");
    try {
      await Promise.all(
        selectedUsers.map((id) =>
          fetch(`${BASE_URL}/admin/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        )
      );

      setData((prev) => prev.filter((u) => !selectedUsers.includes(u._id)));
      setSelectedUsers([]);

      toast.update(toastId, {
        render: "Users deleted",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: `Error: ${err.message}`,
        type: "error",
        isLoading: false,
      });
    }
  };

  // 🟢 Toggle Handlers
  const toggleBlock = (e) => {
    e.target.textContent =
      e.target.textContent === "Block" ? "Unblock" : "Block";
    e.target.className =
      e.target.textContent === "Block"
        ? "badge badge-block"
        : "badge badge-unblock";
  };

  const toggleApproved = (e) => {
    e.target.textContent =
      e.target.textContent === "Rejected" ? "Approved" : "Rejected";
    e.target.className =
      e.target.textContent === "Approved"
        ? "badge badge-approved"
        : "badge badge-rejected";
  };

  const toggleVerify = (e) => {
    e.target.textContent =
      e.target.textContent === "Verify" ? "Verified" : "Verify";
    e.target.className =
      e.target.textContent === "Verify"
        ? "badge badge-verify"
        : "badge badge-verified";
  };

  return (
    <>
      <AdminNavbar />
      <div className="usercontainer">
        <div className="row-container">
          <h2>
            Manage Users -{" "}
            <span style={{ color: "#AD2F3B" }}>
              {getRoleByFilterOption()}s
            </span>
          </h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={exportToExcel} className="export-btn">
              <FaFileExport /> Export to Excel
            </button>
            <FaPlus className="plus" title="Add User" />
          </div>
        </div>

        {/* 🔎 Filters */}
        <div className="filters-container">
          <div className="searchbar">
            <IoSearch className="searchicon" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            onChange={(e) => setFilterOption(e.target.value)}
            value={filterOption}
          >
            <option value="0">Artist</option>
            <option value="1">Patron</option>
            <option value="2">Partner</option>
            <option value="3">Art-Lover</option>
          </select>

          <select
            className="filter-select"
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            type="date"
            className="filter-select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <select
            className="filter-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="email-asc">Email (A–Z)</option>
            <option value="email-desc">Email (Z–A)</option>
          </select>
        </div>

        {/* 🗑️ Bulk delete */}
        <button className="delete-selected-button" onClick={handleBulkDelete}>
          Delete Selected
        </button>

        {/* 📊 Table */}
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? setSelectedUsers(currentItems.map((u) => u._id))
                      : setSelectedUsers([])
                  }
                  checked={
                    selectedUsers.length === currentItems.length &&
                    currentItems.length > 0
                  }
                />
              </th>
              <th>Custom Id</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registered On</th>
              <th>Block</th>
              <th>Approve</th>
              <th>Verify</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(item._id)}
                    onChange={() =>
                      setSelectedUsers((prev) =>
                        prev.includes(item._id)
                          ? prev.filter((id) => id !== item._id)
                          : [...prev, item._id]
                      )
                    }
                  />
                </td>
                <td>{item.customID}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber?.number}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td onClick={toggleBlock}>
                  <span
                    className={`badge ${
                      item.blocked ? "badge-unblock" : "badge-block"
                    }`}
                  >
                    {item.blocked ? "Unblock" : "Block"}
                  </span>
                </td>
                <td onClick={toggleApproved}>
                  <span
                    className={`badge ${
                      item.approved ? "badge-approved" : "badge-rejected"
                    }`}
                  >
                    {item.approved ? "Approved" : "Rejected"}
                  </span>
                </td>
                <td onClick={toggleVerify}>
                  <span
                    className={`badge ${
                      item.verified ? "badge-verified" : "badge-verify"
                    }`}
                  >
                    {item.verified ? "Verified" : "Verify"}
                  </span>
                </td>
                <td className="viewicon">
                  {/* <FaRegEdit title="Edit" className="edit" /> */}
                  <BsFillEyeFill
                    title="View"
                    className="view"
                    onClick={() => {
                      localStorage.setItem("artId", item._id);
                      navigate("/artistProfile");
                    }}
                  />
                  <RiDeleteBin6Line
                    title="Delete"
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 📄 Pagination */}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default UserArtist;




// import React, { useState, useEffect } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaRegEdit, FaPlus } from "react-icons/fa";
// import { BsFillEyeFill } from "react-icons/bs";
// import { IoSearch } from "react-icons/io5";
// import ReactPaginate from "react-paginate";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// import AdminNavbar from "../../Admin/Navbar/Navbar1";
// import "./User.css";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const UserArtist = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterOption, setFilterOption] = useState("0");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("");
//   const [sortOption, setSortOption] = useState("latest");
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   const token = localStorage.getItem("accessToken");
//   const navigate = useNavigate();

//   const itemsPerPage = 10;

//   useEffect(() => {
//     const getUser = async () => {
//       const toastId = toast.loading("Loading...");
//       try {
//         const response = await fetch(
//           `${BASE_URL}/admin/user?role=${getRoleByFilterOption()}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const responseData = await response.json();

//         const sorted = responseData.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );

//         setData(sorted);
//         toast.dismiss(toastId);
//         toast.success(`${getRoleByFilterOption()}s loaded successfully`);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         toast.dismiss(toastId);
//         toast.error("Failed to load data");
//       }
//     };

//     getUser();
//   }, [filterOption]);

//   const getRoleByFilterOption = () => {
//     switch (filterOption) {
//       case "1":
//         return "Patron";
//       case "2":
//         return "Partner";
//       case "3":
//         return "Art-lover";
//       default:
//         return "Artist";
//     }
//   };

//   // Search + Filters + Sorting
//   let filteredData = data.filter((item) => {
//     const matchesSearch =
//       item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (item.phoneNumber && item.phoneNumber.number.includes(searchQuery));

//     const matchesStatus =
//       statusFilter === "all"
//         ? true
//         : statusFilter === "approved"
//         ? item.approved
//         : !item.approved;

//     const matchesDate = dateFilter
//       ? new Date(item.createdAt).toDateString() ===
//         new Date(dateFilter).toDateString()
//       : true;

//     return matchesSearch && matchesStatus && matchesDate;
//   });

//   // Sorting
//   filteredData = filteredData.sort((a, b) => {
//     switch (sortOption) {
//       case "oldest":
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       case "name-asc":
//         return a.firstName.localeCompare(b.firstName);
//       case "name-desc":
//         return b.firstName.localeCompare(a.firstName);
//       case "email-asc":
//         return a.email.localeCompare(b.email);
//       case "email-desc":
//         return b.email.localeCompare(a.email);
//       default:
//         return new Date(b.createdAt) - new Date(a.createdAt);
//     }
//   });

//   // Pagination
//   const pageCount = Math.ceil(filteredData.length / itemsPerPage);
//   const indexOfLastItem = (currentPage + 1) * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageClick = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   // Delete
//   const handleDelete = async (userId) => {
//     if (!window.confirm("Delete this user?")) return;

//     const toastId = toast.loading("Deleting...");
//     try {
//       const response = await fetch(`${BASE_URL}/admin/deleteuser/${userId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         setData((prev) => prev.filter((u) => u._id !== userId));
//         toast.update(toastId, {
//           render: "User deleted",
//           type: "success",
//           isLoading: false,
//           autoClose: 2000,
//         });
//       } else {
//         throw new Error("Delete failed");
//       }
//     } catch (err) {
//       toast.update(toastId, {
//         render: `Error: ${err.message}`,
//         type: "error",
//         isLoading: false,
//       });
//     }
//   };

//   // Bulk Delete
//   const handleBulkDelete = async () => {
//     if (selectedUsers.length === 0) {
//       toast.warning("Select at least one user");
//       return;
//     }

//     if (!window.confirm("Delete selected users?")) return;

//     const toastId = toast.loading("Deleting...");
//     try {
//       await Promise.all(
//         selectedUsers.map((id) =>
//           fetch(`${BASE_URL}/admin/deleteuser/${id}`, {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           })
//         )
//       );

//       setData((prev) => prev.filter((u) => !selectedUsers.includes(u._id)));
//       setSelectedUsers([]);

//       toast.update(toastId, {
//         render: "Users deleted",
//         type: "success",
//         isLoading: false,
//         autoClose: 2000,
//       });
//     } catch (err) {
//       toast.update(toastId, {
//         render: `Error: ${err.message}`,
//         type: "error",
//         isLoading: false,
//       });
//     }
//   };

//   // ✅ FIXED: Block/Unblock Handler with API Call
//   const toggleBlock = async (userId, currentBlockedStatus) => {
//     const action = currentBlockedStatus ? "unblock" : "block";
//     const toastId = toast.loading(`${action}ing user...`);

//     try {
//       // Update API endpoint according to your backend
//       // Common patterns: PATCH or PUT to /admin/user/:id/block
//       const response = await fetch(`${BASE_URL}/admin/user/${userId}/block`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ blocked: !currentBlockedStatus }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to ${action} user`);
//       }

//       const result = await response.json();

//       // Update local state
//       setData((prevData) =>
//         prevData.map((user) =>
//           user._id === userId
//             ? { ...user, blocked: !currentBlockedStatus }
//             : user
//         )
//       );

//       toast.update(toastId, {
//         render: `User ${action}ed successfully`,
//         type: "success",
//         isLoading: false,
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.error(`Error ${action}ing user:`, error);
//       toast.update(toastId, {
//         render: `Failed to ${action} user`,
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   // ✅ FIXED: Approve/Reject Handler with API Call
//   const toggleApproved = async (userId, currentApprovedStatus) => {
//     const action = currentApprovedStatus ? "reject" : "approve";
//     const toastId = toast.loading(`${action}ing user...`);

//     try {
//       const response = await fetch(`${BASE_URL}/admin/user/${userId}/approve`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ approved: !currentApprovedStatus }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to ${action} user`);
//       }

//       // Update local state
//       setData((prevData) =>
//         prevData.map((user) =>
//           user._id === userId
//             ? { ...user, approved: !currentApprovedStatus }
//             : user
//         )
//       );

//       toast.update(toastId, {
//         render: `User ${action}d successfully`,
//         type: "success",
//         isLoading: false,
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.error(`Error ${action}ing user:`, error);
//       toast.update(toastId, {
//         render: `Failed to ${action} user`,
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   // ✅ FIXED: Verify Handler with API Call
//   const toggleVerify = async (userId, currentVerifiedStatus) => {
//     const action = currentVerifiedStatus ? "unverify" : "verify";
//     const toastId = toast.loading(`${action}ing user...`);

//     try {
//       const response = await fetch(`${BASE_URL}/admin/user/${userId}/verify`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ verified: !currentVerifiedStatus }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to ${action} user`);
//       }

//       // Update local state
//       setData((prevData) =>
//         prevData.map((user) =>
//           user._id === userId
//             ? { ...user, verified: !currentVerifiedStatus }
//             : user
//         )
//       );

//       toast.update(toastId, {
//         render: `User ${action}ed successfully`,
//         type: "success",
//         isLoading: false,
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.error(`Error ${action}ing user:`, error);
//       toast.update(toastId, {
//         render: `Failed to ${action} user`,
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="usercontainer">
//         <div className="row-container">
//           <h2>
//             Manage Users -{" "}
//             <span style={{ color: "#AD2F3B" }}>
//               {getRoleByFilterOption()}s
//             </span>
//           </h2>
//           <FaPlus className="plus" title="Add User" />
//         </div>

//         {/* Filters */}
//         <div className="filters-container">
//           <div className="searchbar">
//             <IoSearch className="searchicon" />
//             <input
//               type="search"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <select
//             className="filter-select"
//             onChange={(e) => setFilterOption(e.target.value)}
//             value={filterOption}
//           >
//             <option value="0">Artist</option>
//             <option value="1">Patron</option>
//             <option value="2">Partner</option>
//             <option value="3">Art-Lover</option>
//           </select>

//           <select
//             className="filter-select"
//             onChange={(e) => setStatusFilter(e.target.value)}
//             value={statusFilter}
//           >
//             <option value="all">All</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>

//           <input
//             type="date"
//             className="filter-select"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//           />

//           <select
//             className="filter-select"
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//           >
//             <option value="latest">Latest</option>
//             <option value="oldest">Oldest</option>
//             <option value="name-asc">Name (A–Z)</option>
//             <option value="name-desc">Name (Z–A)</option>
//             <option value="email-asc">Email (A–Z)</option>
//             <option value="email-desc">Email (Z–A)</option>
//           </select>
//         </div>

//         {/* Bulk delete */}
//         <button className="delete-selected-button" onClick={handleBulkDelete}>
//           Delete Selected
//         </button>

//         {/* Table */}
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   onChange={(e) =>
//                     e.target.checked
//                       ? setSelectedUsers(currentItems.map((u) => u._id))
//                       : setSelectedUsers([])
//                   }
//                   checked={
//                     selectedUsers.length === currentItems.length &&
//                     currentItems.length > 0
//                   }
//                 />
//               </th>
//               <th>Custom Id</th>
//               <th>First Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Registered On</th>
//               <th>Block</th>
//               <th>Approve</th>
//               <th>Verify</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentItems.map((item) => (
//               <tr key={item._id}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedUsers.includes(item._id)}
//                     onChange={() =>
//                       setSelectedUsers((prev) =>
//                         prev.includes(item._id)
//                           ? prev.filter((id) => id !== item._id)
//                           : [...prev, item._id]
//                       )
//                     }
//                   />
//                 </td>
//                 <td>{item.customID}</td>
//                 <td>{item.firstName}</td>
//                 <td>{item.email}</td>
//                 <td>{item.phoneNumber?.number}</td>
//                 <td>{new Date(item.createdAt).toLocaleString()}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       item.blocked ? "badge-unblock" : "badge-block"
//                     }`}
//                     onClick={() => toggleBlock(item._id, item.blocked)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {item.blocked ? "Unblock" : "Block"}
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       item.approved ? "badge-approved" : "badge-rejected"
//                     }`}
//                     onClick={() => toggleApproved(item._id, item.approved)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {item.approved ? "Approved" : "Rejected"}
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       item.verified ? "badge-verified" : "badge-verify"
//                     }`}
//                     onClick={() => toggleVerify(item._id, item.verified)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {item.verified ? "Verified" : "Verify"}
//                   </span>
//                 </td>
//                 <td className="viewicon">
//                   {/* <FaRegEdit title="Edit" className="edit" /> */}
//                   <BsFillEyeFill
//                     title="View"
//                     className="view"
//                     onClick={() => {
//                       localStorage.setItem("artId", item._id);
//                       navigate("/artistProfile");
//                     }}
//                   />
//                   <RiDeleteBin6Line
//                     title="Delete"
//                     className="delete"
//                     onClick={() => handleDelete(item._id)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <ReactPaginate
//           previousLabel={"<"}
//           nextLabel={">"}
//           breakLabel={"..."}
//           pageCount={pageCount}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     </>
//   );
// };

// export default UserArtist;