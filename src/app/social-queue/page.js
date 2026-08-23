"use client";
import queueData from '@/data/social-queue.json';
import { useState } from 'react';

export default function SocialQueuePage() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "var(--foreground)" }}>Social Command Center</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "1.1rem" }}>
        Your daily AI-generated Reddit and Twitter posts are waiting for you here.
      </p>

      {queueData.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", background: "var(--glass-bg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--glass-border)" }}>
          <p style={{ color: "var(--text-muted)" }}>The queue is currently empty. The AI will populate this at 5:00 AM.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {queueData.map((item, index) => (
            <div key={index} style={{ 
              background: "var(--glass-bg)", 
              border: "1px solid var(--glass-border)", 
              borderRadius: "var(--radius-lg)", 
              padding: "2rem",
              backdropFilter: "blur(12px)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <h3 style={{ color: "var(--foreground)", marginBottom: "0.25rem" }}>{item.articleTitle}</h3>
                  <p style={{ color: "var(--accent)", fontSize: "0.9rem" }}>{new Date(item.dateAdded).toLocaleString()}</p>
                </div>
                <a href={item.articleUrl} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "underline", fontSize: "0.9rem" }}>View Article</a>
              </div>

              {/* Reddit Section */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", background: "#ff4500" }}></span>
                  <strong style={{ color: "var(--foreground)" }}>Reddit</strong>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>(r/{item.subreddit})</span>
                </div>
                
                <div style={{ 
                  background: "rgba(0,0,0,0.3)", 
                  padding: "1rem", 
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative"
                }}>
                  <p style={{ color: "var(--foreground)", marginBottom: "0.5rem", fontWeight: "bold" }}>{item.redditTitle}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", wordBreak: "break-all" }}>{item.articleUrl}</p>
                  
                  <button 
                    onClick={() => copyToClipboard(`${item.redditTitle}\n\n${item.articleUrl}`, `reddit-${index}`)}
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: copiedIndex === `reddit-${index}` ? "var(--accent)" : "rgba(255,255,255,0.1)",
                      color: copiedIndex === `reddit-${index}` ? "#000" : "var(--foreground)",
                      border: "none",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      transition: "all 0.2s"
                    }}
                  >
                    {copiedIndex === `reddit-${index}` ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Twitter Section */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "50%", background: "#1DA1F2" }}></span>
                  <strong style={{ color: "var(--foreground)" }}>Twitter / X</strong>
                </div>
                
                <div style={{ 
                  background: "rgba(0,0,0,0.3)", 
                  padding: "1rem", 
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative"
                }}>
                  <p style={{ color: "var(--foreground)", marginBottom: "0.5rem", whiteSpace: "pre-wrap" }}>{item.twitter}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", wordBreak: "break-all" }}>{item.articleUrl}</p>
                  
                  <button 
                    onClick={() => copyToClipboard(`${item.twitter}\n\n${item.articleUrl}`, `twitter-${index}`)}
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: copiedIndex === `twitter-${index}` ? "var(--accent)" : "rgba(255,255,255,0.1)",
                      color: copiedIndex === `twitter-${index}` ? "#000" : "var(--foreground)",
                      border: "none",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      transition: "all 0.2s"
                    }}
                  >
                    {copiedIndex === `twitter-${index}` ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
