import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Building2, Users, Briefcase, FileText, Layout, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [news, setNews] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [isMottoModalOpen, setIsMottoModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, portRes] = await Promise.all([
          axios.get('/api/news'),
          axios.get('/api/portfolio')
        ]);
        setNews(newsRes.data.slice(0, 4)); // Get 4 for bento grid
        setPortfolio(portRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dynamic content:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page animate-fade-in" style={{ backgroundColor: '#ffffff' }}>
      
      {/* Premium Split Hero Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '6rem 0 8rem 0', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Content Block */}
          <motion.div 
            style={{ flex: '1 1 450px' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              <span style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
              Premium Consulting
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: '800', lineHeight: '1.1', color: 'var(--color-primary-dark)' }}>
              Thoughtful Institute of <br />
              <span className="text-gradient-primary">Innovative Solutions</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', marginBottom: '3rem', lineHeight: '1.8', maxWidth: '600px' }}>
              TIIS offers the full spectrum of thoughtful researched-based innovative solutions to help organizations and institutions plan better, work better & deliver better in this VUCA world. We design and develop thoughtful innovative solutions to optimize the potential of human capital to strive for the desired business objective and self-satisfaction.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-pill-primary">
                Get Started
              </Link>
              <button onClick={() => setIsMottoModalOpen(true)} className="btn-pill-secondary" style={{ border: '2px solid #e2e8f0', color: 'var(--color-text-main)' }}>
                Our Motto
              </button>
            </div>
          </motion.div>

          {/* Right Visual Block (Geometric Shapes & Image) */}
          <motion.div 
            style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-visual-wrapper">
              <div className="hero-shape-bg"></div>
              
              <div className="hero-image-mask">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80" 
                  alt="Business Team Collaboration" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              <div className="hero-badge">
                <div className="hero-badge-avatars">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Client 1" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Client 2" />
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80" alt="Client 3" />
                </div>
                <div className="hero-badge-text">
                  500+ Trusted
                  <span>Global Clients</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview" style={{ padding: '6rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="section-title">Our Capabilities</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '2rem',
            marginTop: '4rem'
          }}>
            {[
              { icon: <Briefcase size={32} />, title: "Business Solutions", desc: "Strategic advisory and process consulting." },
              { icon: <Users size={32} />, title: "Talent Hiring", desc: "Permanent and temp staffing solutions." },
              { icon: <Building2 size={32} />, title: "Capacity Building", desc: "Leadership and managerial training." },
              { icon: <FileText size={32} />, title: "Content Creation", desc: "Corporate and academic content." },
              { icon: <Layout size={32} />, title: "Compliance", desc: "Labour law and payroll compliance." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                className="pro-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}
              >
                <div style={{ 
                  width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#f1f5f9', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: 'var(--color-secondary)', margin: '0 auto 1.5rem' 
                }}>
                  {service.icon}
                </div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-dark)', fontSize: '1.25rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Portfolio Section */}
      {portfolio.length > 0 && (
        <section style={{ padding: '6rem 0', backgroundColor: '#ffffff' }}>
          <div className="container">
            <h2 className="section-title">Recent Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
              {portfolio.map((project, i) => (
                <motion.div 
                  key={project._id}
                  className="pro-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="pro-image-zoom_container" style={{ height: '240px', backgroundColor: '#f1f5f9' }}>
                    {project.imageUrl ? (
                      <div className="pro-image-zoom" style={{ height: '100%', width: '100%', backgroundImage: `url(${project.imageUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                        <Briefcase size={64} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '2.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                      Client: {project.clientName || 'Confidential'}
                    </div>
                    <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem', fontSize: '1.4rem', fontWeight: '800' }}>{project.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
                      {project.description.length > 120 ? project.description.substring(0, 120) + '...' : project.description}
                    </p>
                    <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.95rem' }}>
                      View Project <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <Link to="/portfolio" className="btn-pill-secondary" style={{ border: '2px solid var(--color-primary)' }}>
                See All Projects
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic News Bento Grid Section */}
      {news.length > 0 && (
        <section style={{ minHeight: '100vh', backgroundColor: '#f4f6f0', display: 'flex', flexDirection: 'column', padding: '5rem 0' }}>
          <div className="container" style={{ maxWidth: '1400px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* Section Header — centered */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <h2 className="section-title" style={{ marginBottom: '0' }}>Latest Insights &amp; Blog</h2>
            </motion.div>

            {/* Bento Grid — fills remaining height */}
            <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: '1fr 1fr', gap: '1.25rem', minHeight: '600px' }}>
              
              {/* Item 1: Large Featured Left (Col 1-5, Row 1-2) */}
              {news[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ gridColumn: 'span 5', gridRow: 'span 2', borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer', backgroundColor: '#f1eed9', transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease' }}
                  className="group"
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow='0 30px 60px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0) scale(1)'; e.currentTarget.style.boxShadow='none'; }}
                  onClick={() => setSelectedNews(news[0])}
                >
                  <div 
                    style={{ 
                      position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center',
                      backgroundImage: `url(${news[0].imageUrl || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop'})`,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 75% 100%, 75% calc(100% - 60px), 0 calc(100% - 60px))',
                      transition: 'transform 0.7s ease'
                    }}
                    className="group-hover:scale-105"
                  />
                  {/* Fire badge */}
                  <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', border: '1px solid rgba(255,255,255,0.3)', zIndex: 10, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                    🔥
                  </div>
                  {/* Date tag */}
                  <div style={{ position: 'absolute', bottom: '5.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-primary)' }}>Insight</span>
                    <span style={{ color: '#999', fontSize: '0.8rem' }}>|  {new Date(news[0].createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <h3 style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', fontSize: '1.6rem', fontWeight: '900', color: '#111', lineHeight: 1.1, textTransform: 'uppercase', zIndex: 10 }}>
                    {news[0].title}
                  </h3>
                  {/* Hover overlay */}
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.82)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.35s ease', zIndex: 20, padding: '2rem' }} className="group-hover:opacity-100">
                    <p style={{ color: 'white', fontSize: '1rem', lineHeight: 1.7, textAlign: 'center', marginBottom: '1.5rem' }}>{news[0].content.substring(0, 140)}...</p>
                    <span style={{ color: 'white', fontWeight: '700', borderBottom: '2px solid white', paddingBottom: '4px', fontSize: '0.9rem' }}>Read Post →</span>
                  </div>
                </motion.div>
              )}

              {/* Item 2: Top Middle (Col 6-10, Row 1) */}
              {news[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ gridColumn: 'span 5', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#defabb', padding: '2rem', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease' }}
                  className="group"
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow='0 30px 60px rgba(0,0,0,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0) scale(1)'; e.currentTarget.style.boxShadow='none'; }}
                  onClick={() => setSelectedNews(news[1])}
                >
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.5)', transform: 'rotate(-45deg)', transition: 'transform 0.3s ease' }} className="group-hover:rotate-0">
                    <ArrowRight size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', color: '#444' }}>Strategy . Analysis</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', lineHeight: 1.1, textTransform: 'uppercase', maxWidth: '80%', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {news[1].title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500', opacity: 0.75, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', paddingRight: '3rem' }}>
                    {news[1].content.substring(0, 90)}... <span style={{ textDecoration: 'underline', fontWeight: '700' }}>More</span>
                  </p>
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.35s ease', zIndex: 20, padding: '2rem' }} className="group-hover:opacity-100">
                    <p style={{ color: 'white', textAlign: 'center', fontSize: '0.95rem', lineHeight: 1.7 }}>{news[1].content.substring(0, 110)}...</p>
                  </div>
                </motion.div>
              )}

              {/* Item 3: Top Right (Col 11-12, Row 1) */}
              {news[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ gridColumn: 'span 2', borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer', backgroundColor: '#cbd5e1', transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease' }}
                  className="group"
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow='0 30px 60px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0) scale(1)'; e.currentTarget.style.boxShadow='none'; }}
                  onClick={() => setSelectedNews(news[2])}
                >
                  <div style={{ position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${news[2].imageUrl || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop'})`, transition: 'transform 0.7s ease' }} className="group-hover:scale-110" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' }} />
                  <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', right: '1.25rem', zIndex: 10 }}>
                    <div style={{ fontSize: '0.65rem', color: 'white', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Update</div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '900', color: 'white', lineHeight: 1.2, textTransform: 'uppercase', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {news[2].title}
                    </h3>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.35s ease', zIndex: 20, padding: '1rem' }} className="group-hover:opacity-100">
                    <p style={{ color: 'white', textAlign: 'center', fontSize: '0.8rem', lineHeight: 1.6 }}>{news[2].content.substring(0, 70)}...</p>
                  </div>
                </motion.div>
              )}

              {/* Item 4: Bottom Row (Col 6-12, Row 2) */}
              {news[3] ? (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ gridColumn: 'span 7', borderRadius: '24px', overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease' }}
                  className="group"
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px) scale(1.01)'; e.currentTarget.style.boxShadow='0 30px 60px rgba(0,0,0,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0) scale(1)'; e.currentTarget.style.boxShadow='none'; }}
                  onClick={() => setSelectedNews(news[3])}
                >
                  <div style={{ position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${news[3].imageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'})`, transition: 'transform 0.7s ease' }} className="group-hover:scale-105" />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.22)', transition: 'background-color 0.3s ease' }} className="group-hover:bg-black/40" />
                  {/* Play icon */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.5)', transition: 'background 0.3s ease' }} className="group-hover:bg-white/50">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '0.7rem', color: 'white', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', zIndex: 10 }}>
                    Media
                  </div>
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 10, color: 'white' }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.4rem' }}>{new Date(news[3].createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: 1.15, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {news[3].title}
                    </h3>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.35s ease', zIndex: 20, padding: '2rem' }} className="group-hover:opacity-100">
                    <p style={{ color: 'white', fontSize: '0.95rem', textAlign: 'center', marginBottom: '1rem', lineHeight: 1.7 }}>{news[3].content.substring(0, 90)}...</p>
                    <span style={{ color: 'white', fontWeight: '700', textDecoration: 'underline' }}>Read More</span>
                  </div>
                </motion.div>
              ) : (
                <div style={{ gridColumn: 'span 7', borderRadius: '24px', backgroundColor: '#e2e8f0', border: '2px dashed #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
                  More Coming Soon
                </div>
              )}

            </div>

            {/* View All Posts — Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}
            >
              <Link 
                to="/news" 
                className="btn-pill-secondary"
                style={{ border: '2px solid var(--color-primary)', fontSize: '0.85rem' }}
              >
                View All Posts <ArrowRight size={15} />
              </Link>
            </motion.div>

          </div>
        </section>
      )}

      {/* Why Us / CTA Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-primary)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: '1 1 500px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>Ready To Transform Your Enterprise?</h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', lineHeight: '1.7' }}>
                Partner with TIIS to unlock innovative solutions tailored for your industry. Our strategic expertise and global experience deliver measurable results and long-term success.
              </p>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
                {['Cost-Effective', 'Global Experience', '24/7 Support', 'Long-Term Partnerships'].map((benefit) => (
                  <li key={benefit} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.05rem', fontWeight: '500' }}>
                    <CheckCircle color="var(--color-secondary)" size={20} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-pill-primary" style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-secondary)' }}>
                Schedule Consultation
              </Link>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Consultation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto Modal - Portaled to avoid transform containing blocks */}
      {isMottoModalOpen && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setIsMottoModalOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '16px', padding: '3rem 2.5rem', maxWidth: '750px', width: '100%', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setIsMottoModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer', color: 'var(--color-text-muted)', lineHeight: 1 }}>&times;</button>
            
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '2rem', borderBottom: '3px solid var(--color-secondary)', paddingBottom: '1rem', display: 'inline-block' }}>Our Motto is Service Before Self</h2>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                "Serve client with integrity and honesty,",
                "TIIS proposed collaborative, multidisciplinary, and innovative solutions that are based on research and supported by modern technology",
                "To provide client satisfaction come first, always and every time",
                "Innovating and leading customer's / stakeholder's success comes first, always and every time",
                "Business units, individual functions, teams that we lead come next",
                "Interest of self, personal needs, desires comes last, always and every time",
                "TIIS is symbolic of a transformed organization that has an energized, disciplined, and passionate workforce marching towards a common goal with the principle of Service Before Self."
              ].map((text, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  <CheckCircle color="var(--color-secondary)" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>,
        document.body
      )}

      {/* News Detail Modal */}
      {selectedNews && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedNews(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
          >
            <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-xl hover:bg-white transition-colors cursor-pointer border border-black/10">&times;</button>
            
            <div className="h-64 relative shrink-0">
               {selectedNews.imageUrl ? (
                 <img src={selectedNews.imageUrl} alt={selectedNews.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <FileText size={64} />
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <div className="absolute bottom-6 left-8 right-8">
                 <div className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">
                   {new Date(selectedNews.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                 </div>
                 <h2 className="text-3xl text-white font-black leading-tight uppercase relative z-10">{selectedNews.title}</h2>
               </div>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedNews.content}
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default Home;

