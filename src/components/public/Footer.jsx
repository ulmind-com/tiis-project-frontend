import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-primary-dark)', color: 'white', paddingTop: '4rem' }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        
        {/* About Column */}
        <div>
          <img 
            src="/icons.png" 
            alt="TIIS Logo" 
            style={{ 
              height: '76px', 
              width: 'auto', 
              objectFit: 'contain', 
              marginBottom: '1.5rem',
              display: 'block' 
            }} 
          />
          <p style={{ color: 'var(--color-bg-light)', opacity: '0.8', lineHeight: '1.8' }}>
            Elevating Businesses, Empowering People. Your trusted partner in end-to-end consulting and capacity building.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: '0.8' }}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Business Enquiry</Link></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Contact Info</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: '0.8' }}>
            <li>info@tiis.co.in</li>
            <li>+91 XXX XXX XXXX</li>
            <li>TIIS Corporate Hub, Bangalore, India</li>
          </ul>
        </div>

        {/* Social Links Column */}
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'white', opacity: '0.8' }}><Linkedin /></a>
            <a href="#" style={{ color: 'white', opacity: '0.8' }}><Twitter /></a>
            <a href="#" style={{ color: 'white', opacity: '0.8' }}><Facebook /></a>
            <a href="#" style={{ color: 'white', opacity: '0.8' }}><Instagram /></a>
          </div>
        </div>

      </div>

      <div style={{ 
        backgroundColor: '#00000033', 
        padding: '1.5rem 0', 
        textAlign: 'center',
        fontSize: '0.9rem',
        opacity: '0.8'
      }}>
        <div className="container">
          &copy; {new Date().getFullYear()} TIIS. All rights reserved. | Designed & Developed by <a href="https://www.ulmind.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none' }}>ULMiND</a> | <Link to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
