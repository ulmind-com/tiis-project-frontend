import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-page animate-fade-in" style={{ paddingBottom: '4rem', overflowX: 'hidden' }}>

      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          /* General Adjustments */
          .container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }

          /* Hero Section */
          .about-hero { padding: 6rem 1.5rem 4rem !important; border-bottom: none !important; }
          .about-hero-title { font-size: 2.8rem !important; margin-bottom: 0.5rem !important; }
          .about-hero-box { 
            padding: 2rem 1.5rem !important; 
            margin-top: 2rem !important; 
            border-radius: 20px !important; 
          }
          .about-hero-box h2 { font-size: 1.5rem !important; text-align: center; }
          .about-hero-box p { font-size: 1rem !important; text-align: center; }

          /* Vision / Mission / Philosophy Grid */
          .about-grid-container { margin-top: -1.5rem !important; padding: 0 1rem !important; }
          .about-grid { gap: 1.5rem !important; }
          .about-card { padding: 2rem 1.5rem !important; }
          .about-card h3 { font-size: 1.3rem !important; text-align: center; }
          .about-card p { font-size: 0.95rem !important; text-align: center; }
          .about-icon-wrapper { margin: 0 auto 1.5rem !important; }
          .about-card-bar { display: none !important; } /* Hide left bar on mobile for cleaner look */

          /* Alternating Clipart Sections */
          .about-clipart-section { padding: 4rem 1.5rem !important; }
          .about-clipart-wrapper { gap: 5rem !important; }
          .about-clipart-row { 
            flex-direction: column !important; 
            gap: 2rem !important; 
            text-align: center;
          }
          /* Override reverse for mobile to always keep image on top */
          .about-clipart-row.reverse-desktop { flex-direction: column-reverse !important; }
          
          .about-clipart-text { padding: 0 !important; }
          .about-clipart-text h2 { font-size: 2rem !important; margin-bottom: 1rem !important; }
          .about-clipart-text p { font-size: 1rem !important; }
          .about-clipart-img { width: 100% !important; max-width: 320px !important; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      {/* Premium Hero Section */}
      <section className="about-hero" style={{
        position: 'relative',
        padding: '8rem 5% 6rem',
        background: 'linear-gradient(135deg, var(--color-background) 0%, #f1f5f9 100%)',
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
            className="about-hero-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '24px',
              padding: '3rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)',
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
              Thoughtful Institute of Innovative Solutions
            </h2>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
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

        {/* Alternating Clipart Sections */}
        <section className="about-clipart-section" style={{ padding: '6rem 5%' }}>
          <div className="about-clipart-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8rem', maxWidth: '1200px', margin: '0 auto' }}>

            {/* Section 1: Text Left, Image Right */}
            <motion.div
              className="about-clipart-row"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}
            >
              <div className="about-clipart-text" style={{ flex: '1 1 400px', paddingRight: '2rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: '800', color: 'var(--color-primary-dark)', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                  Envisioning the Future
                </h2>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p>The working methodologies and conceptualization of ideologies at Capsitech IT Services are premised upon the effectual implementation of business strategies and protocols to ensure a leap in the trajectory of progress.</p>
                </div>
              </div>
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <img className="about-clipart-img" src="/src/assets/images/about_future.svg" alt="Envisioning Future" style={{ width: '100%', maxWidth: '500px', height: 'auto', dropShadow: '0 20px 40px rgba(0,0,0,0.05)' }} />
              </div>
            </motion.div>

            {/* Section 2: Image Left, Text Right (Reversed on Desktop) */}
            <motion.div
              className="about-clipart-row reverse-desktop"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '4rem' }}
            >
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <img className="about-clipart-img" src="/src/assets/images/about_tech.svg" alt="Technical Proficiency" style={{ width: '100%', maxWidth: '500px', height: 'auto', dropShadow: '0 20px 40px rgba(0,0,0,0.05)' }} />
              </div>
              <div className="about-clipart-text" style={{ flex: '1 1 400px', paddingLeft: '2rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: '800', color: 'var(--color-primary-dark)', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                  Technical Proficiency
                </h2>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p>Our team has mastery in comprehending the business challenges and then develop ideal solutions to ameliorate the business process by placing the technical platform as a medium of increasing the productivity of the businesses processes.</p>
                  <p>The technical team at Capsitech is skilled to develop technical tools and mobile applications by using the latest technologies available. The intent of the technical team is to develop solutions that are smooth, error-free, and easy to operate. The technical team firmly follows the business requirements and develop the most efficacious portals without compromising on any aspect of the overall business.</p>
                </div>
              </div>
            </motion.div>

            {/* Section 3: Text Left, Image Right */}
            <motion.div
              className="about-clipart-row"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}
            >
              <div className="about-clipart-text" style={{ flex: '1 1 400px', paddingRight: '2rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: '800', color: 'var(--color-primary-dark)', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                  Research and Development
                </h2>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p>Our research and development wing makes attempts to examine the business processes and then identify the existing problems or sections that requires an added technical support for better functioning.</p>
                  <p>We, at Capsitech, understand the significance of focusing on meticulous details of a business before developing a solution for it and hence, a copious amount of importance is given to the research wing.</p>
                  <p>In the course of the development of our products, the results and the analysis made during the research phase plays the biggest role in determining the development strategies for the technical team.</p>
                </div>
              </div>
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <img className="about-clipart-img" src="/src/assets/images/about_rnd.svg" alt="Research and Development" style={{ width: '100%', maxWidth: '500px', height: 'auto', dropShadow: '0 20px 40px rgba(0,0,0,0.05)' }} />
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default About;