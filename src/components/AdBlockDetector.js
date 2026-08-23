"use client";
import { useEffect, useState } from 'react';

export default function AdBlockDetector() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Only run on client, and only check once per session
    if (sessionStorage.getItem('adblock_popup_seen')) return;

    const checkAdBlocker = async () => {
      try {
        // We try to fetch a known ad script. Ad blockers will intercept and block this network request.
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
        });
        // If it gets here without throwing, there is no network-level ad blocker.
      } catch (error) {
        // The fetch threw an error, meaning an ad blocker intercepted the request!
        setTimeout(() => {
          setShowPopup(true);
        }, 5000);
      }
    };

    // Check when window fully loads
    if (document.readyState === 'complete') {
      checkAdBlocker();
    } else {
      window.addEventListener('load', checkAdBlocker);
      return () => window.removeEventListener('load', checkAdBlocker);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('adblock_popup_seen', 'true');
  };

  if (!showPopup) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(20, 20, 25, 0.95)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px inset rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          background: 'rgba(255, 50, 50, 0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1.5rem',
          color: '#ff4444'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--foreground)' }}>
          Ad Blocker Detected
        </h2>
        
        <p style={{ color: 'var(--foreground-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          We noticed you're using an ad blocker. Int3lion relies on advertising revenue to keep our high-quality tech journalism completely free. 
          <br/><br/>
          Please consider supporting us by disabling your ad blocker or whitelisting this site.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            I've Disabled It (Refresh Page)
          </button>
          
          <button 
            onClick={handleClose}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--foreground-muted)', 
              textDecoration: 'underline', 
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--foreground)'}
            onMouseOut={(e) => e.target.style.color = 'var(--foreground-muted)'}
          >
            Continue without supporting
          </button>
        </div>
      </div>
    </div>
  );
}
