import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Briefcase, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ location: '', industry: '', experience: '' });
  
  // Application Form State
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', cv: null });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/api/jobs');
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    // Create FormData 
    const data = new FormData();
    data.append('job', selectedJob._id);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    if (formData.cv) {
        data.append('cv', formData.cv);
    }

    try {
      await axios.post('/api/applications', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', cv: null });
      setTimeout(() => setSelectedJob(null), 3000);
    } catch (error) {
       setSubmitStatus('error');
    }
  };

  return (
    <div className="careers-page animate-fade-in" style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
      {/* Banner */}
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 2rem', textAlign: 'center', marginBottom: '3rem' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Careers at TIIS</h1>
          <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>Join our team of experts and build the future of consulting.</p>
        </motion.div>
      </section>

      <div className="container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Sidebar Filters */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: '0 0 250px', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
            <Filter size={20} /> Filters
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Location</label>
            <select style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
              <option value="">All Locations</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Industry</label>
            <select style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
              <option value="">All Industries</option>
              <option value="consulting">Consulting</option>
              <option value="legal">Legal/Compliance</option>
            </select>
          </div>
        </motion.aside>

        {/* Job Listings / App Form */}
        <main style={{ flex: '1' }}>
          
          {!selectedJob ? (
            <>
              {loading ? (
                 <div style={{ textAlign: 'center', padding: '3rem' }}>Loading active jobs...</div>
              ) : (
                jobs.map((job, index) => (
                  <motion.div 
                    key={job._id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    style={{ 
                      backgroundColor: 'white', 
                      padding: '2rem', 
                      borderRadius: '8px', 
                      boxShadow: 'var(--shadow-sm)',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{job.title}</h3>
                      <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={16}/> {job.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Briefcase size={16}/> {job.experience}</span>
                      </div>
                      <p style={{ color: '#555' }}>{job.description}</p>
                    </div>
                    <button className="btn-primary" onClick={() => setSelectedJob(job)}>Apply Now</button>
                  </motion.div>
                ))
              )}
            </>
          ) : (
            
            /* Application Form */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
            >
              <button onClick={() => setSelectedJob(null)} style={{ background: 'none', color: 'var(--color-primary)', marginBottom: '2rem', fontWeight: 'bold' }}>
                &larr; Back to Jobs
              </button>
              <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Apply for {selectedJob.title}</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Please fill out the form and upload your CV (PDF/DOC).</p>

              {submitStatus === 'success' ? (
                <div style={{ padding: '2rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '4px', textAlign: 'center' }}>
                  Application submitted successfully! Check your email for acknowledgment.
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Upload CV *</label>
                    <input required type="file" accept=".pdf,.doc,.docx" onChange={e => setFormData({...formData, cv: e.target.files[0]})} style={{ width: '100%', padding: '0.5rem', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#fafafa' }} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={submitStatus === 'submitting'}>
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Careers;
