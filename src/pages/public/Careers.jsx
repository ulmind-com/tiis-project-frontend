import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import api from '../../api';
import { MapPin, Briefcase, ArrowRight, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ─────────────────────────────────────────
   Animation Variants (copied from Services)
───────────────────────────────────────── */
const fadeUp = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } },
});

const staggerContainer = (stagger = 0.1, delayStart = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delayStart } },
});

const listItemVariant = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────────
   Animated line accent
───────────────────────────────────────── */
const GrowLine = ({ color = '#b12023', delay = 0 }) => (
  <motion.span
    initial={{ scaleX: 0, originX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: 'block', height: '2px', width: '28px', backgroundColor: color, borderRadius: '2px' }}
  />
);

/* ─────────────────────────────────────────
   Utility for Card Gradients
───────────────────────────────────────── */
const getCardGradient = (index) => {
  const gradients = [
    'linear-gradient(135deg, #01324e 0%, #024b76 100%)',
    'linear-gradient(135deg, #7c1015 0%, #b12023 100%)',
    'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
    'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
  ];
  return gradients[index % gradients.length];
};

const getAccentColor = (index) => {
  const colors = ['#0ea5e9', '#f43f5e', '#10b981', '#a78bfa', '#fbbf24'];
  return colors[index % colors.length];
};

/* ─────────────────────────────────────────
   Job Card Component
───────────────────────────────────────── */
const JobCard = ({ job, index, onApply }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  const gradient = getCardGradient(index);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp((index % 3) * 0.12)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: '1px solid var(--border-color)',
        breakInside: 'avoid',
        transition: 'all 0.3s'
      }}
      onClick={() => onApply(job)}
    >
      {/* ── Top Image Area ── */}
      <div style={{
        height: '220px',
        position: 'relative',
        overflow: 'hidden',
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {job.image ? (
          <img
            src={job.image}
            alt={job.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s',
              transform: hovered ? 'scale(1.08)' : 'scale(1)'
            }}
          />
        ) : (
          <Briefcase size={56} color="rgba(255,255,255,0.3)" />
        )}
        
        {/* Subtle overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)' }} />
        
        {/* Top-Right Experience Badge */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid rgba(255,255,255,0.3)' }}>
          {job.experience}
        </div>
      </div>

      {/* ── Card Body ── */}
      <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '0.6rem', lineHeight: '1.3' }}>
          {job.title}
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: '600', marginBottom: '1.75rem' }}>
          <MapPin size={16} color="var(--color-primary)" /> {job.location}
        </div>

        {/* Read More Button */}
        <button
          onClick={e => { e.stopPropagation(); onApply(job); }}
          style={{
            marginTop: 'auto',
            width: '100%',
            padding: '0.85rem',
            borderRadius: '14px',
            background: hovered ? 'var(--color-primary)' : 'transparent',
            color: hovered ? 'white' : 'var(--color-primary)',
            border: `1.5px solid ${hovered ? 'transparent' : 'var(--color-primary)'}`,
            fontWeight: '700',
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            transition: 'all 0.3s'
          }}
        >
          Read More <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Application Modal (similar to ServiceModal)
