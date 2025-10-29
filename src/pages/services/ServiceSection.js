// // src/components/ServiceSection.jsx

// import React, { useState, useEffect, useRef } from 'react';

// const ServiceSection = ({ section }) => {
//   const [activeCard, setActiveCard] = useState(0);
//   const carouselRef = useRef(null);

//   const touchStartX = useRef(null);
//   const touchEndX = useRef(null);
//   const touchStartY = useRef(null);
//   const touchEndY = useRef(null);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//     touchStartY.current = e.touches[0].clientY;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//     touchEndY.current = e.touches[0].clientY;
//   };

//   const handleTouchEnd = () => {
//     if (!touchStartX.current || !touchEndX.current) return;
//     const diffX = touchStartX.current - touchEndX.current;
//     const diffY = touchStartY.current - touchEndY.current;
//     if (Math.abs(diffX) > Math.abs(diffY)) {
//       setActiveCard((prev) => (diffX > 0 ? Math.min(prev + 1, 1) : Math.max(prev - 1, 0)));
//     }
//     touchStartX.current = touchEndX.current = touchStartY.current = touchEndY.current = null;
//   };

//   useEffect(() => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollTo({
//         left: activeCard * carouselRef.current.offsetWidth,
//         behavior: 'smooth',
//       });
//     }
//   }, [activeCard]);

//   return (
//     <div id={section.id} className="w-full bg-white mt-10 my-20 md:px-24 px-4">
//       <h2 className="text-[#AD2F3B] text-2xl font-bold text-center mb-2">
//         {section.title}
//       </h2>
//       <p className="text-center text-xl font-semibold text-gray-700 mb-12">
//         {section.subtitle}
//       </p>

//       {/* Description */}
//       <div className="flex gap-12 flex-col md:flex-row md:mx-24 mb-20">
//         <div className="border-2 border-gray-300 rounded-xl px-8 pt-10 text-[1.25rem] leading-relaxed shadow-md w-full flex-1 h-[500px]">
//           <ul className="list-disc pl-4 space-y-6">
//             {section.descriptionPoints.map((point, i) => (
//               <li key={i}>{point}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="w-full md:w-[31.25rem] h-[500px]">
//           <img
//             src={section.mainImage}
//             alt={section.title}
//             className="w-full h-full object-cover rounded-xl"
//           />
//         </div>
//       </div>

//       {/* Impact Highlights */}
//       <div className="w-full max-w-screen-lg border-2 border-gray-300 py-10 text-[1.375rem] text-gray-900 shadow-[...] mx-auto mb-[5rem] rounded-[1.25rem] px-4 md:px-10 lg:px-20">
//         <h3 className="text-[#AD2F3B] text-2xl font-bold text-center mb-12">
//           Impact Highlights
//         </h3>

//         {/* Mobile Carousel */}
//         <div className="md:hidden relative">
//           <div
//             ref={carouselRef}
//             className="flex overflow-x-hidden"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {section.highlights.map((item, i) => (
//               <div key={i} className="w-full flex-shrink-0 px-2">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-48 object-cover rounded-xl mb-4"
//                 />
//                 <h4 className="text-[#AD2F3B] text-lg font-bold text-center mb-4">
//                   {item.title}
//                 </h4>
//                 <div className="space-y-4 text-sm px-2">
//                   <p>
//                     <strong>Theme:</strong> {item.theme}
//                   </p>
//                   <p>
//                     <strong>Outreach:</strong> {item.outreach}
//                   </p>
//                   <p>
//                     <strong>Impact:</strong> {item.impact}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Dots */}
//           <div className="flex justify-center mt-6 space-x-3">
//             {section.highlights.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveCard(i)}
//                 className={`w-4 h-4 rounded-full ${
//                   activeCard === i ? "bg-[#AD2F3B]" : "bg-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Desktop Layout */}
//         <div className="hidden md:flex flex-row justify-between gap-10 md:gap-30">
//           {section.highlights.map((item, i) => (
//             <div key={i} className="w-full md:w-[37.5rem]">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-72 object-cover rounded-xl mb-6"
//               />
//               <h4 className="text-[#AD2F3B] text-xl font-bold text-center mb-4">
//                 {item.title}
//               </h4>
//               <div className="space-y-4 text-[1rem] px-4">
//                 <p>
//                   <strong>Theme:</strong> {item.theme}
//                 </p>
//                 <p>
//                   <strong>Outreach:</strong> {item.outreach}
//                 </p>
//                 <p>
//                   <strong>Impact:</strong> {item.impact}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceSection;
// src/pages/ServiceSection.jsx

