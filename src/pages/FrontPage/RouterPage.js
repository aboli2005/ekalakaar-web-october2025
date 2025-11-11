
// import { HomePage } from "./HomePage";
// import { EkPhotos } from "./EkPhotos";
// import { EkVideos } from "./EkVideos";
// import { EkPrint } from "./EkPrint";
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useLocation } from 'react-router-dom';


// import { Ekevents } from "./Ekevents";
// import  {LoginPage } from "../LoginPage/login";
// import Choosing from "../LoginPage/Choosing";
// import Signup from "../LoginPage/Authorization/Signup";
// import ResetPassword from "../LoginPage/Authorization/ResetPassword";
// import ForgetPassword from "../LoginPage/Authorization/ForgetPassword";
// import ForgetCodeVerification from "../LoginPage/Authorization/ForgetCodeVerification";
// import VerificationCode from "../LoginPage/Authorization/VerificationCode";
// import { useSelector } from "react-redux";
// import { Artist_Profile } from "../ArtisitPages/ProfilePages/Artist_Profile";
// import Artist_limited_Profile from "../ArtisitPages/ProfilePages/Artist_limited_Profile";
// import { Artist_OpportunitiesMoreInfo } from "../ArtisitPages/ProfilePages/Artist_OpportunitiesMoreInfo";
// import { Newsletter } from "../ArtisitPages/Newsletter/Newsletter";
// import { Artist_Opportunities } from "../ArtisitPages/ProfilePages/Artist_Opportunities";
// import StatusOfApplication from "../ArtisitPages/StatusOfApplication/StatusOfApplication";
// import PortfolioDisplay1 from "../ArtisitPages/PortfollioDisplay/PortfolioDisplay1";
// import EditPortfolio from "../ArtisitPages/PortfollioDisplay/EditPortfolio";
// import ContactUs from "../ArtisitPages/ContactUs/ContactUs";
// import ChatViewSection from "../ArtisitPages/ChatDisplay/ChatViewSection";
// import ChatDisplay from "../ArtisitPages/ChatDisplay/ChatDisplay";
// import PatronProfile from "../PatronPages/PatronProfile/PatronProfile";
// import ArtistProfiles from "../PatronPages/ArtistProfiles/ArtistProfiles";
// import ViewArtist from "../PatronPages/PatronViewAritist/ViewArtist";
// import EventApplication from "../PatronPages/PatronViewAritist/EventApplication";
// import ArtistApplication from "../PatronPages/PatronViewAritist/ArtistApplication";
// import Partner_Profile from "../PartnersPages/ProfilePage/Partner_Profile";
// import AboutPartner from "../PartnersPages/AboutUs/AboutPartner";
// import EditAboutPartner from "../PartnersPages/AboutUs/EditAboutPartner";
// import SellProduct from "../PartnersPages/SellProduct/SellProduct";
// import MyProductsandCourses from "../PartnersPages/MyProducts/MyProductsandCourses";
// import SkillDevelopment from "../ArtisitPages/Skill Development/SkillDevelopment";
// import CourseCategories from "../ArtisitPages/Course Categories/CourseCategories";
// import PatronPortfolioDisplay from "../ArtisitPages/PortfollioDisplay/PatronPortfolioDisplay";
// import UploadedOpportunities from "../PatronPages/OpportunitesforArtist/UploadedOpportunities";
// import UploadOpportunities from "../PatronPages/OpportunitesforArtist/UploadOpportunities";
// import EditOpportunity from "../PatronPages/OpportunitesforArtist/EditOpportunity";
// import Patron_Portfolio from "../PatronPages/PatronProfile/Portfolio/Patron_Portfolio";
// import Edit_Patron_Portfolio from "../PatronPages/PatronProfile/Portfolio/Edit_Patron_Portfolio";
// import UserVerfication from "../AdminPages/UserVerification/UserVerfication";
// import ViewProfile from "../AdminPages/ViewProfile/ViewProfile";
// import EditAdminProtfolio from "../AdminPages/ViewUser/EditUserPortfolio/EditUserProtfolio";
// import RootAdmin from "../AdminPages/RootAdmin";
// import DashBoard from "../AdminPages/Dashboard/DashBoard";
// import ViewApplicants from "../AdminPages/ViewApplicants/ViewApplicants";
// import ViewUser from "../AdminPages/ViewUser/ViewUser";
// import ViewCoursesProduct from "../AdminPages/ViewCoursesProduct/ViewCoursesProduct";
// import Contact from "../AdminPages/Contact/Contact";
// import ViewArtistApplication from "../AdminPages/ViewApplicants/ViewArtistApplication/ViewArtistApplication";
// import Chat from "../AdminPages/AdmiChatPage/Chat";
// import MoreinfoArtistOppurtunity from "../AdminPages/ViewApplicants/ViewArtistApplication/ArtistOppurtunity/MoreInfo/MoreinfoArtistOppurtunity";
// import TermAndCondition from "./TermAndCondition";
// import Contactus from "../PatronPages/ContactUs/ContactUs";
// import ArtistDashboard from "../ArtisitPages/Dashboard/ArtistDashboard";
// import Privacypolicy from "./Privacypolicy";
// import AdminDashboard from "../Admin/Dashboard/Dashboard";
// import AdminNavbar from "../Admin/Navbar/Navbar1";
// import AdminFooter from "../Admin/footer/footer";
// import AdminUserArtist from "../Admin/ManageUser/UserArtist";
// import AdminUserPatron from "../Admin/ManageUser/UserPatron";
// import AdminUserArtLover from "../Admin/ManageUser/UserArt-lover";
// import AdminUserPartner from "../Admin/ManageUser/UserPartner";
// import AdminOpportunity from "../Admin/ManageOpportunities/Opportunity";
// import DashboardArtist from "../Admin//Dashboard/DashboardArtist";
// import DashboardApplication from "../Admin//Dashboard/DashboardApplications";
// import DashboardArtLover from "../Admin//Dashboard/DashboardArtlover";
// import DashboardRevenue from "../Admin//Dashboard/Dashboardrevenue";
// import DashboardOpportunity from "../Admin//Dashboard/Dashboardopportunity";
// import Dashboardpartner from "../Admin//Dashboard/Dashboardpartner";
// import DashboardPerformance from "../Admin//Dashboard/Dashboardperformance";
// import Profile from '../Admin/ManageOpportunities/profile';

