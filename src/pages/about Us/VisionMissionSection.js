// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import konark from '../../assets/aboutUs_heading/konark.jpeg';
// import mandala from '../../assets/wallpaper.png';

// const VisionMissionSection = () => {
//   const [isOverlayOpen, setIsOverlayOpen] = useState(false);

//   return (
//     <section id="vision-mission" className="relative w-full">
//       <div className={`transition-opacity duration-300 ${isOverlayOpen ? "opacity-15 pointer-events-none" : "opacity-100"}`}>
//         <div className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 text-black relative overflow-hidden z-10">
          
//           {/* Mandala Backgrounds */}
//           <div className="hidden sm:block">
//             {[['top-[-12rem]', 'right-[-13rem]'], ['top-[-12rem]', 'left-[-13rem]'], ['bottom-[-19rem]', 'right-[-13rem]'], ['bottom-[-19rem]', 'left-[-13rem]']].map(
//               ([vertical, horizontal], index) => (
//                 <img
//                   key={index}
//                   src={mandala}
//                   alt="Mandala"
//                   className={`absolute ${vertical} ${horizontal} w-[31.25rem] opacity-70 z-0`}
//                 />
//               )
//             )}
//           </div>

//           <div className="max-w-screen-xl mx-auto text-center">
//             {/* Heading */}
//             <h2 className="
//               text-[1.5rem] sm:text-[1.875rem] md:text-[2rem]
//               lg:text-[2.125rem] xl:text-[2.25rem]
//               font-bold text-[#AD2F3B] mb-6 md:mb-12"
//             >
//               Our Vision and Mission
//             </h2>

//             {/* Paragraph */}
//             <p className="
//               max-w-[81.25rem] mx-auto font-medium text-gray-900 mb-6
//               text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
//               lg:text-[1.25rem] xl:text-[1.375rem]
//               leading-[1.7rem] sm:leading-[1.8rem] md:leading-[1.9rem]"
//             >
//               We realised that many traditional artists face challenges in getting visibility, stable work, and fair income.
//               With "Art beyond entertainment" as our motto, we saw a way to connect their talent with modern business and
//               social needs. Our vision is to create impact where culture and commerce meet — helping organisations achieve
//               their goals while supporting artists with Naam, Kaam, and Daam.
//             </p>

//             <button
//               onClick={() => setIsOverlayOpen(true)}
//               className="text-[#AD2F3B] underline font-medium mb-8
//               text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
//               lg:text-[1.25rem] xl:text-[1.375rem]"
//             >
//               Read More
//             </button>
//           </div>

//           {/* Two Column Section */}
//           <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-screen-xl mx-auto">
//             <div className="w-full h-auto aspect-[4/3] md:aspect-[7/6] rounded-md shadow-md overflow-hidden">
//               <img src={konark} alt="Konark" className="w-full h-full object-cover" />
//             </div>

//             <div className="w-full bg-white shadow-md rounded-xl p-4 sm:p-6">
//               <h3 className="
//                 text-[#AD2F3B] font-bold mb-4 sm:mb-6
//                 text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] xl:text-[1.375rem]"
//               >
//                 The Cultural Moment: Why Now?
//               </h3>

//               <ul className="
//                 list-disc list-outside space-y-3 sm:space-y-4 pl-5 sm:pl-6 text-gray-800
//                 text-[0.875rem] md:text-[1.125rem] lg:text-[1.25rem] xl:text-[1.375rem]"
//               >
//                 <li>India is seeing a strong cultural revival and resurgence.</li>
//                 <li>Rise in global acceptance through the internationalization of yoga.</li>
//                 <li>G20's cultural showcases have boosted India's soft power.</li>
//                 <li>Spiritual tourism is booming across the country.</li>
//                 <li>Regional content is thriving on OTT platforms.</li>
//                 <li>
//                   <span className="text-[#AD2F3B] font-semibold">
//                     "Desi is the new cool"
//                   </span> — Indian culture is being celebrated worldwide.
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay Section */}
//       {isOverlayOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10 p-4 sm:p-6">
//           <div className="
//             bg-white w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[70rem]
//             max-h-[90vh] rounded-xl shadow-2xl relative p-6 sm:p-8 overflow-y-auto"
//           >
//             <button
//               onClick={() => setIsOverlayOpen(false)}
//               className="absolute top-6 right-6 text-gray-600 hover:text-[#AD2F3B] z-50"
//             >
//               <X size={28} />
//             </button>

//             <h2 className="
//               text-[#AD2F3B] font-bold text-center uppercase mb-8 mt-10
//               text-[1.5rem] sm:text-[1.75rem] md:text-[2rem]
//               lg:text-[2.125rem] xl:text-[2.25rem]"
//             >
//               Our Vision and Mission
//             </h2>

