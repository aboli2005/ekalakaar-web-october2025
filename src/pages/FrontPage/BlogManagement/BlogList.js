import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import "./BlogList.css";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Load blogs from localStorage
  useEffect(() => {
    loadBlogs();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = blogs;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== "All") {
      result = result.filter((blog) => blog.category === filterCategory);
    }

    // Status filter
    if (filterStatus !== "All") {
      result = result.filter((blog) =>
        filterStatus === "Published" ? blog.published : !blog.published
      );
    }

    setFilteredBlogs(result);
  }, [searchTerm, filterCategory, filterStatus, blogs]);

  const loadBlogs = () => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
    setFilteredBlogs(storedBlogs);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
      toast.success("Blog deleted successfully!");
    }
  };

  const handleTogglePublish = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, published: !blog.published } : blog
    );
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    toast.success("Blog status updated!");
  };

  const handleReadMore = (blogId) => {
    navigate(`/admin/blog-view/${blogId}`);
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
      <div className="blog-list-container">
        <div className="blog-list-header">
          <h2>All Blogs ({filteredBlogs.length})</h2>
          <button onClick={() => navigate("/UploadBlog")} className="upload-new-btn">
            + Upload New Blog
          </button>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Classical Music">Classical Music</option>
              <option value="Folk Dance">Folk Dance</option>
              <option value="Theatre">Theatre</option>
              <option value="Fusion Art">Fusion Art</option>
              <option value="Traditional Arts">Traditional Arts</option>
              <option value="News">News</option>
              <option value="Events">Events</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="empty-state">
            <h3>No blogs found</h3>
            <p>Start by uploading your first blog!</p>
            <button onClick={() => navigate("/UploadBlog")} className="upload-first-btn">
              Upload Blog
            </button>
          </div>
        ) : (
          <div className="blogs-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                {blog.featuredImage && (
                  <div className="blog-card-image">
                    <img src={blog.featuredImage} alt={blog.title} />
                    <span className={`status-badge ${blog.published ? "published" : "draft"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                )}

                <div className="blog-card-content">
                  <h3>{blog.title}</h3>
                  <p className="blog-excerpt">
                    {blog.content.substring(0, 120)}
                    {blog.content.length > 120 ? "..." : ""}
                  </p>

                  <div className="blog-meta">
                    <span className="author">👤 {blog.author}</span>
                    {blog.category && (
                      <span className="category">📁 {blog.category}</span>
                    )}
                  </div>

                  <div className="blog-date">
                    📅 {formatDate(blog.createdAt)}
                  </div>

                  <div className="blog-actions">
                    <button
                      onClick={() => handleReadMore(blog.id)}
                      className="action-btn read-more"
                    >
                       Read More..
                    </button>
                    <button
                      onClick={() => handleTogglePublish(blog.id)}
                      className={`action-btn ${blog.published ? "unpublish" : "publish"}`}
                    >
                      {blog.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="action-btn delete"
                    >
                       Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