// import React, { useState, useEffect, useRef } from 'react';

// const ServiceSection = ({ section }) => {
//   const [activeCard, setActiveCard] = useState(0);
//   const carouselRef = useRef(null);

//   const touchStartX = useRef(null);
//   const touchEndX = useRef(null);
//   const touchStartY = useRef(null);
//   const touchEndY = useRef(null);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//     touchStartY.current = e.touches[0].clientY;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//     touchEndY.current = e.touches[0].clientY;
//   };

//   const handleTouchEnd = () => {
//     if (!touchStartX.current || !touchEndX.current) return;
//     const diffX = touchStartX.current - touchEndX.current;
//     const diffY = touchStartY.current - touchEndY.current;
//     if (Math.abs(diffX) > Math.abs(diffY)) {
//       setActiveCard((prev) => (diffX > 0 ? Math.min(prev + 1, section.highlights.length - 1) : Math.max(prev - 1, 0)));
//     }
//     touchStartX.current = touchEndX.current = touchStartY.current = touchEndY.current = null;
//   };

//   useEffect(() => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollTo({
//         left: activeCard * carouselRef.current.offsetWidth,
//         behavior: 'smooth',
//       });
//     }
//   }, [activeCard]);

//   return (
//     <div
//       id={section.id}
//       className="w-full bg-white mt-10 mb-20 px-4 sm:px-6 lg:px-24"
//     >
//       <div className="max-w-[1100px] mx-auto">
//         <h2 className="text-[#AD2F3B] text-2xl sm:text-3xl font-bold text-center mb-2">
//           {section.title}
//         </h2>
//         <p className="text-center text-lg sm:text-xl font-semibold text-gray-700 mb-12">
//           {section.subtitle}
//         </p>

//         {/* Description & Image */}
//         <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-12 mb-20">
//           {/* Description Box */}
//           <div
//             className="w-full md:w-1/2 h-auto md:h-[400px] lg:h-[450px] border-2 border-gray-300 rounded-xl px-4 sm:px-6 md:px-6 py-6 sm:py-8 flex flex-col justify-between shadow-md 
//     text-base sm:text-[1rem] md:text-[1rem] lg:text-[1.25rem] xl:text-[1.175rem] leading-relaxed"
//           >
//             <ul className="list-disc pl-4 flex flex-col justify-between gap-2 md:gap-3 lg:gap-4 h-full">
//               {section.descriptionPoints.map((point, i) => (
//                 <li key={i}>{point}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Image Box */}
//           <div className="w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[420px] lg:h-[450px]">
//             <img
//               src={section.mainImage}
//               alt={section.title}
//               className="w-full h-full object-cover rounded-xl"
//             />
//           </div>
//         </div>

//         {/* Impact Highlights */}
//         <div className="w-full max-w-[1100px] md:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="w-full border-2 border-gray-300 py-10 px-4 sm:px-6 lg:px-12 text-base sm:text-lg text-gray-900 shadow-md mb-16 rounded-xl">
//             <h3 className="text-[#AD2F3B] text-2xl font-bold text-center mb-10">
//               Impact Highlights
//             </h3>

//             {/* Mobile + Tablet Carousel (md and below) */}
//             {/* Mobile + Tablet Carousel */}
//             <div
//               className="lg:hidden relative 
//              px-1 sm:px-2 md:px-4 
//              sm:max-w-[100%] md:max-w-[75%] 
//              mx-auto"
//             >
//               <div
//                 ref={carouselRef}
//                 className="flex overflow-x-hidden"
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEnd}
//               >
//                 {section.highlights.map((item, i) => (
//                   <div
//                     key={i}
//                     className="w-full flex-shrink-0 px-1 sm:px-2 md:px-2 py-1 bg-white 
//                    rounded-md sm:rounded-lg shadow-sm"
//                   >
//                     {/* Image */}
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-48 object-cover rounded-md mb-2 sm:mb-3"
//                     />

