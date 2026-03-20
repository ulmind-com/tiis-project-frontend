import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await api.get('/api/team');
        setTeam(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="team-page animate-fade-in" style={{ paddingBottom: '4rem', overflowX: 'hidden', background: 'var(--color-page-grad)', minHeight: '100vh' }}>

      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          /* General Container */
          .container { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          
          /* Hero Section */
          .team-hero { padding: 6rem 1.5rem 4rem !important; border-bottom: none !important; }
          .team-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center !important; }
          .team-hero-content { text-align: center !important; align-items: center !important; }
          .team-hero-content div { margin: 0 auto 1.5rem !important; }
          .team-hero-title { font-size: 2.5rem !important; margin-bottom: 1rem !important; line-height: 1.2 !important; text-align: center !important; }
          .team-hero-subtitle { font-size: 1rem !important; line-height: 1.6 !important; padding: 0 0.5rem; text-align: center !important; margin: 0 auto !important; }

          /* Team Grid Section */
          .team-grid-section { padding: 0 1rem !important; margin-top: -1.5rem !important; }
          .team-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }

          /* Team Card Styling */
          .team-card { border-radius: 20px !important; }
          .team-card-img { height: 280px !important; }
          .team-card-content { padding: 1.5rem !important; }
          .team-card-name { font-size: 1.3rem !important; }
          .team-card-bio { font-size: 0.95rem !important; line-height: 1.6 !important; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      {/* Premium Hero Section */}
      <section className="team-hero" style={{
        position: 'relative',
        padding: '8rem 5% 6rem',
        background: 'transparent',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)', filter: 'blur(50px)', zIndex: 0 }} />

        <div className="container team-hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* Text Content */}
          <div className="team-hero-content" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}
            >
              <span style={{ width: '30px', height: '2px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
              Leadership
              <span style={{ width: '30px', height: '2px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
            </motion.div>

            <motion.h1
              className="team-hero-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontWeight: '900',
                letterSpacing: '-1px',
                color: 'var(--color-primary-dark)',
                marginBottom: '1.5rem',
                lineHeight: 1.1
              }}
            >
              Our Core <span style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', transform: 'translateZ(0)', isolation: 'isolate' }}>Team</span>
            </motion.h1>

            <motion.p
              className="team-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '1.2rem',
                lineHeight: '1.8',
                maxWidth: '600px',
                margin: 0
              }}
            >
              Meet the experienced leaders and solutionaries driving innovation, growth, and sustainable solutions at TIIS.
            </motion.p>
          </div>

          {/* Premium SVG Team Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* Glowing Backdrop */}
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0 }} />

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '460px' }}
            >
              <svg viewBox="0 0 460 380" width="100%" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 25px 50px rgba(139,92,246,0.22))' }}
              >
                <defs>
                  <linearGradient id="teamG1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#01324e"/><stop offset="100%" stopColor="#024b76"/></linearGradient>
                  <linearGradient id="teamG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#a78bfa"/></linearGradient>
                  <linearGradient id="teamG3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#b12023"/><stop offset="100%" stopColor="#e53e42"/></linearGradient>
                  <linearGradient id="teamGBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#dbeafe"/><stop offset="100%" stopColor="#ede9fe"/></linearGradient>
                </defs>
                {/* Main background card */}
                <rect x="20" y="20" width="420" height="340" rx="28" fill="white" stroke="url(#teamGBg)" strokeWidth="2" opacity="0.95"/>
                {/* Top header bar */}
                <rect x="20" y="20" width="420" height="55" rx="28" fill="url(#teamG1)"/>
                <rect x="20" y="55" width="420" height="20" fill="url(#teamG1)"/>
                {/* Traffic dot lights */}
                <circle cx="48" cy="48" r="7" fill="#f87171"/>
                <circle cx="68" cy="48" r="7" fill="#fbbf24"/>
                <circle cx="88" cy="48" r="7" fill="#34d399"/>
                <text x="200" y="53" textAnchor="middle" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.85)">TIIS — Our Core Team</text>

                {/* Person 1 — left desk */}
                <rect x="50" y="110" width="110" height="160" rx="14" fill="url(#teamGBg)" opacity="0.7"/>
                <circle cx="105" cy="145" r="20" fill="url(#teamG1)"/>
                <text x="105" y="150" textAnchor="middle" fontSize="15" fontWeight="800" fill="white">A</text>
                <rect x="65" y="175" width="80" height="8" rx="4" fill="#94a3b8" opacity="0.5"/>
                <rect x="70" y="190" width="70" height="6" rx="3" fill="#cbd5e1" opacity="0.5"/>
                {/* Laptop person 1 */}
                <rect x="62" y="210" width="86" height="48" rx="6" fill="url(#teamG1)" opacity="0.85"/>
                <rect x="66" y="214" width="78" height="38" rx="4" fill="#0ea5e9" opacity="0.7"/>
                <rect x="58" y="256" width="94" height="6" rx="3" fill="#64748b" opacity="0.5"/>

                {/* Person 2 — center */}
                <rect x="175" y="100" width="110" height="170" rx="14" fill="url(#teamG2)" opacity="0.15"/>
                <circle cx="230" cy="138" r="22" fill="url(#teamG2)"/>
                <text x="230" y="144" textAnchor="middle" fontSize="15" fontWeight="800" fill="white">T</text>
                <rect x="190" y="170" width="80" height="8" rx="4" fill="#94a3b8" opacity="0.5"/>
                <rect x="195" y="185" width="70" height="6" rx="3" fill="#cbd5e1" opacity="0.5"/>
                {/* Chart person 2 */}
                <rect x="187" y="205" width="86" height="50" rx="6" fill="#7c3aed" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5"/>
                <rect x="196" y="228" width="10" height="20" rx="3" fill="url(#teamG2)"/>
                <rect x="212" y="220" width="10" height="28" rx="3" fill="url(#teamG2)" opacity="0.8"/>
                <rect x="228" y="215" width="10" height="33" rx="3" fill="url(#teamG2)" opacity="0.9"/>
                <rect x="244" y="223" width="10" height="25" rx="3" fill="url(#teamG2)" opacity="0.75"/>
                <polyline points="196,228 212,220 228,215 244,223" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>

                {/* Person 3 — right desk */}
                <rect x="300" y="110" width="110" height="160" rx="14" fill="url(#teamGBg)" opacity="0.7"/>
                <circle cx="355" cy="145" r="20" fill="url(#teamG3)"/>
                <text x="355" y="150" textAnchor="middle" fontSize="15" fontWeight="800" fill="white">S</text>
                <rect x="315" y="175" width="80" height="8" rx="4" fill="#94a3b8" opacity="0.5"/>
                <rect x="320" y="190" width="70" height="6" rx="3" fill="#cbd5e1" opacity="0.5"/>
                {/* Shield person 3 */}
                <path d="M330 210 L380 210 L380 248 C380 258 355 266 355 266 C355 266 330 258 330 248 Z" fill="url(#teamG3)" opacity="0.8"/>
                <polyline points="343,238 352,246 368,230" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

                {/* Connection lines between people */}
                <line x1="160" y1="145" x2="175" y2="140" stroke="url(#teamG2)" strokeWidth="2" strokeDasharray="5 4" opacity="0.6"/>
                <line x1="285" y1="140" x2="300" y2="145" stroke="url(#teamG2)" strokeWidth="2" strokeDasharray="5 4" opacity="0.6"/>
                {/* Central connection node */}
                <circle cx="230" cy="315" r="14" fill="url(#teamG1)"/>
                <line x1="105" y1="270" x2="220" y2="310" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4"/>
                <line x1="230" y1="270" x2="230" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4"/>
                <line x1="355" y1="270" x2="242" y2="310" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4"/>
                <circle cx="105" cy="270" r="5" fill="url(#teamG1)" opacity="0.7"/>
                <circle cx="230" cy="270" r="5" fill="url(#teamG2)" opacity="0.7"/>
                <circle cx="355" cy="270" r="5" fill="url(#teamG3)" opacity="0.7"/>
                <text x="230" y="320" textAnchor="middle" fontSize="9" fontWeight="700" fill="white">TIIS</text>

                {/* Floating sparkles */}
                <circle cx="40" cy="300" r="5" fill="#fbbf24" opacity="0.7"/>
                <circle cx="420" cy="310" r="4" fill="#a78bfa" opacity="0.7"/>
                <circle cx="230" cy="90" r="4" fill="#34d399" opacity="0.7"/>
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Team Grid Section */}
      <section className="team-grid-section" style={{ position: 'relative', zIndex: 2, marginTop: '-3rem', padding: '0 5%' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>Loading our team...</div>
          ) : team.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>No team members added yet.</div>
          ) : (
            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
              {team.map((member, index) => (
              <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -12,
                    boxShadow: '0 32px 60px -12px rgba(0,0,0,0.2)',
                    transition: { type: 'spring', stiffness: 280, damping: 18 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    background: 'var(--color-navbar-bg)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
                    border: '1px solid var(--border-color-strong)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                  className="team-card group"
                >
                  {/* Colored top accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                    background: ['linear-gradient(90deg,#01324e,#3b82f6)', 'linear-gradient(90deg,#8b5cf6,#ec4899)', 'linear-gradient(90deg,#b12023,#f59e0b)', 'linear-gradient(90deg,#10b981,#3b82f6)', 'linear-gradient(90deg,#f59e0b,#ec4899)', 'linear-gradient(90deg,#01324e,#8b5cf6)'][index % 6],
                    zIndex: 2
                  }} />

                  {/* Large Hero Image for Team Member */}
                  <div className="team-card-img" style={{ width: '100%', height: '320px', overflow: 'hidden', position: 'relative' }}>
                    {member.imageUrl ? (
                      <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url(${member.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%', backgroundColor: 'var(--color-bg-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-primary)', fontSize: '4rem', fontWeight: '800'
                      }}>
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="team-card-content" style={{ padding: '2.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ paddingRight: '1rem' }}>
                        <h3 className="team-card-name" style={{ color: 'var(--color-primary-dark)', fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.4rem', letterSpacing: '-0.3px' }}>{member.name}</h3>
                        <p style={{ color: '#8b5cf6', fontSize: '0.95rem', fontWeight: '600', marginBottom: '1.2rem', letterSpacing: '0.5px' }}>{member.role}</p>
                      </div>
                      {member.linkedIn && (
                        <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', padding: '0.4rem', background: 'rgba(0,119,181,0.1)', borderRadius: '10px' }} className="hover:scale-110" title="LinkedIn Profile">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {member.bio ? (
                      <p className="team-card-bio" style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-line', flex: 1 }}>
                        {member.bio}
                      </p>
                    ) : (
                      <p className="team-card-bio" style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontStyle: 'italic', flex: 1 }}>No bio provided.</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Team;