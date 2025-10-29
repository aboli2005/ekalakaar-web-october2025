
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import mandala from '../../assets/wallpaper.png'

import blog1 from '../../assets/blogs/1.png'
import blog2 from '../../assets/blogs/2.png'
import blog3 from '../../assets/blogs/3.png'

const blogData = [
  {
    id: 1,
    image: blog1,
    title: "The pulse of Tradition: Indigenous Song, Dance and Music",
    description: "In a rapidly globalizing world, India's Indigenous knowledge (IKS) offers profound, time-tested wisdom...",
    date: "05/15/25",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7328686742058831874/?actorCompanyId=96085233",
  },
  {
    id: 2,
    image: blog2,
    title: "Natyashastra: The Ancient Blueprint for Indian Performing Arts—and the Future We're Building with It!",
    description: "Long before the age of digital streaming and viral content, performing arts were seen as something far more profound...",
    date: "05/20/25",
    link: "https://www.linkedin.com/posts/ekalakaar-india_natyashastra-indianperformingarts-culturalheritage-activity-7330480164637749248-nsOI/",
  },
  {
    id: 3,
    image: blog3,
    title: "India's Orange Economy: A New Dawn",
    description: "India is experiencing the rapid rise of the Orange Economy, where creativity, content, and culture are emerging as powerful drivers of economic growth...",
    date: "05/09/25",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7326489941553627136/?actorCompanyId=96085233",
  },
];

const cardsPerPage = 12;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogData.length / cardsPerPage);

  const currentCards = blogData.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto ">
      <div className="max-[440px]:hidden">
         {/* Bottom Right Mandala */}


{/* Top Right Mandala */}
<img
  src={mandala}
  alt="Mandala top right"
  className="absolute 
             top-[-17.5rem] right-[-15.625rem] w-[38.5rem]  // default for xl and up
             xl:top-[-20rem] xl:right-[-10.5rem] xl:w-[36rem]  // for lg
             lg:top-[-16rem] lg:right-[-10.5rem] lg:w-[30rem]  // for lg
             md:top-[-11rem] md:right-[-10rem] md:w-[25rem]  // for md
             opacity-[0.7] z-0"
/>
</div>

      <div className="max-w-[90rem]  lg:mx-auto  px-4 py-12 bg-white">
        <p className="text-[1.125rem] sm:text-[1.25rem] lg:text-[1.375rem] xl:text-[1.5rem] font-medium mb-6">
          <Link to="/" className="text-gray-800 hover:underline">
            Home
          </Link>{" "}
          / <span className="text-[#AD2F3B]">Blogs</span>
        </p>

        <h2 className="text-[1.25rem] sm:text-[1.625rem] md:text-[1.75rem] lg:text-[1.875rem] font-bold mb-10 text-[#AD2F3B]">
          Blogs
        </h2>

<div className={`
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-2 
  lg:grid-cols-3
  gap-x-6 
  gap-y-8
  sm:gap-6
  md:gap-8
  lg:gap-6
  justify-center
  ${currentCards.length === 3 ? 'md:[&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:mx-auto lg:[&>*:nth-child(3)]:col-span-1 lg:[&>*:nth-child(3)]:mx-0' : ''}
`}>
  {currentCards.map((card) => (
    <div key={card.id} className={`
      ${currentCards.length === 3 ? 'md:last:w-[22rem] lg:last:w-full' : ''}
      w-full
    `}>
      <BlogCard
        image={card.image}
        title={card.title}
        description={card.description}
        date={card.date}
        link={card.link}
      />
    </div>
  ))}
</div>

        <div className="flex justify-center mt-10 gap-2 text-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-[#AD2F3B] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
        
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;