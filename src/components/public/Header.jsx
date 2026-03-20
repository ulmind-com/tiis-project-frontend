import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Careers', href: '/careers' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (currentY < 80) {
          setIsCompact(false);
        } else if (currentY > lastY.current + 4) {
          setIsCompact(true);
        } else if (currentY < lastY.current - 4) {
          setIsCompact(false);
        }

        lastY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const compact = isCompact && !isOpen;

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .tiis-header * { font-family: 'Inter', system-ui, sans-serif; box-sizing: border-box; }

        .tiis-nav-btn {
          position: relative;
          background: none; border: none; cursor: pointer;
          font-size: 0.91rem; font-weight: 500;
          color: var(--color-text-main); padding: 0;
          transition: color 0.22s ease;
          text-decoration: none; letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .tiis-nav-btn::after {
          content: '';
          position: absolute; left: 0; bottom: -5px;
          width: 100%; height: 2px;
          background: var(--color-secondary); border-radius: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.26s ease;
        }
        .tiis-nav-btn.active  { color: var(--color-secondary); font-weight: 700; }
        .tiis-nav-btn.active::after { transform: scaleX(1); }
        .tiis-nav-btn:hover   { color: var(--color-secondary); }
        .tiis-nav-btn:hover::after { transform: scaleX(1); }

        @keyframes tiis-ping {
          0%   { transform: scale(1);   opacity: 0.80; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .tiis-dot-ring {
          position: absolute; inset: 0; border-radius: 50%;
          background: var(--color-secondary); opacity: 0.75;
          animation: tiis-ping 1.4s ease-out infinite;
        }

        @keyframes tiis-shimmer {
          0%   { left: -65%; }
          60%  { left: 120%; }
          100% { left: 120%; }
        }
        .tiis-cta-shimmer {
          position: absolute; top: 0; left: -65%;
          width: 55%; height: 100%; pointer-events: none;
          background: linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.24) 50%, transparent 75%);
          animation: tiis-shimmer 2.6s ease-in-out infinite;
        }

        /* ─── Clean Mobile Link Style ─── */
        .tiis-mob-link {
          display: block; width: 100%; text-align: left;
          background: none; border: none; cursor: pointer;
          font-size: 1rem; font-weight: 500; color: var(--color-text-main);
          text-decoration: none; padding: 0;
          transition: color 0.3s ease-in-out;
        }
        .tiis-mob-link.active { color: var(--color-secondary); font-weight: 600; }
        .tiis-mob-link:hover:not(.active) { color: var(--color-secondary); }

        /* Responsive */
        @media (min-width: 769px) {
          .tiis-hamburger { display: none !important; }
        }
        @media (max-width: 768px) {
          .tiis-hamburger  { display: flex !important; }
          .tiis-desktop-nav { display: none !important; }
          .tiis-cta-btn     { display: none !important; }
          .tiis-right-menu.is-compact { display: none !important; }
          .tiis-center-nav.is-compact { justify-content: flex-end !important; }
        }
      `}</style>

      <div
        className="tiis-header"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: compact ? '12px 1rem' : '10px 1rem',
          pointerEvents: 'none',
          transition: 'padding 0.4s ease',
        }}
      >
        <motion.div
          layout
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            pointerEvents: 'auto',
            width: compact ? 'auto' : '100%',
            maxWidth: compact ? '520px' : '1260px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'var(--color-navbar-bg)',
            backdropFilter: 'blur(22px) saturate(180%)',
            WebkitBackdropFilter: 'blur(22px) saturate(180%)',
            borderRadius: compact ? '999px' : '22px',
            border: '1px solid var(--border-color)',
            boxShadow: compact
              ? '0 8px 40px rgba(1,50,78,0.16), 0 2px 0 rgba(255,255,255,0.7) inset'
              : '0 4px 28px rgba(1,50,78,0.10), 0 1px 0 rgba(255,255,255,0.8) inset',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: compact ? '0.3rem 0.5rem 0.3rem 0.6rem' : '0.35rem 0.6rem 0.35rem 0.4rem',
            gap: '1rem',
            transition: 'padding 0.4s ease',
          }}>

            <motion.div
              layout
              onClick={() => { navigate('/'); setIsOpen(false); }}
              style={{ cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}
              whileHover={{ filter: 'drop-shadow(0 4px 12px rgba(1,50,78,0.20))' }}
              transition={{ duration: 0.18 }}
            >
              <motion.img
                layout
                src="/icons.png"
                alt="TIIS Logo"
                style={{
                  height: compact ? '46px' : '76px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  transition: 'height 0.42s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            </motion.div>

            <motion.div
              layout
              className={`tiis-center-nav ${compact ? 'is-compact' : ''}`}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {!compact ? (
                  <motion.div
                    key="full-nav"
                    className="tiis-desktop-nav"
                    initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.97 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(6px)', scale: 0.97 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '2.2rem' }}
                  >
                    {navLinks.map(item => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.href)}
                        className={`tiis-nav-btn${isActive(item.href) ? ' active' : ''}`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.button
                    key="compact-pill"
                    onClick={() => navigate('/contact')}
                    initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.92 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(6px)', scale: 0.92 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '0.42rem 1.1rem',
                      borderRadius: '999px',
                      background: 'var(--color-bg-light)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'background 0.18s',
                    }}
                  >
                    <span style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--color-text-main)', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
                      Available for work
                    </span>
                    <span style={{ position: 'relative', width: '10px', height: '10px', display: 'inline-flex', flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
                      <span className="tiis-dot-ring" />
                      <span style={{ position: 'relative', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-secondary)', boxShadow: '0 0 8px rgba(177,32,35,0.65)', display: 'block' }} />
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div layout className={`tiis-right-menu ${compact ? 'is-compact' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.45rem', color: 'var(--color-primary)',
                  transition: 'transform 0.2s ease',
                  outline: 'none'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {!compact && (
                <Link
                  to="/contact"
                  className="tiis-cta-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    background: 'linear-gradient(135deg, #c0272a 0%, #8f1416 100%)',
                    color: 'white', padding: '0.52rem 1.35rem',
                    borderRadius: '999px', fontWeight: '700', fontSize: '0.87rem',
                    textDecoration: 'none', letterSpacing: '0.03em',
                    boxShadow: '0 4px 16px rgba(177,32,35,0.38)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    whiteSpace: 'nowrap', position: 'relative', overflow: 'hidden',
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(177,32,35,0.50)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(177,32,35,0.38)';
                  }}
                >
                  <span className="tiis-cta-shimmer" />
                  Get a Quote
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" style={{ opacity: 0.9 }}>
                    <path d="M2 6.5h9M7.5 3 11 6.5 7.5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}

              {/* ─── Transparent Mobile Hamburger ─── */}
              <button
                aria-label="Toggle menu"
                onClick={() => setIsOpen(p => !p)}
                className="tiis-hamburger"
                style={{
                  display: 'none', alignItems: 'center', justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '50%', padding: '0.45rem', cursor: 'pointer',
                  color: 'var(--color-text-main)',
                  transition: 'background 0.2s ease'
                }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>

          {/* ─── Updated Mobile Dropdown Container ─── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                layout /* layout prop add kora holo for smooth container expansion */
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ borderTop: '1px solid var(--border-color)', overflow: 'hidden' }}
              >
                {/* Clean Spacing: padding & gap */}
                <div style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {navLinks.map(item => (
                    <button
                      key={item.name}
                      onClick={() => { navigate(item.href); setIsOpen(false); }}
                      className={`tiis-mob-link${isActive(item.href) ? ' active' : ''}`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    style={{
                      marginTop: '0.5rem', display: 'block', textAlign: 'center',
                      padding: '0.8rem 1rem', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #c0272a 0%, #8f1416 100%)',
                      color: 'white', fontWeight: '700', textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(177,32,35,0.30)',
                    }}
                  >
                    Get a Quote →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div style={{ height: '96px' }} />
    </>
  );
};

export default Header;