//             <div className="
//               text-gray-800 space-y-4 max-w-[56.25rem] mx-auto
//               text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
//               lg:text-[1.25rem] xl:text-[1.375rem]
//               leading-[1.7rem] sm:leading-[1.8rem] md:leading-[1.9rem]"
//             >
//               <p>
//                 We recognised that our classical and folk artists, despite being talented, have challenges of
//                 <span className="text-[#AD2F3B] font-semibold"> visibility (Naam)</span>,
//                 <span className="text-[#AD2F3B] font-semibold"> stable livelihoods (Kaam)</span>, and
//                 <span className="text-[#AD2F3B] font-semibold"> fair compensation (Daam)</span>.
//               </p>
//               <p>
//                 We questioned how their strength and talent can be taken as a solution to the market for addressing modern
//                 business and social challenges. We saw these art forms as powerful tools for cultural communication,
//                 engagement, and impact.
//               </p>
//               <p>
//                 Our vision is to make an impact at the intersection of culture and commerce, enabling businesses and social
//                 organizations to achieve their goals while creating meaningful livelihoods for traditional performing artists.
//               </p>
//               <p>
//                 With <span className="text-[#AD2F3B] font-semibold">"Art beyond entertainment"</span> as the motto at the core
//                 of our passion, purpose & philosophy, our mission is to re-imagine Indian traditional performing arts as a
//                 force for business and social transformation, while bringing
//                 <span className="text-[#AD2F3B] font-semibold"> Naam</span> (visibility),
//                 <span className="text-[#AD2F3B] font-semibold"> Kaam</span> (opportunity),
//                 <span className="text-[#AD2F3B] font-semibold"> Daam</span> (fair compensation) to our Indian traditional
//                 performing artists.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default VisionMissionSection;

import React, { useState } from 'react';
import { X } from 'lucide-react';
import konark from '../../assets/aboutUs_heading/konark.jpeg';
import mandala from '../../assets/wallpaper.png';

