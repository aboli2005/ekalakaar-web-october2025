// import React from "react";

// const images = [
//   {
//     src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/ekphoto.png",
//     alt: "Performance 1"
//   },
//   {
//     src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/ekphoto2.png",
//     alt: "Performance 2"
//   },
//   {
//     src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/ekphoto3.png",
//     alt: "Performance 3"
//   }
// ];

// const Gallery = () => {
//   return (
//     <div className="min-h-screen py-[2.5rem] px-[1.5rem] sm:px-[2rem] md:px-[3rem] lg:px-[4rem] xl:px-[5rem]">
//       <h1 className="text-[1.25rem] sm:text-[1.625rem] md:text-[1.75rem] lg:text-[1.875rem] font-bold text-center mb-[4rem] text-[#AD2F3B]">
//         eKalakaar Performance Gallery
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] sm:gap-[2rem] md:gap-[2.5rem] max-w-[93.75rem] mx-auto">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-full h-auto object-cover rounded-xl"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import React, { useState } from 'react';

import Footer from '../../components/Footer';

const images = [
  // {
  //   src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/ekphoto.png",
  //   alt: "Performance 1"
  // },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/ekphoto2.png",
    alt: "GIZ (Bhubaneshwar)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/ekphoto3.png",
    alt: "Tata Power (Odisha)"
  }
  ,
   

  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh.jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (2).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (3).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (4).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (5).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (6).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (7).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (8).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (9).jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/mahakumbh (10) - Copy.jpg",
    alt: "Ministry of Social Justice & Empowerment (Prayagraj)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/IIT Mumbai (4).jpg",
    alt: "IIT (Mumbai)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/IIT Mumbai.jpg",
    alt: "IIT (Mumbai)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/JV by tata  power.jpg  ",
    alt: "JV by Tata Power (Odisha)"
  },
  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/JV by tata power .jpeg",
   alt: "JV by Tata Power (Odisha)"
  },


  {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/jv by tata power.jpeg",
    alt: "JV by Tata Power (Odisha)"
  },
    {
    src: "https://cdn.jsdelivr.net/gh/eKalakaar/Gallery-image/financial litteracy week.jpg",
    alt: "financial litteracy week"
  },
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImgIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
    
    <div className="min-h-screen py-[2.5rem] px-[1.5rem] sm:px-[2rem] md:px-[3rem] lg:px-[4rem] xl:px-[5rem]">
<h1 className="text-[1.5rem] sm:text-[1.875rem] md:text-[2.125rem] lg:text-[2.125rem] font-bold text-start mb-[3rem] text-[#AD2F3B] ">
  eKalakaar Gallery
</h1>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] sm:gap-[2rem] md:gap-[2.5rem] max-w-[93.75rem] mx-auto">
        {images.map((image, index) => (
         // Inside the .map() return — BELOW each image
<div
  key={index}
  onClick={() => openModal(index)}
  className="cursor-pointer hover:scale-105 transition-transform duration-300"
>
  <div className="overflow-hidden rounded-xl shadow-md h-[200px]">
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-full object-cover rounded-xl"
    />
  </div>

  {/* Plain event name text without card styling */}
  <p className="mt-2 text-center text-[#AD2F3B] font-semibold text-base">
    {image.alt}
  </p>
</div>


        ))}
      </div>

{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-[9990] px-4 py-6">
    
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

    {/* Event name ABOVE image, not overlapping */}
    <div className="mb-4 text-white text-lg sm:text-xl font-semibold z-[9992] text-center">
      {images[currentImgIndex].alt}
    </div>

    {/* Image Container with Arrows */}
    <div className="relative w-[90%] md:w-[80%] max-h-[80vh] flex items-center justify-center">
      
      {/* Left Arrow */}
      <button
        onClick={prevImage}
        className="absolute left-[-2.5rem] sm:left-[-3rem] text-white text-[2rem] font-bold z-[9991]"
        aria-label="Previous image"
      >
        &#10094;
      </button>

      {/* Image */}
      <img
        src={images[currentImgIndex].src}
        alt={images[currentImgIndex].alt}
        className="w-full h-auto max-h-[80vh] object-contain rounded shadow-xl z-[9990]"
      />

      {/* Right Arrow */}
      <button
        onClick={nextImage}
        className="absolute right-[-2.5rem] sm:right-[-3rem] text-white text-[2rem] font-bold z-[9991]"
        aria-label="Next image"
      >
        &#10095;
      </button>
    </div>
  </div>
)}

    </div>

    <Footer/>
    </>
  );
};

export default Gallery;
