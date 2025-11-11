import React, { useState } from "react";
import "../Applications/application.css"; 
// Ensure this path is correct
import { IoSearch } from "react-icons/io5";
import AdminNavbar from "../../Admin/Navbar/Navbar1"; // 1. Navbar ko import karein

// Sample data for skills. You can replace this with data from your backend.
const skillsData = {
  "Traditional Dance": ["Bharatanatyam", "Kathak", "Kuchipudi", "Kathakali", "Odissi", "Manipuri", "Sattriya"],
  "Traditional Music": ["Hindustani Classical", "Carnatic", "Ghazal", "Qawwali", "Bhajan", "Sufi"],
};

const SkillCard = ({ title, skills, searchQuery }) => {
  const [showAll, setShowAll] = useState(false);

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 5);

  return (
    <div className="skill-card">
      <h2 className="skill-card-title">{title}</h2>
      {filteredSkills.length > 0 ? (
        <ul>
          {displayedSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No skills found.</p>
      )}
      {filteredSkills.length > 5 && (
        <button onClick={() => setShowAll(!showAll)} className="see-more-btn">
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

const ManageSkills = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <AdminNavbar /> {/* 2. Navbar ko yahan add karein */}
      <div className="manage-skills-container">
        <h1 className="main-heading">Skills</h1>

        <div className="controls-container">
          <div className="search-bar">
            <IoSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search for skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="skills-grid">
          {Object.entries(skillsData).map(([category, skills]) => (
            <SkillCard key={category} title={category} skills={skills} searchQuery={searchQuery} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageSkills;
