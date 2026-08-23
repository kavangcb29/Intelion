"use client";
import { useEffect, useState } from "react";

export default function AdBanner({ isSticky }) {
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
      setAdBlocked(true);
    }
    
    // Check if AdBlocker is active by seeing if adsbygoogle script was blocked
    setTimeout(() => {
      if (!window.adsbygoogle || !window.adsbygoogle.loaded) {
        setAdBlocked(true);
      }
    }, 2000);
  }, []);

  if (adBlocked) return null;

  return (
    <div 
      className={`ad-banner-wrapper ${isSticky ? 'sticky-ad' : ''}`}
      style={{ 
        width: '100%', 
        overflow: 'hidden', 
        textAlign: 'center', 
        margin: isSticky ? '0' : 'var(--spacing-md) 0',
        minHeight: '100px', // Prevents CLS Layout Shift
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isSticky ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 0.02)',
        borderRadius: isSticky ? '0' : 'var(--radius-md)',
        borderTop: isSticky ? '1px solid var(--glass-border)' : 'none',
        backdropFilter: isSticky ? 'blur(10px)' : 'none',
        position: isSticky ? 'fixed' : 'relative',
        bottom: isSticky ? '0' : 'auto',
        left: isSticky ? '0' : 'auto',
        zIndex: isSticky ? 99 : 1
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", minWidth: "300px", minHeight: "90px" }}
        data-ad-client="ca-pub-3571863616373313"
        data-ad-slot="ENTER_YOUR_AD_SLOT_ID_HERE"
        data-ad-format={isSticky ? "horizontal" : "auto"}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
