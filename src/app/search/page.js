import Link from 'next/link';
import postsData from '@/data/posts.json';
import latestNews from '@/data/latest-news.json';

const allPosts = [...postsData, ...latestNews];

export const metadata = {
  title: 'Search Results - Int3lion',
  description: 'Search for articles on Int3lion',
};

// This must be an async component to correctly await searchParams in Next.js 15+
export default async function SearchPage({ searchParams }) {
  const query = (await searchParams).q || '';
  const lowercaseQuery = query.toLowerCase();

  const results = allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) || 
    post.content.toLowerCase().includes(lowercaseQuery)
  );

  return (
    <main className="container main-content">
      <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h1>Search Results</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Found {results.length} results for <strong style={{ color: '#fff' }}>"{query}"</strong>
        </p>
      </header>

      {results.length > 0 ? (
        <div className="grid-cards">
          {results.map((post) => (
            <Link href={post.slug} key={post.slug} className="premium-card">
              <div 
                style={{ 
                  height: '180px', 
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-md)',
                  backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : 'url(/images/hero-abstract.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: post.imageUrl ? 'none' : `hue-rotate(${(post.title.length * 15) % 360}deg) saturate(1.2)`
                }}
              />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{post.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                {new Date(post.published).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0', color: 'var(--text-muted)' }}>
          <svg style={{ margin: '0 auto var(--spacing-md)', display: 'block', opacity: 0.5 }} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <p>We couldn't find any articles matching your search.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: 'var(--spacing-lg)' }}>Return Home</Link>
        </div>
      )}
    </main>
  );
}
