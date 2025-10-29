// import React from 'react';
// import { Link } from 'react-router-dom';
// import media1 from '../assets/media/media1.jpeg';
// import media2 from '../assets/media/media2.jpeg';
// import media3 from '../assets/media/media3.jpeg';
// import mandala from '../assets/wallpaper.png';
// import ScrollToHashElement from '../pages/ScrollToHashElement';

// const Media = () => {
//   return (
//     <section id="media" className="relative bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-hidden font-[Poppins]">
//       <ScrollToHashElement />
      
//       {/* Mandala Backgrounds */}
//       <div className="hidden md:block">
//         {['top-[-9.375rem] right-[-9.375rem]', 'top-[-9.375rem] left-[-9.375rem]', 
//           'bottom-[-9.375rem] right-[-9.375rem]', 'bottom-[-9.375rem] left-[-9.375rem]'].map((pos, i) => (
//           <img
//             key={i}
//             src={mandala}
//             alt="Mandala"
//             className={`absolute z-0 opacity-70 w-[18.75rem] md:w-[25rem] lg:w-[31.25rem] ${pos}`}
//           />
//         ))}
//       </div>

//       {/* Section Heading */}
//       <div className="text-center mb-8 md:mb-12 ">
//         <h2 className="text-[#AD2F3B] font-bold underline decoration-[#AD2F3B] decoration-2 underline-offset-[0.5rem]
//           text-[1.75rem] md:text-[2rem] lg:text-[2.125rem] xl:text-[2.25rem] uppercase pb-10">
//           MEDIA SPOTLIGHT
//         </h2>
//         {/* <div className="w-[12.5rem] h-[0.125rem] bg-[#AD2F3B] mx-auto mt-2 rounded-full max-[440px]:w-[9.375rem]"></div> */}
//       </div>

//       {/* Media Cards - Responsive Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
//         {[
//           { title: "Gallery", image: media3, link: "", btn: "All Gallery" },
//           { title: "News Updates", image: media1, link: "", btn: "All News" },
//           { title: "Blogs", image: media2, link: "/blog", btn: "All Blogs" },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="w-full max-w-[19.875rem] sm:max-w-[21.875rem] border-2 border-[#AD2F3B] rounded-lg overflow-hidden shadow-md flex flex-col h-[27.125rem] mx-auto sm:h-[29.25rem]"
//           >
//             {/* Card Header */}
//             <h3 className="text-center font-semibold bg-gradient-to-r from-[#fff] to-[#f9dada] 
//               text-[1.125rem] md:text-[1.25rem] py-2">
//               {item.title}
//             </h3>
            
//             {/* Image Container - Takes all available space */}
//             <div className="flex-1 min-h-0 relative">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className=" w-full h-full object-cover"
//               />
//             </div>
            
//             {/* Card Footer */}
//             <Link
//               to={item.link}
//               className="bg-[#AD2F3B] text-white text-center py-2 px-4 no-underline 
//                 transition-colors duration-300 hover:bg-white hover:text-[#AD2F3B] border-t-2 border-[#AD2F3B]
//                 text-[1rem]"
//             >
//               {item.btn} &nbsp; →
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Media;


import React from 'react';
import { Link } from 'react-router-dom';
import media1 from '../assets/media/media1.jpeg';
import media2 from '../assets/media/media2.jpeg';
import media3 from '../assets/media/media3.jpeg';
import mandala from '../assets/wallpaper.png';
import ScrollToHashElement from '../pages/ScrollToHashElement';

const Media = () => {
  return (
    <section id="media" className="relative z-0 bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-hidden font-[Poppins]">
      <ScrollToHashElement />

      {/* Mandala Backgrounds */}
      <div className='hidden sm:block'>
      <div className="absolute inset-0 z-[-1] pointer-events-none">
            {/* Top Right */}
<img
  src={mandala}
  alt="Mandala Top Right"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-12.5rem] 
    right-[-5rem] md:right-[-7rem] lg:right-[-6rem] xl:right-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Top Left */}
<img
  src={mandala}
  alt="Mandala Top Left"
  className="absolute 
    top-[-6rem] md:top-[-7rem] lg:top-[-9rem] xl:top-[-12.5rem] 
    left-[-5rem] md:left-[-7rem] lg:left-[-6rem] xl:left-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Bottom Right */}
<img
  src={mandala}
  alt="Mandala Bottom Right"
  className="absolute 
    bottom-[-9vw] md:bottom-[-7rem] lg:bottom-[-10rem] xl:bottom-[-12.5rem] 
    right-[-6vw] md:right-[-8rem] lg:right-[-6rem] xl:right-[-7rem]
    w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Bottom Left */}
<img
  src={mandala}
  alt="Mandala Bottom Left"
  className="absolute 
    bottom-[-9vw] md:bottom-[-7rem] lg:bottom-[-10rem] xl:bottom-[-12.5rem] 
    left-[-6vw] md:left-[-8rem] lg:left-[-6rem] xl:left-[-7rem]
    w-[18vw] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

      </div>
</div>
      {/* Section Heading */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-[#AD2F3B] font-bold underline decoration-[#AD2F3B] decoration-2  underline-offset-[0.5rem] md:underline-offset-[0.7rem]
          text-[1.25rem] sm:text-[2rem] md:text-[2.125rem] lg:text-[2.14rem] xl:text-[2.25rem] uppercase pb-10">
          MEDIA SPOTLIGHT
        </h2>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 max-w-7xl mx-auto place-items-center">
        {[
          { title: "Gallery", image: media3, link: "", btn: "All Gallery" },
          { title: "News Updates", image: media1, link: "", btn: "All News" },
          { title: "Blogs", image: media2, link: "/blog", btn: "All Blogs" },
        ].map((item, index) => (
          <div
  key={index}
  className={`
    w-full 
    max-w-[19.875rem] sm:max-w-[21.875rem] md:max-w-[20rem] lg:max-w-[21.875rem]
    border-2 border-[#AD2F3B] rounded-lg overflow-hidden shadow-md 
    flex flex-col justify-between h-[27.125rem] sm:h-[29.25rem] md:h-[27.5rem] mx-auto
    ${index === 2 ? 'md:col-span-2 md:justify-self-center lg:col-span-1 lg:justify-self-auto' : ''}
  `}
>
  {/* Top Content: Heading + Image */}
  <div className="flex flex-col">
    <h3 className="text-center font-semibold bg-gradient-to-r from-[#fff] to-[#f9dada] 
      text-[1.125rem] md:text-[1.25rem] py-2 m-0 leading-tight">
      {item.title}
    </h3>

    <div className="relative">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[22rem] sm:h-[22rem] md:h-[22.1rem] lg:h-[22.2rem] object-cover"
      />
    </div>
  </div>

  {/* Footer Button */}
  <Link
    to={item.link}
    className="bg-[#AD2F3B] text-white text-center py-2 px-4 no-underline 
      transition-colors duration-300 hover:bg-white hover:text-[#AD2F3B] border-t-2 border-[#AD2F3B]
      text-[1rem]"
  >
    {item.btn} &nbsp; →
  </Link>
</div>

        ))}
      </div>
    </section>
  );
};

export default Media;
