"use client";
import { useEffect, useRef } from "react";

export default function AdBanner({ isSticky }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Prevent multiple injections in strict mode
    if (bannerRef.current && bannerRef.current.innerHTML !== '') return;
    
    if (bannerRef.current) {
      // ADSTERRA CONFIGURATION
      // Update these values when you get your specific Adsterra Ad Unit
      const atOptions = {
        'key' : 'YOUR_ADSTERRA_KEY_HERE', 
        'format' : 'iframe',
        'height' : isSticky ? 50 : 90,
        'width' : isSticky ? 320 : 728,
        'params' : {}
      };

      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `var atOptions = ${JSON.stringify(atOptions)};`;
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`;

      bannerRef.current.appendChild(script1);
      bannerRef.current.appendChild(script2);
    }
  }, [isSticky]);

  return (
    <div 
      className={`ad-banner-wrapper ${isSticky ? 'sticky-ad' : ''}`}
      style={{ 
        width: '100%', 
        overflow: 'hidden', 
        textAlign: 'center', 
        margin: isSticky ? '0' : 'var(--spacing-md) 0',
        minHeight: isSticky ? '50px' : '100px', // Prevents CLS Layout Shift
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
      <div ref={bannerRef} className="adsterra-container" style={{ display: "flex", justifyContent: "center" }}></div>
    </div>
  );
}
