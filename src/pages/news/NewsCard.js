// import React from 'react';
// import './news.css';

// const NewsCard = ({ image, title, link }) => {
//   return (
//     <a
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="w-[250px] h-[260px] bg-white p-4 rounded-lg shadow-md flex-shrink-0 
//                  hover:scale-[1.05] transition-transform duration-200 flex flex-col items-center"
//     >
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-[140px] object-cover rounded mb-3"
//       />
//       <p className="text-sm  text-gray-800 leading-snug overflow-hidden text-ellipsis"
//          style={{
//            display: '-webkit-box',
//            WebkitLineClamp: 2,
//            WebkitBoxOrient: 'vertical',
//          }}
//       >
//         {title}
//       </p>
//     </a>
//   );
// };

// export default NewsCard;

import React from 'react';
import './news.css';

const NewsCard = ({ image, title, link, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-GB'); // e.g., 04/03/2025

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[250px] h-[290px] bg-white p-4 rounded-lg shadow-md flex-shrink-0 
                 hover:scale-[1.05] text-decoration-none transition-transform duration-200 flex flex-col"
    >
      <img
        src={image || 'https://via.placeholder.com/250x140.png?text=No+Image'}
        alt={title}
        className="w-full h-[140px] object-cover rounded mb-3"
      />

      <div className="flex-1 flex flex-col justify-between">
        <p
          className="text-sm text-gray-900 leading-snug overflow-hidden text-ellipsis"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </p>

        <p className="text-xs text-gray-500 text-right mt-auto">
          {formattedDate}
        </p>
      </div>
    </a>
  );
};

export default NewsCard;
