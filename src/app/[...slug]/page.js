import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import latestNews from '@/data/latest-news.json';
import AdBanner from '@/components/AdBanner';

const allPosts = [...postsData, ...latestNews];

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugPath = '/' + resolvedParams.slug.join('/');
  const post = allPosts.find((p) => p.slug === slugPath);

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
  const slugPath = '/' + resolvedParams.slug.join('/');
  const post = allPosts.find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const hueRotateAmount = (post.title.length * 15) % 360;

  return (
    <article className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <div style={{
          width: '100%',
          height: '300px',
          borderRadius: 'var(--radius-lg)',
          backgroundImage: 'url(/images/hero-abstract.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `hue-rotate(${hueRotateAmount}deg) saturate(1.5)`,
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
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      <div style={{ marginTop: 'var(--spacing-xl)' }}>
        <AdBanner />
      </div>
    </article>
  );
}
