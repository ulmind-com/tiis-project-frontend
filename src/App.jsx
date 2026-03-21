import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/public/Header';
import CookieConsent from './components/public/CookieConsent';
import { trackPageVisit } from './utils/visitorTracker';
import Footer from './components/public/Footer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Careers from './pages/public/Careers';
import Caregivers from './pages/public/Caregivers';
import Contact from './pages/public/Contact';
import News from './pages/public/News';
import Portfolio from './pages/public/Portfolio';
import Team from './pages/public/Team';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import ManageJobs from './pages/admin/ManageJobs';
import ViewEnquiries from './pages/admin/ViewEnquiries';
import ManageContent from './pages/admin/ManageContent';
import ManageAdmins from './pages/admin/ManageAdmins';
import ManagePortfolio from './pages/admin/ManagePortfolio';
import ManageNews from './pages/admin/ManageNews';
import ManageTeam from './pages/admin/ManageTeam';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageLogos from './pages/admin/ManageLogos';
import ViewApplications from './pages/admin/ViewApplications';
import Dashboard from './pages/admin/Dashboard';
import VisitorAnalytics from './pages/admin/VisitorAnalytics';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Track page visits on every route change (public pages only)
  useEffect(() => {
    if (!isAdmin) {
      trackPageVisit(location.pathname, document.title);
    }
  }, [location.pathname, isAdmin]);

  return (
    <div className="app">
      {!isAdmin && <Header />}
      
      {!isAdmin ? (
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/caregivers" element={<Caregivers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
      ) : (
        <main style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content" element={<ManageContent />} />
                <Route path="portfolio" element={<ManagePortfolio />} />
                <Route path="news" element={<ManageNews />} />
                <Route path="team" element={<ManageTeam />} />
                <Route path="testimonials" element={<ManageTestimonials />} />
                <Route path="logos" element={<ManageLogos />} />
                <Route path="careers" element={<ManageJobs />} />
                <Route path="applications" element={<ViewApplications />} />
                <Route path="enquiries" element={<ViewEnquiries />} />
                <Route path="admins" element={<ManageAdmins />} />
                <Route path="analytics" element={<VisitorAnalytics />} />
              </Route>
          </Routes>
        </main>
      )}

      {!isAdmin && <Footer />}
      {!isAdmin && <CookieConsent />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
