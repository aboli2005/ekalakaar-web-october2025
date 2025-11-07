import React, { useEffect, useState } from "react";
import Artist_navbar from "../Artist_navbar";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { statusOfAppliPoints, artistOpportunityPoints } from "../../services/apis";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../../reducer/slices/authSlice"; // adjust path if needed
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Skill_Card from "./Skill_Card";
import dance from "./assets/dance.png";
import newsImg from "./assets/news.png";


import {
  FaUser,
  FaBriefcase,
  FaBook,
  FaNewspaper,
  FaSignOutAlt,
  FaIdBadge,
  FaEnvelope,
} from "react-icons/fa";
import "./dashboard.css";

const API_KEY = "a508cd51cc1c4e68b737330667020e05";
const API_URL = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${API_KEY}`;

const ArtistDashboard = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [appliedData, setAppliedData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [applied, setApplied] = useState(0);

  // Logout function
  const handleLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    toast.success("Successfully logged out", { position: "top-center" });
    navigate("/login");
  };

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", icon: <FaIdBadge />, link: "/ArtistDashboard" },
    { name: "Profile", icon: <FaUser />, link: "/Artist_Profile" },
    { name: "Portfolio", icon: <FaBriefcase />, link: "/portfolioDisplay" },
    { name: "Opportunities", icon: <FaBriefcase />, link: "/Artist_Opportunities" },
    { name: "Application Status", icon: <FaBook />, link: "/statusOfApplication" },
    { name: "Skill Development", icon: <FaBook />, link: "/CourseCategories" },
    { name: "News", icon: <FaNewspaper />, link: "/latestNews" },
    { name: "Contact Us", icon: <FaEnvelope />, link: "/contactUs" },
    { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  // Fetch Applications

  
  const fetchApplication = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        statusOfAppliPoints.FETCH_APPLIED_APPLI_API,
        accessToken
      );
      if (response.status === "success") setAppliedData(response.data);
      else toast.error("Cannot fetch applications, please refresh.");
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Opportunities
  const fetchOpportunity = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        artistOpportunityPoints.FETCH_OPPOR_DATA_API,
        accessToken
      );
      if (response?.status === "success") setJobData([...response.data].reverse());
    } catch (error) {
      toast.error("Server error, please try again.");
    }
  };

  // Fetch News
  const fetchNews = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setLatestNews(data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    }

  };

  // Fetch Hired Applications
  const hire = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        statusOfAppliPoints.FETCH_APPLIED_APPLI_API,
        accessToken
      );
      const filteredData = response.data.filter((item) => item.status === "Hired");
      setApplied(filteredData.length);
      setRevenue(
        filteredData.reduce((sum, e) => sum + (e.opportunity?.budget || 0), 0)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplication();
    hire();
    fetchOpportunity();
    fetchNews();
  }, []);

  const slicedJobData = jobData.slice(0, 3);
  const slicedNews = latestNews.slice(0, 3);

  return (
    <>
      <Artist_navbar />
      <div className="dashboard-layout">
        {/* -------- Sidebar -------- */}
        <aside className="sidebar">
          <h2 className="sidebar-title">Menu</h2>
          <ul className="sidebar-menu">
            {menuItems.map((item, i) => (
              <li key={i}>
                {item.action ? (
                  <button className="sidebar-link" onClick={item.action}>
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-text">{item.name}</span>
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className={`sidebar-link ${
                      location.pathname === item.link ? "active" : ""
                    }`}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-text">{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* -------- Main Dashboard Content -------- */}
        <main className="dashboard-content">
          {/* ---------- HEADER ---------- */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back! Here’s your quick performance overview 🚀
            </p>
          </div>

          {/* ---------- STAT BOXES ---------- */}
          <div className="stats-grid">
            {[
              { title: "Total Opportunities", value: jobData.length },
              { title: "Applied", value: appliedData.length },
              { title: "Performance", value: applied },
              { title: "Revenue (INR)", value: revenue },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <p className="stat-title">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* ---------- OPPORTUNITIES ---------- */}
          <section className="section">
            <div className="section-header">
              <h2>Explore Opportunities</h2>
              <Link to="/Artist_Opportunities" className="red-btn">
                View More
              </Link>
            </div>
            <div className="card-grid" >
              {slicedJobData.map((job, idx) => (
                <div key={idx} className="card" style={{height:"200px"}}>
                  {/* <img src={dance} alt="opportunity" className="card-img" style={{height:"370px"}} /> */}
                  <div className="card-body">
                    <h3 style={{marginTop:"20px"}}>{job.purpose}</h3>
                    <p>Budget: ₹{job.budget}</p>
                    <p>
                      Event Date:{" "}
                      {new Date(job.performanceDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <Link to="/Artist_Opportunities" className="card-link">
                      Explore →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- SKILLS ---------- */}
          <section className="section">
            <div className="section-header">
              <h2>Skill Development</h2>
              <Link to="/CourseCategories" className="red-btn">
                View More
              </Link>
            </div>
            <Skill_Card />
          </section>

          {/* ---------- NEWS ---------- */}
          <section className="section">
            <div className="section-header">
              <h2>Latest News</h2>
              <Link to="/latestNews" className="red-btn">
                View More
              </Link>
            </div>
            <div className="card-grid">
              {slicedNews.map((article, idx) => (
                <div key={idx} className="card">
                  <img
                    src={article.urlToImage || newsImg}
                    alt="news"
                    className="card-img"
                  />
                  <div className="card-body">
                    <h3>{article.title.slice(0, 40)}...</h3>
                    <p className="small">By {article.author || "Unknown"}</p>
                    <p>{article.description?.slice(0, 60)}...</p>
                    <p className="small">
                      Published:{" "}
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <Link to="/latestNews" className="card-link">
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ArtistDashboard;