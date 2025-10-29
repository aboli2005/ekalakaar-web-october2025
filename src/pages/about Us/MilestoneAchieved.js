// import React from "react";
// import logoImage from "../../assets/aboutUs_heading/WhatsApp Image 2025-05-24 at 11.26.55 PM.jpeg";
// import mandala from "../../assets/wallpaper.png";
// import ScrollToHashElement from '../ScrollToHashElement';

// import award1 from "../../assets/carousal/c1.png";
// import award2 from "../../assets/carousal/c2.png";
// import award3 from "../../assets/carousal/c3.jpg";
// import award4 from "../../assets/carousal/c4.jpg";
// import award5 from "../../assets/carousal/c5.png";
// import award6 from "../../assets/carousal/c6.jpg";
// import award7 from "../../assets/carousal/c7.png";
// import award8 from "../../assets/carousal/c8.jpg";

// const MilestoneAchieved = () => {
//   const awards = [
//     { image: award1, title: "Industry Innovation Partner" },
//     { image: award2, title: "HERCEL" },
//     { image: award3, title: "WADIWANI" },
//     { image: award4, title: "XML Bootcamp" },
//     { image: award5, title: "Digital Pioneer" },
//     { image: award6, title: "Cultural Ambassador" },
//     { image: award7, title: "Tech for Good" },
//     { image: award8, title: "Heritage Guardian" },
//   ];

//   return (
//     <section id="achievements" className="relative w-full bg-white overflow-x-hidden px-4 sm:px-6 lg:px-12 py-16">
//       <ScrollToHashElement />

//       {/* Mandalas */}
//       <div className="hidden sm:block pointer-events-none">
//         <img
//           src={mandala}
//           alt="Mandala right"
//           className="absolute top-0 right-0 w-1/3 max-w-[18rem] opacity-60 translate-x-1/2 -translate-y-1/2"
//         />
//         <img
//           src={mandala}
//           alt="Mandala left"
//           className="absolute top-0 left-0 w-1/3 max-w-[18rem] opacity-60 -translate-x-1/2 -translate-y-1/2"
//         />
//       </div>

//       {/* Heading */}
//       <div className="text-center max-w-4xl mx-auto">
//         <p className="text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] xl:text-[1.375rem] tracking-wider font-semibold text-[#404040] mb-4">
//           ACHIEVEMENT AND IMPACT
//         </p>
//         <h2 className="
//           font-bold text-[#AD2F3B] mb-12
//           text-[1.5rem] sm:text-[1.875rem] md:text-[2rem]
//           lg:text-[2.125rem] xl:text-[2.25rem]
//         ">
//           MILESTONES WE HAVE ACHIEVED
//         </h2>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-white rounded-xl shadow-lg max-w-3xl xl:max-w-5xl mx-auto overflow-x-auto px-4 sm:px-8">
//         <div className="min-w-[36rem] md:min-w-0 grid grid-cols-4 gap-4 text-center py-6">
//           {[
//             { count: "350+", label: "Performances" },
//             { count: "30+", label: "Brands" },
//             { count: "1000+", label: "Artists" },
//             { count: "2500+", label: "Artist Days" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center justify-center px-4 py-6 transition duration-300 transform hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] bg-white rounded-md"
//             >
//               <h3 className="text-[1.125rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[2rem] font-semibold">
//                 {item.count}
//               </h3>
//               <p className="text-[#AD2F3B] text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] xl:text-[1.375rem] font-medium mt-1 text-center">
//                 {item.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Info + Logo Section */}
//       <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
//         {/* Text Box */}
//         <div className="w-full bg-white rounded-lg shadow-md p-6 sm:p-10">
//           <ul className="list-disc list-outside space-y-6 text-gray-800
//             text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
//             lg:text-[1.25rem] xl:text-[1.375rem]">
//             <li>
//               We've had the privilege of working with incredible partners like the{" "}
//               <strong className="font-semibold">
//                 Ministry of Social Justice, Tata Power, UNICEF, IIM Mumbai, TISS, IIT Bombay
//               </strong>, and more.
//             </li>
//             <li>
//               Delivered bespoke performances at venues like{" "}
//               <strong className="font-semibold">
//                 Taj, Grand Hyatt, Four Seasons, Mayfair Hotel
//               </strong>.
//             </li>
//             <li>
//               Recently launched a <strong className="font-semibold">first-of-its-kind</strong> Android mobile
//               application exclusively dedicated to Indian classical, folk and fusion artists.
//             </li>
//           </ul>
//         </div>

