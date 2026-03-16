import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/public/Header';
import Footer from './components/public/Footer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Careers from './pages/public/Careers';
import Contact from './pages/public/Contact';

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
import ViewApplications from './pages/admin/ViewApplications';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Admin Routes - No public Header/Footer */}
        <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={
                <div>
                  <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Welcome to TIIS Admin Portal</h2>
                  <p>Use the sidebar to manage content, jobs, and view incoming business enquiries.</p>
                </div>
              } />
              <Route path="content" element={<ManageContent />} />
              <Route path="portfolio" element={<ManagePortfolio />} />
              <Route path="news" element={<ManageNews />} />
              <Route path="team" element={<ManageTeam />} />
              <Route path="careers" element={<ManageJobs />} />
              <Route path="applications" element={<ViewApplications />} />
              <Route path="enquiries" element={<ViewEnquiries />} />
              <Route path="admins" element={<ManageAdmins />} />
            </Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App;
