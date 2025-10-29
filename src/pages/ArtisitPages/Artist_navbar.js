import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../FrontPage/Images/image.png";
import "./Artist_navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../reducer/slices/authSlice";

export default function ArtistNavbar() {
  const [accountPopupVisible, setAccountPopupVisible] = useState(false);
  const accountPopupRef = useRef(null);
  const accountBtnRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // popup absolute position (computed)
  const [popupStyle, setPopupStyle] = useState({ top: 0, left: 0, width: 260 });

  const computePopupPosition = useCallback(() => {
    if (!accountBtnRef.current) return;
    const rect = accountBtnRef.current.getBoundingClientRect();
    const width = 260;
    const padding = 8;
    // default align right edge of popup to right edge of button
    let left = rect.right - width + window.scrollX;
    // clamp to viewport
    if (left < 8 + window.scrollX) left = rect.left + window.scrollX;
    if (left + width > window.innerWidth - 8 + window.scrollX)
      left = Math.max(8 + window.scrollX, window.innerWidth - width - 8 + window.scrollX);
    const top = rect.bottom + window.scrollY + padding;
    setPopupStyle({ top, left, width });
  }, []);

  const toggleAccountPopup = () => {
    const next = !accountPopupVisible;
    if (next) {
      computePopupPosition();
    }
    setAccountPopupVisible(next);
  };

  // close on clicks outside popup or button
  const handleClickOutside = useCallback(
    (event) => {
      const target = event.target;
      if (
        accountPopupRef.current &&
        !accountPopupRef.current.contains(target) &&
        accountBtnRef.current &&
        !accountBtnRef.current.contains(target)
      ) {
        setAccountPopupVisible(false);
      }
    },
    [accountPopupRef, accountBtnRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // reposition on resize/scroll while visible
    const handleWindow = () => {
      if (accountPopupVisible) computePopupPosition();
    };
    window.addEventListener("resize", handleWindow);
    window.addEventListener("scroll", handleWindow, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleWindow);
      window.removeEventListener("scroll", handleWindow, true);
    };
  }, [accountPopupVisible, handleClickOutside, computePopupPosition]);

  // logout handler
  const handleLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    toast.success("Successfully logged out", {
      position: "top-center",
    });
    setAccountPopupVisible(false);
    navigate("/login");
  };

  // Popup content (rendered as portal)
  const popupNode = accountPopupVisible ? (
    <div
      ref={accountPopupRef}
      className="account-popup"
      style={{
        position: "absolute",
        top: `${popupStyle.top}px`,
        left: `${popupStyle.left}px`,
        width: `${popupStyle.width}px`,
        zIndex: 10000,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    >
      <Link
        to="/ArtistDashboard"
        className="popup-link"
        onClick={() => setAccountPopupVisible(false)}
      >
        {/* optional icon */}
        <span className="popup-icon">🏠</span>
        <span>Dashboard</span>
      </Link>

      <button className="popup-link logout-btn" onClick={handleLogout} type="button">
        <span className="popup-icon">🔓</span>
        <span>Logout</span>
      </button>
    </div>
  ) : null;

  return (
    <>
      <Navbar
        style={{
          zIndex: 999,
          position: "sticky",
          top: 0,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: "8px 20px",
        }}
        expand="lg"
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Navbar.Brand className="navbar-brand" style={{ marginLeft: 0 }}>
            <Link to="/" aria-label="Home">
              <img src={Logo} height="40" width="40" alt="eK logo" />
            </Link>
          </Navbar.Brand>

          {/* Right side: account button */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button
              ref={accountBtnRef}
              onClick={toggleAccountPopup}
              aria-haspopup="true"
              aria-expanded={accountPopupVisible}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 60 60"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="30" cy="30" r="20" fill="#AD2F3B" />
                <path
                  d="M30 22c1.1 0 2.1.4 2.8 1.2.8.7 1.2 1.7 1.2 2.8 0 1.1-.4 2.1-1.2 2.8-.7.8-1.7 1.2-2.8 1.2s-2.1-.4-2.8-1.2c-.8-.7-1.2-1.7-1.2-2.8 0-1.1.4-2.1 1.2-2.8.7-.8 1.7-1.2 2.8-1.2zm0 11c3.3 0 7 1.3 7 4v2H23v-2c0-2.7 3.7-4 7-4z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </Navbar>

      {/* Render popup into body so it's not clipped/overlapped */}
      {createPortal(popupNode, document.body)}
    </>
  );
}
