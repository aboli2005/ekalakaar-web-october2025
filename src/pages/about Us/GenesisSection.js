// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import mandala from '../../assets/wallpaper.png';
// import genesis1 from '../../assets/aboutUs_heading/gen1.jpeg';
// import genesis2 from '../../assets/Artist/dancer/Sukalyan/sukalyan11.png';
// import genesis3 from '../../assets/aboutUs_heading/gen3.jpeg';
// import ScrollToHashElement from '../ScrollToHashElement';

// const GenesisSection = () => {
//   const [isOverlayOpen, setIsOverlayOpen] = useState(false);

//   return (
//     <div id="our-story" className="relative w-full bg-white overflow-hidden">
//       <ScrollToHashElement />

//       {/* Mandalas */}
//       <div className="hidden sm:block">
//         {[['top-[-6.25rem]', 'right-[-13rem]'], ['top-[-6.25rem]', 'left-[-13rem]'], ['bottom-[-19.5rem]', 'right-[-13rem]'], ['bottom-[-19.5rem]', 'left-[-13rem]']].map(
//           ([vertical, horizontal], index) => (
//             <img
//               key={index}
//               src={mandala}
//               alt="Mandala"
//               className={`absolute ${vertical} ${horizontal} w-[31.25rem] opacity-70 z-0`}
//             />
//           )
//         )}
//       </div>

//       <section className="pt-16 max-w-screen-xl mx-auto text-center bg-white text-black px-4 sm:px-6 lg:px-12">
//         {/* Top label */}
//         <h2 className="text-[0.75rem] sm:text-[0.875rem] lg:text-[1rem] tracking-[0.15em] font-semibold text-[#404040] mb-4">
//           OUR STORY
//         </h2>

//         {/* Main Heading */}
//         <h2 className="
//           text-[1.5rem]
//           sm:text-[1.875rem]
//           md:text-[2rem]
//           lg:text-[2.125rem]
//           xl:text-[2.25rem]
//           font-bold text-[#AD2F3B] mb-6"
//         >
//           THE GENESIS
//         </h2>

//         {/* Paragraph */}
//         <p className="
//           max-w-4xl mx-auto font-medium text-gray-900 mb-6
//           text-[0.875rem]
//           sm:text-[1rem]
//           md:text-[1.125rem]
//           lg:text-[1.25rem]
//           xl:text-[1.375rem]
//           leading-[1.7rem] sm:leading-[1.8rem] md:leading-[1.9rem]"
//         >
//           The idea for eKalakaar came from the belief that Indian performing
//           arts are more than just entertainment. Inspired by the Natya Shastra,
//           it was created in 2022–23 by Dr. Sanjaya Pradhan and Mr. Amit Dutta,
//           with the aim to use traditional arts for communication and impact. The
//           founding team brings years of experience in social change,
//           livelihoods, and corporate strategy.
//         </p>

//         {/* Read More Button */}
//         <button
//           onClick={() => setIsOverlayOpen(true)}
//           className="
//             text-[#AD2F3B] underline font-medium mb-8
//             text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
//             lg:text-[1.25rem] xl:text-[1.375rem]"
//         >
//           Read More
//         </button>

//         {/* Image Grid */}
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
//           {[genesis1, genesis2, genesis3].map((img, i) => (
//             <div
//               key={i}
//               className="w-full max-w-[95vw] mx-auto aspect-[4.7/5] sm:aspect-[4/4.5] md:aspect-[4/4] lg:aspect-[4.7/5] rounded-md shadow-md overflow-hidden"
//             >
//               <img
//                 src={img}
//                 alt={`Genesis ${i + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Overlay */}
//         {isOverlayOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/20 px-4 sm:px-6">
//             <div className="
//               bg-white w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[70rem]
//               max-h-[90vh] rounded-lg shadow-2xl relative p-6 sm:p-10 overflow-y-auto"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setIsOverlayOpen(false)}
//                 className="absolute top-6 right-6 text-gray-600 hover:text-[#AD2F3B] z-50"
//               >
//                 <X size={28} />
//               </button>

//               {/* Overlay Heading */}
//               <h2 className="
//                 text-[#AD2F3B] font-bold text-center mb-8 mt-6 uppercase
//                 text-[1.5rem] sm:text-[1.75rem] md:text-[2rem]
//                 lg:text-[2.125rem] xl:text-[2.25rem]"
//               >
//                 The Genesis and Idea
//               </h2>