const VisionMissionSection = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <section id="vision-mission" className="relative w-full">
      <div className={`transition-opacity duration-300 ${isOverlayOpen ? "opacity-15 pointer-events-none" : "opacity-100"}`}>
        <div className="bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-28 text-black relative overflow-hidden z-10">
          
          {/* Mandala Backgrounds */}
          <div className="hidden sm:block">
           <img
             src={mandala}
             alt="Mandala Top Right"
             className="absolute 
               top-[-6rem] md:top-[-5.7rem] lg:top-[-6rem] xl:top-[-7rem] 
               right-[-5rem] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7rem]
               w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Top Left */}
           <img
             src={mandala}
             alt="Mandala Top Left"
             className="absolute 
               top-[-6rem] md:top-[-5.7rem] lg:top-[-6rem] xl:top-[-7rem] 
               left-[-5rem] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7rem]
               w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Bottom Right */}
           <img
             src={mandala}
             alt="Mandala Bottom Right"
             className="absolute 
               bottom-[-9vw] md:bottom-[-10.3rem] lg:bottom-[-11.5rem] xl:bottom-[-17rem] 
               right-[-6vw] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7.3rem]
               w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Bottom Left */}
           <img
             src={mandala}
             alt="Mandala Bottom Left"
             className="absolute 
               bottom-[-9vw] md:bottom-[-10.3rem] lg:bottom-[-11.5rem] xl:bottom-[-17rem] 
               left-[-6vw] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7.3rem]
               w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
          </div>

          <div className="max-w-screen-xl mx-auto text-center">
            {/* Heading */}
            <h2 className="
              text-[1.5rem]      // 24px
              sm:text-[1.5rem]
              md:text-[1.875rem] // 30px
              lg:text-[2rem]     // 32px
              xl:text-[2.125rem] // 34px
              font-bold text-[#AD2F3B] mb-6 md:mb-12"
            >
              Our Vision and Mission
            </h2>

            {/* Paragraph */}
            <p className="
              max-w-3xl xl:max-w-4xl mx-auto font-medium text-gray-900 mb-4
              text-[0.875rem]    // 14px
              sm:text-[0.875rem]
              md:text-[1rem]     // 16px
              lg:text-[1.125rem] // 18px
              xl:text-[1.25rem]  // 20px
              leading-[1.6rem] sm:leading-[1.7rem] md:leading-[1.8rem]"
            >
              We realised that many traditional artists face challenges in getting visibility, stable work, and fair income.
              With "Art beyond entertainment" as our motto, we saw a way to connect their talent with modern business and
              social needs. Our vision is to create impact where culture and commerce meet — helping organisations achieve
              their goals while supporting artists with Naam, Kaam, and Daam.
            </p>

            <button
              onClick={() => setIsOverlayOpen(true)}
              className="text-[#AD2F3B] underline font-medium mb-4
              text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
              lg:text-[1.25rem] xl:text-[1.375rem]"
            >
              Read More
            </button>
          </div>

          {/* Two Column Section */}
<div className="mt-4 md:mt-12 flex flex-col md:flex-col lg:flex-row gap-8 lg:gap-8 max-w-screen-xl mx-auto  sm:px-4 md:px-8">
  {/* Image Block */}
  <div className="w-full h-auto lg:w-1/2 aspect-[4.5/3.5] md:aspect-[7/6] rounded-md shadow-md overflow-hidden">
    <img src={konark} alt="Konark" className="w-full h-full object-cover" />
  </div>

  {/* Text Box */}
  <div className="w-full lg:w-1/2 bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col justify-center">
    <h3 className="
      text-[#AD2F3B] font-bold mb-4 sm:mb-6
      sm:text-[1rem] md:text-[1.55rem] lg:text-[1.125rem] xl:text-[1.375rem]"
    >
      The Cultural Moment: Why Now?
    </h3>

    <ul className="
      list-disc list-outside space-y-3 sm:space-y-4 pl-5 sm:pl-6 text-gray-800
      text-[0.875rem] sm:text-[0.875rem] md:text-[1.125rem]
      lg:text-[1rem] xl:text-[1.25rem]"
    >
      <li>India is seeing a strong cultural revival and resurgence.</li>
      <li>Rise in global acceptance through the internationalization of yoga.</li>
      <li>G20's cultural showcases have boosted India's soft power.</li>
      <li>Spiritual tourism is booming across the country.</li>
      <li>Regional content is thriving on OTT platforms.</li>
      <li>
        <span className="text-[#AD2F3B] font-semibold">
          "Desi is the new cool"
        </span> — Indian culture is being celebrated worldwide.
      </li>
    </ul>
  </div>
</div>

        </div>
      </div>

      {/* Overlay Section */}
      {isOverlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10 p-4 sm:p-6">
          <div className="
            bg-white w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[70rem]
            max-h-[90vh] rounded-xl shadow-2xl relative p-6 sm:p-8 overflow-y-auto"
          >
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="absolute top-6 right-6 text-gray-600 hover:text-[#AD2F3B] z-50"
            >
              <X size={28} />
            </button>

            <h2 className="
              text-[#AD2F3B] font-bold text-center uppercase mb-8 mt-10
              text-[1.5rem] sm:text-[1.5rem] md:text-[1.875rem]
              lg:text-[2rem] xl:text-[2.125rem]"
            >
              Our Vision and Mission
            </h2>

            <div className="
              text-gray-800 space-y-4 max-w-3xl 3xl:max-w-3xl mx-auto
              text-[0.875rem] sm:text-[0.875rem] md:text-[1rem]
              lg:text-[1.125rem] xl:text-[1.25rem]
              leading-[1.6rem] sm:leading-[1.7rem] md:leading-[1.8rem]"
            >
              <p>
                We recognised that our classical and folk artists, despite being talented, have challenges of
                <span className="text-[#AD2F3B] font-semibold"> visibility (Naam)</span>,
                <span className="text-[#AD2F3B] font-semibold"> stable livelihoods (Kaam)</span>, and
                <span className="text-[#AD2F3B] font-semibold"> fair compensation (Daam)</span>.
              </p>
              <p>
                We questioned how their strength and talent can be taken as a solution to the market for addressing modern
                business and social challenges. We saw these art forms as powerful tools for cultural communication,
                engagement, and impact.
              </p>
              <p>
                Our vision is to make an impact at the intersection of culture and commerce, enabling businesses and social
                organizations to achieve their goals while creating meaningful livelihoods for traditional performing artists.
              </p>
              <p>
                With <span className="text-[#AD2F3B] font-semibold">"Art beyond entertainment"</span> as the motto at the core
                of our passion, purpose & philosophy, our mission is to re-imagine Indian traditional performing arts as a
                force for business and social transformation, while bringing
                <span className="text-[#AD2F3B] font-semibold"> Naam</span> (visibility),
                <span className="text-[#AD2F3B] font-semibold"> Kaam</span> (opportunity),
                <span className="text-[#AD2F3B] font-semibold"> Daam</span> (fair compensation) to our Indian traditional
                performing artists.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisionMissionSection;
