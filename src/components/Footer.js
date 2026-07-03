import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--card-border)', marginTop: 'auto', padding: 'var(--spacing-xl) 0' }}>
      <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
          <Link href="/about" style={{ textDecoration: 'none' }}>About Us</Link>
          <Link href="/contact" style={{ textDecoration: 'none' }}>Contact Us</Link>
          <Link href="/privacy" style={{ textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ textDecoration: 'none' }}>Terms of Service</Link>
        </div>
        <p style={{ fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} Int3lion. All rights reserved.</p>
        <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.75rem' }}>Empowering the future through technology and AI insights.</p>
      </div>
    </footer>
  );
}
