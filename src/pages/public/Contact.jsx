import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    companyName: '', contactPerson: '', designation: '', 
    email: '', phone: '', serviceRequired: '', briefRequirement: '', attachment: null
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
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
                <p style={{ opacity: '0.8' }}>TIIS Corporate Hub<br/>Bangalore, India</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div style={{ 
              width: '100%', 
              height: '150px', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed rgba(255,255,255,0.3)'
            }}>
              Map View
            </div>
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
                    <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Contact Person *</label>
                    <input required type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Designation</label>
                    <input type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                   <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email *</label>
                    <input required type="email" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone *</label>
                    <input required type="tel" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Service Required *</label>
                    <select required style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
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
                  <textarea required rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}></textarea>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Attachment (Optional)</label>
                  <input type="file" style={{ border: '1px dashed #ccc', padding: '1rem', width: '100%', borderRadius: '4px', backgroundColor: '#fafafa' }} />
                </div>

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
