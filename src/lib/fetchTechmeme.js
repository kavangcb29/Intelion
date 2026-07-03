import Parser from 'rss-parser';

const parser = new Parser();

export async function getTechmemeFeed() {
  try {
    const feed = await parser.parseURL('https://www.techmeme.com/feed.xml');
    
    return feed.items.slice(0, 15).map(item => ({
      title: item.title,
      link: item.link,
      published: item.pubDate,
      snippet: item.contentSnippet || item.content || '',
      source: 'Techmeme'
    }));
  } catch (error) {
    console.error("Error fetching Techmeme feed:", error);
    return [];
  }
}
