// import { useState, useEffect } from "react";
// import wallpaper from "../assets/wallpaper.png";
// import { useNavigate } from "react-router-dom";

// import ap1 from "../assets/hero section artist/3.png";
// import ap2 from "../assets/hero section artist/2.png";
// import ap3 from "../assets/hero section artist/13.png";
// import ap4 from "../assets/hero section artist/1.png";
// import ap5 from "../assets/hero section artist/artist wala.png";

// import bp1 from "../assets/hero section book performance/Kathakali_All_Characters.jpg";
// import bp2 from "../assets/hero section book performance/Untitled design (13).png";
// import bp3 from "../assets/hero section book performance/photo_24_2025-04-25_09-16-33.jpg";
// import bp4 from "../assets/hero section book performance/book performance wala.png";
// import bp5 from "../assets/hero section book performance/17.png";

// import ScrollToHashElement from "../pages/ScrollToHashElement";

// const imagesLeft = [bp1, bp2, bp3, bp4, bp5];
// const imagesRight = [ap1, ap2, ap3, ap4, ap5];

// const HeroSection = () => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isTextLeft, setIsTextLeft] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const images = isTextLeft ? imagesLeft : imagesRight;
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => {
//         const next = prev + 1;
//         if (next >= images.length) {
//           setIsTextLeft((prevLayout) => !prevLayout);
//           return 0;
//         }
//         return next;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isTextLeft]);

//   const handleToggle = () => setIsTextLeft((prev) => !prev);

//   const textContent = isTextLeft
//     ? {
//         title: "Create unique, bespoke and meaningful experiences !",
//         subtitle:
//           "Achieve business and social goals through curated traditional performing arts for your business or social events, conferences and outreach campaigns.",
//         buttonText: "Book Performance",
//       }
//     : {
//         title: 'Bringing "Naam, Kaam, Daam" to the artists',
//         subtitle:
//           "Exclusive platform for India's traditional performing artists- including classical, folk, and fusion singers, dancers, musicians, and theatre artists.",
//         buttonText: "Artists Registration",
//       };

//   const getStyledTitle = (title) => {
//     const targetWord = "";
//     const parts = title.split(new RegExp(`(${targetWord})`, "i"));
//     return (
//       <>
//         {parts.map((part, index) =>
//           part.toLowerCase() === targetWord.toLowerCase() ? (
//             <span key={index} className="italic">
//               {part}
//             </span>
//           ) : (
//             <span key={index}>{part}</span>
//           )
//         )}
//       </>
//     );
//   };

//   return (
//     <section
//       id="home"
//       className="w-full flex items-center justify-center border-b border-[#AD2F3B] relative overflow-hidden pt-[1.875rem] pb-[1.875rem]"
//       style={{
//         background: "linear-gradient(180deg, #FAECEE 40%, #FFFFFF 57%, #F8E3E5 100%)",
//       }}
//     >
//       <ScrollToHashElement />

//       {/* Mandala Backgrounds */}
//       <img
//         src={wallpaper}
//         alt="Mandala Top Right"
//         className="absolute top-[-190px] right-[-190px] w-[470px] h-[470px] opacity-50 pointer-events-none z-0 max-[440px]:hidden"
//       />
//       <img
//         src={wallpaper}
//         alt="Mandala Bottom Left"
//         className="absolute bottom-[-190px] left-[-190px] w-[470px] h-[470px] opacity-50 pointer-events-none z-0 max-[440px]:hidden"
//       />

//       {/* Arrows */}
//       <button
//         onClick={() => setIsTextLeft((prev) => !prev)}
//         className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-[3.4rem] font-light z-20 hover:scale-110 transition"
//       >
//         &#8249;
//       </button>
//       <button
//         onClick={() => setIsTextLeft((prev) => !prev)}
//         className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-[3.4rem] font-light z-20 hover:scale-110 transition"
//       >
//         &#8250;
//       </button>

//       {/* Main Content */}
//       <div className="max-w-7xl px-6 sm:px-[8rem] lg:px-10 relative z-10">
//        <div
//   className={`flex flex-col lg:flex-row ${
//     isTextLeft ? "lg:flex-row-reverse" : "lg:flex-row"
//   } items-center justify-between w-full gap-10 lg:gap-[2.5rem] h-full`}
// >
//   {/* Image */}
//   <div className="w-full lg:w-1/2 flex justify-center items-center py-2">
//     <div className="
//       w-[18rem] h-[16rem]
//       sm:w-[22rem] sm:h-[18rem]
//       md:w-[28rem] md:h-[24rem]
//       lg:w-[32rem] lg:h-[28rem]
//       xl:w-[36rem] xl:h-[31rem]
//       rounded-md overflow-hidden
//     ">
//       <img
//         src={isTextLeft ? imagesLeft[currentImage] : imagesRight[currentImage]}
//         alt="Performance"
//         className="w-full h-full object-cover transition-all duration-700 ease-in-out"
//       />
//     </div>
//   </div>

//   {/* Text */}
//   <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-[1.5rem]">
//    <h1 className="text-[#AD2F3B] font-bold leading-tight
//   text-[1.75rem]        // 28px
//   md:text-[2.1rem]     // 36px (tablet)
//   lg:text-[2.1rem]     // 36px (laptop)
//   xl:text-[2.2rem]      // 40px (laptop-l)
// ">
//   {getStyledTitle(textContent.title)}
// </h1>


//     <p className="text-gray-800 leading-relaxed 
//       text-[1.125rem]   // 18px
//       md:text-[1.25rem] // 20px on tablet
//       lg:text-[1.25rem] // 20px on laptop
//     ">
//       {textContent.subtitle}
//     </p>

// <button
//   onClick={() => navigate(isTextLeft ? "/book-performance" : "/login")}
//   className="bg-[#AD2F3B] text-white font-medium 
//     text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] 
//     rounded-full transition duration-300 
//     hover:shadow-[0_6px_10px_rgba(0,0,0,0.25)] 
//     px-6 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 
//     max-[440px]:self-start"
// >
//   {textContent.buttonText}
// </button>

//   </div>
// </div>

//       </div>

//       {/* Indicator Dots */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
//         <div
//           onClick={() => {
//             setIsTextLeft(true);
//             setCurrentImage(0);
//           }}
//           className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
//             isTextLeft ? "bg-[#AD2F3B] border-[#AD2F3B]" : "bg-transparent border-gray-400"
//           }`}
//         ></div>
//         <div
//           onClick={() => {
//             setIsTextLeft(false);
//             setCurrentImage(0);
//           }}
//           className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
//             !isTextLeft ? "bg-[#AD2F3B] border-[#AD2F3B]" : "bg-transparent border-gray-400"
//           }`}
//         ></div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



import { useState, useEffect } from "react";
import wallpaper from "../assets/wallpaper.png";
import { useNavigate } from "react-router-dom";

import ap1 from "../assets/hero section artist/3.png";
import ap2 from "../assets/hero section artist/2.png";
import ap3 from "../assets/hero section artist/13.png";
import ap4 from "../assets/hero section artist/1.png";
import ap5 from "../assets/hero section artist/artist wala.png";

import bp1 from "../assets/hero section book performance/Kathakali_All_Characters.jpg";
import bp2 from "../assets/hero section book performance/Untitled design (13).png";
import bp3 from "../assets/hero section book performance/photo_24_2025-04-25_09-16-33.jpg";
import bp4 from "../assets/hero section book performance/book performance wala.png";
import bp5 from "../assets/hero section book performance/17.png";

import ScrollToHashElement from "../pages/ScrollToHashElement";

const imagesLeft = [bp1, bp2, bp3, bp4, bp5];
const imagesRight = [ap1, ap2, ap3, ap4, ap5];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTextLeft, setIsTextLeft] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const images = isTextLeft ? imagesLeft : imagesRight;
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const next = prev + 1;
        if (next >= images.length) {
          setIsTextLeft((prevLayout) => !prevLayout);
          return 0;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isTextLeft]);

  const textContent = isTextLeft
    ? {
        title: "Create unique, bespoke and meaningful experiences !",
        subtitle:
          "Achieve business and social goals through curated traditional performing arts for your business or social events, conferences and outreach campaigns.",
        buttonText: "Book Performance",
      }
    : {
        title: 'Bringing "Naam, Kaam, Daam" to the artists',
        subtitle:
          "Exclusive platform for India's traditional performing artists- including classical, folk, and fusion singers, dancers, musicians, and theatre artists.",
        buttonText: "Artists Registration",
      };

  const getStyledTitle = (title) => {
    const targetWord = "";
    const parts = title.split(new RegExp(`(${targetWord})`, "i"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === targetWord.toLowerCase() ? (
            <span key={index} className="italic">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <section
      id="home"
      className="w-full flex items-center justify-center border-b border-[#AD2F3B] relative overflow-hidden pt-[1.875rem] pb-[1.875rem]"
      style={{
        background: "linear-gradient(180deg, #FAECEE 40%, #FFFFFF 57%, #F8E3E5 100%)",
      }}
    >
      <ScrollToHashElement />

      {/* Mandala Backgrounds */}
      <img
        src={wallpaper}
        alt="Mandala Top Right"
        className="absolute top-[-190px] right-[-190px] w-[470px] h-[470px] opacity-50 pointer-events-none z-0 max-[440px]:hidden"
      />
      <img
        src={wallpaper}
        alt="Mandala Bottom Left"
        className="absolute bottom-[-190px] left-[-190px] w-[470px] h-[470px] opacity-50 pointer-events-none z-0 max-[440px]:hidden"
      />

      {/* Arrows */}
      <button
        onClick={() => setIsTextLeft((prev) => !prev)}
        className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-[3.4rem] font-light z-20 hover:scale-110 transition"
      >
        &#8249;
      </button>
      <button
        onClick={() => setIsTextLeft((prev) => !prev)}
        className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-[3.4rem] font-light z-20 hover:scale-110 transition"
      >
        &#8250;
      </button>

      {/* Main Content */}
      <div className="max-w-7xl px-6 sm:px-[8rem] lg:px-10 relative z-10">
        <div
          className={`flex flex-col lg:flex-row ${
            isTextLeft ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center justify-between w-full gap-10 lg:gap-[2.5rem] h-full`}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center py-2">
            <div className="
              w-[18rem] h-[16rem]
              sm:w-[22rem] sm:h-[18rem]
              md:w-[32rem] md:h-[26rem]
              lg:w-[32rem] lg:h-[27.5rem]
              xl:w-[36rem] xl:h-[30.5rem]
              rounded-md overflow-hidden
            ">
              <img
                src={isTextLeft ? imagesLeft[currentImage] : imagesRight[currentImage]}
                alt="Performance"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-[1.5rem] md:gap-[2rem]">
            <h1 className="text-[#AD2F3B] font-bold leading-tight
              text-[1.75rem]
              md:text-[2.1rem]
              lg:text-[2.1rem]
              xl:text-[2.2rem]
            ">
              {getStyledTitle(textContent.title)}
            </h1>

            <p className="text-gray-800 leading-relaxed 
              text-[1.125rem]
              md:text-[1.25rem]
              lg:text-[1.25rem]
            ">
              {textContent.subtitle}
            </p>

            <button
  onClick={() => navigate(isTextLeft ? "/book-performance" : "/login")}
  className="bg-[#AD2F3B] text-white font-medium 
    text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] 
    rounded-full transition duration-300 
    hover:shadow-[0_6px_10px_rgba(0,0,0,0.25)] 
    px-6 py-2 sm:px-7 sm:py-2.5 md:px-8 md:py-3 
    self-center md:mb-10 mb-4"
>
  {textContent.buttonText}
</button>

          </div>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-3 lg:mt-2 mt-0 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 md:bottom-3  ">
        <div
          onClick={() => {
            setIsTextLeft(true);
            setCurrentImage(0);
          }}
          className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
            isTextLeft ? "bg-[#AD2F3B] border-[#AD2F3B]" : "bg-transparent border-gray-400"
          }`}
        ></div>
        <div
          onClick={() => {
            setIsTextLeft(false);
            setCurrentImage(0);
          }}
          className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
            !isTextLeft ? "bg-[#AD2F3B] border-[#AD2F3B]" : "bg-transparent border-gray-400"
          }`}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
