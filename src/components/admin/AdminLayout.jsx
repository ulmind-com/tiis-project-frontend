import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if logged in
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) {
      navigate('/admin/login');
    }
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
    { path: '/admin/content',       icon: <Settings size={20} />,        label: 'General Content' },
    { path: '/admin/admins',        icon: <Users size={20} />,           label: 'Manage Admins' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-primary-dark)', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ margin: 0 }}>TIIS Admin</h2>
        </div>
        
        <nav style={{ flex: '1', padding: '1rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menuItems.map(item => {
              const isActive = location.pathname.includes(item.path);
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1rem 2rem',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                      borderLeft: isActive ? '4px solid var(--color-secondary)' : '4px solid transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.icon} {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div style={{ padding: '2rem' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'none', 
              color: '#fca5a5', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <header style={{ backgroundColor: 'white', padding: '1.5rem 2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>
             {menuItems.find(m => location.pathname.includes(m.path))?.label || 'Resource Management'}
          </h1>
        </header>
        <div style={{ padding: '2rem', flex: '1', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
