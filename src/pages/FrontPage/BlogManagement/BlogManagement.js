// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { toast } from "react-toastify";
// import { FaPlus, FaRegEdit, FaFileExport } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { BsFillEyeFill } from "react-icons/bs";
// import AdminNavbar from "../../Admin/Navbar/Navbar1";
// import "react-toastify/dist/ReactToastify.css";
// import "./BlogManagement.css";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const BlogManagement = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();
//   const token = localStorage.getItem("accessToken");

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     const toastId = toast.loading("Loading blogs...");
//     try {
//       const response = await fetch(`${BASE_URL}/admin/blogs`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setBlogs(data.data || []);
//         toast.dismiss(toastId);
//         toast.success("Blogs loaded successfully");
//       } else {
//         toast.dismiss(toastId);
//         toast.error("Failed to load blogs");
//       }
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       toast.dismiss(toastId);
//       toast.error("Error fetching blogs");
//     }
//   };

//   const deleteBlog = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;

//     const toastId = toast.loading("Deleting blog...");
//     try {
//       const response = await fetch(`${BASE_URL}/admin/blogs/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();
//       toast.dismiss(toastId);

//       if (data.success) {
//         toast.success("Blog deleted successfully");
//         fetchBlogs();
//       } else {
//         toast.error("Failed to delete blog");
//       }
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error("Error deleting blog");
//       console.error(error);
//     }
//   };

//   const handleSearch = () => {
//     if (!searchQuery) {
//       fetchBlogs();
//       return;
//     }
//     const filtered = blogs.filter((blog) =>
//       blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       blog.author.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setBlogs(filtered);
//   };

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
//               <th>Title</th>
//               <th>Author</th>
//               <th>Category</th>
//               <th>Published Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//       `;

//       filteredData.forEach((blog) => {
//         tableHTML += `
//           <tr>
//             <td>${blog.title || ""}</td>
//             <td>${blog.author || ""}</td>
//             <td>${blog.category || ""}</td>
//             <td>${blog.publishedDate || ""}</td>
//             <td>${blog.published ? "Published" : "Draft"}</td>
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
//         `blogs_${new Date().toISOString().split("T")[0]}.xls`
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

//   const filteredData = blogs.filter(
//     (blog) =>
//       blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       blog.author?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredData.length / itemsPerPage);
//   const indexOfLastItem = (currentPage + 1) * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageClick = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="usercontainer">
//         {/* Header Row */}
//         <div className="row-container">
//           <h2>Manage Blogs</h2>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <button onClick={exportToExcel} className="export-btn">
//               <FaFileExport /> Export to Excel
//             </button>
//             <Link to="/UploadBlog" className="add-btn">
//               <FaPlus /> Add Blog
//             </Link>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="filter-bar">
//           <div className="searchbar">
//             <IoSearch className="searchicon" />
//             <input
//               type="search"
//               placeholder="Search by Title or Author"
//               onChange={(e) => setSearchQuery(e.target.value)}
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
//                 <th>Title</th>
//                 <th>Author</th>
//                 <th>Category</th>
//                 <th>Published Date</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems && currentItems.length > 0 ? (
//                 currentItems.map((blog, index) => (
//                   <tr key={index}>
//                     <td>{blog.title}</td>
//                     <td>{blog.author}</td>
//                     <td>{blog.category}</td>
//                     <td>{new Date(blog.publishedDate).toLocaleDateString()}</td>
//                     <td className={`status ${blog.published ? "active" : "blocked"}`}>
//                       {blog.published ? "Published" : "Draft"}
//                     </td>
//                     <td className="action-icons">
//                       <FaRegEdit
//                         title="Edit"
//                         onClick={() => {
//                           localStorage.setItem("blogId", blog.id);
//                           navigate("/EditBlog");
//                         }}
//                       />
//                       <BsFillEyeFill
//                         title="View"
//                         onClick={() => {
//                           localStorage.setItem("blogId", blog.id);
//                           navigate("/ViewBlog");
//                         }}
//                       />
//                       <RiDeleteBin6Line
//                         title="Delete"
//                         onClick={() => deleteBlog(blog.id)}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center" }}>
//                     No blogs found
//                   </td>
//                 </tr>
//               )}
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

