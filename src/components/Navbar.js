// import React, { useState, useEffect, useRef } from "react";
// import logo from "../assets/ekalakar.png";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

// const Navbar = () => {
//   const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
//   const [pmtDropdownOpen, setPmtDropdownOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//     const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);
//   const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
 

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setLoginDropdownOpen(false);
//         setPmtDropdownOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setMobileMenuOpen(false);
//         setActiveDropdown(null);
//       }
//     };

//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     window.addEventListener("scroll", handleScroll);
    
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleLoginDropdown = () => {
//     setLoginDropdownOpen(!loginDropdownOpen);
//     setPmtDropdownOpen(false);
//   };

//   const togglePmtDropdown = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setPmtDropdownOpen(!pmtDropdownOpen);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//     if (!mobileMenuOpen) {
//       setActiveDropdown(null);
//     }
//   };

//   const toggleMobileDropdown = (menu) => {
//     setActiveDropdown(activeDropdown === menu ? null : menu);
//   };

//   const toggleMobilePmtDropdown = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setActiveDropdown(activeDropdown === 'pmt' ? 'login' : 'pmt');
//   };

//   return (
//     <nav
//       className={`w-full px-4 md:px-10 flex justify-between items-center border-b-2 border-[#AD2F3B] font-poppins h-[4rem] md:h-[5.5rem] lg:h-[6rem] sticky top-0 z-50 bg-white transition-all duration-300 ${
//         scrolled ? "shadow-lg" : "shadow-sm"
//       }`}
//     >
//       {/* Logo */}
//       <Link to="/" className="flex items-center h-full">
//         <img
//           src={logo}
//           alt="eKalakaar"
//           className="h-[3.5rem] md:h-[5rem] lg:h-[5.5rem] w-auto object-contain block cursor-pointer"
//         />
//       </Link>

//       {/* Desktop Menu */}
//       <ul className="hidden md:flex space-x-6 items-center">
//         {[
//           { label: "Home", to: "/" },
//           { label: "Services", to: "/services" },
//           { label: "About Us", to: "/about-us" },
//           { label: "Contact", to: "/contactpage" },
//         ].map((item) => (
//           <li key={item.to}>
//             <Link
//               to={item.to}
//               className="scaled-text text-[#AD2F3B] no-underline hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B] pb-[0.25rem]"
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}

//         {/* Artist Dropdown */}
//         <li className="relative group ">
//   {/* LABEL */}
//   <span
//     className={`cursor-pointer text-[#AD2F3B] hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B] scaled-text flex items-center gap-1 `}
//     onClick={() => window.innerWidth <= 1024 && setArtistDropdownOpen((prev) => !prev)}
//   >
//     Artist
//     {window.innerWidth <= 1024 && <span>▼</span>}
//   </span>

//   {/* DROPDOWN */}
//   <ul
//     className={`absolute bg-white shadow-md mt-2 text-black py-0 rounded-md w-[160px] left-1/2 transform -translate-x-1/2 z-50 
//       ${window.innerWidth > 1024 ? "hidden group-hover:block" : artistDropdownOpen ? "block" : "hidden"}`}
//   >
//     {[
//       { label: "Opportunities", to: "/opportunities" },
//       { label: "Dancers", to: "/artist-dancers" },
//       { label: "Musicians", to: "/artist-musicians" },
//       { label: "Singers", to: "/artist-singers" },
//       { label: "Theatre", to: "/artist-theatre" },
//     ].map((item) => (
//       <li
//         key={item.to}
//         className="px-3 py-2 hover:[background-color:#FBF1F3] transition-colors duration-200 whitespace-nowrap"
//       >
//         <Link
//           to={item.to}
//           className="scaled-text block text-[#AD2F3B] hover:text-[#8B2730] pl-3 no-underline"
//         >
//           {item.label}
//         </Link>
//       </li>
//     ))}
//   </ul>
// </li>

