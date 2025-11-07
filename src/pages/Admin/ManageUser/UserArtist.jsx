// import React, { useState, useEffect } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaRegEdit, FaPlus, FaFileExport } from "react-icons/fa";
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

//         // ✅ Sort latest first on load
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

//   // 🔎 Search + Filters + Sorting
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

//   // ✅ Sorting
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
//       default: // latest
//         return new Date(b.createdAt) - new Date(a.createdAt);
//     }
//   });

//   // 📄 Pagination
//   const pageCount = Math.ceil(filteredData.length / itemsPerPage);
//   const indexOfLastItem = (currentPage + 1) * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageClick = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   // Export to Excel function
//   const exportToExcel = () => {
//     if (!filteredData || filteredData.length === 0) {
//       toast.warning("No data to export");
//       return;
//     }

//     const toastId = toast.loading("Preparing export...");

//     try {
//       // Create HTML table
//       let tableHTML = `
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Custom ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Role</th>
//               <th>Registered On</th>
//               <th>Status</th>
//               <th>Approval</th>
//               <th>Verified</th>
//             </tr>
//           </thead>
//           <tbody>
//       `;

//       filteredData.forEach((item) => {
//         tableHTML += `
//           <tr>
//             <td>${item.customID || ""}</td>
//             <td>${item.firstName || ""}</td>
//             <td>${item.lastName || ""}</td>
//             <td>${item.email || ""}</td>
//             <td>${item.phoneNumber?.number || ""}</td>
//             <td>${getRoleByFilterOption()}</td>
//             <td>${new Date(item.createdAt).toLocaleString()}</td>
//             <td>${item.blocked ? "Blocked" : "Active"}</td>
//             <td>${item.approved ? "Approved" : "Rejected"}</td>
//             <td>${item.verified ? "Verified" : "Not Verified"}</td>
//           </tr>
//         `;
//       });

//       tableHTML += `
//           </tbody>
//         </table>
//       `;

//       // Create Blob and download
//       const blob = new Blob([tableHTML], {
//         type: "application/vnd.ms-excel;charset=utf-8;",
//       });
//       const link = document.createElement("a");
//       const url = URL.createObjectURL(blob);

//       link.setAttribute("href", url);
//       link.setAttribute(
//         "download",
//         `${getRoleByFilterOption()}_users_${
//           new Date().toISOString().split("T")[0]
//         }.xls`
//       );
//       link.style.visibility = "hidden";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.dismiss(toastId);
//       toast.success("Data exported successfully!");
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error("Failed to export data");
//       console.error("Export error:", error);
//     }
//   };

//   // 🗑️ Delete
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

//   // 🗑️ Bulk Delete
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

//   // 🟢 Toggle Handlers
//   const toggleBlock = (e) => {
//     e.target.textContent =
//       e.target.textContent === "Block" ? "Unblock" : "Block";
//     e.target.className =
//       e.target.textContent === "Block"
//         ? "badge badge-block"
//         : "badge badge-unblock";
//   };

//   const toggleApproved = (e) => {
//     e.target.textContent =
//       e.target.textContent === "Rejected" ? "Approved" : "Rejected";
//     e.target.className =
//       e.target.textContent === "Approved"
//         ? "badge badge-approved"
//         : "badge badge-rejected";
//   };

//   const toggleVerify = (e) => {
//     e.target.textContent =
//       e.target.textContent === "Verify" ? "Verified" : "Verify";
//     e.target.className =
//       e.target.textContent === "Verify"
//         ? "badge badge-verify"
//         : "badge badge-verified";
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
//           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//             <button onClick={exportToExcel} className="export-btn">
//               <FaFileExport /> Export to Excel
//             </button>
//             <FaPlus className="plus" title="Add User" />
//           </div>
//         </div>

//         {/* 🔎 Filters */}
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

//         {/* 🗑️ Bulk delete */}
//         <button className="delete-selected-button" onClick={handleBulkDelete}>
//           Delete Selected
//         </button>

