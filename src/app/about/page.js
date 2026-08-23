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
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          We are on a mission to decode the future. Bridging the gap between bleeding-edge technology and everyday understanding.
        </p>
      </section>

      {/* Main Content Card */}
      <section className="premium-card" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ padding: 'var(--spacing-lg)', lineHeight: '1.8', fontSize: '1.125rem' }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '2rem' }}>Our Story</h2>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            Welcome to Int3lion. Founded by Kavan, a passionate engineering student, this platform was built on the core belief that understanding technology is the most powerful tool for navigating the 21st century. 
          </p>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            What started as a deep personal curiosity for the inner workings of modern computing has evolved into a dedicated journalism platform. We track the sudden explosions of Artificial Intelligence, the quiet breakthroughs in Quantum Computing, and the relentless innovation in consumer electronics.
          </p>
          <p>
            At Int3lion, our goal is to cut through the corporate noise, decipher complex whitepapers, and deliver high-quality, actionable insights that keep our readers at the absolute forefront of human innovation.
          </p>
        </div>
      </section>

      {/* Grid Features */}
      <section className="grid-cards" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="premium-card" style={{ padding: 'var(--spacing-lg)' }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--spacing-sm)' }}>Our Mission</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            To empower the next generation of engineers, developers, and tech enthusiasts with the critical knowledge they need to build, adapt, and thrive in the future.
          </p>
        </div>
        
        <div className="premium-card" style={{ padding: 'var(--spacing-lg)' }}>
          <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--spacing-sm)' }}>The Vision</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            To become the world's most trusted, independent voice in technology journalism—driven entirely by a passion for truth, hardware, and algorithms.
          </p>
        </div>
      </section>

      {/* Contact / CTA */}
      <section style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0', borderTop: '1px solid var(--glass-border)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Join the Vanguard</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)', fontSize: '1.1rem' }}>
          Stay updated on the latest shifts in technology.
        </p>
        <a href="/" className="btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
          Read the Latest News
        </a>
      </section>

    </div>
  );
}
