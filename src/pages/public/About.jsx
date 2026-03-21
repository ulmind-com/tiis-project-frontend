import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about-page animate-fade-in" style={{ paddingBottom: '4rem', overflowX: 'hidden', width: '100%', background: 'var(--color-page-grad)', minHeight: '100vh' }}>

      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        /* General resets to prevent horizontal scroll */
        html, body { overflow-x: hidden; width: 100%; }
        
        @media (max-width: 960px) {
          /* Adjust master padding */
          .about-page section {
            padding-top: 5rem !important;
            padding-bottom: 3rem !important;
          }

          .container { 
            padding-left: 1.25rem !important; 
            padding-right: 1.25rem !important; 
            width: 100% !important; 
            box-sizing: border-box !important; 
            max-width: 100vw !important;
          }

          /* ── Hero Section Mobile Grid ── */
          .about-hero {
            padding: 6rem 1.25rem 4rem !important;
          }
          .about-hero-grid { 
            grid-template-columns: 1fr !important; 
            gap: 3.5rem !important; 
            text-align: center !important; 
            align-items: center !important;
          }
          .about-hero-text { 
            text-align: center !important; 
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .about-hero-text h1 {
            font-size: clamp(2.5rem, 8vw, 3.2rem) !important;
            text-align: center !important;
          }
          .about-hero-text h2 { 
            text-align: center !important; 
            font-size: 1.5rem !important;
          }
          .about-hero-text div { 
            text-align: center !important; 
            font-size: 1rem !important;
          }
          .about-hero-text p {
             text-align: center !important;
          }

          /* Hero Image Container */
          .about-hero-grid > div:last-child {
            width: 100% !important;
            max-width: 500px !important;
            margin: 0 auto;
          }

          /* ── Vision / Mission / Philosophy Grid ── */
          .about-section-grid {
            grid-template-columns: 1fr !important; /* Stack image and text */
            gap: 2.5rem !important;
            text-align: center !important;
          }
          
          /* Force text to center on mobile for these sections */
          .about-section-grid > div:last-child {
             display: flex;
             flex-direction: column;
             align-items: center;
             text-align: center !important;
          }
          
          .about-section-grid p {
             text-align: center !important;
          }
          
          .about-section-grid h3 {
             font-size: 2rem !important;
          }

          /* Fix tag pill alignment on mobile */
          .about-section-grid .tags-container {
             justify-content: center !important;
          }

          /* Ensure images/svgs don't break width */
          .about-section-grid svg {
            max-width: 320px !important;
            width: 100% !important;
            height: auto !important;
          }
          
          /* Re-order Mission section on mobile so Image comes first like the others */
          .mission-section-grid {
             direction: ltr !important; /* Reset RTL trick for mobile */
          }
          .mission-section-grid > div:last-child {
             direction: ltr !important;
          }

          /* ── Our Solutions Section ── */
          .solutions-header-grid {
             grid-template-columns: 1fr !important;
             gap: 2rem !important;
             text-align: center !important;
          }
          
          .solutions-header-grid > div:last-child {
             display: flex;
             flex-direction: column;
             align-items: center;
          }
          .solutions-header-grid p {
             text-align: center !important;
          }

          .solutions-cards-grid { 
             grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important; 
             gap: 1.25rem !important; 
          }
          
          .solutions-cards-grid > div {
             padding: 1.8rem 1.5rem !important;
          }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      <section className="about-hero" style={{
        position: 'relative',
        padding: '8rem 5% 6rem',
        background: 'transparent',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        {/* Background Decorative Orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)', filter: 'blur(40px)', zIndex: 0, maxWidth: '100vw' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)', filter: 'blur(50px)', zIndex: 0, maxWidth: '100vw' }} />

        <div className="container about-hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>

          {/* Text Content Area */}
          <div className="about-hero-text" style={{ textAlign: 'left' }}>
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
                marginTop: '1.5rem',
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

          {/* Premium Illustration / Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ position: 'relative' }}
          >
            {/* Glowing Backdrop */}
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0 }} />

            {/* Main Floating Image */}
            <motion.img
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="TIIS Team Collaboration"
              style={{
                width: '100%',
                maxHeight: '450px',
                objectFit: 'cover',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(255,255,255,0.4)'
              }}
            />
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISION / MISSION / PHILOSOPHY
          Alternating left-right illustration layout
      ═══════════════════════════════════════ */}
      <section style={{ padding: '6rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background blobs */}
        <div style={{ position: 'absolute', top: '5%', left: '-8%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '50px', padding: '0.4rem 1.2rem', marginBottom: '1.2rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase' }}>What We Stand For</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: 'var(--color-primary-dark)', letterSpacing: '-1px', lineHeight: 1.15 }}>
              Our Core <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Principles</span>
            </h2>
          </motion.div>

          {/* ── VISION ── Image Left / Content Right */}
          <motion.div
            className="about-section-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '7rem' }}
          >
            {/* Illustration */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 65%)', filter: 'blur(30px)', borderRadius: '50%' }} />
              <svg viewBox="0 0 400 350" style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(59,130,246,0.2))' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="visionGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="visionGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="100%" stopColor="#ede9fe" />
                  </linearGradient>
                </defs>
                {/* Sky background */}
                <circle cx="200" cy="160" r="140" fill="url(#visionGrad2)" opacity="0.9" />
                {/* Telescope stand */}
                <rect x="185" y="240" width="8" height="70" rx="4" fill="#94a3b8" />
                <rect x="160" y="300" width="60" height="8" rx="4" fill="#94a3b8" />
                {/* Telescope body */}
                <rect x="160" y="180" width="90" height="28" rx="14" fill="url(#visionGrad1)" transform="rotate(-30 205 194)" />
                <circle cx="165" cy="208" r="18" fill="#1d4ed8" stroke="white" strokeWidth="3" />
                <circle cx="165" cy="208" r="10" fill="#3b82f6" />
                <circle cx="240" cy="168" r="10" fill="#7c3aed" />
                {/* Stars */}
                {[[80, 80], [300, 60], [340, 130], [60, 200], [320, 220], [140, 50], [270, 290]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 4 : 3} fill={i % 3 === 0 ? "#fbbf24" : "#a78bfa"} opacity="0.8" />
                ))}
                {/* Eye icon */}
                <ellipse cx="200" cy="120" rx="50" ry="28" fill="white" stroke="#3b82f6" strokeWidth="3" />
                <circle cx="200" cy="120" r="16" fill="url(#visionGrad1)" />
                <circle cx="204" cy="116" r="5" fill="white" opacity="0.6" />
                {/* Sparkles */}
                <path d="M320 80 L323 90 L333 83 L323 90 L326 100 L323 90 L313 83 L323 90 Z" fill="#fbbf24" opacity="0.9" />
                <path d="M80 140 L82 148 L90 143 L82 148 L84 156 L82 148 L74 143 L82 148 Z" fill="#a78bfa" opacity="0.9" />
              </svg>
            </motion.div>

            {/* Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '50px', padding: '0.5rem 1.2rem', marginBottom: '1.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                <span style={{ fontWeight: 700, color: '#3b82f6', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Vision</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary-dark)', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '1.2rem' }}>
                Our <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vision</span>
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.85', fontSize: '1.08rem', marginBottom: '2rem', textAlign: 'justify' }}>
                To become one of the top solution provider company in India by 2030, leading in the fields of Human happiness development and develop the strength of human capital so that overall and sustainable development is possible.
              </p>
              <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {['Human Development', 'Sustainability', 'Top-Tier Leadership'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6', borderRadius: '50px', padding: '0.35rem 1rem', fontSize: '0.85rem', fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── MISSION ── Content Left / Image Right */}
          <motion.div
            className="about-section-grid mission-section-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '7rem', direction: 'rtl' }}
          >
            {/* Illustration */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', display: 'flex', justifySelf: 'center', justifyContent: 'center', direction: 'ltr', width: '100%' }}
            >
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%)', filter: 'blur(30px)', borderRadius: '50%' }} />
              <svg viewBox="0 0 400 350" style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(139,92,246,0.2))' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="missionGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="missionGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ede9fe" />
                    <stop offset="100%" stopColor="#fce7f3" />
                  </linearGradient>
                </defs>
                {/* Background circle */}
                <circle cx="200" cy="175" r="140" fill="url(#missionGrad2)" opacity="0.9" />
                {/* Rocket */}
                <ellipse cx="200" cy="140" rx="35" ry="60" fill="url(#missionGrad1)" />
                <polygon points="200,68 220,110 180,110" fill="#7c3aed" />
                <ellipse cx="200" cy="195" rx="18" ry="22" fill="#c4b5fd" />
                <circle cx="200" cy="148" r="14" fill="white" opacity="0.9" />
                <circle cx="200" cy="148" r="8" fill="#8b5cf6" />
                {/* Flame */}
                <ellipse cx="192" cy="225" rx="6" ry="14" fill="#fb923c" opacity="0.9" />
                <ellipse cx="200" cy="232" rx="8" ry="18" fill="#fbbf24" opacity="0.9" />
                <ellipse cx="208" cy="225" rx="6" ry="14" fill="#fb923c" opacity="0.9" />
                {/* Wings */}
                <polygon points="165,160 185,160 175,200" fill="#a78bfa" />
                <polygon points="235,160 215,160 225,200" fill="#a78bfa" />
                {/* Stars/orbit rings */}
                <ellipse cx="200" cy="175" rx="130" ry="50" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.5" />
                {[[80, 100], [320, 90], [340, 230], [60, 260], [200, 310], [130, 310]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 5 : 3} fill={i % 2 === 0 ? "#fbbf24" : "#c4b5fd"} opacity="0.75" />
                ))}
              </svg>
            </motion.div>

            {/* Content */}
            <div style={{ direction: 'ltr' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.1))', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '50px', padding: '0.5rem 1.2rem', marginBottom: '1.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                <span style={{ fontWeight: 700, color: '#8b5cf6', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Mission</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary-dark)', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '1.2rem' }}>
                Our <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mission</span>
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.85', fontSize: '1.08rem', marginBottom: '2rem', textAlign: 'justify' }}>
                To prepare and empower Solutionaries who is the business driver and implement equitable and sustainable solutions for India and the world.
              </p>
              <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {['Empowerment', 'Equity', 'Impact-Driven'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#8b5cf6', borderRadius: '50px', padding: '0.35rem 1rem', fontSize: '0.85rem', fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── PHILOSOPHY ── Image Left / Content Right */}
          <motion.div
            className="about-section-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}
          >
            {/* Illustration */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 65%)', filter: 'blur(30px)', borderRadius: '50%' }} />
              <svg viewBox="0 0 400 360" style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(16,185,129,0.2))' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="philoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="philoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d1fae5" />
                    <stop offset="100%" stopColor="#dbeafe" />
                  </linearGradient>
                </defs>
                {/* Background */}
                <circle cx="200" cy="180" r="145" fill="url(#philoGrad2)" opacity="0.9" />
                {/* Brain outline */}
                <ellipse cx="200" cy="155" rx="70" ry="65" fill="white" stroke="url(#philoGrad1)" strokeWidth="3" />
                <path d="M170 120 Q155 100 165 85 Q178 72 192 88 Q200 75 210 85 Q222 100 210 115" fill="none" stroke="url(#philoGrad1)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M165 155 Q145 145 150 130 Q160 118 175 128" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <path d="M235 155 Q255 145 250 130 Q240 118 225 128" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                <line x1="200" y1="90" x2="200" y2="220" stroke="url(#philoGrad1)" strokeWidth="2" strokeDasharray="5 4" />
                {/* Gear */}
                <circle cx="200" cy="155" r="22" fill="none" stroke="url(#philoGrad1)" strokeWidth="3" />
                <circle cx="200" cy="155" r="10" fill="url(#philoGrad1)" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = angle * Math.PI / 180;
                  const x1 = 200 + 22 * Math.cos(rad);
                  const y1 = 155 + 22 * Math.sin(rad);
                  const x2 = 200 + 30 * Math.cos(rad);
                  const y2 = 155 + 30 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#philoGrad1)" strokeWidth="4" strokeLinecap="round" />;
                })}
                {/* Light bulb moment */}
                <circle cx="310" cy="80" r="28" fill="#fef9c3" stroke="#fbbf24" strokeWidth="2.5" />
                <path d="M310 65 L310 75 M300 69 L305 76 M320 69 L315 76" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                <path d="M305 82 Q302 90 308 94 L312 94 Q318 90 315 82 Z" fill="#fbbf24" />
                <rect x="307" y="94" width="6" height="6" rx="2" fill="#f59e0b" />
                {/* Connecting dots */}
                <line x1="270" y1="120" x2="285" y2="100" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
                {/* People icons */}
                <circle cx="90" cy="240" r="14" fill="url(#philoGrad1)" />
                <path d="M72 275 Q90 260 108 275" fill="none" stroke="url(#philoGrad1)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="200" cy="250" r="14" fill="#8b5cf6" />
                <path d="M182 285 Q200 270 218 285" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                <circle cx="310" cy="240" r="14" fill="#ec4899" />
                <path d="M292 275 Q310 260 328 275" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
                {/* Connection lines */}
                <line x1="104" y1="240" x2="186" y2="250" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
                <line x1="214" y1="250" x2="296" y2="240" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
              </svg>
            </motion.div>

            {/* Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(59,130,246,0.1))', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '50px', padding: '0.5rem 1.2rem', marginBottom: '1.5rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" /><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" /><path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1.26" /><circle cx="12" cy="12" r="10" /></svg>
                <span style={{ fontWeight: 700, color: '#10b981', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Philosophy</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: 'var(--color-primary-dark)', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '1.2rem' }}>
                Our <span style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Philosophy</span>
              </h3>
              <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.85', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'justify' }}>
                <p>
                  To cope, this world needs research-based customized solutions to maintain the productivity and mental well-being of our human capital to achieve the desired outcome. TIIS proposed collaborative, multidisciplinary, and innovative solutions that are based on research and supported by modern technology. TIIS firmly believes that our talent can work across sectors and apply their design thinking skills to find practical solutions to some of the most critical problems of today without compromising their happiness.
                </p>
                <p>
                  Our company is committed to changing the discourse in talent management by making it multidisciplinary and industry-relevant and with a focus on sustainability and design thinking. Through its unique pedagogy, each talent can be developed to become a solutionary—a revolutionary thinker with a solution-oriented mindset—and encouraged to chart her/his happiness.
                </p>
              </div>
              <div className="tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                {['Design Thinking', 'Multidisciplinary', 'Innovation', 'Happiness'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', borderRadius: '50px', padding: '0.35rem 1rem', fontSize: '0.85rem', fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          OUR SOLUTIONS SECTION – PREMIUM REDESIGN
      ═══════════════════════════════════════ */}
      <section className="solutions-section" style={{ padding: '6rem 0 8rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.04) 40%, rgba(139,92,246,0.04) 100%)' }}>

        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-5%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '-8%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* ── HEADER ── */}
          <motion.div
            className="solutions-header-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}
          >
            {/* Illustration */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ position: 'absolute', inset: '-15px', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)', filter: 'blur(25px)', borderRadius: '50%' }} />
              <svg viewBox="0 0 440 360" style={{ width: '100%', maxWidth: '430px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 40px rgba(59,130,246,0.18))' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="solGrad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
                  <linearGradient id="solGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#dbeafe" /><stop offset="100%" stopColor="#ede9fe" /></linearGradient>
                  <linearGradient id="solGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
                </defs>
                {/* Platform */}
                <ellipse cx="220" cy="310" rx="160" ry="20" fill="url(#solGrad2)" opacity="0.7" />
                {/* Building / dashboard */}
                <rect x="80" y="120" width="280" height="180" rx="18" fill="white" stroke="url(#solGrad1)" strokeWidth="2.5" />
                <rect x="80" y="120" width="280" height="40" rx="18" fill="url(#solGrad1)" />
                <rect x="80" y="148" width="280" height="12" fill="url(#solGrad1)" />
                {/* Traffic lights */}
                <circle cx="102" cy="140" r="6" fill="#f87171" />
                <circle cx="120" cy="140" r="6" fill="#fbbf24" />
                <circle cx="138" cy="140" r="6" fill="#34d399" />
                {/* Chart bars inside */}
                <rect x="110" y="220" width="28" height="55" rx="6" fill="url(#solGrad1)" opacity="0.8" />
                <rect x="152" y="198" width="28" height="77" rx="6" fill="url(#solGrad3)" opacity="0.8" />
                <rect x="194" y="210" width="28" height="65" rx="6" fill="#f59e0b" opacity="0.8" />
                <rect x="236" y="185" width="28" height="90" rx="6" fill="url(#solGrad1)" opacity="0.9" />
                <rect x="278" y="205" width="28" height="70" rx="6" fill="url(#solGrad3)" opacity="0.8" />
                {/* Line chart */}
                <polyline points="110,215 152,195 194,207 236,182 278,202 320,188" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {[110, 152, 194, 236, 278, 320].map((x, i) => {
                  const ys = [215, 195, 207, 182, 202, 188];
                  return <circle key={i} cx={x} cy={ys[i]} r="4" fill="#f59e0b" />;
                })}
                {/* Rocket */}
                <g transform="translate(340,60) rotate(-30)">
                  <ellipse cx="0" cy="0" rx="14" ry="28" fill="url(#solGrad1)" />
                  <polygon points="0,-32 8,-12 -8,-12" fill="#7c3aed" />
                  <ellipse cx="0" cy="22" rx="8" ry="10" fill="#c4b5fd" />
                  <ellipse cx="-4" cy="38" rx="4" ry="9" fill="#fb923c" opacity="0.9" />
                  <ellipse cx="0" cy="42" rx="5" ry="12" fill="#fbbf24" opacity="0.9" />
                  <ellipse cx="4" cy="38" rx="4" ry="9" fill="#fb923c" opacity="0.9" />
                </g>
                {/* Floating badge */}
                <rect x="30" y="60" width="130" height="44" rx="14" fill="white" stroke="url(#solGrad3)" strokeWidth="1.5" filter="url(#shadow)" />
                <circle cx="56" cy="82" r="12" fill="url(#solGrad3)" />
                <text x="75" y="79" fontSize="10" fontWeight="700" fill="#1d4ed8">TIIS Solutions</text>
                <text x="75" y="92" fontSize="9" fill="#64748b">Innovative &amp; Research-based</text>
                {/* Stars */}
                {[[50, 30], [380, 200], [400, 120], [30, 200], [220, 40], [390, 290]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 4 : 3} fill={i % 3 === 0 ? "#fbbf24" : "#a78bfa"} opacity="0.7" />
                ))}
              </svg>
            </motion.div>

            {/* Header Text */}
            <div className="solutions-header">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '50px', padding: '0.4rem 1.2rem', marginBottom: '1.4rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6', letterSpacing: '1.5px', textTransform: 'uppercase' }}>What We Offer</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: 'var(--color-primary-dark)', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Our <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Solutions</span>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.08rem', lineHeight: '1.85', textAlign: 'justify' }}>
                TIIS offers the full spectrum of thoughtful researched-based innovative solutions to help organizations and institutions plan better, work better &amp; deliver better in this VUCA world. We design and develop thoughtful innovative solutions to optimize the potential of human capital to strive for the desired business objective and self-satisfaction.
              </p>
            </div>
          </motion.div>

          {/* ── KEY SERVICES HEADER ── */}
          <motion.div
            className="solutions-subheader"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--color-primary-dark)', letterSpacing: '-0.5px', display: 'inline-block' }}>
              Our key services <span style={{ background: 'linear-gradient(135deg, #3b82f6, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>are</span>
            </h3>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '50px', margin: '1rem auto 0' }} />
          </motion.div>

          {/* ── SERVICE CARDS ── */}
          <div className="solutions-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.75rem' }}>
            {[
              {
                name: 'Hiring Solutions',
                color: '#3b82f6',
                bg: 'rgba(59,130,246,0.08)',
                border: 'rgba(59,130,246,0.2)',
                tag: 'Talent Acquisition',
                icon: (
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <defs><linearGradient id="hireG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
                    <circle cx="40" cy="40" r="38" fill="rgba(59,130,246,0.1)" />
                    <circle cx="40" cy="28" r="12" fill="url(#hireG)" />
                    <path d="M18 62 Q40 48 62 62" fill="url(#hireG)" opacity="0.8" />
                    <circle cx="62" cy="28" r="5" fill="#34d399" />
                    <line x1="59" y1="22" x2="65" y2="22" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                    <line x1="62" y1="19" x2="62" y2="25" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                name: 'Learning & Development',
                color: '#8b5cf6',
                bg: 'rgba(139,92,246,0.08)',
                border: 'rgba(139,92,246,0.2)',
                tag: 'L&D Programs',
                icon: (
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <defs><linearGradient id="ldG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient></defs>
                    <circle cx="40" cy="40" r="38" fill="rgba(139,92,246,0.1)" />
                    <rect x="18" y="22" width="22" height="28" rx="3" fill="url(#ldG)" />
                    <rect x="40" y="22" width="22" height="28" rx="3" fill="url(#ldG)" opacity="0.7" />
                    <rect x="20" y="28" width="8" height="2" rx="1" fill="white" opacity="0.6" />
                    <rect x="20" y="33" width="16" height="2" rx="1" fill="white" opacity="0.6" />
                    <rect x="20" y="38" width="12" height="2" rx="1" fill="white" opacity="0.6" />
                    <circle cx="55" cy="56" r="10" fill="#fbbf24" />
                    <polyline points="50,56 54,60 62,52" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                name: 'Content Development',
                color: '#10b981',
                bg: 'rgba(16,185,129,0.08)',
                border: 'rgba(16,185,129,0.2)',
                tag: 'Creative Content',
                icon: (
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <defs><linearGradient id="cdG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#34d399" /></linearGradient></defs>
                    <circle cx="40" cy="40" r="38" fill="rgba(16,185,129,0.1)" />
                    <rect x="18" y="18" width="44" height="40" rx="5" fill="url(#cdG)" />
                    <rect x="24" y="26" width="28" height="3" rx="1.5" fill="white" opacity="0.8" />
                    <rect x="24" y="33" width="22" height="3" rx="1.5" fill="white" opacity="0.6" />
                    <rect x="24" y="40" width="18" height="3" rx="1.5" fill="white" opacity="0.5" />
                    <circle cx="56" cy="58" r="10" fill="#fbbf24" />
                    <path d="M52 62 l2-6 6-2-6 2z" fill="white" />
                    <line x1="57" y1="53" x2="60" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                name: 'Business Solutions',
                color: '#f59e0b',
                bg: 'rgba(245,158,11,0.08)',
                border: 'rgba(245,158,11,0.2)',
                tag: 'Enterprise Growth',
                icon: (
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <defs><linearGradient id="bsG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#fbbf24" /></linearGradient></defs>
                    <circle cx="40" cy="40" r="38" fill="rgba(245,158,11,0.1)" />
                    <rect x="20" y="32" width="16" height="26" rx="3" fill="url(#bsG)" />
                    <rect x="32" y="24" width="16" height="34" rx="3" fill="url(#bsG)" opacity="0.85" />
                    <rect x="44" y="18" width="16" height="40" rx="3" fill="url(#bsG)" opacity="0.7" />
                    <polyline points="24,44 36,36 48,28 60,22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="60" cy="22" r="4" fill="white" />
                  </svg>
                )
              },
              {
                name: 'Compliance Services',
                color: '#ec4899',
                bg: 'rgba(236,72,153,0.08)',
                border: 'rgba(236,72,153,0.2)',
                tag: 'Regulatory & Risk',
                icon: (
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <defs><linearGradient id="csG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#f472b6" /></linearGradient></defs>
                    <circle cx="40" cy="40" r="38" fill="rgba(236,72,153,0.1)" />
                    <path d="M40 14 L60 22 L60 44 C60 54 50 62 40 66 C30 62 20 54 20 44 L20 22 Z" fill="url(#csG)" opacity="0.9" />
                    <polyline points="32,40 38,46 52,32" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ].map((service, index) => (
              <motion.div
                className="solution-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '2.2rem 1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  border: `1px solid ${service.border}`,
                  boxShadow: `0 8px 30px ${service.bg}, 0 2px 8px rgba(0,0,0,0.04)`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)'
                }}
              >
                {/* Top gradient accent bar */}
                <div className="about-card-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${service.color}, transparent)`, borderRadius: '24px 24px 0 0' }} />
                {/* Glow dot */}
                <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: '8px', height: '8px', borderRadius: '50%', background: service.color, opacity: 0.5 }} />
                {/* Icon illustration */}
                <div className="solution-card-icon" style={{ marginTop: '0.5rem' }}>
                  {service.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-dark)', margin: 0, textAlign: 'center', letterSpacing: '-0.2px', marginBottom: '0.5rem' }}>
                    {service.name}
                  </h4>
                  <span style={{ display: 'inline-block', background: service.bg, border: `1px solid ${service.border}`, color: service.color, borderRadius: '50px', padding: '0.3rem 0.9rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                    {service.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;