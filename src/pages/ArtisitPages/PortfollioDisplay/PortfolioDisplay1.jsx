// import React, { useEffect, useState } from "react";
// import {
//   FaUser,
//   FaInstagram,
//   FaFacebook,
//   FaYoutube,
//   FaLinkedin,
//   FaTwitter,
//   FaDownload,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaBriefcase,
//   FaBook,
//   FaNewspaper,
//   FaSignOutAlt,
//   FaIdBadge,
// } from "react-icons/fa";
// import { IoMusicalNote } from "react-icons/io5";
// import { FaStarOfDavid, FaMicrophone } from "react-icons/fa";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import Artist_navbar from "../Artist_navbar";
// import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
// import { toast } from "react-toastify";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../Dashboard/dashboard.css";
// import "./displayPortfolio.css";
// import { useDispatch } from "react-redux";
// import { setAccessToken, setRefreshToken } from "../../reducer/slices/authSlice";

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.ekalakaar.com';

// export default function PortfolioDisplay1() {
//   const [dateState, setDateState] = useState([]);
//   const [artdata, setArtData] = useState({});
//   const [localImages, setLocalImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const token = localStorage.getItem("accessToken");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Robust helper to build the final image URL.
//   // Handles: blob URLs, absolute URLs, previously double-prefixed values,
//   // host-only paths, and relative filenames. Also encodes special chars.
//  // ---------- normalize incoming image values to the backend path /images/<filename> ----------
// const getFullImageUrl = (imageValue) => {
//   if (!imageValue) return "/default-avatar.png";

//   // normalize to string and remove control chars/newlines
//   let raw = String(imageValue).replace(/[\u0000-\u001F\u007F]+/g, "").trim();
//   if (!raw) return "/default-avatar.png";

//   // blob preview: return as-is
//   if (raw.startsWith("blob:")) return raw;

//   // if absolute URL already, return unchanged (do not re-encode)
//   if (/^https?:\/\//i.test(raw)) return raw;

//   // protocol-relative
//   if (raw.startsWith("//")) return "https:" + raw;

//   // strip common prefixes your API sometimes returns
//   let cleaned = raw
//     .replace(/^\/+/, "")
//     .replace(/^public\/images\//i, "")
//     .replace(/^public\/uploads\//i, "")
//     .replace(/^uploads\/performance\//i, "")
//     .replace(/^uploads\//i, "")
//     .replace(/^images\//i, "")
//     .replace(/^api\/v1\/images\//i, "")
//     .replace(/^api\/images\//i, "")
//     .replace(/^https?:\/\/api\.ekalakaar\.com\/api\/v1\/images\//i, "")
//     .replace(/^https?:\/\/api\.ekalakaar\.com\/uploads\/performance\//i, "")
//     .replace(/^https?:\/\/api\.ekalakaar\.com\//i, "")
//     .trim();

//   // Build final URL using /images/<filename> — DO NOT encode '@' -> %40
//   const envBase = process.env.REACT_APP_BASE_URL || "https://api.ekalakaar.com";
//   const API_HOST = String(envBase).replace(/\/api(\/v?1)?(\/.*)?$/i, "").replace(/\/+$/, "");

//   return `${API_HOST}/images/${cleaned}`;
// };

//   // ✅ Logout
//   const handleLogout = () => {
//     dispatch(setAccessToken(null));
//     dispatch(setRefreshToken(null));
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("role");
//     toast.success("Successfully logged out", { position: "top-center" });
//     navigate("/login");
//   };

//   // Sidebar Menu
//   const menuItems = [
//     { name: "Dashboard", icon: <FaIdBadge />, link: "/ArtistDashboard" },
//     { name: "Profile", icon: <FaUser />, link: "/Artist_Profile" },
//     { name: "Portfolio", icon: <FaBriefcase />, link: "/portfolioDisplay" },
//     { name: "Opportunities", icon: <FaBriefcase />, link: "/Artist_Opportunities" },
//     { name: "Application Status", icon: <FaBook />, link: "/statusOfApplication" },
//     { name: "Skill Development", icon: <FaBook />, link: "/CourseCategories" },
//     { name: "News", icon: <FaNewspaper />, link: "/latestNews" },
//     { name: "Contact Us", icon: <FaEnvelope />, link: "/contactUs" },
//     { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
//   ];

