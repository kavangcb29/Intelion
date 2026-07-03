export const metadata = {
  title: "Privacy Policy - Int3lion",
  description: "Privacy Policy for Int3lion tech blog.",
};

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>Privacy Policy</h1>
      <div className="post-content" style={{ lineHeight: '1.8' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Introduction</h2>
        <p>Welcome to Int3lion. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
        <h2>2. Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul>
          <li><strong>Usage Data:</strong> Includes information about how you use our website, products and services.</li>
          <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        </ul>
        <h2>3. Google AdSense & Cookies</h2>
        <p>We use Google AdSense to display ads on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{color: 'var(--accent)'}}>Google Ads Settings</a>.</p>
        <h2>4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
      </div>
    </div>
  );
}
