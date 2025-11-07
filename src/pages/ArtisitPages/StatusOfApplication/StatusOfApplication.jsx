import "./statusOfApplication.css";
import { useEffect, useState } from "react";
import RejectedApplicationItems from "./RejectedApplicationItems";
import HiredApplicationItems from "./HiredApplicationItems";
import InProgressApplicationItems from "./InProgressApplicationItems";
import AppliedApplicationItems from "./AppliedApplicationItems";
import SaveApplicationItems from "./SaveApplicationItems";
import Artist_navbar from "../Artist_navbar";
import { statusOfAppliPoints } from "../../services/apis";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessToken, setRefreshToken } from "../../reducer/slices/authSlice";

// Sidebar imports
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaBook,
  FaNewspaper,
  FaSignOutAlt,
  FaIdBadge,
  FaEnvelope,
} from "react-icons/fa";
import "../Dashboard/dashboard.css";

const navItems = [
  {
    title: "Saved",
  },
  {
    title: "Applied",
  },
  {
    title: "InProgress",
  },
  {
    title: "Hired",
  },
  {
    title: "Not Hired",
  },
];

function StatusOfApplication() {
  const [currentEvent, setCurrentEvent] = useState("Saved");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [appliedData, setAppliedData] = useState([]);
  const [inProgressData, setInProgressData] = useState([]);
  const [hiredData, setHiredData] = useState([]);
  const [rejectData, setRejectData] = useState([]);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const response = await makeAuthenticatedGETRequest(
        statusOfAppliPoints.FETCH_APPLIED_APPLI_API,
        accessToken
      );
      console.log("response", response);
      const { data } = response;
      console.log("data", data);
      console.log("amount",data.map(e=>e.status === "Hired"))
      if (response.status === "success") {
        setAppliedData(response?.data);

        // next step for inprogress data
        const inprogressAppli = data?.filter((event) => {
          const appliStatus = event.status;
          return appliStatus === "In-Progress";
        });
        const rejectAppli = data?.filter((event) => {
          const appliStatus = event.status;
          return appliStatus === "Rejected";
        });
        console.log("reje", rejectAppli);
        const hiredAppli = data?.filter((event) => {
          const appliStatus = event.status;
          return appliStatus === "Hired";
        });

        if (inprogressAppli.length > 0) {
          setInProgressData(inprogressAppli);
        }
        if (rejectAppli.length > 0) {
          setRejectData(rejectAppli);
        }
        if (hiredAppli.length > 0) {
          setHiredData(hiredAppli);
        }
      } else {
        toast.error("Cannot fetch Applied Appliction , please refresh page", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("currentEvent")) {
      setCurrentEvent(sessionStorage.getItem("currentEvent"));
    }
    fetchApplication();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currentEvent", currentEvent);
  }, [currentEvent]);

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

        {/* -------- Main Content -------- */}
        <main className="dashboard-content">
          <div className="appli_Info_Wrapper">
            <div className="appli_Info_Container">
              {/* navbar  */}
              {/* second navbar heading */}
              <div className="appli_heading_icon_wrapper">
                <p className="appli_info_headline">APPLICATION STATUS</p>
              </div>
              {/* second navbar */}
              <nav className="appli_info_nav">
                <p className="appli_info_title">APPLICATION STATUS</p>
                <div className="appli_nav_items">
                  {navItems.map((item, index) => (
                    <span
                      key={index}
                      onClick={() => setCurrentEvent(item.title)}
                      className={`nav_item ${
                        currentEvent === item.title ? "nav_item_active" : "nav_item"
                      }`}
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </nav>
              {currentEvent === navItems[0].title && (
                <SaveApplicationItems
                  setLoading={setLoading}
                  loading={loading}
                  currentEvent={currentEvent}
                />
              )}
              {currentEvent === navItems[1].title && (
                <AppliedApplicationItems
                  jobData={appliedData}
                  loading={loading}
                  currentEvent={currentEvent}
                />
              )}
              {currentEvent === navItems[2].title && (
                <InProgressApplicationItems
                  jobData={inProgressData}
                  loading={loading}
                  currentEvent={currentEvent}
                />
              )}
              {currentEvent === navItems[3].title && (
                <HiredApplicationItems
                  jobData={hiredData}
                  loading={loading}
                  currentEvent={currentEvent}
                />
              )}
              {currentEvent === navItems[4].title && (
                <RejectedApplicationItems
                  jobData={rejectData}
                  loading={loading}
                  currentEvent={currentEvent}
                />
              )}
            </div>

            <footer></footer>
          </div>
        </main>
      </div>
    </>
  );
}

export default StatusOfApplication;