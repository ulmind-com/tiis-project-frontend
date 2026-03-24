import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Caregivers', path: '/caregivers' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  // Function to scroll to the top of the page when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Ekdom smoothly upore niye jabe
    });
  };

  return (
    <footer className="ultra-footer" style={{
      position: 'relative',
      backgroundColor: 'var(--color-primary-dark, #011627)',
      color: 'white',
      paddingTop: '5rem',
      overflow: 'hidden'
    }}>

      {/* ─── ULTRA PREMIUM RESPONSIVE CSS ─── */}
      <style>{`
        /* Background Glow Effects */
        .footer-glow-1 {
          position: absolute; top: 0; left: -10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(177,32,35,0.15) 0%, transparent 70%);
          filter: blur(50px); pointer-events: none; z-index: 0;
        }
        .footer-glow-2 {
          position: absolute; bottom: 0; right: -10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%);
          filter: blur(50px); pointer-events: none; z-index: 0;
        }

        /* Hover Effects for Links */
        .footer-link-item {
          display: flex; align-items: center; gap: 0.5rem;
          color: rgba(255, 255, 255, 0.75); text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500; font-size: 0.95rem;
        }
        .footer-link-icon {
          opacity: 0; transform: translateX(-10px); color: var(--color-secondary, #b12023);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); width: 0; overflow: hidden;
        }
        .footer-link-item:hover {
          color: white; transform: translateX(4px);
        }
        .footer-link-item:hover .footer-link-icon {
          opacity: 1; transform: translateX(0); width: 16px;
        }

        /* Hover Effects for Socials */
        .footer-social-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
          color: white; transition: all 0.3s ease;
        }
        .footer-social-btn:hover {
          background: var(--color-secondary, #b12023); border-color: var(--color-secondary, #b12023);
          transform: translateY(-4px); box-shadow: 0 8px 20px rgba(177,32,35,0.4);
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .ultra-footer { padding-top: 4rem !important; }
          .footer-container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          
          .footer-brand { text-align: left; }
          .footer-brand img { height: 60px !important; margin-bottom: 1.25rem !important; }
          
          .footer-bottom-bar { flex-direction: column !important; text-align: center !important; gap: 1rem !important; }
          .footer-bottom-links { justify-content: center !important; flex-wrap: wrap !important; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      <div className="footer-glow-1"></div>
      <div className="footer-glow-2"></div>

      <div className="container footer-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Top Grid Area */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 1fr 0.8fr',
          gap: '4rem',
          marginBottom: '4rem'
        }}>

          {/* Column 1: Brand & About */}
          <div className="footer-brand">
            {/* Logo Link e click korle top e scroll hobe */}
            <Link to="/" onClick={scrollToTop}>
              <img
                src="/Fotter.png"
                alt="TIIS Logo"
                style={{
                  height: '76px', width: 'auto', objectFit: 'contain',
                  marginBottom: '1.5rem', display: 'block'
                }}
              />
            </Link>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '320px' }}>
              Elevating Businesses, Empowering People. Your trusted partner in end-to-end consulting and capacity building for a sustainable future.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
              Quick Links
              <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-secondary, #b12023)', marginTop: '0.5rem', borderRadius: '2px' }}></div>
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {/* Quick links e click korle top e scroll hobe */}
                  <Link to={link.path} className="footer-link-item" onClick={scrollToTop}>
                    <ChevronRight size={16} className="footer-link-icon" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
              Contact Info
              <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-secondary, #b12023)', marginTop: '0.5rem', borderRadius: '2px' }}></div>
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} color="var(--color-secondary, #b12023)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>TIIS Corporate Hub, Gurgaon, India</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} color="var(--color-secondary, #b12023)" style={{ flexShrink: 0 }} />
                <a href="tel:8700409793" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}>8700409793</a>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={20} color="var(--color-secondary, #b12023)" style={{ flexShrink: 0 }} />
                <a href="mailto:support@tiis.co.in" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}>support@tiis.co.in</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
              Follow Us
              <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-secondary, #b12023)', marginTop: '0.5rem', borderRadius: '2px' }}></div>
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              Stay connected with us for the latest industry insights and updates.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="https://www.linkedin.com/company/tiisllp/" aria-label="LinkedIn" className="footer-social-btn" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
              <a href="#" aria-label="Twitter" className="footer-social-btn"><Twitter size={18} /></a>
              <a href="#" aria-label="Facebook" className="footer-social-btn"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram" className="footer-social-btn"><Instagram size={18} /></a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Links */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '1.5rem 0',
        position: 'relative', zIndex: 1
      }}>
        <div className="container footer-container footer-bottom-bar" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} <span style={{ color: 'white', fontWeight: '600' }}>TIIS</span>. All rights reserved.
            <span style={{ margin: '0 0.5rem' }}>|</span>
            Designed & Developed by <a href="https://www.ulmind.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#93c5fd'} onMouseLeave={e => e.currentTarget.style.color = '#60a5fa'}>ULMiND</a>
          </div>

          <div className="footer-bottom-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* Removed Admin Login link from footer based on request */}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;