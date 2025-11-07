import "./contactUs.css";
import darkFilter from "./assets/darkFilter.svg"
import imagePart from "./assets/imagePart.svg"
import doorImage from "./assets/doorImage.svg"
import location from "./assets/location.svg"
import phone from "./assets/phone.svg"
import mail from "./assets/mail.svg"
import { useEffect, useState } from "react";
import { contactUsPoints } from "../../services/apis";
import { makeAuthenticatedPOSTRequest } from "../../services/serverHelper";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { artistProfilePoints } from "../../services/apis";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Artist_navbar from "../Artist_navbar"
import { setAccessToken, setRefreshToken } from "../../reducer/slices/authSlice";

// Sidebar imports
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaBook,
  FaNewspaper,
  FaSignOutAlt,
  FaIdBadge,
  FaEnvelope,
} from "react-icons/fa";
import "../Dashboard/dashboard.css";

const formDetail = [
    {
        placeholder:"Enter your name" , 
        type:"text" , 
        name:"name",
        hidden:true
    },
    {
        placeholder:"Enter your email" , 
        type:"email" , 
        name:"email",
        hidden:true
    },
];

const boxDetail = [
    {
        image:phone , 
        text:"Phone",
        detail:"+914785236987"
    },
    {
        image:mail , 
        text:"Email",
        detail:"supportekalakaar@gmail.com"
    },
    {
        image:location , 
        text:"Address",
        detail:"123, Random Street, Random City, Mumbai - 123456"
    },
];

function ContactUs() {
    const {accessToken} = useSelector((state)=>state.auth)
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        { name: "Application Status", icon: <FaBook />, link: "/statusOfApplication" },
        { name: "Skill Development", icon: <FaBook />, link: "/CourseCategories" },
        { name: "News", icon: <FaNewspaper />, link: "/latestNews" },
        { name: "Contact Us", icon: <FaEnvelope />, link: "/contactUs" },
        { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
    ];

    const [portfolioData , setPortfolioData] = useState(null);

    const fetchUserData = async()=>{
        try{
            const response = await makeAuthenticatedGETRequest(artistProfilePoints.FETCH_PROFILE_DATA_API , accessToken);

            console.log('res' ,response);

            if(response.status === 'success'){
                const {address, socialLinks , personalInfo ,artInfo, performanceInfo } = response.data;

                setFormData({
                    email : personalInfo?.email  , name:personalInfo?.firstName 
                })
            }else{
                toast.error('something went wrong , please refresh the page' , {
                    position:"top-center"
                });
            }
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(()=>{
        fetchUserData();
    },[])

    const [formData , setFormData ] = useState({
        name:"",
        email:"",
        message:"",
        subject:""
    })
    
    const changeHandler = (event)=>{
        const {name , value} = event.target;
        setFormData((prev)=>({
            ...prev , 
            [name]:value
        }))
    }
    
    console.log('fir' ,formData);

    const submitHandler = async (event) => {
        const toastId = toast.loading('Loading...');
        event.preventDefault();
        try {
            const response = await makeAuthenticatedPOSTRequest(contactUsPoints.POST_QUERY_API, formData, accessToken);
            console.log('res', response);
            
            if (response && response.status === 'success') {
                toast.success('Successfully sent', {
                    position: 'top-center'
                });
                setFormData({
                    name: "",
                    subject: "",
                    message: "",
                    email: "",
                });
            } else {
                toast.error(response.message || 'Something went wrong', {
                    position: 'top-center'
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, please try again', {
                position: 'top-center'
            });
        }
        toast.dismiss(toastId);
    };

    return (
        <>
            <Artist_navbar />
            <div className="dashboard-layout">
                
                {/* -------- Navigation Sidebar -------- */}
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
                    <div className="contactUs_wrapper">
                        {/* contactUs section  */}
                        <section className="contactUs_container">
                            {/* image part */}
                            <div className="image_container">
                                <img src={imagePart} alt="" className="contact_img" />
                                <img src={darkFilter} alt="" className="filter_img" />
                                <p className="contactUs_text">Contact Us</p>
                            </div>

                            {/* image and form container */}
                            <main className="image_form_container">
                                <img src={doorImage} alt="" className="contact_doorImg mx-[10px]" />

                                {/* Contact Form - Dashboard Themed */}
                                <div className="contact-form-themed">
                                    {/* Header Section - Dashboard Style */}
                                    <div className="dashboard-header">
                                        <h1 className="dashboard-title">Get In Touch</h1>
                                        <p className="dashboard-subtitle">
                                            We'd love to hear from you. Send us a message! 💬
                                        </p>
                                    </div>

                                    {/* Contact Form - Card Style */}
                                    <div className="card form-card">
                                        <div className="card-body">
                                            <form onSubmit={submitHandler} className="contact-form-dashboard">
                                                {formDetail.map((detail, index) =>
                                                    !detail.hidden && (
                                                        <div key={index} className="form-group">
                                                            <label className="form-label">
                                                                {detail.name.charAt(0).toUpperCase() + detail.name.slice(1)}
                                                            </label>
                                                            <input
                                                                required
                                                                name={detail.name}
                                                                value={formData[detail.name]}
                                                                onChange={changeHandler}
                                                                type={detail.type}
                                                                placeholder={detail.placeholder}
                                                                className="form-input"
                                                            />
                                                        </div>
                                                    )
                                                )}
                                                
                                                <div className="form-group">
                                                    <label className="form-label">Subject</label>
                                                    <input
                                                        name="subject"
                                                        value={formData["subject"]}
                                                        onChange={changeHandler}
                                                        type="text"
                                                        placeholder="Enter subject"
                                                        className="form-input"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Message</label>
                                                    <textarea
                                                        required
                                                        rows={6}
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={changeHandler}
                                                        placeholder="Your message"
                                                        className="form-textarea"
                                                    />
                                                </div>

                                                <button type="submit" className="red-btn form-submit-btn">
                                                    Send Message
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Contact Details - Stats Grid Style */}
                                    <section className="section">
                                        <div className="section-header">
                                            <h2>Contact Information</h2>
                                            <span className="red-btn" style={{cursor: 'default'}}>24/7</span>
                                        </div>
                                        
                                        <div className="stats-grid contact-info-grid">
                                            {boxDetail.map((box, index) => (
                                                <div key={index} className="stat-card contact-info-card">
                                                    <div className="contact-icon-wrapper">
                                                        <img src={box.image} alt={box.text} className="contact-icon" />
                                                    </div>
                                                    <div className="contact-info-content">
                                                        <p className="stat-title contact-info-title">{box.text}</p>
                                                        <p className="stat-value contact-info-detail">{box.detail}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </main>
                        </section>
                    </div>
                </main>
            </div>
            <ToastContainer />
        </>
    );
}

export default ContactUs;