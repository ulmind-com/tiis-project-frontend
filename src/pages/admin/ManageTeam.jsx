import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageTeam = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', bio: '', linkedIn: '', image: null, existingImageUrl: '' });
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchItems = async () => {
    try {
      const { data } = await axios.get('/api/team', getAuthHeaders());
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch team');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('name', formData.name);
      dataToSubmit.append('role', formData.role);
      dataToSubmit.append('bio', formData.bio);
      dataToSubmit.append('linkedIn', formData.linkedIn);
      if (formData.image) {
        dataToSubmit.append('image', formData.image);
      }

      const config = getAuthHeaders();

      if (isEditing) {
        await axios.put(`/api/team/${currentId}`, dataToSubmit, config);
        Swal.fire('Success', 'Team member updated successfully', 'success');
      } else {
        await axios.post('/api/team', dataToSubmit, config);
        Swal.fire('Success', 'Team member added successfully', 'success');
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error submitting team form:", error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to save team member', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setFormData({ name: item.name, role: item.role, bio: item.bio || '', linkedIn: item.linkedIn || '', image: null, existingImageUrl: item.imageUrl || '' });
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', role: '', bio: '', linkedIn: '', image: null, existingImageUrl: '' });
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
        await axios.delete(`/api/team/${id}`, getAuthHeaders());
        fetchItems();
        Swal.fire('Deleted!', 'The team member has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', err.response?.data?.message || 'Failed to delete team member.', 'error');
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
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Core Team Roster</h2>
        {loading ? <p>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Image</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Role</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /> : 'No Image'}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{item.name}</td>
                  <td style={{ padding: '1rem', color: '#666' }}>{item.role}</td>
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
          {isEditing ? 'Edit Member' : <><Plus size={20} /> Add Member</>}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Name</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Role / Title</label>
            <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>Short Bio</label>
            <textarea rows="3" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.2rem' }}>LinkedIn Profile URI</label>
            <input type="url" value={formData.linkedIn} onChange={e => setFormData({...formData, linkedIn: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
          <div>
              <label style={{ display: 'block', marginBottom: '0.2rem' }}>Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              {isEditing && formData.existingImageUrl && !formData.image && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>Current: <a href={formData.existingImageUrl} target="_blank" rel="noreferrer">View Image</a></div>
              )}
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }} disabled={isSaving}>
            {isSaving ? 'Saving...' : (isEditing ? 'Update Member' : 'Save Member')}
          </button>
          {isEditing && <button type="button" onClick={resetForm} style={{ marginTop: '0.5rem', padding: '0.5rem', cursor: 'pointer' }} disabled={isSaving}>Cancel</button>}
        </form>
      </div>
    </div>
  );
};

export default ManageTeam;
