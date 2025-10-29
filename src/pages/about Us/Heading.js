import React from 'react';
import image1 from '../../assets/aboutUs_heading/image1.png';
import mandala from '../../assets/wallpaper.png';
import ScrollToHashElement from '../ScrollToHashElement';

const Heading = () => {
  return (
    <div
      id="about"
      className="w-full bg-white pb-6 px-4 sm:px-6 lg:px-12 relative overflow-hidden"
    >
      <ScrollToHashElement />

      {/* Decorative Mandalas for large screens */}
     <img
             src={mandala}
             alt="Mandala Bottom Right"
             className="absolute 
               bottom-[-9vw] md:bottom-[-10.3rem] lg:bottom-[-11rem] xl:bottom-[-18rem] 
               right-[-6vw] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7.3rem]
               w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Bottom Left */}
           <img
             src={mandala}
             alt="Mandala Bottom Left"
             className="absolute 
               bottom-[-9vw] md:bottom-[-10.3rem] lg:bottom-[-11rem] xl:bottom-[-18rem] 
               left-[-6vw] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7.3rem]
               w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />

      {/* Grid container */}
      <div className="relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] items-start">
        {/* Text Column */}
        <div className="flex flex-col">
          {/* Section Tag */}
          <h2 className="text-[0.875rem] tracking-[0.15em] font-semibold text-[#404040] mb-4">
            ABOUT US
          </h2>

          {/* Main Heading */}
          <h1 className="
            text-[1.5rem]             // 24px: Mobile
            sm:text-[1.875rem]        // 30px: Tablet
            md:text-[2rem]            // 32px: Mid
            lg:text-[2.05rem]        // 34px: Laptop
            xl:text-[2.15rem]         // 36px: Laptop L
            font-bold text-[#AD2F3B] leading-snug mb-6">
            Enabling patrons achieve business and social goals through curated Indian traditional performing arts
          </h1>

          {/* Image (Mobile & Tablet Only) */}
          <div className="lg:hidden flex justify-center my-6">
            <div className="w-[70vw] max-w-[19rem] aspect-square rounded-full overflow-hidden shadow-[12px_0_4px_8px_#FBF1F3]">
              <img
                src={image1}
                alt="ghungroo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Paragraphs */}
          <div className="
            text-[#404040]
            sm:text-[0.875rem]            // 14px: Mobile
            text-[1rem]             // 16px: Tablet
            md:text-[1.15rem]          // 20px: Laptop
            xl:text-[1.275rem]         // 22px: Laptop L
            leading-relaxed font-medium space-y-4 mb-4">
            <p>
              eKalakaar is a pioneering digital platform that helps patrons
              achieve business and social goals through curated Indian
              traditional performing arts.
            </p>
            <p>
              We serve as a <strong>cultural communication</strong> partner for
              corporates, governments, the social sector, and hospitality
              leaders by delivering bespoke, thematic performances for events,
              conferences, and campaigns.
            </p>
            <p>
              Our mission goes beyond entertainment — we aim to preserve India's
              rich cultural heritage while supporting traditional artists with
              <span className="font-bold">
                {" "}Naam (visibility), Kaam (opportunity), and Daam (fair compensation).
              </span>
            </p>
          </div>
        </div>

        {/* Image (Desktop Only) */}
        <div className="hidden lg:flex justify-center my-auto">
          <div className="w-full max-w-[25rem] aspect-square rounded-full overflow-hidden shadow-[30px_0_5px_20px_#FBF1F3]">
            <img
              src={image1}
              alt="ghungroo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
