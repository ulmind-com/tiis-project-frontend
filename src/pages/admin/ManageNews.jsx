import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageNews = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', author: 'Admin', isPublished: true, image: null, existingImageUrl: '' });
  const fileInputRef = useRef(null);

  const getAuthHeaders = (isMultipart = false) => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    const headers = { Authorization: `Bearer ${admin.token}` };
    if (isMultipart) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    return { headers };
  };

  const fetchItems = async () => {
    try {
      const { data } = await axios.get('/api/news/admin', getAuthHeaders());
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('title', formData.title);
      dataToSubmit.append('content', formData.content);
      dataToSubmit.append('author', formData.author);
      dataToSubmit.append('isPublished', formData.isPublished);
      if (formData.image) {
        dataToSubmit.append('image', formData.image);
      }

      const config = getAuthHeaders(true);

      if (isEditing) {
        await axios.put(`/api/news/${currentId}`, dataToSubmit, config);
      } else {
        await axios.post('/api/news', dataToSubmit, config);
      }
      resetForm();
      fetchItems();
    } catch (error) {
      alert('Error saving news item');
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({ title: item.title, content: item.content, author: item.author, isPublished: item.isPublished, image: null, existingImageUrl: item.imageUrl || '' });
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ title: '', content: '', author: 'Admin', isPublished: true, image: null, existingImageUrl: '' });
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/news/${id}`, getAuthHeaders());
        fetchItems();
        Swal.fire('Deleted!', 'The news item has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', err.response?.data?.message || 'Failed to delete news item.', 'error');
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: '2', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Latest News Updates</h2>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Image</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Title</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /> : 'No Image'}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{item.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem',
                        backgroundColor: item.isPublished ? '#dcfce7' : '#f1f5f9',
                        color: item.isPublished ? '#166534' : '#475569'
                      }}>
                        {item.isPublished ? 'Published' : 'Draft'}
                      </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => handleEdit(item)} style={{ marginRight: '0.5rem', color: '#2563eb', background: 'none' }}>Edit</button>
                    <button onClick={() => handleDelete(item._id)} style={{ color: '#dc2626', background: 'none' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ flex: '1', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isEditing ? 'Edit News' : <><Plus size={20} /> Post News</>}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Headline</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Content</label>
            <textarea required rows="4" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
          </div>
          <div>
              <label style={{ display: 'block', marginBottom: '0.2rem' }}>Featured Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              {isEditing && formData.existingImageUrl && !formData.image && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Current: <a href={formData.existingImageUrl} target="_blank" rel="noreferrer">View Image</a></div>
              )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input type="checkbox" id="isPub" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} />
              <label htmlFor="isPub" style={{ fontSize: '0.9rem', color: '#555' }}>Publish Immediately</label>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            {isEditing ? 'Update News' : 'Save News'}
          </button>
          {isEditing && <button type="button" onClick={resetForm} style={{ marginTop: '0.5rem', padding: '0.5rem', cursor: 'pointer' }}>Cancel</button>}
        </form>
      </div>
    </div>
  );
};

export default ManageNews;
