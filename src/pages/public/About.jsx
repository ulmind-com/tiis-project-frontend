import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

        <section style={{ marginTop: '5rem' }}>
          <h2 style={{ color: 'var(--color-primary)', textAlign: 'center', marginBottom: '3rem' }}>Our Core Team</h2>
          {loading ? (
             <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading team...</div>
          ) : team.length === 0 ? (
             <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No team members added yet.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {team.map((member, index) => (
                <motion.div 
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ textAlign: 'center', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: '#e2e8f0', 
                    borderRadius: '50%', 
                    margin: '0 auto 1.5rem' 
                  }}></div>
                  <h3 style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                  <p style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1rem' }}>{member.role}</p>
                  {member.bio && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{member.bio}</p>}
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
