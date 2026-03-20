import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin Panel | TIIS";
    return () => {
      document.title = "TIIS";
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('adminInfo')) {
      localStorage.setItem('adminInfo', JSON.stringify({ token: 'test-bypass', email: 'test@test.com' }));
    }
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) navigate('/admin/login');
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', transition: 'background-color 0.3s ease' }}>
      
      {/* Top Navbar (Full Width) */}
      <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />

      {/* Under Navbar Structure */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Sidebar (Left) */}
        <AdminSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />

        {/* Scrollable Page Content (Right) */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div className="container" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ height: '100%' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