// import Skills from "../Admin/Skills/Manageskills";
// import Language from "../Admin/Languages/ManageLanguages";
// import Artistprofile from '../Admin/ArtistManagement/artistprofile';
// import ArtsistManagement from "../Admin/ArtistManagement/artistmanagement";
// import AdminUploadOpportunities from "../Admin/ManageOpportunities/OpportunitesforArtist/UploadOpportunities";
// import AdminUploadedOpportunities from "../Admin/ManageOpportunities/OpportunitesforArtist/UploadedOpportunities";
// import EditOpportunities from "../Admin/ManageOpportunities/EditOpportunities";
// import OppApplications from "../Admin/ManageOpportunities/OpportunityApplications";
// import HowItWorks from "./HowItWorks";
// import Viewevents from "../AdminPages/Events/Viewevents";
// import EventDetails from "../AdminPages/Events/EventDetails";
// import UploadEvents from "../AdminPages/Events/UploadEvents";
// import EventDetail from '../news/EventDetail'

// // New components from App.js
// import ScrollToTop from "../../components/ScrollToTop";
// import Navbar from "../../components/Navbar";
// import HeroSection from "../../components/HeroSection";
// import ClientsPartners from "../../components/ClientsPartners";
// import EkalakaarHelp from "../../components/EkalakaarHelp";
// import Media from '../../components/Media';
// import FeaturedArtist from '../../components/FeaturedArtist';
// import Footer from '../../components/Footer';

// import BookPerformance from '../../pages/BookPerformance';
// import AboutUs from '../../pages/about Us/Aboutus';
// import Services from '../../pages/services/Services';
// import Blog from '../../pages/blog/Blog';
// import ContactPage from '../../pages/contact/Contactpage';
// import Contact1 from '../../components/Contact';
// import News from '../../pages/news/News';
// import UpcomingEvents from '../../pages/upcoming-events/upcomingEvents';
// import Dancers from '../../pages/artist/Dancers/ArtistDancers';
// import Details from '../../pages/artist/Dancers/ArtistDetails';
// import Singers from '../../pages/artist/Dancers/ArtistSingers';
// import Musicians from '../../pages/artist/Dancers/ArtistMusician';
// import Theatre from '../../pages/artist/Dancers/ArtistTheatre';
// import PerformanceEnquiries from '../artist/AdminOpportunities';
// import Opportunity1 from '../artist/Opportunities'


// import Popup from '../../components/Popup';
// import DownloadSection from '../../components/DownloadSection';

// import MainLayout from "../../showNavbar/MainLayout";
// import AdminLayout from "../../showNavbar/AdminLayout";
// import ArtistLayout from "../../showNavbar/ArtistLayout";


// import {AdminLoginPage} from "../LoginPage/Adminlogin";
// import BlogManagement from "../FrontPage/BlogManagement/BlogManagement";
// import UploadBlog from "../FrontPage/BlogManagement/UploadBlog";
// import PrivacyPolicy from '../Footer/PrivacyPolicy'; 
// import BlogList from "../FrontPage/BlogManagement/BlogList"; // ✅ CORRECT
// import BlogView from "../FrontPage/BlogManagement/BlogView";



// // export default function RouterPage() {
// //   const { role, accessToken } = useSelector((state) => state.auth);
// //   const [showPopup, setShowPopup] = useState(false);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setShowPopup(true);
// //     }, 2000); // 2 seconds

// //     return () => clearTimeout(timer); // cleanup on unmount
// //   }, []);

// //   useEffect(() => {
// //   if (showPopup) {
// //     document.body.classList.add('modal-open');
// //   } else {
// //     document.body.classList.remove('modal-open');
// //   }

