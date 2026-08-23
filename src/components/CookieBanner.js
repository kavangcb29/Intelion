"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px', // Above sticky ad
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '500px',
      background: 'rgba(20, 20, 25, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--spacing-md)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#fff' }}>We use cookies 🍪</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            We use cookies to personalize content and ads, provide social media features, and analyze our traffic to optimize your experience.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--spacing-md)', gap: 'var(--spacing-sm)' }}>
        <button 
          onClick={() => setShow(false)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          Decline
        </button>
        <button 
          onClick={acceptCookies}
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 16px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
