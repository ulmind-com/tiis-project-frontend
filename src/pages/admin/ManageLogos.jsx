import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { Plus, Trash2, Loader2, Image as ImageIcon, Upload, X, CheckCircle, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import ImageModal from '../../components/admin/ImageModal';

const ManageLogos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', isActive: true, image: null });
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
      const { data } = await api.get('/api/logos/admin', getAuthHeaders());
      setItems(data);
    }
    catch (e) { console.error('Failed to fetch logos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      Swal.fire('Error', 'Please select an image to upload', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('isActive', formData.isActive);
      data.append('image', formData.image);

      const config = getAuthHeaders();
      config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' };

      await api.post('/api/logos', data, config);
      Swal.fire({ title: 'Logo uploaded!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });

      resetForm();
      fetchItems();
    } catch (e) { Swal.fire('Error', e.response?.data?.message || 'Failed to upload.', 'error'); }
    finally { setIsSaving(false); }
  };

  const resetForm = () => {
    setFormData({ title: '', isActive: true, image: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this logo?', text: 'This action is permanent.', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: isDark ? '#475569' : '#94a3b8',
      background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#000', confirmButtonText: 'Delete',
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/api/logos/${id}`, getAuthHeaders());
        fetchItems();
        Swal.fire({ title: 'Deleted!', icon: 'success', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      } catch (err) { Swal.fire('Error!', err.response?.data?.message || 'Failed.', 'error'); }
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const config = getAuthHeaders();
      config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' };
      const updatedStatus = !item.isActive;

      const data = new FormData();
      data.append('isActive', updatedStatus);

      await api.put(`/api/logos/${item._id}`, data, config);

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
    <>
      <style>{`
        /* Ultra Premium Mobile Responsive CSS */
        @media (max-width: 960px) {
          .manage-logos-container {
            grid-template-columns: 1fr !important; /* Stack panels on mobile */
            gap: 2rem !important;
          }
          
          .logo-form-panel, .logo-grid-panel {
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }
          
          .logo-upload-box {
            padding: 1.5rem 1rem !important; /* Touch-friendly upload zone */
          }
        }

        @media (max-width: 480px) {
          .logo-cards-wrapper {
            grid-template-columns: repeat(2, 1fr) !important; /* Perfect 2-column grid for small phones */
            gap: 0.85rem !important;
          }
          
          .logo-item-card {
            padding: 0.85rem !important;
            border-radius: 14px !important;
          }
        }
      `}</style>

      <div className="manage-logos-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.2fr)', gap: '1.5rem', paddingBottom: '2rem' }}>

        {/* ── Form ── */}
        <motion.div className="logo-form-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
          backgroundColor: 'var(--color-card-bg)', padding: '1.75rem', borderRadius: '18px',
          border: '1px solid var(--border-color)',
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.04)',
          alignSelf: 'flex-start',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)' }}>
            <Plus size={18} /> Upload New Logo
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Client/Partner Name <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'none' }}>(Optional)</span></label>
              <input placeholder="E.g. Microsoft" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Logo Image <span style={{ color: '#ef4444' }}>*</span></label>
              <div
                className="logo-upload-box"
                onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? '#3b82f6' : 'var(--border-color)'}`, borderRadius: '12px', padding: '2rem 1.25rem',
                  textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s',
                  background: dragOver ? (isDark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.03)') : 'transparent',
                }}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                {formData.image ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={20} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500 }}>{formData.image.name}</span>
                    <button type="button" onClick={e => { e.stopPropagation(); setFormData({ ...formData, image: null }); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}><X size={18} /></button>
                  </div>
                ) : (
                  <>
                    <Upload size={28} style={{ color: 'var(--color-text-muted)', margin: '0 auto 0.6rem' }} />
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Drop logo image here or <span style={{ color: '#3b82f6', fontWeight: 600 }}>browse</span></p>
                    <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)', opacity: 0.7 }}>PNG with transparent background recommended</p>
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={isSaving}
                style={{
                  flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #01324e, #024b76)',
                  color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '10px', fontWeight: 600, fontSize: '0.92rem',
                  cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s',
                }}>
                {isSaving ? <><Loader2 className="animate-spin" size={16} /> Uploading...</> : 'Upload Logo'}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* ── Table / Grid ── */}
        <motion.div className="logo-grid-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{
          backgroundColor: 'var(--color-card-bg)', padding: '1.75rem', borderRadius: '18px',
          border: '1px solid var(--border-color)', boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.04)', overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={20} style={{ color: '#0ea5e9' }} /> Client Logos
              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: '#0ea5e915', color: '#0ea5e9', fontWeight: 600 }}>{items.length}</span>
            </h2>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}><Loader2 className="animate-spin" size={28} /></div>
          ) : (
            <div className="logo-cards-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div className="logo-item-card" key={item._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem',
                      backgroundColor: 'var(--color-bg-light)', position: 'relative'
                    }}>

                    <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '0.5rem' }}>
                      <img
                        src={item.imageUrl}
                        alt={item.title || 'Logo'}
                        onClick={() => setPreviewImage(item.imageUrl)}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', cursor: 'pointer', filter: isDark ? 'brightness(0.9) contrast(1.2)' : 'none' }}
                      />
                    </div>

                    {item.title && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', fontWeight: '500', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>}

                    <div style={{ display: 'flex', gap: '0.4rem', width: '100%', justifyContent: 'center' }}>
                      <button onClick={() => handleToggleActive(item)} title={item.isActive ? "Hide Logo" : "Show Logo"} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.3rem', borderRadius: '8px', backgroundColor: item.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: item.isActive ? '#10b981' : '#ef4444', transition: 'all 0.2s' }}>
                        {item.isActive ? <CheckCircle size={15} /> : <XCircle size={15} />}
                      </button>
                      <button onClick={() => handleDelete(item._id)} title="Delete Logo" style={{ width: '28px', height: '28px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--color-card-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-card-bg)'; e.currentTarget.style.color = '#ef4444'; }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No logos uploaded yet.</div>}
            </div>
          )}
        </motion.div>

        <ImageModal isOpen={!!previewImage} imageUrl={previewImage} onClose={() => setPreviewImage(null)} />
      </div>
    </>
  );
};

export default ManageLogos;