//   // Fetch Artist Data
//   const getartist = async () => {
//     const toastId = toast.loading("Loading profile...");
//     try {
//       const artistData = await makeAuthenticatedGETRequest(
//         `${BASE_URL}/artists/profile`,
//         token
//       );
//       setArtData(artistData.data);
//       const dates = artistData?.data?.appliedOpportunities?.map(
//         (op) => op?.performanceDate
//       );
//       setDateState(dates || []);
//       toast.dismiss(toastId);
//       toast.success("Profile loaded");
//     } catch (error) {
//       console.error(error);
//       toast.dismiss(toastId);
//       toast.error("Error loading artist");
//     }
//   };

//   useEffect(() => {
//     getartist();
//   }, []);

//   // Upload and Preview Performance Images
//   const handleFileSelect = async (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//       uploadedUrl: null,
//     }));

//     setLocalImages((prev) => [...prev, ...previews]);
//     setUploading(true);

//     for (const file of files) {
//       await uploadFile(file);
//     }
//     setUploading(false);
//   };

//   const uploadFile = async (file) => {
//     const formData = new FormData();
//     formData.append("images", file);

//     try {
//       const res = await fetch(`${BASE_URL}/artists/profile/perf-images`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });
//       const data = await res.json();

//       const newImgUrl =
//         data?.data?.performanceInfo?.perfImgs?.[
//           data.data.performanceInfo.perfImgs.length - 1
//         ];

//       if (newImgUrl) {
//         // Keep the stored value as-is (backend may return absolute or relative). We'll normalize when rendering.
//         setLocalImages((prev) =>
//           prev.map((img) =>
//             img.file === file ? { ...img, uploadedUrl: newImgUrl } : img
//           )
//         );
//         setArtData((prev) => ({
//           ...prev,
//           performanceInfo: {
//             ...prev.performanceInfo,
//             perfImgs: [
//               ...(prev.performanceInfo?.perfImgs || []),
//               newImgUrl,
//             ],
//           },
//         }));
//         toast.success("Image uploaded successfully");
//       }
//     } catch (error) {
//       console.error("Upload failed", error);
//       toast.error("Failed to upload image");
//     }
//   };

//   // Print Portfolio
//   const handleDownloadPortfolio = () => {
//     document.body.classList.add("printing");
//     setTimeout(() => {
//       window.print();
//       setTimeout(() => {
//         document.body.classList.remove("printing");
//       }, 100);
//     }, 100);
//   };

//   return (
//     <>
//       <Artist_navbar />
//       <div className="dashboard-layout">
//         {/* Sidebar */}
//         <aside className="sidebar screen-only">
//           <h2 className="sidebar-title">Menu</h2>
//           <ul className="sidebar-menu">
//             {menuItems.map((item, i) => (
//               <li key={i}>
//                 {item.action ? (
//                   <button className="sidebar-link" onClick={item.action}>
//                     <span className="sidebar-icon">{item.icon}</span>
//                     <span className="sidebar-text">{item.name}</span>
//                   </button>
//                 ) : (
//                   <Link
//                     to={item.link}
//                     className={`sidebar-link ${
//                       location.pathname === item.link ? "active" : ""
//                     }`}
//                   >
//                     <span className="sidebar-icon">{item.icon}</span>
//                     <span className="sidebar-text">{item.name}</span>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Portfolio Section */}
//         <main className="portfolio-main-wrapper">
//           <div className="portfolio-actions screen-only">
//             <button
//               className="download-portfolio-btn"
//               onClick={handleDownloadPortfolio}
//             >
//               <FaDownload /> Download as PDF
//             </button>
//           </div>

//           <div className="portfolio-document">
//   {/* ===== WATERMARK (PRINT ONLY) ===== */}
//             <div className="watermark-container">
//                 <div className="watermark-text">eKalakaar</div>
//             </div>

