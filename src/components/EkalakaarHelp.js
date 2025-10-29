import React, { useState, useEffect, useRef } from 'react';

import card1 from '../assets/cards/card 1.png';
import card2 from "../assets/cards/card 2.png";
import card3 from "../assets/cards/card 3.png";


import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import wallpaper from '../assets/wallpaper.png';
import ScrollToHashElement from '../pages/ScrollToHashElement'; // 👈 Import here

const EkalakaarHelp = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
const [isVideoVisible, setIsVideoVisible] = useState(false);
 const [currentSlide, setCurrentSlide] = useState(0); // ✅


useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      const isVisible = entry.isIntersecting;
      setIsVideoVisible(isVisible && currentSlide === 0);
      if (!isVisible && currentSlide === 0) {
        pauseYouTubeVideo();
      }
    },
    { threshold: 0.4 }
  );

  const target = videoRef.current;
  if (target) observer.observe(target);

  return () => {
    if (target) observer.unobserve(target);
  };
}, [currentSlide]);
 // Re-run effect if currentSlide changes

 useEffect(() => {
  const handleTabVisibility = () => {
    if (document.hidden && currentSlide === 0) {
      pauseYouTubeVideo();
    }
  };

  document.addEventListener("visibilitychange", handleTabVisibility);
  return () => {
    document.removeEventListener("visibilitychange", handleTabVisibility);
  };
}, [currentSlide]);


const iframeRef = useRef(null);

const pauseYouTubeVideo = () => {
  if (iframeRef.current) {
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "pauseVideo",
        args: [],
      }),
      "*"
    );
  }
};


  const slides = [
    'youtube', // Special identifier for YouTube video
    card1, 
    card2, 
    card3
  ];


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNavigate = (anchorId) => {
    navigate(`/services#${anchorId}`);
  };

  const cardData = [
    {
      id: 'enable',
      title: 'Enable',
      subtitle: 'Social Marketing',
      description:
        'Art for enabling business/social outreach to last mile stakeholders',
      hoverDescription:
        'Reach your last-mile customers and beneficiaries and create awareness.',
      background: card1,
    },
    {
      id: 'engage',
      title: 'Engage',
      subtitle: 'Conferences and Events',
      description:
        'Art for meaningful engagement and impact with high level Stakeholders.',
      hoverDescription:
        'Make corporate and institutional events more meaningful and immersive.',
      background: card2,
    },
    {
      id: 'elevate',
      title: 'Elevate',
      subtitle: 'Cultural Entertainment',
      description:
        'Art for an elevated experience for your guests on festivals/ special occasions.',
      hoverDescription:
        'Create unforgettable guest experiences for private events at elite clubs and hotels',
      background: card3,
    },
  ];

  return (
  

    <section
      id="value"
      className="relative bg-white pt-8 md:pt-10 lg:pt-12 xl:pt-16 font-[Poppins] overflow-hidden"
    >
      <ScrollToHashElement />

      {/* Mandala Backgrounds */}
      {/* Top Right */}
<img
  src={wallpaper}
  alt="Mandala Top Right"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-10rem] 
    right-[-5rem] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Top Left */}
<img
  src={wallpaper}
  alt="Mandala Top Left"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-10rem] 
    left-[-5rem] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Bottom Right */}
<img
  src={wallpaper}
  alt="Mandala Bottom Right"
  className="absolute 
    bottom-[-9vw] md:bottom-[-10.3rem] lg:bottom-[-10rem] xl:bottom-[-15rem] 
    right-[-6vw] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7.3rem]
    w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Bottom Left */}
<img
  src={wallpaper}
  alt="Mandala Bottom Left"
  className="absolute 
    bottom-[-9vw] md:bottom-[-10.3rem] lg:bottom-[-10rem] xl:bottom-[-15rem] 
    left-[-6vw] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7.3rem]
    w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>


      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Heading with precise font scaling */}
