export const metadata = {
  title: "About Us | Int3lion",
  description: "Learn more about the Int3lion tech blog and our mission.",
};

export default function About() {
  return (
    <div className="container" style={{ maxWidth: '900px', padding: 'var(--spacing-xl) 0' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: 'var(--spacing-md)' }}>
          Behind <span style={{ color: 'var(--accent)' }}>Int3lion.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          We are on a mission to decode the future. Bridging the gap between bleeding-edge technology and everyday understanding.
        </p>
      </section>

      {/* Main Content Card */}
      <section className="premium-card" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ padding: 'var(--spacing-lg)', lineHeight: '1.8', fontSize: '1.125rem' }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Our Story</h2>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            Heyya! I'm <strong>Kavan</strong>, an engineering student and the founder of Int3lion. 
            [YOUR CUSTOM TEXT HERE: You can write about why you started the blog, your background, or what drives your passion for technology.]
          </p>
          <p>
            Int3lion was born out of a profound curiosity for understanding what comes next. Whether it's the sudden explosion of Artificial Intelligence, breakthroughs in Quantum Computing, or the relentless innovation in consumer electronics, our goal is to cut through the noise and deliver high-quality, actionable insights.
          </p>
        </div>
      </section>

      {/* Grid Features */}
      <section className="grid-cards" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="premium-card" style={{ padding: 'var(--spacing-lg)' }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--spacing-sm)' }}>Our Mission</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            [YOUR TEXT HERE: e.g., To empower the next generation of engineers, developers, and tech enthusiasts with the knowledge they need to build the future.]
          </p>
        </div>
        
        <div className="premium-card" style={{ padding: 'var(--spacing-lg)' }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--spacing-sm)' }}>The Vision</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            [YOUR TEXT HERE: e.g., To become the world's most trusted independent voice in technology journalism and AI research.]
          </p>
        </div>
      </section>

      {/* Contact / CTA */}
      <section style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0', borderTop: '1px solid var(--glass-border)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Want to collaborate?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }}>
          We're always looking for guest writers, tech enthusiasts, and partners.
        </p>
        <a href="/contact" className="btn-primary">
          Get in Touch
        </a>
      </section>

    </div>
  );
}
