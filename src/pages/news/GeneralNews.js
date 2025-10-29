// import React, { useEffect, useState } from 'react';
// import NewsCard from './NewsCard';

// const GeneralNews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API_KEY = 'a803c8583af943eeb22a24ab353e72ab';
//   const query = ` (culture OR cultural) OR India AND (
//     "cultural dance" OR "cultural music" OR "cultural theater" OR
//     artist OR "ministry of culture" OR "art gallery" OR
//     museum OR "cultural festival" OR IIT OR IIM OR university
//   )`;

//   const BASE_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
//     query
//   )}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;

//   const RSS_SOURCES = [
//     {
//       name: 'The Hindu',
//       url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.thehindu.com%2Fnews%2Fnational%2Ffeeder%2Fdefault.rss',
//     },
//     {
//       name: 'Indian Express',
//       url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Findianexpress.com%2Fsection%2Findia%2Ffeed%2F',
//     },
//     {
//       name: 'Times of India',
//       url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Frssfeedstopstories.cms',
//     },
//   ];

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const [newsApiRes, ...rssFeeds] = await Promise.all([
//           fetch(BASE_URL).then((res) => res.json()),
//           ...RSS_SOURCES.map((source) =>
//             fetch(source.url)
//               .then((res) => res.json())
//               .then((data) =>
//                 data.items?.map((item) => ({
//                   title: item.title,
//                   date: new Date(item.pubDate).toISOString(),
//                   image: item.thumbnail || '',
//                   url: item.link,
//                 })) || []
//               )
//           ),
//         ]);

//         const apiArticles =
//           newsApiRes.articles?.map((a) => ({
//             title: a.title,
//             date: a.publishedAt,
//             image: a.urlToImage,
//             url: a.url,
//           })) || [];

//         const relevantKeywords = [
//           'cultural dance',
//           'cultural music',
//           'cultural theater',
//           'artist',
//           'ministry',
//           'union territory',
//           'regulatory body',
//           'government cultural program',
//           'government institution',
//           'IIT',
//           'IIM',
//           'major event',
//           'state',
//         ];

//         const combined = [...apiArticles, ...rssFeeds.flat()]
//           .filter((article) =>
//             relevantKeywords.some((keyword) =>
//               article.title?.toLowerCase().includes(keyword.toLowerCase())
//             )
//           )
//           .sort((a, b) => new Date(b.date) - new Date(a.date));

//         setNewsData(combined);
//       } catch (error) {
//         console.error('Error fetching combined news:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="px-6 py-8">
//       {loading ? (
//         <p className="text-center text-gray-500">Loading cultural news...</p>
//       ) : newsData.length === 0 ? (
//         <p className="text-center text-gray-500">No news found.</p>
//       ) : (
//         newsData.map((article, index) => (
//           <NewsCard
//             key={index}
//             title={article.title}
//             date={new Date(article.date).toDateString()}
//             image={article.image}
//             url={article.url}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default GeneralNews;

import React, { useEffect, useState, useMemo } from 'react';
import NewsCard from './NewsCard';

const GeneralNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'a803c8583af943eeb22a24ab353e72ab';

  // ✅ MEMOIZED QUERY STRING
  const query = useMemo(() => {
    return ` (culture OR cultural) OR India AND (
      "cultural dance" OR "cultural music" OR "cultural theater" OR
      artist OR "ministry of culture" OR "art gallery" OR
      museum OR "cultural festival" OR IIT OR IIM OR university
    )`;
  }, []);

  // ✅ MEMOIZED BASE_URL
const BASE_URL = useMemo(() => {
  return `https://newsapi.org/v2/top-headlines?category=entertainment&q=${encodeURIComponent(
    query
  )}&language=en&pageSize=20&apiKey=${API_KEY}`;
}, [query, API_KEY]);


  const RSS_SOURCES = [
  {
    name: 'The Hindu - Entertainment',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.thehindu.com%2Fentertainment%2Frssfeed%2F',
  },
  {
    name: 'Indian Express - Entertainment',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Findianexpress.com%2Fsection%2Fentertainment%2Ffeed%2F',
  },
  {
    name: 'Times of India - Entertainment',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Fetimes%2Frssfeeds%2F1081479906.cms',
  }
];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [newsApiRes, ...rssFeeds] = await Promise.all([
          fetch(BASE_URL).then((res) => res.json()),
          ...RSS_SOURCES.map((source) =>
            fetch(source.url)
              .then((res) => res.json())
              .then((data) =>
                data.items?.map((item) => ({
                  title: item.title,
                  date: new Date(item.pubDate).toISOString(),
                  image: item.thumbnail || '',
                  url: item.link,
                  description: item.description || '', // 🆕 for filtering
                })) || []
              )
          ),
        ]);

        const apiArticles =
          newsApiRes.articles?.map((a) => ({
            title: a.title,
            date: a.publishedAt,
            image: a.urlToImage,
            url: a.url,
            description: a.description || '', // 🆕 for filtering
          })) || [];

        // ✅ UPDATED Keyword List for Culture-specific news
        const relevantKeywords = [
          'cultural dance',
          'cultural music',
          'cultural theater',
          'folk dance',
          'folk music',
          'traditional art',
          'cultural event',
          'cultural festival',
          'music festival',
          'art exhibition',
          'artist',
          'museum',
          'art gallery',
          'theater performance',
          'performing arts',
          'ministry of culture',
          'heritage site',
          'IIT cultural fest',
          'IIM cultural fest',
          'university cultural program',
        ];

        // ✅ COMBINE + FILTER + SORT
        const combined = [...apiArticles, ...rssFeeds.flat()]
          .filter((article) =>
            relevantKeywords.some((keyword) =>
              (
                ((article.title || '') + ' ' + (article.description || ''))
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              )
            )
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        // ✅ LOG filtered news in browser
        console.log('Filtered News:', combined);

        setNewsData(combined);
      } catch (error) {
        console.error('Error fetching combined news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [BASE_URL]);

  return (

  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Cultural News</h2>
    {loading ? (
      <p>Loading news...</p>
    ) : newsData.length > 0 ? (
      newsData.map((item, index) => (
        <NewsCard key={index} article={item} />
      ))
    ) : (
      <p>No cultural news available right now.</p>
    )}
  </div>
  );
};

export default GeneralNews;
