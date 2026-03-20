import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { Plus, Edit2, Trash2, Loader2, MessageSquare, Upload, X, ImageIcon, Star, CheckCircle, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import ImageModal from '../../components/admin/ImageModal';

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ clientName: '', designation: '', description: '', rating: 5, isActive: true, image: null, existingImageUrl: '' });
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
    try { 
      const { data } = await api.get('/api/testimonials', getAuthHeaders()); 
      setItems(data); 
    }
    catch (e) { console.error('Failed to fetch testimonials'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSaving(true);
    try {
      const data = new FormData();
      data.append('clientName', formData.clientName); 
      data.append('designation', formData.designation);
      data.append('description', formData.description); 
      data.append('rating', formData.rating);
      data.append('isActive', formData.isActive);
      if (formData.image) data.append('image', formData.image);
      
      const config = getAuthHeaders();
      // Override default application/json header to allow file uploads
      config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' };

      if (isEditing) {
        await api.put(`/api/testimonials/${currentId}`, data, config);
        Swal.fire({ title: 'Updated!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      } else {
        await api.post('/api/testimonials', data, config);
        Swal.fire({ title: 'Testimonial added!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      }
      resetForm(); fetchItems();
    } catch (e) { Swal.fire('Error', e.response?.data?.message || 'Failed to save.', 'error'); }
    finally { setIsSaving(false); }
  };

  const handleEdit = (item) => {
    setIsEditing(true); setCurrentId(item._id);
    setFormData({ 
      clientName: item.clientName, 
      designation: item.designation || '', 
      description: item.description || '', 
      rating: item.rating || 5, 
      isActive: item.isActive !== undefined ? item.isActive : true,
      image: null, 
      existingImageUrl: item.imageUrl || '' 
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setIsEditing(false); setCurrentId(null);
    setFormData({ clientName: '', designation: '', description: '', rating: 5, isActive: true, image: null, existingImageUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Remove this testimonial?', text: 'This action is permanent.', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: isDark ? '#475569' : '#94a3b8',
      background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#000', confirmButtonText: 'Delete',
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/api/testimonials/${id}`, getAuthHeaders());
        fetchItems(); Swal.fire({ title: 'Removed!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      } catch (err) { Swal.fire('Error!', err.response?.data?.message || 'Failed.', 'error'); }
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const config = getAuthHeaders();
      const updatedStatus = !item.isActive;
      // using PUT but with minimal data specifically to flip active
      const data = new FormData();
      data.append('isActive', updatedStatus);
      await api.put(`/api/testimonials/${item._id}`, data, config);
      
      // Optimitistic UI update
      setItems(items.map(t => t._id === item._id ? { ...t, isActive: updatedStatus } : t));
      Swal.fire({ title: updatedStatus ? 'Activated' : 'Hidden', icon: 'success', toast: true, position: 'top-end', timer: 1500, showConfirmButton: false });
    } catch (e) {
      Swal.fire('Error', 'Failed to change status.', 'error');
    }
  }

  const handleImageChange = (e) => { if (e.target.files?.[0]) setFormData({ ...formData, image: e.target.files[0] }); };
  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files?.[0]) setFormData({ ...formData, image: e.dataTransfer.files[0] }); };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border-color)', backgroundColor: 'transparent',
    color: 'var(--color-text-main)', borderRadius: '10px', outline: 'none', transition: 'all 0.25s', fontSize: '0.9rem',
  };
  const focusIn = (e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.08)'; };
  const focusOut = (e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', paddingBottom: '2rem' }}>
      {/* ── Table ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{
        backgroundColor: 'var(--color-card-bg)', padding: '1.75rem', borderRadius: '18px',
        border: '1px solid var(--border-color)', boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.04)', overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} style={{ color: '#f59e0b' }} /> Testimonials
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: '#f59e0b15', color: '#f59e0b', fontWeight: 600 }}>{items.length}</span>
          </h2>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}><Loader2 className="animate-spin" size={28} /></div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
                {['Client', 'Rating', 'Status', 'Actions'].map((h, i) => (
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
                    <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      {item.imageUrl ?
                        <img src={item.imageUrl} alt={item.clientName} onClick={() => setPreviewImage(item.imageUrl)}
                          style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--border-color)', cursor: 'pointer', transition: 'transform 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                        : <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--color-bg-light)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>{item.clientName?.charAt(0)}</div>}
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{item.clientName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>{item.designation}</div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', color: '#fbbf24', gap: '0.1rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < item.rating ? '#fbbf24' : 'transparent'} strokeWidth={i < item.rating ? 0 : 2} color={i < item.rating ? '#fbbf24' : 'var(--color-text-muted)'} opacity={i < item.rating ? 1 : 0.3} />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <button onClick={() => handleToggleActive(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.6rem', borderRadius: '20px', backgroundColor: item.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: item.isActive ? '#10b981' : '#ef4444', fontWeight: 600, fontSize: '0.75rem', transition: 'all 0.2s' }}>
                        {item.isActive ? <><CheckCircle size={14} /> Active</> : <><XCircle size={14} /> Hidden</>}
                      </button>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleEdit(item)} title="Edit"
                          style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--color-bg-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-light)'; e.currentTarget.style.color = '#3b82f6'; }}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} title="Delete"
                          style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--color-bg-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-light)'; e.currentTarget.style.color = '#ef4444'; }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {items.length === 0 && <tr><td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No testimonials yet. Add your first →</td></tr>}
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
          {isEditing ? <><Edit2 size={18} /> Edit Testimonial</> : <><Plus size={18} /> Add Testimonial</>}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Client Name <span style={{ color: '#ef4444' }}>*</span></label>
            <input required placeholder="Elon Musk" value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Designation</label>
            <input placeholder="CEO, SpaceX" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Testimonial Description <span style={{ color: '#ef4444' }}>*</span></label>
            <textarea required rows={4} placeholder="Their experience working with us..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Rating (1-5)</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  size={24} 
                  fill={star <= formData.rating ? '#fbbf24' : 'transparent'} 
                  strokeWidth={star <= formData.rating ? 0 : 1.5} 
                  color={star <= formData.rating ? '#fbbf24' : 'var(--color-text-muted)'}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => setFormData({ ...formData, rating: star })}
                />
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Client Photo</label>
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
              {isSaving ? <><Loader2 className="animate-spin" size={16} /> Saving...</> : (isEditing ? 'Update Testimonial' : 'Save Testimonial')}
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
  );
};

export default ManageTestimonials;
