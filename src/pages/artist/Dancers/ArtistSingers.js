import React from 'react';
import { Link } from 'react-router-dom';
import mandala from '../../../assets/wallpaper.png';
import Footer from '../../../components/Footer';
import allArtists from '../../../data/artistsData';
import ScrollToHashElement from '../../ScrollToHashElement';

const ArtistSingers = () => {
  const artists = allArtists.Singers || [];

  return (
    <>
      <div
        id="singers"
        className="relative overflow-hidden bg-white px-[1.5rem] sm:px-[2rem] md:px-[3rem] lg:px-[4rem] xl:px-[5rem] py-[2.5rem] font-sans text-gray-900"
      >
        <ScrollToHashElement />

        {/* Decorative Mandala Background */}
        <div className="hidden sm:block">
         <img
  src={mandala}
  alt="Mandala top right"
  className="absolute hidden sm:block md:hidden lg:block top-[-18.75rem] right-[-12.5rem] w-[37.5rem] opacity-[0.7] z-0"
/>
          <img
            src={mandala}
            alt="Mandala bottom left"
            className="absolute bottom-[-18.75rem] left-[-12.5rem] w-[37.5rem] opacity-[0.7] z-0"
          />
          <img
            src={mandala}
            alt="Mandala bottom right"
            className="absolute bottom-[-18.75rem] right-[-12.5rem] w-[37.5rem] opacity-[0.7] z-0"
          />
        </div>

        {/* Breadcrumb and Heading */}
        <div className="relative z-10 mb-0 mt-[1.875rem] sm:mt-[1.5rem]">
          <p className="text-[1.125rem] sm:text-[1.25rem] md:text-[1.375rem] font-medium mb-[1.5rem] sm:mb-[1.25rem]">
            <Link to="/#artists" className="text-gray-800 hover:underline">
              Home
            </Link>{' '}
            / <span className="text-[#AD2F3B]">Singers</span>
          </p>
          <h2 className="text-[1.25rem] sm:text-[1.625rem] md:text-[1.75rem] lg:text-[1.875rem] font-bold text-[#AD2F3B] mt-[0.5rem] mb-[2.5rem] sm:mb-[2rem]">
            Find the perfect singer for your event
          </h2>
        </div>

        {/* Artist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[2.5rem] gap-y-[4.5rem] mb-[18.75rem] sm:mb-[15rem] relative z-10">
          {artists.map((artist, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-[1.25rem] flex flex-col items-start w-full max-w-[26rem] mx-auto shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-white h-full
                        min-[1024px]:h-[auto] min-[1280px]:h-full"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-[13.5rem] sm:h-[14rem] md:h-[14rem] lg:h-[16rem] xl:h-[16rem] 
                          min-[1024px]:h-[12rem] min-[1280px]:h-[16rem] mb-[1rem] rounded object-cover"
              />
              <h3 className="text-[1rem] sm:text-[1.125rem] md:text-[1.125rem] lg:text-[1.25rem] font-bold text-[#AD2F3B] mb-[0.75rem]">
                {artist.name}
              </h3>
              <p className="text-[0.875rem] sm:text-[0.9375rem] md:text-[0.9375rem] lg:text-[1rem] font-medium text-[#404040] mb-[0.75rem]">
                {artist.city}
              </p>
              <div className="flex flex-wrap gap-[0.5rem] mb-[1.5rem] sm:mb-[1.5rem]">
                {artist.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[0.75rem] sm:text-[0.8125rem] md:text-[0.8125rem] lg:text-[0.875rem] font-normal px-[0.75rem] py-[0.375rem] rounded-full text-gray-800 shadow-md bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View More Button */}
              <div className="mt-auto w-full text-center">
                <Link
                  to={`/artist/${artist.name.replace(/\s+/g, '-').toLowerCase()}`}
                  state={{
                    artist,
                    artistList: artists,
                    referrer: 'artist-singers',
                  }}
                  className="inline-block bg-[#AD2F3B] text-white text-[0.75rem] sm:text-[0.8125rem] lg:text-[0.875rem] px-[1.25rem] py-[0.375rem] rounded-full hover:shadow-md hover:shadow-[#2e2e2e]/40 transition-all duration-200 text-decoration-none"
                >
                  View more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ArtistSingers;
