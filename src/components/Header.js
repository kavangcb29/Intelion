import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="header">
      <div className="container nav-container">
        <Link href="/" className="logo">
          Int3lion<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)' }}>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/latest-news">Latest News</Link>
            <Link href="/about">About</Link>
          </nav>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
