import postsData from '@/data/posts.json';
import latestNews from '@/data/latest-news.json';

const allPosts = [...postsData, ...latestNews];
const URL = 'https://intelion.blogspot.com'; // Replace with the actual live domain later

export default function sitemap() {
  const routes = ['', '/latest-news'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const postRoutes = allPosts.map((post) => ({
    url: `${URL}${post.slug}`,
    lastModified: post.published,
  }));

  return [...routes, ...postRoutes];
}
