import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard',    icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/portfolio',     icon: <FileText size={20} />,        label: 'Portfolio' },
    { path: '/admin/news',          icon: <FileText size={20} />,        label: 'News' },
    { path: '/admin/team',          icon: <Users size={20} />,           label: 'Core Team' },
    { path: '/admin/enquiries',     icon: <Users size={20} />,           label: 'Enquiries' },
    { path: '/admin/careers',       icon: <FileText size={20} />,        label: 'Manage Jobs' },
    { path: '/admin/applications',  icon: <FileText size={20} />,        label: 'Job Applications' },
    { path: '/admin/admins',        icon: <Users size={20} />,           label: 'Manage Admins' }
  ];

  // Theme variables
  const theme = {
    bg: isDark ? '#020617' : '#f8fafc',
    sidebarBg: isDark ? '#0f172a' : '#01324e',
    sidebarText: '#ffffff',
    sidebarHover: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
    sidebarActive: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)',
    sidebarBorder: isDark ? '#1e293b' : 'rgba(255,255,255,0.1)',
    headerBg: isDark ? '#0f172a' : '#ffffff',
    headerText: isDark ? '#ffffff' : '#01324e',
    headerBorder: isDark ? '#1e293b' : '#e2e8f0',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.bg, color: theme.headerText, transition: 'background-color 0.3s ease' }}>
      
      {/* Sidebar with Framer Motion slide-in */}
      <motion.aside 
        initial={{ x: -250 }} animate={{ x: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '260px', backgroundColor: theme.sidebarBg, color: theme.sidebarText, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${theme.sidebarBorder}`, transition: 'background-color 0.3s' }}
      >
        <div style={{ padding: '2rem', borderBottom: `1px solid ${theme.sidebarBorder}`, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #b12023, #f43f5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>T</div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', letterSpacing: '0.02em', fontWeight: 800 }}>TIIS Admin</h2>
        </div>
        
        <nav style={{ flex: '1', padding: '1.5rem 0', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item, idx) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <motion.li key={item.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                  <Link 
                    to={item.path}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1rem', 
                      padding: '1rem 2rem', position: 'relative',
                      backgroundColor: isActive ? theme.sidebarActive : 'transparent',
                      color: isActive ? '#f87171' : 'rgba(255,255,255,0.7)',
                      fontWeight: isActive ? 600 : 500, transition: 'all 0.2s', textDecoration: 'none'
                    }}
                    onMouseEnter={e => !isActive && (e.currentTarget.style.backgroundColor = theme.sidebarHover)}
                    onMouseLeave={e => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {isActive && <motion.div layoutId="activeNav" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#f87171' }} />}
                    {item.icon} {item.label}
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        <div style={{ padding: '2rem', borderTop: `1px solid ${theme.sidebarBorder}` }}>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%',
              background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '0.85rem 1rem', borderRadius: '12px',
              border: '1px solid rgba(248,113,113,0.2)', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
          >
            <LogOut size={20} /> Logout
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main style={{ flex: '1', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header style={{ 
          backgroundColor: theme.headerBg, padding: '1rem 2rem', 
          borderBottom: `1px solid ${theme.headerBorder}`, 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'background-color 0.3s, border-color 0.3s'
        }}>
          <h1 style={{ fontSize: '1.4rem', color: theme.headerText, margin: 0, fontWeight: 700 }}>
             {menuItems.find(m => location.pathname.includes(m.path))?.label || 'Dashboard'}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <motion.button
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(1,50,78,0.05)',
                border: 'none', padding: '0.65rem', borderRadius: '50%',
                cursor: 'pointer', color: theme.headerText,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </motion.button>
          </div>
        </header>

        <div style={{ flex: '1', overflowY: 'auto', padding: '2rem', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              <Outlet context={{ isDark }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