// //   return () => document.body.classList.remove('modal-open'); // safety cleanup
// // }, [showPopup]);


// //   const handleClosePopup = () => {
// //     setShowPopup(false);
// //   };


// export default function RouterPage() {
//   const { role, accessToken } = useSelector((state) => state.auth);
//   const [showPopup, setShowPopup] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const isHomePage = window.location.pathname === '/';

//     // Detect how the page was loaded
//     const navigationEntries = performance.getEntriesByType('navigation');
//     const navigationType = navigationEntries[0]?.type;

//     const isFreshVisit = navigationType === 'navigate'; // user typed or clicked bookmark
//     const isReload = navigationType === 'reload';       // browser refresh

//     if (isHomePage && (isFreshVisit || isReload)) {
//       const timer = setTimeout(() => {
//         setShowPopup(true);
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, []); // ✅ run only once on full load

//   useEffect(() => {
//     if (showPopup) {
//       document.body.classList.add('modal-open');
//     } else {
//       document.body.classList.remove('modal-open');
//     }

//     return () => {
//       document.body.classList.remove('modal-open');
//     };
//   }, [showPopup]);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div style={{
//       opacity: showPopup ? 0.4 : 1,
//       transition: "opacity 0.3s ease",
//     }}>
//       {showPopup && <Popup onClose={handleClosePopup} />}
      
//       {/* {role === "Admin" && <AdminNavbar />} */}
//       <ScrollToTop />
//       {/* <Navbar /> */}
      
//       <Routes>
//         <Route element={<MainLayout />}>
//         {/* Admin Routes */}
//         <Route path="/Login" exact element={<LoginPage />} />
//         <Route path="/admin-login" exact element={<AdminLoginPage />} />
//          <Route path="/register" element={<Signup />} />
//          <Route path="/verifyCode/:email" exact element={<VerificationCode />} />
//                      <Route path="/resetPassword" exact element={<ResetPassword />} />
//             <Route path="/forgetPassword" exact element={<ForgetPassword />} />
//             <Route path="/forgetCodeVerification/:email" exact element={<ForgetCodeVerification />} />
//         <Route path="admin" element={<RootAdmin />} />
//         <Route path="admin" element={<Navigate to="userverification" replace />} />
//         <Route path="admin/userverification" element={<UserVerfication />} />
//         <Route path="admin/dashboard" element={<DashBoard />} />
//         <Route path="admin/view-user" element={<ViewUser />} />
//         <Route path="admin/view-user/:id" element={<ViewProfile />} />
//         <Route path="admin/view-user/:id/edit" element={<EditAdminProtfolio />} />
//         <Route path="admin/view-applicants" element={<ViewApplicants />} />
//         <Route path="admin/view-applicants/:id" element={<ViewArtistApplication />} />
//         <Route path="admin/view-applicants/:id/view-more" element={<MoreinfoArtistOppurtunity />} />
//         <Route path="admin/courses-products" element={<ViewCoursesProduct />} />
//         <Route path="admin/contact" element={<Contact />} />
//         <Route path="admin/contact/chat" element={<Chat />} />
// </Route>
//         {/* Auth Routes */}
//         {!accessToken && (
//           <>
//             <Route path="/Login" exact element={<LoginPage />} />
//             <Route path="/Choose" exact element={<Choosing />} />
//             <Route path="/register" element={<Signup />} />
//             <Route path="/resetPassword" exact element={<ResetPassword />} />
//             <Route path="/forgetPassword" exact element={<ForgetPassword />} />
//             <Route path="/forgetCodeVerification/:email" exact element={<ForgetCodeVerification />} />
//             <Route path="/verifyCode/:email" exact element={<VerificationCode />} />
//           </>
//         )}

//         {/* Main Routes */}
//         <Route element={<MainLayout />}>
//         <Route path="/" exact element={
          
//           <>
//             <HeroSection />
//             <ClientsPartners />
//             <EkalakaarHelp />
//             <FeaturedArtist />
//             <Media />
//             <DownloadSection />
//             <Contact1 />
//             <Footer />
//           </>
//         } />

//         <Route path="/book-performance" element={<BookPerformance />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/contactpage" element={<ContactPage />} />
//         <Route path="/news" element={<News />} />
//         <Route path="/upcoming-event" element={<UpcomingEvents />} />
//         <Route path="/event/:eventId" element={<EventDetail />} />
        
//          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/opportunity1" element={<Opportunity1 />} />
//         <Route path="/artist-dancers" element={<Dancers />} />
//         <Route path="/artist/:id" element={<Details />} />
//         <Route path="/dancers/:id" element={<Details from="dancers" />} />
//         <Route path="/artist/:id" element={<Details from="home" />} />
//         <Route path="/singers/:id" element={<Details from="singers" />} />
//         <Route path="/artist-singers" element={<Singers />} />
//         <Route path="/artist-musicians" element={<Musicians />} />
//         <Route path="/artist-theatre" element={<Theatre />} />
//         <Route path="/musicians/:id" element={<Details from="musicians" />} />
//         <Route path="/theatre/:id" element={<Details from="theatre" />} />
// </Route>
//         {/* Admin-only Routes */}
//         {role === "Admin" && (
//           <>

          
         
            
//  <Route path="/PerformanceEnquiries" element={<PerformanceEnquiries />} />