<h2 className="text-center text-[#AD2F3B] font-bold 
  text-[1.25rem]       // sm: 20px
  sm:text-[2rem]       // md: 32px
  md:text-[2rem]       // lg: 34px
  lg:text-[2.14rem]    // xl: 36px
  xl:text-[2.25rem] 
  2xl:text-[2.25rem]
  mb-6                 // 👈 Base margin for mobile
  sm:mb-8 md:mb-8 lg:mb-8 xl:mb-12  
  underline decoration-[#AD2F3B] decoration-2 underline-offset-[8px]  md:underline-offset-[10px] "
>
  VALUE TO YOU
</h2>



<p className="text-center text-gray-700 
  text-[0.875rem]       // sm: 14px
  sm:text-[1.125rem]    // md: 18px
  md:text-[1.25rem]     // lg: 20px
  lg:text-[1.375rem]    // xl: 22px
  xl:text-[1.375rem]
  2xl:text-[1.375rem]
  max-w-[50rem] mx-auto mb-6 sm:mb-8 md:mb-8 lg:mb-12 xl:mb-18 px-4 leading-snug md:leading-normal"
>
  Communicate effectively with your audience through curated traditional
  performing arts that inspire, engage, and create impact.
</p>


        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {/* Left Cards - 38% width (less than 40%) */}
          <div className="w-full md:w-[80%] lg:w-[38%] xl:w-[35%]   flex flex-col lg:gap-2 xl:gap-4 sm:gap-6 gap-4 mx-auto">
{cardData.map((item, index) => (
  <div
    key={index}
    className="group relative border-2 border-[#AD2F3B] rounded-lg px-3  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out flex flex-col h-auto lg:h-auto xl:h-auto justify-center !overflow-hidden"
  >
    {/* Gradient Background */}
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAECEE] via-white to-[#F8E3E5] opacity-100 lg:group-hover:opacity-0 transition-opacity duration-500 rounded" />



    <img
            src={item.background}
            alt={`${item.title} bg`}
         className="!absolute !inset-0 !w-full !h-full !object-cover !opacity-0 
           lg:group-hover:!opacity-20 !scale-0 lg:group-hover:!scale-125 
           !transition-all !duration-500 !ease-out !z-0"

          />

    {/* Card Content */}
    <div className="z-10 flex flex-col justify-center items-center xl:py-3 py-2 text-center h-full px-2">
      {/* Static Content */}
      <div className="lg:group-hover:hidden">
        <h3 className="text-[#AD2F3B] font-bold text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1rem] xl:text-[1.425rem]">
          {item.title}
        </h3>
        <p className="text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] lg:text-[0.75rem] xl:text-[1rem] text-black mt-1 mb-1">
          {item.subtitle}
        </p>
        <div className="w-[90%] mx-auto h-[1px] bg-[#AD2F3B] my-2" />
        <p className="text-[0.6875rem] sm:text-[0.75rem] md:text-[0.875rem] lg:text-[0.7rem] xl:text-[0.9rem] text-gray-600 leading-tight px-1">
          {item.description}
        </p>
      </div>

      {/* Hover Content - lg and up */}
      <div className="hidden lg:group-hover:flex flex-col justify-center items-center h-full">
        <div className="w-full max-w-[95%] bg-white border border-[#AD2F3B] rounded p-3">
          <p className="text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] text-black leading-snug">
            {item.hoverDescription}
          </p>
        </div>
      </div>

      {/* Button - always visible */}
      <div className="mt-3">
        <button
          onClick={() => handleNavigate(item.id)}
          className="text-[#AD2F3B] text-[0.75rem] sm:text-[0.8125rem] md:text-[0.875rem] lg:text-[0.8375rem] border border-[#AD2F3B] px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#AD2F3B] hover:text-white transition"
        >
          View More <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </div>
))}

          </div>

          {/* Right Image/Video Slider - 60% width */}
          <div className="w-full md:w-[90%] lg:w-[60%] flex items-center justify-center my-auto md:mx-auto">
            <div className="relative w-full flex items-center h-full">
              <button
                className="hidden md:flex items-center justify-center p-1 rounded-full mr-1 lg:mr-2 shrink-0"
                onClick={prevSlide}
              >
                <ArrowLeft className="w-4 md:w-5 lg:w-6 text-[#AD2F3B]" />
              </button>

              <div
                ref={videoRef}
                className="relative w-full h-full min-h-[12rem] sm:min-h-[14rem] md:min-h-[14rem] lg:min-h-[18rem] xl:min-h-[20rem] rounded-lg shadow-lg overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: "4/3" }}
              >
                {slides[currentSlide] === "youtube" ? (
                  isVideoVisible ? (
            <iframe
  ref={iframeRef}
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/xdxmXlk880w?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=xdxmXlk880w&cc_load_policy=0"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
  className="absolute inset-0 w-full h-full object-cover"
/>

                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-black" />
                  )
                ) : (
                  <img
                    src={slides[currentSlide]}
                    alt="Slide"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              <button
                className="hidden md:flex items-center justify-center p-1 rounded-full ml-1 lg:ml-2 shrink-0"
                onClick={nextSlide}
              >
                <ArrowRight className="w-4 md:w-5 lg:w-6 text-[#AD2F3B]" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6 md:mt-7 lg:mt-8 xl:mt-10 flex justify-center mb-8 md:mb-9 lg:mb-10 xl:mb-12">
          <button
            onClick={() => navigate("/book-performance")}
            className="bg-[#AD2F3B] text-white text-[0.6875rem] sm:text-[0.75rem] md:text-[0.8125rem] lg:text-[0.875rem] xl:text-[0.9375rem] rounded-full transition-shadow duration-300 hover:shadow-md 
          w-[9rem] sm:w-[10rem] md:w-[11rem] lg:w-[12rem] h-[2rem] sm:h-[2.25rem] md:h-[2.5rem] lg:h-[2.75rem]"
          >
            Book Performance
          </button>
        </div>
      </div>
    </section>
  );
};

export default EkalakaarHelp;