//             {/* ===== HEADER ===== */}
//             <header className="cv-header">
//               <div className="cv-header-left">
//                 <div className="cv-photo-wrapper">
//                   {/* Fixed Profile Avatar */}
//                   <img
//                     src={getFullImageUrl(artdata?.personalInfo?.avatar?.url)}
//                     alt="Artist"
//                     className="cv-photo"
//                     onError={(e) => {
//                       console.error('Avatar load failed:', e.target.src);
//                       e.target.src = "/default-avatar.png";
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="cv-header-center">
//                 <h1 className="cv-name">
//                   {artdata?.personalInfo?.firstName} {artdata?.personalInfo?.lastName}
//                 </h1>
//                 <p className="cv-title">{artdata?.role || "Professional Artist"}</p>

//                 <div className="cv-contact-grid">
//                   <div className="contact-item">
//                     <FaEnvelope className="contact-icon" />
//                     <span>{artdata?.personalInfo?.email || "N/A"}</span>
//                   </div>
//                   <div className="contact-item">
//                     <FaPhone className="contact-icon" />
//                     <span>
//                       {artdata?.personalInfo?.contactNumber?.countryCode}{" "}
//                       {artdata?.personalInfo?.contactNumber?.number || "N/A"}
//                     </span>
//                   </div>
//                   <div className="contact-item">
//                     <FaMapMarkerAlt className="contact-icon" />
//                     <span>Pincode: {artdata?.address?.pincode || "N/A"}</span>
//                   </div>
//                 </div>

//                 <div className="cv-social-row">
//                   {artdata?.socialLinks?.instagram && (
//                     <a href={artdata?.socialLinks?.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
//                       <FaInstagram />
//                     </a>
//                   )}
//                   {artdata?.socialLinks?.facebook && (
//                     <a href={artdata?.socialLinks?.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
//                       <FaFacebook />
//                     </a>
//                   )}
//                   {artdata?.socialLinks?.youtube && (
//                     <a href={artdata?.socialLinks?.youtube} target="_blank" rel="noopener noreferrer" className="social-icon">
//                       <FaYoutube />
//                     </a>
//                   )}
//                   {artdata?.socialLinks?.linkedin && (
//                     <a href={artdata?.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
//                       <FaLinkedin />
//                     </a>
//                   )}
//                   {artdata?.socialLinks?.twitter && (
//                     <a href={artdata?.socialLinks?.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
//                       <FaTwitter />
//                     </a>
//                   )}
//                 </div>
//               </div>

//               <div className="cv-header-right">
//                 <div className="stats-card">
//                   <div className="stat-number">
//                     {artdata?.performanceInfo?.totalPerfs || 0}
//                   </div>
//                   <div className="stat-label">Performances</div>
//                 </div>
//                 <div className="stats-card">
//                   <div className="stat-number">
//                     {artdata?.awardsInfo?.totalAwards || 0}
//                   </div>
//                   <div className="stat-label">Awards</div>
//                 </div>
//               </div>
//             </header>

//             {/* ===== BODY ===== */}
//             <div className="cv-body">
//               {/* Professional Summary */}
//               <section className="cv-section">
//                 <h2 className="cv-section-title">
//                   <FaUser className="title-icon" />
//                   <span>Professional Summary</span>
//                 </h2>
//                 <div className="cv-section-content">
//                   <div className="summary-grid">
//                     <div className="summary-item">
//                       <strong>Age:</strong> {artdata?.personalInfo?.age || "N/A"}
//                     </div>
//                     <div className="summary-item">
//                       <strong>Gender:</strong> {artdata?.personalInfo?.gender || "N/A"}
//                     </div>
//                     <div className="summary-item summary-full">
//                       <strong>Languages:</strong>{" "}
//                       {artdata?.personalInfo?.languages?.join(", ") || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Artistic Profile */}
//               <section className="cv-section">
//                 <h2 className="cv-section-title">
//                   <FaMicrophone className="title-icon" />
//                   <span>Artistic Profile</span>
//                 </h2>
//                 <div className="cv-section-content">
//                   <table className="info-table">
//                     <tbody>
//                       <tr>
//                         <td className="table-label">Art Category</td>
//                         <td className="table-value">
//                           {artdata?.artInfo?.artCategory?.join(", ") || "N/A"}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="table-label">Art Name</td>
//                         <td className="table-value">
//                           {artdata?.artInfo?.artName?.join(", ") || "N/A"}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="table-label">Art Type</td>
//                         <td className="table-value">
//                           {artdata?.artInfo?.artType?.join(", ") || "N/A"}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   {artdata?.artInfo?.aboutArt && (
//                     <div className="about-section">
//                       <strong>About:</strong>
//                       <p>{artdata?.artInfo?.aboutArt}</p>
//                     </div>
//                   )}
//                 </div>
//               </section>

