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





// import React, { useState, useEffect } from "react";
// import { BiSolidHide } from "react-icons/bi";
// import { FiSearch, FiFilter } from "react-icons/fi";
// import ReactPaginate from "react-paginate";
// import "./artistmanage.css";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
// import AdminNavbar from "../../Admin/Navbar/Navbar1";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "https://api.ekalakaar.com";
// const DEFAULT_AVATAR = "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";

// const ART_TYPES = [
//   "Singer", "Dancer", "Painter", "Musician", "Writer", "Actor"
// ];

// const LOCATIONS = [
//   "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Lucknow"
// ];

// const LANGUAGES = [
//   "Hindi", "English", "Tamil", "Bengali", "Marathi", "Gujarati", "Punjabi"
// ];

// const AWARDS = [
//   "Padma Shri", "National Award", "Kala Samman", "None"
// ];

// const AGE_RANGES = [
//   { label: "Under 18", min: 0, max: 17 },
//   { label: "18-25", min: 18, max: 25 },
//   { label: "26-40", min: 26, max: 40 },
//   { label: "41+", min: 41, max: 120 }
// ];

// const ArtistManagement = () => {
//   const [selectedOption, setSelectedOption] = useState("default");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     artType: [],
//     language: [],
//     location: [],
//     age: [],
//     award: []
//   });
//   const [filteredProfiles, setFilteredProfiles] = useState([]);

//   const itemsPerPage = 12;
//   const token = localStorage.getItem("accessToken");
//   const navigate = useNavigate();

//   // Normalize image URLs
//   const getFullImageUrl = (imageValue) => {
//     try {
//       if (!imageValue) return DEFAULT_AVATAR;
//       let s = String(imageValue).trim();
//       if (s.startsWith("blob:")) return s;
//       const abs = s.match(/https?:\/\/[^\s"']+/i);
//       if (abs && abs[0]) return encodeURI(abs[0]);
//       s = s.replace(/^\/+/, "")
//         .replace(/^public\/(images|uploads)\//i, "")
//         .replace(/^uploads\/avatars\//i, "")
//         .replace(/^uploads\//i, "")
//         .replace(/^images\//i, "")
//         .replace(/^api\/v1\/images\//i, "")
//         .replace(/^https?:\/\/api\.ekalakaar\.com\/(uploads\/)?avatars\//i, "")
//         .replace(/^https?:\/\/api\.ekalakaar\.com\/api\/v1\/images\//i, "")
//         .replace(/^https?:\/\/api\.ekalakaar\.com\//i, "");
//       if (!s) return DEFAULT_AVATAR;
//       let base = (process.env.REACT_APP_BASE_URL || BASE_URL).replace(/\/+$/, "");
//       base = base.replace(/\/api(\/v?1)?(\/.*)?$/i, "");
//       if (!/^https?:\/\//i.test(base)) base = "https://" + base;
//       return encodeURI(`${base}/images/${s}`);
//     } catch (err) {
//       console.error("getFullImageUrl error:", err);
//       return DEFAULT_AVATAR;
//     }
//   };

//   // Fetch Artist Data & print nested keys
//   useEffect(() => {
//     const getUser = async () => {
//       const toastId = toast.loading("Loading artists...");
//       try {
//         const response = await makeAuthenticatedGETRequest(
//           `${BASE_URL}/admin/users?role=Artist`,
//           token
//         );
//         setData(response.data);

//         // LOG nested structure for diagnosis
//         response.data.slice(0, 5).forEach((artist, idx) => {
//           console.log(`ARTIST ${idx + 1} personalInfo:`, artist.personalInfo);
//           console.log(`ARTIST ${idx + 1} artInfo:`, artist.artInfo);
//           console.log(`ARTIST ${idx + 1} awardsInfo:`, artist.awardsInfo);
//         });

