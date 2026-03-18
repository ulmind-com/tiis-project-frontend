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
    <div style={{ backgroundColor: '#f4f6f0', minHeight: '100vh', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        
        <div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
              <span style={{ width: '30px', height: '2px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
              Our Work
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
              Recent <span style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', marginTop: '1rem', maxWidth: '600px', lineHeight: '1.7' }}>
              Explore our portfolio of successful transformations and innovative solutions delivered to ambitious clients globally.
            </p>
          </motion.div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  color: 'white'
                }}
                className="group"
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow='0 25px 50px -12px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 20px 40px -15px rgba(0,0,0,0.2)'; }}
              >
                {/* Background Image with Hover Scale */}
                <div 
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    zIndex: 0
                  }}
                  className="group-hover:scale-105"
                />
                
                {/* Premium Dark Gradient Overlay */}
                <div 
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(20,25,20,0.6) 55%, rgba(20,25,20,0.95) 85%, rgba(20,25,20,1) 100%)',
                    zIndex: 1
                  }}
                />

                {/* Card Content Overlay */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  
                  {/* Badges / Tags Row */}
                  <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      ★ {project.clientName || 'Confidential'}
                    </div>
                    <div style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      Projects
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.6rem', fontWeight: '500', marginBottom: '0.6rem', lineHeight: '1.2', letterSpacing: '-0.5px' }}>{project.title}</h3>
                  
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', marginBottom: '1.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {project.description}
                  </p>
                  
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '24px' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>No projects available right now.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Portfolio;
