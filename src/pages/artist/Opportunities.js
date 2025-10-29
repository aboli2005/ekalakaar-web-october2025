import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import wallpaper from '../../assets/gpt2.png'
import Footer from '../../components/Footer'


const OpportunityList = () => {
  // const [opportunities, setOpportunities] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");
  // const token = localStorage.getItem("accessToken");

  // // Fetch opportunities
  // const fetchOpportunities = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/admin/opps`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setOpportunities(response.data);
  //   } catch (error) {
  //     toast.error("Failed to load opportunities");
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Delete opportunity
  // const deleteOpportunity = async (id) => {
  //   if (!window.confirm("Delete this opportunity?")) return;
  //   try {
  //     await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/deleteopps?id=${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     toast.success("Deleted successfully");
  //     fetchOpportunities(); // Refresh list
  //   } catch (error) {
  //     toast.error("Deletion failed");
  //   }
  // };

  // // Filter opportunities by search term
  // const filteredOpportunities = opportunities.filter((opp) =>
  //   opp.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   opp.location.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // useEffect(() => {
  //   fetchOpportunities();
  // }, []);

  const fadeTextStyle = {
    fontFamily: "Garamond, serif", // Adjust to match video font if needed
    fontSize: "3rem",
    color: "#FFD700", // Golden color
    animation: "fadeInOut 3s ease-in-out infinite",
    textAlign: "center",
    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
  };

  const containerStyle = {
    backgroundImage: `url(${wallpaper})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "88vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const keyframesStyle = `
    @keyframes fadeInOut {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
  `;


  return (
    <>
      {/*       
      <div className="bg-[#FFFDF9] min-h-screen p-6 sm:p-10">
       
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#AD2F3B]">
            Manage Opportunities
          </h1>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search opportunities..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AD2F3B]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

    

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading opportunities...</p>
          </div>
        )}

      
        {!loading && filteredOpportunities.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No opportunities found</p>
          </div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white border border-[#AD2F3B]/20 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              
              <div className="p-5 border-b border-[#AD2F3B]/10">
                <h3 className="text-xl font-bold text-[#9C3D3D] truncate">
                  {opp.purpose}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {opp.location}
                </p>
              </div>

            
              <div className="p-5">
                <div className="flex justify-between mb-3">
                  <span className="font-medium">Budget:</span>
                  <span>₹{opp.budget || "Not specified"}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="font-medium">Languages:</span>
                  <span>{opp.languages || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      opp.approved
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {opp.approved ? "Approved" : "Pending"}
                  </span>
                </div>
              </div>

              
              <div className="bg-gray-50 px-5 py-3 flex justify-end gap-3">
                <button
                  onClick={() => {
                    localStorage.setItem("oppid", opp.id);
                    window.location.href = "/EditOpportunity";
                  }}
                  className="text-[#9C3D3D] hover:text-[#AD2F3B] transition"
                  title="Edit"
                >
                  <FaRegEdit size={18} />
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("oppid", opp.id);
                    window.location.href = "/OppProfile";
                  }}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="View"
                >
                  <BsFillEyeFill size={18} />
                </button>
                <button
                  onClick={() => deleteOpportunity(opp.id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete"
                >
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Inject keyframes into the document */}
      <style>{keyframesStyle}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "86vh",
          backgroundImage: `url(${wallpaper})`, // Replace with your image URL or import
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 5%",
        }}
      >
        <div
          style={{
            color: "#fdf6e3",
            fontWeight: "bold",
            fontSize: "clamp(24px, 7vw, 68px)", // Responsive font size
            lineHeight: "1.2",
            textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
            fontFamily: 'cursive',
          }}
        >
          ARTIST EXPERIENCE
          <br />
          COMING SOON
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OpportunityList;