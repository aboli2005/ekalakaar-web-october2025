// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import AdminNavbar from "../../Admin/Navbar/Navbar1";
// import "./UploadBlog.css";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const UploadBlog = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("accessToken");

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     category: "",
//     content: "",
//     published: false,
//     featuredImage: null,
//   });

//   const [imagePreview, setImagePreview] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, featuredImage: file });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.author || !formData.content) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const toastId = toast.loading("Uploading blog...");

//     try {
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("author", formData.author);
//       data.append("category", formData.category);
//       data.append("content", formData.content);
//       data.append("published", formData.published);
//       if (formData.featuredImage) {
//         data.append("featuredImage", formData.featuredImage);
//       }

//       const response = await fetch(`${BASE_URL}/admin/blogs`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       });

//       const result = await response.json();
//       toast.dismiss(toastId);

//       if (result.success) {
//         toast.success("Blog uploaded successfully!");
//         navigate("/admin/blogs");
//       } else {
//         toast.error(result.message || "Failed to upload blog");
//       }
//     } catch (error) {
//       toast.dismiss(toastId);
//       toast.error("Error uploading blog");
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="upload-blog-container">
//         <div className="upload-blog-header">
//           <h2>Upload New Blog</h2>
//           <button onClick={() => navigate("/admin/blogs")} className="back-btn">
//             ← Back to Blogs
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="blog-form">
//           {/* Title */}
//           <div className="form-group">
//             <label htmlFor="title">
//               Blog Title <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="Enter blog title"
//               required
//             />
//           </div>

//           {/* Author */}
//           <div className="form-group">
//             <label htmlFor="author">
//               Author Name <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="author"
//               name="author"
//               value={formData.author}
//               onChange={handleInputChange}
//               placeholder="Enter author name"
//               required
//             />
//           </div>

//           {/* Category */}
//           <div className="form-group">
//             <label htmlFor="category">Category</label>
//             <select
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Category</option>
//               <option value="Classical Music">Classical Music</option>
//               <option value="Folk Dance">Folk Dance</option>
//               <option value="Theatre">Theatre</option>
//               <option value="Fusion Art">Fusion Art</option>
//               <option value="Traditional Arts">Traditional Arts</option>
//               <option value="News">News</option>
//               <option value="Events">Events</option>
//             </select>
//           </div>

//           {/* Featured Image */}
//           <div className="form-group">
//             <label htmlFor="featuredImage">Featured Image</label>
//             <input
//               type="file"
//               id="featuredImage"
//               name="featuredImage"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             {imagePreview && (
//               <div className="image-preview">
//                 <img src={imagePreview} alt="Preview" />
//               </div>
//             )}
//           </div>

//           {/* Content */}
//           <div className="form-group">
//             <label htmlFor="content">
//               Blog Content <span className="required">*</span>
//             </label>
//             <textarea
//               id="content"
//               name="content"
//               value={formData.content}
//               onChange={handleInputChange}
//               placeholder="Write your blog content here..."
//               rows="10"
//               required
//             ></textarea>
//           </div>

//           {/* Published Checkbox */}
//           <div className="form-group checkbox-group">
//             <label htmlFor="published">
//               <input
//                 type="checkbox"
//                 id="published"
//                 name="published"
//                 checked={formData.published}
//                 onChange={handleInputChange}
//               />
//               Publish Immediately
//             </label>
//           </div>

//           {/* Submit Buttons */}
//           <div className="form-actions">
//             <button type="button" onClick={() => navigate("/admin/blogs")} className="cancel-btn">
//               Cancel
//             </button>
//             <button type="submit" className="submit-btn">
//               Upload Blog
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default UploadBlog;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import "./UploadBlog.css";

const UploadBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
    published: false,
    featuredImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, featuredImage: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.content) {
      toast.error("Please fill all required fields");
      return;
    }

    const toastId = toast.loading("Uploading blog...");

    try {
      // Create new blog object
      const newBlog = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Get existing blogs from localStorage
      const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

      // Add new blog to the beginning of the array
      const updatedBlogs = [newBlog, ...existingBlogs];

      // Save to localStorage
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

      // Update state
      setBlogs(updatedBlogs);

      toast.dismiss(toastId);
      toast.success("Blog uploaded successfully!");

      // Reset form
      setFormData({
        title: "",
        author: "",
        category: "",
        content: "",
        published: false,
        featuredImage: null,
      });
      setImagePreview(null);

      // Optional: Navigate to blog list after 1 second
      setTimeout(() => {
        navigate("/admin/blog-list");
      }, 1000);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error uploading blog");
      console.error(error);
    }
  };

  const handleViewAllBlogs = () => {
    navigate("/admin/blog-list");
  };

  return (
    <>
      <AdminNavbar />
      <div className="upload-blog-container">
        <div className="upload-blog-header">
          <h2>Upload New Blog</h2>
          <button onClick={handleViewAllBlogs} className="view-all-btn">
            📚 View All Blogs ({blogs.length})
          </button>
        </div>

        <form onSubmit={handleSubmit} className="blog-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">
              Blog Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Author */}
          <div className="form-group">
            <label htmlFor="author">
              Author Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Classical Music">Classical Music</option>
              <option value="Folk Dance">Folk Dance</option>
              <option value="Theatre">Theatre</option>
              <option value="Fusion Art">Fusion Art</option>
              <option value="Traditional Arts">Traditional Arts</option>
              <option value="News">News</option>
              <option value="Events">Events</option>
            </select>
          </div>

          {/* Featured Image */}
          <div className="form-group">
            <label htmlFor="featuredImage">Featured Image</label>
            <input
              type="file"
              id="featuredImage"
              name="featuredImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">
              Blog Content <span className="required">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog content here..."
              rows="10"
              required
            ></textarea>
          </div>

          {/* Published Checkbox */}
          <div className="form-group checkbox-group">
            <label htmlFor="published">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
              />
              Publish Immediately
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" onClick={() => navigate("/admin/blogs")} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Upload Blog
            </button>
          </div>
        </form>

        {/* Recently Uploaded Blogs Preview */}
        {blogs.length > 0 && (
          <div className="recent-blogs-preview">
            <div className="preview-header">
              <h3>Recently Uploaded</h3>
              <button onClick={handleViewAllBlogs} className="see-all-link">
                See All →
              </button>
            </div>
            <div className="recent-blogs-grid">
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog.id} className="blog-preview-card">
                  {blog.featuredImage && (
                    <img src={blog.featuredImage} alt={blog.title} />
                  )}
                  <div className="blog-preview-content">
                    <h4>{blog.title}</h4>
                    <p className="blog-meta">
                      By {blog.author} • {blog.category || "Uncategorized"}
                    </p>
                    <span className={`status-badge ${blog.published ? "published" : "draft"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadBlog;