//         toast.dismiss(toastId);
//         toast.success("Artists loaded successfully");
//       } catch (error) {
//         toast.dismiss(toastId);
//         console.error("Error fetching artist data:", error);
//         toast.error("Error loading artists");
//       }
//     };
//     getUser();
//   }, []);

//   // Sorting
//   const handleSelectChange = (e) => setSelectedOption(e.target.value);
//   const getSortedProfiles = () => {
//     switch (selectedOption) {
//       case "ascending":
//         return [...data].sort((a, b) => a.firstName.localeCompare(b.firstName));
//       case "descending":
//         return [...data].sort((a, b) => b.firstName.localeCompare(a.firstName));
//       case "recentlyAdded":
//         return [...data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//       default:
//         return data;
//     }
//   };

//   // Filter Logic — using nested keys
//   const applyFilters = (profile) => {
//     // Name
//     const name =
//       `${profile.firstName || ""} ${profile.lastName || ""}`.toLowerCase();
//     const nameMatch = name.includes(searchTerm.toLowerCase());

//     // ART TYPE (artInfo.primaryArtType)
//     const artValue = (profile.artInfo?.primaryArtType || "").toLowerCase();
//     const artMatch =
//       filters.artType.length === 0 ||
//       filters.artType.map(a => a.toLowerCase()).includes(artValue);

//     // LOCATION (personalInfo.city)
//     const locationValue = (profile.personalInfo?.city || "").toLowerCase();
//     const locMatch =
//       filters.location.length === 0 ||
//       filters.location.map(l => l.toLowerCase()).includes(locationValue);

//     // LANGUAGE (personalInfo.language, as comma separated string)
//     const langValue = profile.personalInfo?.language;
//     const langArr = typeof langValue === "string"
//       ? langValue.split(",").map(l => l.trim().toLowerCase())
//       : [];
//     const langMatch =
//       filters.language.length === 0 ||
//       filters.language.some(l => langArr.includes(l.toLowerCase()));

//     // AWARD (awardsInfo.awards - as array or comma string)
//     const awardValue = profile.awardsInfo?.awards;
//     const awardArr = Array.isArray(awardValue)
//       ? awardValue.map(a => a.toLowerCase())
//       : typeof awardValue === "string"
//         ? awardValue.split(",").map(a => a.trim().toLowerCase())
//         : [];
//     const awardMatch =
//       filters.award.length === 0 ||
//       filters.award.some(a => awardArr.includes(a.toLowerCase()));

//     // AGE (personalInfo.dob)
//     let age;
//     if (profile.personalInfo?.dob) {
//       const birthDate = new Date(profile.personalInfo.dob);
//       age = new Date().getFullYear() - birthDate.getFullYear();
//     }
//     const ageMatch =
//       filters.age.length === 0 ||
//       (typeof age === "number" && filters.age.some(
//         range => age >= range.min && age <= range.max
//       ));

//     return nameMatch && artMatch && ageMatch && langMatch && locMatch && awardMatch;
//   };

//   useEffect(() => {
//     const sortedProfiles = getSortedProfiles();
//     const fullyFiltered = sortedProfiles.filter(applyFilters);
//     const startIndex = currentPage * itemsPerPage;
//     const endIndex = Math.min(startIndex + itemsPerPage, fullyFiltered.length);
//     const profilesToDisplay = fullyFiltered.slice(startIndex, endIndex);
//     setFilteredProfiles(profilesToDisplay);
//   }, [currentPage, filters, selectedOption, data, searchTerm]);

//   const pageCount = Math.ceil(
//     getSortedProfiles().filter(applyFilters).length / itemsPerPage
//   );

//   const handlePageClick = (selectedPage) => setCurrentPage(selectedPage.selected);

//   // Filter handlers
//   const toggleFilterPanel = () => setShowFilters((v) => !v);

