import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Trash2 } from 'lucide-react';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get('/api/auth/admins', getAuthHeaders());
      setAdmins(data);
    } catch (error) {
      console.error('Failed to fetch admins');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await axios.post('/api/auth/add-admin', { name, email, password }, getAuthHeaders());
      setMessage({ text: 'Admin created successfully', type: 'success' });
      setName('');
      setEmail('');
      setPassword('');
      fetchAdmins();
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to create admin', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* List Admins */}
      <div style={{ flex: '2', backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Active Administrators</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Name</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Email Address</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{admin.name}</td>
                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{admin.email}</td>
                <td style={{ padding: '1rem' }}>
                   <span style={{ padding: '0.2rem 0.6rem', backgroundColor: '#e0e7ff', color: '#3730a3', borderRadius: '20px', fontSize: '0.8rem' }}>
                     Admin
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add new Admin Form */}
      <div style={{ flex: '1', backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={20} /> Add New Admin
        </h2>
        
        {message.text && (
          <div style={{ 
            padding: '0.75rem', 
            borderRadius: '4px', 
            marginBottom: '1rem',
            backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: message.type === 'success' ? '#166534' : '#991b1b'
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleCreateAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem', display: 'block' }}>Full Name</label>
            <input required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem', display: 'block' }}>Email Address</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem', display: 'block' }}>Temporary Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Adding...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAdmins;
