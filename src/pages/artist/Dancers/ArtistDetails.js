// import React, { useState } from 'react';
// import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
// import Footer from '../../../components/Footer';
// import mandala from '../../../assets/wallpaper.png';

// const ArtistDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const artist = location.state?.artist;
//   const artistList = location.state?.artistList || [];

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImgIndex, setCurrentImgIndex] = useState(0);

//   const openModal = (index) => {
//     setCurrentImgIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const prevImage = () => {
//     setCurrentImgIndex((prevIndex) => (prevIndex === 0 ? performances.length - 1 : prevIndex - 1));
//   };

//   const nextImage = () => {
//     setCurrentImgIndex((prevIndex) => (prevIndex === performances.length - 1 ? 0 : prevIndex + 1));
//   };

//   if (!artist) {
//     return (
//       <div className="p-10 text-center text-red-600">
//         Artist not found. <button onClick={() => navigate(-1)}>Go back</button>
//       </div>
//     );
//   }

//   // Determine the category based on the referrer
// const referrer = location.state?.referrer || '';

//   const isFromSingers = referrer.includes('singers');
//   const isFromDancers = referrer.includes('dancers');
//   const isFromMusicians = referrer.includes('musicians');
//   const isFromTheatre = referrer.includes('theatre');

//   const { name, city, image, description, performances, about } = artist;

//   const currentIndex = artistList.findIndex((a) => a.name === artist.name);

//   const handleNavigation = (direction) => {
//     const nextIndex = direction === 'next'
//       ? (currentIndex + 1) % artistList.length
//       : (currentIndex - 1 + artistList.length) % artistList.length;

//     const nextArtist = artistList[nextIndex];

//     navigate(`/artist/${nextArtist.name.replace(/\s+/g, '-').toLowerCase()}`, {
//       state: {
//         artist: nextArtist,
//         artistList,
//         referrer
//       }
//     });
//   };

//   return (
//     <>
//       <div className="relative px-6 md:px-20 py-14 font-sans text-gray-900 overflow-hidden bg-white z-0">
//         <div className="hidden sm:block">
//           <img src={mandala} alt="Mandala top right" className="absolute top-[-300px] right-[-200px] w-[600px] opacity-[0.7] z-[-10]" />
//           <img src={mandala} alt="Mandala bottom left" className="absolute bottom-[-300px] left-[-200px] w-[600px] opacity-[0.7] z-[-10]" />
//           <img src={mandala} alt="Mandala bottom right" className="absolute bottom-[-300px] right-[-200px] w-[600px] opacity-[0.7] z-[-10]" />
//         </div>

//         {/* Breadcrumbs */}
//         <p className="text-[24px] max-[440px]:text-[14px] max-[440px]:mt-[-30px] max-[440px]:mb-[-30px] font-medium mb-6">
//   <Link to="/#artists" className="text-gray-800 hover:underline no-underline">Home</Link>
//   {referrer && isFromSingers && <> / <Link to="/artist-singers" className="text-[#AD2F3B] no-underline hover:underline">Singers</Link></>}
//   {referrer && isFromDancers && <> / <Link to="/artist-dancers" className="text-[#AD2F3B] no-underline hover:underline">Dancers</Link></>}
//   {referrer && isFromMusicians && <> / <Link to="/artist-musicians" className="text-[#AD2F3B] no-underline hover:underline">Musicians</Link></>}
//   {referrer && isFromTheatre && <> / <Link to="/artist-theatre" className="text-[#AD2F3B] no-underline hover:underline">Theatre</Link></>}
//   {' / '}
//   <span className="text-[#AD2F3B]">{name}</span>
// </p>


//         {/* Artist Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16 mb-16">
//           <img src={image} alt={name} className="w-full h-[500px] max-[440px]:h-[280px] object-cover shadow" />
//           <div>
//             <h2 className="text-[32px] max-[440px]:text-[24px] font-bold text-[#AD2F3B] mb-2 mt-2">{name}</h2>
//             <p className="text-gray-800 mb-4 flex items-center gap-1 max-[440px]:text-[16px] text-[22px]">
//               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" stroke="black" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
//               </svg>
//               {city}
//             </p>
//             <p className="text-gray-800 text-[22px] max-[440px]:text-[16px] font-bold mb-6">{about || 'Experience info not available'}</p>
//             <p className="text-[20px] max-[440px]:text-[14px] max-[440px]:font-medium max-[440px]:mb-[-30px] text-gray-800 max-[440px]:leading-5 leading-7 mb-6"
//               dangerouslySetInnerHTML={{ __html: description }} />
//           </div>
//         </div>


