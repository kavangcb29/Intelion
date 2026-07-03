import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="container nav-container">
        <Link href="/" className="logo">
          Int3lion<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/latest-news">Latest News</Link>
          <Link href="/p/about.html">About</Link>
        </nav>
      </div>
    </header>
  );
}
