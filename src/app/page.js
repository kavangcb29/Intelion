import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import postsData from "@/data/posts.json";
import { getTechmemeFeed } from "@/lib/fetchTechmeme";

export const revalidate = 3600; // Revalidate every hour for fresh daily news

export default async function Home() {
  const posts = postsData.filter((p) => p.type === "POST").slice(0, 6);
  const techmemeNews = await getTechmemeFeed();

  return (
    <div className="container">
      <section style={{ textAlign: "center", padding: "var(--spacing-xl) 0" }}>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", marginBottom: "var(--spacing-md)" }}>
          The Future of Tech, <span style={{ color: "var(--accent)" }}>Today.</span>
        </h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto var(--spacing-lg)" }}>
          Int3lion brings you the latest insights on Artificial Intelligence, Quantum Computing, and Next-Gen innovations.
        </p>
        <Link href="/latest-news" className="btn-primary">
          Read Latest News
        </Link>

        {/* Category Filter Navigation */}
        <div style={{ marginTop: "var(--spacing-xl)" }}>
          <h3 style={{ marginBottom: "var(--spacing-md)", color: "var(--text-muted)", fontSize: "1rem" }}>Explore by Category</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm)", justifyContent: "center" }}>
            {['AI', 'Smartphones', 'Startups', 'Cybersecurity', 'Software', 'Gadgets', 'Space', 'Programming'].map(cat => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.05)' }}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdBanner />

      <section style={{ padding: "var(--spacing-lg) 0" }}>
        <h2 style={{ marginBottom: "var(--spacing-lg)", borderBottom: "1px solid var(--card-border)", paddingBottom: "var(--spacing-sm)" }}>
          Recent Articles
        </h2>
        <div className="grid-cards">
          {posts.map((post, idx) => (
            <Link href={post.slug} key={idx} className="premium-card" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: 'hidden' }}>
              <div style={{
                height: '160px',
                width: '100%',
                backgroundImage: 'url(/images/hero-abstract.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: `hue-rotate(${idx * 75}deg) saturate(1.5)`
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
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: "var(--spacing-lg) 0", marginTop: "var(--spacing-lg)" }}>
        <h2 style={{ marginBottom: "var(--spacing-lg)", borderBottom: "1px solid var(--card-border)", paddingBottom: "var(--spacing-sm)" }}>
          Automated Daily Updates (Techmeme)
        </h2>
        <div className="grid-cards">
          {techmemeNews.map((news, idx) => (
            <a href={news.link} target="_blank" rel="noreferrer" key={`tm-${idx}`} className="premium-card" style={{ display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "var(--spacing-sm)" }}>{news.title}</h3>
              <p style={{ fontSize: "0.875rem", flex: 1, color: "var(--text-muted)" }}>
                {news.snippet.substring(0, 100)}...
              </p>
              <span style={{ color: "var(--accent)", fontSize: "0.875rem", fontWeight: 500, marginTop: "var(--spacing-md)" }}>
                Source: Techmeme &rarr;
              </span>
            </a>
          ))}
        </div>
      </section>

      <AdBanner />
    </div>
  );
}