//   const handleMultiSelect = (type, value) => {
//     setFilters((prev) => {
//       let arr = prev[type];
//       if (type === "age") {
//         arr = arr.some((rng) => rng.label === value.label)
//           ? arr.filter((rng) => rng.label !== value.label)
//           : [...arr, value];
//       } else {
//         arr = arr.includes(value)
//           ? arr.filter((v) => v !== value)
//           : [...arr, value];
//       }
//       return { ...prev, [type]: arr };
//     });
//   };

//   // Filter panel JSX
//   const renderFilterPanel = (
//     <div className="filter-panel">
//       <strong>Filter by:</strong>
//       <div className="filter-row">
//         <span>Art:</span>
//         {ART_TYPES.map((a) => (
//           <label key={a} className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={filters.artType.includes(a)}
//               onChange={() => handleMultiSelect("artType", a)}
//             />
//             {a}
//           </label>
//         ))}
//       </div>
//       <div className="filter-row">
//         <span>Age:</span>
//         {AGE_RANGES.map((rng) => (
//           <label key={rng.label} className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={filters.age.some((r) => r.label === rng.label)}
//               onChange={() => handleMultiSelect("age", rng)}
//             />
//             {rng.label}
//           </label>
//         ))}
//       </div>
//       <div className="filter-row">
//         <span>Location:</span>
//         {LOCATIONS.map((loc) => (
//           <label key={loc} className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={filters.location.includes(loc)}
//               onChange={() => handleMultiSelect("location", loc)}
//             />
//             {loc}
//           </label>
//         ))}
//       </div>
//       <div className="filter-row">
//         <span>Language:</span>
//         {LANGUAGES.map((lang) => (
//           <label key={lang} className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={filters.language.includes(lang)}
//               onChange={() => handleMultiSelect("language", lang)}
//             />
//             {lang}
//           </label>
//         ))}
//       </div>
//       <div className="filter-row">
//         <span>Award:</span>
//         {AWARDS.map((awrd) => (
//           <label key={awrd} className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={filters.award.includes(awrd)}
//               onChange={() => handleMultiSelect("award", awrd)}
//             />
//             {awrd}
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <AdminNavbar />
//       <div className="artist_management">
//         <div className="artist_management_topdivision">
//           <h1>🎨 Artist Management</h1>
//           <BiSolidHide className="hiddenicon" />
//         </div>
//         <div className="artist_controls">
//           <div className="search-bar">
//             <FiSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search artists by name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button className="btn filter-btn" onClick={toggleFilterPanel}>
//             <FiFilter /> Filters
//           </button>
//           <div className="stats-box">
//             <span>Total Artists:</span>
//             <strong>{filteredProfiles?.length}</strong>
//           </div>
//           <select
//             value={selectedOption}
//             onChange={handleSelectChange}
//             className="sort-select"
//           >
//             <option value="default">Sort by</option>
//             <option value="ascending">A → Z</option>
//             <option value="descending">Z → A</option>
//             <option value="recentlyAdded">Recently Added</option>
//           </select>
//         </div>
//         {showFilters && renderFilterPanel}
//         <div className="artist_grid">
//           {filteredProfiles?.map((profile) => {
//             const avatarUrl = getFullImageUrl(profile?.avatar?.url);
//             return (
//               <div key={profile._id} className="artist_card">
//                 <Link
//                   to="/artistProfile"
//                   onClick={() => localStorage.setItem("artId", profile._id)}
//                 >
//                   <img
//                     src={avatarUrl}
//                     alt={profile.firstName || "Artist"}
//                     className="artist_profile_img"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = DEFAULT_AVATAR;
//                     }}
//                   />
//                   <div className="artist_card_body">
//                     <h3>{profile.firstName || "Unnamed"}</h3>
//                     <p>{profile.artInfo?.primaryArtType || "Artist"}</p>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//         <ReactPaginate
//           previousLabel={"<"}
//           nextLabel={">"}
//           breakLabel={"..."}
//           pageCount={pageCount}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     </>
//   );
// };

// export default ArtistManagement;