───────────────────────────────────────── */
const ApplicationModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', cv: null });
  const [submitStatus, setSubmitStatus] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (job) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    const data = new FormData();
    data.append('job', job._id);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    if (formData.cv) data.append('cv', formData.cv);

    try {
      await api.post('/api/applications', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSubmitStatus('success');
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  if (!job) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="app-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          className="app-modal-card"
          key="app-modal-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color)',
            borderRadius: '24px', padding: '3rem',
            maxWidth: '750px', width: '100%', position: 'relative',
            boxShadow: '0 40px 100px -16px rgba(0,0,0,0.5)',
            maxHeight: '92vh', overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <motion.button
            className="app-modal-close"
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'var(--color-bg-light)', border: '1px solid var(--border-color)',
              width: '40px', height: '40px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--color-text-main)', zIndex: 10
            }}
          >
            <X size={20} />
          </motion.button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <motion.h2
              className="app-modal-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{
                fontSize: '2.2rem', color: 'var(--color-text-heading)',
                fontWeight: '800', lineHeight: '1.2', margin: 0
              }}
            >
              {job.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: 'var(--color-text-muted)', fontWeight: '600', fontSize: '0.95rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--color-bg-light)', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                <MapPin size={16} color="var(--color-primary)" /> {job.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--color-bg-light)', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                <Briefcase size={16} color="var(--color-primary)" /> {job.experience}
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ 
                color: 'var(--color-text-main)', fontSize: '1.05rem', lineHeight: '1.7', 
                whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '1rem',
                backgroundColor: 'rgba(0,0,0,0.02)', padding: '1.5rem', 
                borderRadius: '16px', border: '1px solid var(--border-color)',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.03)'
              }}
            >
              {job.description}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="apply-btn"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: '1rem' }}
              >
                <motion.button
                  onClick={() => setShowForm(true)}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #01324e 0%, #024b76 100%)',
                    color: 'white', border: 'none', borderRadius: '50px', padding: '1.2rem 3rem',
                    fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(2,75,118,0.3)',
                    display: 'flex', alignItems: 'center', gap: '0.6rem'
                  }}
                >
                  Apply for this Job
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="application-form"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '1.5rem' }}
              >
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-text-heading)', marginBottom: '1.5rem' }}>Submit Your Application</h3>

                {submitStatus === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <CheckCircle size={50} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Application Submitted!</h3>
                    <p style={{ color: 'var(--color-text-main)', opacity: 0.8 }}>Thank you! We'll review your details and get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                  >
                    <div className="app-modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name *</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: '1.5px solid rgba(148, 163, 184, 0.6)', outline: 'none', backgroundColor: 'transparent', color: 'var(--color-text-main)', fontSize: '1rem', transition: 'border-color 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = 'rgba(148, 163, 184, 0.6)'} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address *</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: '1.5px solid rgba(148, 163, 184, 0.6)', outline: 'none', backgroundColor: 'transparent', color: 'var(--color-text-main)', fontSize: '1rem', transition: 'border-color 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = 'rgba(148, 163, 184, 0.6)'} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number *</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: '1.5px solid rgba(148, 163, 184, 0.6)', outline: 'none', backgroundColor: 'transparent', color: 'var(--color-text-main)', fontSize: '1rem', transition: 'border-color 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = 'rgba(148, 163, 184, 0.6)'} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Upload CV (PDF/DOC) *</label>
                      <input required type="file" accept=".pdf,.doc,.docx" onChange={e => setFormData({ ...formData, cv: e.target.files[0] })} style={{ padding: '0.75rem', borderRadius: '12px', border: '1.5px dashed rgba(148, 163, 184, 0.6)', outline: 'none', backgroundColor: 'transparent', color: 'var(--color-text-main)', cursor: 'pointer', fontSize: '0.95rem', transition: 'border-color 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = 'rgba(148, 163, 184, 0.6)'} />
                    </div>

                    <motion.button
                      className="app-modal-submit"
                      whileTap={{ scale: 0.97 }}
                      type="submit" disabled={submitStatus === 'submitting'}
                      style={{
                        marginTop: '1.5rem', background: 'linear-gradient(135deg, #01324e 0%, #024b76 100%)',
                        color: 'white', border: 'none', borderRadius: '12px', padding: '1.2rem',
                        fontWeight: '800', fontSize: '1.05rem', cursor: submitStatus === 'submitting' ? 'wait' : 'pointer',
                        boxShadow: '0 8px 25px rgba(2,75,118,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', opacity: submitStatus === 'submitting' ? 0.7 : 1, transition: 'all 0.3s'
                      }}
                      onMouseEnter={e => { if(!submitStatus) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(2,75,118,0.4)'; } }}
                      onMouseLeave={e => { if(!submitStatus) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(2,75,118,0.3)'; } }}
                    >
                      {submitStatus === 'submitting' ? 'Submitting Application...' : 'Submit Final Application'}
                    </motion.button>
                  </motion.form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

/* ─────────────────────────────────────────
   Main Careers Page
───────────────────────────────────────── */
const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/api/jobs');
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="animate-fade-in" style={{ overflowX: 'hidden' }}>

      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          /* General Container */
          .container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          
          /* Hero Section */
          .careers-hero { padding: 6rem 1.5rem 4rem !important; }
          .careers-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center !important; }
          .careers-hero-content { text-align: center !important; align-items: center !important; }
          .careers-hero-content div { margin: 0 auto 1.5rem !important; }
          .careers-hero h1 { font-size: 2.5rem !important; margin-bottom: 1rem !important; line-height: 1.2 !important; text-align: center !important; }
          .careers-hero p { font-size: 1rem !important; line-height: 1.6 !important; padding: 0 0.5rem; text-align: center !important; margin: 0 auto !important; }

          /* Cards Section */
          .careers-section { padding: 4rem 1.5rem !important; }
          .section-header-title { font-size: 2rem !important; line-height: 1.2 !important; }

          /* Column Grid Stacking for Mobile */
          .job-categories-wrapper { grid-template-columns: 1fr !important; gap: 3rem !important; }
          
          /* Inner Card Spacing */
          .job-card-banner { padding: 1.5rem 1.5rem 1.25rem !important; }
          .job-card-banner h3 { font-size: 1.25rem !important; }
          .job-card-body { padding: 1.5rem !important; }

          /* Application Modal */
          .app-modal-card { padding: 2rem 1.5rem !important; width: 92% !important; margin: 0 auto; max-height: 85vh !important; border-radius: 18px !important; }
          .app-modal-close { top: 1rem !important; right: 1rem !important; font-size: 2rem !important; }
          .app-modal-title { font-size: 1.5rem !important; padding-bottom: 0.75rem !important; margin-bottom: 1rem !important; }
          
          /* Form Grid Stacking */
          .app-modal-form-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .app-modal-submit { width: 100%; justify-content: center; text-align: center; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="careers-hero" style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--color-hero-grad)',
        padding: '7rem 2rem 5rem', color: 'white',
      }}>
        {/* Subtle Background Image Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
          opacity: 0.55,
          pointerEvents: 'none',
        }} />

        {/* Animated floating blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px',
            borderRadius: '50%', background: 'rgba(177,32,35,0.15)', filter: 'blur(60px)', pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px',
            borderRadius: '50%', background: 'rgba(14,165,233,0.14)', filter: 'blur(50px)', pointerEvents: 'none',
          }}
        />

        <div className="container careers-hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* Text Content */}
          <div className="careers-hero-content" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#f87171', padding: '0.4rem 1.25rem',
                borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em',
                marginBottom: '1.25rem', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              Join Our Team
            </motion.span>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            >
              Careers 
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '3px', width: '60px', background: 'linear-gradient(90deg, #b12023, #f43f5e)', borderRadius: '2px', margin: '0 0 1.5rem 0', originX: 0 }}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: '1.2rem', maxWidth: '600px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', margin: 0 }}
            >
              We partner with leaders to unlock sustainable performance. Come architect the future of consulting with us and chart your happiness.
            </motion.p>
          </div>

          {/* Premium Illustration / Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* Glowing Backdrop */}
            <div style={{ position: 'absolute', inset: '-10px', background: 'radial-gradient(circle, rgba(177,32,35,0.3) 0%, transparent 60%)', filter: 'blur(20px)', zIndex: 0 }} />
            
            <motion.img
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="Careers at TIIS Workspace"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '24px',
                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            />

            {/* Floating Element Check */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', top: '20%', right: '-10%',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)',
                zIndex: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
            >
              <CheckCircle size={28} color="#10b981" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CARDS SECTION
      ══════════════════════════════════════ */}
      <section className="careers-section" style={{
        padding: '5rem 2rem 6rem',
        background: 'var(--color-page-grad)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-120px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }} style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer(0.12, 0)} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div variants={fadeUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', color: 'var(--color-text-heading)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              <GrowLine delay={0.2} /> Current Openings <GrowLine delay={0.35} />
            </motion.div>
            <motion.h2 className="section-header-title" variants={fadeUp(0.1)} style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: '800', color: 'var(--color-text-heading)', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
              Explore Opportunities
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ height: '3px', width: '50px', background: '#b12023', borderRadius: '2px', margin: '0.9rem auto 0', originX: 0.5 }} />
          </motion.div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01324e]"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--color-card-bg)', borderRadius: '20px', boxShadow: '0 6px 30px rgba(0,0,0,0.08)' }}>
              <Briefcase size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-heading)' }}>No open positions</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="job-categories-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              
              {/* Category 1: Open Position */}
              <div className="job-category-column">
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '2px solid rgba(177,32,35,0.15)', paddingBottom: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 10px rgba(59,130,246,0.6)' }} /> Open Positions
                </h3>
                {jobs.filter(job => job.category === 'Open Position' || !job.category).length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {jobs.filter(job => job.category === 'Open Position' || !job.category).map((job, index) => (
                      <JobCard key={job._id} job={job} index={index} onApply={setSelectedJob} />
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', background: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>No openings right now.</p>
                )}
              </div>

              {/* Category 2: Caregivers Enroll */}
              <div className="job-category-column">
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '2px solid rgba(177,32,35,0.15)', paddingBottom: '0.75rem' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px rgba(16,185,129,0.6)' }} /> Caregivers Enroll
                </h3>
                {jobs.filter(job => job.category === 'Caregivers Enroll').length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {jobs.filter(job => job.category === 'Caregivers Enroll').map((job, index) => (
                      <JobCard key={job._id} job={job} index={index} onApply={setSelectedJob} />
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', background: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>No openings right now.</p>
                )}
              </div>

              {/* Category 3: TIIS Openings */}
              <div className="job-category-column">
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '2px solid rgba(177,32,35,0.15)', paddingBottom: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#8b5cf6', boxShadow: '0 0 10px rgba(139,92,246,0.6)' }} /> TIIS Openings
                </h3>
                {jobs.filter(job => job.category === 'TIIS Openings').length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {jobs.filter(job => job.category === 'TIIS Openings').map((job, index) => (
                      <JobCard key={job._id} job={job} index={index} onApply={setSelectedJob} />
                    ))}
                  </div>
                ) : (
                   <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', background: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>No openings right now.</p>
                )}
              </div>

            </div>
          )}
        </div>
      </section>

      {/* ── Modal Portal ── */}
      {selectedJob && (
        <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default Careers;