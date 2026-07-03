const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
let allArticles = [];

// Try to read each batch file
for (let i = 1; i <= 4; i++) {
  const batchFile = path.join(dataDir, `news-batch-${i}.json`);
  if (fs.existsSync(batchFile)) {
    try {
      const batchData = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
      allArticles = allArticles.concat(batchData);
      console.log(`Loaded ${batchData.length} articles from batch ${i}`);
    } catch (e) {
      console.error(`Error parsing batch ${i}:`, e);
    }
  } else {
    console.log(`Batch ${i} not found yet.`);
  }
}

if (allArticles.length > 0) {
  // Sort by date (if needed) or just shuffle them
  allArticles.sort((a, b) => new Date(b.published) - new Date(a.published));
  
  // Overwrite latest-news.json with these highly detailed articles
  fs.writeFileSync(
    path.join(dataDir, 'latest-news.json'), 
    JSON.stringify(allArticles, null, 2)
  );
  console.log(`Successfully merged ${allArticles.length} articles into latest-news.json`);
} else {
  console.log('No articles to merge.');
}
