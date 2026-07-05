"use client";
import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className="ad-banner" style={{ width: '100%', overflow: 'hidden', textAlign: 'center', margin: 'var(--spacing-md) 0' }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3571863616373313"
        data-ad-slot="ENTER_YOUR_AD_SLOT_ID_HERE"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
