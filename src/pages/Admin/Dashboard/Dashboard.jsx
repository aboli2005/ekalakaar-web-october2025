import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import {
  FaUsers,
  FaUserTie,
  FaHandshake,
  FaHeart,
  FaBriefcase,
  FaFileAlt,
  FaPlayCircle,
  FaRupeeSign,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Dashboard() {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalPatrons, setTotalPatrons] = useState(0);
  const [totalPartners, setTotalPartners] = useState(0);
  const [totalArtlovers, setTotalArtlovers] = useState(0);
  const [totalOpportunities, setTotalOpportunities] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalperformances, setTotalPerformances] = useState(0);
  const [totalrevenue, setTotalRevenue] = useState(0);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  if (!token) {
    toast.error("Please login to access");
    navigate("/login");
  }

  useEffect(() => {
    const getUser = async (role) => {
      try {
        const response = await makeAuthenticatedGETRequest(
          `${BASE_URL}/admin/users?role=${role}`,
          token
        );

        if (response.status === "success") {
          if (role === "Artist") setTotalArtists(response.data.length);
          if (role === "Patron") setTotalPatrons(response.data.length);
          if (role === "Partner") setTotalPartners(response.data.length);
          if (role === "Art-lover") setTotalArtlovers(response.data.length);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(`Error fetching ${role} data:`, error);
      }
    };

    const getOpportunity = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          `${BASE_URL}/admin/opps`,
          token
        );
        setTotalOpportunities(response.data.length);
      } catch (error) {
        console.error("Error fetching opportunity data:", error);
      }
    };

    const getApplications = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          `${BASE_URL}/admin/allapps`,
          token
        );

        setTotalApplications(response.length);

        const hired = response.filter((a) => a.status === "Hired");
        setTotalPerformances(hired.length);

        let sum = 0;
        hired.forEach((elm) => {
          if (elm.opportunity) sum += elm.opportunity.budget;
        });
        setTotalRevenue(sum);
      } catch (error) {
        console.log("Error fetching application data:", error);
      }
    };

    getUser("Artist");
    getUser("Patron");
    getUser("Partner");
    getUser("Art-lover");
    getOpportunity();
    getApplications();
  }, []);

  const stats = [
    { title: "Total Patrons", value: totalPatrons, link: "/Patron", icon: <FaUserTie /> },
    { title: "Total Artists", value: totalArtists, link: "/Artist", icon: <FaUsers /> },
    { title: "Total Partners", value: totalPartners, link: "/partner", icon: <FaHandshake /> },
    { title: "Art Lovers", value: totalArtlovers, link: "/ArtLover", icon: <FaHeart /> },
    { title: "Opportunities", value: totalOpportunities, link: "/Opportunity", icon: <FaBriefcase /> },
    { title: "Applications", value: totalApplications, link: "/DashboardApplication", icon: <FaFileAlt /> },
    { title: "Performances", value: totalperformances, link: "/DashboardPerformance", icon: <FaPlayCircle /> },
    { title: "Revenue", value: `₹${totalrevenue}`, link: "/DashboardRevenue", icon: <FaRupeeSign />, highlight: true },
  ];

  // Data for Charts
  const userDistribution = [
    { name: "Artists", value: totalArtists },
    { name: "Patrons", value: totalPatrons },
    { name: "Partners", value: totalPartners },
    { name: "Art Lovers", value: totalArtlovers },
  ];
  const COLORS = ["#AD2F3B", "#FFB74D", "#4CAF50", "#42A5F5"];

  const applicationData = [
    { name: "Applications", count: totalApplications },
    { name: "Performances", count: totalperformances },
  ];

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-heading">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <Link
              key={idx}
              to={stat.link}
              className={`stat-card ${stat.highlight ? "highlight" : ""}`}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <p className="stat-title">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Graphs Section */}
        <div className="charts-grid">
          {/* User Distribution */}
          <div className="chart-card">
            <h3>User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Applications vs Performances */}
          <div className="chart-card">
            <h3>Applications vs Performances</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#AD2F3B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
