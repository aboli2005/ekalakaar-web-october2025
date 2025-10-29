import React from "react";

// Carousel Images
import award1 from "../../assets/carousal/c4.jpg";
import award2 from "../../assets/carousal/c3.jpg";
import award3 from "../../assets/carousal/c8.jpg";
import award4 from "../../assets/carousal/c5.png";
import award5 from "../../assets/carousal/c1.png";
import award6 from "../../assets/carousal/c6.jpg";
import award7 from "../../assets/carousal/c7.png";
import award8 from "../../assets/carousal/c2.png";

const awards = [
  { image: award1, title: "Industry Innovation Partner", description: "Industry Innovation partner." },
  { image: award2, title: "HERCEL", description: "NSRCEL- IIM Bangalore's impact orbit." },
  { image: award3, title: "WADIWANI", description: "Lift-off Program" },
  { image: award4, title: "XML Bootcamp", description: "XIM bootcamp" },
  { image: award5, title: "Digital Pioneer", description: "A recognised startup under DPIIT, GOI." },
  { image: award6, title: "Cultural Ambassador", description: "Finalist in the Prajjawala Challenge Award by the Ministry of Rular Development, Government of India." },
  { image: award7, title: "Tech for Good", description: "Recognized as a pioneering start-up by Logical Indian, a leading media publication." },
  { image: award8, title: "Heritage Guardian", description: "Honoured with an Award of Excellence by the Hon'ble Governor of Maharashtra, in 2023." },
];

const AwardsCarousel = () => {
  return (
    <div
      className="w-full max-w-[440px] mb-10 md:mb-0 md:max-w-none  border-t-2 border-b-2 border-[#AD2F3B] py-6 md:py-12 relative mx-auto"
      style={{
        background: "linear-gradient(180deg, #FAECEE 40%, #FFFFFF 57%, #F8E3E5 100%)",
      }}
    >
      {/* Section Heading */}
      <h2 className="
        text-[1.5rem] sm:text-[1.5rem] md:text-[1.875rem]
        lg:text-[2rem] xl:text-[2.125rem] 2xl:text-[2.25rem]
        font-bold text-[#AD2F3B] mb-6 md:mb-12 text-center px-4
      ">
        AWARDS AND RECOGNITION
      </h2>

      {/* Carousel */}
      <div className="relative w-full pb-8 overflow-hidden">
        <div className="flex w-max whitespace-nowrap gap-4 md:gap-8 animate-scroll hover:pause-animation">
          {[...awards, ...awards].map((award, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[220px] lg:w-[250px] flex flex-col items-center px-2"
            >
              {/* Image */}
              <div className="h-[70px] sm:h-[90px] md:h-[110px] lg:h-[120px] w-full flex items-center justify-center mb-3 md:mb-6 lg:mb-8">
                <img
                  src={award.image}
                  alt={award.title}
                  className="max-h-[70px] sm:max-h-[90px] md:max-h-[110px] lg:max-h-[120px] max-w-[130px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] object-contain"
                />
              </div>

              {/* Description */}
              <div className="w-[140px] sm:w-[160px] md:w-[190px] lg:w-[220px] min-h-[40px] sm:min-h-[50px] md:min-h-[60px] flex items-center justify-center text-center">
                <p className="
                  text-[0.75rem] sm:text-[0.75rem] md:text-[0.875rem]
                  lg:text-[1rem] xl:text-[1.125rem]
                  font-semibold text-gray-700 whitespace-normal break-words
                ">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx="true">{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AwardsCarousel;
