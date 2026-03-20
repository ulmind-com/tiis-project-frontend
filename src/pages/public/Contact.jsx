import React, { useState } from 'react';
import api from '../../api';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, Building2, User, UserCircle, Briefcase, FileText, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { linkContactInfo } from '../../utils/visitorTracker';

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } }
});

const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } }
});

const InfoCard = ({ icon: Icon, title, content, delay }) => (
  <motion.div
    variants={fadeUp(delay)}
    whileHover={{ y: -5, scale: 1.02 }}
    style={{
      backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color-strong)',
      padding: '1.75rem', borderRadius: '20px', display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)', cursor: 'default'
    }}
  >
    <div style={{
      width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(177,32,35,0.1) 0%, rgba(1,50,78,0.1) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      border: '1px solid rgba(177,32,35,0.2)'
    }}>
      <Icon size={24} color="#b12023" />
    </div>
    <div>
      <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-text-heading)', marginBottom: '0.4rem' }}>{title}</h4>
      <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.5', fontSize: '0.95rem' }}>{content}</div>
    </div>
  </motion.div>
);

const FormInput = ({ label, icon: Icon, isSelect, isTextarea, options, ...props }) => {
  const [focused, setFocused] = useState(false);
  
  const baseStyle = {
    width: '100%', padding: '0.85rem 1rem', paddingLeft: Icon ? '2.75rem' : '1rem',
    borderRadius: '12px', border: `1px solid ${focused ? '#0284c7' : 'var(--border-color-strong)'}`, 
    outline: 'none', backgroundColor: 'var(--color-bg-light)', 
    color: 'var(--color-text-main)', fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    boxShadow: focused ? '0 0 0 4px rgba(2,132,199,0.1)' : 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-heading)', marginLeft: '0.2rem' }}>
        {label} {props.required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        {Icon && <Icon size={18} style={{ position: 'absolute', left: '1rem', top: isTextarea ? '1.25rem' : '50%', transform: isTextarea ? 'none' : 'translateY(-50%)', color: focused ? '#0284c7' : 'var(--color-text-muted)', transition: 'color 0.3s ease' }} />}
        
        {isSelect ? (
          <select {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={baseStyle}>
             <option value="">Select an option...</option>
             {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        ) : isTextarea ? (
          <textarea {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{...baseStyle, resize: 'vertical'}} />
        ) : (
          <input {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={baseStyle} />
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    companyName: '', contactPerson: '', designation: '', 
    email: '', phone: '', serviceRequired: '', briefRequirement: '', attachment: null
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      await api.post('/api/enquiries', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('success');
      // Link the contact info to the visitor profile for admin reach-out
      linkContactInfo({
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
      });
      setFormData({
        companyName: '', contactPerson: '', designation: '', 
        email: '', phone: '', serviceRequired: '', briefRequirement: '', attachment: null
      });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setStatus('error');
    }
  };

  return (
    <div className="contact-page animate-fade-in" style={{ backgroundColor: 'var(--color-page-bg)', minHeight: '100vh', paddingBottom: '6rem', overflowX: 'hidden' }}>
      
      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          .contact-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center !important; }
          .contact-hero-content { text-align: center !important; align-items: center !important; }
          .contact-hero-content div { margin: 0 auto 1.5rem !important; }
          .contact-hero-content h1 { text-align: center !important; font-size: 2.5rem !important; }
          .contact-hero-content p { text-align: center !important; margin: 0 auto !important; }
          .contact-hero { padding: 6rem 1.5rem 4rem !important; }
        }
      `}</style>
      
      {/* ── Hero Section ── */}
      <section className="contact-hero" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-hero-grad)', padding: '7rem 2rem 5rem', color: 'white' }}>
        {/* Animated Blobs */}
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(177,32,35,0.15)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(14,165,233,0.14)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div className="container contact-hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* Text Content */}
          <div className="contact-hero-content" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.span initial={{ opacity: 0, y: -16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#f87171', padding: '0.4rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.1)' }}>
              Get in Touch
            </motion.span>
            
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1.25rem', lineHeight: '1.1', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
              Let's Build Something <br />
              <span style={{ color: '#f87171' }}>Extraordinary.</span>
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ height: '3px', width: '60px', background: 'linear-gradient(90deg, #b12023, #f43f5e)', borderRadius: '2px', margin: '0 0 1.5rem 0', originX: 0 }} />

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} style={{ fontSize: '1.2rem', maxWidth: '650px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', margin: 0 }}>
              Partner with our experts to architect the future of your organization. Drop us a line and let's start the conversation.
            </motion.p>
          </div>

          {/* Premium Illustration / Image Area */}
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
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="TIIS Global Corporate"
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
                position: 'absolute', top: '-5%', right: '-5%',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)',
                zIndex: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
            >
              <Send size={28} color="#0ea5e9" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── Main Content Area ── */}
      <section className="container" style={{ position: 'relative', zIndex: 1, marginTop: '-2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          {/* Sidebar Area */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.15, 0.2)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <InfoCard icon={Mail} title="Email Us" content={<><a href="mailto:info@tiis.co.in" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>info@tiis.co.in</a><br />Response within 24 hours</>} delay={0} />
            <InfoCard icon={Phone} title="Call Us" content={<><a href="tel:+91XXXXXXXXXX" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>+91 XXX XXX XXXX</a><br />Mon-Fri, 9am - 6pm IST</>} delay={0.1} />

            {/* Premium Map Embed */}
            <motion.div variants={fadeUp(0.3)} style={{ position: 'relative', marginTop: '1rem' }}>
              <div style={{ position: 'absolute', inset: '-3px', borderRadius: '26px', background: 'linear-gradient(135deg, rgba(177,32,35,0.4), rgba(2,132,199,0.4))', zIndex: 0, filter: 'blur(8px)' }} />
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', zIndex: 1, border: '1px solid var(--border-color-strong)', backgroundColor: 'var(--color-card-bg)', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.15)' }}>
                <div style={{ background: 'var(--color-bg-light)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-color-strong)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 0 4px rgba(16,185,129,0.2)' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-heading)', fontWeight: 700, letterSpacing: '0.03em' }}>TIIS Headquarters</span>
                </div>
                <iframe title="TIIS Office Location" src="https://maps.google.com/maps?q=107,+Malibu+Towne,+Sector+47,+Gurugram,+Haryana+122018&output=embed&z=16" width="100%" height="220" style={{ border: 'none', display: 'block', filter: 'grayscale(0.2) contrast(1.1)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div style={{ padding: '0.75rem' }}>
                  <a href="https://maps.app.goo.gl/WvBKLRN4BcsXSwyR6" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--color-card-bg)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.3)', fontWeight: 700, fontSize: '0.85rem', padding: '0.75rem', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#0284c7'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-card-bg)'; e.currentTarget.style.color = '#0284c7'; }}>
                    <MapPin size={16} /> Get Directions
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Area */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ backgroundColor: 'var(--color-card-bg)', padding: 'clamp(2rem, 5vw, 3.5rem)', borderRadius: '32px', border: '1px solid var(--border-color-strong)', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.08)' }}>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-text-heading)', marginBottom: '0.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Send color="#b12023" size={28} /> Send a Message
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>Fill out the form below securely. We ensure absolute confidentiality for all business enquiries.</p>
            </div>

            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <CheckCircle size={70} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ color: 'var(--color-text-heading)', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>Enquiry Scheduled!</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>We've sent a priority acknowledgment to your email. Our strategy team will be in touch shortly.</p>
                <button onClick={() => setStatus('')} style={{ background: '#0284c7', color: 'white', border: 'none', borderRadius: '50px', padding: '0.85rem 2rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(2,132,199,0.3)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  Submit Another Client
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Company Name" icon={Building2} name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Acme Consulting" />
                  <FormInput label="Contact Person" icon={User} name="contactPerson" value={formData.contactPerson} onChange={handleChange} required placeholder="John Doe" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Designation" icon={Briefcase} name="designation" value={formData.designation} onChange={handleChange} placeholder="CEO / Director" />
                  <FormInput label="Email Address" icon={Mail} name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@acme.com" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Phone Number" icon={Phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 8900" />
                  <FormInput label="Service Required" icon={FileText} name="serviceRequired" value={formData.serviceRequired} onChange={handleChange} required isSelect options={[
                    { value: "business", label: "Business Solutions" },
                    { value: "talent", label: "Talent Hiring" },
                    { value: "capacity", label: "Capacity Building" },
                    { value: "content", label: "Content Development" },
                    { value: "compliance", label: "Compliance Services" }
                  ]} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Brief Requirement *</label>
                  <textarea name="briefRequirement" value={formData.briefRequirement} onChange={handleChange} required rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color-strong)', borderRadius: '4px', backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)', resize: 'vertical' }}></textarea>
                </div>
                <div style={{ padding: '0.5rem 0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--color-bg-light)', border: '1px dashed var(--border-color-strong)', padding: '1.25rem', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#0284c7'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color-strong)'}>
                    <div style={{ background: 'rgba(2,132,199,0.1)', padding: '0.75rem', borderRadius: '12px', color: '#0284c7' }}>
                      <Paperclip size={20} />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontWeight: '700', color: 'var(--color-text-heading)', fontSize: '0.95rem' }}>Attach Proposal / NDA (Optional)</span>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{formData.attachment ? formData.attachment.name : 'PDF, DOCX up to 10MB'}</span>
                    </div>
                    <input name="attachment" onChange={handleChange} type="file" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </label>
                </div>

                {status === 'error' && (
                  <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', color: '#ef4444', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Failed to submit enquiry. Please try again.
                  </div>
                )}

                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  type="submit" disabled={status === 'submitting'}
                  style={{
                    marginTop: '1rem', background: 'linear-gradient(135deg, #01324e 0%, #024b76 100%)',
                    color: 'white', border: 'none', borderRadius: '50px', padding: '1.15rem 2rem',
                    fontWeight: '700', fontSize: '1.05rem', cursor: status === 'submitting' ? 'wait' : 'pointer',
                    boxShadow: '0 10px 25px -5px rgba(1,50,78,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', opacity: status === 'submitting' ? 0.7 : 1,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(1,50,78,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(1,50,78,0.3)'}
                >
                  {status === 'submitting' ? 'Processing...' : (
                    <>Submit Enquiry <ArrowRight size={18} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
          
        </div>
      </section>
    </div>
  );
};

export default Contact;
