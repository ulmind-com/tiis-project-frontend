import React from 'react';
import { Sun, Moon, Home, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const AdminHeader = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <style>{`
        /* Premium Header Styling */
        .admin-header-premium {
          background-color: var(--color-navbar-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          /* Mobile Defaults */
          height: 70px; 
          padding: 0 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        /* Logo Sizing */
        .header-logo {
          height: 45px;
          width: auto;
          object-fit: contain;
          transition: height 0.3s ease;
        }

        /* Icon Buttons (Hamburger & Theme) */
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--color-text-main);
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        
        .icon-btn:hover {
          background: var(--color-bg-light);
          color: var(--color-primary);
        }

        .theme-btn {
          border: 1px solid var(--border-color);
          background: var(--color-bg-light);
          color: var(--color-primary);
        }

        .theme-btn:hover {
          transform: rotate(15deg) scale(1.05);
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* Home Button Text - Hidden on Mobile */
        .home-text {
          display: none;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .home-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--color-text-main);
          border: none;
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .home-btn:hover {
          color: var(--color-primary);
          background: var(--color-bg-light);
        }

        .hamburger-btn {
          display: flex;
        }

        /* Web / Tablet View (Desktop Pro feel) */
        @media (min-width: 768px) {
          .admin-header-premium {
            height: 85px;
            padding: 0 2rem;
          }
          .header-logo {
            height: 55px;
          }
          .home-text {
            display: inline; /* Show text on larger screens */
          }
        }

        /* Hide Hamburger on large screens */
        @media (min-width: 1024px) {
          .hamburger-btn {
            display: none;
          }
        }
      `}</style>

      <header className="admin-header-premium">
        {/* Left Area: Hamburger & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="icon-btn hamburger-btn"
            onClick={() => setIsSidebarOpen(p => !p)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>

          <div
            onClick={() => navigate('/admin/dashboard')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}
          >
            <img
              src="/icons.png"
              alt="TIIS Admin Logo"
              className="header-logo"
            />
          </div>
        </div>

        {/* Right Area: Navigation & Theme */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="home-btn"
            onClick={() => navigate('/')}
            title="Go to Home"
          >
            <Home size={20} />
            <span className="home-text">Home</span>
          </button>

          <button
            className="icon-btn theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;