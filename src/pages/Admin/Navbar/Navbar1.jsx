import React, { useState } from "react";
import "./Navbar.css"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img from "./images/logo.png";
const AdminNavbar = () => {
  const [sideNavWidth, setSideNavWidth] = useState(0);

  const openNav = () => {
    setSideNavWidth(250);
  };

  const navigate = useNavigate();

  const token  = localStorage.getItem("accessToken");

  const closeNav = () => {
    setSideNavWidth(0);
  };
  function toggledropdown() {
    let ddown = document.querySelector(".dropdown-container");

    if (ddown) {
      if (ddown.style.display == "block") ddown.style.display = "none";
      else ddown.style.display = "block";
    } else {
      console.error("Element with class 'dropdown-container' not found.");
    }
  }
  
  if(!token){
    return <div>

    </div>
  }
  return (
    <div>
      <div
        id="mySidenav"
        className="sidenav" 
        style={{ width: sideNavWidth + "px" }}
      >
        <div className="sidebar-header">
          <button onClick={closeNav} className="header-icon">
            &times;
          </button>
          <img src={img} alt="Logo" className="sidebarlogo"/>
        </div>

        <Link to="/AdminDashboard">Dashboard</Link>
        <button
          onClick={toggledropdown}
          className="dropdown-btn"
        >
          Manage Users
        </button>
        <div className="dropdown-container">
          <ul>
            <li>
              <Link to="/artist">Artist</Link>
            </li>
            <li>
              <Link to="/patron">Patron</Link>
            </li>
            <li>
              <Link to="/partner">Partners</Link>
            </li>
            <li>
              <Link to="/Artlover">Art-Lover</Link>
            </li>
          </ul>
        </div>
        
        {/* <Link to="/artistProfile">Manage Profile</Link> */}
{/* <Link to="/admin/profile">ManageProfile</Link> */}
        <Link to="/ArtsistManagement">Manage Artists</Link>
        <Link to="/Opportunity">Manage Opportunities</Link>
        <Link to="/PerformanceEnquiries">Performance Enquiries</Link>
        <Link to="/Viewevents">Manage Performances</Link>
        <Link to="/admin/art">Art Management</Link>
        <Link to="/ManageSkills">Skill Management</Link>
        <Link to="/admin/blogs">Manage Blogs </Link>
        <Link to="/admin/news">Manage News</Link>
        <Link to="/ManageLanguages">Manage Languages</Link>
        {/* <Link to="/admin/jobs">Manage Jobs</Link> */}
        {/* <Link to="/admin/banners">Manage Banners</Link> */}
        {/* <Link to="/admin/advertisements">Manage Advertisement</Link> */}
        {/* <Link to="/admin/payments">Manage Payments</Link> */}
        <Link to="/admin/plans">Plans</Link>
        <Link to="/admin/reviews">Review</Link>
        <Link to="/admin/credits">Credit</Link>
        <Link to="/admin/feedback">Feedbacks</Link>
        <Link to="/admin/notifications">Users Notification</Link>
        <Link to="/admin/reports">Reports</Link>
        
      </div>
      <div className="Navbar">
        {/* <img
          className="first_nav_image"
          style={{
            position: "absolute",
            left: "16%",
            top: "2rem",
            width: "14rem",
          }}
          src="/images/navimage.png"
          alt="Navigation"
        /> */}
        <div className="Ham_log">
          <span
            className="Hamburger"
            style={{
              cursor: "pointer",
              color: "white",
              fontSize: "30px",
              margin: "auto 40px",
            }}
            onClick={openNav}
          >
            &#9776;
          </span>
          
          <Link 
            className="Admin-logout" 
            to="/admin-login" 
            onClick={() => {
              toast.dismiss(toast.loading("loading..."));
              toast.success("Successfully Log-out");
              localStorage.clear();
              navigate("/admin-login");
            }}
          >
            Logout
          </Link>
        </div>

        {/* <img
          style={{
            position: "absolute",
            left: "55%",
            top: "-11rem",
            width: "14rem",
          }}
          src="/images/navimage.png"
          alt="Navigation"
        /> */}
      </div>
    </div>
  );
};

export default AdminNavbar;

