import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import latestNews from '@/data/latest-news.json';
import AdBanner from '@/components/AdBanner';

const allPosts = [...postsData, ...latestNews];

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  
  // Normalize by stripping leading slash from both for comparison
  const post = allPosts.find((p) => p.slug.replace(/^\//, '') === slugPath);

  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: `${post.title} - Int3lion`,
    description: post.content.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...',
  };
}

export function generateStaticParams() {
  return allPosts.map((post) => {
    const slugParts = post.slug.replace(/^\//, '').split('/');
    return { slug: slugParts };
  });
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  
  // Normalize by stripping leading slash
  const post = allPosts.find((p) => p.slug.replace(/^\//, '') === slugPath);

  if (!post) {
    notFound();
  }

  const hueRotateAmount = (post.title.length * 15) % 360;

  // Split content to inject AdBanner after the 3rd paragraph
  const contentParts = post.content.split('</p>');
  let firstHalf = post.content;
  let secondHalf = '';

  if (contentParts.length > 3) {
    firstHalf = contentParts.slice(0, 3).join('</p>') + '</p>';
    secondHalf = contentParts.slice(3).join('</p>');
  }

  // Calculate Read Time
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Get 3 random related articles
  const relatedArticles = allPosts
    .filter(p => p.slug !== post.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <article className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <div style={{
          width: '100%',
          height: '350px',
          borderRadius: 'var(--radius-lg)',
          backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : 'url(/images/hero-abstract.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: post.imageUrl ? 'none' : `hue-rotate(${hueRotateAmount}deg) saturate(1.5)`,
          marginBottom: 'var(--spacing-lg)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}></div>
        <h1 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>{post.title}</h1>
        <div style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
          <span>
            {new Date(post.published).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {readTime} min read
          </span>
        </div>
      </header>

      <AdBanner />

      <div 
        className="post-content" 
        style={{ marginTop: 'var(--spacing-lg)', lineHeight: '1.9', fontSize: '1.25rem' }}
      >
        <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
        
        {/* In-Article High Converting Ad */}
        {secondHalf && (
          <div style={{ margin: 'var(--spacing-xl) 0' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Advertisement</div>
            <AdBanner />
          </div>
        )}

        {secondHalf && <div dangerouslySetInnerHTML={{ __html: secondHalf }} />}
      </div>

      {/* Adsterra Smart Link (Direct Link) Button */}
      <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
        <a 
          href="https://www.profitableratecpmnetwork.com/w1wf6wzw?key=0671792f0952ef6eeb83f802c7911b6e" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-block', fontSize: '1.1rem', padding: '12px 24px' }}
        >
          View Exclusive Tech Offers &rarr;
        </a>
      </div>

      <div style={{ marginTop: 'var(--spacing-xl)' }}>
        <AdBanner />
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: 'var(--spacing-lg)' }}>More from Int3lion</h3>
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {relatedArticles.map(related => (
              <a href={related.slug} key={related.slug} className="premium-card" style={{ padding: 'var(--spacing-md)' }}>
                <div 
                  style={{ 
                    height: '140px', 
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-md)',
                    backgroundImage: related.imageUrl ? `url(${related.imageUrl})` : 'url(/images/hero-abstract.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: related.imageUrl ? 'none' : `hue-rotate(${(related.title.length * 15) % 360}deg) saturate(1.2)`
                  }}
                />
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', lineHeight: '1.4' }}>{related.title}</h4>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
