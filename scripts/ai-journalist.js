require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');
const { GoogleGenAI } = require('@google/genai');

const parser = new Parser();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function runJournalist() {
  console.log("🚀 Booting Autonomous AI Journalist...");

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ CRITICAL ERROR: GEMINI_API_KEY environment variable is missing.");
    process.exit(1);
  }

  // 1. Research Phase: Fetch Top Global Tech News
  console.log("📰 Fetching global tech news from TechCrunch & Techmeme...");
  let rawNews = [];
  try {
    const feeds = [
      'https://www.techmeme.com/feed.xml',
      'https://techcrunch.com/feed/'
    ];
    
    for (const url of feeds) {
      const feed = await parser.parseURL(url);
      rawNews.push(...feed.items.slice(0, 10)); // Take top 10 from each
    }
  } catch (err) {
    console.error("Failed to fetch RSS:", err);
    process.exit(1);
  }

  const headlinesText = rawNews.map((item, idx) => `[${idx}] TITLE: ${item.title} | SNIPPET: ${item.contentSnippet?.substring(0, 200)}`).join('\n');

  // 2. SEO Evaluation Phase: Select Top 5
  console.log("🧠 Evaluating topics for maximum SEO and Affiliate potential...");
  const currentDateString = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const seoPrompt = `
    You are an expert SEO Strategist and Affiliate Marketer. 
    The current date is ${currentDateString}. It is the year 2026.
    Here are the latest global tech headlines pulled today:
    ${headlinesText}

    Task:
    1. Select exactly 5 topics that have the HIGHEST combined potential for:
       - Organic Search Traffic (Prioritize long-tail keywords, viral tech questions, and low-competition/high-volume search queries).
       - Affiliate Marketing Conversions (prioritizing consumer hardware, gadgets, laptops, smartphones, GPUs, or electronics).
    2. STRICT TIMELINE RULE: ONLY select topics about hardware/software that is PRE-RELEASE (leaks, rumors, upcoming within 1-2 months) or was JUST RELEASED (within the last 1-2 months).
       - Pre-release articles and leak roundups are highly preferred as they gain massive traction.
    3. Focus on AI, ML, Cyber Security, and cutting-edge consumer tech.
    
    Output exactly a JSON array of the 5 chosen topics with the following structure:
    [
      { "original_index": number, "seo_optimized_title": "A highly clickable, SEO-friendly title", "slug": "seo-friendly-url-slug-string", "topic_summary": "brief summary of what to write" }
    ]
    Do not output any markdown formatting, only the raw JSON array.
  `;

  let selectedTopics = [];
  try {
    const seoResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: seoPrompt,
      config: {
        temperature: 0.3
      }
    });
    let rawText = seoResponse.text.replace(/```json/g, '').replace(/```/g, '').trim();
    selectedTopics = JSON.parse(rawText);
  } catch (err) {
    console.error("❌ SEO Selection failed:", err);
    process.exit(1);
  }

  console.log(`✅ Selected Top 10 Topics: ${selectedTopics.map(t => t.seo_optimized_title).join(', ')}`);

  // 3. Writing Phase: Generate Articles
  const newArticles = [];
  const currentDate = new Date().toISOString();
  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < selectedTopics.length; i++) {
    const topic = selectedTopics[i];
    console.log(`✍️ Writing article ${i + 1}/5: ${topic.seo_optimized_title}...`);
    
    const amazonTag = process.env.AMAZON_AFFILIATE_TAG || 'kavansudev-21';

    const writerPrompt = `
      You are an expert, award-winning technology journalist writing for a premium publication called "Int3lion".
      The current date is ${currentDateString}. It is the year 2026. 
      CRITICAL INSTRUCTION: Do NOT write about older generations of hardware as if they are brand new. Always assume the context is for the latest cutting-edge tech of 2026.
      FOCUS: Frame the article around upcoming, pre-release hype (leaks, expected specs, rumors) if the product is coming out soon, or as a cutting-edge review if it was released within the last 1-2 months. Build immense excitement for what's next.
      
      Topic: ${topic.topic_summary}
      Title: ${topic.seo_optimized_title}
      
      Task: Write a comprehensive, highly engaging, and SEO-optimized long-form article (at least 600 words) about this topic.
      
      Formatting Requirements:
      - The output MUST be raw HTML. Do NOT include <html>, <head>, or <body> tags. Just the HTML content.
      - Do NOT wrap the output in markdown \`\`\`html blocks.
      - Use <p> for paragraphs.
      - Use <h2> for subheadings (make them catchy and SEO friendly).
      - Use <strong> for emphasis on key tech terms.
      - Use <ul> and <li> for lists if applicable.
      - Write in a highly authoritative, engaging, and modern tone.
      - MONETIZATION (AMAZON ASSOCIATES): If an article is about consumer hardware, electronics, or tech products, you MUST seamlessly weave in a highly-converting call-to-action to check the price on Amazon.
        - Use this exact link format: <a href="https://www.amazon.com/s?k=[URL_ENCODED_PRODUCT_NAME]&tag=${amazonTag}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); font-weight: bold; text-decoration: underline;">Check the latest price on Amazon</a>
        - Place this naturally near the end of the article or after discussing the product's specs.
    `;

    try {
      const articleResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: writerPrompt,
        config: {
          temperature: 0.7
        }
      });
      
      let htmlContent = articleResponse.text.replace(/```html/g, '').replace(/```/g, '').trim();

      newArticles.push({
        title: topic.seo_optimized_title,
        content: htmlContent,
        published: currentDate,
        slug: topic.slug,
        type: "POST"
      });

      // Wait 5 seconds to bypass free-tier rate limits (15 RPM)
      if (i < selectedTopics.length - 1) {
        console.log("⏳ Pausing for 5 seconds to respect API rate limits...");
        await delay(5000);
      }
    } catch (err) {
      console.error(`❌ Failed to write article ${i+1}:`, err);
    }
  }

  if (newArticles.length === 0) {
    console.error("❌ No articles generated. Exiting.");
    process.exit(1);
  }

  // 4. Database Update Phase
  console.log("💾 Saving articles to database...");
  const dbPath = path.join(__dirname, '../src/data/posts.json');
  let currentPosts = [];
  if (fs.existsSync(dbPath)) {
    currentPosts = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }

  // Prepend new articles to the top of the feed
  const updatedPosts = [...newArticles, ...currentPosts];
  
  fs.writeFileSync(dbPath, JSON.stringify(updatedPosts, null, 2));
  console.log(`🎉 SUCCESS! ${newArticles.length} new articles published.`);
}

runJournalist();
