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
          .team-hero-title { font-size: 2.5rem !important; margin-bottom: 1rem !important; line-height: 1.2 !important; }
          .team-hero-subtitle { font-size: 1rem !important; line-height: 1.6 !important; padding: 0 0.5rem; }

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
        textAlign: 'center',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 70%)', filter: 'blur(50px)', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}
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
            Our Core <span style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Team</span>
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
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            Meet the experienced leaders and solutionaries driving innovation, growth, and sustainable solutions at Capsitech.
          </motion.p>
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
                  whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
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
                    overflow: 'hidden'
                  }}
                  className="team-card group"
                >
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