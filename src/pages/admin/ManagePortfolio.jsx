import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const ManagePortfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', clientName: '' });

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchItems = async () => {
    try {
      const { data } = await axios.get('/api/portfolio', getAuthHeaders());
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch portfolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/portfolio/${currentId}`, formData, getAuthHeaders());
      } else {
        await axios.post('/api/portfolio', formData, getAuthHeaders());
      }
      setFormData({ title: '', description: '', clientName: '' });
      setIsEditing(false);
      fetchItems();
    } catch (error) {
      alert('Error saving portfolio item');
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({ title: item.title, description: item.description, clientName: item.clientName || '' });
  };

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
        await axios.delete(`/api/portfolio/${id}`, getAuthHeaders());
        fetchItems();
        Swal.fire('Deleted!', 'The project has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', err.response?.data?.message || 'Failed to delete project.', 'error');
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: '2', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Recent Projects</h2>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Project Title</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Client</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{item.title}</td>
                  <td style={{ padding: '1rem' }}>{item.clientName || 'N/A'}</td>
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
          {isEditing ? 'Edit Project' : <><Plus size={20} /> Add Project</>}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Client Name</label>
            <input value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Description</label>
            <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            {isEditing ? 'Update Project' : 'Save Project'}
          </button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ title: '', description: '', clientName: '' }); }} style={{ marginTop: '0.5rem', padding: '0.5rem', cursor: 'pointer' }}>Cancel</button>}
        </form>
      </div>
    </div>
  );
};

export default ManagePortfolio;
