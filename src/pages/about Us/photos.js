// import React, { useState } from 'react';

// const Photos = ({ image, title, details, post }) => {
//   const [showOverlay, setShowOverlay] = useState(false);

//   return (
//     <div className="m-4">
//       {/* Card */}
//       <div
//         className="cursor-pointer transition w-[350px] max-w-full"
//         onClick={() => setShowOverlay(true)}
//       >
//         {/* Image with border only */}
//         <img
//           src={image}
//           alt={title}
//           className="w-[350px] h-[400px] sm:w-[325px] sm:h-[400px] object-cover rounded-[20px] border-4 border-[#AD2F3B] max-[440px]:mx-auto
//            max-[440px]:w-[250px] max-[440px]:h-[310px]"
//         />

//         {/* Name (title) */}
//         <h3 className="mt-[30px] text-[28px] font-bold text-[#AD2F3B] text-center max-[440px]:text-[16px] max-[440px]:mt-[15px]">
//           {title}
//         </h3>
// <p className="mt-0 text-[22px] font-medium text-gray-700 text-center h-[60px] max-[440px]:text-[14px] max-[440px]:!mt-[10px] max-[440px]:h-[30px]">
//   {post}
// </p>

//       </div>

//       {/* Overlay */}
//      {showOverlay && (
//   <div className="fixed inset-0 z-50  backdrop-blur-sm bg-opacity-5 flex items-center justify-center p-4">
//     {/* Close Button */}
//     <button
//       className="absolute top-6 right-6 sm:top-[90px] sm:right-[250px] w-[45px] h-[45px] bg-[#800000] text-white rounded-full flex items-center justify-center text-xl font-bold 
//       max-[440px]:top-4 max-[440px]:right-4 max-[440px]:w-[35px] max-[440px]:h-[35px] max-[440px]:text-lg"
//       onClick={() => setShowOverlay(false)}
//     >
//       ✕
//     </button>

//     {/* Overlay Container */}
//     <div className="bg-[#FDF6EE] w-full max-w-[1000px] h-auto sm:h-[600px] flex flex-col sm:flex-row p-6 sm:pl-[100px] sm:pr-[100px] shadow-lg border-4 rounded-[10px] border-[#AD2F3B] overflow-auto
//       max-[440px]:p-3 max-[440px]:rounded-[8px]">
      
//       {/* Left - Image */}
//       <div className="flex justify-center items-center mb-6 sm:mb-0 sm:mr-8">
//         <img
//           src={image}
//           alt={title}
//           className="w-[400px] sm:w-[450px] h-[300px] sm:h-[400px] object-cover 
//           max-[440px]:w-[200px] max-[440px]:h-[240px]"
//         />
//       </div>

//       {/* Right - Content */}
//       <div className="flex flex-col justify-center w-full sm:w-[900px] 
//         max-[440px]:items-center max-[440px]:text-center">
//         <h2 className="text-[24px] sm:text-[30px] font-bold text-[#AD2F3B] mb-3 
//           max-[440px]:text-[18px]">
//           {title}
//         </h2>
//         <p className="text-[20px] sm:text-[22px] font-semibold text-gray-700 mb-2 
//           max-[440px]:text-[14px]">
//           {post}
//         </p>
//         <p className="text-gray-700 text-[16px] sm:text-[18px] 
//           max-[440px]:text-[12px]">
//           {details}
//         </p>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default Photos;

import React, { useState } from 'react';

const Photos = ({ image, title, details, post }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-[18rem] sm:max-w-[16rem] md:max-w-[15rem] lg:max-w-[16rem] xl:max-w-[17rem] transition-all">
      {/* Card */}
      <div
        className="cursor-pointer w-full h-[28rem] "
        onClick={() => setShowOverlay(true)}
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full aspect-[3/4] object-cover rounded-[1.25rem] border-[0.25rem] border-[#AD2F3B]"
        />
        <div>
          {/* Name */}
          <h3 className="mt-[0.75rem] text-[1.125rem] sm:text-[1.25rem] md:text-[1.375rem] font-bold text-[#AD2F3B] text-center">
            {title}
          </h3>

          {/* Post */}
          <p className="text-[0.875rem] sm:text-[0.9375rem] md:text-[1rem] font-medium text-gray-700 text-center mt-[0.25rem]">
            {post}
          </p>
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-opacity-5 flex items-center justify-center p-4 overflow-auto">
          <div className="relative w-full max-w-[90vw] md:max-w-[60vw] mx-auto">
            {/* Close Button */}
            <button
              className="absolute -top-5 -right-5 w-10 h-10 bg-[#800000] text-white rounded-full flex items-center justify-center text-lg font-bold z-50 hover:bg-[#AD2F3B] transition-colors shadow-lg border-2 border-[#AD2F3B]"
              onClick={() => setShowOverlay(false)}
              aria-label="Close overlay"
            >
              ✕
            </button>

            {/* Overlay Box - Responsive layout */}
            <div className="bg-[#FDF6EE] h-auto max-h-[90vh] flex flex-col lg:flex-row p-6 shadow-lg border-4 rounded-lg border-[#AD2F3B] overflow-auto">
              {/* Image - Left side on laptop */}
              <div className="flex justify-center lg:justify-start items-start mb-6 lg:mb-0 lg:mr-8 lg:w-[40%] ">
                <img
                  src={image}
                  alt={title}
                  className="w-full max-w-[250px] lg:max-w-[300px] h-auto object-contain lg:self-center"
                />
              </div>

              {/* Text - Right side on laptop */}
              <div className="flex-1 flex flex-col justify-start overflow-auto lg:text-left sm:text-center">
                <h2 className="text-2xl font-bold text-[#AD2F3B] mb-3">
                  {title}
                </h2>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  {post}
                </p>
                <div className="text-gray-700 text-base leading-relaxed space-y-4">
                  {details.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
