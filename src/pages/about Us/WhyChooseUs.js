import React, { useRef, useEffect, useState } from 'react';
import mandala from '../../assets/wallpaper.png';
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  const points = [
    "Every performance is bespoke and tailored to the client’s goals and aligned with their themes, whether for marketing, awareness, or engagement.",
    "We care deeply about achieving business and social goals of our patrons.",
    "We research and seek deep insights, craft contextual and bespoke storylines, match the right art & artists, and blend powerful storytelling and musical elements making the message memorable, leaving a lasting experience and creating measurable impact.",
    "Imagine the transformative power of harnessing traditional performing arts not merely for entertainment but as tools for engagement, connection and behaviour change to change lives, communities, and the world."
  ];

  const pillRef = useRef(null);
  const circleRef = useRef(null);
  const lineRef = useRef(null);
  const containerRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({});

  useEffect(() => {
    const updateLinePosition = () => {
      if (pillRef.current && circleRef.current && lineRef.current && containerRef.current) {
        const pillRect = pillRef.current.getBoundingClientRect();
        const circleRect = circleRef.current.getBoundingClientRect();
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const top = pillRect.bottom - containerTop;
        const bottom = circleRect.top - containerTop;
        setLineStyle({ top: `${top}px`, height: `${bottom - top}px` });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateLinePosition, 100);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateLinePosition);
    updateLinePosition();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateLinePosition);
    };
  }, []);

  return (
    <div className="w-full bg-white md:py-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center relative overflow-hidden">
      {/* Mandalas */}
      <img
             src={mandala}
             alt="Mandala Top Right"
             className="absolute 
               top-[-6rem] md:top-[-2.7rem] lg:top-[-3rem] xl:top-[-3rem] 
               right-[-5rem] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7rem]
               w-[20rem] md:w-[19rem] lg:w-[21rem] xl:w-[27rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Top Left */}
           <img
             src={mandala}
             alt="Mandala Top Left"
             className="absolute 
               top-[-6rem] md:top-[-2.7rem] lg:top-[-3rem] xl:top-[-3rem] 
               left-[-5rem] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7rem]
               w-[20rem] md:w-[19rem] lg:w-[21rem] xl:w-[27rem] 
               opacity-[0.7] z-0 hidden md:block"
           />

      <div ref={containerRef} className="w-full max-w-5xl mx-auto relative">
        {/* Heading */}
<div className="text-center pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12">
  <h2
    className="
      text-[#AD2F3B] font-bold uppercase tracking-wide
      text-[1.5rem] sm:text-[1.875rem] md:text-[1.9rem]
      [@media(min-width:1280px)]:text-[2.125rem]
      [@media(min-width:1440px)]:text-[2.15rem]
      mt-4 mb-6       /* Mobile: reduced mt, increased mb */
      sm:mt-6 sm:mb-8 /* Tablet: increased mb */
      md:mt-8 md:mb-10 /* Larger tablets */
      lg:mt-12 lg:mb-12 /* Laptops: increased both */
      xl:mt-16 xl:mb-16 /* Large screens */
      underline decoration-[#AD2F3B] 
      underline-offset-8 md:underline-offset-10
    "
  >
    WHY CHOOSE US
  </h2>
</div>

        

        {/* Subheading Pill */}
        <div
          ref={pillRef}
          className="
  relative !z-10 mx-auto mb-12 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 
  border text-center border-[#AD2F3B] text-[#AD2F3B]
  text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
  [@media(min-width:1280px)]:text-[1.25rem] 
  [@media(min-width:1440px)]:text-[1.375rem]
  font-medium rounded-xl bg-[#AD2F3B1A] 
  max-w-[90vw] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[65%]
"
        >
          What makes eKalakaar’s approach unique??
        </div>

        {/* Dynamic Line */}
        <div
          ref={lineRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-[#AD2F3B] z-0 transition-all duration-300"
          style={lineStyle}
        />

        {/* Points */}
        <div className="space-y-6 sm:space-y-10 md:space-y-14 relative z-10 px-2 sm:px-4">
          {points.map((text, index) => (
            <div
              key={index}
              className="
                group relative bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6
                rounded-xl shadow-md border border-gray-200 transition-all duration-300
                hover:border-[#AD2F3B] mx-auto
                max-w-[90vw] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[65%]
              "
            >
              <p className="
                text-center text-gray-700 transition-all duration-300
                text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
                [@media(min-width:1280px)]:text-[1.25rem]
                [@media(min-width:1440px)]:text-[1.375rem]
                group-hover:text-[#AD2F3B]
              ">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Circle */}
        <div
          ref={circleRef}
          className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-5 sm:w-6 h-5 sm:h-6 bg-[#AD2F3B] rounded-full" />
        </div>
      </div>

      {/* Final Callout */}
      <Link to="/contactpage" className="no-underline">
        <h2 className="
          animate-pulse mt-28 text-center font-medium px-4 sm:px-10 leading-snug
          text-[1rem] sm:text-[1.125rem] md:text-[1.25rem]
          [@media(min-width:1280px)]:text-[1.375rem]
          [@media(min-width:1440px)]:text-[1.5rem]
          text-[#AD2F3B]
        ">
          Let's Collaborate To Create Unforgettable Experiences With Lasting Impact!
        </h2>
      </Link>
    </div>
  );
};

export default WhyChooseUs;