//                     {/* Title */}
//                     <h4
//                       className="text-[#AD2F3B] font-bold text-center leading-tight px-1 sm:px-2
//                        text-base sm:text-[1rem] md:text-[1.1rem] mb-4"
//                     >
//                       {item.title}
//                     </h4>

//                     {/* Content */}
//                     <div className="space-y-2 sm:space-y-3 text-sm sm:text-[1rem] px-1 sm:px-2 space-between">
//                       <p>
//                         <strong>Theme:</strong> {item.theme}
//                       </p>
//                       <p>
//                         <strong>Outreach:</strong> {item.outreach}
//                       </p>
//                       <p>
//                         <strong>Impact:</strong> {item.impact}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Dots */}
//               <div className="flex justify-center mt-4 space-x-2 sm:space-x-3">
//                 {section.highlights.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setActiveCard(i)}
//                     className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
//                       activeCard === i ? "bg-[#AD2F3B]" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Desktop Grid (lg and above) */}
//             <div className="hidden lg:flex flex-wrap justify-between gap-6">
//               {section.highlights.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex flex-col rounded-xl shadow-sm p- 
//                      min-w-[280px] w-[48%]  lg:h-[550px] xl:h-[550px] bg-white "
//                 >
//                   {/* Top: Image + Title */}
//                   <div className="flex-shrink-0 h-[240px] flex flex-col justify-start">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-[200px] object-cover rounded-xl mb-3"
//                     />
//                     <h4
//                       className="text-[#AD2F3B] font-bold text-center leading-tight px-2 text-balance
//               text-base sm:text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.125rem] 
//               flex items-center justify-center text-center h-[70px]"
//                     >
//                       {item.title}
//                     </h4>
//                   </div>

//                   {/* Bottom: Details */}
//                   <div className="flex flex-col justify-evenly flex-grow px-2 pt-3 text-sm md:text-base  lg:text-[14px] xl:text-[16px]">
//                     <p>
//                       <strong>Theme:</strong> {item.theme}
//                     </p>
//                     <p>
//                       <strong>Outreach:</strong> {item.outreach}
//                     </p>
//                     <p>
//                       <strong>Impact:</strong> {item.impact}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceSection;


import React, { useState, useEffect, useRef } from 'react';

