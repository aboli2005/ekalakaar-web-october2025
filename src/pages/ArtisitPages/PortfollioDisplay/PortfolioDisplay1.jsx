import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaBriefcase,
  FaBook,
  FaNewspaper,
  FaSignOutAlt,
  FaIdBadge,
} from "react-icons/fa";
import { IoMusicalNote } from "react-icons/io5";
import { FaStarOfDavid, FaMicrophone } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Artist_navbar from "../Artist_navbar";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Dashboard/dashboard.css";
import "./displayPortfolio.css";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../../reducer/slices/authSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.ekalakaar.com';

export default function PortfolioDisplay1() {
  const [dateState, setDateState] = useState([]);
  const [artdata, setArtData] = useState({});
  const [localImages, setLocalImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Robust helper to build the final image URL.
  // Handles: blob URLs, absolute URLs, previously double-prefixed values,
  // host-only paths, and relative filenames. Also encodes special chars.
 // ---------- normalize incoming image values to the backend path /images/<filename> ----------
const getFullImageUrl = (imageValue) => {
  if (!imageValue) return "/default-avatar.png";

  // normalize to string and remove control chars/newlines
  let raw = String(imageValue).replace(/[\u0000-\u001F\u007F]+/g, "").trim();
  if (!raw) return "/default-avatar.png";

  // blob preview: return as-is
  if (raw.startsWith("blob:")) return raw;

  // if absolute URL already, return unchanged (do not re-encode)
  if (/^https?:\/\//i.test(raw)) return raw;

  // protocol-relative
  if (raw.startsWith("//")) return "https:" + raw;

  // strip common prefixes your API sometimes returns
  let cleaned = raw
    .replace(/^\/+/, "")
    .replace(/^public\/images\//i, "")
    .replace(/^public\/uploads\//i, "")
    .replace(/^uploads\/performance\//i, "")
    .replace(/^uploads\//i, "")
    .replace(/^images\//i, "")
    .replace(/^api\/v1\/images\//i, "")
    .replace(/^api\/images\//i, "")
    .replace(/^https?:\/\/api\.ekalakaar\.com\/api\/v1\/images\//i, "")
    .replace(/^https?:\/\/api\.ekalakaar\.com\/uploads\/performance\//i, "")
    .replace(/^https?:\/\/api\.ekalakaar\.com\//i, "")
    .trim();

  // Build final URL using /images/<filename> — DO NOT encode '@' -> %40
  const envBase = process.env.REACT_APP_BASE_URL || "https://api.ekalakaar.com";
  const API_HOST = String(envBase).replace(/\/api(\/v?1)?(\/.*)?$/i, "").replace(/\/+$/, "");

  return `${API_HOST}/images/${cleaned}`;
};

  // ✅ Logout
  const handleLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    toast.success("Successfully logged out", { position: "top-center" });
    navigate("/login");
  };

  // Sidebar Menu
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

  // Fetch Artist Data
  const getartist = async () => {
    const toastId = toast.loading("Loading profile...");
    try {
      const artistData = await makeAuthenticatedGETRequest(
        `${BASE_URL}/artists/profile`,
        token
      );
      setArtData(artistData.data);
      const dates = artistData?.data?.appliedOpportunities?.map(
        (op) => op?.performanceDate
      );
      setDateState(dates || []);
      toast.dismiss(toastId);
      toast.success("Profile loaded");
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Error loading artist");
    }
  };

  useEffect(() => {
    getartist();
  }, []);

  // Upload and Preview Performance Images
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploadedUrl: null,
    }));

    setLocalImages((prev) => [...prev, ...previews]);
    setUploading(true);

    for (const file of files) {
      await uploadFile(file);
    }
    setUploading(false);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("images", file);

    try {
      const res = await fetch(`${BASE_URL}/artists/profile/perf-images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();

      const newImgUrl =
        data?.data?.performanceInfo?.perfImgs?.[
          data.data.performanceInfo.perfImgs.length - 1
        ];

      if (newImgUrl) {
        // Keep the stored value as-is (backend may return absolute or relative). We'll normalize when rendering.
        setLocalImages((prev) =>
          prev.map((img) =>
            img.file === file ? { ...img, uploadedUrl: newImgUrl } : img
          )
        );
        setArtData((prev) => ({
          ...prev,
          performanceInfo: {
            ...prev.performanceInfo,
            perfImgs: [
              ...(prev.performanceInfo?.perfImgs || []),
              newImgUrl,
            ],
          },
        }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload image");
    }
  };

  // Print Portfolio
  const handleDownloadPortfolio = () => {
    document.body.classList.add("printing");
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove("printing");
      }, 100);
    }, 100);
  };

  return (
    <>
      <Artist_navbar />
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar screen-only">
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

        {/* Main Portfolio Section */}
        <main className="portfolio-main-wrapper">
          <div className="portfolio-actions screen-only">
            <button
              className="download-portfolio-btn"
              onClick={handleDownloadPortfolio}
            >
              <FaDownload /> Download as PDF
            </button>
          </div>

          <div className="portfolio-document">
  {/* ===== WATERMARK (PRINT ONLY) ===== */}
            <div className="watermark-container">
                <div className="watermark-text">eKalakaar</div>
            </div>

            {/* ===== HEADER ===== */}
            <header className="cv-header">
              <div className="cv-header-left">
                <div className="cv-photo-wrapper">
                  {/* Fixed Profile Avatar */}
                  <img
                    src={getFullImageUrl(artdata?.personalInfo?.avatar?.url)}
                    alt="Artist"
                    className="cv-photo"
                    onError={(e) => {
                      console.error('Avatar load failed:', e.target.src);
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </div>
              </div>

              <div className="cv-header-center">
                <h1 className="cv-name">
                  {artdata?.personalInfo?.firstName} {artdata?.personalInfo?.lastName}
                </h1>
                <p className="cv-title">{artdata?.role || "Professional Artist"}</p>

                <div className="cv-contact-grid">
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>{artdata?.personalInfo?.email || "N/A"}</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>
                      {artdata?.personalInfo?.contactNumber?.countryCode}{" "}
                      {artdata?.personalInfo?.contactNumber?.number || "N/A"}
                    </span>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>Pincode: {artdata?.address?.pincode || "N/A"}</span>
                  </div>
                </div>

                <div className="cv-social-row">
                  {artdata?.socialLinks?.instagram && (
                    <a href={artdata?.socialLinks?.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaInstagram />
                    </a>
                  )}
                  {artdata?.socialLinks?.facebook && (
                    <a href={artdata?.socialLinks?.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaFacebook />
                    </a>
                  )}
                  {artdata?.socialLinks?.youtube && (
                    <a href={artdata?.socialLinks?.youtube} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaYoutube />
                    </a>
                  )}
                  {artdata?.socialLinks?.linkedin && (
                    <a href={artdata?.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaLinkedin />
                    </a>
                  )}
                  {artdata?.socialLinks?.twitter && (
                    <a href={artdata?.socialLinks?.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaTwitter />
                    </a>
                  )}
                </div>
              </div>

              <div className="cv-header-right">
                <div className="stats-card">
                  <div className="stat-number">
                    {artdata?.performanceInfo?.totalPerfs || 0}
                  </div>
                  <div className="stat-label">Performances</div>
                </div>
                <div className="stats-card">
                  <div className="stat-number">
                    {artdata?.awardsInfo?.totalAwards || 0}
                  </div>
                  <div className="stat-label">Awards</div>
                </div>
              </div>
            </header>

            {/* ===== BODY ===== */}
            <div className="cv-body">
              {/* Professional Summary */}
              <section className="cv-section">
                <h2 className="cv-section-title">
                  <FaUser className="title-icon" />
                  <span>Professional Summary</span>
                </h2>
                <div className="cv-section-content">
                  <div className="summary-grid">
                    <div className="summary-item">
                      <strong>Age:</strong> {artdata?.personalInfo?.age || "N/A"}
                    </div>
                    <div className="summary-item">
                      <strong>Gender:</strong> {artdata?.personalInfo?.gender || "N/A"}
                    </div>
                    <div className="summary-item summary-full">
                      <strong>Languages:</strong>{" "}
                      {artdata?.personalInfo?.languages?.join(", ") || "N/A"}
                    </div>
                  </div>
                </div>
              </section>

              {/* Artistic Profile */}
              <section className="cv-section">
                <h2 className="cv-section-title">
                  <FaMicrophone className="title-icon" />
                  <span>Artistic Profile</span>
                </h2>
                <div className="cv-section-content">
                  <table className="info-table">
                    <tbody>
                      <tr>
                        <td className="table-label">Art Category</td>
                        <td className="table-value">
                          {artdata?.artInfo?.artCategory?.join(", ") || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-label">Art Name</td>
                        <td className="table-value">
                          {artdata?.artInfo?.artName?.join(", ") || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-label">Art Type</td>
                        <td className="table-value">
                          {artdata?.artInfo?.artType?.join(", ") || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {artdata?.artInfo?.aboutArt && (
                    <div className="about-section">
                      <strong>About:</strong>
                      <p>{artdata?.artInfo?.aboutArt}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Performance Experience */}
              <section className="cv-section">
                <h2 className="cv-section-title">
                  <IoMusicalNote className="title-icon" />
                  <span>Performance Experience</span>
                </h2>
                <div className="cv-section-content">
                  <div className="performance-cards">
                    <div className="perf-card">
                      <div className="perf-label">Total Performances</div>
                      <div className="perf-value">
                        {artdata?.performanceInfo?.totalPerfs || "N/A"}
                      </div>
                    </div>
                    <div className="perf-card">
                      <div className="perf-label">Peak Performance</div>
                      <div className="perf-value">
                        {artdata?.performanceInfo?.peakPerf || "N/A"}
                      </div>
                    </div>
                    {/* <div className="perf-card">
                      <div className="perf-label">Performance Type</div>
                      <div className="perf-value">
                        {artdata?.performanceInfo?.perfType || "N/A"}
                      </div>
                    </div> */}
                  </div>
                  {artdata?.performanceInfo?.highlights && (
                    <div className="highlights-box">
                      <strong>Highlights:</strong>
                      <p>{artdata?.performanceInfo?.highlights}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Awards */}
              <section className="cv-section">
                <h2 className="cv-section-title">
                  <FaStarOfDavid className="title-icon" />
                  <span>Awards & Recognition</span>
                </h2>
                <div className="cv-section-content">
                  <div className="awards-layout">
                    <div className="award-circle">
                      <div className="award-number">
                        {artdata?.awardsInfo?.totalAwards || 0}
                      </div>
                      <div className="award-text">Awards</div>
                    </div>
                    <div className="award-info">
                      <p>
                        <strong>Highest Level:</strong> {artdata?.awardsInfo?.level || "N/A"}
                      </p>
                      {artdata?.awardsInfo?.highlights && (
                        <p className="award-desc">
                          {artdata?.awardsInfo?.highlights}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Performance Gallery */}
              <section className="cv-section screen-only">
                <h2 className="cv-section-title">
                  <FaGlobe className="title-icon" />
                  <span>Performance Gallery</span>
                </h2>

                <div className="cv-section-content">
                  {/* <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    style={{ marginBottom: "10px" }}
                  /> */}
                  {uploading && <p style={{color: 'orange'}}>Uploading images...</p>}

                  <div className="gallery-container">
                    {[...(artdata?.performanceInfo?.perfImgs || []), ...localImages]
                      .map((img, i) => {
                        // Determine image URL
                        let imageUrl;

                        if (typeof img === 'string') {
                          imageUrl = getFullImageUrl(img);
                        } else if (img.uploadedUrl) {
                          imageUrl = getFullImageUrl(img.uploadedUrl);
                        } else if (img.preview) {
                          imageUrl = img.preview;
                        } else {
                          imageUrl = getFullImageUrl(img);
                        }

                        console.log(`Image ${i} URL:`, imageUrl);

                        return (
                          <div key={i} className="gallery-image" style={{position: 'relative'}}>
                            <img
                              src={imageUrl}
                              alt={`Performance ${i + 1}`}
                              onError={(e) => {
                                console.error(`Failed to load image ${i}:`, e.target.src);
                                e.target.style.display = 'none';
                                const parent = e.target.parentElement;
                                if (parent && !parent.querySelector('.error-text')) {
                                  const errorText = document.createElement('div');
                                  errorText.className = 'error-text';
                                  errorText.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#ef4444;font-size:12px;background:#fee;border-radius:8px;';
                                  errorText.textContent = 'Failed to load';
                                  parent.appendChild(errorText);
                                }
                              }}
                              style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                              }}
                            />
                            {img.preview && (
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: img.uploadedUrl ? "green" : "orange",
                                  textAlign: "center",
                                  marginTop: '5px',
                                  fontWeight: 'bold'
                                }}
                              >
                                {img.uploadedUrl ? "✅ Uploaded" : "⏳ Uploading..."}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </section>

              {/* Calendar */}
              {dateState.length > 0 && (
                <section className="cv-section screen-only">
                  <h2 className="cv-section-title">
                    <FaGlobe className="title-icon" />
                    <span>Performance Schedule</span>
                  </h2>
                  <div className="cv-section-content">
                    <Calendar value={dateState} className="portfolio-calendar" />
                  </div>
                </section>
              )}
            </div>

            <footer className="cv-footer print-only">
              <p>Generated on {new Date().toLocaleDateString()}</p>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
