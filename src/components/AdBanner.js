"use client";
import { useEffect, useState } from "react";

export default function AdBanner({ isSticky }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const adWidth = isSticky ? 320 : 728;
  const adHeight = isSticky ? 50 : 90;

  // The raw HTML snippet provided by Adsterra
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }</style>
      </head>
      <body>
        <script type="text/javascript">
          var atOptions = {
            'key' : 'dfdf7d00015faafd2d88c298792dd982',
            'format' : 'iframe',
            'height' : ${adHeight},
            'width' : ${adWidth},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highrevenueformat.com/dfdf7d00015faafd2d88c298792dd982/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div 
      className={`ad-banner-wrapper ${isSticky ? 'sticky-ad' : ''}`}
      style={{ 
        width: '100%', 
        overflow: 'hidden', 
        textAlign: 'center', 
        margin: isSticky ? '0' : 'var(--spacing-md) 0',
        minHeight: isSticky ? '50px' : '100px', 
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
      {isMounted && (
        <iframe
          title="Adsterra Banner"
          srcDoc={adHtml}
          width={adWidth}
          height={adHeight}
          frameBorder="0"
          scrolling="no"
          style={{ 
            border: 'none', 
            overflow: 'hidden', 
            width: `${adWidth}px`, 
            height: `${adHeight}px`,
            display: 'block'
          }}
        />
      )}
    </div>
  );
}
