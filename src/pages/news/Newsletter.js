
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import './news.css';

const API_KEY = '8ae5ef8e885b1139760f47df8ce7c10d'; // GNews API key

const CATEGORY_KEYWORDS = {
Cultural: '"culture India" OR "cultural festival India" OR dance OR music OR art OR "indian instruments" OR "indian dance"',
  Dance: 'dance performance India OR Bharatanatyam OR Kathak',
  Music: 'live music India OR concert OR musician India',
Theatre: 'theatre OR drama OR stage play India',
  Art: 'art exhibition India OR painting showcase',
};

const Newsletter = () => {
  const [activeCategory, setActiveCategory] = useState('Cultural');
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const query = CATEGORY_KEYWORDS[activeCategory];
const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=in&max=10&sortby=date&apikey=${API_KEY}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setNewsItems(data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsItems([]);
      }
    };

    fetchNews();
  }, [activeCategory]);

  return (
    <div className="my-10">
      <h1 className="text-[34px] md:text-[28px] font-bold text-[#AD2F3B] mb-3">
        News
      </h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-start lg:justify-end items-center text-[#AD2F3B] font-medium 
                      text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] gap-2 mb-8">
        {Object.keys(CATEGORY_KEYWORDS).map((item, index, array) => (
          <React.Fragment key={item}>
            <span
              className={`cursor-pointer transition duration-200 ${
                activeCategory === item ? 'underline scale-[1.05]' : ''
              }`}
              onClick={() => setActiveCategory(item)}
            >
              {item}
            </span>
            {index < array.length - 1 && (
              <span className="text-[#AD2F3B] select-none">/</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* News Cards */}
      <div className="news-carousel-container">
        <div className="news-carousel-track">
          {newsItems.length === 0 ? (
            <p className="text-gray-500">No recent news available.</p>
          ) : (
            newsItems.map((news, idx) => (
              <NewsCard
                key={`${news.title}-${idx}`}
                image={news.image}
                title={news.title}
                link={news.url}
                date={news.publishedAt}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

