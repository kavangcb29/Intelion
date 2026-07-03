import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Int3lion - Tech News & AI Insights",
  description: "Int3lion provides the latest news and insights on technology, AI, quantum computing, and future trends. A premium destination for tech enthusiasts.",
  keywords: "tech news, AI, quantum computing, future trends, Int3lion",
  openGraph: {
    title: "Int3lion - Tech News & AI Insights",
    description: "Your daily source for tech updates.",
    url: "https://intelion.blogspot.com", // Assuming old domain or replace with actual
    siteName: "Int3lion",
    type: "website",
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
