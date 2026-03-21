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
  const accentColor = getAccentColor(index);

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
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 6px 30px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: '1px solid var(--border-color-strong)',
        breakInside: 'avoid',
        marginBottom: '2rem',
      }}
      onClick={() => onApply(job)}
    >
      {/* ── Card Banner ── */}
      <div className="job-card-banner" style={{
        position: 'relative',
        overflow: 'hidden',
        background: job.image ? '#000' : gradient,
        minHeight: job.image ? 'auto' : '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        {job.image && (
          <img
            src={job.image}
            alt={job.title}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              position: 'relative',
              zIndex: 0
            }}
          />
        )}

        {/* Dark overlay for text readability + hover effect (Image Only) */}
        {job.image && (
          <motion.div
            animate={{
              background: hovered
                ? 'linear-gradient(to bottom, rgba(1,40,68,0.3) 0%, rgba(1,40,68,0.95) 100%)'
                : 'linear-gradient(to top, rgba(1,40,68,0.95) 0%, rgba(1,40,68,0) 100%)'
            }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          />
        )}

        {/* Top-Left Floating Icon */}
        <motion.div
          animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{
            position: 'absolute', zIndex: 10,
            top: '1.25rem', left: '1.25rem',
            display: 'inline-flex',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
          }}
        >
          <Briefcase size={20} color="white" />
        </motion.div>

        {/* Content Box Overlay */}
        <div style={{
          position: job.image ? 'absolute' : 'relative',
          bottom: 0, left: 0, right: 0,
          padding: '2rem 2rem 1.5rem',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Animated background blobs on hover (Gradient Only) */}
          {!job.image && (
            <>
              <motion.div
                animate={{ scale: hovered ? 1.3 : 1, opacity: hovered ? 0.18 : 0.07 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  width: '140px', height: '140px', borderRadius: '50%',
                  background: 'white',
                }}
              />
              <motion.div
                animate={{ scale: hovered ? 1.4 : 1, opacity: hovered ? 0.12 : 0.05 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
                style={{
                  position: 'absolute', bottom: '-30px', right: '30px',
                  width: '90px', height: '90px', borderRadius: '50%',
                  background: 'white',
                }}
              />
            </>
          )}

          <motion.h3
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{ position: 'relative', zIndex: 1, color: 'white', fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.3rem', textShadow: job.image ? '0 2px 10px rgba(0,0,0,0.6)' : 'none' }}
          >
            {job.title}
          </motion.h3>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '0.8rem', color: job.image ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.5rem', textShadow: job.image ? '0 2px 8px rgba(0,0,0,0.6)' : 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {job.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Briefcase size={14} /> {job.experience}</span>
          </div>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="job-card-body" style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.75', marginBottom: '1.5rem', fontSize: '0.95rem', flex: 1 }}>
          {job.description}
        </p>

        {/* Apply Now Button */}
        <motion.button
          onClick={e => { e.stopPropagation(); onApply(job); }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            background: gradient, color: 'white',
            border: 'none', borderRadius: '50px',
            padding: '0.85rem 1.5rem', fontWeight: '700',
            fontSize: '0.95rem', cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            marginTop: 'auto'
          }}
        >
          <span>Apply Now</span>
          <motion.span
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ArrowRight size={16} />
          </motion.span>
        </motion.button>
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
            borderRadius: '22px', padding: '3rem 2.75rem',
            maxWidth: '680px', width: '100%', position: 'relative',
            boxShadow: '0 32px 80px -16px rgba(0,0,0,0.4)',
            maxHeight: '90vh', overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <motion.button
            className="app-modal-close"
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.5rem',
              background: 'none', border: 'none',
              fontSize: '2.2rem', cursor: 'pointer',
              color: '#94a3b8', lineHeight: 1,
            }}
          >
            &times;
          </motion.button>

          <motion.h2
            className="app-modal-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              fontSize: '1.85rem', color: 'var(--color-text-heading)',
              marginBottom: '0.5rem', borderBottom: '3px solid #b12023',
              paddingBottom: '0.8rem', display: 'inline-block',
              fontWeight: '800', lineHeight: '1.2',
            }}
          >
            Apply for {job.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '2rem', textTransform: 'uppercase' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {job.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Briefcase size={14} /> {job.experience}</span>
          </motion.div>

          {submitStatus === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle size={60} color="#10b981" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: 'var(--color-text-heading)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Application Submitted!</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Thank you. Check your email for confirmation.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* Responsive Grid applied here */}
              <div className="app-modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)' }}>Full Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color-strong)', outline: 'none', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', fontSize: '0.95rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)' }}>Email Address *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color-strong)', outline: 'none', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', fontSize: '0.95rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)' }}>Phone Number *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color-strong)', outline: 'none', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', fontSize: '0.95rem' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)' }}>Upload CV (PDF/DOC) *</label>
                <input required type="file" accept=".pdf,.doc,.docx" onChange={e => setFormData({ ...formData, cv: e.target.files[0] })} style={{ padding: '0.65rem', borderRadius: '12px', border: '1px dashed var(--border-color-strong)', outline: 'none', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', cursor: 'pointer', fontSize: '0.9rem' }} />
              </div>

              <motion.button
                className="app-modal-submit"
                whileTap={{ scale: 0.97 }}
                type="submit" disabled={submitStatus === 'submitting'}
                style={{
                  marginTop: '1rem', background: 'linear-gradient(135deg, #01324e 0%, #024b76 100%)',
                  color: 'white', border: 'none', borderRadius: '50px', padding: '1rem 2rem',
                  fontWeight: '700', fontSize: '1rem', cursor: submitStatus === 'submitting' ? 'wait' : 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: submitStatus === 'submitting' ? 0.7 : 1
                }}
              >
                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Profile'}
              </motion.button>
            </motion.form>
          )}
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
          .careers-hero h1 { font-size: 2.5rem !important; margin-bottom: 1rem !important; line-height: 1.2 !important; }
          .careers-hero p { font-size: 1rem !important; line-height: 1.6 !important; padding: 0 0.5rem; }

          /* Cards Section */
          .careers-section { padding: 4rem 1.5rem !important; }
          .section-header-title { font-size: 2rem !important; line-height: 1.2 !important; }

          /* Job Card Layout (Fix columnWidth for mobile) */
          .job-cards-container { column-count: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important; }
          
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
        padding: '6rem 2rem 5rem', textAlign: 'center', color: 'white',
      }}>
        {/* Subtle Background Image Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
          opacity: 0.4,
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
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{
            position: 'absolute', top: '20%', left: '30%', width: '200px', height: '200px',
            borderRadius: '50%', background: 'rgba(148,163,184,0.08)', filter: 'blur(40px)', pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block', backgroundColor: 'rgba(177,32,35,0.28)', color: '#f87171', padding: '0.4rem 1.25rem',
              borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em',
              marginBottom: '1.25rem', textTransform: 'uppercase',
            }}
          >
            Join Our Team
          </motion.span>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.2' }}
          >
            Careers at TIIS
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '3px', width: '60px', background: 'linear-gradient(90deg, #b12023, #f43f5e)', borderRadius: '2px', margin: '0 auto 1.5rem', originX: 0.5 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.72)', lineHeight: '1.7' }}
          >
            We partner with leaders to unlock sustainable performance. Come architect the future of consulting with us.
          </motion.p>
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
            <div className="job-cards-container" style={{ columnWidth: '320px', columnGap: '2rem' }}>
              {jobs.map((job, index) => (
                <JobCard key={job._id} job={job} index={index} onApply={setSelectedJob} />
              ))}
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