//         {/* Logo */}
//         <div className="flex justify-center items-center">
//           <img
//             src={logoImage}
//             alt="Partners and Clients"
//             className="w-full max-w-[32rem] aspect-[4/3] object-contain"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MilestoneAchieved;


import React from "react";
import logoImage from "../../assets/aboutUs_heading/WhatsApp Image 2025-05-24 at 11.26.55 PM.jpeg";
import mandala from "../../assets/wallpaper.png";
import ScrollToHashElement from '../ScrollToHashElement';

import award1 from "../../assets/carousal/c1.png";
import award2 from "../../assets/carousal/c2.png";
import award3 from "../../assets/carousal/c3.jpg";
import award4 from "../../assets/carousal/c4.jpg";
import award5 from "../../assets/carousal/c5.png";
import award6 from "../../assets/carousal/c6.jpg";
import award7 from "../../assets/carousal/c7.png";
import award8 from "../../assets/carousal/c8.jpg";

const MilestoneAchieved = () => {
  const awards = [
    { image: award1, title: "Industry Innovation Partner" },
    { image: award2, title: "HERCEL" },
    { image: award3, title: "WADIWANI" },
    { image: award4, title: "XML Bootcamp" },
    { image: award5, title: "Digital Pioneer" },
    { image: award6, title: "Cultural Ambassador" },
    { image: award7, title: "Tech for Good" },
    { image: award8, title: "Heritage Guardian" },
  ];

  return (
    <section id="achievements" className="relative w-full bg-white overflow-hidden px-4 sm:px-6 lg:px-12 py-16">
      <ScrollToHashElement />

      {/* Mandalas */}
      <div className="hidden sm:block pointer-events-none">
      <img
  src={mandala}
  alt="Mandala Top Left"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-8rem] xl:top-[-8rem] 
    left-[-5rem] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* top Right */}
<img
  src={mandala}
  alt="Mandala Top Right"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-8rem] xl:top-[-8rem] 
    right-[-5rem] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>
    </div>

      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto">
        <p className="text-[0.875rem] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] xl:text-[1.25rem] tracking-wider font-semibold text-[#404040] mb-4">
          ACHIEVEMENT AND IMPACT
        </p>
        <h2 className="
          font-bold text-[#AD2F3B] mb-12
          text-[1.5rem] sm:text-[1.5rem] md:text-[1.875rem]
          lg:text-[2rem] xl:text-[2.125rem]
        ">
          MILESTONES WE HAVE ACHIEVED
        </h2>
      </div>

      {/* Stats Section */}
<div className="bg-white rounded-xl shadow-lg max-w-3xl xl:max-w-5xl mx-auto overflow-x-scroll px-4 sm:px-8 custom-scrollbar-maroon">
        <div className="min-w-[36rem] md:min-w-0 grid grid-cols-4 gap-4 text-center py-6">
          {[
            { count: "350+", label: "Performances" },
            { count: "30+", label: "Brands" },
            { count: "1000+", label: "Artists" },
            { count: "2500+", label: "Artist Days" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-4 py-6 transition duration-300 transform hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] bg-white rounded-md"
            >
              <h3 className="text-[1.125rem] sm:text-[1.25rem] md:text-[1.375rem] lg:text-[1.5rem] font-semibold">
                {item.count}
              </h3>
              <p className="text-[#AD2F3B] font-medium mt-1 text-center
                text-[0.875rem] sm:text-[0.875rem] md:text-[1rem]
                lg:text-[1.125rem] xl:text-[1.25rem]"
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Info + Logo Section */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        {/* Text Box */}
        <div className="w-full bg-white rounded-lg shadow-md p-6 sm:p-10">
          <ul className="list-disc list-outside space-y-6 text-gray-800
            text-[0.875rem] sm:text-[0.875rem] md:text-[1rem]
            lg:text-[1.125rem] xl:text-[1.25rem]">
            <li>
              We've had the privilege of working with incredible partners like the{" "}
              <strong className="font-semibold">
                Ministry of Social Justice, Tata Power, UNICEF, IIM Mumbai, TISS, IIT Bombay
              </strong>, and more.
            </li>
            <li>
              Delivered bespoke performances at venues like{" "}
              <strong className="font-semibold">
                Taj, Grand Hyatt, Four Seasons, Mayfair Hotel
              </strong>.
            </li>
            <li>
              Recently launched a <strong className="font-semibold">first-of-its-kind</strong> Android mobile
              application exclusively dedicated to Indian classical, folk and fusion artists.
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center">
          <img
            src={logoImage}
            alt="Partners and Clients"
            className="w-full max-w-[30rem] aspect-[4/3] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default MilestoneAchieved;