//             <Route path="/AdminDashboard" exact element={<AdminDashboard/>} />
//             <Route path="/Login" exact element={<LoginPage />} />
//             <Route path="/Opportunity" element={<AdminOpportunity/>} />

//             <Route path="/EditOpportunity" element={<EditOpportunities/>} />
//             <Route path="/Patron" element={<AdminUserPatron />} />
//             <Route path="/OppApplications" element={<OppApplications/>} />
//             <Route path="/Partner" element={<AdminUserPartner />} />
//             <Route path="/artLover" element={<AdminUserArtLover />} />
//             <Route path="/artist" element={<AdminUserArtist />} />
//             <Route path="/ArtsistManagement" element={<ArtsistManagement />} />
//             <Route path="/artistProfile" element={<Artistprofile />} />
//             <Route path="/UploadOpportunities" element={<AdminUploadOpportunities/>}/>
//             <Route path="/UploadedOpps" element={<AdminUploadedOpportunities/>}/>
//             <Route path="/DashboardArtist" element={<DashboardArtist />}></Route>
//             <Route path="/DashboardApplication" element={<DashboardApplication />} />
//             <Route path="/DashboardArtLover" element={<DashboardArtLover />} />
//             <Route path="/DashboardOpportunity" element={<DashboardOpportunity />} />
//             <Route path="/DashboardPerformance" element={<DashboardPerformance />} />
//             <Route path="/Dashboardpartner" element={<Dashboardpartner />} />
//             <Route path="/DashboardRevenue" element={<DashboardRevenue />} />
//             <Route path="/OppProfile" element={<Profile />} />
//             <Route path="/ManageLanguages" element={<Language />} />
//             <Route path="/Manageskills" element={<Skills />} />
//             <Route path="/Viewevents" element={<Viewevents />} />
//             <Route path="/UploadEvents" element={<UploadEvents/>} />
//             <Route path="/EventDetails/:id" element={<EventDetails />} />
            
//               {/* ✅ BLOG MANAGEMENT ROUTES - ADD THESE */}
//             <Route path="/admin/blogs" element={<BlogManagement />} />
//             <Route path="/UploadBlog" element={<UploadBlog />} />
//              <Route path="/admin/blog-list" element={<BlogList />} />
//              <Route path="/admin/blog-view/:id" element={<BlogView />} />
             
//           </>
//         )}

//         {/* Artist Routes */}
//         {role === "Artist" && (
//           <>
//           {/* <Route element={<ArtistLayout />}> */}
//             <Route path="/Artist_limited_Profile" exact element={<Artist_limited_Profile />}/>
//             <Route path="/Artist_Profile" exact element={<Artist_Profile />} />
//             <Route path="/Artist_Opportunities" exact element={<Artist_Opportunities />} />
//             <Route path="/statusOfApplication" element={<StatusOfApplication />} />
//             <Route path="/ArtistDashboard" element={<ArtistDashboard />} />
//             <Route path="/Artist_OpportunityDetails" exact element={<Artist_OpportunitiesMoreInfo />} />
//             <Route path="/PortfolioDisplay" element={<PortfolioDisplay1 />} />
//             <Route path="/patron_view_artist/:id" element={<PatronPortfolioDisplay />} />
//             <Route path="/EditPortfolio" element={<EditPortfolio />} />
//             <Route path="/latestNews" exact element={<Newsletter />} />
//             <Route path="/contactUs" element={<ContactUs />} />
//             <Route path="/chatApp" element={<ChatDisplay />} />
//             <Route path="/viewChat/:id" element={<ChatViewSection showViewChat={true} />} />
//          {/* </Route> </> */} </>
//         )}

//         {/* Patron Routes */}
//         {role === "Patron" && (
//           <>
//             <Route path="/UploadOpportunity" exact element={<UploadOpportunities />} />
//             <Route path="/UploadedOpportunities" exact element={<UploadedOpportunities />} />
//             <Route path="/EditOpportunity" exact element={<EditOpportunity />} />
//             <Route path="/Patron_Profile" element={<PatronProfile />} />
//             <Route path="/ViewArtistProfiles" element={<ArtistProfiles />} />
//             <Route path="/patron-view-artist/:id" element={<ViewArtist />} />
//             <Route path="/contactUs" element={<Contactus />} />
//             <Route path="/latestNews" exact element={<Newsletter />} />
//             <Route path="/patron-event-appli/:id" element={<EventApplication />} />
//             <Route path="/patron-artist-appli" element={<ArtistApplication />} />
//             <Route path="/Patron_Portfolio" exact element={<Patron_Portfolio />} />
//             <Route path="/Edit_Patron_Portfolio" exact element={<Edit_Patron_Portfolio />} />
//           </>
//         )}

