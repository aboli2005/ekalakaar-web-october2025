

import wallpaper from "../assets/wallpaper.png";
import phone from "../assets/phone.png";
import qr from "../assets/qr.png";
import { Link } from 'react-router-dom';

const DownloadSection = () => {
  return (
    <div
      className="w-full py-8 md:py-12 h-auto md:h-[700px] px-4 md:pl-20 md:pr-8 flex justify-start items-center"
      style={{
        background: "linear-gradient(180deg, #FAECEE 40%, #FFFFFF 57%, #F8E3E5 100%)",
      }}
    >
      <div className="w-full max-w-[1680px] flex flex-col md:flex-row justify-between items-center">
        {/* Left Text Content - Full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-[#AD2F3B] text-[20px] md:text-[32px] font-bold mb-3 md:mb-4">
            Download eKalakaar App
          </h2>
          <p className="text-[14px] md:text-[20px] mb-4 md:mb-6">
            India's first app connecting traditional performing artists to real
            work, fair pay & growth—free and made just for you.
          </p>

          <ul className="list-disc ml-5 md:ml-10 space-y-1 md:space-y-2 text-[12px] md:text-[18px]">
            <li>Discover Opportunities and apply directly.</li>
            <li>Build your digital portfolio.</li>
            <li>Learn new skills online.</li>
            <li>Manage bookings with ease.</li>
            <li>Stay updated on events & schemes.</li>
          </ul>

          <div className="flex flex-col md:flex-col items-center md:items-center mt-2 md:mt-4 ml-0 md:ml-[70px] gap-4 md:gap-10">
            <div className="flex gap-4 items-end">
              {/* Google Play Badge - Left */}
              <a
                href="https://play.google.com/store/apps/details?id=com.tanxe.android.ekalakaar_app&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-8 md:h-12"
                />
              </a>

              {/* Apple App Store Badge - Right with Coming Soon on top */}
              <div className="flex flex-col items-center justify-end">
                <span
                  className="text-xs md:text-md mb-1  whitespace-nowrap"
                  style={{
                    color: "#800000",
                    animation: "blink 1s step-start infinite",
                  }}
                >
                  Coming Soon
                </span>

                <Link to="/login">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    className="h-8 md:h-12"
                  />
                </Link>
              </div>
            </div>

            <img
              src={qr}
              alt="QR Code"
              className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] ml-[15px]"
            />
          </div>
        </div>

        {/* Right Phone + Mandala Image */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 relative flex justify-center items-center ml-[15px]">
<img
  src={wallpaper}
  alt="Mandala"
  className="absolute z-0 w-[320px] md:w-[600px] opacity-40"
/>
          <img
            src={phone}
            alt="Phone"
            className="relative z-10 w-[150px] md:w-[260px] rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Inline style for blink keyframes */}
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default DownloadSection;