//         {/* Gallery */}
//         {/* Gallery */}
// <h3 className="text-[32px] font-bold text-[#AD2F3B] max-[440px]:text-[24px] z-90 mb-8">Gallery</h3>
// {performances && performances.length > 0 && (
//   <div className="flex flex-wrap gap-16 max-[440px]:gap-8 max-[440px]:mb-[-5px] mb-16 z-90
//                   ml-20 max-[440px]:ml-0 max-[440px]:justify-center justify-start">
//     {performances.map((imgSrc, i) => (
//       <div
//         key={i}
//         className="w-[350px] h-[350px] bg-gray-300 rounded shadow cursor-pointer"
//         onClick={() => openModal(i)}
//       >
//         <img src={imgSrc} alt={`Performance ${i + 1}`} className="w-full h-full object-cover rounded" />
//       </div>
//     ))}
//   </div>
// )}


//         {/* Modal Overlay */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
//             <button onClick={closeModal} className="absolute top-4 right-4 text-white text-3xl font-bold z-[10000]">&times;</button>
//             <button onClick={prevImage} className="absolute left-6 text-white text-4xl font-bold z-[10000]">&#10094;</button>
//             <img src={performances[currentImgIndex]} alt="Gallery" className="max-h-[80vh] max-w-[90vw] object-contain rounded shadow-xl z-[9999]" />
//             <button onClick={nextImage} className="absolute right-6 text-white text-4xl font-bold z-[10000]">&#10095;</button>
//           </div>
//         )}


//                 {/* Navigation Buttons */}
// {artistList.length > 1 && (
// <div className="w-full flex justify-center mt-10">
//   <div className="flex gap-6">
//     {/* Prev Button */}
//     <button
//       onClick={() => handleNavigation('prev')}
//       className="bg-[#AD2F3B] text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow hover:scale-110 transition-transform"
//       aria-label="Previous"
//     >
//       ‹
//     </button>

//     {/* Next Button */}
//     <button
//       onClick={() => handleNavigation('next')}
//       className="bg-[#AD2F3B] text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow hover:scale-110 transition-transform"
//       aria-label="Next"
//     >
//       ›
//     </button>
//   </div>
// </div>

// )}

//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ArtistDetail;


