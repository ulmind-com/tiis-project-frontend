import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { path: '/',         label: 'Home' },
    { path: '/about',    label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/careers',  label: 'Careers' },
    { path: '/contact',  label: 'Contact' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          padding: '0.6rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: scrolled
            ? '0 2px 24px rgba(0,0,0,0.1)'
            : '0 1px 0 rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
        }}
      >
        {/* Inner pill container */}
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '52px',
            gap: '1rem',
          }}
        >
          {/* ── Logo (rounded pill left) ── */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#01324e',
              color: 'white',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              fontWeight: '800',
              fontSize: '1.05rem',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(1,50,78,0.25)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(1,50,78,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(1,50,78,0.25)';
            }}
          >
            {/* Small accent dot */}
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: '#b12023', display: 'inline-block', flexShrink: 0,
            }} />
            TIIS
          </Link>

          {/* ── Desktop Nav Links (center) ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.92rem',
                    fontWeight: active ? '700' : '500',
                    color: active ? '#01324e' : '#444',
                    backgroundColor: active ? '#e8f1f7' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.18s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.color = '#01324e';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#444';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Get a Quote pill + hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#b12023',
                color: 'white',
                padding: '0.5rem 1.3rem',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(177,32,35,0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#c4242b';
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(177,32,35,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#b12023';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(177,32,35,0.35)';
              }}
            >
              Get a Quote
            </Link>

            {/* Hamburger – shown only on small screens (we fake it here, CSS handles display) */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(p => !p)}
              style={{
                display: 'none', // hidden on desktop via inline — override with CSS class
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.5rem', borderRadius: '8px',
              }}
              className="mobile-hamburger"
            >
              {mobileOpen ? <X size={22} color="#01324e" /> : <Menu size={22} color="#01324e" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Dropdown ── */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: '68px', left: 0, right: 0,
            backgroundColor: 'white', zIndex: 999,
            padding: '1rem 1.5rem 1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            borderTop: '1px solid #f0f0f0',
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}
        >
          {navLinks.map(link => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontWeight: active ? '700' : '500',
                  color: active ? '#01324e' : '#333',
                  backgroundColor: active ? '#e8f1f7' : 'transparent',
                  textDecoration: 'none', fontSize: '1rem',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              backgroundColor: '#b12023',
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Get a Quote
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
          header nav { display: none !important; }
          header a[href="/contact"]:not(.mobile-hamburger) { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Header;
