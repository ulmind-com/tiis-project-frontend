import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, Users, Building2, FileText, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────
   Animation Variants (reusable)
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
   Animated line accent (grows from 0 width)
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
   Service Data
───────────────────────────────────────── */
const servicesList = [
  {
    id: 'business-solutions',
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #01324e 0%, #024b76 100%)',
    accentColor: '#0ea5e9',
    title: 'Business Solutions',
    tagline: 'Strategy That Scales',
    desc: 'We partner with leaders to streamline operations, design resilient organisational structures, and develop strategic roadmaps that unlock sustainable performance improvements.',
    items: ['Business Process Consulting', 'Organisation Structuring', 'Strategic Advisory'],
  },
  {
    id: 'talent-hiring',
    icon: Users,
    gradient: 'linear-gradient(135deg, #7c1015 0%, #b12023 100%)',
    accentColor: '#f43f5e',
    title: 'Talent Hiring & Advisory',
    tagline: 'Right People, Right Roles',
    desc: "Our talent practice designs end-to-end talent management ecosystems and delivers both permanent and flexible workforce solutions tailored to your organisation's evolving needs.",
    items: ['Design & Implementation of Talent Management System', 'Permanent Staffing', 'Temp Staffing'],
  },
  {
    id: 'capacity-building',
    icon: Building2,
    gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
    accentColor: '#10b981',
    title: 'Capacity Building',
    tagline: 'Grow Leaders From Within',
    desc: 'From frontline managers to C-suite executives, our experiential training programs are crafted to sharpen leadership acumen, drive sales performance, and build a culture of compliance.',
    items: ['Managerial Training', 'Leadership Training', 'Sales Training', 'POSH Training'],
  },
  {
    id: 'content-development',
    icon: FileText,
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
    accentColor: '#a78bfa',
    title: 'Content Development',
    tagline: 'Words That Work',
    desc: 'From corporate playbooks to academic curricula, we translate complex ideas into clear, compelling content that empowers teams, drives compliance, and accelerates learning.',
    items: ['Corporate Business Content', 'Academic Content', 'SOP Documentation', 'HR Playbook', 'Policy Drafting', 'Training Content'],
  },
  {
    id: 'compliance-services',
    icon: ShieldCheck,
    gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
    accentColor: '#fbbf24',
    title: 'Compliance Services',
    tagline: 'Stay Protected, Stay Compliant',
    desc: 'We navigate the complex regulatory landscape on your behalf — designing robust compliance frameworks and providing ongoing support across labour law, payroll, and statutory filings.',
    items: ['Design & Compliance System', 'Labour Law Compliance', 'Payroll Compliance', 'PF, ESIC & TDS Support', 'Documentation & Audit Assistance'],
  },
];

