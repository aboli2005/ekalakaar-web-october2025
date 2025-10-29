import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['media:content'],
  },
});

export async function fetchRSSFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      image:
        item.enclosure?.url ||
        item['media:content']?.[0]?.$.url ||
        'https://via.placeholder.com/400x200?text=No+Image',
    }));
    return items;
  } catch (err) {
    console.error('RSS fetch error:', err);
    return [];
  }
}
