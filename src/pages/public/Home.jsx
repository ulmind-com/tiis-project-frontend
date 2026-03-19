import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Building2, Users, Briefcase, FileText, Layout, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import api from '../../api';
import { useTheme } from '../../hooks/useTheme';

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
      style={{
        "--border-radius": `${borderRadius}px`,
        backgroundColor: bgColor
      }}
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
      className="h-full w-full p-2 group"
      style={{ height: '520px' }}
    >
      <ShineBorder
        borderWidth={2.5}
        borderRadius={24}
        color={theme.shineColors}
        bgColor={theme.cardBg}
        className="shadow-2xl overflow-hidden flex flex-col justify-between items-start text-left p-0 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
      >
        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1, position: 'relative', zIndex: 20, height: '100%', transition: 'background-color 0.4s ease' }}>
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
  const [isMottoModalOpen, setIsMottoModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const capabilitiesRef = useRef(null);
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, portRes] = await Promise.all([
          api.get('/api/news'),
          api.get('/api/portfolio')
        ]);
        setNews(newsRes.data.slice(0, 4)); // Get 4 for bento grid
        setPortfolio(portRes.data.slice(0, 3));
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
    <div className="home-page animate-fade-in" style={{ backgroundColor: 'var(--color-bg-light)' }}>

      {/* Premium Split Hero Section */}
      <section style={{ backgroundColor: 'var(--color-bg-light)', padding: '6rem 0 8rem 0', overflow: 'hidden' }}>
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
      <section ref={capabilitiesRef} className="services-overview" style={{ padding: '7rem 0', background: 'var(--grad-capabilities)' }}>
        <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="section-title text-center mb-16 transition-colors duration-400" style={{ color: isDark ? 'white' : 'var(--color-text-heading)' }}>Our Capabilities</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
            width: '100%',
          }}>
            {capabilitiesData.map((service, i) => (
              <CapabilityCard key={i} service={service} index={i} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Portfolio Section */}
      {portfolio.length > 0 && (
        <section style={{ padding: '6rem 0', background: 'var(--grad-projects)' }}>
          <div className="container">
            <h2 className="section-title" style={{ color: isDark ? 'white' : 'var(--color-text-heading)' }}>Recent Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
              {portfolio.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    position: 'relative',
                    height: '460px',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    color: 'white'
                  }}
                  className="group"
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0,0,0,0.2)'; }}
                >
                  {/* Background Image with Hover Scale */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      zIndex: 0
                    }}
                    className="group-hover:scale-105"
                  />

                  {/* Premium Dark Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(20,25,20,0.6) 55%, rgba(20,25,20,0.95) 85%, rgba(20,25,20,1) 100%)',
                      zIndex: 1
                    }}
                  />

                  {/* Card Content Overlay */}
                  <div style={{ position: 'relative', zIndex: 2 }}>

                    <h3 style={{ fontSize: '1.6rem', fontWeight: '500', marginBottom: '0.6rem', lineHeight: '1.2', letterSpacing: '-0.5px' }}>{project.title}</h3>

                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5', marginBottom: '1.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {project.description}
                    </p>

                    {/* Badges / Tags Row */}
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        ★ {project.clientName || 'Confidential'}
                      </div>
                      <div style={{ padding: '0.35rem 0.8rem', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Projects
                      </div>
                    </div>

                    {/* Submit / Action Button */}
                    <Link to="/portfolio" style={{ display: 'block', width: '100%', padding: '0.85rem', backgroundColor: 'white', color: '#111', borderRadius: '50px', textAlign: 'center', fontWeight: '600', fontSize: '1rem', textDecoration: 'none', transition: 'background-color 0.2s, transform 0.2s' }}
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
              <Link to="/portfolio" className="btn-pill-secondary" style={{ border: '2px solid var(--color-primary)' }}>
                See All Projects
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* News Bento Grid Section */}
      {news.length > 0 && (
        <section style={{ minHeight: '100vh', background: 'var(--grad-blog)', display: 'flex', flexDirection: 'column', padding: '5rem 0' }}>
          <div className="container" style={{ maxWidth: '1400px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Ultra Premium Section Header */}
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
            <div style={{ flexGrow: 1, position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {news.length > 0 && (
                  <motion.div
                    key={currentNewsIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                      width: '100%',
                      maxWidth: '1200px',
                      display: 'flex',
                      flexDirection: 'row',
                      borderRadius: '30px',
                      overflow: 'hidden',
                      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)',
                      backgroundColor: 'var(--color-card-bg)',
                      height: '500px'
                    }}
                  >
                    {/* Left Side: Image */}
                    <div style={{ flex: '1 1 50%', position: 'relative' }}>
                      <div
                        style={{
                          position: 'absolute', inset: 0,
                          backgroundImage: `url(${news[currentNewsIndex].imageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>

                    {/* Right Side: Content with Glassmorphism */}
                    <div style={{
                      flex: '1 1 50%',
                      padding: '4rem 3rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: 'var(--color-navbar-bg)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderLeft: '1px solid var(--border-color-strong)',
                      zIndex: 10
                    }}>
                      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ padding: '0.4rem 1rem', backgroundColor: 'var(--color-secondary)', color: 'white', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          Featured Insight
                        </span>
                        <span style={{ color: 'var(--color-primary-dark)', opacity: 0.6, fontSize: '0.9rem', fontWeight: '500' }}>
                          {new Date(news[currentNewsIndex].createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                        {news[currentNewsIndex].title}
                      </h3>

                      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '3rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {news[currentNewsIndex].content}
                      </p>

                      <button
                        onClick={() => setSelectedNews(news[currentNewsIndex])}
                        className="btn-pill-primary"
                        style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1rem' }}
                      >
                        Read Full Article <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slider Dots */}
              <div style={{ position: 'absolute', bottom: '-3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.8rem' }}>
                {news.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentNewsIndex(idx)}
                    style={{
                      width: currentNewsIndex === idx ? '30px' : '10px',
                      height: '10px',
                      borderRadius: '10px',
                      backgroundColor: currentNewsIndex === idx ? 'var(--color-primary)' : 'rgba(0,0,0,0.2)',
                      border: 'none',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      padding: 0
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
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
            style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color-strong)', borderRadius: '16px', padding: '3rem 2.5rem', maxWidth: '750px', width: '100%', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
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
            className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-card-bg)' }}
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

            <div style={{ padding: '3rem 4rem', overflowY: 'auto' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem' }}>
                  T
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--color-primary-dark)', fontSize: '1rem' }}>TIIS Editorial Team</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{Math.ceil(selectedNews.content.length / 800)} min read • Research & Strategy</div>
                </div>
              </div>

              <div style={{
                color: 'var(--color-text-main)',
                fontSize: '1.15rem',
                lineHeight: '1.9',
                whiteSpace: 'pre-wrap',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                <span className="drop-cap" style={{ float: 'left', fontSize: '4.5rem', lineHeight: '0.8', paddingTop: '0.3rem', paddingRight: '0.8rem', color: 'var(--color-primary-dark)', fontWeight: '900', fontFamily: 'Georgia, serif' }}>
                  {selectedNews.content.charAt(0)}
                </span>
                {selectedNews.content.substring(1)}
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