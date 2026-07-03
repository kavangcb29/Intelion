export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: 'https://intelion.blogspot.com/sitemap.xml', // Replace with the actual domain later
  }
}