//               {/* Performance Experience */}
//               <section className="cv-section">
//                 <h2 className="cv-section-title">
//                   <IoMusicalNote className="title-icon" />
//                   <span>Performance Experience</span>
//                 </h2>
//                 <div className="cv-section-content">
//                   <div className="performance-cards">
//                     <div className="perf-card">
//                       <div className="perf-label">Total Performances</div>
//                       <div className="perf-value">
//                         {artdata?.performanceInfo?.totalPerfs || "N/A"}
//                       </div>
//                     </div>
//                     <div className="perf-card">
//                       <div className="perf-label">Peak Performance</div>
//                       <div className="perf-value">
//                         {artdata?.performanceInfo?.peakPerf || "N/A"}
//                       </div>
//                     </div>
//                     {/* <div className="perf-card">
//                       <div className="perf-label">Performance Type</div>
//                       <div className="perf-value">
//                         {artdata?.performanceInfo?.perfType || "N/A"}
//                       </div>
//                     </div> */}
//                   </div>
//                   {artdata?.performanceInfo?.highlights && (
//                     <div className="highlights-box">
//                       <strong>Highlights:</strong>
//                       <p>{artdata?.performanceInfo?.highlights}</p>
//                     </div>
//                   )}
//                 </div>
//               </section>

//               {/* Awards */}
//               <section className="cv-section">
//                 <h2 className="cv-section-title">
//                   <FaStarOfDavid className="title-icon" />
//                   <span>Awards & Recognition</span>
//                 </h2>
//                 <div className="cv-section-content">
//                   <div className="awards-layout">
//                     <div className="award-circle">
//                       <div className="award-number">
//                         {artdata?.awardsInfo?.totalAwards || 0}
//                       </div>
//                       <div className="award-text">Awards</div>
//                     </div>
//                     <div className="award-info">
//                       <p>
//                         <strong>Highest Level:</strong> {artdata?.awardsInfo?.level || "N/A"}
//                       </p>
//                       {artdata?.awardsInfo?.highlights && (
//                         <p className="award-desc">
//                           {artdata?.awardsInfo?.highlights}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Performance Gallery */}
//               <section className="cv-section screen-only">
//                 <h2 className="cv-section-title">
//                   <FaGlobe className="title-icon" />
//                   <span>Performance Gallery</span>
//                 </h2>

//                 <div className="cv-section-content">
//                   {/* <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleFileSelect}
//                     style={{ marginBottom: "10px" }}
//                   /> */}
//                   {uploading && <p style={{color: 'orange'}}>Uploading images...</p>}

//                   <div className="gallery-container">
//                     {[...(artdata?.performanceInfo?.perfImgs || []), ...localImages]
//                       .map((img, i) => {
//                         // Determine image URL
//                         let imageUrl;

//                         if (typeof img === 'string') {
//                           imageUrl = getFullImageUrl(img);
//                         } else if (img.uploadedUrl) {
//                           imageUrl = getFullImageUrl(img.uploadedUrl);
//                         } else if (img.preview) {
//                           imageUrl = img.preview;
//                         } else {
//                           imageUrl = getFullImageUrl(img);
//                         }

//                         console.log(`Image ${i} URL:`, imageUrl);

