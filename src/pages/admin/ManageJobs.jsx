import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', location: '', industry: '', experience: '', isActive: true
  });

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
      industry: job.industry, experience: job.experience, isActive: job.isActive
    });
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this job listing?')) {
      try {
        await axios.delete(`/api/jobs/${id}`, getAuthHeaders());
        fetchJobs();
      } catch (err) {
        alert('Failed to delete job');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/jobs/${currentJobId}`, formData, getAuthHeaders());
      } else {
        await axios.post('/api/jobs', formData, getAuthHeaders());
      }
      setFormData({ title: '', description: '', location: '', industry: '', experience: '', isActive: true });
      setIsEditing(false);
      fetchJobs();
    } catch (error) {
      alert('Error saving job');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        
        {/* Job List */}
        <div style={{ flex: '2', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Active Listings</h2>
          {loading ? <p>Loading...</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Title</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Location</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{job.title}</td>
                    <td style={{ padding: '1rem', color: '#666' }}>{job.location}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem',
                        backgroundColor: job.isActive ? '#dcfce7' : '#f1f5f9',
                        color: job.isActive ? '#166534' : '#475569'
                      }}>
                        {job.isActive ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleEdit(job)} style={{ marginRight: '0.5rem', color: '#2563eb', background: 'none' }}>Edit</button>
                      <button onClick={() => handleDelete(job._id)} style={{ color: '#dc2626', background: 'none' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add/Edit Form */}
        <div style={{ flex: '1', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
            {isEditing ? 'Edit Job' : 'Add New Job'}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.2rem', display: 'block' }}>Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.2rem', display: 'block' }}>Location</label>
              <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.2rem', display: 'block' }}>Industry</label>
              <input required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.2rem', display: 'block' }}>Experience Reqd.</label>
              <input required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.2rem', display: 'block' }}>Description</label>
              <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
              <label htmlFor="isActive" style={{ fontSize: '0.9rem', color: '#555' }}>Active Listing</label>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ flex: '1', padding: '0.5rem' }}>{isEditing ? 'Update Job' : 'Create Job'}</button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(false); setFormData({ title: '', description: '', location: '', industry: '', experience: '', isActive: true }); }} style={{ background: '#e2e8f0', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ManageJobs;