//         {/* Partner Routes */}
//         <Route path="/partner-profile" element={<Partner_Profile />} />
//         <Route path="/skilldevelopment" element={<SkillDevelopment />} />
//         <Route path="/CourseCategories" exact element={<CourseCategories />} />
//         <Route path="/About_Partner" exact element={<AboutPartner />} />
//         <Route path="/Edit_About_Partner" exact element={<EditAboutPartner />} />
//         <Route path="/SellProduct" exact element={<SellProduct />} />
//         <Route path="/Partner_ProductsandCourses" exact element={<MyProductsandCourses />} />
//       </Routes>
      
//       {/* {role !== "Admin" && <Footer />} */}
//       {/* {role === "Admin" && <Footer />} */}
//     </div>

//   );
// }


import { HomePage } from "./HomePage";
import { EkPhotos } from "./EkPhotos";
import { EkVideos } from "./EkVideos";
import { EkPrint } from "./EkPrint";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useLocation } from 'react-router-dom';

// ✅ --- THIS IS THE CORRECTED IMPORT PATH ---
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setRole, setRefreshToken } from "../reducer/slices/authSlice"; 

// --- All your other existing component imports ---
import { Ekevents } from "./Ekevents";
import { LoginPage } from "../LoginPage/login";
import Choosing from "../LoginPage/Choosing";
import Signup from "../LoginPage/Authorization/Signup";
import ResetPassword from "../LoginPage/Authorization/ResetPassword";
import ForgetPassword from "../LoginPage/Authorization/ForgetPassword";
import ForgetCodeVerification from "../LoginPage/Authorization/ForgetCodeVerification";
import VerificationCode from "../LoginPage/Authorization/VerificationCode";
import { Artist_Profile } from "../ArtisitPages/ProfilePages/Artist_Profile";
import Artist_limited_Profile from "../ArtisitPages/ProfilePages/Artist_limited_Profile";
import { Artist_OpportunitiesMoreInfo } from "../ArtisitPages/ProfilePages/Artist_OpportunitiesMoreInfo";
import { Newsletter } from "../ArtisitPages/Newsletter/Newsletter";
import { Artist_Opportunities } from "../ArtisitPages/ProfilePages/Artist_Opportunities";
import StatusOfApplication from "../ArtisitPages/StatusOfApplication/StatusOfApplication";
import PortfolioDisplay1 from "../ArtisitPages/PortfollioDisplay/PortfolioDisplay1";
import EditPortfolio from "../ArtisitPages/PortfollioDisplay/EditPortfolio";
import ContactUs from "../ArtisitPages/ContactUs/ContactUs";
import ChatViewSection from "../ArtisitPages/ChatDisplay/ChatViewSection";
import ChatDisplay from "../ArtisitPages/ChatDisplay/ChatDisplay";
import PatronProfile from "../PatronPages/PatronProfile/PatronProfile";
import ArtistProfiles from "../PatronPages/ArtistProfiles/ArtistProfiles";
import ViewArtist from "../PatronPages/PatronViewAritist/ViewArtist";
import EventApplication from "../PatronPages/PatronViewAritist/EventApplication";
import ArtistApplication from "../PatronPages/PatronViewAritist/ArtistApplication";
import Partner_Profile from "../PartnersPages/ProfilePage/Partner_Profile";
import AboutPartner from "../PartnersPages/AboutUs/AboutPartner";
import EditAboutPartner from "../PartnersPages/AboutUs/EditAboutPartner";
import SellProduct from "../PartnersPages/SellProduct/SellProduct";
import MyProductsandCourses from "../PartnersPages/MyProducts/MyProductsandCourses";
import SkillDevelopment from "../ArtisitPages/Skill Development/SkillDevelopment";
import CourseCategories from "../ArtisitPages/Course Categories/CourseCategories";
import PatronPortfolioDisplay from "../ArtisitPages/PortfollioDisplay/PatronPortfolioDisplay";
import UploadedOpportunities from "../PatronPages/OpportunitesforArtist/UploadedOpportunities";
import UploadOpportunities from "../PatronPages/OpportunitesforArtist/UploadOpportunities";
import EditOpportunity from "../PatronPages/OpportunitesforArtist/EditOpportunity";
import Patron_Portfolio from "../PatronPages/PatronProfile/Portfolio/Patron_Portfolio";
import Edit_Patron_Portfolio from "../PatronPages/PatronProfile/Portfolio/Edit_Patron_Portfolio";
import UserVerfication from "../AdminPages/UserVerification/UserVerfication";
import ViewProfile from "../AdminPages/ViewProfile/ViewProfile";
import EditAdminProtfolio from "../AdminPages/ViewUser/EditUserPortfolio/EditUserProtfolio";
import RootAdmin from "../AdminPages/RootAdmin";
import DashBoard from "../AdminPages/Dashboard/DashBoard";
import ViewApplicants from "../AdminPages/ViewApplicants/ViewApplicants";
import ViewUser from "../AdminPages/ViewUser/ViewUser";
import ViewCoursesProduct from "../AdminPages/ViewCoursesProduct/ViewCoursesProduct";
import Contact from "../AdminPages/Contact/Contact";
import ViewArtistApplication from "../AdminPages/ViewApplicants/ViewArtistApplication/ViewArtistApplication";
import Chat from "../AdminPages/AdmiChatPage/Chat";
import MoreinfoArtistOppurtunity from "../AdminPages/ViewApplicants/ViewArtistApplication/ArtistOppurtunity/MoreInfo/MoreinfoArtistOppurtunity";
import TermAndCondition from "./TermAndCondition";
import Contactus from "../PatronPages/ContactUs/ContactUs";
import ArtistDashboard from "../ArtisitPages/Dashboard/ArtistDashboard";
import Privacypolicy from "./Privacypolicy";
import AdminDashboard from "../Admin/Dashboard/Dashboard";
import AdminNavbar from "../Admin/Navbar/Navbar1";
import AdminFooter from "../Admin/footer/footer";
import AdminUserArtist from "../Admin/ManageUser/UserArtist";
import AdminUserPatron from "../Admin/ManageUser/UserPatron";
import AdminUserArtLover from "../Admin/ManageUser/UserArt-lover";
import AdminUserPartner from "../Admin/ManageUser/UserPartner";
import AdminOpportunity from "../Admin/ManageOpportunities/Opportunity";
import DashboardArtist from "../Admin//Dashboard/DashboardArtist";
import DashboardApplication from "../Admin//Dashboard/DashboardApplications";
import DashboardArtLover from "../Admin//Dashboard/DashboardArtlover";
import DashboardRevenue from "../Admin//Dashboard/Dashboardrevenue";
import DashboardOpportunity from "../Admin//Dashboard/Dashboardopportunity";
import Dashboardpartner from "../Admin//Dashboard/Dashboardpartner";
import DashboardPerformance from "../Admin//Dashboard/Dashboardperformance";
import Profile from '../Admin/ManageOpportunities/profile';
import Skills from "../Admin/Skills/Manageskills";
import Language from "../Admin/Languages/ManageLanguages";
import Artistprofile from '../Admin/ArtistManagement/artistprofile';
import ArtsistManagement from "../Admin/ArtistManagement/artistmanagement";
import AdminUploadOpportunities from "../Admin/ManageOpportunities/OpportunitesforArtist/UploadOpportunities";
import AdminUploadedOpportunities from "../Admin/ManageOpportunities/OpportunitesforArtist/UploadedOpportunities";
import EditOpportunities from "../Admin/ManageOpportunities/EditOpportunities";
import OppApplications from "../Admin/ManageOpportunities/OpportunityApplications";
import HowItWorks from "./HowItWorks";
import Viewevents from "../AdminPages/Events/Viewevents";
import EventDetails from "../AdminPages/Events/EventDetails";
import UploadEvents from "../AdminPages/Events/UploadEvents";
import EventDetail from '../news/EventDetail'
import ScrollToTop from "../../components/ScrollToTop";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import ClientsPartners from "../../components/ClientsPartners";
import EkalakaarHelp from "../../components/EkalakaarHelp";
import Media from '../../components/Media';
import FeaturedArtist from '../../components/FeaturedArtist';
import Footer from '../../components/Footer';
import BookPerformance from '../../pages/BookPerformance';
import AboutUs from '../../pages/about Us/Aboutus';
import Services from '../../pages/services/Services';
import Blog from '../../pages/blog/Blog';
import ContactPage from '../../pages/contact/Contactpage';
import Contact1 from '../../components/Contact';
import News from '../../pages/news/News';
import UpcomingEvents from '../../pages/upcoming-events/upcomingEvents';
import Dancers from '../../pages/artist/Dancers/ArtistDancers';
import Details from '../../pages/artist/Dancers/ArtistDetails';
import Singers from '../../pages/artist/Dancers/ArtistSingers';
import Musicians from '../../pages/artist/Dancers/ArtistMusician';
import Theatre from '../../pages/artist/Dancers/ArtistTheatre';
import PerformanceEnquiries from '../artist/AdminOpportunities';
import Opportunity1 from '../artist/Opportunities'
import Popup from '../../components/Popup';
import DownloadSection from '../../components/DownloadSection';
import MainLayout from "../../showNavbar/MainLayout";
import AdminLayout from "../../showNavbar/AdminLayout";
import ArtistLayout from "../../showNavbar/ArtistLayout";
import {AdminLoginPage} from "../LoginPage/Adminlogin";
import BlogManagement from "../FrontPage/BlogManagement/BlogManagement";
import UploadBlog from "../FrontPage/BlogManagement/UploadBlog";
import PrivacyPolicy from '../Footer/PrivacyPolicy'; 
import BlogList from "../FrontPage/BlogManagement/BlogList";
import BlogView from "../FrontPage/BlogManagement/BlogView";
import AdminNews from "./NewsManagement/AdminNews";



