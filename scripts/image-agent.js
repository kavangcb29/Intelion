require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const dbPath = path.join(__dirname, '../src/data/posts.json');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runImageAgent() {
  console.log("📸 Booting Autonomous Image Search Agent...");
  
  if (!fs.existsSync(dbPath)) {
    console.error("❌ Database not found.");
    process.exit(1);
  }

  let posts = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let updatedCount = 0;

  for (let i = 0; i < Math.min(10, posts.length); i++) {
    const post = posts[i];
    
    // Check if image is missing, is an AI-generated Pollinations image, or is a duplicate fallback
    if (!post.imageUrl || post.imageUrl.includes('pollinations.ai') || post.imageUrl.includes('hero-abstract') || post.imageUrl.includes('unsplash.com')) {
      console.log(`\n🔍 Searching for real image for: "${post.title}"`);
      
        let success = false;
        let retries = 0;
        
        while (!success && retries < 2) {
          try {
            // 1. Use AI to extract the best search noun
            const keywordPrompt = `
              I need to search Wikipedia for a highly relevant, real-world photograph for this article:
              Title: "${post.title}"
              
              Task: Extract the single most important, concrete noun or proper noun that will yield the best real-world photography (e.g., "Nvidia", "Server Rack", "Quantum Computer", "Cybersecurity", "Microchip"). 
              Do not use abstract concepts. 
              Output ONLY the 1-3 word search query string. Nothing else.
            `;
            
            const keywordResponse = await ai.models.generateContent({
              model: 'gemini-3.6-flash',
              contents: keywordPrompt,
              config: { temperature: 0.1 }
            });
            const searchQuery = keywordResponse.text.trim();
            console.log(`   💡 AI suggested search term: "${searchQuery}"`);

            // 2. Search Wikipedia API for real-world images
            const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(searchQuery)}&pithumbsize=1200`;
            const response = await fetch(wikiUrl);
            const data = await response.json();
            
            let foundImage = null;
            if (data.query && data.query.pages) {
              for (const pageId in data.query.pages) {
                const page = data.query.pages[pageId];
                if (page.thumbnail && page.thumbnail.source) {
                  if (!page.thumbnail.source.includes('.svg')) {
                    foundImage = page.thumbnail.source;
                    break;
                  }
                }
              }
            }
            
            if (foundImage) {
              console.log(`   ✅ Found authentic photo: ${foundImage}`);
              posts[i].imageUrl = foundImage;
              updatedCount++;
            } else {
              console.log(`   ⚠️ No real photo found for "${searchQuery}". Reverting to unique fallback.`);
              posts[i].imageUrl = `https://picsum.photos/seed/${encodeURIComponent(searchQuery)}/1200/800`; 
              updatedCount++;
            }
            
            success = true;
            // Wait 10 seconds to avoid rate limiting
            await delay(10000);

          } catch (err) {
            if (err.status === 429) {
              console.log("   ⏳ Rate limit hit! Waiting 60 seconds before retrying...");
              await delay(60000);
              retries++;
            } else {
              console.error("   ❌ Error searching for image, reverting to unique fallback:", err);
              posts[i].imageUrl = `https://picsum.photos/seed/${i * Date.now()}/1200/800`;
              updatedCount++;
              success = true;
            }
          }
        }
        
        if (!success) {
          console.log("   ⚠️ All retries failed. Applying unique fallback.");
          posts[i].imageUrl = `https://picsum.photos/seed/${i * Date.now()}/1200/800`;
          updatedCount++;
        }
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(dbPath, JSON.stringify(posts, null, 2));
    console.log(`\n🎉 SUCCESS! Replaced ${updatedCount} AI-generated images with authentic real-world photography.`);
  } else {
    console.log("\n👍 All articles already have authentic images.");
  }
}

runImageAgent();
