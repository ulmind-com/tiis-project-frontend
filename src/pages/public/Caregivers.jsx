import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Clock, Activity, UserPlus, FileText, CheckCircle, ArrowRight, Phone, CalendarHeart, Sparkles, Send, Loader2, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
});

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } }
});

const Caregivers = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', service: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await api.post('/api/caregiver-enquiries', {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        service: formData.service,
        note: formData.note
      });
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', location: '', service: '', note: '' });
    } catch (error) {
      console.error("Error submitting caregiver request:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
    }
  };

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
              <button 
                onClick={() => document.getElementById('caregiver-form')?.scrollIntoView({ behavior: 'smooth' })} 
                style={{ background: 'white', color: '#b12023', padding: '1.1rem 2.2rem', borderRadius: '50px', fontWeight: '800', fontSize: '1.05rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transition: 'all 0.3s', border: 'none', cursor: 'pointer' }} 
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.25)' }} 
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)' }}
              >
                Request Caregiver <ArrowRight size={18} />
              </button>
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

      {/* ── 5. PREMIUM CAREGIVER REQUEST FORM ── */}
      <section id="caregiver-form" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311634 100%)', padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', borderRadius: '40%', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '40%', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 60%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1250px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '4rem', alignItems: 'center' }} className="caregiver-form-grid">
            
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ color: 'white' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1.2rem', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50px', marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
                <Sparkles size={16} color="#fbbf24" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#fbbf24' }}>Request Caregiver</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1', textShadow: '0 4px 20px rgba(0,0,0,0.3)', letterSpacing: '-1px' }}>
                Find the Perfect Match for Your <span style={{ background: 'linear-gradient(135deg, #f472b6, #fb7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Loved Ones.</span>
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '2.5rem', fontWeight: '400', maxWidth: '500px' }}>
                Fill out the secure form to request a professional caregiver. Our placement team will review your requirements and connect you with a specialized expert within 24 hours.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { title: 'Tailored Pairing', desc: 'Matched by medical needs, personality, and expertise.', icon: UserPlus },
                  { title: 'Verified Professionals', desc: '100% background-checked and medically certified.', icon: ShieldCheck },
                  { title: 'Secure & Confidential', desc: 'Your medical data is strongly encrypted and private.', icon: CheckCircle }
                ].map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '12px', color: '#fbbf24', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <feature.icon size={22} />
                    </div>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 0.3rem 0' }}>{feature.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '30px', padding: '3rem', boxShadow: '0 30px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Send size={24} color="#f472b6" /> Request Details
                </h3>

                {submitStatus === 'success' ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '16px', padding: '2rem', textAlign: 'center', color: '#34d399' }}>
                    <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>Request Received!</h4>
                    <p style={{ margin: 0, opacity: 0.8 }}>Thank you for reaching out. Our team will contact you shortly to confirm the caregiver assignment.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                    
                    {submitStatus === 'error' && (
                      <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '1rem', color: '#fca5a5', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={18} /> Something went wrong. Please try again later.
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleFormChange} placeholder="Enter your name" style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem 1.2rem', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={e => { e.target.style.borderColor = '#f472b6'; e.target.style.backgroundColor = 'rgba(0,0,0,0.4)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleFormChange} placeholder="Enter your phone" style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem 1.2rem', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={e => { e.target.style.borderColor = '#f472b6'; e.target.style.backgroundColor = 'rgba(0,0,0,0.4)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location *</label>
                      <input type="text" name="location" required value={formData.location} onChange={handleFormChange} placeholder="City, Area" style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem 1.2rem', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={e => { e.target.style.borderColor = '#f472b6'; e.target.style.backgroundColor = 'rgba(0,0,0,0.4)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Choose a Service *</label>
                      <div style={{ position: 'relative' }}>
                        <select name="service" required value={formData.service} onChange={handleFormChange} style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem 1.2rem', color: formData.service ? 'white' : 'rgba(255,255,255,0.5)', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', appearance: 'none', cursor: 'pointer' }} onFocus={e => { e.target.style.borderColor = '#f472b6'; e.target.style.backgroundColor = 'rgba(0,0,0,0.4)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; }}>
                          <option value="" disabled>Select the specialized care needed</option>
                          <option value="Specialized Nurse" style={{ color: 'black' }}>Specialized Nurse</option>
                          <option value="Trained attendant at Home" style={{ color: 'black' }}>Trained attendant at Home</option>
                          <option value="Senior Care" style={{ color: 'black' }}>Senior Care</option>
                          <option value="Post surgery care" style={{ color: 'black' }}>Post surgery care</option>
                          <option value="Others" style={{ color: 'black' }}>Others</option>
                        </select>
                        <div style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5, color: 'white' }}>
                          <ChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Note (Optional)</label>
                      <textarea name="note" value={formData.note} onChange={handleFormChange} placeholder="Any specific requirements..." rows="3" style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem 1.2rem', color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', resize: 'vertical' }} onFocus={e => { e.target.style.borderColor = '#f472b6'; e.target.style.backgroundColor = 'rgba(0,0,0,0.4)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; }}></textarea>
                    </div>

                    <button type="submit" disabled={isSubmitting} style={{ width: '100%', background: 'linear-gradient(135deg, #f472b6, #fb7185)', color: 'white', border: 'none', borderRadius: '12px', padding: '1.25rem', fontSize: '1.1rem', fontWeight: '800', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', opacity: isSubmitting ? 0.7 : 1, boxShadow: '0 10px 20px rgba(244,114,182,0.3)' }} onMouseEnter={e => { if(!isSubmitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(244,114,182,0.4)'; } }} onMouseLeave={e => { if(!isSubmitting) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(244,114,182,0.3)'; } }}>
                      {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Submitting Request...</> : 'Send Caregiver Request'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .caregiver-form-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

    </div>
  );
};

export default Caregivers;
