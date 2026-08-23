require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const dbPath = path.join(__dirname, '../src/data/posts.json');
let posts = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

async function updateImages() {
  console.log("Updating top 10 articles with images...");
  for (let i = 0; i < 10; i++) {
    if (!posts[i].imageUrl) {
      console.log(`Generating image for: ${posts[i].title}`);
      try {
        const imagePromptResponse = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `Write a short, highly descriptive, photorealistic image prompt for an article titled: "${posts[i].title}". Do not include any text in the image. Make it highly cinematic and tech-focused. Output ONLY the raw prompt string.`,
        });
        const imagePrompt = imagePromptResponse.text.trim();
        posts[i].imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=800&height=400&nologo=true`;
      } catch (err) {
        console.error("Failed image gen", err);
      }
    }
  }
  fs.writeFileSync(dbPath, JSON.stringify(posts, null, 2));
  console.log("Done!");
}

updateImages();
