

import React, { useEffect } from 'react';

const Popup = ({ onClose }) => {
  useEffect(() => {
    // autoplay fallback
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-wrapper">
        <button className="close-button font-bold" onClick={onClose}>×</button>

        <div className="popup-container">
          <iframe
            className="responsive-video"
            src="https://www.youtube.com/embed/VTjUlJIXoJw?autoplay=1&mute=1&loop=1&playlist=VTjUlJIXoJw&cc_load_policy=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(8px);
        }

        .popup-wrapper {
          position: relative;
        }

.popup-container {
  width: clamp(300px, 60vw, 840px); /* Smaller than before */
  aspect-ratio: 16 / 9;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}


        .responsive-video {
          width: 100%;
          height: 100%;
          background-color: white;
        }

        .close-button {
          position: absolute;
          top: -20px;
          right: -16px;
          background-color: white;
          border: 2px solid #AD2F3B;
          border-radius: 50%;
          font-size: 34px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(196, 70, 70, 0.3);
          z-index: 1001;
          color: #AD2F3B;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
    .popup-container {
      width: 95vw;           /* increase width on mobile */
      height: auto;          /* optional, controlled by aspect-ratio */
    }

          .close-button {
            top: -48px;
            right: -10px;
            width: 32px;
            height: 32px;
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default Popup;
