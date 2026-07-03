const fs = require('fs');
const path = require('path');

// Basic XML string parsing for Atom feed
const feedContent = fs.readFileSync(path.join(__dirname, '../feed.atom'), 'utf-8');

const posts = [];
const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
let match;

while ((match = entryRegex.exec(feedContent)) !== null) {
  const entry = match[1];
  
  // Extract fields
  const typeMatch = entry.match(/<blogger:type>(.*?)<\/blogger:type>/);
  const type = typeMatch ? typeMatch[1] : '';
  
  if (type !== 'POST' && type !== 'PAGE') continue;
  
  const titleMatch = entry.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
  
  const contentMatch = entry.match(/<content type='html'>([\s\S]*?)<\/content>/);
  // Unescape html entities in content (basic)
  let content = contentMatch ? contentMatch[1] : '';
  content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  
  const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
  const published = publishedMatch ? publishedMatch[1] : new Date().toISOString();
  
  const filenameMatch = entry.match(/<blogger:filename>(.*?)<\/blogger:filename>/);
  // Remove the .html extension for Next.js routing
  let slug = filenameMatch ? filenameMatch[1] : '';
  if (slug.endsWith('.html')) {
    slug = slug.replace(/\.html$/, '');
  }
  
  posts.push({
    title,
    content,
    published,
    slug,
    type
  });
}

// Sort posts by date descending
posts.sort((a, b) => new Date(b.published) - new Date(a.published));

const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'posts.json'), JSON.stringify(posts, null, 2));
console.log(`Parsed ${posts.length} posts and pages from feed.atom`);
