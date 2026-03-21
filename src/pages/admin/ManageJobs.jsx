import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Edit2, Trash2, Loader2, Briefcase, Upload, X, MapPin, Building, Clock, Image as ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import ImageModal from '../../components/admin/ImageModal';
import { useRef } from 'react';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '', description: '', location: '', industry: '', experience: '', category: 'Open Position', isActive: true, image: null,
  });

  const context = useOutletContext();
  const isDark = context?.isDark || false;

  const getAuthHeaders = () => {
    const a = localStorage.getItem('adminInfo');
    if (!a) return {};
    return { headers: { Authorization: `Bearer ${JSON.parse(a).token}` } };
  };

  const fetchJobs = async () => {
    setLoading(true);
    try { const { data } = await api.get('/api/jobs?admin=true', getAuthHeaders()); setJobs(data); }
    catch (e) { console.error('Failed to fetch jobs', e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleEdit = (job) => {
    setIsEditing(true); setCurrentJobId(job._id);
    setFormData({ title: job.title, description: job.description, location: job.location, industry: job.industry, experience: job.experience, category: job.category || 'Open Position', isActive: job.isActive, image: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setIsEditing(false); setCurrentJobId(null);
    setFormData({ title: '', description: '', location: '', industry: '', experience: '', category: 'Open Position', isActive: true, image: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this listing?', text: 'This action is permanent.', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: isDark ? '#475569' : '#94a3b8',
      background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#000', confirmButtonText: 'Delete',
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/api/jobs/${id}`, getAuthHeaders());
        fetchJobs(); Swal.fire({ title: 'Deleted!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      } catch (err) { Swal.fire('Error!', err.response?.data?.message || 'Failed.', 'error'); }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => { if (formData[key] !== null) data.append(key, formData[key]); });
      const config = { headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' } };

      if (isEditing) {
        await api.put(`/api/jobs/${currentJobId}`, data, config);
        Swal.fire({ title: 'Updated!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      } else {
        await api.post('/api/jobs', data, config);
        Swal.fire({ title: 'Job posted!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      }
      resetForm(); fetchJobs();
    } catch (e) { Swal.fire('Error!', 'Failed to save job.', 'error'); }
    finally { setIsSaving(false); }
  };

  const handleImageChange = (e) => { if (e.target.files?.[0]) setFormData({ ...formData, image: e.target.files[0] }); };
  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files?.[0]) setFormData({ ...formData, image: e.dataTransfer.files[0] }); };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border-color)', backgroundColor: 'transparent',
    color: 'var(--color-text-main)', borderRadius: '10px', outline: 'none', transition: 'all 0.25s', fontSize: '0.9rem',
  };
  const focusIn = (e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.08)'; };
  const focusOut = (e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; };

  return (
    <>
      <style>{`
        /* Ultra Premium Mobile Responsive CSS */
        @media (max-width: 1024px) {
          .manage-jobs-container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .job-form-split {
            grid-template-columns: 1fr !important;
          }
          
          /* Magic Table to Card Conversion for Mobile */
          .manage-jobs-table, .manage-jobs-table tbody, .manage-jobs-table tr, .manage-jobs-table td {
            display: block;
            width: 100%;
          }
          .manage-jobs-table thead {
            display: none; /* Hide headers on mobile */
          }
          .manage-jobs-table tr {
            background: var(--color-bg-light);
            border: 1px solid var(--border-color) !important;
            border-radius: 16px;
            margin-bottom: 1rem;
            padding: 1.25rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            transition: transform 0.2s ease;
          }
          .manage-jobs-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.65rem 0 !important;
            border-bottom: 1px solid var(--border-color) !important;
            text-align: right;
          }
          /* Generate Labels dynamically from data-label attribute */
          .manage-jobs-table td::before {
            content: attr(data-label);
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            color: var(--color-text-muted);
            letter-spacing: 0.5px;
            text-align: left;
            flex-shrink: 0;
            margin-right: 1rem;
          }
          .manage-jobs-table td:nth-last-child(2) {
            border-bottom: none !important; /* Remove line above actions */
          }
          .manage-jobs-table td:last-child {
            margin-top: 0.5rem;
            padding-top: 1rem !important;
            padding-bottom: 0 !important;
            border-bottom: none !important;
            border-top: 1px dashed var(--border-color) !important;
            justify-content: center;
            gap: 1rem !important;
          }
          .manage-jobs-table td:last-child::before {
            display: none; /* No label for the action buttons */
          }
          
          /* Touch-friendly Action Buttons */
          .job-action-btn {
            flex: 1 !important;
            padding: 0.6rem !important;
            border-radius: 10px !important;
          }
        }
      `}</style>

      <div className="manage-jobs-container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', paddingBottom: '2rem' }}>

        {/* ── Table ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{
          backgroundColor: 'var(--color-card-bg)', padding: '1.75rem', borderRadius: '18px',
          border: '1px solid var(--border-color)', boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.04)', overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} style={{ color: '#10b981' }} /> Job Listings
              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: '#10b98115', color: '#10b981', fontWeight: 600 }}>{jobs.length}</span>
            </h2>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}><Loader2 className="animate-spin" size={28} /></div>
          ) : (
            <table className="manage-jobs-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
                  {['Image', 'Position', 'Location', 'Status', 'Actions'].map((h, i) => (
                    <th key={h} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderRadius: i === 0 ? '10px 0 0 0' : i === 4 ? '0 10px 0 0' : '' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {jobs.map(job => (
                    <motion.tr key={job._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-light)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                      <td data-label="Image" style={{ padding: '0.75rem 1rem' }}>
                        {(job.image || job.imageUrl) ?
                          <img src={job.image || job.imageUrl} alt="Job" onClick={() => setPreviewImage(job.image || job.imageUrl)}
                            style={{ width: '52px', height: '40px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                          : <div style={{ width: '52px', height: '40px', borderRadius: '8px', background: 'var(--color-bg-light)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}><Briefcase size={16} /></div>}
                      </td>

                      <td data-label="Position" style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{job.title}</div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                          <span style={{ fontSize: '0.7rem', color: '#10b981', background: '#10b98115', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>{job.category || 'Open Position'}</span>
                          {job.industry && <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', paddingTop: '0.1rem' }}>{job.industry}</span>}
                        </div>
                      </td>

                      <td data-label="Location" style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}><MapPin size={13} /> {job.location}</span>
                      </td>

                      <td data-label="Status" style={{ padding: '0.75rem 1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600,
                          background: job.isActive ? '#10b98115' : '#64748b15',
                          color: job.isActive ? '#10b981' : 'var(--color-text-muted)',
                          border: `1px solid ${job.isActive ? '#10b98125' : '#64748b25'}`,
                        }}>{job.isActive ? 'Active' : 'Closed'}</span>
                      </td>

                      <td data-label="Actions" style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'flex-end' }}>
                          <button className="job-action-btn" onClick={() => handleEdit(job)} title="Edit"
                            style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--color-bg-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-light)'; e.currentTarget.style.color = '#3b82f6'; }}>
                            <Edit2 size={14} />
                          </button>
                          <button className="job-action-btn" onClick={() => handleDelete(job._id)} title="Delete"
                            style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--color-bg-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-light)'; e.currentTarget.style.color = '#ef4444'; }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>

                    </motion.tr>
                  ))}
                </AnimatePresence>
                {jobs.length === 0 && <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No job listings. Create your first →</td></tr>}
              </tbody>
            </table>
          )}
        </motion.div>

        {/* ── Form ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
          backgroundColor: 'var(--color-card-bg)', padding: '1.75rem', borderRadius: '18px',
          border: `1px solid ${isEditing ? '#3b82f640' : 'var(--border-color)'}`,
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.04)',
          alignSelf: 'flex-start', transition: 'border-color 0.3s',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: isEditing ? '#3b82f6' : 'var(--color-text-main)' }}>
            {isEditing ? <><Edit2 size={18} /> Edit Listing</> : <><Plus size={18} /> Post New Job</>}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Job Title <span style={{ color: '#ef4444' }}>*</span></label>
              <input required placeholder="Senior Developer" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
            </div>

            <div className="job-form-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Location <span style={{ color: '#ef4444' }}>*</span></label>
                <input required placeholder="Mumbai, India" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Industry <span style={{ color: '#ef4444' }}>*</span></label>
                <input required placeholder="Technology" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
              </div>
            </div>

            <div className="job-form-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Experience Required <span style={{ color: '#ef4444' }}>*</span></label>
                <input required placeholder="3-5 years" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Category <span style={{ color: '#ef4444' }}>*</span></label>
                <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut}>
                  <option value="Open Position">Open Position</option>
                  <option value="Caregivers Enroll">Caregivers Enroll</option>
                  <option value="TIIS Openings">TIIS Openings</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Job Description <span style={{ color: '#ef4444' }}>*</span></label>
              <textarea required rows={4} placeholder="Describe the role, responsibilities..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusIn} onBlur={focusOut} />
            </div>

            {/* Image Upload */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Cover Image</label>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? '#3b82f6' : 'var(--border-color)'}`, borderRadius: '12px', padding: '1.25rem',
                  textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s',
                  background: dragOver ? (isDark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.03)') : 'transparent',
                }}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                {formData.image ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={18} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500 }}>{formData.image.name}</span>
                    <button type="button" onClick={e => { e.stopPropagation(); setFormData({ ...formData, image: null }); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.15rem' }}><X size={16} /></button>
                  </div>
                ) : (
                  <>
                    <Upload size={22} style={{ color: 'var(--color-text-muted)', margin: '0 auto 0.4rem' }} />
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Drop image or <span style={{ color: '#3b82f6', fontWeight: 600 }}>browse</span></p>
                  </>
                )}
              </div>
            </div>

            {/* Active toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', padding: '0.6rem 0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--color-bg-light)', transition: 'all 0.2s', userSelect: 'none' }}>
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ width: '1.1rem', height: '1.1rem', accentColor: '#10b981', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-main)' }}>Active Listing</span>
              <span style={{ marginLeft: 'auto', padding: '0.15rem 0.4rem', borderRadius: '5px', fontSize: '0.68rem', fontWeight: 600, background: formData.isActive ? '#10b98115' : '#ef444415', color: formData.isActive ? '#10b981' : '#ef4444' }}>
                {formData.isActive ? 'LIVE' : 'CLOSED'}
              </span>
            </label>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={isSaving}
                style={{
                  flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                  background: isEditing ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #01324e, #024b76)',
                  color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '10px', fontWeight: 600, fontSize: '0.92rem',
                  cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s',
                }}>
                {isSaving ? <><Loader2 className="animate-spin" size={16} /> Saving...</> : (isEditing ? 'Update Listing' : 'Post Job')}
              </motion.button>
              {isEditing && (
                <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={resetForm} disabled={isSaving}
                  style={{ padding: '0.8rem 1.25rem', backgroundColor: 'transparent', color: '#ef4444', border: '1.5px solid #ef444440', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', fontSize: '0.92rem' }}>
                  Cancel
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        <ImageModal isOpen={!!previewImage} imageUrl={previewImage} onClose={() => setPreviewImage(null)} />
      </div>
    </>
  );
};

export default ManageJobs;