import React, { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import mandala from '../../../assets/wallpaper.png';

const ArtistDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const artist = location.state?.artist;
  const artistList = location.state?.artistList || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImgIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex === 0 ? performances.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex === performances.length - 1 ? 0 : prevIndex + 1));
  };

  if (!artist) {
    return (
      <div className="p-[2.5rem] text-center text-red-600">
        Artist not found. <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const referrer = location.state?.referrer || '';
  const isFromSingers = referrer.includes('singers');
  const isFromDancers = referrer.includes('dancers');
  const isFromMusicians = referrer.includes('musicians');
  const isFromTheatre = referrer.includes('theatre');

  const { name, city, image, description, performances, about } = artist;
  const currentIndex = artistList.findIndex((a) => a.name === artist.name);

  const handleNavigation = (direction) => {
    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % artistList.length
      : (currentIndex - 1 + artistList.length) % artistList.length;

    const nextArtist = artistList[nextIndex];
    navigate(`/artist/${nextArtist.name.replace(/\s+/g, '-').toLowerCase()}`, {
      state: {
        artist: nextArtist,
        artistList,
        referrer
      }
    });
  };

  return (
    <>
      <div className="relative px-[1.5rem] sm:px-[2rem] md:px-[3rem] lg:px-[4rem] xl:px-[5rem] py-[3.5rem] font-sans text-gray-900 overflow-hidden bg-white z-0">
        {/* Background Mandalas */}
        <div className="hidden sm:block">
          <img
            src={mandala}
            alt="Mandala top right"
            className="absolute top-[-18.75rem] right-[-12.5rem] w-[37.5rem] opacity-[0.7] z-[-10]"
          />
          <img
            src={mandala}
            alt="Mandala bottom left"
            className="absolute bottom-[-18.75rem] left-[-12.5rem] w-[37.5rem] opacity-[0.7] z-[-10]"
          />
          <img
            src={mandala}
            alt="Mandala bottom right"
            className="absolute bottom-[-18.75rem] right-[-12.5rem] w-[37.5rem] opacity-[0.7] z-[-10]"
          />
        </div>

        {/* Breadcrumbs */}
        <p className="text-[1.125rem] sm:text-[1.25rem] md:text-[1.375rem] font-medium mb-[1.5rem]">
          <Link
            to="/#artists"
            className="text-gray-800 hover:underline no-underline"
          >
            Home
          </Link>
          {referrer && isFromSingers && (
            <>
              {" "}
              /{" "}
              <Link
                to="/artist-singers"
                className="text-[#AD2F3B] no-underline hover:underline"
              >
                Singers
              </Link>
            </>
          )}
          {referrer && isFromDancers && (
            <>
              {" "}
              /{" "}
              <Link
                to="/artist-dancers"
                className="text-[#AD2F3B] no-underline hover:underline"
              >
                Dancers
              </Link>
            </>
          )}
          {referrer && isFromMusicians && (
            <>
              {" "}
              /{" "}
              <Link
                to="/artist-musicians"
                className="text-[#AD2F3B] no-underline hover:underline"
              >
                Musicians
              </Link>
            </>
          )}
          {referrer && isFromTheatre && (
            <>
              {" "}
              /{" "}
              <Link
                to="/artist-theatre"
                className="text-[#AD2F3B] no-underline hover:underline"
              >
                Theatre
              </Link>
            </>
          )}
          {" / "}
          <span className="text-[#AD2F3B]">{name}</span>
        </p>

        {/* Artist Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-[4rem] mt-[4rem] mb-[4rem]">
          <div className="w-full mx-auto max-w-[30rem] lg:max-w-none">
            <img
              src={image}
              alt={name}
              className="w-full h-[18.75rem] sm:h-[20rem] md:h-[22rem] lg:h-[31.25rem] object-cover shadow"
            />
          </div>
          <div>
            <h2 className="text-[1.25rem] sm:text-[1.625rem] md:text-[1.75rem] lg:text-[1.875rem] font-bold text-[#AD2F3B] mb-[0.5rem]">
              {name}
            </h2>
            <p className="text-gray-800 mb-[1rem] flex items-center gap-[0.25rem] text-[1rem] sm:text-[1.125rem] md:text-[1.25rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.125rem"
                height="1.125rem"
                fill="white"
                stroke="black"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
              </svg>
              {city}
            </p>
            <p className="text-gray-800 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-bold mb-[1.5rem]">
              {about || "Experience info not available"}
            </p>
            <p
              className="text-[0.875rem] sm:text-[1rem] text-gray-800 leading-[1.6] mb-[1.5rem] z-10"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>

        {/* Gallery - Updated with mobile gap */}
        {performances && performances.length > 0 && (
          <>
            <h3 className="text-[1.25rem] sm:text-[1.625rem] md:text-[1.75rem] lg:text-[1.875rem] font-bold text-[#AD2F3B] mb-[2rem]">
              Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 min-[1024px]:grid-cols-3 gap-[1rem] sm:gap-[4rem] md:gap-[2rem] lg:gap-[2rem] xl:gap-[3rem] mb-[4rem]">
              {performances.map((imgSrc, i) => (
                <div
                  key={i}
                  className="w-full h-[18rem] lg:h-[21rem] bg-gray-300 rounded shadow cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => openModal(i)}
                >
                  <img
                    src={imgSrc}
                    alt={`Performance ${i + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Navigation Buttons - Added back with responsive styling */}
        {artistList.length > 1 && (
          <div className="w-full flex justify-center mt-[2.5rem] mb-[2.5rem]">
            <div className="flex gap-[1.5rem]">
              <button
                onClick={() => handleNavigation('prev')}
                className="bg-[#AD2F3B] text-white text-[1.5rem] rounded-full w-[3rem] h-[3rem] flex items-center justify-center "
                aria-label="Previous artist"
              >
                ‹
              </button>
              <button
                onClick={() => handleNavigation('next')}
                className="bg-[#AD2F3B] text-white text-[1.5rem] rounded-full w-[3rem] h-[3rem] flex items-center justify-center  "
                aria-label="Next artist"
              >
                ›
              </button>
            </div>
          </div>
        )}

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9990] px-4 py-6">
            <div className="relative md:w-[80%] w-[90%] h-[60%] flex items-center justify-center">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2
                           bg-white text-[#AD2F3B] text-xl sm:text-2xl font-bold 
                           z-[9991] w-10 h-10 rounded-full 
                           flex items-center justify-center shadow-lg"
                aria-label="Close gallery"
              >
                &times;
              </button>
              <button
                onClick={prevImage}
                className="absolute left-[-2.5rem] sm:left-[-3rem] text-white text-[2rem] font-bold z-[9991]"
                aria-label="Previous image"
              >
                &#10094;
              </button>
              <img
                src={performances[currentImgIndex]}
                alt="Gallery"
                className="w-full h-auto max-h-[80vh] object-contain rounded shadow-xl z-[9990]"
              />
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
      <Footer />
    </>
  );
};

export default ArtistDetail;