import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import "./BlogView.css";

const BlogView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = () => {
    try {
      const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const foundBlog = storedBlogs.find((b) => b.id === id);
      
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        toast.error("Blog not found");
        navigate("/admin/blog-list");
      }
    } catch (error) {
      console.error("Error loading blog:", error);
      toast.error("Error loading blog");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const updatedBlogs = storedBlogs.filter((b) => b.id !== id);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      toast.success("Blog deleted successfully!");
      navigate("/admin/blog-list");
    }
  };

  const handleTogglePublish = () => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlogs = storedBlogs.map((b) =>
      b.id === id ? { ...b, published: !b.published } : b
    );
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlog({ ...blog, published: !blog.published });
    toast.success(`Blog ${blog.published ? "unpublished" : "published"} successfully!`);
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="blog-view-container">
          <div className="loading-state">Loading blog...</div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <AdminNavbar />
        <div className="blog-view-container">
          <div className="error-state">
            <h2>Blog not found</h2>
            <button onClick={() => navigate("/admin/blog-list")} className="back-btn">
              ← Back to Blogs
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="blog-view-container">
        {/* Header Actions */}
        <div className="blog-view-header">
          <button onClick={() => navigate("/admin/blog-list")} className="back-btn">
            ← Back to All Blogs
          </button>
          <div className="header-actions">
            <button
              onClick={handleTogglePublish}
              className={`action-btn ${blog.published ? "unpublish-btn" : "publish-btn"}`}
            >
              {blog.published ? "📤 Unpublish" : "📢 Publish"}
            </button>
            <button onClick={handleDelete} className="action-btn delete-btn">
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Blog Content */}
        <article className="blog-article">
          {/* Status Badge */}
          <div className="blog-status-container">
            <span className={`status-badge-large ${blog.published ? "published" : "draft"}`}>
              {blog.published ? "Published" : "Draft"}
            </span>
          </div>

          {/* Blog Title */}
          <h1 className="blog-title">{blog.title}</h1>

          {/* Blog Meta Information */}
          <div className="blog-meta-info">
            <div className="meta-item">
              <span className="meta-icon">👤</span>
              <span className="meta-text">By {blog.author}</span>
            </div>
            {blog.category && (
              <div className="meta-item">
                <span className="meta-icon">📁</span>
                <span className="meta-text">{blog.category}</span>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{formatDate(blog.createdAt)}</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="blog-featured-image">
              <img src={blog.featuredImage} alt={blog.title} />
            </div>
          )}

          {/* Blog Content */}
          <div className="blog-content">
            {blog.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        {/* Footer Actions */}
        <div className="blog-view-footer">
          <button onClick={() => navigate("/admin/blog-list")} className="footer-back-btn">
            ← Back to All Blogs
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogView;
