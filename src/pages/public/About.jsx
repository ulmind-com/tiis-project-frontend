import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get('/api/team');
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
    <div className="about-page animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="container">
        <h1 className="section-title">About Us</h1>
        
        <div style={{ display: 'grid', md: '1fr 1fr', gap: '4rem', marginTop: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: '1 / -1', marginBottom: '2rem' }}
          >
            <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>Thoughtful Institute of Innovative Solutions</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
              We at TIIS offer customized-based solutions that help increase productivity, performance, and profitability. We believe in customizing and developing specific solutions through a collaborative process designed to identify a client’s needs. Our approach is based on experiential learning combined with the technology and strong faculty of experts and competent solutions providers.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
              We aim to develop a partnership with our clients by collaborating, cooperating, and coordinating. By improving practices in people and organization development, we ensure that work benefits individuals, businesses, economies, and society at large.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
           >
             <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Vision</h3>
             <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>To become one of the top solution provider company in India by 2030, leading in the fields of Human happiness development and develop the strength of human capital so that overall and sustainable development is possible.</p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
           >
             <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Mission</h3>
             <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>To prepare and empower Solutionaries who is the business driver and implement equitable and sustainable solutions for India and the world.</p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.4 }}
             style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)', gridColumn: '1 / -1' }}
           >
             <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Philosophy</h3>
             <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>To cope, this world needs research-based customized solutions to maintain the productivity and mental well-being of our human capital to achieve the desired outcome. TIIS proposed collaborative, multidisciplinary, and innovative solutions that are based on research and supported by modern technology. TIIS firmly believes that our talent can work across sectors and apply their design thinking skills to find practical solutions to some of the most critical problems of today without compromising their happiness.</p>
             <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Our company is committed to changing the discourse in talent management by making it multidisciplinary and industry-relevant and with a focus on sustainability and design thinking. Through its unique pedagogy, each talent can be developed to become a solutionary—a revolutionary thinker with a solution-oriented mindset—and encouraged to chart her/his happiness.</p>
           </motion.div>
        </div>

        {/* Why Us Section */}
        <section style={{ marginTop: '5rem', padding: '5rem 0', backgroundColor: '#f8fafc', borderRadius: '12px', margin: '5rem -1rem 0 -1rem' }}>
          <div className="container" style={{ padding: '0 1rem' }}>
            <h2 className="section-title">Why Choose Us</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {[
                { title: "Cost-Effective & Efficient", desc: "Our cost-effective HR solutions help enterprises save on valuable resources, such as time and money, while also meeting their needs, time frames, and quality expectations." },
                { title: "Long-Term Partnerships", desc: "Our goal is to be viewed as a true partner to our clients rather than just a service provider. As a long-term strategic business partner. This ensures better client service, communication, and engagement." },
                { title: "Aftersales Service", desc: "After the successful completion of each project, our job is not done. We provide after-sales service to maintain our solutions and ensure they continue to work effectively and efficiently for our partners." },
                { title: "Global Experience", desc: "Our team of diversified experience professionals helping businesses across the globe." },
                { title: "In-Project Support", desc: "Throughout the progress of each project, we are available 24/7 to provide online support." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--color-secondary)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <CheckCircle color="var(--color-secondary)" size={24} />
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>{feature.title}</h3>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: '5rem', marginBottom: '4rem' }}>
          <h2 style={{ color: 'var(--color-primary)', textAlign: 'center', marginBottom: '3rem' }}>Our Core Team</h2>
          {loading ? (
             <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading team...</div>
          ) : team.length === 0 ? (
             <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No team members added yet.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {team.map((member, index) => (
                <motion.div 
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left', 
                    backgroundColor: 'white', 
                    borderRadius: '4px', // Sharper corners like reference
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                    border: '1px solid #e2e8f0',
                    borderTop: '4px solid var(--color-secondary)', // Top accent border
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                >
                  {/* Top Section: Avatar + Name/Role */}
                  <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {member.imageUrl ? (
                      <div style={{ 
                        width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                        border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        backgroundImage: `url(${member.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'
                      }}></div>
                    ) : (
                      <div style={{ 
                        width: '48px', height: '48px', backgroundColor: '#e2e8f0', borderRadius: '50%', flexShrink: 0,
                        border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}></div>
                    )}
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', margin: '0 0 0.2rem 0', fontWeight: 'bold' }}>{member.name}</h3>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>{member.role}</p>
                    </div>
                    {member.linkedIn && (
                      <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="LinkedIn Profile">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  {/* Middle Section: Bio/Content */}
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', flex: 1 }}>
                    {member.bio ? (
                      <>
                        <h4 style={{ color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: '600' }}>About</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                          {member.bio}
                        </p>
                      </>
                    ) : (
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>No bio provided.</p>
                    )}
                  </div>

                  {/* Bottom Footer Section (like the icons in the reference) */}
                  <div style={{ 
                    borderTop: '1px solid #f1f5f9', 
                    backgroundColor: '#fafafa', 
                    padding: '0.75rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '500' }}>TIIS Team</span>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default About;
