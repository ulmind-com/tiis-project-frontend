import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../hooks/useTheme';

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const getStatusStyle = (status) => {
    switch(status) {
      case 'new': return { bg: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2', color: isDark ? '#fca5a5' : '#b91c1c' };
      case 'resolved': return { bg: isDark ? 'rgba(34, 197, 94, 0.15)' : '#dcfce7', color: isDark ? '#86efac' : '#15803d' };
      case 'contacted': return { bg: isDark ? 'rgba(234, 179, 8, 0.15)' : '#fef9c3', color: isDark ? '#fde047' : '#a16207' };
      default: return { bg: 'var(--color-bg-light)', color: 'var(--color-text-main)' };
    }
  };

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      console.log('Fetching enquiries...');
      const { data } = await axios.get('/api/enquiries', getAuthHeaders());
      console.log('Enquiries data received:', data);
      setEnquiries(data);
    } catch (error) {
      console.error('Failed to fetch enquiries', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/enquiries/${id}/status`, { status: newStatus }, getAuthHeaders());
      fetchEnquiries(); // refresh
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Business Enquiries</h2>
      
      {loading ? <p>Loading Data...</p> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Date</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Company / Contact</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Service</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Requirement</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>Status / Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enq => (
                <tr key={enq._id} style={{ borderBottom: '1px solid var(--border-color)', verticalAlign: 'top' }}>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{enq.companyName}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>👤 {enq.contactPerson}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>📧 {enq.email}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>📞 {enq.phone}</div>
                  </td>
                  <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{enq.serviceRequired}</td>
                  <td style={{ padding: '1rem', maxWidth: '300px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4', color: 'var(--color-text-main)' }}>{enq.briefRequirement}</p>
                    {enq.attachmentUrl && (
                      <a href={`https://tiis-project-backend.onrender.com${enq.attachmentUrl}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.8rem', color: '#2563eb' }}>
                        📎 View Attachment
                      </a>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={enq.status} 
                      onChange={(e) => updateStatus(enq._id, e.target.value)}
                      style={{ 
                        padding: '0.4rem', 
                        borderRadius: '6px',
                        border: `1px solid ${getStatusStyle(enq.status).color}`,
                        backgroundColor: getStatusStyle(enq.status).bg,
                        color: getStatusStyle(enq.status).color,
                        fontWeight: '600',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="new" style={{background: 'var(--color-card-bg)', color: 'var(--color-text-main)'}}>🔴 NEW</option>
                      <option value="contacted" style={{background: 'var(--color-card-bg)', color: 'var(--color-text-main)'}}>🟡 Contacted</option>
                      <option value="resolved" style={{background: 'var(--color-card-bg)', color: 'var(--color-text-main)'}}>🟢 Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewEnquiries;
