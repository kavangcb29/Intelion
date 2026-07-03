export const metadata = {
  title: "About Us - Int3lion",
  description: "Learn more about the Int3lion tech blog and our mission.",
};

export default function About() {
  return (
    <div className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-lg)' }}>
      <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>About Int3lion</h1>
      <div className="post-content" style={{ lineHeight: '1.8' }}>
        <p>Heyya I'm Kavan, an engineering student and the founder of Int3lion!</p>
        <p>Int3lion was born out of a passion for understanding the future. Our mission is to bridge the gap between complex technological advancements and everyday understanding. We cover everything from Artificial Intelligence and Machine Learning to Quantum Computing and the Internet of Things (IoT).</p>
        <p>Our team of tech enthusiasts and AI agents work tirelessly to curate, analyze, and deliver the most impactful news happening in the tech world today. We believe that technology should be accessible, and staying informed is the first step towards adapting to the rapidly changing digital landscape.</p>
        <p>Thank you for being part of our community. Stay curious!</p>
      </div>
    </div>
  );
}
