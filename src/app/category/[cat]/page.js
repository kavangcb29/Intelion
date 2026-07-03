import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function generateStaticParams() {
  const categories = ['ai', 'smartphones', 'startups', 'cybersecurity', 'software', 'gadgets', 'space', 'programming'];
  return categories.map((cat) => ({ cat }));
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const { cat } = resolvedParams;
  
  const latestNewsPath = path.join(process.cwd(), 'src/data/latest-news.json');
  let news = [];
  if (fs.existsSync(latestNewsPath)) {
    const raw = fs.readFileSync(latestNewsPath, 'utf8');
    news = JSON.parse(raw);
  }

  // Fallback category matching (case-insensitive)
  const categoryNews = news.filter(n => n.type === 'LATEST_NEWS' && n.category && n.category.toLowerCase() === cat.toLowerCase());
  const displayTitle = cat.charAt(0).toUpperCase() + cat.slice(1);

  return (
    <div className="container" style={{ padding: "var(--spacing-xl) 0" }}>
      <header style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>{displayTitle} News</h1>
        <p style={{ color: 'var(--text-muted)' }}>The latest updates and deep dives in {displayTitle}.</p>
      </header>

      <div className="grid-cards">
        {categoryNews.length > 0 ? (
          categoryNews.map((post, idx) => (
            <Link href={post.slug} key={idx} className="premium-card" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: 'hidden' }}>
              <div style={{
                height: '160px',
                width: '100%',
                backgroundImage: 'url(/images/hero-abstract.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: `hue-rotate(${idx * 45}deg) saturate(1.5)`
              }}></div>
              <div style={{ padding: "var(--spacing-md)", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.125rem", marginBottom: "var(--spacing-sm)" }}>{post.title}</h3>
                <p style={{ fontSize: "0.875rem", flex: 1 }}>
                  {new Date(post.published).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <span style={{ color: "var(--accent)", fontSize: "0.875rem", fontWeight: 500, marginTop: "var(--spacing-sm)" }}>
                  Read article &rarr;
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>
            New articles for this category are currently being generated. Check back in a few minutes!
          </p>
        )}
      </div>
    </div>
  );
}