/* ─────────────────────────────────────────
   Service Card Component
───────────────────────────────────────── */
const ServiceCard = ({ service, index, onOpen }) => {
  const Icon = service.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp((index % 3) * 0.12)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      id={service.id}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 6px 30px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: '1px solid var(--border-color-strong)',
      }}
      onClick={() => onOpen(service)}
    >
      {/* ── Card Banner ── */}
      <div className="service-card-banner" style={{
        background: service.gradient,
        padding: '2rem 2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background blobs on hover */}
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

        {/* Icon — spins slightly on hover */}
        <motion.div
          animate={{ rotate: hovered ? 8 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{
            display: 'inline-flex', padding: '0.75rem',
            backgroundColor: 'rgba(255,255,255,0.18)',
            borderRadius: '12px', marginBottom: '1.25rem',
          }}
        >
          <Icon size={28} color="white" />
        </motion.div>

        <motion.h3
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{ color: 'white', fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.3rem' }}
        >
          {service.title}
        </motion.h3>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem', fontWeight: '500' }}>
          {service.tagline}
        </p>
      </div>

      {/* ── Card Body ── */}
      <div className="service-card-body" style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.75', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          {service.desc}
        </p>

        {/* Staggered list items */}
        <motion.div
          variants={staggerContainer(0.07, 0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem', flex: 1 }}
        >
          {service.items.map((item, i) => (
            <motion.div
              key={i}
              variants={listItemVariant}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <motion.div
                animate={{ scale: hovered ? 1.15 : 1 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
              >
                <CheckCircle size={16} color={service.accentColor} style={{ flexShrink: 0 }} />
              </motion.div>
              <span style={{ color: 'var(--color-text-main)', fontSize: '0.9rem', fontWeight: '500' }}>{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Read More — shimmer + lift + glow on hover */}
        <motion.button
          onClick={e => { e.stopPropagation(); onOpen(service); }}
          whileHover={{ y: -4, scale: 1.03, boxShadow: `0 12px 32px rgba(0,0,0,0.28)` }}
          whileTap={{ scale: 0.96, y: 0 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            background: service.gradient, color: 'white',
            border: 'none', borderRadius: '50px',
            padding: '0.9rem 1.5rem', fontWeight: '700',
            fontSize: '0.95rem', cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            position: 'relative', overflow: 'hidden',
            transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          {/* Shimmer sweep */}
          <motion.span
            animate={{ left: hovered ? '160%' : '-80%' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: 0, width: '55%', height: '100%',
              background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.28), transparent)',
              transform: 'skewX(-20deg)', pointerEvents: 'none',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>Read More</span>
          <motion.span
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Service Modal — with staggered item anim
───────────────────────────────────────── */
const ServiceModal = ({ service, onClose }) => {
  const Icon = service?.icon;

  useEffect(() => {
    if (service) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [service]);

  if (!service) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="service-modal-overlay"
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
          className="service-modal-card"
          key="service-modal-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--border-color-strong)',
            borderRadius: '22px',
            padding: '3rem 2.75rem',
            maxWidth: '680px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 32px 80px -16px rgba(0,0,0,0.4)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <motion.button
            className="service-modal-close"
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              position: 'absolute', top: '1.25rem', right: '1.5rem',
              background: 'none', border: 'none',
              fontSize: '2.2rem', cursor: 'pointer',
              color: '#94a3b8', lineHeight: 1,
            }}
            aria-label="Close"
          >
            &times;
          </motion.button>

          {/* Service Icon Badge — bounces in */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
            style={{
              display: 'inline-flex', padding: '0.9rem',
              borderRadius: '14px', background: service.gradient,
              marginBottom: '1.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            }}
          >
            <Icon size={30} color="white" />
          </motion.div>

          {/* Title — slides up */}
          <motion.h2
            className="service-modal-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            style={{
              fontSize: '1.85rem', color: 'var(--color-text-heading)',
              marginBottom: '1.75rem',
              borderBottom: '3px solid #b12023',
              paddingBottom: '1rem',
              display: 'inline-block',
              fontWeight: '800', lineHeight: '1.2',
            }}
          >
            {service.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="service-modal-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            style={{
              fontSize: '0.9rem', color: 'var(--color-text-muted)',
              fontWeight: '600', letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: '-1.2rem',
            }}
          >
            {service.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            className="service-modal-desc"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            style={{ color: 'var(--color-text-muted)', lineHeight: '1.85', fontSize: '1.05rem', marginBottom: '2rem' }}
          >
            {service.desc}
          </motion.p>

          {/* Items — staggered */}
          <motion.ul
            className="service-modal-items"
            variants={staggerContainer(0.09, 0.35)}
            initial="hidden"
            animate="visible"
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2.5rem' }}
          >
            {service.items.map((item, idx) => (
              <motion.li
                key={idx}
                variants={listItemVariant}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.05rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} style={{ flexShrink: 0, marginTop: '2px' }}>
                  <CheckCircle color="#b12023" size={22} />
                </motion.div>
                <span style={{ fontWeight: '500' }}>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Button — pops in */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          >
            <Link
              to="/contact"
              onClick={onClose}
              className="service-modal-cta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: service.gradient, color: 'white',
                padding: '0.85rem 2rem', borderRadius: '50px',
                fontWeight: '700', fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              }}
            >
              Get a Free Consultation <ArrowRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

/* ─────────────────────────────────────────
   Main Services Page
───────────────────────────────────────── */
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => setSelectedService(service);
  const closeModal = () => setSelectedService(null);

  return (
    <div className="animate-fade-in" style={{ overflowX: 'hidden' }}>

      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          /* General Container Adjustments */
          .container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          
          /* Hero Section */
          .services-hero { padding: 6rem 1.5rem 4rem !important; }
          .services-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center !important; }
          .services-hero-content { text-align: center !important; align-items: center !important; }
          .services-hero-content div { margin: 0 auto 1.5rem !important; }
          .services-hero h1 { font-size: 2.5rem !important; margin-bottom: 1rem !important; line-height: 1.2 !important; text-align: center !important; }
          .services-hero p { font-size: 1rem !important; line-height: 1.6 !important; padding: 0 0.5rem; text-align: center !important; margin: 0 auto !important; }

          /* Cards Section Header */
          .section-header-title { font-size: 2rem !important; line-height: 1.2 !important; }

          /* Cards Grid */
          .services-grid { gap: 1.5rem !important; grid-template-columns: 1fr !important; }
          .service-card-banner { padding: 1.5rem 1.5rem 1.25rem !important; }
          .service-card-body { padding: 1.5rem !important; }
          .service-card-banner h3 { font-size: 1.25rem !important; }

          /* Service Modal */
          .service-modal-card { padding: 2rem 1.5rem !important; width: 92% !important; margin: 0 auto; max-height: 85vh !important; border-radius: 18px !important; }
          .service-modal-close { top: 1rem !important; right: 1rem !important; font-size: 2rem !important; }
          .service-modal-title { font-size: 1.5rem !important; padding-bottom: 0.75rem !important; margin-bottom: 1rem !important; }
          .service-modal-tagline { font-size: 0.85rem !important; margin-bottom: 1rem !important; margin-top: -0.5rem !important; }
          .service-modal-desc { font-size: 0.95rem !important; margin-bottom: 1.5rem !important; line-height: 1.6 !important; }
          .service-modal-items { gap: 0.85rem !important; margin-bottom: 2rem !important; }
          .service-modal-items li { font-size: 0.95rem !important; align-items: flex-start !important; }
          .service-modal-cta { width: 100%; justify-content: center; text-align: center; }

          /* CTA Section */
          .services-cta { padding: 4rem 1.5rem !important; }
          .services-cta h2 { font-size: 2rem !important; }
          .services-cta p { font-size: 1rem !important; margin-bottom: 2rem !important; }
          .services-cta-buttons { flex-direction: column !important; gap: 1rem !important; width: 100%; }
          .services-cta-buttons > div { width: 100%; }
          .services-cta-buttons a { width: 100%; justify-content: center; text-align: center; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      {/* ══════════════════════════════════════
          HERO SECTION — full animation suite
      ══════════════════════════════════════ */}
      <section className="services-hero" style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--color-hero-grad)',
        padding: '7rem 2rem 5rem', color: 'white',
      }}>
        {/* Animated floating blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'rgba(177,32,35,0.15)', filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'rgba(14,165,233,0.14)', filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container services-hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* Text Content */}
          <div className="services-hero-content" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                color: '#f87171', padding: '0.4rem 1.25rem', borderRadius: '999px',
                fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em',
                marginBottom: '1.25rem', textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              What We Do
            </motion.span>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            >
              Our Services
            </motion.h1>

            {/* Animated underline accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '3px', width: '60px',
                background: 'linear-gradient(90deg, #b12023, #f43f5e)',
                borderRadius: '2px', margin: '0 0 1.5rem 0',
                originX: 0,
              }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: '1.2rem', maxWidth: '600px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', margin: 0 }}
            >
              A comprehensive suite of consulting, talent, and capacity-building solutions — crafted to drive measurable results for your organisation.
            </motion.p>
          </div>

          {/* Premium Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* Glowing Backdrop */}
            <div style={{ position: 'absolute', inset: '-10px', background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 60%)', filter: 'blur(20px)', zIndex: 0 }} />
            
            <motion.img
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
              alt="Premium Consulting"
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

            {/* Floating Element 1 */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', top: '-10%', right: '-5%',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)',
                zIndex: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
            >
              <Briefcase size={28} color="#0ea5e9" />
            </motion.div>

            {/* Floating Element 2 */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{
                position: 'absolute', bottom: '-5%', left: '-5%',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)',
                zIndex: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
            >
              <Users size={28} color="#f43f5e" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CARDS SECTION
      ══════════════════════════════════════ */}
      <section style={{
        padding: '5rem 2rem 6rem',
        background: 'var(--color-page-grad)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-120px', right: '-100px',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(191,219,254,0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.12, 0)}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            {/* Animated label with lines */}
            <motion.div
              variants={fadeUp(0)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
                color: 'var(--color-text-heading)', fontWeight: '700', fontSize: '0.85rem',
                letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem',
              }}
            >
              <GrowLine delay={0.2} />
              Full-Spectrum Consulting
              <GrowLine delay={0.35} />
            </motion.div>

            <motion.h2
              className="section-header-title"
              variants={fadeUp(0.1)}
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
                fontWeight: '800', color: 'var(--color-text-heading)',
                letterSpacing: '-0.5px', lineHeight: '1.2',
              }}
            >
              Choose Your Solution
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '3px', width: '50px',
                background: '#b12023', borderRadius: '2px',
                margin: '0.9rem auto 0', originX: 0.5,
              }}
            />
          </motion.div>

          {/* Cards grid */}
          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {servicesList.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} onOpen={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION — animated
      ══════════════════════════════════════ */}
      <section className="services-cta" style={{
        background: 'linear-gradient(135deg, #01324e 0%, #b12023 100%)',
        padding: '5rem 2rem', textAlign: 'center', color: 'white',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Floating background shapes */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '250px', height: '250px', borderRadius: '30%',
            border: '2px solid rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: '-40px', left: '-40px',
            width: '180px', height: '180px', borderRadius: '30%',
            border: '2px solid rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.15, 0)}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <motion.h2
            variants={fadeUp(0)}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '1rem' }}
          >
            Ready to Transform Your Business?
          </motion.h2>

          <motion.p
            variants={fadeUp(0.05)}
            style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.75' }}
          >
            Partner with TIIS and let our experts craft a customised solution uniquely designed for your challenges and goals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="services-cta-buttons"
            variants={fadeUp(0.1)}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {/* Get a Free Consultation — shimmer white button */}
            <motion.div
              whileHover={{ y: -5, scale: 1.04, boxShadow: '0 16px 40px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '50px', display: 'inline-block' }}
            >
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                backgroundColor: 'white', color: '#01324e',
                padding: '1rem 2.2rem', borderRadius: '50px',
                fontWeight: '800', fontSize: '1rem', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
                letterSpacing: '0.3px', position: 'relative', zIndex: 1
              }}>
                Get a Free Consultation <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Join Our Team — ghost button with fill sweep */}
            <motion.div
              whileHover={{ y: -5, scale: 1.04 }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              style={{ position: 'relative', borderRadius: '50px', display: 'inline-block', overflow: 'hidden' }}
            >
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.14)',
                borderRadius: '50px', transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.35s ease',
              }} className="btn-fill-sweep" />
              <Link to="/careers" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                backgroundColor: 'transparent',
                backdropFilter: 'blur(8px)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.55)',
                padding: '1rem 2.2rem', borderRadius: '50px',
                fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
                letterSpacing: '0.3px', position: 'relative', zIndex: 1,
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}>
                Join Our Team
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Detail Modal (portaled) ── */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={closeModal} />
      )}
    </div>
  );
};

export default Services;