//         {/* Media Dropdown */}
//        <li className="relative group">
//   {/* LABEL */}
//   <span
//     className={`cursor-pointer text-[#AD2F3B] hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B] scaled-text flex items-center gap-1 `}
//     onClick={() => window.innerWidth <= 1024 && setMediaDropdownOpen((prev) => !prev)}
//   >
//     Media
//     {window.innerWidth <= 1024 && <span>▼</span>}
//   </span>

//   {/* DROPDOWN */}
//   <ul
//     className={`absolute bg-white shadow-md mt-2 text-black py-0 rounded-md w-[160px] left-1/2 transform -translate-x-1/2 z-50 
//       ${window.innerWidth > 1024 ? "hidden group-hover:block" : mediaDropdownOpen ? "block" : "hidden"}`}
//   >
//     {[
//       { label: "News", to: "/news" },
//       { label: "Blog", to: "/blog" },
//       { label: "Gallery", to: "/upcoming-event" },
//     ].map((item) => (
//       <li
//         key={item.to}
//         className="px-3 py-2 hover:[background-color:#FBF1F3] transition-colors duration-200 whitespace-nowrap"
//       >
//         <Link
//           to={item.to}
//           className="scaled-text block text-[#AD2F3B] hover:text-[#8B2730] pl-3 no-underline"
//         >
//           {item.label}
//         </Link>
//       </li>
//     ))}
//   </ul>
// </li>

//         {/* Login Dropdown */}
//        <li className="relative" ref={dropdownRef}>
//   <button
//     onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
//     className={`scaled-btn font-medium border border-[#AD2F3B] transition-colors duration-200 flex items-center justify-center ${
//       loginDropdownOpen
//         ? "bg-[#AD2F3B] text-white"
//         : "bg-white text-[#AD2F3B]"
//     }`}
//   >
//     Login/Sign Up
//   </button>

//   {loginDropdownOpen && (
//     <ul className="absolute right-0 bg-white shadow-md mt-2 rounded-lg overflow-hidden z-50 border border-gray-200">
//       <li className="hover:[background-color:#FBF1F3] transition-colors duration-200">
//         <Link
//           to="/Login"
//           className="block w-full px-4 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730]"
//           onClick={() => setLoginDropdownOpen(false)}
//         >
//           Artist
//         </Link>
//       </li>
//       <li className="hover:[background-color:#FBF1F3] transition-colors duration-200">
//         <Link
//           to="/admin-login"
//           className="block w-full px-4 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730]"
//           onClick={() => setLoginDropdownOpen(false)}
//         >
//           eK Team
//         </Link>
//       </li>

//               {/* PMT Nested Dropdown */}
//               <li className="relative group">
//                 <div
//                   onClick={() => setPmtDropdownOpen(!pmtDropdownOpen)}
//                   className="flex items-center justify-between w-full px-4 py-2 text-[#AD2F3B] hover:[background-color:#FBF1F3] hover:text-[#8B2730] cursor-pointer"
//                 >
//                   <span>PMT</span>
//                   <span
//                     className={`ml-2 transform transition-transform duration-200 ${
//                       pmtDropdownOpen ? "rotate-90" : ""
//                     }`}
//                   >
//                     ▶
//                   </span>
//                 </div>

//                 {pmtDropdownOpen && (
//                   <ul className="bg-white w-full border-t border-gray-200">
//                     <li className="hover:[background-color:#FBF1F3] transition-colors duration-200">
//                       <a
//                         href="https://project-management-tool-6eafe.web.app"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block w-full px-6 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730] text-sm"
//                       >
//                         Artist Coordinator
//                       </a>
//                     </li>
//                     <li className="hover:[background-color:#FBF1F3] transition-colors duration-200">
//                       <a
//                         href="https://project-management-tool-client.web.app"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block w-full px-6 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730] text-sm"
//                       >
//                         Client
//                       </a>
//                     </li>
//                     <li className="hover:[background-color:#FBF1F3] transition-colors duration-200">
//                       <a
//                         href="/flutter-admin"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block w-full px-6 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730] text-sm"
//                       >
//                         eK Admin
//                       </a>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </ul>
//           )}
//         </li>
//       </ul>
//       {/* Mobile Hamburger Button */}
//       <button
//         className="md:hidden text-[#AD2F3B] text-2xl"
//         onClick={toggleMobileMenu}
//       >
//         {mobileMenuOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div
//           ref={mobileMenuRef}
//           className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-2 px-4 z-50 max-h-[80vh] overflow-y-auto"
//         >
//           <ul className="flex flex-col space-y-2">
//             <li>
//               <Link
//                 to="/"
//                 className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Home
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/services"
//                 className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Services
//               </Link>
//             </li>