// export default BlogManagement;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FaPlus, FaRegEdit, FaFileExport } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import "react-toastify/dist/ReactToastify.css";
import "./BlogManagement.css";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  // Load blogs from localStorage
  const loadBlogs = () => {
    try {
      const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
      setBlogs(storedBlogs);
      if (storedBlogs.length > 0) {
        toast.success(`${storedBlogs.length} blogs loaded successfully`);
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
      toast.error("Error loading blogs");
    }
  };

  // Delete blog from localStorage
  const deleteBlog = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Error deleting blog");
      console.error(error);
    }
  };

  // Toggle publish status
  const togglePublishStatus = (id) => {
    try {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, published: !blog.published } : blog
      );
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
      toast.success("Blog status updated successfully");
    } catch (error) {
      toast.error("Error updating blog status");
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      loadBlogs();
      return;
    }
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const filtered = storedBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBlogs(filtered);
  };

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
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Published Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
      `;

      filteredData.forEach((blog) => {
        tableHTML += `
          <tr>
            <td>${blog.title || ""}</td>
            <td>${blog.author || ""}</td>
            <td>${blog.category || "Uncategorized"}</td>
            <td>${new Date(blog.createdAt).toLocaleDateString()}</td>
            <td>${blog.published ? "Published" : "Draft"}</td>
          </tr>
        `;
      });

      tableHTML += `</tbody></table>`;

      const blob = new Blob([tableHTML], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `blogs_${new Date().toISOString().split("T")[0]}.xls`
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

  const filteredData = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="usercontainer">
        {/* Header Row */}
        <div className="row-container">
          <h2>Manage Blogs ({blogs.length})</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={exportToExcel} className="export-btn">
              <FaFileExport /> Export to Excel
            </button>
            <Link to="/UploadBlog" className="add-btn">
              <FaPlus /> Add Blog
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="filter-bar">
          <div className="searchbar">
            <IoSearch className="searchicon" />
            <input
              type="search"
              placeholder="Search by Title or Author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="search"
            />
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  loadBlogs();
                }}
                className="clear-btn"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <div className="blog-title-cell">
                        {/* {blog.featuredImage && (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="blog-thumbnail"
                          />
                        )} */}
                        <span>{blog.title}</span>
                      </div>
                    </td>
                    <td>{blog.author}</td>
                    <td>{blog.category || "Uncategorized"}</td>
                    <td>{formatDate(blog.createdAt)}</td>
                    <td>
                      <span
                        className={`status ${blog.published ? "active" : "blocked"}`}
                        onClick={() => togglePublishStatus(blog.id)}
                        style={{ cursor: "pointer" }}
                        title="Click to toggle status"
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="action-icons">
                      <FaRegEdit
                        title="Edit"
                        onClick={() => {
                          toast.info("Edit feature coming soon");
                          // You can implement edit functionality later
                        }}
                      />
                      <BsFillEyeFill
                        title="View"
                        onClick={() => {

                          navigate("/admin/blog-view/:id")
                          toast.info("View feature coming soon");
                          // You can implement view functionality later
                        }}
                      />
                      <RiDeleteBin6Line
                        title="Delete"
                        onClick={() => deleteBlog(blog.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                    <div className="empty-state">
                      <h3>No blogs found</h3>
                      <p>
                        {searchQuery
                          ? "Try adjusting your search"
                          : "Start by creating your first blog"}
                      </p>
                      {!searchQuery && (
                        <Link to="/UploadBlog" className="create-first-btn">
                          Create Blog
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
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
            forcePage={currentPage}
          />
        )}
      </div>
    </>
  );
};

export default BlogManagement;
