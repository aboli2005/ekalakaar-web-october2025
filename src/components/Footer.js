import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../assets/image3.png';
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import '../style/common.css';

const footerLinks = [
  {
    title: 'Home',
    items: [
      { name: 'Clients', id: '/#clients' },
      { name: 'Value to you', id: '/#value' },
      { name: 'Artist', id: '/#artists' },
      { name: 'Media', id: '/#media' },
      { name: 'Contact us', id: '/contactpage' },
    ],
  },
  {
    title: 'Services',
    items: [
      { name: 'Enable', id: '/services#enable' },
      { name: 'Engage', id: '/services#engage' },
      { name: 'Elevate', id: '/services#elevate' },
      { name: 'Book Performance', id: '/book-performance' },
      { name: 'Artist Registration', id: '/register' },
    ],
  },
  {
    title: 'About us',
    items: [
      { name: 'Our story', id: '/about-us#our-story' },
      { name: 'Achievements', id: '/about-us#achievements' },
      { name: 'Our Team', id: '/about-us#team' },
      { name: 'Our Advisors', id: '/about-us#advisors' },
      { name: 'Our Experts', id: '/about-us#experts' },
    ],
  },
  {
    title: 'Artists',
    items: [
      { name: 'Opportunities', id: '/opportunities' },
      { name: 'Dancers', id: '/artist-dancers' },
      { name: 'Singers', id: '/artist-singers' },
      { name: 'Musicians', id: '/artist-musicians' },
      { name: 'Theatre', id: '/artist-theatre' },
    ],
  },
  {
    title: 'Login',
    items: [
      { name: 'Artist', id: '/login' },
      { name: 'eK team', id: '/login' },
      { name: 'PMT', id: '#pmt' },
    ],
  },
];

const Footer = () => {
  return (
    <div
      className="text-[#AD2F3B] px-4 sm:px-8 lg:px-16 pt-10 pb-6 text-sm sm:text-base"
      style={{
        background:
          'linear-gradient(to bottom, #FAECEE 20%, #FFF5F5 50%, #FAECEE 100%)',
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 border-b border-[#AD2F3B] pb-10">
        {/* Logo */}
        <div className="flex-shrink-0 flex ml-4 flex-col items-center lg:items-start w-full lg:w-auto">
          <img
            src={footerLogo}
            alt="eKalakaar"
            className="w-58 sm:w-40 object-contain ml-[20px] "
          />
          <p className="pt-2 font-semibold text-lg tracking-wider text-center">
            www.ekalakaar.com
          </p>
        </div>

        

        {/* Link Groups */}
        <div className="flex flex-wrap justify-start md:justify-between gap-x-16 gap-y-8 w-full">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="min-w-[120px]">
              <h3 className="font-bold text-base sm:text-lg mb-2">
                <a
                  href={section.items[0].id}
                  className="text-[#AD2F3B] no-underline hover:underline"
                >
                  {section.title}
                </a>
              </h3>
              {/* FIX: remove list indentation */}
              <ul className="space-y-1 text-sm sm:text-base list-none p-0 m-0">
                {section.items.map((item, i) => (
                  <li key={i} className="p-0 m-0">
                    <a
                      href={item.id}
                      className="text-[#AD2F3B] no-underline hover:underline"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6 py-6 text-center md:text-left">
        {/* Location & Contact */}
        <div className="space-y-1">
          <p className="font-bold">Located at</p>
          <p>📍 IIM-Mumbai(Main Office) | New Delhi | Bhubaneshwar</p>
          <div className="flex flex-wrap items-center gap-x-2">
            <p className="whitespace-nowrap">📞 +91 7701872112</p>
            <span className="whitespace-nowrap">✉️ ek@ekalakaar.com</span>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <p className="font-bold mb-2">Follow us on</p>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://www.linkedin.com/company/ekalakaar-india/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-[#0A66C2] w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a
              href="https://www.youtube.com/@eKalakaarIndia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-[#FF0000] w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a
              href="https://www.instagram.com/ekalakaar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-[#E4405F] w-6 h-6 sm:w-8 sm:h-8" />
            </a>
            <a
              href="https://www.facebook.com/eKalakaarIndia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-[#1877F2] w-6 h-6 sm:w-8 sm:h-8" />
            </a>
          </div>
        </div>

        {/* App Store Buttons */}
        <div>
          <p className="font-bold mb-2">Get the App on</p>
          <div className="flex gap-4 items-end justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.tanxe.android.ekalakaar_app&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10 sm:h-12"
              />
            </a>
            <div className="flex flex-col items-center justify-end">
              <span className="text-xs text-[#800000] mb-2 animate-pulse">
                Coming Soon
              </span>
              <Link to="/login">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-10 sm:h-12"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-xs sm:text-sm border-t border-[#AD2F3B] pt-3 mt-4 gap-2">
       
         {/* Privacy Policy Link */}
        <Link 
          to="/privacy-policy" 
          className="text-[#AD2F3B] no-underline hover:underline font-medium"
        >
          Privacy Policy
        </Link>
        
        <p>© 2025. All Rights Reserved by eKalakaar</p>

        <p className="font-semibold">Developed by – eKalakaar Tech Team</p>
      </div>
    </div>
  );
};

export default Footer;
