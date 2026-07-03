export const metadata = {
  title: "Terms of Service - Int3lion",
  description: "Terms of Service for Int3lion tech blog.",
};

export default function TermsOfService() {
  return (
    <div className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>Terms of Service</h1>
      <div className="post-content" style={{ lineHeight: '1.8' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Terms</h2>
        <p>By accessing this Website, accessible from https://intelion.blogspot.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>
        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials on Int3lion's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul>
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose or for any public display;</li>
          <li>attempt to reverse engineer any software contained on Int3lion's Website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <h2>3. Disclaimer</h2>
        <p>All the materials on Int3lion's Website are provided "as is". Int3lion makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Int3lion does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
      </div>
    </div>
  );
}
