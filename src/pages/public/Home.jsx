import React, { useState, useEffect } from 'react';
import { Building2, Users, Briefcase, FileText, Layout, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [news, setNews] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, portRes] = await Promise.all([
          axios.get('/api/news'),
          axios.get('/api/portfolio')
        ]);
        setNews(newsRes.data.slice(0, 3)); // Show top 3 news
        setPortfolio(portRes.data.slice(0, 3)); // Show top 3 portfolio
      } catch (error) {
        console.error('Error fetching dynamic content:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Banner Section */}
      <section className="hero-section" style={{ 
        position: 'relative',
        color: 'white',
        padding: '8rem 2rem',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(1, 50, 78, 0.8), rgba(1, 50, 78, 0.9)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1
        }}></div>

        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Elevate Your Organization</h1>
          <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
            Thoughtful Institute of Innovative Solutions (TIIS) is your premium partner in strategic consulting, talent acquisition, and capacity building.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/services" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Explore Our Solutions</Link>
            <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'transparent', border: '2px solid white' }}>Partner With Us</Link>
          </div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="services-overview" style={{ padding: '5rem 0' }}>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {[
              { icon: <Briefcase size={40} />, title: "Business Solutions", desc: "Strategic advisory and process consulting." },
              { icon: <Users size={40} />, title: "Talent Hiring", desc: "Permanent and temp staffing solutions." },
              { icon: <Building2 size={40} />, title: "Capacity Building", desc: "Leadership and managerial training." },
              { icon: <FileText size={40} />, title: "Content Development", desc: "Corporate and academic content." },
              { icon: <Layout size={40} />, title: "Compliance Services", desc: "Labour law and payroll compliance." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>{service.title}</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
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

      {/* Dynamic Portfolio Section */}
      {portfolio.length > 0 && (
        <section style={{ padding: '5rem 0' }}>
          <div className="container">
            <h2 className="section-title">Our Recent Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {portfolio.map((project, i) => (
                <motion.div 
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}
                >
                  <div style={{ height: '200px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Briefcase size={48} opacity={0.5} />
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '1.3rem' }}>{project.title}</h3>
                    <p style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>Client: {project.clientName || 'Confidential'}</p>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic News Section */}
      {news.length > 0 && (
        <section style={{ padding: '5rem 0', backgroundColor: '#f1f5f9' }}>
          <div className="container">
            <h2 className="section-title">Our Latest News</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {news.map((item, i) => (
                <motion.div 
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}
                >
                  <span style={{ color: 'var(--color-secondary)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', flex: '1' }}>
                    {item.content.substring(0, 150)}...
                  </p>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', background: 'none', border: 'none', fontWeight: 'bold', padding: 0, cursor: 'pointer', alignSelf: 'flex-start' }}>
                    Read Full Story <ArrowRight size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="industries-section" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '5rem 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Industries We Serve</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            {['Healthcare', 'Manufacturing', 'FMCG', 'Infrastructure', 'Hospitality', 'IT'].map(industry => (
               <span key={industry} style={{
                 padding: '0.75rem 1.5rem',
                 backgroundColor: 'rgba(255,255,255,0.1)',
                 borderRadius: '20px',
                 fontWeight: '500'
               }}>
                 {industry}
               </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
