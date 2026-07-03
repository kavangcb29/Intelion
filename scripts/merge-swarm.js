const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const latestNewsPath = path.join(dataDir, 'latest-news.json');

// Read existing news
let allNews = [];
if (fs.existsSync(latestNewsPath)) {
  allNews = JSON.parse(fs.readFileSync(latestNewsPath, 'utf8'));
}

// Find all batch files from the swarm
const files = fs.readdirSync(dataDir);
let mergedCount = 0;

for (const file of files) {
  if (file.startsWith('news-batch-') && file.endsWith('.json')) {
    const batchPath = path.join(dataDir, file);
    try {
      const batchData = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
      if (Array.isArray(batchData)) {
        allNews = allNews.concat(batchData);
        mergedCount += batchData.length;
        console.log(`Merged ${batchData.length} articles from ${file}`);
        // Optionally delete the batch file after successful merge
        fs.unlinkSync(batchPath);
      }
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
}

// Ensure unique slugs
const uniqueNews = [];
const slugs = new Set();
for (const article of allNews) {
  if (!slugs.has(article.slug)) {
    slugs.add(article.slug);
    uniqueNews.push(article);
  }
}

// Sort by date (newest first)
uniqueNews.sort((a, b) => new Date(b.published) - new Date(a.published));

fs.writeFileSync(latestNewsPath, JSON.stringify(uniqueNews, null, 2), 'utf8');
console.log(`Successfully merged! Total articles in database: ${uniqueNews.length}`);
