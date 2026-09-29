require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const POSTS_FILE = path.join(__dirname, '../src/data/posts.json');
const QUEUE_FILE = path.join(__dirname, '../src/data/social-queue.json');
const BASE_URL = 'https://intelion.onrender.com';

// Initialize API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRetry(modelArgs, maxRetries = 5) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await ai.models.generateContent(modelArgs);
    } catch (err) {
      const status = err?.status || err?.response?.status;
      if (status === 429 || status === 503 || status === 500) {
        retries++;
        const waitTime = Math.min(10000 * Math.pow(2, retries - 1), 60000);
        console.log(`⚠️ Gemini API error (${status}). Retrying in ${waitTime/1000}s... (Attempt ${retries}/${maxRetries})`);
        await delay(waitTime);
      } else {
        console.error(`❌ Non-retriable Gemini error:`, err);
        break;
      }
    }
  }

  console.log(`🔄 Primary model (${modelArgs.model}) failed. Falling back to ultra-reliable 'gemini-flash-latest'...`);
  modelArgs.model = 'gemini-flash-latest';
  
  let fallbackRetries = 0;
  while (fallbackRetries < 3) {
    try {
      return await ai.models.generateContent(modelArgs);
    } catch (err) {
      fallbackRetries++;
      await delay(5000);
    }
  }

  console.log("💀 CRITICAL: All API endpoints failed. Returning null.");
  return null;
}

async function generateSocialCopy(article) {
  const prompt = `
    You are the Social Media Manager for a highly-respected technology journalism site called Int3lion.
    I am providing you with the title and content of our latest article.
    
    Article Title: "${article.title}"
    Article Content snippet: "${article.content.substring(0, 800)}..."
    
    Task 1: Write a viral, highly-engaging Twitter post (under 250 characters so we have room for the link). Include 2-3 relevant hashtags. DO NOT include the URL, just leave a placeholder [URL].
    
    Task 2: Write a conversational, discussion-oriented Reddit post title. It should sound like a real human asking a question or sharing a fascinating insight to spark debate.
    
    Task 3: Pick the single BEST subreddit for this article from the following list ONLY:
    - ArtificialInteligence
    - MachineLearning
    - hardware
    - gadgets
    - technology
    - startups
    
    Respond STRICTLY in JSON format:
    {
      "twitter_body": "Your viral tweet text...",
      "reddit_title": "Your engaging Reddit title...",
      "subreddit": "the_chosen_subreddit_name"
    }
  `;

  try {
    const response = await generateWithRetry({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    
    if (!response) return null;
    return JSON.parse(response.text);
  } catch (error) {
    console.error("❌ Failed to parse social copy from Gemini:", error);
    return null;
  }
}

async function runSocialAgent() {
  console.log("🤖 Initializing Autonomous Social Agent (Dashboard Mode)...");
  
  if (!fs.existsSync(POSTS_FILE)) {
    console.log("❌ No posts.json found. Exiting.");
    return;
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  
  // Find the most recent post that hasn't been queued for social media yet
  const unsharedPostIndex = posts.findIndex(p => !p.socialShared);
  
  if (unsharedPostIndex === -1) {
    console.log("✅ All articles have already been queued! Exiting.");
    return;
  }
  
  const targetPost = posts[unsharedPostIndex];
  console.log(`\n📢 Target Article: "${targetPost.title}"`);
  
  const articleUrl = `${BASE_URL}${targetPost.slug.startsWith('/') ? targetPost.slug : '/' + targetPost.slug}`;
  
  console.log("🧠 Consulting Gemini for viral social copy...");
  const copy = await generateSocialCopy(targetPost);
  
  if (!copy) return;
  
  // Save to the hidden dashboard queue
  let queue = [];
  if (fs.existsSync(QUEUE_FILE)) {
    queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf-8'));
  }
  
  queue.unshift({
    articleTitle: targetPost.title,
    articleUrl: articleUrl,
    twitter: copy.twitter_body,
    redditTitle: copy.reddit_title,
    subreddit: copy.subreddit,
    dateAdded: new Date().toISOString()
  });
  
  // Keep only the 20 most recent queue items to prevent file bloat
  if (queue.length > 20) queue = queue.slice(0, 20);
  
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
  console.log("\n✅ Saved generated copy to social-queue.json!");
  
  // Mark as shared in database so it doesn't process it again tomorrow
  posts[unsharedPostIndex].socialShared = true;
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  console.log(`💾 Marked article as socialShared in posts.json`);
}

runSocialAgent();
