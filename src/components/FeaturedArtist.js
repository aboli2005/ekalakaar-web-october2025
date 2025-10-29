

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import allArtists from '../data/artistsData';
import mandala from '../assets/wallpaper.png';
import ScrollToHashElement from '../pages/ScrollToHashElement';

const FeaturedArtist = () => {
  const tabs = ['Dancers', 'Musicians', 'Singers', 'Theatre'];
  const [selectedTab, setSelectedTab] = useState('Dancers');
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const navigate = useNavigate();

  const tabToPathMap = {
    Dancers: '/artist-dancers',
    Musicians: '/artist-musicians',
    Singers: '/artist-singers',
    Theatre: '/artist-theatre',
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleCount(3);
      else if (width >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const artists = (allArtists[selectedTab] || []).slice(0, 12);
  const visibleArtists = artists.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => setStartIndex(prev => Math.max(0, prev - visibleCount));
  const handleNext = () => {
    if (startIndex + visibleCount < artists.length) setStartIndex(prev => prev + visibleCount);
  };

  const handleTabChange = (label) => {
    setSelectedTab(label);
    setStartIndex(0);
  };

  return (
    <div id="artists" className="w-full font-[Poppins] relative overflow-hidden bg-white py-8 md:py-12 lg:py-16">
      <ScrollToHashElement />

      {/* Mandala Background */}
      <div className="hidden md:block">
             {/* Top Right */}
<img
  src={mandala}
  alt="Mandala Top Right"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-10rem] 
    right-[-5rem] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Top Left */}
<img
  src={mandala}
  alt="Mandala Top Left"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-10rem] 
    left-[-5rem] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Bottom Right */}
<img
  src={mandala}
  alt="Mandala Bottom Right"
  className="absolute 
    bottom-[-9vw] md:bottom-[-9.7rem] lg:bottom-[-10rem] xl:bottom-[-12.5rem] 
    right-[-6vw] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7rem]
    w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Bottom Left */}
<img
  src={mandala}
  alt="Mandala Bottom Left"
  className="absolute 
    bottom-[-9vw] md:bottom-[-9.7rem] lg:bottom-[-10rem] xl:bottom-[-12.5rem] 
    left-[-6vw] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7rem]
    w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

      </div>

      {/* Heading */}
     <h2 className="text-center text-[#AD2F3B] underline decoration-[#AD2F3B] decoration-2 font-bold underline-offset-8 
  text-[1.25rem] sm:text-[2rem] md:text-[2.125rem] lg:text-[2.14rem] xl:text-[2.25rem]
  mb-4 sm:mb-4 md:mb-6 lg:mb-10">
  ARTIST SHOWCASE
</h2>


      {/* Subtext */}
      <div className="flex justify-center px-4">
        <p className="text-center text-gray-700 
          text-[0.875rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] 
          max-w-[90%] md:max-w-[80%] lg:max-w-[56.25rem] 
          mb-8 md:mb-12 lg:mb-16">
          Meet India's talented traditional performing artists – from classical, folk & fusion, singers, dancers, musicians & theatre artists – all on one platform.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mx-auto max-w-[80%] md:max-w-[70%]">
        <div className="flex items-center justify-between px-2 py-1 rounded-full border-2 border-[#AD2F3B] bg-[#AD2F3B] 
          w-full  sm:max-w-[31.25rem] md:max-w-[43.75rem] lg:max-w-[56.25rem] h-[2.8125rem] sm:h-[3.125rem] md:h-[3.75rem] lg:h-[4.0625rem]">
          {tabs.map((label) => (
         <button
  key={label}
  onClick={() => handleTabChange(label)}
  className={`flex-1 h-full rounded-full capitalize mx-1 transition-all duration-300
    text-[0.75rem] sm:text-[1rem] md:text-[0.875rem] lg:text-[1rem]
    ${selectedTab === label
      ? 'bg-white text-[#AD2F3B] font-medium'
      : 'bg-[#AD2F3B] text-white hover:bg-white hover:!text-[#AD2F3B]'}
  `}
>
  {label}
</button>

          ))}
        </div>
      </div>

      {/* Artists + Arrows */}
      <div className="relative flex justify-center items-center mt-8 md:mt-12 lg:mt-16 ">
        <div className="relative flex items-center w-full max-w-[90%] mx-auto">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md  
              ${startIndex === 0 ? "opacity-0 cursor-not-allowed" : "opacity-100"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-[#AD2F3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

         <div className={`flex items-center w-full max-w-[80%] mx-auto 
  ${visibleArtists.length === 1 ? 'justify-center' : 'justify-between'}`}>

            {visibleArtists.map((artist, index) => (
              <Link
                key={index}
                to={`/artist/${artist.name.replace(/\s+/g, "-").toLowerCase()}`}
                state={{ artist, artistList: artists }}
                className="flex flex-col items-center flex-shrink-0 text-decoration-none">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="object-cover shadow-md rounded-none
                    w-[14.75rem] sm:w-[15rem] md:w-[16.25rem] lg:w-[14.5rem] xl:w-[18.75rem]
                    h-[14.75rem] sm:h-[15rem] md:h-[16.25rem] lg:h-[16.5rem] xl:h-[18.75rem]" />
                <p className="text-black mt-3 md:mt-4 text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-medium text-decoration-none">
                  {artist.name}
                </p>
                <p className="text-gray-600 text-decoration-none italic text-[0.8125rem] md:text-[0.875rem] lg:text-[0.9375rem]">
                  {artist.form}
                </p>
              </Link>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= artists.length}
            className={`z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ml-2 
              ${startIndex + visibleCount >= artists.length ? "opacity-0 cursor-not-allowed" : "opacity-100"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-[#AD2F3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* View More */}
      <div className="flex justify-center mt-8 md:mt-12 lg:mt-16 mb-10 md:mb- lg:mb-1">
        <button
          onClick={() => navigate(tabToPathMap[selectedTab])}
          className="bg-[#AD2F3B] text-white rounded-full 
            px-6 py-2 md:px-8 md:py-2 lg:px-10 lg:py-3 
            text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] 
            font-medium hover:shadow-lg transition-all duration-300">
          View More
        </button>
      </div>
    </div>
  );
};

export default FeaturedArtist;
