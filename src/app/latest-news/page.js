import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import latestNews from "@/data/latest-news.json";

export const metadata = {
  title: "Latest Tech News - Int3lion",
  description: "Stay updated with the absolute latest news in technology, artificial intelligence, and cutting-edge innovations.",
};

export default function LatestNews() {
  return (
    <div className="container">
      <section style={{ padding: "var(--spacing-xl) 0 var(--spacing-lg)" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "var(--spacing-md)" }}>
          Latest Tech News
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-muted)" }}>
          Curated updates powered by our early-stage AI agent framework.
        </p>
      </section>

      <AdBanner />

      <section style={{ padding: "var(--spacing-lg) 0" }}>
        <div className="grid-cards">
          {latestNews.map((news, idx) => (
            <Link href={news.slug} key={idx} className="premium-card" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: 'hidden' }}>
              <div style={{
                height: '160px',
                width: '100%',
                backgroundImage: 'url(/images/hero-abstract.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: `hue-rotate(${idx * 45}deg) saturate(1.5)`
              }}></div>
              <div style={{ padding: "var(--spacing-md)", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.125rem", marginBottom: "var(--spacing-sm)" }}>{news.title}</h3>
                <p style={{ fontSize: "0.875rem", flex: 1 }}>
                  {new Date(news.published).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <span style={{ color: "var(--accent)", fontSize: "0.875rem", fontWeight: 500, marginTop: "var(--spacing-sm)" }}>
                  Read full story &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div style={{ marginTop: "var(--spacing-xl)" }}>
        <AdBanner />
      </div>
    </div>
  );
}
