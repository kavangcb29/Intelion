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

  return (
    <article className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <div style={{
          width: '100%',
          height: '300px',
          borderRadius: 'var(--radius-lg)',
          backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : 'url(/images/hero-abstract.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: post.imageUrl ? 'none' : `hue-rotate(${hueRotateAmount}deg) saturate(1.5)`,
          marginBottom: 'var(--spacing-lg)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}></div>
        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>{post.title}</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {new Date(post.published).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </header>

      <AdBanner />

      <div 
        className="post-content" 
        style={{ marginTop: 'var(--spacing-lg)', lineHeight: '1.8', fontSize: '1.125rem' }}
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

      <div style={{ marginTop: 'var(--spacing-xl)' }}>
        <AdBanner />
      </div>
    </article>
  );
}
