import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get('/api/portfolio');
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Loading Projects...</p>
      </div>
    );
  }

  return (
    <div className="portfolio-page-wrapper animate-fade-in" style={{ backgroundColor: '#f4f6f0', minHeight: '100vh', padding: '6rem 2rem' }}>
      
      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          .portfolio-page-wrapper { padding: 5rem 1rem !important; }
          .portfolio-header { flex-direction: column !important; align-items: center !important; gap: 1.5rem !important; margin-bottom: 3rem !important; text-align: center !important; }
          .portfolio-header > div > div:first-child { justify-content: center !important; margin-bottom: 1.2rem !important; }
          .portfolio-title { font-size: 2.6rem !important; line-height: 1.1 !important; letter-spacing: -1px !important; text-align: center !important; }
          .portfolio-subtitle { font-size: 1.05rem !important; line-height: 1.6 !important; text-align: center !important; padding: 0 0.5rem; margin-top: 1rem !important; }
          .portfolio-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .portfolio-card { height: 400px !important; border-radius: 24px !important; padding: 1.5rem !important; }
          .portfolio-badge { font-size: 0.75rem !important; padding: 0.4rem 0.8rem !important; }
          .portfolio-card-title { font-size: 1.6rem !important; line-height: 1.2 !important; }
          .portfolio-back-link { align-self: center !important; padding-top: 0 !important; margin-top: 0.5rem !important; background-color: rgba(1, 50, 78, 0.08) !important; padding: 0.6rem 1.2rem !important; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        <div className="portfolio-header" style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
              <span style={{ width: '30px', height: '2px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
              Our Work
            </div>
            <h1 className="portfolio-title" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: '900', color: 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
              Recent <span style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
            </h1>
            <p className="portfolio-subtitle" style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', marginTop: '1rem', maxWidth: '600px', lineHeight: '1.7' }}>
              Explore our portfolio of successful transformations and innovative solutions delivered to ambitious clients globally.
            </p>
          </motion.div>
          <Link to="/" className="portfolio-back-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '50px', backgroundColor: 'rgba(1, 50, 78, 0.05)', transition: 'background-color 0.2s' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {portfolio.length > 0 ? (
            portfolio.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  position: 'relative',
                  height: '460px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  cursor: 'default',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.75rem',
                  color: 'white'
                }}
                className="portfolio-card group"
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 25px 50px -12px rgba(0,0,0,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 20px 40px -15px rgba(0,0,0,0.15)'; }}
              >
                {/* Background Image with Hover Scale */}
                <div 
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                    zIndex: 0
                  }}
                  className="group-hover:scale-105"
                />
                
                {/* Premium Dark Gradient Overlay */}
                <div 
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(10,15,20,0.7) 60%, rgba(10,15,20,0.95) 100%)',
                    zIndex: 1,
                    transition: 'opacity 0.4s ease',
                  }}
                  className="group-hover:opacity-90"
                />

                {/* Card Content Overlay */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  
                  {/* Badges / Tags Row */}
                  <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div className="portfolio-badge" style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.75rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                      ★ {project.clientName || 'Confidential'}
                    </div>
                    <div className="portfolio-badge" style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.75rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                      Projects
                    </div>
                  </div>

                  <h3 className="portfolio-card-title" style={{ fontSize: '1.65rem', fontWeight: 'bold', marginBottom: '0.6rem', lineHeight: '1.2', letterSpacing: '-0.3px', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{project.title}</h3>
                  
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', marginBottom: '1rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                    {project.description}
                  </p>
                  
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>No projects available right now.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Portfolio;
