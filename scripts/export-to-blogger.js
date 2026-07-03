const fs = require('fs');
const path = require('path');

const latestNewsPath = path.join(__dirname, '../src/data/latest-news.json');

if (!fs.existsSync(latestNewsPath)) {
  console.error("latest-news.json not found!");
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(latestNewsPath, 'utf8'));
const blogId = '9195932822452077953'; // Dummy or generic blog ID, Blogger usually accepts it during import and assigns a new one.

let xml = `<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns='http://www.w3.org/2005/Atom' xmlns:openSearch='http://a9.com/-/spec/opensearchrss/1.0/' xmlns:georss='http://www.georss.org/georss' xmlns:thr='http://purl.org/syndication/thread/1.0'>
  <id>tag:blogger.com,1999:blog-${blogId}</id>
  <updated>${new Date().toISOString()}</updated>
  <title type='text'>Int3lion</title>
  <generator version='7.00' uri='http://www.blogger.com'>Blogger</generator>
`;

articles.forEach((article, index) => {
  // Generate a random 19-digit post ID
  const postId = Math.floor(Math.random() * 9000000000000000000) + 1000000000000000000;
  
  // Escape HTML content for XML
  const escapedContent = article.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  // Escape Title
  const escapedTitle = article.title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const categoryTerm = article.category ? article.category : 'News';

  xml += `
  <entry>
    <category scheme="http://schemas.google.com/g/2005#kind" term="http://schemas.google.com/blogger/2008/kind#post"/>
    <category scheme="http://www.blogger.com/atom/ns#" term="${categoryTerm}"/>
    <id>tag:blogger.com,1999:blog-${blogId}.post-${postId}</id>
    <published>${new Date(article.published).toISOString()}</published>
    <updated>${new Date(article.published).toISOString()}</updated>
    <title type='text'>${escapedTitle}</title>
    <content type='html'>${escapedContent}</content>
    <author>
      <name>Int3lion</name>
    </author>
  </entry>
  `;
});

xml += `</feed>`;

const outputPath = path.join(__dirname, '../blogger-import.xml');
fs.writeFileSync(outputPath, xml, 'utf8');

console.log('Successfully generated valid Blogger XML backup file at: ' + outputPath);
