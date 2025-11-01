import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "../ManageUser/User.css";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPATCHRequest,
} from "../../services/serverHelper";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Admin/Navbar/Navbar1";
import jsPDF from "jspdf";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OppApplications = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const OppId = localStorage.getItem("oppApplicationsId");

  useEffect(() => {
    const getApplications = async () => {
      const toastId = toast.loading("loading...");
      try {
        const response = await makeAuthenticatedGETRequest(
          `${BASE_URL}/admin/oppapps?opportunityId=${OppId}`,
          token
        );

        setData(response);
        toast.dismiss(toastId);
        toast.success("Applications loaded successfully");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Error fetching artist data");
      }
    };

    getApplications();
  }, []);

  const updateAppStatus = async (id, data) => {
    const toastId = toast.loading("loading...");
    try {
      await makeAuthenticatedPATCHRequest(
        `${BASE_URL}/admin/updateappstatus?id=${id}`,
        data,
        token
      );
      toast.dismiss(toastId);
      toast.success("Application Updated successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error);
    }
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredData =
    data &&
    data.filter(
      (item) =>
        item.appliedBy &&
        (item.appliedBy.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          item.appliedBy.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (item.appliedBy.phoneNumber &&
            item.appliedBy.phoneNumber.number.includes(
              searchQuery.toLowerCase()
            )))
    );

  const pageCount = Math.ceil(
    filteredData && filteredData.length / itemsPerPage
  );
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredData && filteredData.slice(indexOfFirstItem, indexOfLastItem);

  function splitDate(date) {
    if (!date) return "N/A";
    const dateToSplit = String(date);
    const dateParts = dateToSplit.split("T");
    return dateParts[0];
  }

  // PDF EXPORT FUNCTION
  const exportToPDF = (application) => {
    const applicant = application.appliedBy;
    const opp = application.opportunity;
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFillColor(90, 50, 150);
    doc.rect(0, 0, 210, 40, "F");

    doc.setFontSize(20).setTextColor(255, 255, 255);
    doc.text(
      `${applicant.firstName || ""} ${applicant.lastName || ""}`,
      20,
      20
    );
    doc.setFontSize(12).setTextColor(220, 220, 220);
    doc.text(`${applicant.role || "Artist"}`, 20, 30);

    let y = 50;

    doc.setFillColor(245, 245, 245);
    doc.roundedRect(10, y, 90, 100, 3, 3, "F");
    doc.setFontSize(14).setTextColor(70, 50, 130);
    doc.text("Applicant Information", 15, y + 10);

    doc.setFontSize(11).setTextColor(50, 50, 50);
    let ay = y + 20;
    doc.text(`Email: ${applicant.email || "N/A"}`, 15, ay);
    ay += 7;
    doc.text(
      `Phone: ${applicant.phoneNumber?.countryCode || ""} ${
        applicant.phoneNumber?.number || "N/A"
      }`,
      15,
      ay
    );
    ay += 7;
    doc.text(
      `Location: ${applicant.address?.city || "-"}, ${
        applicant.address?.state || "-"
      }`,
      15,
      ay
    );

    doc.setFillColor(245, 245, 245);
    doc.roundedRect(110, y, 90, 100, 3, 3, "F");
    doc.setFontSize(14).setTextColor(70, 50, 130);
    doc.text("Opportunity Details", 115, y + 10);

    doc.setFontSize(11).setTextColor(50, 50, 50);
    let oy = y + 20;
    doc.text(`Name: ${opp.artName || "-"}`, 115, oy);
    oy += 7;
    doc.text(`Category: ${opp.artCategory || "-"}`, 115, oy);
    oy += 7;
    doc.text(`Location: ${opp.location || "-"}`, 115, oy);
    oy += 7;
    doc.text(`Budget: ${opp.budget || "-"}`, 115, oy);

    y += 115;
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(10, y, 190, 40, 3, 3, "F");
    doc.setFontSize(14).setTextColor(70, 50, 130);
    doc.text("Application Information", 15, y + 10);

    doc.setFontSize(11).setTextColor(50, 50, 50);
    doc.text(`Status: ${application.status}`, 15, y + 20);
    doc.text(`Applied On: ${splitDate(application.appliedOn)}`, 90, y + 20);

    doc.save(
      `${applicant.firstName || "Applicant"}_${opp.artName || "Opportunity"}_Profile.pdf`
    );
  };


  // DELETE APPLICATION
const handleDeleteApplication = async (id) => {
  if (!window.confirm("Are you sure you want to delete this application?")) return;

  const toastId = toast.loading("Deleting application...");

  try {
    const res = await fetch(`${BASE_URL}/admin/deleteapp/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    toast.dismiss(toastId);

    if (res.ok) {
      toast.success("Application deleted successfully!");
      // Remove the deleted item from local state
      setData((prev) => prev.filter((app) => app._id !== id));
    } else {
      toast.error(result?.message || "Failed to delete application");
    }
  } catch (error) {
    toast.dismiss(toastId);
    toast.error("Error deleting application");
  }
};

  return (
    <div className="usercontainer">
      <AdminNavbar />
      <div className="row-container">
        <h2>
          Manage Opportunity -{" "}
          <span style={{ color: "#AD2F3B" }}>Applications</span>
        </h2>
      </div>
      <div className="filter-dropdown">
        <div className="searchbar">
          <IoSearch className="searchicon" />
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div style={{ width: "90%", margin: "auto" }}>
        <h2>Applicant's Details</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Custom Id</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Registered On</th>
            <th>Application Status</th>
            <th className="viewicon">Actions</th>
          </tr>
        </thead>
        <tbody className="table_body">
          {currentItems &&
            currentItems.map(
              (item, index) =>
                item.appliedBy && (
                  <tr key={index}>
                    <td>{item.appliedBy.customID}</td>
                    <td>{item.appliedBy.firstName}</td>
                    <td>{item.appliedBy.email}</td>
                    <td>{item.appliedBy.phoneNumber?.number}</td>
                    <td>{splitDate(item.appliedBy.createdAt)}</td>
                    <td>
                      <select
                        title="Update Application Status"
                        defaultValue={item.status}
                        style={{
                          backgroundColor: "rgba(255, 240, 241, 0.7)",
                          border: "none",
                          width: "135px",
                        }}
                        onChange={(e) => {
                          item.status = e.target.value;
                          updateAppStatus(item._id, item);
                        }}
                      >
                        <option value="Rejected">Not Hired</option>
                        <option value="Hired">Hired</option>
                        <option value="Applied">Applied</option>
                        <option value="In-Progress">In-Progress</option>
                      </select>
                    </td>
                    <td className="viewicon">
                      <FaRegEdit title="Edit" className="edit" />
                      <AiOutlineForm
                        title="Form"
                        className="form-icon"
                        onClick={() => {
                          setSelectedApplication(item);
                          setShowPopup(true);
                        }}
                      />
                      <BsFillEyeFill
                        title="View"
                        onClick={() => {
                          localStorage.setItem("artId", item.appliedBy._id);
                          navigate("/artistProfile");
                        }}
                        className="view"
                      />
                      <FaFilePdf
                        title="Export PDF"
                        className="pdf"
                        onClick={() => exportToPDF(item)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                      <RiDeleteBin6Line
  title="Delete"
  className="delete"
  onClick={() => handleDeleteApplication(item._id)}
  style={{ cursor: "pointer", color: "darkred" }}
/>

                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>

      {/* Popup Modal */}
      {showPopup && selectedApplication && (
        <div className="popup-overlay">
          <div className="popup-card">
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>

            {/* Applicant Section */}
            <div className="popup-section">
              <h2>
                {selectedApplication.appliedBy.firstName}{" "}
                {selectedApplication.appliedBy.lastName}
              </h2>
              <p>{selectedApplication.appliedBy.email}</p>
              <p>
                Phone: {selectedApplication.appliedBy.phoneNumber?.number || "N/A"}
              </p>
              <p>
                Location:{" "}
                {selectedApplication.appliedBy.address?.city || "N/A"},{" "}
                {selectedApplication.appliedBy.address?.state || ""}
              </p>
            </div>

            {/* Opportunity Section */}
            <div className="popup-section">
              <h3>Opportunity Details</h3>
              <p><b>Name:</b> {selectedApplication.opportunity.artName}</p>
              <p><b>Category:</b> {selectedApplication.opportunity.artCategory}</p>
              <p><b>Location:</b> {selectedApplication.opportunity.location}</p>
              <p><b>Budget:</b> {selectedApplication.opportunity.budget}</p>
            </div>

            {/* Application Section */}
            {/* Application Section */}
<div className="popup-section">
  <h3>Application Info</h3>
  <p><b>Status:</b> {selectedApplication.status}</p>
  <p><b>Applied On:</b> {splitDate(selectedApplication.appliedOn)}</p>
  <p><b>Quoted Price:</b> ₹{selectedApplication.quotedPrice || "N/A"}</p>
  <p><b>Answer:</b> {selectedApplication.answer || "N/A"}</p>
</div>


            <button
              onClick={() => exportToPDF(selectedApplication)}
              style={{
                background: "red",
                color: "#fff",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Export to PDF
            </button>
          </div>
        </div>
      )}

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />

      {/* CSS for popup */}
      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .popup-card {
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            width: 700px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 8px 30px rgba(0,0,0,0.25);
            position: relative;
          }
          .popup-section {
            background: #fafafa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }
          .popup-section h3 {
            margin-bottom: 10px;
            color: #AD2F3B;
          }
          .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default OppApplications;