export default function RouterPage() {
  const { role, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  // --- PERSISTENT LOGIN LOGIC ---
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedRole = localStorage.getItem('role');

    if (storedAccessToken && storedRefreshToken && storedRole) {
      dispatch(setAccessToken(storedAccessToken));
      dispatch(setRefreshToken(storedRefreshToken));
      dispatch(setRole(storedRole));
    }
  }, [dispatch]);



    // ✅ --- 3. ADD THIS NEW useEffect FOR REDIRECTION ---
  // This effect runs when the user is authenticated
  useEffect(() => {
    // If the user is an 'Artist' and they are on the homepage,
    // redirect them to their profile page.
    if (accessToken && role === 'Artist' && location.pathname === '/') {
      navigate('/Artist_limited_Profile', { replace: true });
    }
    // You can add more else-if blocks for other roles like "Admin" or "Patron" if needed
    // else if (accessToken && role === 'Admin' && location.pathname === '/') {
    //   navigate('/AdminDashboard', { replace: true });
    // }

  }, [accessToken, role, location.pathname, navigate]);

  // Your existing useEffect for the popup
  useEffect(() => {
    const isHomePage = window.location.pathname === '/';
    const navigationEntries = performance.getEntriesByType('navigation');
    const navigationType = navigationEntries[0]?.type;
    const isFreshVisit = navigationType === 'navigate';
    const isReload = navigationType === 'reload';

    if (isHomePage && (isFreshVisit || isReload)) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={{
      opacity: showPopup ? 0.4 : 1,
      transition: "opacity 0.3s ease",
    }}>
      {showPopup && <Popup onClose={handleClosePopup} />}
      <ScrollToTop />
      
      <Routes>
          {/* All your routes remain exactly the same as before */}
        <Route element={<MainLayout />}>
          <Route path="/Login" exact element={<LoginPage />} />
          <Route path="/admin-login" exact element={<AdminLoginPage />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verifyCode/:email" exact element={<VerificationCode />} />
          <Route path="/resetPassword" exact element={<ResetPassword />} />
          <Route path="/forgetPassword" exact element={<ForgetPassword />} />
          <Route path="/forgetCodeVerification/:email" exact element={<ForgetCodeVerification />} />
          <Route path="admin" element={<RootAdmin />} />
          <Route path="admin" element={<Navigate to="userverification" replace />} />
          <Route path="admin/userverification" element={<UserVerfication />} />
          <Route path="admin/dashboard" element={<DashBoard />} />
          <Route path="admin/view-user" element={<ViewUser />} />
          <Route path="admin/view-user/:id" element={<ViewProfile />} />
          <Route path="admin/view-user/:id/edit" element={<EditAdminProtfolio />} />
          <Route path="admin/view-applicants" element={<ViewApplicants />} />
          <Route path="admin/view-applicants/:id" element={<ViewArtistApplication />} />
          <Route path="admin/view-applicants/:id/view-more" element={<MoreinfoArtistOppurtunity />} />
          <Route path="admin/courses-products" element={<ViewCoursesProduct />} />
          <Route path="admin/contact" element={<Contact />} />
          <Route path="admin/contact/chat" element={<Chat />} />
         
          <Route path="/termAndCondition" element={<TermAndCondition />} />
        </Route>

        {!accessToken && (
          <>
            <Route path="/Login" exact element={<LoginPage />} />
            <Route path="/Choose" exact element={<Choosing />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/resetPassword" exact element={<ResetPassword />} />
            <Route path="/forgetPassword" exact element={<ForgetPassword />} />
            <Route path="/forgetCodeVerification/:email" exact element={<ForgetCodeVerification />} />
            <Route path="/verifyCode/:email" exact element={<VerificationCode />} />
          </>
        )}

        <Route element={<MainLayout />}>
          <Route path="/" exact element={
            <>
              <HeroSection />
              <ClientsPartners />
              <EkalakaarHelp />
              <FeaturedArtist />
              <Media />
              <DownloadSection />
              <Contact1 />
              <Footer />
            </>
          } />
          <Route path="/book-performance" element={<BookPerformance />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/upcoming-event" element={<UpcomingEvents />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/termAndCondition" element={<TermAndCondition />} /> {/* <-- ADD THIS */}
          <Route path="/opportunity1" element={<Opportunity1 />} />
          <Route path="/artist-dancers" element={<Dancers />} />
          <Route path="/artist/:id" element={<Details />} />
          <Route path="/dancers/:id" element={<Details from="dancers" />} />
          <Route path="/artist/:id" element={<Details from="home" />} />
          <Route path="/singers/:id" element={<Details from="singers" />} />
          <Route path="/artist-singers" element={<Singers />} />
          <Route path="/artist-musicians" element={<Musicians />} />
          <Route path="/artist-theatre" element={<Theatre />} />
          <Route path="/musicians/:id" element={<Details from="musicians" />} />
          <Route path="/theatre/:id" element={<Details from="theatre" />} />
        </Route>

        {role === "Admin" && (
          <>
            <Route path="/PerformanceEnquiries" element={<PerformanceEnquiries />} />
            <Route path="/AdminDashboard" exact element={<AdminDashboard/>} />
            <Route path="/Login" exact element={<LoginPage />} />
            <Route path="/Opportunity" element={<AdminOpportunity/>} />
            <Route path="/EditOpportunity" element={<EditOpportunities/>} />
            <Route path="/Patron" element={<AdminUserPatron />} />
            <Route path="/OppApplications" element={<OppApplications/>} />
            <Route path="/Partner" element={<AdminUserPartner />} />
            <Route path="/artLover" element={<AdminUserArtLover />} />
            <Route path="/artist" element={<AdminUserArtist />} />
            <Route path="/ArtsistManagement" element={<ArtsistManagement />} />
            <Route path="/artistProfile" element={<Artistprofile />} />
            <Route path="/UploadOpportunities" element={<AdminUploadOpportunities/>}/>
            <Route path="/UploadedOpps" element={<AdminUploadedOpportunities/>}/>
            <Route path="/DashboardArtist" element={<DashboardArtist />}></Route>
            <Route path="/DashboardApplication" element={<DashboardApplication />} />
            <Route path="/DashboardArtLover" element={<DashboardArtLover />} />
            <Route path="/DashboardOpportunity" element={<DashboardOpportunity />} />
            <Route path="/DashboardPerformance" element={<DashboardPerformance />} />
            <Route path="/Dashboardpartner" element={<Dashboardpartner />} />
            <Route path="/DashboardRevenue" element={<DashboardRevenue />} />
            <Route path="/OppProfile" element={<Profile />} />
            <Route path="/ManageLanguages" element={<Language />} />
            <Route path="/Manageskills" element={<Skills />} />
            <Route path="/Viewevents" element={<Viewevents />} />
            <Route path="/UploadEvents" element={<UploadEvents/>} />
            <Route path="/EventDetails/:id" element={<EventDetails />} />
            <Route path="/admin/blogs" element={<BlogManagement />} />
            <Route path="/UploadBlog" element={<UploadBlog />} />
            <Route path="/admin/blog-list" element={<BlogList />} />
            <Route path="/admin/blog-view/:id" element={<BlogView />} />
            <Route path="/admin/news" element={<AdminNews />} />

          </>
        )}

        {role === "Artist" && (
          <>
            <Route path="/Artist_limited_Profile" exact element={<Artist_limited_Profile />}/>
            <Route path="/Artist_Profile" exact element={<Artist_Profile />} />
            <Route path="/Artist_Opportunities" exact element={<Artist_Opportunities />} />
            <Route path="/statusOfApplication" element={<StatusOfApplication />} />
            <Route path="/ArtistDashboard" element={<ArtistDashboard />} />
            <Route path="/Artist_OpportunityDetails" exact element={<Artist_OpportunitiesMoreInfo />} />
            <Route path="/PortfolioDisplay" element={<PortfolioDisplay1 />} />
            <Route path="/patron_view_artist/:id" element={<PatronPortfolioDisplay />} />
            <Route path="/EditPortfolio" element={<EditPortfolio />} />
            <Route path="/latestNews" exact element={<Newsletter />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/chatApp" element={<ChatDisplay />} />
            <Route path="/viewChat/:id" element={<ChatViewSection showViewChat={true} />} />
          </>
        )}

        {role === "Patron" && (
          <>
            <Route path="/UploadOpportunity" exact element={<UploadOpportunities />} />
            <Route path="/UploadedOpportunities" exact element={<UploadedOpportunities />} />
            <Route path="/EditOpportunity" exact element={<EditOpportunity />} />
            <Route path="/Patron_Profile" element={<PatronProfile />} />
            <Route path="/ViewArtistProfiles" element={<ArtistProfiles />} />
            <Route path="/patron-view-artist/:id" element={<ViewArtist />} />
            <Route path="/contactUs" element={<Contactus />} />
            <Route path="/latestNews" exact element={<Newsletter />} />
            <Route path="/patron-event-appli/:id" element={<EventApplication />} />
            <Route path="/patron-artist-appli" element={<ArtistApplication />} />
            <Route path="/Patron_Portfolio" exact element={<Patron_Portfolio />} />
            <Route path="/Edit_Patron_Portfolio" exact element={<Edit_Patron_Portfolio />} />
          </>
        )}
        
        <Route path="/partner-profile" element={<Partner_Profile />} />
        <Route path="/skilldevelopment" element={<SkillDevelopment />} />
        <Route path="/CourseCategories" exact element={<CourseCategories />} />
        <Route path="/About_Partner" exact element={<AboutPartner />} />
        <Route path="/Edit_About_Partner" exact element={<EditAboutPartner />} />
        <Route path="/SellProduct" exact element={<SellProduct />} />
        <Route path="/Partner_ProductsandCourses" exact element={<MyProductsandCourses />} />
      </Routes>
    </div>
  );
}