//               {/* Overlay Paragraphs */}
//               <div className="
//                 text-gray-800 space-y-5 max-w-4xl mx-auto text-left
//                 text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
//                 lg:text-[1.25rem] xl:text-[1.375rem]
//                 leading-[1.7rem] sm:leading-[1.8rem] md:leading-[1.9rem]"
//               >
//                 <p>
//                   The idea for eKalakaar was born from the realization that while
//                   performing arts have become mere entertainment today, the Natya
//                   Shastra—the first treatise on Indian performing arts and often
//                   called the "Fifth Veda"—envisioned it as a medium for
//                   communication, education and inspiration.
//                 </p>
//                 <p>
//                   India's traditional classical and folk performing arts evoke and
//                   tap into the "Navrasas"–nine human emotions—including empathy,
//                   joy, and reflection.
//                 </p>
//                 <p>
//                   eKalakaar was ideated and conceptualised in 2022–23 by a highly
//                   passionate team comprising of{' '}
//                   <span className="text-[#AD2F3B] font-semibold">
//                     Dr. Sanjaya Pradhan (Founder)
//                   </span>{' '}
//                   and{' '}
//                   <span className="text-[#AD2F3B] font-semibold">
//                     Mr. Amit Dutta (Co–Founder)
//                   </span>
//                   .
//                 </p>
//                 <p>
//                   The founding team cumulatively brings over four decades of
//                   experience in social impact, strategy, consulting and operations
//                   experience in organisations like Tata Power, Mahindra Group,
//                   NSDC, EY & KPMG, leading pioneering change initiatives in the
//                   social impact sphere including Skill Development & Livelihoods,
//                   Social Behaviour Change, CSR and Affirmative Action.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default GenesisSection;


import React, { useState } from 'react';
import { X } from 'lucide-react';
import mandala from '../../assets/wallpaper.png';
import genesis1 from '../../assets/aboutUs_heading/gen1.jpeg';
import genesis2 from '../../assets/Artist/dancer/Sukalyan/sukalyan11.png';
import genesis3 from '../../assets/aboutUs_heading/gen3.jpeg';
import ScrollToHashElement from '../ScrollToHashElement';

const GenesisSection = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
const [currentImage, setCurrentImage] = useState('');
const [currentAlt, setCurrentAlt] = useState('');

const openImageModal = (imageSrc, altText) => {
  setCurrentImage(imageSrc);
  setCurrentAlt(altText);
  setIsImageModalOpen(true);
};

