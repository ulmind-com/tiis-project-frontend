import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { Plus, Edit2, Trash2, Loader2, Users, Upload, X, Linkedin, Image as ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import ImageModal from '../../components/admin/ImageModal';

const ManageTeam = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', bio: '', linkedIn: '', image: null, existingImageUrl: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const context = useOutletContext();
  const isDark = context?.isDark || false;

  const getAuthHeaders = () => {
    const a = localStorage.getItem('adminInfo');
    if (!a) return {};
    return { headers: { Authorization: `Bearer ${JSON.parse(a).token}` } };
  };

  const fetchItems = async () => {
    try { const { data } = await api.get('/api/team', getAuthHeaders()); setItems(data); }
    catch (e) { console.error('Failed to fetch team'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name); data.append('role', formData.role);
      data.append('bio', formData.bio); data.append('linkedIn', formData.linkedIn);
      if (formData.image) data.append('image', formData.image);
      const config = getAuthHeaders();
      config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' };

      if (isEditing) {
        await api.put(`/api/team/${currentId}`, data, config);
        Swal.fire({ title: 'Updated!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      } else {
        await api.post('/api/team', data, config);
        Swal.fire({ title: 'Member added!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      }
      resetForm(); fetchItems();
    } catch (e) { Swal.fire('Error', e.response?.data?.message || 'Failed to save.', 'error'); }
    finally { setIsSaving(false); }
  };

  const handleEdit = (item) => {
    setIsEditing(true); setCurrentId(item._id);
    setFormData({ name: item.name, role: item.role, bio: item.bio || '', linkedIn: item.linkedIn || '', image: null, existingImageUrl: item.imageUrl || '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setIsEditing(false); setCurrentId(null);
    setFormData({ name: '', role: '', bio: '', linkedIn: '', image: null, existingImageUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Remove this member?', text: 'This action is permanent.', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: isDark ? '#475569' : '#94a3b8',
      background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#000', confirmButtonText: 'Delete',
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/api/team/${id}`, getAuthHeaders());
        fetchItems(); Swal.fire({ title: 'Removed!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      } catch (err) { Swal.fire('Error!', err.response?.data?.message || 'Failed.', 'error'); }
    }
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
          .manage-team-container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          /* Magic Table to Card Conversion for Mobile */
          .manage-team-table, .manage-team-table tbody, .manage-team-table tr, .manage-team-table td {
            display: block;
            width: 100%;
          }
          .manage-team-table thead {
            display: none; /* Hide headers on mobile */
          }
          .manage-team-table tr {
            background: var(--color-bg-light);
            border: 1px solid var(--border-color) !important;
            border-radius: 16px;
            margin-bottom: 1rem;
            padding: 1.25rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            transition: transform 0.2s ease;
          }
          .manage-team-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.65rem 0 !important;
            border-bottom: 1px solid var(--border-color) !important;
            text-align: right;
          }
          /* Generate Labels dynamically from data-label attribute */
          .manage-team-table td::before {
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
          .manage-team-table td:nth-last-child(2) {
            border-bottom: none !important; /* Remove line above actions */
          }
          .manage-team-table td:last-child {
            margin-top: 0.5rem;
            padding-top: 1rem !important;
            padding-bottom: 0 !important;
            border-bottom: none !important;
            border-top: 1px dashed var(--border-color) !important;
            justify-content: center;
            gap: 1rem !important;
          }
          .manage-team-table td:last-child::before {
            display: none; /* No label for the action buttons */
          }
          
          /* Ensure text breaks properly on mobile */
          .team-name-col {
            max-width: 180px;
          }
          .team-name-col div {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Touch-friendly Action Buttons */
          .team-action-btn {
            flex: 1 !important;
            padding: 0.6rem !important;
            border-radius: 10px !important;
          }
        }
      `}</style>

      <div className="manage-team-container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', paddingBottom: '2rem' }}>

        {/* ── Table ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{
          backgroundColor: 'var(--color-card-bg)', padding: '1.75rem', borderRadius: '18px',
          border: '1px solid var(--border-color)', boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.04)', overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: '#8b5cf6' }} /> Core Team
              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: '#8b5cf615', color: '#8b5cf6', fontWeight: 600 }}>{items.length}</span>
            </h2>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}><Loader2 className="animate-spin" size={28} /></div>
          ) : (
            <table className="manage-team-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
                  {['Photo', 'Name', 'Role', 'Actions'].map((h, i) => (
                    <th key={h} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', borderRadius: i === 0 ? '10px 0 0 0' : i === 3 ? '0 10px 0 0' : '' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {items.map(item => (
                    <motion.tr key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-light)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                      <td data-label="Photo" style={{ padding: '0.75rem 1rem' }}>
                        {item.imageUrl ?
                          <img src={item.imageUrl} alt={item.name} onClick={() => setPreviewImage(item.imageUrl)}
                            style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--border-color)', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                          : <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--color-bg-light)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>{item.name?.charAt(0)}</div>}
                      </td>

                      <td data-label="Name" className="team-name-col" style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{item.name}</div>
                        {item.linkedIn && <a href={item.linkedIn} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: '#0077b5', textDecoration: 'none', marginTop: '0.15rem' }}><Linkedin size={11} /> LinkedIn</a>}
                      </td>

                      <td data-label="Role" style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 500, background: '#8b5cf610', color: '#8b5cf6', border: '1px solid #8b5cf620' }}>{item.role}</span>
                      </td>

                      <td data-label="Actions" style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'flex-end' }}>
                          <button className="team-action-btn" onClick={() => handleEdit(item)} title="Edit"
                            style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--color-bg-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-light)'; e.currentTarget.style.color = '#3b82f6'; }}>
                            <Edit2 size={14} />
                          </button>
                          <button className="team-action-btn" onClick={() => handleDelete(item._id)} title="Delete"
                            style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--color-bg-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-light)'; e.currentTarget.style.color = '#ef4444'; }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>

                    </motion.tr>
                  ))}
                </AnimatePresence>
                {items.length === 0 && <tr><td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No team members. Add your first →</td></tr>}
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
            {isEditing ? <><Edit2 size={18} /> Edit Member</> : <><Plus size={18} /> Add Member</>}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
              <input required placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Role / Title <span style={{ color: '#ef4444' }}>*</span></label>
              <input required placeholder="CEO, CTO, Designer..." value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Short Bio</label>
              <textarea rows={3} placeholder="A brief introduction..." value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusIn} onBlur={focusOut} />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}><Linkedin size={13} /> LinkedIn URL</label>
              <input type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedIn} onChange={e => setFormData({ ...formData, linkedIn: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
            </div>

            {/* Image Upload */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Profile Photo</label>
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
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Drop photo or <span style={{ color: '#3b82f6', fontWeight: 600 }}>browse</span></p>
                  </>
                )}
              </div>
              {isEditing && formData.existingImageUrl && !formData.image && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ImageIcon size={13} /> Current photo: <a href={formData.existingImageUrl} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', fontWeight: 500 }}>View</a>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={isSaving}
                style={{
                  flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                  background: isEditing ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #01324e, #024b76)',
                  color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '10px', fontWeight: 600, fontSize: '0.92rem',
                  cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s',
                }}>
                {isSaving ? <><Loader2 className="animate-spin" size={16} /> Saving...</> : (isEditing ? 'Update Member' : 'Save Member')}
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

export default ManageTeam;