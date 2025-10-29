



import AdminNavbar from "../../Admin/Navbar/Navbar1";
import { IoSearch } from "react-icons/io5";
import "../Applications/application.css";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const ManageLanguages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("0"); 
  const languages = [
    "Tamil",
    "Kannada",
    "Telugu",
    "Hindi",
    "Marathi",
    "Bengali",
    "Urdu",
  ];

  const filteredLanguages = languages.filter((language) =>
    language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const languagesToShow = selectedFilter === "0" ? filteredLanguages : [selectedFilter];

  return (
    <>
    <AdminNavbar />
    <h1 className="manage_languages_heading">Languages</h1>
    <div className="container">
      <div className="filter-dropdown-applications">
        <div className="search">
          <IoSearch className="searchicon" />
          <input
            type="search"
            placeholder="Search Language"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter">
          Filter
          <select
            className="dropdown-applications"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="0"></option>
            <option value="Patron">Patron</option>
          </select>
        </div>
      </div>
      <div className="traditionaldance">
        <div className="traditionaldance-left-div">
       
          <ul>
            {languagesToShow.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
            <li>
              <div className="dashboard-filter">
                <select className="dashboard-select" defaultValue="seeMore">
                  <option value="seeMore">
                    See more <RiArrowDropDownLine />
                  </option>
                  <option value="Bengali">Bengali</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Kashmiri">Kashmiri</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Tulu">Tulu</option>
                  <option value="Kashmiri">Kashmiri</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
        <div className="traditionaldance-right-div">
          <img src="./Dance.png" alt="Traditional Dance" />
        </div>
      </div>
      
    </div></>
  );
};

export default ManageLanguages;