//             <li className="relative">
//               <div
//                 className="flex justify-center items-center w-full py-2 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
//                 onClick={() => toggleMobileDropdown("artist")}
//               >
//                 Artist{" "}
//                 <FaChevronDown
//                   className={`ml-1 text-[13px] transition-transform ${
//                     activeDropdown === "artist" ? "transform rotate-180" : ""
//                   }`}
//                 />
//               </div>
//               {activeDropdown === "artist" && (
//                 <ul className="mt-1 space-y-1 pl-4">
//                                     <li>
//                     <Link
//                       to="/opportunities"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Opportunities
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/artist-dancers"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Dancers
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/artist-musicians"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Musicians
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/artist-singers"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Singers
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/artist-theatre"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Theatre
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             <li className="relative">
//               <div
//                 className="flex justify-center items-center w-full py-2 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
//                 onClick={() => toggleMobileDropdown("media")}
//               >
//                 Media{" "}
//                 <FaChevronDown
//                   className={`ml-1 text-[13px] transition-transform ${
//                     activeDropdown === "media" ? "transform rotate-180" : ""
//                   }`}
//                 />
//               </div>
//               {activeDropdown === "media" && (
//                 <ul className="mt-1 space-y-1 pl-4">
//   <li>
//                     <Link
//                       to="/news"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       News
//                     </Link>
//                   </li>
//                      <li>
//                     <Link
//                       to="/blog"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Blogs
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/upcoming-event"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                      Gallery
//                     </Link>
//                   </li>
               
                
//                 </ul>
//               )}
//             </li>

//             <li>
//               <Link
//                 to="/about-us"
//                 className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 About Us
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/contactpage"
//                 className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>
//             </li>

//             <li className="relative">
//               <div
//                 className="flex justify-center items-center w-full py-2 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setActiveDropdown(
//                     activeDropdown === "login" ? null : "login"
//                   );
//                 }}
//               >
//                 Login/Sign Up{" "}
//                 <FaChevronDown
//                   className={`ml-1 text-[13px] transition-transform ${
//                     activeDropdown === "login" ? "transform rotate-180" : ""
//                   }`}
//                 />
//               </div>
//               {activeDropdown === "login" && (
//                 <ul className="mt-1 space-y-1 pl-4">
//                   <li>
//                     <Link
//                       to="/Login"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => {
//                         setMobileMenuOpen(false);
//                         setActiveDropdown(null);
//                       }}
//                     >
//                       Artist
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/admin-login"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={() => {
//                         setMobileMenuOpen(false);
//                         setActiveDropdown(null);
//                       }}
//                     >
//                       eK Team
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>
//             <li className="relative">
//               <div
//                 className="flex justify-center items-center w-full py-1 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setActiveDropdown(activeDropdown === "pmt" ? null : "pmt");
//                 }}
//               >
//                 PMT Login{" "}
//                 <FaChevronDown
//                   className={`ml-1 text-[13px] transition-transform ${
//                     activeDropdown === "pmt" ? "transform rotate-180" : ""
//                   }`}
//                 />
//               </div>
//               {activeDropdown === "pmt" && (
//                 <ul className="mt-1 space-y-1 pl-4">
//                   <li>
//                     <a
//                       href="https://project-management-tool-6eafe.web.app"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       Artist Coordinator
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="https://project-management-tool-client.web.app"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       Client
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/flutter-admin"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       eK Admin
//                     </a>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/ekalakar.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";


