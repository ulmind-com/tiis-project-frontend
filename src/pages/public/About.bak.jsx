import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-page animate-fade-in" style={{ paddingBottom: '4rem', overflowX: 'hidden', background: 'var(--color-page-grad)', minHeight: '100vh' }}>

      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          /* General Adjustments */
          .container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }

          /* Hero Section */
          .about-hero { padding: 6rem 1.5rem 4rem !important; border-bottom: none !important; }
          .about-hero-title { font-size: 2.8rem !important; margin-bottom: 0.5rem !important; }
          
          .about-hero-content { margin-top: 2rem !important; text-align: center !important; }
          .about-hero-content h2 { font-size: 1.5rem !important; text-align: center; }
          .about-hero-content div { text-align: center !important; font-size: 1rem !important; }

          /* Vision / Mission / Philosophy Grid */
          .about-grid-container { margin-top: -1.5rem !important; padding: 0 1rem !important; }
          .about-grid { gap: 1.5rem !important; }
          .about-card { padding: 2rem 1.5rem !important; }
          .about-card h3 { font-size: 1.3rem !important; text-align: center; }
          .about-card p, .about-card div { font-size: 0.95rem !important; text-align: center; }
          .about-icon-wrapper { margin: 0 auto 1.5rem !important; display: flex !important; }
          .about-card-bar { display: none !important; } /* Clean look for mobile */

          /* Our Solutions Section */
          .solutions-section { padding-top: 4rem !important; padding-bottom: 2rem !important; }
          .solutions-header h2 { font-size: 2rem !important; line-height: 1.2 !important; margin-bottom: 1rem !important; }
          .solutions-header p { font-size: 1rem !important; }
          .solutions-subheader h3 { font-size: 1.4rem !important; margin-bottom: 2rem !important; }
          
          /* Solution Cards Mobile App-like Layout */
          .solutions-grid { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          .solution-card { 
            padding: 1.2rem 1.5rem !important; 
            max-width: 100% !important; 
            flex-direction: row !important; /* Makes it a sleek list on mobile */
            text-align: left !important; 
            justify-content: flex-start !important; 
          }
          .solution-card-icon { 
            width: 48px !important; 
            height: 48px !important; 
            margin-bottom: 0 !important; 
            margin-right: 1rem !important; 
          }
          .solution-card h4 { font-size: 1.1rem !important; text-align: left !important; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      {/* Premium Hero Section */}
      <section className="about-hero" style={{
        position: 'relative',
        padding: '8rem 5% 6rem',
        background: 'transparent',
        textAlign: 'center',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        {/* Background Decorative Orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)', filter: 'blur(50px)', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <motion.h1
            className="about-hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: '900',
              letterSpacing: '-1px',
              background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}
          >
            About Us
          </motion.h1>

          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              marginTop: '3rem',
              textAlign: 'left'
            }}
          >
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: 'var(--color-primary-dark)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.5px'
            }}>
              Thoughtful Institute of Innovative Solutions, LLP
            </h2>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'justify' }}>
              <p>
                We at TIIS offer customized-based solutions that help increase productivity, performance, and profitability. We believe in customizing and developing specific solutions through a collaborative process designed to identify a client’s needs. Our approach is based on experiential learning combined with the technology and strong faculty of experts and competent solutions providers.
              </p>
              <p>
                We aim to develop a partnership with our clients by collaborating, cooperating, and coordinating. By improving practices in people and organization development, we ensure that work benefits individuals, businesses, economies, and society at large.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container about-grid-container" style={{ position: 'relative', zIndex: 2, marginTop: '-3rem', padding: '0 5%' }}>
        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Vision Card */}
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="about-card-bar" style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #3b82f6, #60a5fa)' }} />
            <div className="about-icon-wrapper" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', marginBottom: '1.5rem'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            </div>
            <h3 style={{ color: 'var(--color-primary-dark)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.3px' }}>Vision</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem', flex: 1 }}>
              To become one of the top solution provider company in India by 2030, leading in the fields of Human happiness development and develop the strength of human capital so that overall and sustainable development is possible.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="about-card-bar" style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #8b5cf6, #a78bfa)' }} />
            <div className="about-icon-wrapper" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', marginBottom: '1.5rem'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
            </div>
            <h3 style={{ color: 'var(--color-primary-dark)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.3px' }}>Mission</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem', flex: 1 }}>
              To prepare and empower Solutionaries who is the business driver and implement equitable and sustainable solutions for India and the world.
            </p>
          </motion.div>

          {/* Philosophy Card */}
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: 'var(--color-navbar-bg)',
              backdropFilter: 'blur(16px)',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid var(--border-color-strong)',
              gridColumn: '1 / -1',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="about-card-bar" style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #10b981, #34d399)' }} />
            <div className="about-icon-wrapper" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '1.5rem'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" /><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" /><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1.26" /><circle cx="12" cy="12" r="10" /></svg>
            </div>
            <h3 style={{ color: 'var(--color-primary-dark)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.3px' }}>Philosophy</h3>
            <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p>
                To cope, this world needs research-based customized solutions to maintain the productivity and mental well-being of our human capital to achieve the desired outcome. TIIS proposed collaborative, multidisciplinary, and innovative solutions that are based on research and supported by modern technology. TIIS firmly believes that our talent can work across sectors and apply their design thinking skills to find practical solutions to some of the most critical problems of today without compromising their happiness.
              </p>
              <p>
                Our company is committed to changing the discourse in talent management by making it multidisciplinary and industry-relevant and with a focus on sustainability and design thinking. Through its unique pedagogy, each talent can be developed to become a solutionary—a revolutionary thinker with a solution-oriented mindset—and encouraged to chart her/his happiness.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our Solutions Section */}
        <section className="solutions-section" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              className="solutions-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '4rem' }}
            >
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: 'var(--color-primary-dark)', letterSpacing: '-1px', marginBottom: '1.5rem' }}>
                Our Solutions
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
                TIIS offers the full spectrum of thoughtful researched-based innovative solutions to help organizations and institutions plan better, work better & deliver better in this VUCA world. We design and develop thoughtful innovative solutions to optimize the potential of human capital to strive for the desired business objective and self-satisfaction.
              </p>
            </motion.div>

            <motion.div
              className="solutions-subheader"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '3rem' }}>
                Our key services are
              </h3>

              <div className="solutions-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                justifyItems: 'center'
              }}>
                {[
                  { name: 'Hiring Solutions', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg> },
                  { name: 'Learning & Development', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
                  { name: 'Content Development', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> },
                  { name: 'Business Solutions', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg> },
                  { name: 'Compliance Services', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg> },
                  { name: 'Caregiver Services', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="solution-card"
                    whileHover={{ y: -8, scale: 1.02 }}
                    style={{
                      background: 'var(--color-navbar-bg)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid var(--border-color-strong)',
                      borderRadius: '16px',
                      padding: '2rem',
                      width: '100%',
                      maxWidth: '350px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div className="solution-card-icon" style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.5rem',
                      flexShrink: 0
                    }}>
                      {service.icon}
                    </div>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--color-primary-dark)',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      {service.name}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;