import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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
      await axios.post('/api/enquiries', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('success');
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
    <div className="contact-page animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="section-title">Business Enquiry</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Get in touch with our experts to discuss how we can help your business.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem' }}>
          
          {/* Contact Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem', borderRadius: '8px' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Quick Contact</h3>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <Mail color="var(--color-secondary)" />
              <div>
                <p style={{ fontWeight: 'bold' }}>Email</p>
                <p style={{ opacity: '0.8' }}>info@tiis.co.in</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <Phone color="var(--color-secondary)" />
              <div>
                <p style={{ fontWeight: 'bold' }}>Phone</p>
                <p style={{ opacity: '0.8' }}>+91 XXX XXX XXXX</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <MapPin color="var(--color-secondary)" />
              <div>
                <p style={{ fontWeight: 'bold' }}>Office Location</p>
                <p style={{ opacity: '0.8' }}>107, Malibu Towne, Sector 47<br/>Gurugram, Haryana 122018</p>
              </div>
            </div>

            {/* Premium Map Embed */}
            <div style={{ position: 'relative', marginTop: '0.5rem' }}>
              {/* Glow ring */}
              <div style={{
                position: 'absolute', inset: '-3px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--color-secondary), rgba(255,255,255,0.15), var(--color-secondary))',
                backgroundSize: '200% 200%',
                animation: 'mapGlow 3s ease infinite',
                zIndex: 0,
              }} />

              {/* Map container */}
              <div style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                zIndex: 1,
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
              }}>
                {/* Location label bar */}
                <div style={{
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.5rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  {/* Pulsing dot */}
                  <span style={{
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-secondary)',
                    display: 'inline-block',
                    boxShadow: '0 0 0 0 var(--color-secondary)',
                    animation: 'mapPulse 1.8s ease infinite',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: '0.03em' }}>
                    TIIS · Malibu Towne, Gurugram
                  </span>
                </div>

                <iframe
                  title="TIIS Office Location"
                  src="https://maps.google.com/maps?q=107,+Malibu+Towne,+Sector+47,+Gurugram,+Haryana+122018&output=embed&z=16"
                  width="100%"
                  height="200"
                  style={{ border: 'none', display: 'block', filter: 'saturate(1.1) brightness(0.92)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Get Directions button */}
                <a
                  href="https://maps.app.goo.gl/WvBKLRN4BcsXSwyR6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    background: 'linear-gradient(135deg, var(--color-secondary) 0%, #f59e0b 100%)',
                    color: '#0a0a0a',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    padding: '0.6rem 1rem',
                    textDecoration: 'none',
                    transition: 'filter 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)';  e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  GET DIRECTIONS
                </a>
              </div>
            </div>

            <style>{`
              @keyframes mapGlow {
                0%   { background-position: 0% 50%; }
                50%  { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes mapPulse {
                0%   { box-shadow: 0 0 0 0 var(--color-secondary); }
                70%  { box-shadow: 0 0 0 6px rgba(245,158,11,0); }
                100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
              }
            `}</style>
          </motion.div>

          {/* Business Query Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
          >
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Enquiry Received!</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>We have sent an auto email acknowledgment. Our team will contact you shortly.</p>
                <button className="btn-secondary" style={{ marginTop: '2rem' }} onClick={() => setStatus('')}>Send Another Query</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Company Name *</label>
                    <input name="companyName" value={formData.companyName} onChange={handleChange} required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Contact Person *</label>
                    <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Designation</label>
                    <input name="designation" value={formData.designation} onChange={handleChange} type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email *</label>
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone *</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Service Required *</label>
                    <select name="serviceRequired" value={formData.serviceRequired} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      <option value="">Select a service...</option>
                      <option value="business">Business Solutions</option>
                      <option value="talent">Talent Hiring</option>
                      <option value="capacity">Capacity Building</option>
                      <option value="content">Content Development</option>
                      <option value="compliance">Compliance Services</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Brief Requirement *</label>
                  <textarea name="briefRequirement" value={formData.briefRequirement} onChange={handleChange} required rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}></textarea>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Attachment (Optional)</label>
                  <input name="attachment" onChange={handleChange} type="file" style={{ border: '1px dashed #ccc', padding: '1rem', width: '100%', borderRadius: '4px', backgroundColor: '#fafafa' }} />
                </div>
                {status === 'error' && <p style={{ color: 'red', marginBottom: '1rem' }}>Failed to submit enquiry. Please try again.</p>}
                <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
