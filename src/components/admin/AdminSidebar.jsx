import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  MessageSquare,
  ClipboardList,
  UserPlus,
  LogOut,
  BarChart3,
  Star,
  Image as ImageIcon,
  X // Added close icon for mobile
} from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { path: '/admin/news', label: 'News', icon: FileText },
  { path: '/admin/team', label: 'Core Team', icon: Users },
  { path: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { path: '/admin/logos', label: 'Client Logos', icon: ImageIcon },
  { path: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { path: '/admin/careers', label: 'Jobs', icon: Briefcase },
  { path: '/admin/applications', label: 'Applications', icon: ClipboardList },
  { path: '/admin/admins', label: 'Manage Admins', icon: UserPlus }
];

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <>
      <style>{`
        /* --- Base & Desktop Styles --- */
        .tiis-sidebar {
          width: 260px;
          background-color: var(--color-navbar-bg); /* Use navbar bg for consistency if you like, or keep card-bg */
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease; /* Premium easing */
          z-index: 100;
        }

        /* Desktop Positioning */
        @media (min-width: 1025px) {
          .tiis-sidebar {
            position: sticky;
            top: 85px; /* Syncs with Desktop Header */
            height: calc(100vh - 85px);
            transform: translateX(0) !important;
          }
          .tiis-sidebar-overlay {
            display: none !important;
          }
          .mobile-sidebar-header {
            display: none !important;
          }
        }

        /* --- Ultra Premium Mobile Styles --- */
        @media (max-width: 1024px) {
          .tiis-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            /* Glassmorphism effect for mobile */
            background-color: var(--color-bg-light); 
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.08);
            z-index: 2000; /* Extremely high z-index to stay above everything */
            transform: translateX(-100%);
          }
          
          .tiis-sidebar.open {
            transform: translateX(0);
          }

          /* Overlay with Backdrop Blur */
          .tiis-sidebar-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 1999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }

          .tiis-sidebar-overlay.show {
            opacity: 1;
            visibility: visible;
          }

          .mobile-sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.2rem 1.5rem;
            border-bottom: 1px solid var(--border-color);
          }
        }

        /* --- Link Styling --- */
        .tiis-sidebar-nav {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0;
        }

        /* Premium Custom Scrollbar for Nav */
        .tiis-sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }
        .tiis-sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }
        .tiis-sidebar-nav::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 10px;
        }

        .tiis-sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.9rem 1.2rem;
          margin: 0.3rem 1.2rem;
          border-radius: 10px;
          text-decoration: none;
          color: var(--color-text-muted);
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
        }

        .tiis-sidebar-link:hover {
          background-color: var(--color-bg-light);
          color: var(--color-primary);
          transform: translateX(4px); /* Slight bump on hover */
        }

        .tiis-sidebar-link.active {
          background-color: rgba(177, 32, 35, 0.06); /* Soft primary tint */
          color: var(--color-primary);
          font-weight: 600;
        }

        /* Subtle indicator line for active item */
        .tiis-sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 60%;
          width: 4px;
          background-color: var(--color-primary);
          border-radius: 0 4px 4px 0;
        }

        .tiis-sidebar-link svg {
          color: inherit;
          transition: transform 0.2s ease;
        }

        .tiis-sidebar-link:hover svg {
          transform: scale(1.1); /* Icon pops slightly */
        }

        /* --- Footer Styles --- */
        .sidebar-footer {
          padding: 1.2rem;
          border-top: 1px solid var(--border-color);
          background-color: var(--color-bg-light);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.9rem;
          border-radius: 10px;
          cursor: pointer;
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
        }
      `}</style>

      {/* Mobile Overlay */}
      <div
        onClick={() => setIsMobileOpen(false)}
        className={`tiis-sidebar-overlay ${isMobileOpen ? 'show' : ''}`}
        aria-label="Close Sidebar"
      />

      {/* Sidebar Container */}
      <aside className={`tiis-sidebar ${isMobileOpen ? 'open' : ''}`}>

        {/* Mobile Header (Only visible on small screens) */}
        <div className="mobile-sidebar-header">
          <img
            src="/icons.png"
            alt="TIIS Logo"
            style={{ height: '35px', objectFit: 'contain' }}
          />
          <button
            onClick={() => setIsMobileOpen(false)}
            style={{
              background: 'transparent', border: 'none', color: 'var(--color-text-main)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.25rem'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="tiis-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `tiis-sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} strokeWidth={2} />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;