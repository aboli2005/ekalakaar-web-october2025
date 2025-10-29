import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ApplicationProfile = () => {
  const [application, setApplication] = useState(null);
  const applicationId = localStorage.getItem("applicationId");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      const toastId = toast.loading("Loading application...");
      try {
        const response = await makeAuthenticatedGETRequest(
          `${BASE_URL}/admin/getApplicationById?id=${applicationId}`,
          token
        );

        console.log("Application Response =>", response);
        console.log("FULL Application API Response =>", response);

        const appData = response?.data ? response.data : response;
        setApplication(appData);
        toast.dismiss(toastId);
        toast.success("Application loaded");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Error fetching application");
        console.error(error);
      }
    };

    if (applicationId) {
      fetchApplication();
    }
  }, [applicationId, token]);

  if (!application) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  const appliedBy = application.appliedBy || {};

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Poppins, sans-serif",
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/OppApplications")}
        style={{
          marginBottom: "20px",
          background: "#AD2F3B",
          color: "#fff",
          padding: "10px 18px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        ← Back to Applications
      </button>

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "30px",
          maxWidth: "900px",
          margin: "auto",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
            borderBottom: "1px solid #eee",
            paddingBottom: "20px",
          }}
        >
          <FaUserCircle size={80} color="#AD2F3B" />
          <div style={{ marginLeft: "20px" }}>
            <h2 style={{ margin: "0", color: "#333" }}>
              {appliedBy.firstName} {appliedBy.lastName || ""}
            </h2>
            <p style={{ margin: "4px 0", color: "#666" }}>{appliedBy.email}</p>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
                background:
                  application.status === "Hired"
                    ? "#d1fae5"
                    : application.status === "Rejected"
                    ? "#fee2e2"
                    : "#fef9c3",
                color:
                  application.status === "Hired"
                    ? "#065f46"
                    : application.status === "Rejected"
                    ? "#991b1b"
                    : "#92400e",
              }}
            >
              {application.status}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <Detail label="Custom ID" value={appliedBy.customID} />
          <Detail label="Phone" value={appliedBy.phoneNumber?.number || "N/A"} />
          <Detail
            label="Registered On"
            value={
              appliedBy.createdAt
                ? new Date(appliedBy.createdAt).toLocaleDateString()
                : "N/A"
            }
          />
          
          <Detail
            label="Address"
            value={
              appliedBy.address
                ? `${appliedBy.address.city}, ${appliedBy.address.state} - ${appliedBy.address.pincode}`
                : "N/A"
            }
          />
          <Detail
            label="Languages"
            value={
              Array.isArray(appliedBy.languages)
                ? appliedBy.languages.join(", ")
                : appliedBy.languages || "N/A"
            }
          />
          <Detail
            label="Experience"
            value={appliedBy.experience || "Not Provided"}
          />
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Detail Component
const Detail = ({ label, value }) => (
  <div
    style={{
      background: "#fafafa",
      padding: "15px 20px",
      borderRadius: "10px",
      border: "1px solid #eee",
    }}
  >
    <p
      style={{
        margin: "0 0 6px 0",
        fontSize: "14px",
        fontWeight: "600",
        color: "#AD2F3B",
      }}
    >
      {label}
    </p>
    <p style={{ margin: 0, fontSize: "15px", color: "#333" }}>{value}</p>
  </div>
);

export default ApplicationProfile;
