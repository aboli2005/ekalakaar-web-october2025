
import React from 'react';

const BlogCard = ({ image, title, description, date, isHighlighted, link }) => {
  return (
    <div 
  className={`border-2 rounded-md overflow-hidden ${
    isHighlighted ? 'border-[#AD2F3B]' : 'border-gray-300'
  } p-[1rem] box-border flex flex-col
  w-full 
  max-w-[23rem] 
  sm:max-w-[20rem] 
  md:max-w-[22rem] 
  lg:max-w-[24rem] 
  xl:max-w-[26rem]
  h-[30rem] /* Fixed height */
  mx-auto
  sm:mx-[0.5rem]
  md:mx-[0.75rem]
  xl:mx-[1rem]
`}
>
  {/* Image with consistent aspect ratio */}
  <div className="w-full h-[12rem] sm:h-[10rem] md:h-[11rem] lg:h-[12rem] overflow-hidden rounded">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover"
    />
  </div>

  {/* Title with fixed height */}
  <div className="mt-[1rem] h-[3.5rem] flex items-center">
    <h3 
      className={`text-[1rem] sm:text-[1rem] md:text-[1.125rem] font-semibold leading-tight ${
        isHighlighted ? 'text-[#AD2F3B]' : 'text-black'
      } line-clamp-2`}
    >
      {title}
    </h3>
  </div>

  {/* Description with flexible space */}
  <div className="mt-[0.5rem] flex-grow">
    <p className="text-[0.875rem] sm:text-[0.875rem] md:text-[1rem] text-gray-600 leading-snug line-clamp-3">
      {description}
    </p>
  </div>

  {/* Read more link */}
  <div className="mt-[0.75rem]">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 font-semibold no-underline hover:text-[#AD2F3B] transition-colors"
    >
      👉 Read more
    </a>
  </div>

  {/* Date at bottom */}
  <div className="mt-[0.75rem] pt-[0.75rem] border-t border-gray-300">
    <p className="text-[0.875rem] text-gray-500">{date}</p>
  </div>
</div>
  );
};

export default BlogCard;