const closeImageModal = () => {
  setIsImageModalOpen(false);
};


  return (
    <div id="our-story" className="relative w-full bg-white overflow-hidden">
      <ScrollToHashElement />

      {/* Mandalas */}
      <div className="hidden sm:block">
        <img
             src={mandala}
             alt="Mandala Top Right"
             className="absolute 
               top-[-6rem] md:top-[-7rem] lg:top-[-8rem] xl:top-[-7rem] 
               right-[-5rem] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7.3rem]
               w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Top Left */}
           <img
             src={mandala}
             alt="Mandala Top Left"
             className="absolute 
               top-[-6rem] md:top-[-7rem] lg:top-[-8rem] xl:top-[-7rem] 
               left-[-5rem] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7.3rem]
               w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Bottom Right */}
           <img
             src={mandala}
             alt="Mandala Bottom Right"
             className="absolute 
               bottom-[-9vw] md:bottom-[-11.3rem] lg:bottom-[-13rem] xl:bottom-[-18rem] 
               right-[-6vw] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7.3rem]
               w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
           
           {/* Bottom Left */}
           <img
             src={mandala}
             alt="Mandala Bottom Left"
             className="absolute 
               bottom-[-9vw] md:bottom-[-11.3rem] lg:bottom-[-13rem] xl:bottom-[-18rem] 
               left-[-6vw] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7.3rem]
               w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
               opacity-[0.7] z-0 hidden md:block"
           />
      </div>

      <section className="pt-16 max-w-screen-xl mx-auto text-center bg-white text-black px-4 sm:px-6 lg:px-12 xl:px-28">
        {/* Top label */}
        <h2 className="text-[0.75rem] sm:text-[0.875rem] lg:text-[1rem] tracking-[0.15em] font-semibold text-[#404040] mb-4">
          OUR STORY
        </h2>

        {/* Main Heading */}
        <h2 className="
          text-[1.5rem]      // 24px
          sm:text-[1.5rem]
          md:text-[1.875rem] // 30px
          lg:text-[2rem]     // 32px
          xl:text-[2.125rem] // 34px
          font-bold text-[#AD2F3B] mb-6"
        >
          THE GENESIS
        </h2>

        {/* Paragraph */}
        <p className="
          max-w-3xl xl:max-w-4xl mx-auto font-medium text-gray-900 mb-6
          text-[0.875rem]    // 14px
          sm:text-[0.875rem]
          md:text-[1rem]     // 16px
          lg:text-[1.125rem] // 18px
          xl:text-[1.25rem]  // 20px
          leading-[1.6rem] sm:leading-[1.7rem] md:leading-[1.8rem]"
        >
          The idea for eKalakaar came from the belief that Indian performing
          arts are more than just entertainment. Inspired by the Natya Shastra,
          it was created in 2022–23 by Dr. Sanjaya Pradhan and Mr. Amit Dutta,
          with the aim to use traditional arts for communication and impact. The
          founding team brings years of experience in social change,
          livelihoods, and corporate strategy.
        </p>

        {/* Read More Button */}
        <button
          onClick={() => setIsOverlayOpen(true)}
          className="
            text-[#AD2F3B] underline font-medium mb-8
            text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]
            lg:text-[1.25rem] xl:text-[1.375rem]"
        >
          Read More
        </button>

        {/* Image Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
  {[genesis1, genesis2, genesis3].map((img, i) => (
    <div
      key={i}
      className="w-full max-w-[90vw] mx-auto 
        aspect-[4.5/3.5]        // 🔽 reduced height for mobile
        sm:aspect-[4/4.5] 
        md:aspect-[4/4.2] 
        lg:aspect-[4/4] 
        rounded-md shadow-md overflow-hidden z-10"
    >
      <img
  src={img}
  alt={`Genesis ${i + 1}`}
  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
  onClick={() => openImageModal(img, `Genesis ${i + 1}`)}
/>

    </div>
  ))}
</div>


        {/* Overlay */}
        {isOverlayOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/20 px-4 sm:px-6">
            <div className="
              bg-white w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[70rem]
              max-h-[90vh] rounded-lg shadow-2xl relative p-6 sm:p-10 overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="absolute top-6 right-6 text-gray-600 hover:text-[#AD2F3B] z-50"
              >
                <X size={28} />
              </button>

              {/* Overlay Heading */}
              <h2 className="
                text-[#AD2F3B] font-bold text-center mb-8 mt-6 uppercase
                text-[1.5rem] sm:text-[1.5rem] md:text-[1.875rem]
                lg:text-[2rem] xl:text-[2.125rem]"
              >
                The Genesis and Idea
              </h2>

              {/* Overlay Paragraphs */}
              <div className="
                text-gray-800 space-y-5 max-w-4xl mx-auto text-left
                text-[0.875rem] sm:text-[0.875rem] md:text-[1rem]
                lg:text-[1.125rem] xl:text-[1.25rem]
                leading-[1.6rem] sm:leading-[1.7rem] md:leading-[1.8rem]"
              >
                <p>
                  The idea for eKalakaar was born from the realization that while
                  performing arts have become mere entertainment today, the Natya
                  Shastra—the first treatise on Indian performing arts and often
                  called the "Fifth Veda"—envisioned it as a medium for
                  communication, education and inspiration.
                </p>
                <p>
                  India's traditional classical and folk performing arts evoke and
                  tap into the "Navrasas"–nine human emotions—including empathy,
                  joy, and reflection.
                </p>
                <p>
                  eKalakaar was ideated and conceptualised in 2022–23 by a highly
                  passionate team comprising of{' '}
                  <span className="text-[#AD2F3B] font-semibold">
                    Dr. Sanjaya Pradhan (Founder)
                  </span>{' '}
                  and{' '}
                  <span className="text-[#AD2F3B] font-semibold">
                    Mr. Amit Dutta (Co–Founder)
                  </span>
                  .
                </p>
                <p>
                  The founding team cumulatively brings over four decades of
                  experience in social impact, strategy, consulting and operations
                  experience in organisations like Tata Power, Mahindra Group,
                  NSDC, EY & KPMG, leading pioneering change initiatives in the
                  social impact sphere including Skill Development & Livelihoods,
                  Social Behaviour Change, CSR and Affirmative Action.
                </p>
              </div>
            </div>
          </div>
        )}

        {isImageModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9990] px-4 py-6">
    {/* Close Button */}
    <button
      onClick={closeImageModal}
      className="absolute top-4 right-4 sm:top-6 sm:right-6 
               bg-white text-[#AD2F3B] text-xl sm:text-2xl font-bold 
               z-[9991] w-10 h-10 rounded-full 
               flex items-center justify-center shadow-lg"
      aria-label="Close image preview"
    >
      &times;
    </button>

    {/* Image Container */}
    <div className="relative w-[90%] md:w-[80%] max-h-[80vh] flex items-center justify-center">
      <img
        src={currentImage}
        alt={currentAlt}
        className="w-full h-auto max-h-[80vh] object-contain rounded shadow-xl z-[9990]"
      />
    </div>
  </div>
)}

      </section>
    </div>
  );
};

export default GenesisSection;
