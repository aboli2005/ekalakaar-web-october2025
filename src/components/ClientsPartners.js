
import React from "react";
import "./ClientPartners.css"; 

import brand1 from "../assets/brands/Picture1.png";
import brand2 from "../assets/brands/Picture2.jpg";
import brand3 from "../assets/brands/Picture3.jpg";
import brand4 from "../assets/brands/Picture4.png";
import brand5 from "../assets/brands/Picture5.jpg";
import brand6 from "../assets/brands/Picture6.png";
import brand7 from "../assets/brands/Picture7.jpg";
import brand8 from "../assets/brands/Picture8.png";
import brand9 from "../assets/brands/Picture9.png";
import brand10 from "../assets/brands/Picture10.png";
import brand11 from "../assets/brands/Picture11.png";
import brand12 from "../assets/brands/Picture12.png";
import brand13 from "../assets/brands/Picture13.jpg";
import brand14 from "../assets/brands/Picture14.png";
import brand15 from "../assets/brands/Picture15.png";
import brand16 from "../assets/brands/Picture16.jpeg";
import brand17 from "../assets/brands/Picture17.png";
import brand18 from "../assets/brands/Picture18.png";
import brand19 from "../assets/brands/Picture19.png";
import brand20 from "../assets/brands/Picture20.png";
import brand21 from "../assets/brands/Picture21.png";
import brand22 from "../assets/brands/Picture22.png";
import brand23 from "../assets/brands/Picture23.png";
import brand24 from "../assets/brands/Picture24.jpg";
import brand25 from "../assets/brands/Picture25.png";
import brand26 from "../assets/brands/Picture26.png";
import brand27 from "../assets/brands/Picture27.png";
import brand28 from "../assets/brands/Picture28.png";
import brand29 from '../assets/brands/WhatsApp Image 2025-05-24 at 11.28.25 PM (1).jpeg';
import brand30 from '../assets/brands/WhatsApp Image 2025-05-24 at 11.28.25 PM.jpeg'



import brandsIcon from '../assets/icons/Brands.png';
import performancesIcon from '../assets/icons/Artist.png';
import artistsIcon from '../assets/icons/Performances.png';
import audienceIcon from '../assets/icons/Audience.png';
import artistDaysIcon from '../assets/icons/Artist_days.png';

import ScrollToHashElement from '../pages/ScrollToHashElement'; // 👈 Import here



// Import remaining brand images...

const brands = [
  // { src: brand1, style: { height: "220px" } }, // Increased size
  { src: brand1 },
  { src: brand2 },
  { src: brand3 },
  { src: brand4 },
  { src: brand5 },
  { src: brand6 },
  { src: brand7 },
  { src: brand8 },
  { src: brand9 },
  { src: brand10 },
  { src: brand11 },
  { src: brand12 },
  { src: brand13 },
  { src: brand14 },
  { src: brand15 },
  { src: brand28 },
  { src: brand17 },
  { src: brand18 },
  { src: brand19 },
  { src: brand16 },
  { src: brand21 },
  { src: brand22 },
  { src: brand23 },
  { src: brand20 },
  { src: brand27 },
  { src: brand26 },
  { src: brand25 },
  { src: brand24},
  { src: brand30 },
  { src: brand29 },
];


const ClientPartners = () => {
  return (
    <section id="clients"className="client-partners-section">
      <ScrollToHashElement />
      {/* Title */}
      <h2 className="client-title ">CLIENTS AND PARTNERS</h2>

      {/* Carousel */}
     {/* Carousel inside section */}
<div className="carousel-container">
  <div className="carousel-track">
    {[...brands, ...brands].map((brand, index) => (
      <div
  key={index}
  className="brand-container"
>
  <img
    src={brand.src}
    alt={`Brand ${index + 1}`}
    className="brand-logo"
    style={brand.style}
  />
</div>

    ))}
  </div>
</div>


      <div className="stats-section-container z-10">
  <div className="stats-section">
    <div className="stat-item">
      <div className="stat-icon-wrapper">
        <img src={brandsIcon} alt="Brands Icon" className="stat-icon brands-icon" />
      </div>
      <p className="stat-number">30+</p>
      <p className="stat-label">Brands</p>
    </div>

    <div className="stat-item">
      <div className="stat-icon-wrapper">
        <img src={artistsIcon} alt="Artists Icon" className="stat-icon" />
      </div>
      <p className="stat-number">1000+</p>
      <p className="stat-label">Artists</p>
    </div>

    <div className="stat-item">
      <div className="stat-icon-wrapper">
        <img src={performancesIcon} alt="Performances Icon" className="stat-icon" />
      </div>
      <p className="stat-number">350+</p>
      <p className="stat-label">Performances</p>
    </div>

    <div className="stat-item">
      <div className="stat-icon-wrapper">
        <img src={artistDaysIcon} alt="Artist Days Icon" className="stat-icon" />
      </div>
      <p className="stat-number">2500+</p>
      <p className="stat-label">Artist Days</p>
    </div>

    <div className="stat-item">
      <div className="stat-icon-wrapper">
        <img src={audienceIcon} alt="Audience Icon" className="stat-icon" />
      </div>
      <p className="stat-number">35000+</p>
      <p className="stat-label ">Audience</p>
    </div>

  </div>
</div>


    </section>
  );
};


export default ClientPartners;    