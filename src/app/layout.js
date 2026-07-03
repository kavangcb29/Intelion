import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Int3lion | Advanced Technology & AI Insights",
  description: "Int3lion provides cutting-edge news, analysis, and insights on Artificial Intelligence, Quantum Computing, Startups, Cybersecurity, Software, SpaceTech, and Consumer Electronics.",
  keywords: "tech news, artificial intelligence, AI, machine learning, quantum computing, startups, cybersecurity, software engineering, gadgets, spacetech, programming, deep learning, consumer electronics, Web3, future technology trends, Int3lion, intelion",
  authors: [{ name: "Int3lion" }],
  creator: "Int3lion",
  publisher: "Int3lion Media",
  metadataBase: new URL("https://intelion.onrender.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Int3lion | Advanced Technology & AI Insights",
    description: "Your premium source for cutting-edge technology news and AI breakthroughs.",
    url: "https://intelion.onrender.com",
    siteName: "Int3lion",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Int3lion | Technology & AI",
    description: "The future of technology, today. Insights into AI, startups, and hardware.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
