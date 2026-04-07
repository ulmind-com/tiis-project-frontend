import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Building2, Users, Briefcase, FileText, Layout, CheckCircle, ArrowRight, Star, Quote, ChevronRight, Play, Cpu, Car, Rocket, ShoppingCart, Droplet, HeartPulse, Microscope, HeartHandshake, Hotel, Monitor } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { TestimonialStack } from '../../components/ui/glass-testimonial-swiper';
import api from '../../api';
import { useTheme } from '../../hooks/useTheme';

const renderTextWithLinks = (text) => {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline', wordBreak: 'break-all' }}>
          {part}
        </a>
      );
    }
    return part;
  });
};

const capabilitiesData = [
  {
    icon: Briefcase,
    title: "Business Solutions",
    description: "Strategic advisory and innovative process consulting for modern organizations.",
    features: ["Strategic Planning", "Process Optimization", "Market Expansion", "Growth Advisory"],
  },
  {
    icon: Users,
    title: "Talent Hiring",
    description: "Permanent and temporary staffing solutions tailored to your organization's needs.",
    features: ["Executive Search", "Contract Staffing", "Skill Assessment", "Onboarding Support"],
  },
  {
    icon: Building2,
    title: "Capacity Building",
    description: "Leadership and managerial training programs designed for measurable impact.",
    features: ["Leadership Training", "Skill Development", "Team Building", "Performance Metrics"],
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "High-quality corporate and academic content crafted for your audience.",
    features: ["Brand Storytelling", "SEO Copywriting", "Technical Docs", "Social Media Strategy"],
  },
  {
    icon: Layout,
    title: "Compliance",
    description: "End-to-end labour law and payroll compliance to keep your business protected.",
    features: ["Labour Law Audits", "Payroll Management", "Statutory Compliance", "Risk Mitigation"],
  },
];

