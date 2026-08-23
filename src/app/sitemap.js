import postsData from '@/data/posts.json';
import latestNews from '@/data/latest-news.json';

export default function sitemap() {
  const baseUrl = 'https://intelion.onrender.com';
  
  const allPosts = [...postsData, ...latestNews];

  const postUrls = allPosts.map((post) => {
    // Ensure slug starts with /
    const cleanSlug = post.slug.startsWith('/') ? post.slug : `/${post.slug}`;
    
    return {
      url: `${baseUrl}${cleanSlug}`,
      lastModified: new Date(post.published),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/latest-news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postUrls,
  ];
}
