import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useTheme } from '../../hooks/useTheme';

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const getStatusStyle = (status) => {
    switch (status) {
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
      const { data } = await api.get('/api/enquiries', getAuthHeaders());
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
      await api.put(`/api/enquiries/${id}/status`, { status: newStatus }, getAuthHeaders());
      fetchEnquiries(); // refresh
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <>
      <style>{`
        /* Ultra Premium Mobile Responsive CSS */
        @media (max-width: 960px) {
          .enquiries-panel {
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }
          
          /* Magic Table to Card Conversion for Mobile */
          .enquiries-table, .enquiries-table tbody, .enquiries-table tr, .enquiries-table td {
            display: block;
            width: 100%;
            min-width: 0 !important;
          }
          .enquiries-table thead {
            display: none; /* Hide headers on mobile */
          }
          .enquiries-table tr {
            background: var(--color-bg-light);
            border: 1px solid var(--border-color) !important;
            border-radius: 16px;
            margin-bottom: 1rem;
            padding: 1.25rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            transition: transform 0.2s ease;
          }
          .enquiries-table td {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0.65rem 0 !important;
            border-bottom: 1px solid var(--border-color) !important;
            text-align: right;
            gap: 1rem; /* Space between label and content */
          }
          
          /* Generate Labels dynamically from data-label attribute */
          .enquiries-table td::before {
            content: attr(data-label);
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            color: var(--color-text-muted);
            letter-spacing: 0.5px;
            text-align: left;
            flex-shrink: 0;
            margin-top: 0.15rem;
          }
          
          /* Styling the content inside cells to be right aligned on mobile */
          .enquiries-table td > div, .enquiries-table td > p {
            text-align: right;
          }

          .enquiries-table td:nth-last-child(2) {
            border-bottom: none !important; /* Remove line above status */
          }
          
          /* Special formatting for the Status Action cell */
          .enquiries-table td:last-child {
            margin-top: 0.5rem;
            padding-top: 1.25rem !important;
            padding-bottom: 0 !important;
            border-bottom: none !important;
            border-top: 1px dashed var(--border-color) !important;
            justify-content: space-between;
            align-items: center;
          }
          .enquiries-table td:last-child::before {
            content: 'Update Status:'; /* Hardcoded label for the action row */
            margin-top: 0;
          }
          
          /* Make select dropdown touch friendly on mobile */
          .status-select {
            padding: 0.6rem 1rem !important;
            font-size: 0.9rem !important;
            border-radius: 10px !important;
            width: auto;
          }
        }
      `}</style>

      <div className="enquiries-panel" style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-main)' }}>Business Enquiries</h2>

        {loading ? <p style={{ color: 'var(--color-text-muted)' }}>Loading Data...</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table className="enquiries-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Company / Contact</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Service</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Requirement</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status / Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No enquiries found.</td></tr>
                ) : (
                  enquiries.map(enq => (
                    <tr key={enq._id} style={{ borderBottom: '1px solid var(--border-color)', verticalAlign: 'top', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-light)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                      <td data-label="Date" style={{ padding: '1.25rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                        {new Date(enq.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>

                      <td data-label="Contact Details" style={{ padding: '1.25rem 1rem' }}>
                        <div style={{ fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '0.3rem', fontSize: '1rem' }}>{enq.companyName}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'inherit' }}>👤 {enq.contactPerson}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'inherit' }}>📧 {enq.email}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'inherit' }}>📞 {enq.phone}</div>
                        </div>
                      </td>

                      <td data-label="Service" style={{ padding: '1.25rem 1rem', textTransform: 'capitalize', fontWeight: '600', color: 'var(--color-primary)' }}>
                        {enq.serviceRequired}
                      </td>

                      <td data-label="Requirement" style={{ padding: '1.25rem 1rem', maxWidth: '350px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit' }}>
                          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--color-text-main)', wordBreak: 'break-word' }}>{enq.briefRequirement}</p>
                          {enq.attachmentUrl && (
                            <a href={`https://tiis-project-backend.onrender.com${enq.attachmentUrl}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.75rem', fontSize: '0.85rem', color: '#2563eb', textDecoration: 'none', fontWeight: '600', padding: '0.4rem 0.8rem', backgroundColor: '#eff6ff', borderRadius: '6px' }}>
                              📎 View Attachment
                            </a>
                          )}
                        </div>
                      </td>

                      <td data-label="Status" style={{ padding: '1.25rem 1rem' }}>
                        <select
                          className="status-select"
                          value={enq.status}
                          onChange={(e) => updateStatus(enq._id, e.target.value)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '8px',
                            border: `1.5px solid ${getStatusStyle(enq.status).color}`,
                            backgroundColor: getStatusStyle(enq.status).bg,
                            color: getStatusStyle(enq.status).color,
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            outline: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            appearance: 'none',
                            textAlign: 'center'
                          }}
                        >
                          <option value="new" style={{ background: 'var(--color-card-bg)', color: 'var(--color-text-main)' }}>🔴 NEW</option>
                          <option value="contacted" style={{ background: 'var(--color-card-bg)', color: 'var(--color-text-main)' }}>🟡 Contacted</option>
                          <option value="resolved" style={{ background: 'var(--color-card-bg)', color: 'var(--color-text-main)' }}>🟢 Resolved</option>
                        </select>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewEnquiries;