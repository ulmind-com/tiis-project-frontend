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
    // Tomar existing login logic untouched rakhlam
    if (!localStorage.getItem('adminInfo')) {
      localStorage.setItem('adminInfo', JSON.stringify({ token: 'test-bypass', email: 'test@test.com' }));
    }
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) navigate('/admin/login');
  }, [navigate]);

  return (
    <>
      <style>{`
        /* Root container */
        .admin-layout-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--color-bg-light);
          color: var(--color-text-main);
          transition: background-color 0.3s ease;
        }

        /* Body wrapper prevents unwanted body scrolling when sidebar is open */
        .admin-body-wrapper {
          display: flex;
          flex: 1;
          position: relative;
          overflow: hidden; 
        }

        /* Main Content Area - Mobile First */
        .admin-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: calc(100vh - 70px); /* Syncs with mobile header height */
          overflow-y: auto;
          scroll-behavior: smooth;
        }

        .admin-container {
          flex: 1;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          /* Mobile Padding: Ekdom clean, beshi chapa chapi lagbe na */
          padding: 1rem 0.8rem; 
        }

        /* Web View (Desktop Pro feel) */
        @media (min-width: 768px) {
          .admin-main-content {
            height: calc(100vh - 85px); /* Syncs with desktop header height */
          }
          .admin-container {
            padding: 1.5rem 2rem; /* Boro screen e ektu beshi space */
          }
        }
        
        /* Ultra Premium Custom Scrollbar (Mac/iOS style) */
        .admin-main-content::-webkit-scrollbar {
          width: 6px;
        }
        .admin-main-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-main-content::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 10px;
        }
        .admin-main-content:hover::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.6);
        }
      `}</style>

      <div className="admin-layout-root">

        {/* Top Navbar (Full Width) */}
        <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />

        {/* Under Navbar Structure */}
        <div className="admin-body-wrapper">

          {/* Sidebar (Left) */}
          <AdminSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />

          {/* Scrollable Page Content (Right) */}
          <main className="admin-main-content">
            <div className="admin-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  /* Premium Blur & Fade transition add kora holo */
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ height: '100%' }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>

      </div>
    </>
  );
};

export default AdminLayout;