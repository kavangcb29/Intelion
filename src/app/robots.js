export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/social-queue',
    },
    sitemap: 'https://intelion.onrender.com/sitemap.xml',
  };
}
