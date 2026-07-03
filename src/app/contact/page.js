export const metadata = {
  title: "Contact Us - Int3lion",
  description: "Contact the Int3lion team for inquiries, partnerships, and support.",
};

export default function Contact() {
  return (
    <div className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>Contact Us</h1>
      <div className="post-content" style={{ lineHeight: '1.8' }}>
        <p>If you have any questions, suggestions, or partnership inquiries, we would love to hear from you.</p>
        
        <div className="premium-card" style={{ marginTop: 'var(--spacing-lg)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Get in Touch</h3>
          <p><strong>Email:</strong> contact@intelion.tech</p>
          <p><strong>Address:</strong> Tech Hub Center, Innovation Drive, Silicon Valley, CA 94000</p>
          
          <p style={{ marginTop: 'var(--spacing-md)' }}>
            We typically respond to all inquiries within 24-48 business hours. For press and media, please include "PRESS" in your subject line.
          </p>
        </div>
      </div>
    </div>
  );
}
