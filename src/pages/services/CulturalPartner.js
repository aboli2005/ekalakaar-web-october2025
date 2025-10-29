// import React from "react";
// import ghungroo from '../../assets/services/2.png';
// import { useNavigate } from 'react-router-dom';
// import ScrollToHashElement from '../ScrollToHashElement';

// const CulturalPartner = () => {
//   const navigate = useNavigate();

//   return (
//     <div id="services" className="bg-white font-poppins px-4 sm:px-6 py-8 overflow-x-hidden">
//       <ScrollToHashElement />

//       <div className="flex flex-col lg:flex-row items-center justify-between w-full mx-auto">
//         {/* Content Section */}
//         <div className="flex flex-col w-full lg:w-[58%]">
//           <p className="uppercase text-[1rem] md:text-[1.125rem] tracking-wide font-semibold text-gray-700 mb-3">
//             Services
//           </p>

//           <h2 className="text-[1.875rem] md:text-[2rem] font-bold text-[#AD2F3B] leading-snug  md:mb-">
//             We are your cultural communication partner!
//           </h2>

//           {/* Mobile Image */}
//           <div className="md:hidden flex justify-center my-5">
//             <div className="w-[70vw] max-w-[280px] aspect-square rounded-full overflow-hidden shadow-[12px_0_4px_8px_#FBF1F3]">
//               <img
//                 src={ghungroo}
//                 alt="ghungroo"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>

//           <div className="text-gray-800 text-[1rem] leading-[1.5rem] md:text-[1.125rem] md:leading-[1.75rem] font-medium">
//             <p className="mb-4 md:mb-5">
//               We serve corporates, governments, institutions and development sector organizations for their stakeholder events, conferences, marketing and outreach campaigns by delivering impactful experiences that enhance engagement with their audiences.
//             </p>
//             <p className="mb-4 md:mb-5">
//               Our performances do more than entertain—they move hearts, spark conversations, and drive action and help our clients achieve their business and social goals by communicating more effectively with their stakeholder audiences.
//             </p>
//             <p className="font-semibold mb-2 md:mb-3">
//               Our use-case based core solutions and offerings include:
//             </p>
//             <ul className="list-disc list-inside text-[#AD2F3B] space-y-1 mb-4">
//               <li><span className="font-semibold">Enable</span> (Social & Rural Marketing)</li>
//               <li><span className="font-semibold">Engage</span> (Conferences & Events)</li>
//               <li><span className="font-semibold">Elevate</span> (Cultural Entertainment)</li>
//             </ul>
//           </div>

// <div className="flex justify-start mt-2 md:mt-2">
//   <button
//     onClick={() => navigate('/book-performance')}
//     className="btn-main self-center sm:self-start"
//   >
//     Book Performance
//   </button>
// </div>

//         </div>

//         {/* Desktop Image */}
//         <div className="hidden md:flex items-center justify-center h-full mt-8 lg:mt-0 lg:ml-8 xl:ml-12 pr-6 xl:pr-12">
//           <div className="relative w-[42vw] max-w-[450px] aspect-square rounded-full overflow-hidden shadow-[25px_0_4px_14px_#FBF1F3]">
//             <img
//               src={ghungroo}
//               alt="ghungroo"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CulturalPartner;

// src/pages/CulturalPartner.jsx

import React from "react";
import ghungroo from '../../assets/services/2.png';
import { useNavigate } from 'react-router-dom';
import ScrollToHashElement from '../ScrollToHashElement';

const CulturalPartner = () => {
  const navigate = useNavigate();

  return (
    <div
      id="services"
      className="bg-white font-poppins px-4 sm:px-6 lg:px-12 py-10 overflow-x-hidden w-full"
    >
      <ScrollToHashElement />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Section */}
        <div className="flex flex-col w-full lg:w-1/2">
          <p className="uppercase text-base md:text-lg tracking-widest font-semibold text-gray-700 mb-3">
            Services
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#AD2F3B] leading-snug mb-6">
            We are your cultural communication partner!
          </h2>

          {/* Mobile Image */}
          <div className="lg:hidden flex justify-center my-6">
            <div className="w-[70vw] max-w-[280px] aspect-square rounded-full overflow-hidden shadow-[12px_0_4px_8px_#FBF1F3]">
              <img
                src={ghungroo}
                alt="ghungroo"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="text-gray-800 text-base md:text-lg leading-relaxed font-medium space-y-5">
            <p>
              We serve corporates, governments, institutions and development
              sector organizations for their stakeholder events, conferences,
              marketing and outreach campaigns by delivering impactful
              experiences that enhance engagement with their audiences.
            </p>
            <p>
              Our performances do more than entertain—they move hearts, spark
              conversations, and drive action and help our clients achieve their
              business and social goals by communicating more effectively with
              their stakeholder audiences.
            </p>
            <p className="font-semibold">
              Our use-case based core solutions and offerings include:
            </p>
            <ul className="list-disc list-inside text-[#AD2F3B] space-y-1 pl-4">
              <li>
                <span className="font-semibold">Enable</span> (Social & Rural
                Marketing)
              </li>
              <li>
                <span className="font-semibold">Engage</span> (Conferences &
                Events)
              </li>
              <li>
                <span className="font-semibold">Elevate</span> (Cultural
                Entertainment)
              </li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-start  mt-8 md:mt-6">
            <button
              onClick={() => navigate("/book-performance")}
              className="btn-main"
            >
              Book Performance
            </button>
          </div>
        </div>

        {/* Desktop Image */}
        <div className="hidden lg:flex items-center justify-center lg:w-1/2">
          <div className="relative w-full max-w-[450px] aspect-square rounded-full overflow-hidden shadow-[25px_0_4px_14px_#FBF1F3]">
            <img
              src={ghungroo}
              alt="ghungroo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalPartner;
