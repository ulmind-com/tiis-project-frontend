import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Loader2, Briefcase } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', location: '', industry: '', experience: '', isActive: true, image: null
  });

  const context = useOutletContext();
  const isDark = context?.isDark || false;

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/jobs?admin=true', getAuthHeaders());
      setJobs(data);
    } catch (error) {
       console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setIsEditing(true);
    setCurrentJobId(job._id);
    setFormData({
      title: job.title, description: job.description, location: job.location, 
      industry: job.industry, experience: job.experience, isActive: job.isActive, image: null
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this job listing?',
      text: "This action is permanent and cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: isDark ? '#475569' : '#94a3b8',
      background: isDark ? '#1e293b' : '#fff',
      color: isDark ? '#fff' : '#000',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/jobs/${id}`, getAuthHeaders());
        fetchJobs();
        Swal.fire({ title: 'Deleted!', text: 'The job listing has been removed.', icon: 'success', background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#000' });
      } catch (err) {
        Swal.fire('Error!', err.response?.data?.message || 'Failed to delete job.', 'error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      
      const config = {
        headers: {
          ...getAuthHeaders().headers,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (isEditing) {
        await axios.put(`/api/jobs/${currentJobId}`, data, config);
        Swal.fire({ title: 'Updated!', text: 'Job listing updated', icon: 'success', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
      } else {
        await axios.post('/api/jobs', data, config);
        Swal.fire({ title: 'Created!', text: 'Job listing published', icon: 'success', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
      }
      setFormData({ title: '', description: '', location: '', industry: '', experience: '', isActive: true, image: null });
      setIsEditing(false);
      fetchJobs();
    } catch (error) {
      Swal.fire('Error!', 'Failed to save job.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const theme = {
    cardBg: isDark ? '#0f172a' : '#ffffff',
    textMain: isDark ? '#f8fafc' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#1e293b' : '#e2e8f0',
    inputBg: isDark ? '#1e293b' : '#ffffff',
    inputBorder: isDark ? '#334155' : '#cbd5e1',
    tableHeader: isDark ? '#1e293b' : '#f8fafc',
    rowHover: isDark ? '#1e293b' : '#f1f5f9'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', paddingBottom: '2rem' }}>
      
      {/* Job List */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={{ flex: '1 1 60%', backgroundColor: theme.cardBg, color: theme.textMain, padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: `1px solid ${theme.border}`, overflowX: 'auto', transition: 'all 0.3s' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: `1px solid ${theme.border}`, paddingBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 600 }}>Active Listings</h2>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0', color: theme.textMuted }}>
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ backgroundColor: theme.tableHeader, textAlign: 'left', color: theme.textMuted, transition: 'background-color 0.3s' }}>
                <th style={{ padding: '1rem', borderBottom: `1px solid ${theme.border}`, fontWeight: 500, borderRadius: '8px 0 0 0' }}>Title</th>
                <th style={{ padding: '1rem', borderBottom: `1px solid ${theme.border}`, fontWeight: 500 }}>Location</th>
                <th style={{ padding: '1rem', borderBottom: `1px solid ${theme.border}`, fontWeight: 500 }}>Status</th>
                <th style={{ padding: '1rem', borderBottom: `1px solid ${theme.border}`, fontWeight: 500, borderRadius: '0 8px 0 0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <motion.tr 
                  key={job._id} 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: theme.rowHover }}
                  style={{ borderBottom: `1px solid ${theme.border}`, transition: 'background-color 0.2s' }}
                >
                  <td style={{ padding: '1rem', fontWeight: '600', color: theme.textMain }}>{job.title}</td>
                  <td style={{ padding: '1rem', color: theme.textMuted }}>{job.location}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                        padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                        backgroundColor: job.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(100,116,139,0.1)',
                        color: job.isActive ? (isDark ? '#4ade80' : '#166534') : theme.textMuted,
                        border: `1px solid ${job.isActive ? 'rgba(34,197,94,0.2)' : 'rgba(100,116,139,0.2)'}`
                    }}>
                      {job.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button onClick={() => handleEdit(job)} style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1} title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(job._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: theme.textMuted }}>No active job listings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Add/Edit Form */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} style={{ flex: '1 1 35%', backgroundColor: theme.cardBg, color: theme.textMain, padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: `1px solid ${theme.border}`, alignSelf: 'flex-start', transition: 'all 0.3s' }}>
        <h2 style={{ marginBottom: '1.75rem', fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: isEditing ? '#3b82f6' : theme.textMain }}>
          {isEditing ? <><Edit2 size={20} /> Edit Job</> : <><Plus size={20} /> Post New Job</>}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: theme.textMuted }}>Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} 
              style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${theme.inputBorder}`, backgroundColor: theme.inputBg, color: theme.textMain, borderRadius: '8px', outline: 'none', transition: 'all 0.2s' }} 
              onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = theme.inputBorder} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: theme.textMuted }}>Location</label>
            <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} 
              style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${theme.inputBorder}`, backgroundColor: theme.inputBg, color: theme.textMain, borderRadius: '8px', outline: 'none', transition: 'all 0.2s' }} 
              onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = theme.inputBorder} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: theme.textMuted }}>Industry</label>
            <input required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} 
              style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${theme.inputBorder}`, backgroundColor: theme.inputBg, color: theme.textMain, borderRadius: '8px', outline: 'none', transition: 'all 0.2s' }} 
              onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = theme.inputBorder} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: theme.textMuted }}>Experience Reqd.</label>
            <input required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} 
              style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${theme.inputBorder}`, backgroundColor: theme.inputBg, color: theme.textMain, borderRadius: '8px', outline: 'none', transition: 'all 0.2s' }} 
              onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = theme.inputBorder} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: theme.textMuted }}>Cover Image</label>
            <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} 
              style={{ width: '100%', padding: '0.75rem', border: `1px dashed ${theme.inputBorder}`, backgroundColor: theme.inputBg, color: theme.textMain, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: theme.textMuted }}>Description</label>
            <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} 
              style={{ width: '100%', padding: '0.75rem 1rem', border: `1px solid ${theme.inputBorder}`, backgroundColor: theme.inputBg, color: theme.textMain, borderRadius: '8px', outline: 'none', transition: 'all 0.2s', resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = theme.inputBorder}
            ></textarea>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} style={{ width: '1.1rem', height: '1.1rem', accentColor: '#3b82f6', cursor: 'pointer' }} />
            <label htmlFor="isActive" style={{ fontSize: '0.95rem', color: theme.textMain, cursor: 'pointer', userSelect: 'none' }}>Active Listing</label>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <motion.button 
              whileTap={{ scale: 0.97 }}
              type="submit" disabled={isSaving}
              style={{ 
                flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                backgroundColor: isEditing ? '#3b82f6' : (isDark ? '#e11d48' : '#b12023'), 
                color: 'white', border: 'none', padding: '0.85rem', borderRadius: '8px', 
                fontWeight: 600, fontSize: '1rem', cursor: isSaving ? 'not-allowed' : 'pointer',
                opacity: isSaving ? 0.7 : 1, transition: 'background-color 0.2s'
              }}
            >
              {isSaving ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : (isEditing ? 'Update Job' : 'Create Job')}
            </motion.button>
            
            {isEditing && (
              <motion.button 
                whileTap={{ scale: 0.97 }}
                type="button" onClick={() => { setIsEditing(false); setFormData({ title: '', description: '', location: '', industry: '', experience: '', isActive: true, image: null }); }} disabled={isSaving}
                style={{ 
                  padding: '0.85rem 1.5rem', backgroundColor: 'transparent', 
                  color: isDark ? '#f87171' : '#dc2626', border: `1px solid ${isDark ? '#f87171' : '#dc2626'}`, 
                  borderRadius: '8px', fontWeight: 600, cursor: isSaving ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ManageJobs;