const ShineBorder = ({
  borderRadius = 16,
  borderWidth = 1.5,
  duration = 14,
  color = ["#FF007F", "#39FF14", "#00FFFF"],
  bgColor = "#0a0a0a",
  className,
  children,
}) => {
  return (
    <div
      style={{ "--border-radius": `${borderRadius}px`, backgroundColor: bgColor }}
      className={`relative grid h-full w-full place-items-center rounded-[var(--border-radius)] ${className || ""}`}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shine-pulse {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          to { background-position: 0% 0%; }
        }
        .animate-shine-pulse {
          animation: shine-pulse var(--shine-pulse-duration) infinite linear;
        }
        `
      }} />
      <div
        style={{
          "--border-width": `${borderWidth}px`,
          "--border-radius": `${borderRadius}px`,
          "--shine-pulse-duration": `${duration}s`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
        }}
        className={`pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[var(--border-radius)] before:p-[var(--border-width)] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:[background-image:var(--background-radial-gradient)] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:var(--mask-linear-gradient)] motion-safe:before:animate-shine-pulse z-10`}
      ></div>
      <div className="z-20 w-full h-full rounded-[var(--border-radius)] overflow-hidden" style={{ backgroundColor: bgColor }}>
        {children}
      </div>
    </div>
  );
};

const CapabilityCard = ({ service, index, isDark }) => {
  const theme = {
    cardBg: isDark ? '#080808' : '#ffffff',
    textColor: isDark ? '#ffffff' : '#01324e',
    mutedColor: isDark ? '#a1a1aa' : '#475569',
    iconBg: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(1, 50, 78, 0.05)',
    iconBorder: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(1, 50, 78, 0.1)',
    featureBg: isDark ? '#111111' : '#f8fafc',
    lineColor: isDark ? '#27272a' : '#e2e8f0',
    btnBorder: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(1, 50, 78, 0.2)',
    shineColors: isDark ? ["#FF007F", "#39FF14", "#00FFFF"] : ["#01324e", "#b12023", "#0284c7"],
    btnHoverBg: isDark ? '#ffffff' : '#01324e',
    btnHoverText: isDark ? '#000000' : '#ffffff',
    btnHoverBorder: isDark ? '#ffffff' : '#01324e'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="h-full w-full p-2 group capability-card-wrapper"
      style={{ height: '520px' }}
    >
      <ShineBorder
        borderWidth={2.5}
        borderRadius={24}
        color={theme.shineColors}
        bgColor={theme.cardBg}
        className="shadow-2xl overflow-hidden flex flex-col justify-between items-start text-left p-0 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
      >
        <div className="capability-card-inner" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1, position: 'relative', zIndex: 20, height: '100%', transition: 'background-color 0.4s ease' }}>
          <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: theme.iconBg, border: `1px solid ${theme.iconBorder}`, color: theme.textColor }}>
            <service.icon className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-bold mb-2 tracking-tight transition-colors duration-300" style={{ color: theme.textColor }}>
            {service.title}
          </h3>
          <p className="text-sm mb-8 leading-relaxed transition-colors duration-300" style={{ color: theme.mutedColor }}>
            {service.description}
          </p>

          <div className="flex flex-col flex-grow">
            {service.features.map((feature, i) => {
              const colors = [
                { text: "text-orange-500", border: "border-orange-500/40" },
                { text: "text-amber-500", border: "border-amber-500/40" },
                { text: "text-blue-500", border: "border-blue-500/40" },
                { text: "text-green-500", border: "border-green-500/40" }
              ];
              const colorTheme = colors[i % colors.length];

              return (
                <div key={i} className="relative flex gap-4 min-h-[50px] transition-transform duration-300 group-hover:translate-x-1">
                  <div className="relative flex flex-col items-center">
                    <div className={`rounded-full border p-1.5 z-10 relative ${colorTheme.border} transition-colors duration-300`} style={{ backgroundColor: theme.featureBg }}>
                      <CheckCircle className={`h-3 w-3 ${colorTheme.text}`} />
                    </div>
                    {i !== service.features.length - 1 && (
                      <div className="absolute top-[28px] bottom-[-4px] left-1/2 -translate-x-1/2 w-[2px] z-0 transition-colors duration-300" style={{ backgroundColor: theme.lineColor }} />
                    )}
                  </div>
                  <div className="flex-1 mt-[2px] pb-[16px]">
                    <p className="text-sm font-semibold transition-colors duration-300" style={{ color: theme.mutedColor }}>{feature}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full mt-auto relative z-20 pt-4">
            <Link
              to="/services"
              onClick={() => window.scrollTo(0, 0)}
              className="w-full h-12 transition-all duration-300 rounded-full font-semibold text-sm flex items-center justify-center bg-transparent mt-auto shadow-sm group-hover:shadow-md"
              style={{ border: `1px solid ${theme.btnBorder}`, color: theme.textColor }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.btnHoverBg; e.currentTarget.style.borderColor = theme.btnHoverBorder; e.currentTarget.style.color = theme.btnHoverText; e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = theme.btnBorder; e.currentTarget.style.color = theme.textColor; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Get Started <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </ShineBorder>
    </motion.div>
  );
};

const Home = () => {
  const { isDark } = useTheme();
  const [news, setNews] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [logos, setLogos] = useState([]);
  const [isMottoModalOpen, setIsMottoModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const capabilitiesRef = useRef(null);
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, portRes, jobsRes, testRes, logosRes] = await Promise.all([
          api.get('/api/news'),
          api.get('/api/portfolio'),
          api.get('/api/jobs').catch(() => ({ data: [] })),
          api.get('/api/testimonials?active=true').catch(() => ({ data: [] })),
          api.get('/api/logos').catch(() => ({ data: [] })),
        ]);
        setNews(newsRes.data.slice(0, 4));
        setPortfolio(portRes.data.slice(0, 3));
        const active = (jobsRes.data || []).filter(j => j.isActive);
        setActiveJobs(active);
        setTestimonials(testRes.data || []);
        setLogos(logosRes.data || []);
      } catch (error) {
        console.error('Error fetching dynamic content:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [news]);

  return (
    <div className="home-page animate-fade-in" style={{ backgroundColor: 'var(--color-bg-light)', overflowX: 'hidden', width: '100%' }}>

      {/* ── ULTRA PREMIUM MOBILE RESPONSIVE CSS ── */}
      <style>{`
        /* Global Mobile Overflow Fix */
        html, body { overflow-x: hidden !important; width: 100%; }
        
        @media (max-width: 960px) {
          /* Containers strictly limited to viewport */
          .container { 
            padding-left: 1.25rem !important; 
            padding-right: 1.25rem !important; 
            width: 100% !important; 
            max-width: 100vw !important; 
            box-sizing: border-box !important;
          }
          
          /* Marquee Text Size */
          .marquee-text-span { padding: 0 1.5rem !important; font-size: 0.8rem !important; }
          .jobs-marquee-wrapper { margin-top: 76px !important; margin-bottom: -15px !important; }

          /* ── Hero Section Fixes ── */
          .hero-section { padding: 5rem 0 6rem 0 !important; width: 100vw !important; overflow-x: hidden !important; }
          .hero-container { 
            flex-direction: column !important; 
            text-align: center; 
            gap: 3.5rem !important; 
            width: 100% !important; 
            margin: 0 !important; 
          }
          
          /* Crucial: Override flex-basis which caused the right-side cut */
          .hero-text-block, .hero-visual-block { 
            flex: 1 1 100% !important; 
            width: 100% !important; 
            max-width: 100% !important; 
            box-sizing: border-box !important;
          }
          
          .hero-text-block { align-items: center !important; padding: 0 !important; }
          .hero-text-block h1 { font-size: clamp(2.2rem, 8vw, 3rem) !important; line-height: 1.2 !important; word-wrap: break-word; }
          .hero-text-block p { font-size: 1rem !important; margin-bottom: 2.5rem !important; padding: 0 0.5rem !important; }
          
          .hero-buttons { justify-content: center !important; width: 100%; flex-direction: column !important; gap: 1rem !important; }
          .hero-buttons a, .hero-buttons button { width: 100% !important; margin-bottom: 0 !important; text-align: center; justify-content: center; box-sizing: border-box !important; }
          
          /* Visual Wrapper & Image */
          .hero-visual-wrapper { 
            width: 100% !important; 
            max-width: 100% !important; 
            margin-top: 1rem; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            position: relative !important;
          }
          
          /* Fixed Badge Layout */
          .premium-badge {
             top: -20px !important; right: 5% !important;
             padding: 0.8rem 1.2rem !important;
             transform: scale(0.9) !important;
          }
          .global-badge {
             bottom: 40px !important; left: 5% !important;
             padding: 0.8rem 1.2rem !important;
             transform: scale(0.9) !important;
          }

          /* About Section */
          .about-section .container { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center; }
          .about-section h2 { font-size: 2.2rem !important; }
          .about-section .flex { justify-content: center !important; }
          .about-section .grid { grid-template-columns: 1fr !important; text-align: left; }
          
          /* Services / Capabilities */
          .services-overview { padding: 4rem 0 !important; }
          .capability-card-wrapper { height: auto !important; min-height: 480px !important; }
          .capability-card-inner { padding: 1.8rem 1.5rem !important; }

          /* Portfolio */
          .portfolio-section { padding: 4rem 0 !important; }
          .portfolio-card { height: 400px !important; padding: 1.2rem !important; }
          .portfolio-card h3 { font-size: 1.4rem !important; }

          /* News Bento Grid */
          .news-section { padding: 4rem 0 !important; }
          .news-slider-container {
            flex-direction: column !important;
            height: auto !important;
            min-height: 600px !important;
            border-radius: 24px !important;
          }
          .news-slider-image { flex: 0 0 240px !important; width: 100% !important; }
          .news-slider-content {
            flex: 1 1 auto !important;
            padding: 2.5rem 1.5rem !important;
            border-left: none !important;
            border-top: 1px solid var(--border-color-strong);
          }
          .news-slider-content h3 { font-size: 1.8rem !important; margin-bottom: 1rem !important; }
          .news-slider-content p { font-size: 1rem !important; margin-bottom: 2rem !important; }
          .news-slider-content button { width: 100%; justify-content: center; }

          /* Why Us Section */
          .why-us-section { padding: 5rem 0 8rem 0 !important; text-align: center; }
          .why-us-section .container > div { flex-direction: column !important; gap: 3rem !important; width: 100% !important; }
          .why-us-section h2 { font-size: 2rem !important; }
          .why-us-section p { font-size: 1rem !important; }
          .why-us-section .grid { grid-template-columns: 1fr !important; text-align: left; width: 100%; box-sizing: border-box !important;}
          .why-us-section .grid div { font-size: 0.95rem !important; justify-content: center; }
          .why-us-section a { width: 100%; justify-content: center; text-align: center; box-sizing: border-box !important; }

          /* Modals */
          .motto-modal-content { padding: 2rem 1.5rem !important; width: 92% !important; margin: 0 auto; border-radius: 16px !important; }
          .motto-modal-content h2 { font-size: 1.4rem !important; }
          .motto-modal-content li { font-size: 0.95rem !important; }
          
          .news-modal-wrapper { padding: 1rem !important; }
          .news-modal-content { max-height: 95vh !important; border-radius: 20px !important; }
          .news-modal-body { padding: 1.5rem 1.2rem !important; }
          .news-modal-header-img { height: 200px !important; }
          .news-modal-header-img h2 { font-size: 1.5rem !important; }
          .drop-cap { font-size: 3.5rem !important; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      {/* ── Jobs Hiring Marquee ── */}
      {activeJobs.length > 0 && (
        <div className="jobs-marquee-wrapper" style={{
          background: 'linear-gradient(90deg, #0ea5e9, #0284c7, #0369a1)',
          color: '#fff', overflow: 'hidden', position: 'relative', zIndex: 50,
          boxShadow: '0 2px 12px rgba(2,132,199,0.3)',
        }}>
          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
            <div style={{
              display: 'flex', whiteSpace: 'nowrap',
              animation: 'marqueeScroll 25s linear infinite',
            }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className="marquee-text-span" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0 3rem', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.3px' }}>
                  🚀 We're hiring! {activeJobs.length} open position{activeJobs.length > 1 ? 's' : ''} available — Explore current job opportunities and apply to join our team.
                  <Link to="/careers" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    background: '#fff', color: '#0369a1', padding: '0.25rem 0.85rem',
                    borderRadius: '50px', fontSize: '0.78rem', fontWeight: 700,
                    textDecoration: 'none', transition: 'all 0.2s',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  }}
                    onClick={() => window.scrollTo(0, 0)}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >Apply Now <ArrowRight size={13} /></Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium Split Hero Section */}
      <section className="hero-section" style={{ backgroundColor: 'var(--color-bg-light)', padding: '2rem 0 16rem 0', overflow: 'hidden', position: 'relative' }}>

        {/* Animated Background Blobs */}
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary) 0%, #0ea5e9 100%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'linear-gradient(135deg, #f43f5e 0%, var(--color-secondary) 100%)', filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="container hero-container" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5rem', position: 'relative', zIndex: 2 }}>

          {/* Left Content Block */}
          <motion.div
            className="hero-text-block"
            style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}
            >
              <span style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
              Premium Consulting
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.8rem', fontWeight: '900', lineHeight: '1.15', color: 'var(--color-primary-dark)', letterSpacing: '-0.5px' }}
            >
              (TIIS)<br />
              Thoughtful <br />
              Institute of<br />
              <span style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', paddingTop: '0.2rem' }}>
                Innovative Solutions, LLP
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.8', maxWidth: '600px' }}
            >
              TIIS offers the full spectrum of thoughtful researched-based innovative solutions to help organizations and institutions to improve productivity & growth innovative business solutions.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}
            >
              <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="btn-pill-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', boxShadow: '0 10px 25px -5px rgba(1, 50, 78, 0.4)' }}>
                OUR SERVICES
                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </Link>
              <button onClick={() => setIsMottoModalOpen(true)} className="btn-pill-secondary" style={{ border: '2px solid rgba(1, 50, 78, 0.1)', color: isDark ? '#000000' : 'var(--color-text-main)', padding: '0.9rem 2.2rem', fontSize: '1.05rem', background: '#fff' }}>
                Our Motto
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual Block */}
          <motion.div
            className="hero-visual-block"
            style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          >
            <div className="hero-visual-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '550px' }}>

              {/* Glowing Outline / Shadow */}
              <div style={{ position: 'absolute', inset: '-25px', background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 65%)', filter: 'blur(35px)', zIndex: 0 }} />

              <motion.img
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                alt="Premium Strategy & Innovation"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  borderRadius: '32px',
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)',
                  position: 'relative',
                  zIndex: 1,
                  border: '1px solid rgba(255,255,255,0.6)'
                }}
              />

              {/* Floating Element 1 - Innovation */}
              <motion.div
                className="premium-badge"
                animate={{ y: [12, -12, 12] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute', top: '15%', right: '-12%',
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
                  padding: '1.2rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,1)',
                  zIndex: 2, boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                  display: 'flex', alignItems: 'center', gap: '1rem'
                }}
              >
                <div style={{ background: 'rgba(14,165,233,0.15)', padding: '0.8rem', borderRadius: '50%', color: '#0ea5e9' }}>
                  <Star size={24} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary-dark)', fontSize: '1.1rem', lineHeight: '1.2' }}>Premium</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Solutions</span>
                </div>
              </motion.div>

              {/* Floating Element 2 - Excellence */}
              <motion.div
                className="global-badge"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                style={{
                  position: 'absolute', bottom: '15%', left: '-10%',
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
                  padding: '1.2rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,1)',
                  zIndex: 2, boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                  display: 'flex', alignItems: 'center', gap: '1rem'
                }}
              >
                <div style={{ background: 'rgba(244,63,94,0.12)', padding: '0.8rem', borderRadius: '50%', color: '#f43f5e' }}>
                  <Briefcase size={24} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary-dark)', fontSize: '1.1rem', lineHeight: '1.2' }}>Global</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Expertise</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Wave SVG Divider */}
        <img
          src="/wave-haikei-1.svg"
          alt=""
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            display: 'block',
            lineHeight: 0,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </section>


      {/* ══════════════════════════════════════
          ABOUT TIIS SECTION
      ══════════════════════════════════════ */}
      <section className="about-section" style={{ padding: '8rem 0', backgroundColor: 'var(--color-bg-light)', position: 'relative', overflow: 'hidden' }}>
        {/* Abstract Background Shapes */}
        <div style={{ position: 'absolute', top: '0', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)', opacity: 0.6, filter: 'blur(50px)', zIndex: 0 }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.2)' }}>
              <img src="/About us.png" alt="TIIS Collaboration" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/4' }} />
            </div>


          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              <span style={{ width: '40px', height: '3px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
              About TIIS
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: isDark ? 'white' : 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Empowering Growth Through <span style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Partnership</span>
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
              We at TIIS offer customized-based solutions that help increase productivity, performance, and profitability. We believe in customizing and developing specific solutions through a collaborative process designed to identify a client’s needs. Our approach is based on experiential learning combined with the technology and strong faculty of experts and competent solutions providers.
            </p>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '2.5rem', textAlign: 'justify' }}>
              We aim to develop a partnership with our clients by collaborating, cooperating, and coordinating. By improving practices in people and organization development, we ensure that work benefits individuals, businesses, economies, and society at large.
            </p>

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <CheckCircle size={24} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.3rem' }}>Customized Solutions</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>Tailored specifically to identify and address client needs.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <CheckCircle size={24} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.3rem' }}>Experiential Learning</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>Combined with deep technology and expert faculty.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="btn-pill-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem', boxShadow: '0 10px 25px -5px rgba(1, 50, 78, 0.4)' }}>
                Discover More <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Dynamic Portfolio Section */}
      {portfolio.length > 0 && (
        <section className="portfolio-section" style={{ padding: '6rem 0', background: 'var(--grad-projects)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: isDark ? '#f87171' : 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                <span style={{ width: '30px', height: '2px', backgroundColor: isDark ? '#f87171' : 'var(--color-secondary)', borderRadius: '2px' }}></span>
                Our Work
                <span style={{ width: '30px', height: '2px', backgroundColor: isDark ? '#f87171' : 'var(--color-secondary)', borderRadius: '2px' }}></span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: isDark ? 'white' : 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
                Recent <span style={{ background: isDark ? 'linear-gradient(135deg, #e0f2fe 0%, #f87171 100%)' : 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</span>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
                Explore our latest engagements and the impact we've delivered for our clients.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
              {portfolio.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group portfolio-card"
                  style={{
                    position: 'relative', height: '460px', borderRadius: '28px', overflow: 'hidden', cursor: 'pointer',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-end', padding: '1.5rem', color: 'white'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0,0,0,0.2)'; }}
                >
                  <div
                    className="group-hover:scale-105"
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80)',
                      backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)', zIndex: 0
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(20,25,20,0.6) 55%, rgba(20,25,20,0.95) 85%, rgba(20,25,20,1) 100%)', zIndex: 1 }} />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '500', marginBottom: '0.6rem', lineHeight: '1.2', letterSpacing: '-0.5px' }}>{project.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', marginBottom: '1.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        ★ {project.clientName || 'Confidential'}
                      </div>
                      <div style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Projects
                      </div>
                    </div>
                    <Link to="/portfolio" onClick={() => window.scrollTo(0, 0)} style={{ display: 'block', width: '100%', padding: '0.85rem', backgroundColor: 'white', color: '#111', borderRadius: '50px', textAlign: 'center', fontWeight: '600', fontSize: '1rem', textDecoration: 'none', transition: 'background-color 0.2s, transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      View Project
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <Link to="/portfolio" onClick={() => window.scrollTo(0, 0)} className="btn-pill-secondary" style={{ border: '2px solid var(--color-primary)' }}>
                See All Projects
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Client Logos Marquee ── */}
      {logos.length > 0 && (
        <section style={{
          padding: '1.5rem 0',
          backgroundColor: isDark ? 'var(--color-bg-dark)' : '#fff',
          overflow: 'hidden',
          position: 'relative',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '120px', background: isDark ? 'linear-gradient(to right, var(--color-bg-dark), transparent)' : 'linear-gradient(to right, #fff, transparent)', zIndex: 3, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '120px', background: isDark ? 'linear-gradient(to left, var(--color-bg-dark), transparent)' : 'linear-gradient(to left, #fff, transparent)', zIndex: 3, pointerEvents: 'none' }} />

          <style>{`
            @keyframes marqueeLogos {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div style={{ display: 'inline-flex', animation: 'marqueeLogos 25s linear infinite', whiteSpace: 'nowrap', willChange: 'transform' }}>
            {[1, 2].map((set) => (
              <React.Fragment key={set}>
                {logos.map((logo, idx) => (
                  <img
                    key={`${set}-${logo._id || idx}`}
                    src={logo.imageUrl}
                    alt={logo.title || 'Client/Partner Logo'}
                    title={logo.title || 'Client/Partner'}
                    style={{
                      height: '72px',
                      maxWidth: '220px',
                      objectFit: 'contain',
                      opacity: 0.9,
                      filter: 'none',
                      transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      marginRight: '6rem',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'none'; }}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          INDUSTRIES WE SERVE SECTION
      ══════════════════════════════════════ */}
      <section className="industries-section" style={{ padding: '6rem 0', backgroundColor: isDark ? '#080808' : '#ffffff', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: isDark ? '#f87171' : 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
              <span style={{ width: '30px', height: '2px', backgroundColor: isDark ? '#f87171' : 'var(--color-secondary)', borderRadius: '2px' }}></span>
              Sector Expertise
              <span style={{ width: '30px', height: '2px', backgroundColor: isDark ? '#f87171' : 'var(--color-secondary)', borderRadius: '2px' }}></span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: isDark ? 'white' : 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
              Industries We <span style={{ background: isDark ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Serve</span>
            </h2>
          </motion.div>

          {/* Scrolling Marquee implementation for OP smooth infinite scroll */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes scrollIndustries {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-350px * 5 - 2rem * 5)); }
            }
            .industry-track {
              display: flex;
              gap: 2rem;
              width: max-content;
              animation: scrollIndustries 30s linear infinite;
            }
            .industry-track:hover {
              animation-play-state: paused;
            }
            .industry-card {
              width: 350px;
              height: 380px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 2.5rem;
              border-radius: 24px;
              border: 2px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(2,132,199,0.15)'};
              background: ${isDark ? '#111' : '#fff'};
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: pointer;
              position: relative;
              overflow: hidden;
            }
            .industry-card::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background: linear-gradient(180deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(2,132,199,0.03)'} 0%, transparent 100%);
              opacity: 0;
              transition: opacity 0.4s;
            }
            .industry-card:hover {
              transform: translateY(-10px);
              border-color: var(--color-primary);
              box-shadow: 0 20px 40px -15px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(2,132,199,0.2)'};
            }
            .industry-card:hover::before {
              opacity: 1;
            }
            .industry-icon-wrapper {
              color: var(--color-primary);
              margin-bottom: 2rem;
              transition: transform 0.4s;
              background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(14,165,233,0.1)'};
              padding: 1.5rem;
              border-radius: 50%;
            }
            .industry-card:hover .industry-icon-wrapper {
              transform: scale(1.1) translateY(-5px);
              background: var(--color-primary);
              color: white;
            }
            .industry-title {
              font-size: 1.4rem;
              font-weight: 700;
              color: ${isDark ? 'white' : 'var(--color-primary)'};
              margin-bottom: 1rem;
              transition: color 0.3s;
            }
            .industry-card:hover .industry-title {
              color: ${isDark ? 'white' : 'var(--color-primary-dark)'};
            }
            .industry-desc {
              font-size: 0.95rem;
              color: var(--color-text-muted);
              line-height: 1.6;
              opacity: 0.85;
            }
          `}} />
        </div>

        <div style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0 3rem 0', width: '100vw', left: '50%', transform: 'translateX(-50%)', maxWidth: '100vw' }}>
          <div className="industry-track">
            {/* Duplicate array for infinite scroll */}
            {[...Array(2)].map((_, setIdx) => (
              <React.Fragment key={setIdx}>
                {[
                  { name: 'Healthcare', icon: <HeartPulse size={48} strokeWidth={1.5} />, desc: 'Connecting top-tier medical professionals—from specialists to researchers—with leading institutions.' },
                  { name: 'Medical Devices', icon: <Microscope size={48} strokeWidth={1.5} />, desc: 'Sourcing visionary engineers and regulatory experts to drive innovation in medical technology.' },
                  { name: 'Eldercare', icon: <HeartHandshake size={48} strokeWidth={1.5} />, desc: 'Empowering specialized care facilities with compassionate, highly-trained geriatric professionals.' },
                  { name: 'Hospitality', icon: <Hotel size={48} strokeWidth={1.5} />, desc: 'Providing exceptional service talent to elevate guest experiences globally.' },
                  { name: 'IT', icon: <Monitor size={48} strokeWidth={1.5} />, desc: 'Fueling digital transformation with elite software developers and systems architects.' }
                ].map((ind, i) => (
                  <div className="industry-card" key={i}>
                    <div className="industry-icon-wrapper">
                      {ind.icon}
                    </div>
                    <h3 className="industry-title">{ind.name}</h3>
                    <p className="industry-desc">{ind.desc}</p>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* News Bento Grid Section */}
      {news.length > 0 && (
        <section className="news-section" style={{ minHeight: '100vh', background: 'var(--grad-blog)', display: 'flex', flexDirection: 'column', padding: '5rem 0' }}>
          <div className="container" style={{ maxWidth: '1400px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: isDark ? '#f87171' : 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                <span style={{ width: '30px', height: '2px', backgroundColor: isDark ? '#f87171' : 'var(--color-secondary)', borderRadius: '2px' }}></span>
                Knowledge Hub
                <span style={{ width: '30px', height: '2px', backgroundColor: isDark ? '#f87171' : 'var(--color-secondary)', borderRadius: '2px' }}></span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: isDark ? 'white' : 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
                Latest Insights <span style={{ background: isDark ? 'linear-gradient(135deg, #e0f2fe 0%, #f87171 100%)' : 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>&amp; Blog</span>
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
                Discover our latest research, strategic perspectives, and industry updates carefully curated for ambitious leaders.
              </p>
            </motion.div>

            {/* Premium Auto Slider */}
            <div style={{ flexGrow: 1, position: 'relative', minHeight: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
              <AnimatePresence mode="wait">
                {news.length > 0 && (
                  <motion.div
                    key={currentNewsIndex}
                    className="news-slider-container group"
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '100%', maxWidth: '1250px', display: 'flex', flexDirection: 'row',
                      borderRadius: '40px', overflow: 'hidden', boxShadow: isDark ? '0 50px 100px -20px rgba(0,0,0,0.8)' : '0 40px 100px -20px rgba(3, 105, 161, 0.25)',
                      backgroundColor: isDark ? '#0a0a0a' : '#ffffff', minHeight: '550px', border: `1px solid ${isDark ? '#222' : '#e2e8f0'}`,
                      position: 'relative',
                    }}
                  >
                    <div className="news-slider-image" style={{ flex: '1 1 50%', position: 'relative', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{ position: 'absolute', inset: -20, backgroundImage: `url(${news[currentNewsIndex].imageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                        className="group-hover:scale-105"
                      />


                      {/* Floating Date Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', padding: '0.8rem 1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                      >
                        <span style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1 }}>{new Date(news[currentNewsIndex].createdAt).getDate()}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{new Date(news[currentNewsIndex].createdAt).toLocaleString('default', { month: 'short' })}</span>
                      </motion.div>
                    </div>

                    <div className="news-slider-content" style={{
                      flex: '1 1 50%', padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                      position: 'relative', zIndex: 10
                    }}>
                      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ padding: '0.5rem 1.2rem', background: isDark ? 'rgba(248, 113, 113, 0.1)' : 'var(--color-primary-light)', color: isDark ? '#f87171' : 'var(--color-primary-dark)', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', border: `1px solid ${isDark ? 'rgba(248, 113, 113, 0.2)' : 'var(--color-primary)'}` }}>
                          Featured Insight
                        </span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }}></span>
                          Research & Strategy
                        </span>
                      </div>

                      <h3 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: '900', color: isDark ? 'white' : 'var(--color-primary-dark)', lineHeight: '1.15', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                        {news[currentNewsIndex].title}
                      </h3>

                      <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '3rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {news[currentNewsIndex].content}
                      </p>

                      <button
                        onClick={() => setSelectedNews(news[currentNewsIndex])}
                        style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 0', background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)', cursor: 'pointer', transition: 'gap 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.gap = '1.2rem'}
                        onMouseLeave={e => e.currentTarget.style.gap = '0.8rem'}
                      >
                        <span style={{ borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.2rem' }}>Read Full Article</span> <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ position: 'absolute', bottom: '-4rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                {news.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentNewsIndex(idx)}
                    style={{ width: currentNewsIndex === idx ? '30px' : '10px', height: '10px', borderRadius: '10px', backgroundColor: currentNewsIndex === idx ? 'var(--color-primary)' : 'rgba(0,0,0,0.2)', border: 'none', transition: 'all 0.4s ease', cursor: 'pointer', padding: 0 }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem' }}
            >
              <Link to="/news" onClick={() => window.scrollTo(0, 0)} className="btn-pill-secondary" style={{ border: '2px solid var(--color-primary)', fontSize: '0.85rem' }}>
                View All Posts <ArrowRight size={15} />
              </Link>
            </motion.div>

          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          TESTIMONIALS SECTION — ULTRA PREMIUM
      ══════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section style={{
          padding: '7rem 0',
          background: isDark
            ? 'linear-gradient(180deg, #060608 0%, #0a0a10 50%, #060608 100%)'
            : 'linear-gradient(180deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ambient background glow blobs */}
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(68,176,255,0.12) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,68,255,0.12) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '300px', background: 'radial-gradient(ellipse, rgba(255,102,68,0.07) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem', padding: '0.5rem 1.4rem', borderRadius: '50px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(1,50,78,0.12)'}`, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FDB241' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted)' }}>
                  Client Stories
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900, color: isDark ? '#ffffff' : 'var(--color-primary-dark)', lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: '-1px' }}>
                What Our Clients{' '}
                <span style={{ background: 'linear-gradient(135deg, #44b0ff 0%, #8b44ff 50%, #ff6644 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Say About Us
                </span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                {testimonials.length}+ professionals and organizations trust us — here's what they say.
              </p>
            </motion.div>

            {/* Rainbow Glow Bar */}
            <div style={{ position: 'relative', margin: '0 auto', maxWidth: '1100px', paddingBottom: '1rem' }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '100%', background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)', borderRadius: '3rem', opacity: isDark ? 0.18 : 0.12, filter: 'blur(55px)', pointerEvents: 'none', zIndex: 0 }} />

              {/* Cards Grid — masonry columns, dynamic height per description */}
              <div style={{
                columns: 'auto 300px',
                columnGap: '1.8rem',
                position: 'relative',
                zIndex: 1,
              }}>
                {testimonials.map((t, idx) => (
                  <motion.div
                    key={t._id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    style={{
                      breakInside: 'avoid',
                      marginBottom: '1.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      background: isDark
                        ? 'linear-gradient(160deg, rgba(30,30,40,0.95) 0%, rgba(18,18,28,0.98) 100%)'
                        : 'linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(248,250,255,0.98) 100%)',
                      borderRadius: '28px',
                      border: isDark
                        ? '1px solid rgba(255,255,255,0.07)'
                        : '1px solid rgba(1,50,78,0.09)',
                      boxShadow: isDark
                        ? '0 24px 60px -12px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04) inset'
                        : '0 24px 60px -12px rgba(2,132,199,0.12), 0 0 0 0.5px rgba(255,255,255,0.8) inset',
                      overflow: 'hidden',
                      cursor: 'default',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Subtle top gradient accent */}
                    <div style={{ height: '3px', background: `linear-gradient(90deg, #44b0ff, #8b44ff, #ff6644)`, opacity: 0.7 }} />

                    <div style={{ padding: '2.2rem 2.4rem', display: 'flex', flexDirection: 'column' }}>
                      {/* Top row: stars + rating badge */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.6rem' }}>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          {[...Array(5)].map((_, i) => {
                            const filled = i < (t.rating || 5);
                            return (
                              <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill={filled ? '#FDB241' : (isDark ? '#333' : '#e5e7eb')} xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            );
                          })}
                        </div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#FDB241', background: isDark ? 'rgba(253,178,65,0.12)' : 'rgba(253,178,65,0.1)', padding: '0.3rem 0.8rem', borderRadius: '50px', border: '1px solid rgba(253,178,65,0.25)' }}>
                          {t.rating || 5}.0 ★
                        </span>
                      </div>

                      {/* Quote icon */}
                      <div style={{ marginBottom: '0.8rem' }}>
                        <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 24V14.4C0 10.4 1.06667 7.06667 3.2 4.4C5.33333 1.6 8.4 0 12.4 0L13.6 2.4C11.3333 3.06667 9.46667 4.4 8 6.4C6.66667 8.4 6 10.5333 6 12.8H12V24H0ZM18.4 24V14.4C18.4 10.4 19.4667 7.06667 21.6 4.4C23.7333 1.6 26.8 0 30.8 0L32 2.4C29.7333 3.06667 27.8667 4.4 26.4 6.4C25.0667 8.4 24.4 10.5333 24.4 12.8H30.4V24H18.4Z" fill={isDark ? 'rgba(139,68,255,0.3)' : 'rgba(68,176,255,0.2)'} />
                        </svg>
                      </div>

                      {/* Quote text */}
                      <blockquote style={{ flex: 1, fontSize: '1.05rem', lineHeight: 1.75, color: isDark ? 'rgba(255,255,255,0.82)' : 'rgba(15,23,42,0.82)', fontStyle: 'italic', letterSpacing: '0.1px', marginBottom: '2rem' }}>
                        {t.description}
                      </blockquote>

                      {/* Divider */}
                      <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', marginBottom: '1.4rem', borderRadius: '1px' }} />

                      {/* Author row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {t.imageUrl ? (
                          <img
                            src={t.imageUrl}
                            alt={t.clientName}
                            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(2,132,199,0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                          />
                        ) : (
                          <div style={{
                            width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                            background: `linear-gradient(135deg, hsl(${(idx * 60 + 200) % 360}, 70%, 55%), hsl(${(idx * 60 + 260) % 360}, 65%, 50%))`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 800, fontSize: '1.2rem',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                            border: isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(255,255,255,0.8)',
                          }}>
                            {t.clientName ? t.clientName.charAt(0).toUpperCase() : 'C'}
                          </div>
                        )}
                        <div>
                          <p style={{ fontSize: '1rem', fontWeight: 700, color: isDark ? '#ffffff' : 'var(--color-primary-dark)', lineHeight: 1.2, marginBottom: '0.25rem' }}>
                            {t.clientName}
                          </p>
                          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                            {t.designation || 'Client'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}



      {/* ══════════════════════════════════════
          WHY US / CTA SECTION
      ══════════════════════════════════════ */}
      <section className="why-us-section" style={{ padding: '6rem 0 10rem 0', backgroundColor: 'var(--color-primary-dark)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ flex: '1 1 500px' }}
            >
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '800', color: 'white', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                Ready To Transform<br />Your Enterprise?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '550px' }}>
                Partner with TIIS to unlock innovative solutions tailored for your industry. Our strategic expertise and global experience deliver measurable results and long-term success.
              </p>

              <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                {[
                  { title: 'Cost-Effective' },
                  { title: 'Global Experience' },
                  { title: '24/7 Support' },
                  { title: 'Long-Term Partnerships' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'white', fontWeight: '600' }}>
                    <CheckCircle size={20} style={{ color: 'var(--color-secondary)' }} />
                    {item.title}
                  </div>
                ))}
              </div>

              <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="btn-pill-primary" style={{ backgroundColor: 'var(--color-secondary)', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                SCHEDULE CONSULTATION
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ flex: '1 1 400px', position: 'relative' }}
            >
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" alt="Transform Your Enterprise" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave SVG Divider */}
        <div style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, pointerEvents: 'none', zIndex: 1 }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '180px' }}>
            <path fill="var(--color-primary)" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,176C672,139,768,85,864,80C960,75,1056,117,1152,149.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Motto Modal */}
      {isMottoModalOpen && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setIsMottoModalOpen(false)}>
          <motion.div
            className="motto-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color-strong)', borderRadius: '16px', padding: '3rem 2.5rem', maxWidth: '750px', width: '100%', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setIsMottoModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '2.5rem', cursor: 'pointer', color: 'var(--color-text-muted)', lineHeight: 1 }}>&times;</button>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '2rem', borderBottom: '3px solid var(--color-secondary)', paddingBottom: '1rem', display: 'inline-block' }}>Our Motto is Service Before Self</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                "Serve client with integrity and honesty,",
                "TIIS proposed collaborative, multidisciplinary, and innovative solutions that are based on research and supported by modern technology",
                "To provide client satisfaction come first, always and every time"
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
        <div className="news-modal-wrapper" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedNews(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative news-modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-card-bg)' }}
          >
            <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-xl hover:bg-white transition-colors cursor-pointer border border-black/10">&times;</button>

            <div className="h-64 relative shrink-0 news-modal-header-img">
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

            <div className="news-modal-body" style={{ padding: '3rem 4rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', flexShrink: 0 }}>
                  T
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--color-primary-dark)', fontSize: '1rem' }}>TIIS Editorial Team</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{Math.ceil(selectedNews.content.length / 800)} min read • Research & Strategy</div>
                </div>
              </div>

              <div style={{ color: 'var(--color-text-main)', fontSize: '1.15rem', lineHeight: '1.9', whiteSpace: 'pre-wrap', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '400', letterSpacing: '0.2px' }}>
                <span className="drop-cap" style={{ float: 'left', fontSize: '4.5rem', lineHeight: '0.8', paddingTop: '0.3rem', paddingRight: '0.8rem', color: 'var(--color-primary-dark)', fontWeight: '900', fontFamily: 'Georgia, serif' }}>
                  {selectedNews.content.charAt(0)}
                </span>
                {renderTextWithLinks(selectedNews.content.substring(1))}
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