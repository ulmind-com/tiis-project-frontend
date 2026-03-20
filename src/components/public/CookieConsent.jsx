import React, { useState, useEffect } from 'react';
import { X, Shield, ChevronRight } from 'lucide-react';
import { updateConsent } from '../../utils/visitorTracker';
import { useTheme } from '../../hooks/useTheme';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Always show on load/refresh as requested by the user
      const timer = setTimeout(() => setVisible(true), 100);
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

  // Glassmorphism optimized theme variables
  const themeVars = isDark
    ? {
      // Dark Glass: darker, more saturated blur tint
      bg: 'rgba(17, 17, 22, 0.6)',
      border: 'rgba(255, 255, 255, 0.08)',
      // Lighter top border for highlight effect
      borderTop: 'rgba(255, 255, 255, 0.15)',
      heading: 'rgba(255, 255, 255, 0.95)',
      text: 'rgba(255, 255, 255, 0.7)',
      iconBg: 'rgba(168, 85, 247, 0.15)',
      iconColor: '#a855f7',
      close: '#64748b',
      closeHover: '#f8fafc',
      btnAcceptBg: '#8b5cf6',
      btnAcceptHover: '#7c3aed',
      btnRejectBorder: 'rgba(255, 255, 255, 0.12)',
      btnRejectText: 'rgba(255, 255, 255, 0.9)',
      // Semi-transparent button on hover
      btnRejectHoverBg: 'rgba(255, 255, 255, 0.06)',
      btnRejectHoverBorder: 'rgba(255, 255, 255, 0.25)',
      footer: 'rgba(255, 255, 255, 0.4)',
      // Deep shadow for depth against background content
      shadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
    }
    : {
      // Light Glass: bright, milky blur tint
      bg: 'rgba(255, 255, 255, 0.65)',
      border: 'rgba(255, 255, 255, 0.4)',
      // Highlight border
      borderTop: 'rgba(255, 255, 255, 0.8)',
      heading: '#0f172a',
      text: '#475569',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: '#8b5cf6',
      close: '#94a3b8',
      closeHover: '#0f172a',
      btnAcceptBg: '#8b5cf6',
      btnAcceptHover: '#7c3aed',
      btnRejectBorder: 'rgba(0, 0, 0, 0.1)',
      btnRejectText: '#475569',
      btnRejectHoverBg: 'rgba(0, 0, 0, 0.03)',
      btnRejectHoverBorder: 'rgba(0, 0, 0, 0.2)',
      footer: 'rgba(0, 0, 0, 0.4)',
      // Softer shadow for light mode
      shadow: '0 20px 40px rgba(0, 0, 0, 0.06)'
    };

  return (
    <>
      <style>{`
        @keyframes cookieFadeRiseRight {
          from { opacity: 0; transform: translate(20px, 20px) scale(0.95); }
          to { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        .cookie-banner {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 99999;
          width: calc(100% - 4rem);
          max-width: 420px;
          
          /* Glassmorphism Core */
          background: ${themeVars.bg};
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          
          /* Glass Border Effect */
          border: 1px solid ${themeVars.border};
          border-top: 1px solid ${themeVars.borderTop}; 
          
          border-radius: 28px;
          padding: 1.75rem;
          color: ${themeVars.text};
          animation: cookieFadeRiseRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          box-shadow: ${themeVars.shadow};
          font-family: 'Inter', -apple-system, sans-serif;
          transition: background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          
          /* Ensures content stays crisp over blur */
          -webkit-font-smoothing: antialiased; 
        }
        .cookie-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .cookie-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .cookie-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: ${themeVars.iconBg};
          color: ${themeVars.iconColor};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.4s ease;
          /* Slight reflection inner shadow */
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1); 
        }
        .cookie-icon svg {
          opacity: 0.9;
        }
        .cookie-header h3 {
          margin: 0; 
          font-size: 1.3rem; 
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.2px;
          color: ${themeVars.heading};
          transition: color 0.4s ease;
        }
        .cookie-close {
          background: none; border: none; color: ${themeVars.close}; cursor: pointer; padding: 4px;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
          border-radius: 50%;
        }
        .cookie-close:hover { 
          color: ${themeVars.closeHover}; 
          background: rgba(255,255,255,0.1);
        }
        .cookie-text {
          font-size: 0.95rem; color: ${themeVars.text}; line-height: 1.6; margin-bottom: 2rem;
          margin-top: 0;
          transition: color 0.4s ease;
        }
        .cookie-btns {
          display: flex; gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .cookie-btn-accept {
          flex: 1; padding: 0.85rem 1rem; border: none; border-radius: 20px;
          background: ${themeVars.btnAcceptBg}; color: white;
          font-weight: 600; font-size: 0.95rem; cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 0.3rem;
          /* Vibrant shadow for primary action */
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4); 
        }
        .cookie-btn-accept:hover { 
          background: ${themeVars.btnAcceptHover}; 
          transform: translateY(-1px); 
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5); 
        }
        .cookie-btn-reject {
          flex: 1; padding: 0.85rem 1rem; border: 1px solid ${themeVars.btnRejectBorder}; border-radius: 20px;
          /* Glassy base for secondary button */
          background: rgba(255, 255, 255, 0.03); 
          color: ${themeVars.btnRejectText};
          font-weight: 600; font-size: 0.95rem; cursor: pointer;
          transition: all 0.2s;
        }
        .cookie-btn-reject:hover { 
          border-color: ${themeVars.btnRejectHoverBorder}; 
          background: ${themeVars.btnRejectHoverBg}; 
          color: ${themeVars.heading}; 
        }
        
        .cookie-footer {
          text-align: center;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.8px;
          color: ${themeVars.footer};
          text-transform: uppercase;
          transition: color 0.4s ease;
        }

        @media (max-width: 640px) {
          .cookie-banner {
            bottom: 1rem;
            right: 1rem;
            width: calc(100% - 2rem);
            padding: 1.5rem;
            border-radius: 24px;
          }
        }
        @media (max-width: 480px) {
          .cookie-btns {
            flex-direction: column;
            gap: 0.75rem;
          }
          .cookie-btn-accept, .cookie-btn-reject {
            width: 100%;
          }
        }
      `}</style>

      <div className="cookie-banner">
        <div className="cookie-header">
          <div className="cookie-header-left">
            <div className="cookie-icon">
              <Shield size={24} strokeWidth={2} />
            </div>
            <h3>Cookie Privacy</h3>
          </div>
          <button className="cookie-close" onClick={handleReject} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <p className="cookie-text">
          We use cookies to enhance your experience and analyze our traffic.
          By clicking "Accept", you help us improve our services.
        </p>

        <div className="cookie-btns">
          <button className="cookie-btn-accept" onClick={handleAccept}>
            Accept All <ChevronRight size={18} strokeWidth={2.5} />
          </button>
          <button className="cookie-btn-reject" onClick={handleReject}>
            Decline
          </button>
        </div>

        <div className="cookie-footer">
          Protecting your data & privacy
        </div>
      </div>
    </>
  );
};

export default CookieConsent;