import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/enquiries', getAuthHeaders());
      setEnquiries(data);
    } catch (error) {
      console.error('Failed to fetch enquiries');
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
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
      <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Business Enquiries</h2>
      
      {loading ? <p>Loading Data...</p> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Company / Contact</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Service</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Requirement</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Status / Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enq => (
                <tr key={enq._id} style={{ borderBottom: '1px solid #eee', verticalAlign: 'top' }}>
                  <td style={{ padding: '1rem', color: '#666', fontSize: '0.9rem' }}>
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600' }}>{enq.companyName}</div>
                    <div style={{ fontSize: '0.9rem', color: '#555' }}>👤 {enq.contactPerson}</div>
                    <div style={{ fontSize: '0.9rem', color: '#555' }}>📧 {enq.email}</div>
                    <div style={{ fontSize: '0.9rem', color: '#555' }}>📞 {enq.phone}</div>
                  </td>
                  <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{enq.serviceRequired}</td>
                  <td style={{ padding: '1rem', maxWidth: '300px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4', color: '#444' }}>{enq.briefRequirement}</p>
                    {enq.attachmentUrl && (
                      <a href={`http://localhost:5000${enq.attachmentUrl}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.8rem', color: '#2563eb' }}>
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
                        borderRadius: '4px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: enq.status === 'new' ? '#fee2e2' : enq.status === 'resolved' ? '#dcfce7' : '#fef9c3',
                        color: '#333'
                      }}
                    >
                      <option value="new">🔴 NEW</option>
                      <option value="contacted">🟡 Contacted</option>
                      <option value="resolved">🟢 Resolved</option>
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