//                         return (
//                           <div key={i} className="gallery-image" style={{position: 'relative'}}>
//                             <img
//                               src={imageUrl}
//                               alt={`Performance ${i + 1}`}
//                               onError={(e) => {
//                                 console.error(`Failed to load image ${i}:`, e.target.src);
//                                 e.target.style.display = 'none';
//                                 const parent = e.target.parentElement;
//                                 if (parent && !parent.querySelector('.error-text')) {
//                                   const errorText = document.createElement('div');
//                                   errorText.className = 'error-text';
//                                   errorText.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#ef4444;font-size:12px;background:#fee;border-radius:8px;';
//                                   errorText.textContent = 'Failed to load';
//                                   parent.appendChild(errorText);
//                                 }
//                               }}
//                               style={{
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderRadius: '8px',
//                                 border: '1px solid #ddd'
//                               }}
//                             />
//                             {img.preview && (
//                               <p
//                                 style={{
//                                   fontSize: "12px",
//                                   color: img.uploadedUrl ? "green" : "orange",
//                                   textAlign: "center",
//                                   marginTop: '5px',
//                                   fontWeight: 'bold'
//                                 }}
//                               >
//                                 {img.uploadedUrl ? "✅ Uploaded" : "⏳ Uploading..."}
//                               </p>
//                             )}
//                           </div>
//                         );
//                       })}
//                   </div>
//                 </div>
//               </section>

//               {/* Calendar */}
//               {dateState.length > 0 && (
//                 <section className="cv-section screen-only">
//                   <h2 className="cv-section-title">
//                     <FaGlobe className="title-icon" />
//                     <span>Performance Schedule</span>
//                   </h2>
//                   <div className="cv-section-content">
//                     <Calendar value={dateState} className="portfolio-calendar" />
//                   </div>
//                 </section>
//               )}
//             </div>

//             <footer className="cv-footer print-only">
//               <p>Generated on {new Date().toLocaleDateString()}</p>
//             </footer>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

import "./displayPortfolio.css";
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
  FaTrophy,
  FaStar,
  FaArrowRight,
  FaCalendarAlt,
  FaImage,
} from "react-icons/fa";
import { IoMusicalNote } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Artist_navbar from "../Artist_navbar";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../../reducer/slices/authSlice";
// import "./modernPortfolio.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.ekalakaar.com';

