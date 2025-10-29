// src/pages/news/EkNews.js
import React from 'react';
import NewsCard from './NewsCard';


const dummyData = [
  {
    date: 'April 25, 2025',
    title: 'Upcoming',
    image: '', // Replace with image URL if available
  },
  {
    date: 'April 23, 2025',
    title: 'Upcoming performances this month...',
    image: '',
  },
];

const EkNews = () => {
  return (
    <div className="px-6 py-8">
      {dummyData.map((item, idx) => (
        <NewsCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default EkNews;
