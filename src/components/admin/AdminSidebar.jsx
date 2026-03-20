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
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/admin/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/admin/analytics',    label: 'Analytics',    icon: BarChart3 },
  { path: '/admin/portfolio',     label: 'Portfolio',     icon: Briefcase },
  { path: '/admin/news',          label: 'News',          icon: FileText },
  { path: '/admin/team',          label: 'Core Team',     icon: Users },
  { path: '/admin/testimonials',  label: 'Testimonials',  icon: Star },
  { path: '/admin/logos',         label: 'Client Logos',  icon: ImageIcon },
  { path: '/admin/enquiries',     label: 'Enquiries',     icon: MessageSquare },
  { path: '/admin/careers',       label: 'Jobs',          icon: Briefcase },
  { path: '/admin/applications',  label: 'Applications',  icon: ClipboardList },
  { path: '/admin/admins',        label: 'Manage Admins', icon: UserPlus }
];

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1040, display: 'block'
          }}
          className="tiis-sidebar-overlay"
        />
      )}

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ x: isMobileOpen ? 0 : 0 }} // Simplified for now
        className={`tiis-sidebar ${isMobileOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          height: 'calc(100vh - 85px)',
          backgroundColor: 'var(--color-card-bg)',
          borderRight: '1px solid var(--border-color)',
          boxShadow: isMobileOpen ? '4px 0 24px rgba(0,0,0,0.1)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '85px',
          zIndex: 100,
          transition: 'transform 0.3s ease'
        }}
      >
        <style>{`
          .tiis-sidebar-link {
            display: flex; align-items: center; gap: 0.75rem;
            padding: 0.85rem 1.25rem; margin: 0.25rem 1rem;
            border-radius: 8px; text-decoration: none;
            color: var(--color-text-muted); font-weight: 500; font-size: 0.95rem;
            transition: all 0.2s;
          }
          .tiis-sidebar-link:hover {
            background-color: var(--color-bg-light);
            color: var(--color-primary);
          }
          .tiis-sidebar-link.active {
            background-color: rgba(177,32,35,0.08);
            color: var(--color-primary);
            font-weight: 600;
          }
          .tiis-sidebar-link svg {
            color: inherit;
          }
          @media (max-width: 1024px) {
            .tiis-sidebar {
              position: fixed !important;
              transform: translateX(-100%);
              height: 100% !important;
              top: 0 !important;
              box-shadow: 4px 0 40px rgba(0,0,0,0.2) !important;
              z-index: 1050 !important;
            }
            .tiis-sidebar.open {
              transform: translateX(0) !important;
            }
            .tiis-sidebar-overlay {
              display: block !important;
            }
          }
          @media (min-width: 1025px) {
            .tiis-sidebar-overlay {
              display: none !important;
            }
            .tiis-sidebar {
              transform: translateX(0) !important;
            }
          }
        `}</style>

        {/* Navigation Links */}
        <nav style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', paddingTop: '1.5rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `tiis-sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.85rem', borderRadius: '8px', cursor: 'pointer',
              background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)',
              fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          >
            <LogOut size={18} />
            Logout Account
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