export default function PortfolioDisplay1() {
  const [dateState, setDateState] = useState([]);
  const [artdata, setArtData] = useState({});
  const [localImages, setLocalImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFullImageUrl = (imageValue) => {
    if (!imageValue) return "/default-avatar.png";

    let raw = String(imageValue).replace(/[\u0000-\u001F\u007F]+/g, "").trim();
    if (!raw) return "/default-avatar.png";

    if (raw.startsWith("blob:")) return raw;
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith("//")) return "https:" + raw;

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

    const envBase = process.env.REACT_APP_BASE_URL || "https://api.ekalakaar.com";
    const API_HOST = String(envBase).replace(/\/api(\/v?1)?(\/.*)?$/i, "").replace(/\/+$/, "");

    return `${API_HOST}/images/${cleaned}`;
  };

  const handleLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    toast.success("Successfully logged out", { position: "top-center" });
    navigate("/login");
  };

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'expertise', 'performance', 'gallery', 'awards', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

  const handleDownloadPortfolio = () => {
    window.print();
  };

  return (
    <>
      <Artist_navbar />
      <div className="modern-portfolio-wrapper">
        {/* Modern Navbar */}
        
        <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-logo">eKalakaar</div>
          <ul className="nav-menu">
            <li><a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Home</a></li>
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#expertise" className={`nav-link ${activeSection === 'expertise' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('expertise'); }}>Expertise</a></li>
            <li><a href="#gallery" className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a></li>
            <li><a href="#awards" className={`nav-link ${activeSection === 'awards' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('awards'); }}>Awards</a></li>
          </ul>
          {/* <button className="nav-cta" onClick={() => scrollToSection('contact')}>
            Get in Touch <FaArrowRight /> */}
               <button>
          </button>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-decoration"></div>
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-label">Professional Artist</span>
              <h1 className="hero-title">
                Hi, I'm <span className="highlight">{artdata?.personalInfo?.firstName || "Artist"}</span>
                <br />
                {artdata?.role || "Professional Artist"}
              </h1>
              <p className="hero-subtitle">
                {artdata?.artInfo?.aboutArt || "Passionate about creating memorable artistic experiences"}
              </p>
              
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">{artdata?.performanceInfo?.totalPerfs || 0}+</div>
                  <div className="hero-stat-label">Performances</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">{artdata?.awardsInfo?.totalAwards || 0}</div>
                  <div className="hero-stat-label">Awards Won</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">{artdata?.personalInfo?.languages?.length || 0}</div>
                  <div className="hero-stat-label">Languages</div>
                </div>
              </div>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                  Contact Me <FaArrowRight />
                </button>
                <button className="btn-secondary" onClick={() => scrollToSection('gallery')}>
                  View Gallery <FaImage />
                </button>
              </div>

              <div className="hero-social">
                {artdata?.socialLinks?.instagram && (
                  <a href={artdata.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaInstagram />
                  </a>
                )}
                {artdata?.socialLinks?.facebook && (
                  <a href={artdata.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaFacebook />
                  </a>
                )}
                {artdata?.socialLinks?.youtube && (
                  <a href={artdata.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaYoutube />
                  </a>
                )}
                {artdata?.socialLinks?.linkedin && (
                  <a href={artdata.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaLinkedin />
                  </a>
                )}
                {artdata?.socialLinks?.twitter && (
                  <a href={artdata.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaTwitter />
                  </a>
                )}
              </div>
            </div>

            <div className="hero-image">
              <div className="hero-image-wrapper">
                <img 
                  src={getFullImageUrl(artdata?.personalInfo?.avatar?.url)} 
                  alt={`${artdata?.personalInfo?.firstName} ${artdata?.personalInfo?.lastName}`}
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
              <div className="hero-image-badge">
                <div className="badge-icon"><FaTrophy /></div>
                <div className="badge-text">Excellence in</div>
                <div className="badge-value">{artdata?.artInfo?.artCategory?.[0] || "Arts"}</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="section-header">
            {/* <span className="section-label">Get To Know</span> */}
            <h2 className="section-title">About Me</h2>
            {/* <p className="section-subtitle">
              Discover my journey, passion, and dedication to the arts
            </p> */}
          </div>

          <div className="about-content">
            <div className="about-info">
              <div className="info-group">
                <h3><FaUser /> Personal Details</h3>
                <p><strong>Age:</strong> {artdata?.personalInfo?.age || "N/A"}</p>
                <p><strong>Gender:</strong> {artdata?.personalInfo?.gender || "N/A"}</p>
                <p><strong>Languages:</strong> {artdata?.personalInfo?.languages?.join(", ") || "N/A"}</p>
              </div>

              <div className="info-group">
                <h3><FaMicrophone /> Art Specialization</h3>
                <p><strong>Category:</strong> {artdata?.artInfo?.artCategory?.join(", ") || "N/A"}</p>
                <p><strong>Art Name:</strong> {artdata?.artInfo?.artName?.join(", ") || "N/A"}</p>
                <p><strong>Type:</strong> {artdata?.artInfo?.artType?.join(", ") || "N/A"}</p>
              </div>

              <div className="info-group">
                <h3><FaEnvelope /> Contact Information</h3>
                <p><strong>Email:</strong> {artdata?.personalInfo?.email || "N/A"}</p>
                <p><strong>Phone:</strong> {artdata?.personalInfo?.contactNumber?.countryCode} {artdata?.personalInfo?.contactNumber?.number || "N/A"}</p>
                <p><strong>Location:</strong> Pincode {artdata?.address?.pincode || "N/A"}</p>
              </div>
            </div>

            <div className="about-image">
              <img 
                src={getFullImageUrl(artdata?.personalInfo?.avatar?.url)}
                alt="About"
                onError={(e) => {
                  e.target.src = "/default-avatar.png";
                }}
              />
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="section expertise-section">
          <div className="section-header">
            {/* <span className="section-label">What I Do</span> */}
            <h2 className="section-title">My Expertise</h2>
            {/* <p className="section-subtitle">
              Areas where I excel and continue to grow
            </p> */}
          </div>

          <div className="expertise-grid">
            <div className="expertise-card">
              <div className="expertise-icon"><IoMusicalNote /></div>
              <h3>Performance Art</h3>
              <p>Delivering captivating performances that resonate with audiences across diverse venues and platforms.</p>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon"><FaStar /></div>
              <h3>Award Winning</h3>
              <p>Recognized excellence with {artdata?.awardsInfo?.totalAwards || 0} prestigious awards at various levels.</p>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon"><FaGlobe /></div>
              <h3>Cultural Ambassador</h3>
              <p>Representing traditional art forms on national and international stages with pride.</p>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section id="performance" className="section">
          <div className="performance-highlight">
            <div className="performance-content">
              <div className="performance-text">
                <h3>Performance Excellence</h3>
                <p>{artdata?.performanceInfo?.highlights || "Dedicated to delivering exceptional performances that leave lasting impressions."}</p>
                <p style={{marginTop: '1rem'}}><strong>Peak Performance:</strong> {artdata?.performanceInfo?.peakPerf || "N/A"}</p>
              </div>

              <div className="performance-stats">
                <div className="perf-stat-card">
                  <div className="number">{artdata?.performanceInfo?.totalPerfs || 0}</div>
                  <div className="label">Total Performances</div>
                </div>
                <div className="perf-stat-card">
                  <div className="number">{artdata?.awardsInfo?.totalAwards || 0}</div>
                  <div className="label">Awards Received</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="section gallery-section">
          <div className="section-header">
            {/* <span className="section-label">Visual Journey</span> */}
            <h2 className="section-title">Performance Gallery</h2>
            {/* <p className="section-subtitle">
              Moments captured from my performances
            </p> */}
          </div>

          <div className="gallery-grid">
            {[...(artdata?.performanceInfo?.perfImgs || []), ...localImages].map((img, i) => {
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

              return (
                <div key={i} className="gallery-item">
                  <img
                    src={imageUrl}
                    alt={`Performance ${i + 1}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-overlay-text">Performance {i + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="section awards-section">
          <div className="section-header">
            {/* <span className="section-label">Recognition</span> */}
            <h2 className="section-title">Awards & Honors</h2>
            {/* <p className="section-subtitle">
              Celebrating achievements and milestones
            </p> */}
          </div>

          <div className="awards-showcase">
            <div className="awards-visual">
              <div className="award-circle-large">
                <div className="award-number">{artdata?.awardsInfo?.totalAwards || 0}</div>
                <div className="award-label">Awards</div>
              </div>
            </div>

            <div className="awards-list">
              <div className="award-item">
                <h4><FaTrophy /> Highest Level Achieved</h4>
                <p>{artdata?.awardsInfo?.level || "N/A"}</p>
              </div>

              <div className="award-item">
                <h4><FaStar /> Award Highlights</h4>
                <p>{artdata?.awardsInfo?.highlights || "Recognition for outstanding contributions to the arts."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="section-header">
            {/* <span className="section-label">Let's Connect</span> */}
            <h2 className="section-title">Get In Touch</h2>
            {/* <p className="section-subtitle">
              Have a project or collaboration in mind? Reach out!
            </p> */}
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon"><FaEnvelope /></div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>{artdata?.personalInfo?.email || "N/A"}</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon"><FaPhone /></div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>{artdata?.personalInfo?.contactNumber?.countryCode} {artdata?.personalInfo?.contactNumber?.number || "N/A"}</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon"><FaMapMarkerAlt /></div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Pincode: {artdata?.address?.pincode || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* <div className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>

              <div className="form-group">
                <label>Your Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Write your message here..."></textarea>
              </div>

              <button className="btn-primary" style={{width: '100%'}}>
                Send Message <FaArrowRight />
              </button>
            </div> */}
          </div>
        </section>

        <footer className="ek-footer">
  <div className="ek-footer-container">
    <div className="ek-footer-logo-col">
      {/* Place your logo SVG or <img src="logo.png" /> here */}
      <div className="ek-footer-logo">
        <span className="logo-ek">eK</span>
        <span className="logo-text">www.ekalakaar.com</span>
      </div>
    </div>
    <div className="ek-footer-links-col">
      <h4>Quick Links</h4>
      <ul>
        {menuItems.slice(0, 4).map((item, i) => (
          <li key={i}><Link to={item.link}>{item.name}</Link></li>
        ))}
      </ul>
    </div>
    <div className="ek-footer-links-col">
      <h4>More</h4>
      <ul>
        {menuItems.slice(4, 8).map((item, i) => (
          <li key={i}><Link to={item.link}>{item.name}</Link></li>
        ))}
      </ul>
    </div>
  </div>
  <div className="ek-footer-bottom">
    <p>&copy; 2025 eKalakaar. All rights reserved.</p>
  </div>
</footer>

      </div>
    </>
  );
}