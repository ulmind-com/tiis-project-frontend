import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Clock, Activity, UserPlus, FileText, CheckCircle, ArrowRight, Phone, CalendarHeart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
});

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } }
});

const Caregivers = () => {
  return (
    <div className="caregivers-page animate-fade-in" style={{ backgroundColor: 'var(--color-page-bg)', overflowX: 'hidden' }}>
      
      <style>{`
        @media (max-width: 768px) {
          .care-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center !important; }
          .care-hero-content { align-items: center !important; }
          .care-hero-content p { text-align: center !important; }
          .care-stats { flex-direction: column !important; gap: 1.5rem !important; }
          .care-services-grid { grid-template-columns: 1fr !important; }
          .care-process-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .process-connector { display: none !important; }
        }
      `}</style>
      
      {/* ── 1. HERO SECTION ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-hero-grad)', padding: '8rem 2rem 6rem', color: 'white' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay', opacity: 0.35, pointerEvents: 'none',
        }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(177,32,35,0.2)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(2,132,199,0.2)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        
        <div className="container care-hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: '1250px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
          
          <div className="care-hero-content" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', color: '#fca5a5', padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '1.5rem', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
              <Heart size={14} fill="#fca5a5" /> Premium Caregiver Services
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.05', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              Compassion Meets <br />
              <span style={{ background: 'linear-gradient(135deg, #fca5a5, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Professional Care.</span>
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ height: '4px', width: '70px', background: 'linear-gradient(90deg, #f43f5e, #fca5a5)', borderRadius: '2px', margin: '0 0 1.5rem 0', originX: 0 }} />

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ fontSize: '1.2rem', maxWidth: '600px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.7', margin: '0 0 2.5rem 0', fontWeight: '400' }}>
              We provide highly trained, empathetic caregivers tailored to meet the exact physical and emotional needs of the elderly and recovering patients, right in the safety and comfort of home.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ background: 'white', color: '#b12023', padding: '1.1rem 2.2rem', borderRadius: '50px', fontWeight: '800', fontSize: '1.05rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.25)' }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)' }}>
                Request Caregiver <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-15px', background: 'radial-gradient(circle, rgba(2,132,199,0.3) 0%, transparent 70%)', filter: 'blur(25px)', zIndex: 0 }} />
            
            <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&fit=crop&w=900&q=80" alt="Caregiver with elderly" style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.02)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }} />
            </div>

            <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '10%', left: '-10%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', padding: '1.25rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.25)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ background: '#10b981', padding: '0.6rem', borderRadius: '12px' }}><ShieldCheck size={24} color="white" /></div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified</p>
                <p style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: '800' }}>Professionals</p>
              </div>
            </motion.div>

            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', top: '10%', right: '-5%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', padding: '1.25rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.25)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ background: '#f43f5e', padding: '0.6rem', borderRadius: '12px' }}><Clock size={24} color="white" /></div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Support</p>
                <p style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: '800' }}>24/7 Available</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>



      {/* ── 3. CORE SERVICES GRID ── */}
      <section style={{ padding: '8rem 2rem', background: 'var(--color-page-bg)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp()} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ display: 'inline-block', color: '#b12023', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.9rem' }}>Comprehensive Support</span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '1.25rem', letterSpacing: '-0.5px' }}>
              Specialized Caregiving Services
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7' }}>
              From routine daily assistance to complex medical observation, our services are meticulously structured to provide holistic, dignified care for every unique situation.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer(0.15)} className="care-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            {[
              { icon: UserPlus, title: 'Eldercare & Companionship', desc: 'Assistance with daily living activities, safe mobility, and providing warm, meaningful companionship to prevent emotional isolation.', color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)' },
              { icon: Activity, title: 'Post-Operative Recovery', desc: 'Dedicated supervision and care following hospital discharge, ensuring strict medication adherence and safe, accelerated recovery.', color: '#f43f5e', bg: 'rgba(244,63,94,0.1)' },
              { icon: FileText, title: 'Chronic Illness Management', desc: 'Routine and precise monitoring of vital signs, symptom tracking, and seamless coordination with primary healthcare physicians.', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
              { icon: Sparkles, title: 'Dementia & Alzheimer\'s', desc: 'Specialized cognitive support and patience-driven care to maintain a secure, comforting, and familiar environment at all times.', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeUp()} whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }} style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color-strong)', padding: '2.5rem', borderRadius: '24px', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: service.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.color }}>
                    <service.icon size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--color-text-heading)', margin: 0 }}>{service.title}</h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </section>

      {/* ── 4. OUR PROCESS (STEPS) ── */}
      <section style={{ padding: '8rem 2rem', background: 'linear-gradient(to bottom, #ffffff, var(--color-page-bg))', borderTop: '1px solid var(--border-color-strong)', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp()} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '1.25rem', letterSpacing: '-0.5px' }}>
              Our Systematic Approach
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
              A seamless, transparent, and empathetic process designed specifically to match you with the perfect caregiver without any stress.
            </p>
          </motion.div>

          <div style={{ position: 'relative' }}>
            <div className="process-connector" style={{ position: 'absolute', top: '45px', left: '10%', right: '10%', height: '3px', background: 'linear-gradient(90deg, transparent, rgba(177,32,35,0.3), transparent)', zIndex: 0 }} />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer(0.2)} className="care-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', position: 'relative', zIndex: 1 }}>
              {[
                { step: '01', title: 'Consultation', desc: 'We assess your specific medical and emotional needs thoroughly.', icon: Phone },
                { step: '02', title: 'Matching', desc: 'Pairing you with a caregiver customized to your exact requirements.', icon: UserPlus },
                { step: '03', title: 'Introduction', desc: 'A supervised initial meeting to ensure absolute comfort.', icon: CalendarHeart },
                { step: '04', title: 'Care Delivery', desc: 'Commencement of dedicated care with continuous quality monitoring.', icon: Heart }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp()} style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'var(--color-card-bg)', border: '2px solid #b12023', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b12023', boxShadow: '0 10px 30px rgba(177,32,35,0.2)', position: 'relative', zIndex: 2 }}>
                    <item.icon size={36} />
                  </div>
                  <div style={{ position: 'absolute', top: '-15px', right: '10px', fontSize: '5rem', fontWeight: '900', color: 'rgba(177,32,35,0.04)', zIndex: 0, pointerEvents: 'none' }}>{item.step}</div>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>{item.title}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.6', margin: 0, position: 'relative', zIndex: 1 }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* ── 5. PREMIUM CTA SECTION ── */}
      <section style={{ background: 'linear-gradient(135deg, #01324e 0%, #b12023 100%)', padding: '7rem 2rem', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', borderRadius: '30%', border: '2px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '30%', border: '2px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer(0.1)}>
            <motion.div variants={fadeUp()} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.15)', padding: '0.6rem 1.25rem', borderRadius: '50px', marginBottom: '1.75rem', backdropFilter: 'blur(10px)' }}>
              <CheckCircle size={18} /> <span style={{ fontSize: '0.95rem', fontWeight: '700', letterSpacing: '0.5px' }}>Trusted by Leading Healthcare Professionals</span>
            </motion.div>
            <motion.h2 variants={fadeUp()} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.15', letterSpacing: '-0.5px', textShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
              Ensure Your Loved Ones Get the Absolute Best Care.
            </motion.h2>
            <motion.p variants={fadeUp()} style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '3.5rem', lineHeight: '1.7', fontWeight: '400', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
              Don't wait. Reach out to set up a personalized, professional strategy for elite caregiving support today.
            </motion.p>
            <motion.div variants={fadeUp()} style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" onClick={() => window.scrollTo(0,0)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 3rem', borderRadius: '50px', background: 'white', color: '#b12023', fontWeight: '800', fontSize: '1.1rem', textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 15px 30px rgba(0,0,0,0.25)' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)' }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25)' }}>
                Contact Us Now <ArrowRight size={20} />
              </Link>
              <a href="tel:8700409793" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 3rem', borderRadius: '50px', background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.4)', fontWeight: '800', fontSize: '1.1rem', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'white' }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}>
                <Phone size={20} /> 8700409793
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Caregivers;