const Navbar = () => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [pmtDropdownOpen, setPmtDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const artistDropdownRef = useRef(null);
  const mediaDropdownRef = useRef(null);

  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth <= 1024);
    };

    const handleClickOutside = (event) => {
      // Close login dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginDropdownOpen(false);
        setPmtDropdownOpen(false);
      }
      
      // Close artist dropdown if clicked outside
      if (artistDropdownRef.current && !artistDropdownRef.current.contains(event.target)) {
        setArtistDropdownOpen(false);
      }
      
      // Close media dropdown if clicked outside
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(event.target)) {
        setMediaDropdownOpen(false);
      }
      
      // Close mobile menu if clicked outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleArtistDropdown = (e) => {
    if (isTabletView) {
      e.preventDefault();
      e.stopPropagation();
      setArtistDropdownOpen(!artistDropdownOpen);
      setMediaDropdownOpen(false);
    }
  };

  const toggleMediaDropdown = (e) => {
    if (isTabletView) {
      e.preventDefault();
      e.stopPropagation();
      setMediaDropdownOpen(!mediaDropdownOpen);
      setArtistDropdownOpen(false);
    }
  };

  const closeAllDropdowns = () => {
    setArtistDropdownOpen(false);
    setMediaDropdownOpen(false);
    setLoginDropdownOpen(false);
    setPmtDropdownOpen(false);
  };

  const toggleLoginDropdown = (e) => {
    if (isTabletView) {
      e.preventDefault();
      e.stopPropagation();
    }
    setLoginDropdownOpen(!loginDropdownOpen);
    setPmtDropdownOpen(false);
  };

  const togglePmtDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPmtDropdownOpen(!pmtDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleMobileDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleMobilePmtDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === 'pmt' ? 'login' : 'pmt');
  };

  return (
    <nav
      className={`w-full px-4 md:px-6 lg:px-10 flex justify-between items-center border-b-2 border-[#AD2F3B] font-poppins h-[4rem] md:h-[5.5rem] lg:h-[6rem] sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center h-full">
        <img
          src={logo}
          alt="eKalakaar"
          className="h-[3.5rem] md:h-[5rem] lg:h-[5.5rem] w-auto object-contain block cursor-pointer"
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {/* Home */}
        <li>
          <Link
            to="/"
            className="text-sm lg:text-base text-[#AD2F3B] no-underline hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B] pb-[0.25rem] whitespace-nowrap"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeAllDropdowns();
            }}
          >
            Home
          </Link>
        </li>

        {/* Services */}
        <li>
          <Link
            to="/services"
            className="text-sm lg:text-base text-[#AD2F3B] no-underline hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B] pb-[0.25rem] whitespace-nowrap"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeAllDropdowns();
            }}
          >
            Services
          </Link>
        </li>

        {/* Artist Dropdown */}
       {/* Artist Dropdown */}
<li 
  className="relative group" 
  ref={artistDropdownRef}
  onMouseEnter={!isTabletView ? () => setArtistDropdownOpen(true) : undefined}
  onMouseLeave={!isTabletView ? () => setArtistDropdownOpen(false) : undefined}
>
  <div
    className={`flex items-center cursor-pointer text-sm lg:text-base text-[#AD2F3B] hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B]  whitespace-nowrap`}
    onClick={toggleArtistDropdown}
  >
    Artist
    {isTabletView && (
      <FaChevronDown
        className={`ml-1 text-xs transition-transform ${
          artistDropdownOpen ? "transform rotate-180" : ""
        }`}
      />
    )}
  </div>

  <ul
    className={`absolute bg-white shadow-md  text-black py-0 rounded-md w-[160px] left-1/2 transform -translate-x-1/2 z-50 ${
      artistDropdownOpen ? "block" : "hidden"
    }`}
  >
    {[
      { label: "Opportunities", to: "/opportunity1" },
      { label: "Dancers", to: "/artist-dancers" },
      { label: "Musicians", to: "/artist-musicians" },
      { label: "Singers", to: "/artist-singers" },
      { label: "Theatre", to: "/artist-theatre" },
    ].map((item) => (
      <li
        key={item.to}
        className="px-3 py-2 hover:[background-color:#FBF1F3] transition-colors duration-200 whitespace-nowrap"
        onClick={() => {
          closeAllDropdowns();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Link
          to={item.to}
          className="text-sm block text-[#AD2F3B] hover:text-[#8B2730] pl-3 no-underline"
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</li>

        {/* Media Dropdown */}
       <li 
  className="relative group" 
  ref={mediaDropdownRef}
  onMouseEnter={!isTabletView ? () => setMediaDropdownOpen(true) : undefined}
  onMouseLeave={!isTabletView ? () => setMediaDropdownOpen(false) : undefined}
>
  <div
    className={`flex items-center cursor-pointer text-sm lg:text-base text-[#AD2F3B] hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B]  whitespace-nowrap`}
    onClick={toggleMediaDropdown}
  >
    Media
    {isTabletView && (
      <FaChevronDown
        className={`ml-1 text-xs transition-transform ${
          mediaDropdownOpen ? "transform rotate-180" : ""
        }`}
      />
    )}
  </div>

  <ul
    className={`absolute bg-white shadow-md  text-black py-0 rounded-md w-[160px] left-1/2 transform -translate-x-1/2 z-50 ${
      mediaDropdownOpen ? "block" : "hidden"
    }`}
  >
    {[
      { label: "News", to: "/news" },
      { label: "Blog", to: "/blog" },
      { label: "Gallery", to: "/upcoming-event" },
    ].map((item) => (
      <li
        key={item.to}
        className="px-3 py-2 hover:[background-color:#FBF1F3] transition-colors duration-200 whitespace-nowrap"
        onClick={() => {
          closeAllDropdowns();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Link
          to={item.to}
          className="text-sm block text-[#AD2F3B] hover:text-[#8B2730] pl-3 no-underline"
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</li>

        {/* About Us */}
        <li>
          <Link
            to="/about-us"
            className="text-sm lg:text-base text-[#AD2F3B] no-underline hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B] pb-[0.25rem] whitespace-nowrap"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeAllDropdowns();
            }}
          >
            About Us
          </Link>
        </li>

        {/* Contact */}
        <li>
          <Link
            to="/contactpage"
            className="text-sm lg:text-base text-[#AD2F3B] no-underline hover:text-[#8B2730] hover:border-b-2 hover:border-[#AD2F3B] pb-[0.25rem] whitespace-nowrap"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeAllDropdowns();
            }}
          >
            Contact
          </Link>
        </li>

        {/* Login Dropdown */}
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={toggleLoginDropdown}
            className={`text-sm lg:text-base font-medium border border-[#AD2F3B] px-3 py-1 rounded-lg transition-colors duration-200 flex items-center justify-center whitespace-nowrap ${
              loginDropdownOpen
                ? "bg-[#AD2F3B] text-white"
                : "bg-white text-[#AD2F3B] hover:bg-[#FBF1F3]"
            }`}
          >
            Login/Sign Up
            {isTabletView && (
              <FaChevronDown
                className={`ml-1 text-xs transition-transform ${
                  loginDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            )}
          </button>

          {loginDropdownOpen && (
            <ul className="absolute right-0 bg-white shadow-md mt-2 rounded-lg overflow-hidden z-50 border border-gray-200">
              <li 
                className="hover:[background-color:#FBF1F3] transition-colors duration-200"
                onClick={closeAllDropdowns}
              >
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730]"
                >
                  Artist
                </Link>
              </li>
              <li 
                className="hover:[background-color:#FBF1F3] transition-colors duration-200"
                onClick={closeAllDropdowns}
              >
                <Link
                  to="/admin-login"
                  className="block w-full px-4 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730]"
                >
                  eK Team
                </Link>
              </li>

              {/* PMT Nested Dropdown */}
              <li className="relative group">
                <div
                  onClick={togglePmtDropdown}
                  className="flex items-center justify-between w-full px-4 py-2 text-[#AD2F3B] hover:[background-color:#FBF1F3] hover:text-[#8B2730] cursor-pointer"
                >
                  <span>PMT</span>
                  <FaChevronDown
                    className={`ml-1 text-xs transition-transform ${
                      pmtDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {pmtDropdownOpen && (
                  <ul className="bg-white w-full border-t border-gray-200">
                    <li 
                      className="hover:[background-color:#FBF1F3] transition-colors duration-200"
                      onClick={closeAllDropdowns}
                    >
                      <a
                        href=" https://project-management-tool-6eafe.web.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-6 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730] text-sm"
                      >
                        Artist Coordinator
                      </a>
                    </li>
                    <li 
                      className="hover:[background-color:#FBF1F3] transition-colors duration-200"
                      onClick={closeAllDropdowns}
                    >
                      <a
                      // href="https://project-management-tool-6eafe.web.app"
                        href="https://project-management-tool-client.web.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-6 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730] text-sm"
                      >
                        Client
                      </a>
                    </li>
                    <li 
                      className="hover:[background-color:#FBF1F3] transition-colors duration-200"
                      onClick={closeAllDropdowns}
                    >
                      <a
                        href="/flutter-admin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-6 py-2 no-underline text-[#AD2F3B] hover:text-[#8B2730] text-sm"
                      >
                        eK Admin
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-[#AD2F3B] text-2xl"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-2 px-4 z-50 max-h-[80vh] overflow-y-auto"
        >
          <ul className="flex flex-col space-y-2">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* Services */}
            <li>
              <Link
                to="/services"
                className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>

            {/* Artist Dropdown */}
            <li className="relative">
              <div
                className="flex justify-center items-center w-full py-2 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
                onClick={() => toggleMobileDropdown("artist")}
              >
                Artist{" "}
                <FaChevronDown
                  className={`ml-1 text-[13px] transition-transform ${
                    activeDropdown === "artist" ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "artist" && (
                <ul className="mt-1 space-y-1 pl-4" style="color:maroon;">
                  <li>
                    <Link
                      to="opportunity1"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/artist-dancers"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dancers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/artist-musicians"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Musicians
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/artist-singers"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Singers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/artist-theatre"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Theatre
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Media Dropdown */}
            <li className="relative">
              <div
                className="flex justify-center items-center w-full py-2 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
                onClick={() => toggleMobileDropdown("media")}
              >
                Media{" "}
                <FaChevronDown
                  className={`ml-1 text-[13px] transition-transform ${
                    activeDropdown === "media" ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "media" && (
                <ul className="mt-1 space-y-1 pl-4">
                  <li>
                    <Link
                      to="/news"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upcoming-event"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Gallery
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* About Us */}
            <li>
              <Link
                to="/about-us"
                className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contactpage"
                className="block w-full text-center py-2 text-[13px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>

            {/* Login Dropdown */}
            <li className="relative">
              <div
                className="flex justify-center items-center w-full py-2 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(
                    activeDropdown === "login" ? null : "login"
                  );
                }}
              >
                Login/Sign Up{" "}
                <FaChevronDown
                  className={`ml-1 text-[13px] transition-transform ${
                    activeDropdown === "login" ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "login" && (
                <ul className="mt-1 space-y-1 pl-4">
                  <li>
                    <Link
                      to="/Login"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      Artist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-login"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      eK Team
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* PMT Login Dropdown */}
            <li className="relative">
              <div
                className="flex justify-center items-center w-full py-1 text-[16px] text-[#AD2F3B] rounded-md shadow-sm hover:[background-color:#FBF1F3] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === "pmt" ? null : "pmt");
                }}
              >
                PMT Login{" "}
                <FaChevronDown
                  className={`ml-1 text-[13px] transition-transform ${
                    activeDropdown === "pmt" ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {activeDropdown === "pmt" && (
                <ul className="mt-1 space-y-1 pl-4">
                  <li>
                    <a
                      href="https://project-management-tool-6eafe.web.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      Artist Coordinator
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://project-management-tool-client.web.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      Client
                    </a>
                  </li>
                  <li>
                    <a
                      href="/flutter-admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-1 text-[10px] text-[#AD2F3B] no-underline rounded-md shadow-sm hover:[background-color:#FBF1F3]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                    >
                      eK Admin
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;