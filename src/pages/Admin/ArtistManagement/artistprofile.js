import React, { useEffect, useState } from "react";
import {
  FaMicrophone,
  FaStarOfDavid,
  FaUser,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaTimes,
} from "react-icons/fa";
import "./artistprofile.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { Link } from "react-router-dom";
import AdminNavbar from "../../Admin/Navbar/Navbar1";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://api.ekalakaar.com";

const ArtistProfile = () => {
  const [dateState, setDateState] = useState([]);
  const [artdata, setArtData] = useState({});
  const [activeTab, setActiveTab] = useState("about");
  const [videoModal, setVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const artId = localStorage.getItem("artId");
  const token = localStorage.getItem("accessToken");

  const getartist = async () => {
    const toastId = toast.loading("Loading profile...");
    try {
      const artistData = await makeAuthenticatedGETRequest(
        `${BASE_URL}/admin/user/${artId}`,
        token
      );
      console.log("🎯 Raw Response:", artistData);
      setArtData(artistData?.data || {});
      toast.dismiss(toastId);
      toast.success("Profile loaded");
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Error loading profile");
    }
  };

  useEffect(() => {
    getartist();
  }, []);

  const splitDate = (date) => {
    if (!date) return null;
    return String(date).split("T")[0];
  };

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to open video modal
  const openVideoModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setVideoModal(true);
  };

  // Function to close video modal
  const closeVideoModal = () => {
    setVideoModal(false);
    setCurrentVideo("");
  };

  // Safe accessors for API inconsistencies
  const personalInfo = artdata?.personalInfo || artdata?._doc?.personalInfo || {};
  const artInfo = artdata?.artInfo || artdata?._doc?.artInfo || {};
  const awardsInfo = artdata?.awardsInfo || artdata?._doc?.awardsInfo || {};
  const performanceInfo =
    artdata?.performanceInfo || artdata?._doc?.performanceInfo || {};

  // Robust helper to build final image URL
  const getFullImageUrl = (imageValue) => {
    try {
      if (!imageValue) return "/default-avatar.png";

      let s = String(imageValue).trim();

      if (s.startsWith("blob:")) return s;

      const abs = s.match(/https?:\/\/[^\s,]+/i);
      if (abs && abs[0]) {
        return encodeURI(abs[0]);
      }

      if (s.startsWith("//")) return "https:" + s;

      s = s.replace(/^\/+/, "");
      s = s.replace(/^public\/images\//i, "");
      s = s.replace(/^public\/uploads\//i, "");
      s = s.replace(/^uploads\/performance\//i, "");
      s = s.replace(/^uploads\//i, "");
      s = s.replace(/^images\//i, "");
      s = s.replace(/^api\/v1\/images\//i, "");
      s = s.replace(/^https?:\/\/api\.ekalakaar\.com\/uploads\/performance\//i, "");
      s = s.replace(/^https?:\/\/api\.ekalakaar\.com\/api\/v1\/images\//i, "");
      s = s.replace(/^https?:\/\/api\.ekalakaar\.com\//i, "");
      s = s.replace(/^\/api\/v1\/images\//i, "");
      s = s.trim();

      if (!s) return "/default-avatar.png";

      let base = (process.env.REACT_APP_BASE_URL || BASE_URL).replace(/\/+$/, "");
      base = base.replace(/\/api(\/v?1)?(\/.*)?$/i, "");
      if (!/^https?:\/\//i.test(base)) {
        base = "https://" + base;
      }

      if (/^[\w.-]+\//.test(s)) {
        if (!/^https?:\/\//i.test(s)) {
          return encodeURI("https://" + s);
        }
      }

      const final = `${base.replace(/\/$/, "")}/images/${s}`;
      return encodeURI(final);
    } catch (err) {
      console.error("getFullImageUrl error:", err, imageValue);
      return "/default-avatar.png";
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="artist-profile-page">
        {/* Banner */}
        <div className="artist-banner">
          <div
            className="artist-cover"
            role="img"
            aria-label="Artist cover"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(196,40,45,0.9), rgba(210,86,88,0.9)), url('')",
            }}
          />

          <div className="artist-banner-inner">
            <div className="artist-avatar">
              <img
                src={getFullImageUrl(
                  artdata?.avatar?.url || personalInfo?.avatar?.url || ""
                )}
                alt="Artist avatar"
                onError={(e) => {
                  try {
                    const failed = e.target.src || "";
                    if (failed.includes("%40")) {
                      e.target.onerror = null;
                      e.target.src = failed.replace(/%40/g, "@");
                      return;
                    }
                    const raw =
                      artdata?.avatar?.url || personalInfo?.avatar?.url || "";
                    const normalized = getFullImageUrl(raw);
                    if (normalized && normalized !== failed) {
                      e.target.onerror = null;
                      e.target.src = normalized;
                      return;
                    }
                  } catch (err) {
                    // fallback to generic avatar
                  }
                  e.target.onerror = null;
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                }}
              />
            </div>

            <div className="artist-meta">
              <h1 className="artist-name">
                {artdata?.firstName || personalInfo?.firstName}{" "}
                {artdata?.lastName || personalInfo?.lastName}
              </h1>
              <p className="artist-role">{artdata?.role || "Artist"}</p>

              <div className="artist-socials">
                <a
                  href={
                    artdata?.socialLinks?.instagram ||
                    personalInfo?.socialLinks?.instagram ||
                    "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href={
                    artdata?.socialLinks?.facebook ||
                    personalInfo?.socialLinks?.facebook ||
                    "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook />
                </a>
                <a
                  href={
                    artdata?.socialLinks?.youtube ||
                    personalInfo?.socialLinks?.youtube ||
                    "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaYoutube />
                </a>
                <a
                  href={
                    artdata?.socialLinks?.linkedin ||
                    personalInfo?.socialLinks?.linkedin ||
                    "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={
                    artdata?.socialLinks?.twitter ||
                    personalInfo?.socialLinks?.twitter ||
                    "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="artist-tabs">
          <button
            className={activeTab === "about" ? "tab active" : "tab"}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={activeTab === "performances" ? "tab active" : "tab"}
            onClick={() => setActiveTab("performances")}
          >
            Performance
          </button>
          <button
            className={activeTab === "awards" ? "tab active" : "tab"}
            onClick={() => setActiveTab("awards")}
          >
            Awards
          </button>
          <button
            className={activeTab === "media" ? "tab active" : "tab"}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
        </div>

        <div className="artist-profile-container">
          {/* About Tab */}
          {activeTab === "about" && (
            <div className="artist-card">
              <h2>
                <FaUser /> Basic Profile
              </h2>
              <div className="profile-grid">
                <p>📛 First Name:</p>{" "}
                <p>
                  {artdata?.firstName ||
                    personalInfo?.firstName ||
                    "Not Provided"}
                </p>
                <p>📛 Last Name:</p>{" "}
                <p>
                  {artdata?.lastName || personalInfo?.lastName || "Not Provided"}
                </p>
                <p>📧 Email:</p>{" "}
                <p>
                  {artdata?.email || personalInfo?.email || "Not Provided"}
                </p>
                <p>📱 Contact:</p>{" "}
                <p>
                  {artdata?.phoneNumber?.number ||
                    personalInfo?.contactNumber?.number ||
                    "Not Provided"}
                </p>
                <p>🎂 Age:</p> <p>{personalInfo?.age || "Not Provided"}</p>
                <p>⚧ Gender:</p>{" "}
                <p>{personalInfo?.gender || "Not Provided"}</p>
                <p>📍 Pincode:</p>{" "}
                <p>{artdata?.address?.pincode || "Not Provided"}</p>
                <p>🌐 Languages:</p>{" "}
                <p>
                  {personalInfo?.languages?.join(", ") || "Not Provided"}
                </p>
              </div>

              <h2 style={{ marginTop: "25px" }}>📅 Performance Calendar</h2>
              <Calendar value={dateState.map(splitDate)} />
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === "performances" && (
            <div className="artist-card">
              <h2>
                <FaMicrophone /> Art & Performance Profile
              </h2>
              <p>
                <b>🎭 Category:</b>{" "}
                {artInfo?.artCategory?.join(", ") || "Not Provided"}
              </p>
              <p>
                <b>🎵 Name of Art:</b>{" "}
                {artInfo?.artName?.join(", ") || "Not Provided"}
              </p>
              <p>
                <b>🎨 Type of Art:</b>{" "}
                {artInfo?.artType?.join(", ") || "Not Provided"}
              </p>
              <hr />
              <p>
                <b>🎤 Total Performances:</b>{" "}
                {performanceInfo?.totalPerfs || "0"}
              </p>
              <p>
                <b>🔥 Peak Performance:</b>{" "}
                {performanceInfo?.peakPerf || "Not Provided"}
              </p>
            </div>
          )}

          {/* Awards Tab */}
          {activeTab === "awards" && (
            <div className="artist-card">
              <h2>
                <FaStarOfDavid /> Awards
              </h2>
              <p>
                <b>🏆 Total Awards:</b> {awardsInfo?.totalAwards || "0"}
              </p>
              <p>
                <b>⭐ Highest Level:</b> {awardsInfo?.level || "Not Provided"}
              </p>
              <p>
                <b>✨ Highlights:</b>{" "}
                {awardsInfo?.highlights || "No highlights"}
              </p>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="artist-card">
              <h2>🖼️ Images</h2>
              <div className="image-gallery">
                {(performanceInfo?.perfImgs || []).map((img, i) => {
                  try {
                    let url = img;
                    if (!url) return null;
                    if (!String(url).startsWith("blob:")) {
                      url = getFullImageUrl(url);
                    }
                    return (
                      <img
                        key={i}
                        src={url}
                        alt={`Performance ${i + 1}`}
                        onError={(e) => {
                          try {
                            const fallback = getFullImageUrl(img);
                            if (fallback && fallback !== e.target.src) {
                              e.target.onerror = null;
                              e.target.src = fallback;
                              return;
                            }
                          } catch (err) {
                            console.warn("image fallback err", err);
                          }
                          e.target.onerror = null;
                          e.target.style.opacity = 0.6;
                        }}
                      />
                    );
                  } catch (err) {
                    console.error("gallery render err", err);
                    return null;
                  }
                })}
              </div>

              <h2 style={{ marginTop: "20px" }}>🎬 Videos</h2>
              {performanceInfo?.perfVideos &&
              performanceInfo.perfVideos.length > 0 ? (
                <div className="video-links-container">
                  {performanceInfo.perfVideos
                    .filter((videoUrl) => videoUrl && videoUrl.trim())
                    .map((videoUrl, index) => (
                      <div key={index} className="video-link-item">
                        <button
                          className="video-link-button"
                          onClick={() => openVideoModal(videoUrl)}
                        >
                          <FaYoutube className="video-icon" />
                          <span>Performance Video {index + 1}</span>
                        </button>
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="external-link"
                        >
                          Open in new tab →
                        </a>
                      </div>
                    ))}
                </div>
              ) : (
                <p style={{ color: "#999", fontStyle: "italic" }}>
                  No videos available
                </p>
              )}
            </div>
          )}
        </div>

        {/* Video Modal */}
        {videoModal && (
          <div className="video-modal-overlay" onClick={closeVideoModal}>
            <div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="video-modal-close" onClick={closeVideoModal}>
                <FaTimes />
              </button>
              <div className="video-modal-player">
                {getYouTubeVideoId(currentVideo) ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      currentVideo
                    )}?autoplay=1`}
                    title="Performance Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video controls autoPlay style={{ width: "100%", height: "100%" }}>
                    <source src={currentVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtistProfile;