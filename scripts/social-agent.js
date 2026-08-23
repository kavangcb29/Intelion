const fs = require('fs');
const path = require('path');
const { TwitterApi } = require('twitter-api-v2');
const snoowrap = require('snoowrap');
const { GoogleGenAI } = require('@google/genai');

const POSTS_FILE = path.join(__dirname, '../src/data/posts.json');
const BASE_URL = 'https://intelion.onrender.com';

// Initialize APIs
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Skip authentication if we are just running a dry-run test
const isDryRun = process.env.SOCIAL_DRY_RUN === 'true';

let twitterClient, redditClient;

if (!isDryRun) {
  // Twitter API v2 Client
  twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  }).readWrite;

  // Reddit API Client
  redditClient = new snoowrap({
    userAgent: 'Int3lion Autonomous Social Agent v1.0',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
  });
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
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("❌ Failed to generate social copy with Gemini:", error);
    return null;
  }
}

async function runSocialAgent() {
  console.log("🤖 Initializing Autonomous Social Agent...");
  
  if (!fs.existsSync(POSTS_FILE)) {
    console.log("❌ No posts.json found. Exiting.");
    return;
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  
  // Find the most recent post that hasn't been shared on social media yet
  const unsharedPostIndex = posts.findIndex(p => !p.socialShared);
  
  if (unsharedPostIndex === -1) {
    console.log("✅ All articles have already been promoted on social media! Exiting.");
    return;
  }
  
  const targetPost = posts[unsharedPostIndex];
  console.log(`\n📢 Target Article: "${targetPost.title}"`);
  
  const articleUrl = `${BASE_URL}${targetPost.slug.startsWith('/') ? targetPost.slug : '/' + targetPost.slug}`;
  
  console.log("🧠 Consulting Gemini for viral social copy...");
  const copy = await generateSocialCopy(targetPost);
  
  if (!copy) return;
  
  console.log("\n--- GENERATED COPY ---");
  console.log("🐦 Twitter:");
  console.log(`${copy.twitter_body}\n🔗 ${articleUrl}`);
  console.log("\n👾 Reddit (Subreddit: r/" + copy.subreddit + "):");
  console.log(`Title: ${copy.reddit_title}`);
  console.log(`URL: ${articleUrl}`);
  console.log("----------------------\n");
  
  if (isDryRun) {
    console.log("⚠️ SOCIAL_DRY_RUN is true. Skipping actual API posting.");
    // We still mark it as shared in dry-run for testing purposes if you want, but usually better not to.
    return;
  }
  
  // LIVE POSTING
  try {
    // 1. Post to Twitter
    if (process.env.TWITTER_API_KEY) {
      console.log("🚀 Posting to X (Twitter)...");
      await twitterClient.v2.tweet(`${copy.twitter_body}\n\n${articleUrl}`);
      console.log("✅ Successfully tweeted!");
    } else {
      console.log("⚠️ Skipping Twitter: No API keys provided.");
    }
    
    // 2. Post to Reddit
    if (process.env.REDDIT_CLIENT_ID) {
      console.log(`🚀 Posting to r/${copy.subreddit}...`);
      await redditClient.getSubreddit(copy.subreddit).submitLink({
        title: copy.reddit_title,
        url: articleUrl
      });
      console.log("✅ Successfully posted to Reddit!");
    } else {
      console.log("⚠️ Skipping Reddit: No API keys provided.");
    }
    
    // 3. Mark as shared in database
    posts[unsharedPostIndex].socialShared = true;
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    console.log(`\n💾 Marked article as socialShared in posts.json`);
    
  } catch (error) {
    console.error("❌ Fatal Error during live posting:", error);
  }
}

runSocialAgent();
