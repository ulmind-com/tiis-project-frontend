import React from 'react';
import { Sun, Moon, Home, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const AdminHeader = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header style={{
      height: '85px',
      backgroundColor: 'var(--color-navbar-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Left Area: Hamburger (Mobile) + Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          className="tiis-hamburger-btn"
          onClick={() => setIsSidebarOpen(p => !p)}
          style={{
            background: 'none', border: 'none', color: 'var(--color-text-main)',
            cursor: 'pointer', padding: '0.25rem', display: 'none'
          }}
        >
          <Menu size={24} />
        </button>
        <style>{`
          @media (max-width: 1024px) {
            .tiis-hamburger-btn { display: block !important; }
          }
        `}</style>

        <div 
          onClick={() => navigate('/admin/dashboard')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
        >
          <img 
            src="/icons.png" 
            alt="TIIS Admin Logo" 
            style={{ height: '65px', width: 'auto', objectFit: 'contain' }} 
          />
        </div>
      </div>

      {/* Right Area: Home Link & Theme Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', color: 'var(--color-text-main)', border: 'none',
            cursor: 'pointer', padding: '0.5rem', fontWeight: '600', fontSize: '0.9rem',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-main)'}
        >
          <Home size={18} />
          <span>Home</span>
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-bg-light)', border: '1px solid var(--border-color)', borderRadius: '50%',
            cursor: 'pointer', width: '40px', height: '40px', color: 'var(--color-primary)',
            transition: 'all 0.2s ease', outline: 'none'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(15deg)'; e.currentTarget.style.borderColor = 'var(--color-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0deg)';  e.currentTarget.style.borderColor = 'var(--border-color)' }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
