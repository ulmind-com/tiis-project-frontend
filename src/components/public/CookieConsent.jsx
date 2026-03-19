import React, { useState, useEffect } from 'react';
import { Cookie, X, Shield } from 'lucide-react';
import { getCookieConsent, updateConsent } from '../../utils/visitorTracker';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent === 'pending') {
      // Small delay so it doesn't flash immediately
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    updateConsent('accepted');
    setVisible(false);
  };

  const handleReject = () => {
    updateConsent('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cookie-banner {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 99999;
          width: calc(100% - 2rem);
          max-width: 520px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 1.5rem;
          color: white;
          animation: cookieSlideUp 0.5s ease forwards;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          font-family: 'Inter', -apple-system, sans-serif;
        }
        .cookie-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .cookie-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cookie-header h3 {
          margin: 0; font-size: 1rem; font-weight: 700;
        }
        .cookie-header p {
          margin: 0.15rem 0 0 0; font-size: 0.75rem; color: #94a3b8;
          display: flex; align-items: center; gap: 0.3rem;
        }
        .cookie-text {
          font-size: 0.85rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1.2rem;
        }
        .cookie-btns {
          display: flex; gap: 0.75rem;
        }
        .cookie-btn-accept {
          flex: 1; padding: 0.7rem 1rem; border: none; border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;
          font-weight: 600; font-size: 0.85rem; cursor: pointer;
          transition: all 0.2s;
        }
        .cookie-btn-accept:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(59,130,246,0.35); }
        .cookie-btn-reject {
          flex: 1; padding: 0.7rem 1rem; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;
          background: rgba(255,255,255,0.05); color: #94a3b8;
          font-weight: 600; font-size: 0.85rem; cursor: pointer;
          transition: all 0.2s;
        }
        .cookie-btn-reject:hover { border-color: rgba(255,255,255,0.25); color: white; }
        .cookie-close {
          position: absolute; top: 0.75rem; right: 0.75rem;
          background: none; border: none; color: #475569; cursor: pointer; padding: 4px;
        }
        .cookie-close:hover { color: #94a3b8; }
      `}</style>

      <div className="cookie-banner">
        <button className="cookie-close" onClick={handleReject} aria-label="Close">
          <X size={18} />
        </button>

        <div className="cookie-header">
          <div className="cookie-icon">
            <Cookie size={22} />
          </div>
          <div>
            <h3>We value your privacy</h3>
            <p><Shield size={12} /> Your data is encrypted & secure</p>
          </div>
        </div>

        <p className="cookie-text">
          We use cookies and analytics to understand how you use our site and improve your experience. 
          By accepting, you help us serve you better.
        </p>

        <div className="cookie-btns">
          <button className="cookie-btn-accept" onClick={handleAccept}>Accept All</button>
          <button className="cookie-btn-reject" onClick={handleReject}>Decline</button>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
