import React, { useState, useEffect } from 'react';
import { Briefcase, Users, Building2, FileText, ShieldCheck, CheckCircle, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    id: 'business-solutions',
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #01324e 0%, #024b76 100%)',
    accentColor: '#0ea5e9',
    title: 'Business Solutions',
    tagline: 'Strategy That Scales',
    desc: 'We partner with leaders to streamline operations, design resilient organisational structures, and develop strategic roadmaps that unlock sustainable performance improvements.',
    items: [
      'Business Process Consulting',
      'Organisation Structuring',
      'Strategic Advisory',
    ],
  },
  {
    id: 'talent-hiring',
    icon: Users,
    gradient: 'linear-gradient(135deg, #7c1015 0%, #b12023 100%)',
    accentColor: '#f43f5e',
    title: 'Talent Hiring & Advisory',
    tagline: 'Right People, Right Roles',
    desc: "Our talent practice designs end-to-end talent management ecosystems and delivers both permanent and flexible workforce solutions tailored to your organisation's evolving needs.",
    items: [
      'Design & Implementation of Talent Management System',
      'Permanent Staffing',
      'Temp Staffing',
    ],
  },
  {
    id: 'capacity-building',
    icon: Building2,
    gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
    accentColor: '#10b981',
    title: 'Capacity Building',
    tagline: 'Grow Leaders From Within',
    desc: 'From frontline managers to C-suite executives, our experiential training programs are crafted to sharpen leadership acumen, drive sales performance, and build a culture of compliance.',
    items: [
      'Managerial Training',
      'Leadership Training',
      'Sales Training',
      'POSH Training',
    ],
  },
  {
    id: 'content-development',
    icon: FileText,
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
    accentColor: '#a78bfa',
    title: 'Content Development',
    tagline: 'Words That Work',
    desc: 'From corporate playbooks to academic curricula, we translate complex ideas into clear, compelling content that empowers teams, drives compliance, and accelerates learning.',
    items: [
      'Corporate Business Content',
      'Academic Content',
      'SOP Documentation',
      'HR Playbook',
      'Policy Drafting',
      'Training Content',
    ],
  },
  {
    id: 'compliance-services',
    icon: ShieldCheck,
    gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
    accentColor: '#fbbf24',
    title: 'Compliance Services',
    tagline: 'Stay Protected, Stay Compliant',
    desc: 'We navigate the complex regulatory landscape on your behalf — designing robust compliance frameworks and providing ongoing support across labour law, payroll, and statutory filings.',
    items: [
      'Design & Compliance System',
      'Labour Law Compliance',
      'Payroll Compliance',
      'PF, ESIC & TDS Support',
      'Documentation & Audit Assistance',
    ],
  },
];

const ServiceModal = ({ service, onClose }) => {
  const Icon = service?.icon;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [service]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: 'white', borderRadius: '16px',
            maxWidth: '560px', width: '100%',
            boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Modal Header */}
          <div style={{ background: service.gradient, padding: '2rem 2rem 1.5rem', position: 'relative' }}>
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'rgba(255,255,255,0.2)', border: 'none',
                borderRadius: '50%', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white',
              }}
            >
              <X size={18} />
            </button>
            <Icon size={40} color="white" style={{ marginBottom: '1rem', opacity: 0.9 }} />
            <h2 style={{ color: 'white', fontSize: '1.6rem', marginBottom: '0.4rem' }}>{service.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>{service.tagline}</p>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '1.75rem' }}>{service.desc}</p>
            <h4 style={{ color: '#01324e', marginBottom: '1rem', fontWeight: '700' }}>What We Offer</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {service.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={18} color={service.accentColor} style={{ flexShrink: 0 }} />
                  <span style={{ color: '#374151', fontWeight: '500' }}>{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              onClick={onClose}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: service.gradient, color: 'white',
                padding: '0.75rem 1.75rem', borderRadius: '8px',
                fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem',
              }}
            >
              Get a Quote <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const cardsSectionRef = React.useRef(null);

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => setSelectedService(null);

  return (
    <div className="animate-fade-in">
      {/* Page Hero */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #01324e 0%, #012236 60%, #1a0a2e 100%)',
        padding: '6rem 2rem 5rem', textAlign: 'center', color: 'white',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'rgba(177,32,35,0.12)', filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(14,165,233,0.1)', filter: 'blur(50px)',
        }} />

        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span style={{
            display: 'inline-block', backgroundColor: 'rgba(177,32,35,0.25)',
            color: '#f87171', padding: '0.4rem 1.25rem', borderRadius: '999px',
            fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.05em',
            marginBottom: '1.25rem', textTransform: 'uppercase',
          }}>
            What We Do
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            Our Services
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7' }}>
            A comprehensive suite of consulting, talent, and capacity-building solutions — crafted to drive measurable results for your organisation.
          </p>
        </motion.div>
      </section>

      {/* Cards Grid */}
      <section ref={cardsSectionRef} style={{ padding: '5rem 2rem', backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  style={{
                    backgroundColor: 'white', borderRadius: '16px',
                    overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    display: 'flex', flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s',
                  }}
                  onClick={() => openModal(service)}
                >
                  {/* Card Top Banner */}
                  <div style={{
                    background: service.gradient,
                    padding: '2rem 2rem 1.5rem',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Background pattern */}
                    <div style={{
                      position: 'absolute', top: '-20px', right: '-20px',
                      width: '120px', height: '120px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.07)',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: '-30px', right: '30px',
                      width: '80px', height: '80px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.05)',
                    }} />

                    <div style={{
                      display: 'inline-flex', padding: '0.75rem',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '12px', marginBottom: '1.25rem',
                    }}>
                      <Icon size={28} color="white" />
                    </div>
                    <h3 style={{ color: 'white', fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                      {service.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: '500' }}>
                      {service.tagline}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                      {service.desc}
                    </p>

                    {/* Sub-services list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem', flex: 1 }}>
                      {service.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            backgroundColor: service.accentColor, flexShrink: 0,
                          }} />
                          <span style={{ color: '#374151', fontSize: '0.9rem', fontWeight: '500' }}>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <button
                      onClick={e => { e.stopPropagation(); openModal(service); }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        background: service.gradient, color: 'white',
                        border: 'none', borderRadius: '8px',
                        padding: '0.8rem 1.5rem', fontWeight: '600',
                        fontSize: '0.95rem', cursor: 'pointer',
                        width: '100%', transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #01324e 0%, #b12023 100%)',
        padding: '5rem 2rem', textAlign: 'center', color: 'white',
      }}>
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
            Partner with TIIS and let our experts craft a customised solution uniquely designed for your challenges and goals.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'white', color: '#01324e',
              padding: '0.9rem 2rem', borderRadius: '8px',
              fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
            }}>
              Get a Free Consultation <ArrowRight size={18} />
            </Link>
            <Link to="/careers" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'transparent', color: 'white',
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '0.9rem 2rem', borderRadius: '8px',
              fontWeight: '600', fontSize: '1rem', textDecoration: 'none',
            }}>
              Join Our Team
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Detail Modal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={closeModal} />
      )}
    </div>
  );
};

export default Services;