//         {/* 📊 Table */}
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
//                 <td onClick={toggleBlock}>
//                   <span
//                     className={`badge ${
//                       item.blocked ? "badge-unblock" : "badge-block"
//                     }`}
//                   >
//                     {item.blocked ? "Unblock" : "Block"}
//                   </span>
//                 </td>
//                 <td onClick={toggleApproved}>
//                   <span
//                     className={`badge ${
//                       item.approved ? "badge-approved" : "badge-rejected"
//                     }`}
//                   >
//                     {item.approved ? "Approved" : "Rejected"}
//                   </span>
//                 </td>
//                 <td onClick={toggleVerify}>
//                   <span
//                     className={`badge ${
//                       item.verified ? "badge-verified" : "badge-verify"
//                     }`}
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

//         {/* 📄 Pagination */}
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






// import React, { useState, useEffect } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaRegEdit, FaPlus, FaFileExport } from "react-icons/fa";
// import { BsFillEyeFill } from "react-icons/bs";
// import { IoSearch, IoClose } from "react-icons/io5";
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
  
//   // Edit Modal States
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [editForm, setEditForm] = useState({
//     customID: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     blocked: false,
//     approved: false,
//     verified: false
//   });

//   // Add User Modal States
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [addMode, setAddMode] = useState("single"); // "single" or "bulk"
//   const [newUserForm, setNewUserForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: ""
//   });
//   const [csvData, setCsvData] = useState("");

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

//   // Open Edit Modal
//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setEditForm({
//       customID: user.customID || "",
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       email: user.email || "",
//       phoneNumber: user.phoneNumber?.number || "",
//       blocked: user.blocked || false,
//       approved: user.approved || false,
//       verified: user.verified || false
//     });
//     setShowEditModal(true);
//   };

//   // Close Edit Modal
//   const handleCloseModal = () => {
//     setShowEditModal(false);
//     setEditingUser(null);
//   };

//   // Handle Form Input Changes
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Submit Edit Form
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Updating user...");

//     try {
//       const response = await fetch(`${BASE_URL}/admin/updateuser/${editingUser._id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           customID: editForm.customID,
//           firstName: editForm.firstName,
//           lastName: editForm.lastName,
//           email: editForm.email,
//           phoneNumber: {
//             number: editForm.phoneNumber
//           },
//           blocked: editForm.blocked,
//           approved: editForm.approved,
//           verified: editForm.verified
//         })
//       });

//       if (response.ok) {
//         const updatedUser = await response.json();
        
//         // Update local data
//         setData(prev => prev.map(user => 
//           user._id === editingUser._id 
//             ? { ...user, ...editForm, customID: editForm.customID, phoneNumber: { number: editForm.phoneNumber } }
//             : user
//         ));

//         toast.update(toastId, {
//           render: "User updated successfully!",
//           type: "success",
//           isLoading: false,
//           autoClose: 2000,
//         });

//         handleCloseModal();
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       toast.update(toastId, {
//         render: `Error: ${error.message}`,
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   // Handle Add Single Artist
//   const handleAddSingleArtist = async (e) => {
//     e.preventDefault();
//     const toastId = toast.loading("Adding artist...");

//     try {
//       const response = await fetch(`${BASE_URL}/admin/adduser`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName: newUserForm.firstName,
//           lastName: newUserForm.lastName,
//           email: newUserForm.email,
//           password: newUserForm.password,
//           role: getRoleByFilterOption()
//         })
//       });

//       if (response.ok) {
//         const newUser = await response.json();
//         setData(prev => [newUser.data, ...prev]);
        
//         toast.update(toastId, {
//           render: "Artist added successfully!",
//           type: "success",
//           isLoading: false,
//           autoClose: 2000,
//         });

//         setNewUserForm({ firstName: "", lastName: "", email: "", password: "" });
//         setShowAddModal(false);
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add artist");
//       }
//     } catch (error) {
//       toast.update(toastId, {
//         render: `Error: ${error.message}`,
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   // Handle Bulk Add Artists
//   const handleAddBulkArtists = async () => {
//     if (!csvData.trim()) {
//       toast.warning("Please paste CSV data");
//       return;
//     }

//     const toastId = toast.loading("Processing bulk upload...");

//     try {
//       const lines = csvData.trim().split("\n");
//       const users = lines.map(line => {
//         const [firstName, lastName, email, password] = line.split(",").map(s => s.trim());
//         return { firstName, lastName, email, password, role: getRoleByFilterOption() };
//       });

//       // Validate format
//       const invalidLines = users.filter(u => !u.firstName || !u.lastName || !u.email || !u.password);
//       if (invalidLines.length > 0) {
//         throw new Error("Invalid CSV format. Ensure each line has: firstName,lastName,email,password");
//       }

//      const results = await Promise.allSettled(
//   users.map(async (user) => {
//     const res = await fetch(`${BASE_URL}/admin/adduser`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });

//     if (!res.ok) {
//       const errData = await res.json().catch(() => ({}));
//       throw new Error(errData.message || `Failed with status ${res.status}`);
//     }

//     return res.json();
//   })
// );

//       const successful = results.filter(r => r.status === "fulfilled").length;
//       const failed = results.filter(r => r.status === "rejected").length;

//       // Refresh data
//       const response = await fetch(
//         `${BASE_URL}/admin/user?role=${getRoleByFilterOption()}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const responseData = await response.json();
//       const sorted = responseData.data.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setData(sorted);

//       toast.update(toastId, {
//         render: `Added ${successful} artists. ${failed > 0 ? `${failed} failed.` : ""}`,
//         type: failed > 0 ? "warning" : "success",
//         isLoading: false,
//         autoClose: 3000,
//       });

//       setCsvData("");
//       setShowAddModal(false);
//     } catch (error) {
//       toast.update(toastId, {
//         render: `Error: ${error.message}`,
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
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

//   // Export to Excel
//   const exportToExcel = () => {
//     if (!filteredData || filteredData.length === 0) {
//       toast.warning("No data to export");
//       return;
//     }

//     const toastId = toast.loading("Preparing export...");

//     try {
//       let tableHTML = `
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Custom ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Role</th>
//               <th>Registered On</th>
//               <th>Status</th>
//               <th>Approval</th>
//               <th>Verified</th>
//             </tr>
//           </thead>
//           <tbody>
//       `;

//       filteredData.forEach((item) => {
//         tableHTML += `
//           <tr>
//             <td>${item.customID || ""}</td>
//             <td>${item.firstName || ""}</td>
//             <td>${item.lastName || ""}</td>
//             <td>${item.email || ""}</td>
//             <td>${item.phoneNumber?.number || ""}</td>
//             <td>${getRoleByFilterOption()}</td>
//             <td>${new Date(item.createdAt).toLocaleString()}</td>
//             <td>${item.blocked ? "Blocked" : "Active"}</td>
//             <td>${item.approved ? "Approved" : "Rejected"}</td>
//             <td>${item.verified ? "Verified" : "Not Verified"}</td>
//           </tr>
//         `;
//       });

//       tableHTML += `</tbody></table>`;

//       const blob = new Blob([tableHTML], {
//         type: "application/vnd.ms-excel;charset=utf-8;",
//       });
//       const link = document.createElement("a");
//       const url = URL.createObjectURL(blob);

//       link.setAttribute("href", url);
//       link.setAttribute(
//         "download",
//         `${getRoleByFilterOption()}_users_${
//           new Date().toISOString().split("T")[0]
//         }.xls`
//       );
//       link.style.visibility = "hidden";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.dismiss(toastId);
//       toast.success("Data exported successfully!");
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error("Failed to export data");
//       console.error("Export error:", error);
//     }
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
//           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//             <button onClick={exportToExcel} className="export-btn">
//               <FaFileExport /> Export to Excel
//             </button>
//             <FaPlus 
//               className="plus" 
//               title="Add User" 
//               onClick={() => setShowAddModal(true)}
//             />
//           </div>
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
//               <th>Status</th>
//               <th>Approval</th>
//               <th>Verified</th>
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
//                 <td>{item.customID || <span style={{color: '#999', fontStyle: 'italic'}}>Not assigned</span>}</td>
//                 <td>{item.firstName || <span style={{color: '#999', fontStyle: 'italic'}}>N/A</span>}</td>
//                 <td>{item.email || <span style={{color: '#999', fontStyle: 'italic'}}>N/A</span>}</td>
//                 <td>{item.phoneNumber?.number || <span style={{color: '#999', fontStyle: 'italic'}}>N/A</span>}</td>
//                 <td>{new Date(item.createdAt).toLocaleString()}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       item.blocked ? "badge-unblock" : "badge-block"
//                     }`}
//                   >
//                     {item.blocked ? "Blocked" : "Active"}
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       item.approved ? "badge-approved" : "badge-rejected"
//                     }`}
//                   >
//                     {item.approved ? "Approved" : "Rejected"}
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       item.verified ? "badge-verified" : "badge-verify"
//                     }`}
//                   >
//                     {item.verified ? "Verified" : "Not Verified"}
//                   </span>
//                 </td>
//                 <td className="viewicon">
//                   <FaRegEdit 
//                     title="Edit" 
//                     className="edit" 
//                     onClick={() => handleEditClick(item)}
//                   />
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

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>Edit User Details</h3>
//               <IoClose className="modal-close" onClick={handleCloseModal} />
//             </div>
            
//             <form onSubmit={handleEditSubmit} className="modal-form">
//               <div className="form-group">
//                 <label>Custom ID</label>
//                 <input
//                   type="text"
//                   name="customID"
//                   value={editForm.customID}
//                   onChange={handleInputChange}
//                   placeholder="e.g., eKAR2025NAI0066"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={editForm.firstName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={editForm.lastName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editForm.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={editForm.phoneNumber}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="form-checkboxes">
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="blocked"
//                     checked={editForm.blocked}
//                     onChange={handleInputChange}
//                   />
//                   <span>Blocked</span>
//                 </label>

//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="approved"
//                     checked={editForm.approved}
//                     onChange={handleInputChange}
//                   />
//                   <span>Approved</span>
//                 </label>

//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="verified"
//                     checked={editForm.verified}
//                     onChange={handleInputChange}
//                   />
//                   <span>Verified</span>
//                 </label>
//               </div>

//               <div className="modal-actions">
//                 <button type="button" className="btn-cancel" onClick={handleCloseModal}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn-submit">
//                   Modify
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Add User Modal */}
//       {showAddModal && (
//         <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
//           <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>Add New Artists</h3>
//               <IoClose className="modal-close" onClick={() => setShowAddModal(false)} />
//             </div>

//             {/* Tab Buttons */}
//             <div className="add-tabs">
//               <button
//                 type="button"
//                 className={`tab-btn ${addMode === "single" ? "active" : ""}`}
//                 onClick={() => setAddMode("single")}
//               >
//                 Add Single Artist
//               </button>
//               <button
//                 type="button"
//                 className={`tab-btn ${addMode === "bulk" ? "active" : ""}`}
//                 onClick={() => setAddMode("bulk")}
//               >
//                 Add Bulk Artists
//               </button>
//             </div>

//             {/* Single Artist Form */}
//             {addMode === "single" && (
//               <form onSubmit={handleAddSingleArtist} className="modal-form">
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>First Name</label>
//                     <input
//                       type="text"
//                       value={newUserForm.firstName}
//                       onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})}
//                       required
//                     />
//                   </div>
                  
//                   <div className="form-group">
//                     <label>Last Name</label>
//                     <input
//                       type="text"
//                       value={newUserForm.lastName}
//                       onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={newUserForm.email}
//                     onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     value={newUserForm.password}
//                     onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
//                     required
//                   />
//                 </div>

//                 <div className="modal-actions">
//                   <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn-submit">
//                     Add Artist
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Bulk Upload Form */}
//             {addMode === "bulk" && (
//               <div className="modal-form">
//                 <div className="form-group">
//                   <label>Paste CSV Data</label>
//                   <textarea
//                     className="csv-textarea"
//                     placeholder="Paste data here, one artist per line. Format:&#10;firstName,lastName,email,password"
//                     value={csvData}
//                     onChange={(e) => setCsvData(e.target.value)}
//                     rows={8}
//                   />
//                 </div>

//                 <p className="csv-note">
//                   Each line must contain: First Name, Last Name, Email, and Password, separated by commas.
//                 </p>

//                 <div className="modal-actions">
//                   <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
//                     Cancel
//                   </button>
//                   <button type="button" className="btn-submit" onClick={handleAddBulkArtists}>
//                     Add Bulk
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserArtist;

import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit, FaPlus, FaFileExport } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { IoSearch, IoClose } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "../Navbar/Navbar1";
import "./User.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserArtist = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOption, setFilterOption] = useState("0");
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Form states
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        customID: "", firstName: "", lastName: "", email: "", phoneNumber: "",
        isBlocked: false, isAproved: false, isVerified: false
    });
    const [addMode, setAddMode] = useState("single");
    const [newUserForm, setNewUserForm] = useState({
        firstName: "", lastName: "", email: "", password: "", phoneNumber: "", customID: ""
    });
    const [csvData, setCsvData] = useState("");

    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const itemsPerPage = 10;

    const getRoleByFilterOption = () => {
        switch (filterOption) {
            case "1": return "Patron";
            case "2": return "Partner";
            case "3": return "Art-lover";
            default: return "Artist";
        }
    };
    
    const getUser = async () => {
        const toastId = toast.loading("Refreshing user list...");
        try {
            const role = getRoleByFilterOption();
            const cacheBuster = `&t=${new Date().getTime()}`;
            const response = await fetch(`${BASE_URL}/admin/users?role=${role}${cacheBuster}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const responseData = await response.json();
            if (!response.ok) throw new Error(responseData.message || "Failed to fetch data.");
            
            const sorted = (responseData.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setData(sorted);
            toast.update(toastId, { render: `${role}s list is up-to-date!`, type: "success", isLoading: false, autoClose: 1500 });
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.update(toastId, { render: `Error: ${error.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    useEffect(() => {
        getUser();
    }, [filterOption]);

    // Edit Modal Logic
    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditForm({
            customID: user.customID || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber?.number || "",
            isBlocked: user.isBlocked || false,
            isAproved: user.isAproved || false,
            isVerified: user.isVerified || false
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Updating user...");
        try {
            const payload = { ...editForm, phoneNumber: { number: editForm.phoneNumber } };
            const response = await fetch(`${BASE_URL}/admin/updateuser/${editingUser._id}`, {
                method: "PATCH",
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error("Update failed");
            
            toast.update(toastId, { render: "User updated successfully!", type: "success", isLoading: false, autoClose: 2000 });
            setShowEditModal(false);
            setTimeout(() => getUser(), 500);
        } catch (error) {
            toast.update(toastId, { render: `Error: ${error.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    // Add User Logic
    const handleAddSingleArtist = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Adding artist...");
        try {
            const payload = { ...newUserForm, role: getRoleByFilterOption(), phoneNumber: { number: newUserForm.phoneNumber } };
            const response = await fetch(`${BASE_URL}/admin/users/add-single-artist`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to add artist");

            toast.update(toastId, { render: "Artist added successfully!", type: "success", isLoading: false, autoClose: 2000 });
            setShowAddModal(false);
            setNewUserForm({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "", customID: "" });
            setTimeout(() => getUser(), 500);
        } catch (error) {
            toast.update(toastId, { render: `Error: ${error.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    const handleAddBulkArtists = async () => {
        if (!csvData.trim()) return toast.warning("Please paste CSV data");
        console.log("Original CSV Data:", csvData); // DEBUG
        const toastId = toast.loading("Processing bulk upload...");
        try {
            const lines = csvData.trim().split("\n");
            console.log("Split lines:", lines); // DEBUG
            const artists = lines.map(line => {
                const [firstName, lastName, email, password, phoneNumber, customID] = line.split(",").map(s => s.trim());
                const artistObject = { firstName, lastName, email, password, phoneNumber: { number: phoneNumber }, customID, role: getRoleByFilterOption() };
                console.log("Parsed artist object:", artistObject); // DEBUG
                return artistObject;
            });
            
            if (artists.length === 0) {
                throw new Error("No valid data to upload.");
            }

            console.log("Final artists array to be sent:", artists); // DEBUG

            const response = await fetch(`${BASE_URL}/admin/users/add-bulk-artists`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ artists })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Bulk add failed");
            
            toast.update(toastId, { render: `Added ${result.data.createdCount} artists successfully.`, type: "success", isLoading: false, autoClose: 3000 });
            setShowAddModal(false);
            setCsvData("");
            setTimeout(() => getUser(), 500);
        } catch (error) {
            toast.update(toastId, { render: `Error: ${error.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    // Delete Logic
    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        const toastId = toast.loading("Deleting user...");
        try {
            const response = await fetch(`${BASE_URL}/admin/deleteuser/${userId}`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Delete failed");
            
            toast.update(toastId, { render: "User deleted successfully", type: "success", isLoading: false, autoClose: 2000 });
            setTimeout(() => getUser(), 500);
        } catch (err) {
            toast.update(toastId, { render: `Error: ${err.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    const handleBulkDelete = async () => {
        if (selectedUsers.length === 0) return toast.warning("Please select at least one user to delete.");
        if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) return;
        
        const toastId = toast.loading(`Deleting ${selectedUsers.length} users...`);
        try {
            await Promise.all(selectedUsers.map(id => fetch(`${BASE_URL}/admin/deleteuser/${id}`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}` }
            })));
            toast.update(toastId, { render: "Selected users deleted.", type: "success", isLoading: false, autoClose: 2000 });
            setSelectedUsers([]);
            setTimeout(() => getUser(), 500);
        } catch (err) {
            toast.update(toastId, { render: `Error: ${err.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };
    
    // Export to Excel
    const exportToExcel = () => {
        if (!filteredData || filteredData.length === 0) {
            return toast.warning("No data to export");
        }

        const toastId = toast.loading("Preparing export...");
        try {
            const tableHTML = `
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
                        ${filteredData.map(item => `
                            <tr>
                                <td>${item.customID || ""}</td>
                                <td>${item.firstName || ""}</td>
                                <td>${item.lastName || ""}</td>
                                <td>${item.email || ""}</td>
                                <td>${item.phoneNumber?.number || ""}</td>
                                <td>${getRoleByFilterOption()}</td>
                                <td>${new Date(item.createdAt).toLocaleString()}</td>
                                <td>${item.isBlocked ? "Blocked" : "Active"}</td>
                                <td>${item.isAproved ? "Approved" : "Rejected"}</td>
                                <td>${item.isVerified ? "Verified" : "Not Verified"}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`;

            const blob = new Blob([tableHTML], { type: "application/vnd.ms-excel;charset=utf-8;" });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            
            link.setAttribute("href", url);
            link.setAttribute("download", `${getRoleByFilterOption()}_users_${new Date().toISOString().split("T")[0]}.xls`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.update(toastId, { render: "Data exported successfully!", type: "success", isLoading: false, autoClose: 2000 });
        } catch (error) {
            toast.update(toastId, { render: "Failed to export data", type: "error", isLoading: false, autoClose: 3000 });
            console.error("Export error:", error);
        }
    };

    // Filtering and Pagination
    const filteredData = data.filter(item => {
        if (!item) return false;
        const searchStr = searchQuery.toLowerCase();
    
        const matchesFirstName = item.firstName?.toLowerCase().includes(searchStr);
        const matchesEmail = item.email?.toLowerCase().includes(searchStr);
        const matchesCustomID = item.customID?.toLowerCase().includes(searchStr);
        const matchesPhone = item.phoneNumber?.number?.includes(searchQuery);
    
        return matchesFirstName || matchesEmail || matchesCustomID || matchesPhone;
    });
    
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <AdminNavbar />
            <div className="usercontainer">
                <div className="row-container">
                    <h2>Manage Users - <span style={{ color: "#AD2F3B" }}>{getRoleByFilterOption()}s</span></h2>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <button className="export-btn" onClick={exportToExcel}><FaFileExport /> Export to Excel</button>
                        <FaPlus className="plus" title="Add User" onClick={() => setShowAddModal(true)} />
                    </div>
                </div>

                <div className="filters-container">
                    <div className="searchbar"><IoSearch className="searchicon" /><input type="search" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                    <select className="filter-select" onChange={(e) => { setFilterOption(e.target.value); setCurrentPage(0); }} value={filterOption}>
                        <option value="0">Artist</option><option value="1">Patron</option><option value="2">Partner</option><option value="3">Art-Lover</option>
                    </select>
                </div>

                <button className="delete-selected-button" onClick={handleBulkDelete}>Delete Selected</button>

                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" onChange={e => setSelectedUsers(e.target.checked ? currentItems.map(u => u._id) : [])} checked={selectedUsers.length === currentItems.length && currentItems.length > 0} /></th>
                            <th>Custom Id</th><th>First Name</th><th>Email</th><th>Phone</th><th>Registered On</th><th>Status</th><th>Approval</th><th>Verified</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item._id}>
                                <td><input type="checkbox" checked={selectedUsers.includes(item._id)} onChange={() => setSelectedUsers(prev => prev.includes(item._id) ? prev.filter(id => id !== item._id) : [...prev, item._id])} /></td>
                                <td>{item.customID || <span style={{color: '#999'}}>Not assigned</span>}</td>
                                <td>{item.firstName || 'N/A'}</td>
                                <td>{item.email || 'N/A'}</td>
                                <td>{item.phoneNumber?.number || 'N/A'}</td>
                                <td>{new Date(item.createdAt).toLocaleString()}</td>
                                <td><span className={`badge ${item.isBlocked ? "badge-block" : "badge-unblock"}`}>{item.isBlocked ? "Blocked" : "Active"}</span></td>
                                <td><span className={`badge ${item.isAproved ? "badge-approved" : "badge-rejected"}`}>{item.isAproved ? "Approved" : "Rejected"}</span></td>
                                <td><span className={`badge ${item.isVerified ? "badge-verified" : "badge-verify"}`}>{item.isVerified ? "Verified" : "Not Verified"}</span></td>
                                <td className="viewicon">
                                    <FaRegEdit title="Edit" className="edit" onClick={() => handleEditClick(item)} />
                                     <BsFillEyeFill
                    title="View"
                    className="view"
                    onClick={() => {
                      localStorage.setItem("artId", item._id);
                      navigate("/artistProfile");
                    }}
                  />
                                    <RiDeleteBin6Line title="Delete" className="delete" onClick={() => handleDelete(item._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate previousLabel={"<"} nextLabel={">"} pageCount={pageCount} onPageChange={(p) => setCurrentPage(p.selected)} containerClassName={"pagination"} activeClassName={"active"} />
            </div>

            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header"><h3>Add New Artists</h3><IoClose className="modal-close" onClick={() => setShowAddModal(false)} /></div>
                        <div className="add-tabs">
                            <button type="button" className={`tab-btn ${addMode === "single" ? "active" : ""}`} onClick={() => setAddMode("single")}>Add Single Artist</button>
                            <button type="button" className={`tab-btn ${addMode === "bulk" ? "active" : ""}`} onClick={() => setAddMode("bulk")}>Add Bulk Artists</button>
                        </div>
                        {addMode === "single" ? (
                            <form onSubmit={handleAddSingleArtist} className="modal-form">
                                <div className="form-row">
                                    <div className="form-group"><label>First Name</label><input type="text" value={newUserForm.firstName} onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})} required /></div>
                                    <div className="form-group"><label>Last Name</label><input type="text" value={newUserForm.lastName} onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})} required /></div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group"><label>Email</label><input type="email" value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} required /></div>
                                    <div className="form-group"><label>Phone Number</label><input type="text" value={newUserForm.phoneNumber} onChange={(e) => setNewUserForm({...newUserForm, phoneNumber: e.target.value})} /></div>
                                </div>
                                 <div className="form-row">
                                    <div className="form-group"><label>Custom ID</label><input type="text" value={newUserForm.customID} onChange={(e) => setNewUserForm({...newUserForm, customID: e.target.value})} required/></div>
                                    <div className="form-group"><label>Password</label><input type="password" value={newUserForm.password} onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})} required /></div>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button type="submit" className="btn-submit">Add Artist</button>
                                </div>
                            </form>
                        ) : (
                            <div className="modal-form">
                                <div className="form-group"><label>Paste CSV Data</label><textarea className="csv-textarea" placeholder="firstName,lastName,email,password,phoneNumber,customID" value={csvData} onChange={(e) => setCsvData(e.target.value)} rows={8} /></div>
                                <p className="csv-note">Each line must contain values in this exact order: <strong>firstName, lastName, email, password, phoneNumber, customID</strong></p>
                                <div className="modal-actions">
                                    <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button type="button" className="btn-submit" onClick={handleAddBulkArtists}>Add Bulk</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {showEditModal && editingUser && (
                 <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header"><h3>Edit User Details</h3><IoClose className="modal-close" onClick={() => setShowEditModal(false)} /></div>
                        <form onSubmit={handleEditSubmit} className="modal-form">
                            <div className="form-group"><label>Custom ID</label><input type="text" name="customID" value={editForm.customID} onChange={(e) => setEditForm({...editForm, customID: e.target.value})} /></div>
                            <div className="form-row">
                                <div className="form-group"><label>First Name</label><input type="text" name="firstName" value={editForm.firstName} onChange={(e) => setEditForm({...editForm, firstName: e.target.value})} required /></div>
                                <div className="form-group"><label>Last Name</label><input type="text" name="lastName" value={editForm.lastName} onChange={(e) => setEditForm({...editForm, lastName: e.target.value})} required /></div>
                            </div>
                            <div className="form-group"><label>Email</label><input type="email" name="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} required /></div>
                            <div className="form-group"><label>Phone Number</label><input type="text" name="phoneNumber" value={editForm.phoneNumber} onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})} /></div>
                            <div className="form-checkboxes">
                                <label className="checkbox-label"><input type="checkbox" name="isBlocked" checked={editForm.isBlocked} onChange={(e) => setEditForm({...editForm, isBlocked: e.target.checked})} /> Blocked</label>
                                <label className="checkbox-label"><input type="checkbox" name="isAproved" checked={editForm.isAproved} onChange={(e) => setEditForm({...editForm, isAproved: e.target.checked})} /> Approved</label>
                                <label className="checkbox-label"><input type="checkbox" name="isVerified" checked={editForm.isVerified} onChange={(e) => setEditForm({...editForm, isVerified: e.target.checked})} /> Verified</label>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit">Modify</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};


export default UserArtist;






