import React, { useEffect } from "react";
import "./Artist_Opportunities.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Artist_navbar from "../Artist_navbar";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../../services/serverHelper";
import { useSelector, useDispatch } from "react-redux";
import { artistOpportunityPoints } from "../../services/apis";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AllLanguage } from "../../CommonData/language";
import natureOfArt from "./assets/natureOfArt.svg"
import category from "./assets/category.svg"
import language from "./assets/language.svg"
import { setAccessToken, setRefreshToken } from "../../reducer/slices/authSlice";
import { quotePoints } from "../../services/apis";


// Sidebar icons import
import {
  FaUser,
  FaBriefcase,
  FaBook,
  FaNewspaper,
  FaSignOutAlt,
  FaIdBadge,
  FaEnvelope,
} from "react-icons/fa";
import "../Dashboard/dashboard.css"; // Dashboard CSS import

const filterAmount = [
  {
    title: "Below 5000",
  },
  {
    title: "Rs 8,000 - Rs 10,000",
  },
  {
    title: "Rs 10,000 - Rs 20,000",
  },
  {
    title: "Rs 20,000 - Rs 50,000",
  },
  {
    title: "Above 50,000",
  },
];

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export function Artist_Opportunities() {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // For sidebar active state



  // Logout function
  const handleLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    toast.success("Successfully logged out", { position: "top-center" });
    navigate("/login");
  };

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", icon: <FaIdBadge />, link: "/ArtistDashboard" },
    { name: "Profile", icon: <FaUser />, link: "/Artist_Profile" },
    { name: "Portfolio", icon: <FaBriefcase />, link: "/portfolioDisplay" },
    { name: "Opportunities", icon: <FaBriefcase />, link: "/Artist_Opportunities" },
    { name: "Status of Application", icon: <FaBook />, link: "/statusOfApplication" },
    { name: "Skill Development", icon: <FaBook />, link: "/CourseCategories" },
    { name: "News", icon: <FaNewspaper />, link: "/latestNews" },
    { name: "Contact Us", icon: <FaEnvelope />, link: "/contactUs" },
    { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  const [jobData, setJobData] = useState([]);
  const [OpportunityapplynowPopup, setOpportunityapplynowPopup] = useState(null);
  const [showOpportunityFiltersPopup, setShowOpportunityFiltersPopup] = useState(false);
  const [applyAns, setApplyAns] = useState({quotedPrice:"",answer:""});
  const [isFilterOn , setIsFilterOn] = useState(false);
  const [filterData ,setFilterData] = useState([]);

  const applySubmitHandler = async (event) => {
    const toastId = toast.loading("Loading..." , {
      position:"top-center"
    });

    try {
      event.preventDefault();
      const response = await makeAuthenticatedPOSTRequest(
        artistOpportunityPoints.APPLY_OPPOR_API +
          `/${OpportunityapplynowPopup?.id}`,
        { applyAns },
        accessToken
      );

      if (response.status === "success") {
        toast.success("successfully applied" ,{
          position:"top-center"
        });

        setOpportunityapplynowPopup(null);
        setApplyAns({quotedPrice:"",answer:""});
        navigate("/statusOfApplication");
      } else {
        toast.error(response.message , {
          position:"top-center"
        });
        setApplyAns("");
      }
    } catch (error) {
      console.log(error);
      toast.error("server error , please try again" , {
        position:"top-center"
      });
    }

    toast.dismiss(toastId);
  };

  

  const fetchOpportunity = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        artistOpportunityPoints.FETCH_OPPOR_DATA_API,
        accessToken
      );
      if (response?.status === "success") {
        const opportunityArray = response?.data;
        const reversed = [...opportunityArray].reverse(); 
        setJobData(reversed);
      } else {
        toast.error(response.message , {
          position:"top-center"
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("server error , please try again " , {
        position:"top-center"
      });
    }
  };

  useEffect(() => {
    fetchOpportunity();
  }, []);

  const [filterOption, setFilterOption] = useState({
    location: "",
    minAmount: "",
    maxAmount: "",
    language: "",
    amountRange: "",
  });

  const [amountCondition, setAmountCondition] = useState(false);

  useEffect(() => {
    if (parseInt(filterOption.maxAmount) < parseInt(filterOption.minAmount)) {
      setAmountCondition(true);
    } else {
      setAmountCondition(false);
    }
  }, [filterOption]);

  const filterChangeHandler = (event) => {
    const { name, value } = event.target;
    setFilterOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilterHandler = (event) => {
    event.preventDefault();
    console.log("filteroption", filterOption);

    if (
      filterOption.amountRange === "" &&
      filterOption.language === "" &&
      filterOption.location === "" &&
      filterOption.maxAmount === "" &&
      filterOption.minAmount === ""
    ) {
      toast.error('Please fill the fields' , {
        position:"top-center"
      });
    }
    else if(amountCondition){
      toast.error('Please enter the valid maximum value' , {
        position:"top-center"
      });
    }
    else{
      let location = filterOption.location.toLowerCase();
      let language = filterOption.language;
      let minAmount = filterOption.minAmount;
      let maxAmount = filterOption.maxAmount;
      let amountRange = filterOption.amountRange;

      const filteredData = jobData.filter((job) => {
        if (amountRange !== "") {
          if(amountRange === "Below 50,000" && job.budget <= 50000){
             return true;
          }
          else if(amountRange === "Rs 8,000 - Rs 10,000" && job.budget >= 8000 &&  job.budget <= 10000 ){
            return true;
          }
          else if(amountRange === "Rs 10,000 - Rs 20,000" &&  job.budget >= 10000  && job.budget <= 20000 ){
            return true;
          }
          else if(amountRange === "Rs 20,000 - Rs 50,000" && job.budget <=20000 && job.budget <= 50000 ) {
       return true;
          }
          else if(job.budget >= 50000 ){
               return true;
          }
        }

        if (minAmount !== "" && maxAmount !== "" && job.budget > minAmount && job.budget < maxAmount ) {
          return true;
        }

        if(minAmount !== "" && maxAmount === "" && job.budget > minAmount){
          return true;
        }
        if(maxAmount !== "" && minAmount === "" && job.budget < maxAmount){
          return true;
        }

        if (location !== "" && job.location.toLowerCase().includes(location)) {
          return true;
        }
      
        if (language !== ""  && job.languages.includes(language)) {
          return true;
        }
  
        return false;
      });

      setFilterData(filteredData);
    }
  };

  const removeAmountRange = (event)=>{
    const {name , value} = event.target;
    if(filterOption.amountRange === value ){
      setFilterOption((prev)=>({
        ...prev , 
        amountRange:""
      }))
    }
  }

  const eventToMap = isFilterOn? filterData:jobData;

  return (
    <>
      <Artist_navbar />
      <div className="dashboard-layout">
        {/* -------- Sidebar -------- */}
        <aside className="sidebar">
          <h2 className="sidebar-title">Menu</h2>
          <ul className="sidebar-menu">
            {menuItems.map((item, i) => (
              <li key={i}>
                {item.action ? (
                  <button className="sidebar-link" onClick={item.action}>
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-text">{item.name}</span>
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className={`sidebar-link ${
                      location.pathname === item.link ? "active" : ""
                    }`}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-text">{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* -------- Main Content -------- */}
        <main className="dashboard-content">
          <div className="OpportunitiesPage">
            <div className="OpportunitiesPage_HeadingSearch">
              <div className="OpportunitiesPage_Heading">
                <h2>OPPORTUNITIES</h2>
              </div>
              <div >
                <form className="OpportunitiesPage_SearchSort">
                  <div className="OpportunitiesPage_Search">
                    {/* <input placeholder="Search for opportunity" /> */}
                  </div>
                </form>

                <div>
                  {showOpportunityFiltersPopup === true && (
                    <div className="OppotunitiesPage_allfilters_formpopup_parent">
                      <div className="OppotunitiesPage_allfilters_formpopup">
                        <button onClick={() => setShowOpportunityFiltersPopup(null)}>
                          X
                        </button>
                        <form>
                          <div className="OppotunitiesPage_allfilters_form_inputfield">
                            <label>Location</label>
                          </div>
                          <div className="OppotunitiesPage_allfilters_form_inputfield">
                            <label>Amount</label>
                            <div className="minmaxamount">
                              <label>Min</label>
                              <input type="text" />
                              <label>Max</label>
                              <input type="text" />
                            </div>
                            <div className="minmaxamountradio">
                              <label>
                                <input
                                  onChange={filterChangeHandler}
                                  name="amountRange"
                                  checked={filterOption.amountRange.includes(
                                    "Below 5000"
                                  )}
                                  type="radio"
                                />
                                Below 5000
                              </label>
                              <label>
                                <input type="radio" />
                                Rs 8,000 - Rs 10,000
                              </label>
                              <label>
                                <input type="radio" />
                                Rs 10,000 - Rs 20,000
                              </label>
                              <label>
                                <input type="radio" />
                                Rs 20,000 - Rs 50,000
                              </label>
                              <label>
                                <input type="radio" />
                                Above 50,000
                              </label>
                            </div>
                          </div>
                          <div className="OppotunitiesPage_allfilters_form_inputfield">
                            <label>Language</label>
                            <select></select>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="OpportunitiesPage_Maincontent">
              {/* this is filter section  */}
              <div className="OpportunitiesPage_allfilters">
                 <h5 style={{ display: "flex", alignItems: "center", gap: "4px", margin: 0 }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="14"
    viewBox="0 0 26 16"
    fill="none"
  >
    <path
      d="M1 1H25M5.28571 8H20.7143M10.4286 15H15.5714"
      stroke="#AD2F3B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  All filters
</h5>

                  
                <div className="OppotunitiesPage_allfilters_form">
                  <form>
                    <div className="OppotunitiesPage_allfilters_form_inputfield">
                      <label>Location</label>
                      <select onChange={filterChangeHandler} name="location">
                        <option value="" defaultChecked selected>
                          Choose State
                        </option>
                        {indianStates.map((state, index) => (
                          <option value={state} key={index}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="OppotunitiesPage_allfilters_form_inputfield">
                      <label>Amount</label>
                      <div className="minmaxamount">
                       
                      </div>
                      <div className="minmaxamountradio">
                        {filterAmount.map((data, index) => (
                          <label key={index}>
                            <input
                              type="radio"
                              name="amountRange"
                              onChange={filterChangeHandler}
                              onClick={removeAmountRange}
                              value={data.title}
                              checked={filterOption.amountRange === data.title}
                            />
                            {data.title}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="OppotunitiesPage_allfilters_form_inputfield">
                      <label>Language</label>
                      <select onChange={filterChangeHandler} name="language">
                        <option value="" defaultChecked selected>
                          Choose Language
                        </option>
                        {AllLanguage.map((lan, index) => (
                          <option value={lan} key={index}>
                            {lan}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        gap: "50px",
                        alignItems: "center",
                        marginTop: "10px",
                        justifyContent: "center",
                      }}
                      className="filter_btn"
                    >
                      <button
                        onClick={(e)=>{applyFilterHandler(e)
                        setIsFilterOn(true)
                        }}
                        style={{
                          width: "100px",
                          height: "50px",
                          borderRadius: "10px",
                          border: "none",
                          backgroundColor: "#AD2F3B",
                          color: "white",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                        }}
                      >
                        Apply
                      </button>
                      <button
                        onClick={()=>{
                          setFilterOption({
                            location: "",
                             minAmount: "",
                             maxAmount: "",
                              language: "",
                            amountRange: "",
                          })
                        setIsFilterOn(false)}}
                        style={{
                          color: "black",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                          border: "none",
                          backgroundColor: "transparent",
                          fontSize: "18px",
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* this is all  opportunity section */}
              <div className="OpportunitiesPage_displayjobs" style={{marginLeft:"25px", marginRight:"20px"}}>
                <h4>Recommended Jobs</h4>

                {eventToMap.map((job, index) => (
                  <div className="OpportunitiesPage_displayonejob" key={index} style={{height:"400px"}}>
                    <h4>{job.purpose}</h4>
                    <div className="OpportunitiesPage_displayonejob_content">
                      <div className="OpportunitiesPage_displayonejob_contentdetailsone">
                        <div className="OpportunitiesPage_displayonejob_contentdetailsone_text">
                          <div>
                            <p style={{ display: "flex", alignItems: "center", gap: "6px", margin: 0, marginTop:"20px"}}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
  >
    <path
      d="M2.13925 7.75407L13.7993 2.20207C15.4993 1.39207 17.2733 3.16707 16.4643 4.86807L10.9123 16.5271C10.1533 18.1201 7.85325 18.0221 7.23325 16.3691L6.20725 13.6301C6.107 13.3629 5.95072 13.1202 5.74892 12.9184C5.54712 12.7166 5.30446 12.5603 5.03725 12.4601L2.29725 11.4331C0.645253 10.8131 0.546253 8.51307 2.13925 7.75407Z"
      stroke="#AD2F3B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  Location of Performance:
</p>
                            <p style={{display:"flex",gap:"4px", marginBlockStart:"20px"}}>
                              <img src={language} alt="" />
                              Language of Performance :
                            </p>
                            <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5.673 0C5.85865 0 6.0367 0.0737498 6.16797 0.205025C6.29925 0.336301 6.373 0.514348 6.373 0.7V2.009H13.89V0.709C13.89 0.523348 13.9637 0.345301 14.095 0.214025C14.2263 0.0827498 14.4043 0.009 14.59 0.009C14.7757 0.009 14.9537 0.0827498 15.085 0.214025C15.2162 0.345301 15.29 0.523348 15.29 0.709V2.009H18C18.5303 2.009 19.0388 2.21958 19.4139 2.59443C19.7889 2.96929 19.9997 3.47774 20 4.008V18.001C19.9997 18.5313 19.7889 19.0397 19.4139 19.4146C19.0388 19.7894 18.5303 20 18 20H2C1.46974 20 0.961184 19.7894 0.58614 19.4146C0.211096 19.0397 0.00026513 18.5313 0 18.001L0 4.008C0.00026513 3.47774 0.211096 2.96929 0.58614 2.59443C0.961184 2.21958 1.46974 2.009 2 2.009H4.973V0.699C4.97327 0.513522 5.04713 0.335731 5.17838 0.204672C5.30963 0.0736123 5.48752 -1.89263e-07 5.673 0ZM1.4 7.742V18.001C1.4 18.0798 1.41552 18.1578 1.44567 18.2306C1.47583 18.3034 1.52002 18.3695 1.57574 18.4253C1.63145 18.481 1.69759 18.5252 1.77039 18.5553C1.84319 18.5855 1.92121 18.601 2 18.601H18C18.0788 18.601 18.1568 18.5855 18.2296 18.5553C18.3024 18.5252 18.3685 18.481 18.4243 18.4253C18.48 18.3695 18.5242 18.3034 18.5543 18.2306C18.5845 18.1578 18.6 18.0798 18.6 18.001V7.756L1.4 7.742ZM6.667 14.619V16.285H5V14.619H6.667ZM10.833 14.619V16.285H9.167V14.619H10.833ZM15 14.619V16.285H13.333V14.619H15ZM6.667 10.642V12.308H5V10.642H6.667ZM10.833 10.642V12.308H9.167V10.642H10.833ZM15 10.642V12.308H13.333V10.642H15ZM4.973 3.408H2C1.92121 3.408 1.84319 3.42352 1.77039 3.45367C1.69759 3.48382 1.63145 3.52802 1.57574 3.58374C1.52002 3.63945 1.47583 3.70559 1.44567 3.77839C1.41552 3.85119 1.4 3.92921 1.4 4.008V6.343L18.6 6.357V4.008C18.6 3.92921 18.5845 3.85119 18.5543 3.77839C18.5242 3.70559 18.48 3.63945 18.4243 3.58374C18.3685 3.52802 18.3024 3.48382 18.2296 3.45367C18.1568 3.42352 18.0788 3.408 18 3.408H15.29V4.337C15.29 4.52265 15.2162 4.7007 15.085 4.83197C14.9537 4.96325 14.7757 5.037 14.59 5.037C14.4043 5.037 14.2263 4.96325 14.095 4.83197C13.9637 4.7007 13.89 4.52265 13.89 4.337V3.408H6.373V4.328C6.373 4.51365 6.29925 4.6917 6.16797 4.82297C6.0367 4.95425 5.85865 5.028 5.673 5.028C5.48735 5.028 5.3093 4.95425 5.17803 4.82297C5.04675 4.6917 4.973 4.51365 4.973 4.328V3.408Z"
      fill="#AD2F3B"
    />
  </svg>
  Date of Performance :
</p>

                            <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM11 10H15V12H9V5H11V10Z"
      fill="#AD2F3B"
    />
  </svg>
  Application Due Date :
</p>

                          </div>

                          <div className="OpportunitiesPage_displayonejob_contentdetailstwo">
                            <p style={{marginTop:"20px"}}>{job.location}</p>
                            <p style={{marginTop:"20px"}}>
                              {job.languages}
                            </p>
                            <p style={{marginTop:"0px"}}>
                              {new Date(job.performanceDate).toLocaleDateString(
                                "en-US",
                                { day: "numeric", month: "short", year: "numeric" }
                              )}
                            </p>
                            <p style={{marginBottom:"50px"}}>
                                  {new Date(job.applicationPeriod.end).toLocaleDateString(
                                         "en-US",
                                     { day: "numeric", month: "short", year: "numeric" }
                               )}
                             </p>
                          </div>
                        </div>
                      </div>

                      <div className="OpportunitiesPage_displayonejob_contentdetailsbuttons">
                        <button className="btnone">
                          {" "}
                          <Link
                            to={`/Artist_OpportunityDetails`}
                            state={{ job: jobData[index] }}
                            style={{ textDecoration: "none", color: "#ad2f3b" }}
                          >
                            More Information
                          </Link>
                        </button>
                        <button
                          className="btntwo"
                          onClick={() =>
                            setOpportunityapplynowPopup({ index, id: job._id })
                          }
                        >
                          Apply Now
                        </button>
                      </div>

                      {/* Apply now popup */}
                      {OpportunityapplynowPopup?.index === index && (
                        <div className="Opportunityapplynowpopup_fullscreen">
                          <div className="Opportunityapplynowpopup">
                            <button onClick={() => setOpportunityapplynowPopup(null)}>
                              X
                            </button>
                            <h1 style={{color:"#AD2F3B"}}>{job.purpose}</h1>
                            <div className="Opportunityapplynowpopup_content">
                              <h4>{job.position}</h4>
                              <div className="Opportunityapplynowpopup_contentone">
                                <p>
                                  Posted on: <span>{new Date(job.applicationPeriod.start).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                                </p>
                                <p>
                                  Last Date to apply:{" "}
                                  <span>{new Date(job.applicationPeriod.end).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                                </p>
                              </div>
                            </div>
                            <div className="Opportunityapplynowpopup_contentform">
                              <form onSubmit={applySubmitHandler}>
                              <div style={{display:"flex"}}>
                              <p>My quoted price:</p>
                              <input type="number" style={{marginLeft:"5px"}} name="quotedPrice" value={applyAns.quotedPrice} 
                              onChange={(e) => setApplyAns((prevData) => ({
                                    ...prevData,
                                    quotedPrice: e.target.value
                                  }))} required/>
                            </div>
                            <h1>Why do you want to Apply for this Role?</h1>
                                <textarea
                                  name="answer"
                                  value={applyAns.answer}
                                  onChange={(e) => setApplyAns((prevData) => ({
                                    ...prevData,
                                    answer: e.target.value
                                  }))}
                                  required
                                />
                                <button type="submit">Submit</button>
                                <button
                                  onClick={() => setOpportunityapplynowPopup(null)}
                                >
                                  Cancel
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}