const ServiceSection = ({ section }) => {
  const [activeCard, setActiveCard] = useState(0);
  const carouselRef = useRef(null);
  
  // Modal state and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentAlt, setCurrentAlt] = useState('');

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setActiveCard((prev) => (diffX > 0 ? Math.min(prev + 1, section.highlights.length - 1) : Math.max(prev - 1, 0)));
    }
    touchStartX.current = touchEndX.current = touchStartY.current = touchEndY.current = null;
  };

  const openModal = (imageSrc, imageAlt) => {
    setCurrentImage(imageSrc);
    setCurrentAlt(imageAlt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: activeCard * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [activeCard]);

  return (
    <div
      id={section.id}
      className="w-full bg-white mt-10 mb-20 px-4 sm:px-6 lg:px-24"
    >
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-[#AD2F3B] text-2xl sm:text-3xl font-bold text-center mb-2">
          {section.title}
        </h2>
        <p className="text-center text-lg sm:text-xl font-semibold text-gray-700 mb-12">
          {section.subtitle}
        </p>

        {/* Description & Image */}
        <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-12 mb-20">
          {/* Description Box */}
          <div
            className="w-full md:w-1/2 h-auto md:h-[400px] lg:h-[450px] border-2 border-gray-300 rounded-xl px-4 sm:px-6 md:px-6 py-6 sm:py-8 flex flex-col justify-between shadow-md 
    text-base sm:text-[1rem] md:text-[1rem] lg:text-[1.25rem] xl:text-[1.175rem] leading-relaxed"
          >
            <ul className="list-disc pl-4 flex flex-col justify-between gap-2 md:gap-3 lg:gap-4 h-full">
              {section.descriptionPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Image Box */}
          <div 
            className="w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[420px] lg:h-[450px] cursor-pointer"
            onClick={() => openModal(section.mainImage, section.title)}
          >
            <img
              src={section.mainImage}
              alt={section.title}
              className="w-full h-full object-cover rounded-xl hover:opacity-90 transition-opacity"
            />
          </div>
        </div>

        {/* Impact Highlights */}
        <div className="w-full max-w-[1100px] md:max-w-[80%] mx-auto px- sm:px-4 lg:px-8">
          <div className="w-full border-2 border-gray-300 py-10 px-4 sm:px-6 lg:px-12 text-base sm:text-lg text-gray-900 shadow-md mb-16 rounded-xl">
            <h3 className="text-[#AD2F3B] text-2xl font-bold text-center mb-10">
              Impact Highlights
            </h3>

            {/* Mobile + Tablet Carousel */}
            <div
              className="lg:hidden relative 
             px-1 sm:px-2 md:px-4 
             sm:max-w-[100%] md:max-w-[75%] 
             mx-auto"
            >
              <div
                ref={carouselRef}
                className="flex overflow-x-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {section.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 px-1 sm:px-2 md:px-2 py-1 bg-white 
                   rounded-md sm:rounded-lg shadow-sm"
                  >
                    {/* Image */}
                    <div 
                      className="cursor-pointer"
                      onClick={() => openModal(item.image, item.title)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-md mb-2 sm:mb-3 hover:opacity-90 transition-opacity"
                      />
                    </div>

                    {/* Title */}
                    <h4
                      className="text-[#AD2F3B] font-bold text-center leading-tight px-1 sm:px-2
                       text-base sm:text-[1rem] md:text-[1.1rem] mb-4"
                    >
                      {item.title}
                    </h4>

                    {/* Content */}
                    <div className="space-y-2 sm:space-y-3 text-sm sm:text-[1rem] px-1 sm:px-2 space-between">
                      <p>
                        <strong>Theme:</strong> {item.theme}
                      </p>
                      <p>
                        <strong>Outreach:</strong> {item.outreach}
                      </p>
                      <p>
                        <strong>Impact:</strong> {item.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center mt-4 space-x-2 sm:space-x-3">
                {section.highlights.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCard(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      activeCard === i ? "bg-[#AD2F3B]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:flex flex-wrap justify-between gap-6">
              {section.highlights.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-xl shadow-sm p- 
                     min-w-[280px] w-[48%] lg:h-[550px] xl:h-[550px] bg-white"
                >
                  {/* Top: Image + Title */}
                  <div className="flex-shrink-0 h-[240px] flex flex-col justify-start">
                    <div 
                      className="cursor-pointer"
                      onClick={() => openModal(item.image, item.title)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[200px] object-cover rounded-xl mb-3 hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <h4
                      className="text-[#AD2F3B] font-bold text-center leading-tight px-2 text-balance
              text-base sm:text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.125rem] 
              flex items-center justify-center text-center h-[70px]"
                    >
                      {item.title}
                    </h4>
                  </div>

                  {/* Bottom: Details */}
                  <div className="flex flex-col justify-evenly flex-grow px-2 pt-3 text-sm md:text-base lg:text-[14px] xl:text-[16px]">
                    <p>
                      <strong>Theme:</strong> {item.theme}
                    </p>
                    <p>
                      <strong>Outreach:</strong> {item.outreach}
                    </p>
                    <p>
                      <strong>Impact:</strong> {item.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal Overlay - Same as Gallery component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9990] px-4 py-6">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 
                     bg-white text-[#AD2F3B] text-xl sm:text-2xl font-bold 
                     z-[9991] w-10 h-10 rounded-full 
                     flex items-center justify-center shadow-lg"
            aria-label="Close gallery"
          >
            &times;
          </button>

          {/* Image Container */}
          <div className="relative w-[90%] md:w-[80%] max-h-[80vh] flex items-center justify-center">
            {/* Image */}
            <img
              src={currentImage}
              alt={currentAlt}
              className="w-full h-auto max-h-[80vh] object-contain rounded shadow-xl z-[9990]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSection;