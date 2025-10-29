// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Photos from './photos';

// const SliderSection = ({ id, title, data, underlineWidth = 290 }) => {

//   const [startIndex, setStartIndex] = useState(0);
//   const [visibleCount, setVisibleCount] = useState(3);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);

// useEffect(() => {
//   const updateVisibleCount = () => {
//     const isSmall = window.innerWidth <= 440;
//     const newVisibleCount = isSmall ? 1 : 3;

//     setVisibleCount(newVisibleCount);
//     setIsSmallScreen(isSmall);

//     // Fix: Adjust startIndex if it goes beyond new visible range
//     const maxStartIndex = Math.max(0, data.length - newVisibleCount);
//     setStartIndex((prevIndex) => Math.min(prevIndex, maxStartIndex));
//   };

//   updateVisibleCount();
//   window.addEventListener('resize', updateVisibleCount);
//   return () => window.removeEventListener('resize', updateVisibleCount);
// }, [data.length]);


//   const handleNext = () => {
//     const nextIndex = startIndex + visibleCount;
//     if (nextIndex < data.length) {
//       setStartIndex(nextIndex);
//     }
//   };

//   const handlePrev = () => {
//     const prevIndex = startIndex - visibleCount;
//     if (prevIndex >= 0) {
//       setStartIndex(prevIndex);
//     }
//   };

//   const getVisibleItems = () => data.slice(startIndex, startIndex + visibleCount);

//   const visibleItems = getVisibleItems();
//   const shouldShowCarousel = data.length > 1 && data.length > visibleCount;

//   return (
//     <div id={id} className="mt-[70px] relative w-full">
//       <h2
//         className={`text-center font-bold text-[#AD2F3B] 
//         text-[36px] ${isSmallScreen ? '!text-[20px]' : ''}`}
//       >
//         {title}
//       </h2>
// <div
//   className="h-[1px] bg-[#AD2F3B] mx-auto mt-[2px] mb-[70px] max-[440px]:mb-[20px]"
//   style={{ width: isSmallScreen ? `${underlineWidth * 0.5}px` : `${underlineWidth}px` }}
// />


//       <div className="relative flex justify-center items-center w-full overflow-hidden">

//         {shouldShowCarousel && startIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className={`text-gray-800 absolute left-0 ${
//               isSmallScreen ? 'pl-4' : 'pl-[100px]'
//             } top-1/2 -translate-y-[100%]
//  z-10`}
//           >
//             <ChevronLeft size={40} strokeWidth={1.5} />
//           </button>
//         )}

//         <div
//           className={`flex gap-[50px] items-center ${
//             isSmallScreen ? 'justify-center w-full' : 'justify-center'
//           }`}
//         >
//           {visibleItems.map((person, index) => (
//             <Photos
//               key={`${title}-${startIndex + index}`}
//               image={person.image}
//               title={person.title}
//               details={person.details}
//               post={person.post}
//             />
//           ))}
//         </div>

//         {shouldShowCarousel && startIndex + visibleCount < data.length && (
//           <button
//             onClick={handleNext}
//             className={`text-gray-800 absolute right-0 ${
//               isSmallScreen ? 'pr-4' : 'pr-[100px]'
//             } top-1/2 -translate-y-[100%] z-10`}
//           >
//             <ChevronRight size={40} strokeWidth={1.5} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SliderSection;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Photos from './photos';

const SliderSection = ({ id, title, data, underlineWidth = 290 }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      let count = 3;
      let card = 300;

      if (width < 1280) {
        count = 3;
        card = Math.floor((width - 180) / 3); // Increased from 150 to 180 to account for larger gaps
      }
      if (width < 1024) {
        count = 2;
        card = Math.floor((width - 120) / 2); // Increased from 100 to 120
      }
      if (width < 768) {
        count = 1;
        card = Math.min(width - 60, 270); // Increased from 40 to 60
      }

      setVisibleCount(count);
      setCardWidth(card);
      setStartIndex((prev) => Math.min(prev, Math.max(0, data.length - count)));
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [data.length]);

  const visibleItems = data.slice(startIndex, startIndex + visibleCount);
  const showCarousel = data.length > visibleCount;

 return (
  <div id={id} className=" md:mt-[60px] w-full">
    {/* Heading with proper underline spacing */}
    <div className="text-center pb-6 sm:pb-8">
      <h2 className="font-bold text-[#AD2F3B] text-[1.5rem] sm:text-[2rem] inline-block border-b-2 border-[#AD2F3B] pb-2 sm:pb-3">
        {title}
      </h2>
    </div>

    <div className="relative w-full flex justify-center items-center px-4">
      {/* Outer wrapper that tightly hugs the cards and arrows */}
      <div className="flex items-center justify-center    md:gap-8 xl:gap-16 px-2 max-w-fit mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => setStartIndex(startIndex - visibleCount)}
          className={`
            z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md
            ${startIndex === 0 ? "invisible" : "visible"}
            self-center transform  -translate-y-12 lg:-translate-y-12 xl:-translate-y-8 
          `}
        >
          <ChevronLeft className="text-[#AD2F3B] w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Cards */}
        <div className="flex items-center justify-center   md:gap-8 xl:gap-16 mx-4">
          {visibleItems.map((person, index) => (
            <Photos
              key={`${title}-${startIndex + index}`}
              image={person.image}
              title={person.title}
              details={person.details}
              post={person.post}
              cardWidth={cardWidth}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => setStartIndex(startIndex + visibleCount)}
          className={`
            z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md
            ${startIndex + visibleCount >= data.length ? "invisible" : "visible"}
            self-center transform  -translate-y-12 lg:-translate-y-12 xl:-translate-y-8 
          `}
        >
          <ChevronRight className="text-[#AD2F3B] w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  </div>
);
};

export default SliderSection;