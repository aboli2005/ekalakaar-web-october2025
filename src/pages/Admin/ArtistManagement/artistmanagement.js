import React, { useState, useEffect } from "react";
import { BiSolidHide } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import "./artistmanage.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import AdminNavbar from "../../Admin/Navbar/Navbar1";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://api.ekalakaar.com";
const DEFAULT_AVATAR =
  "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

const ArtistManagement = () => {
  const [selectedOption, setSelectedOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    artType: [],
    language: [],
    location: [],
    age: [],
    gender: [],
  });
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const itemsPerPage = 12;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // ✅ Normalize image URLs
  const getFullImageUrl = (imageValue) => {
    try {
      if (!imageValue) return DEFAULT_AVATAR;
      let s = String(imageValue).trim();

      if (s.startsWith("blob:")) return s;

      const abs = s.match(/https?:\/\/[^\s"']+/i);
      if (abs && abs[0]) return encodeURI(abs[0]);

      s = s
        .replace(/^\/+/, "")
        .replace(/^public\/(images|uploads)\//i, "")
        .replace(/^uploads\/avatars\//i, "")
        .replace(/^uploads\//i, "")
        .replace(/^images\//i, "")
        .replace(/^api\/v1\/images\//i, "")
        .replace(/^https?:\/\/api\.ekalakaar\.com\/(uploads\/)?avatars\//i, "")
        .replace(/^https?:\/\/api\.ekalakaar\.com\/api\/v1\/images\//i, "")
        .replace(/^https?:\/\/api\.ekalakaar\.com\//i, "");

      if (!s) return DEFAULT_AVATAR;

      let base = (process.env.REACT_APP_BASE_URL || BASE_URL).replace(/\/+$/, "");
      base = base.replace(/\/api(\/v?1)?(\/.*)?$/i, "");
      if (!/^https?:\/\//i.test(base)) base = "https://" + base;

      return encodeURI(`${base}/images/${s}`);
    } catch (err) {
      console.error("getFullImageUrl error:", err);
      return DEFAULT_AVATAR;
    }
  };

  // ✅ Fetch Artist Data
  useEffect(() => {
    const getUser = async () => {
      const toastId = toast.loading("Loading artists...");
      try {
        const response = await makeAuthenticatedGETRequest(
          `${BASE_URL}/admin/users?role=Artist`,
          token
        );
        setData(response.data);
        toast.dismiss(toastId);
        toast.success("Artists loaded successfully");
      } catch (error) {
        toast.dismiss(toastId);
        console.error("Error fetching artist data:", error);
        toast.error("Error loading artists");
      }
    };

    getUser();
  }, []);

  // ✅ Sorting
  const handleSelectChange = (e) => setSelectedOption(e.target.value);
  const getSortedProfiles = () => {
    switch (selectedOption) {
      case "ascending":
        return [...data].sort((a, b) => a.firstName.localeCompare(b.firstName));
      case "descending":
        return [...data].sort((a, b) => b.firstName.localeCompare(a.firstName));
      case "recentlyAdded":
        return [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return data;
    }
  };

  // ✅ Filtering and Search
  const applyFilters = (profile) => {
    const nameMatch = `${profile.firstName || ""} ${
      profile.lastName || ""
    }`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      nameMatch &&
      (filters.gender.length === 0 || filters.gender.includes(profile.gender))
    );
  };

  // ✅ Pagination and Search Fix
  useEffect(() => {
    const sortedProfiles = getSortedProfiles();

    // 1️⃣ Filter all data first
    const fullyFiltered = sortedProfiles.filter(applyFilters);

    // 2️⃣ Paginate filtered data
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, fullyFiltered.length);
    const profilesToDisplay = fullyFiltered.slice(startIndex, endIndex);

    // 3️⃣ Update state
    setFilteredProfiles(profilesToDisplay);
  }, [currentPage, filters, selectedOption, data, searchTerm]);

  // ✅ Calculate page count based on filtered data
  const pageCount = Math.ceil(
    getSortedProfiles().filter(applyFilters).length / itemsPerPage
  );

  // ✅ Handle pagination click
  const handlePageClick = (selectedPage) =>
    setCurrentPage(selectedPage.selected);

  return (
    <>
      <AdminNavbar />
      <div className="artist_management">
        <div className="artist_management_topdivision">
          <h1>🎨 Artist Management</h1>
          <BiSolidHide className="hiddenicon" />
        </div>

        {/* 🔍 Search + Filter + Sort */}
        <div className="artist_controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search artists by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="stats-box">
            <span>Total Artists:</span>
            <strong>{filteredProfiles?.length}</strong>
          </div>

          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="sort-select"
          >
            <option value="default">Sort by</option>
            <option value="ascending">A → Z</option>
            <option value="descending">Z → A</option>
            <option value="recentlyAdded">Recently Added</option>
          </select>
        </div>

        {/* Artist Grid */}
        <div className="artist_grid">
          {filteredProfiles?.map((profile) => {
            const avatarUrl = getFullImageUrl(profile?.avatar?.url);
            return (
              <div key={profile._id} className="artist_card">
                <Link
                  to="/artistProfile"
                  onClick={() => localStorage.setItem("artId", profile._id)}
                >
                  <img
                    src={avatarUrl}
                    alt={profile.firstName || "Artist"}
                    className="artist_profile_img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_AVATAR;
                    }}
                  />
                  <div className="artist_card_body">
                    <h3>{profile.firstName || "Unnamed"}</h3>
                    <p>{profile.role || "Artist"}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default ArtistManagement;
