import React, { useState, useEffect } from 'react';
import api from '../../api';
import { UserPlus, KeyRound, Eye, EyeOff, X, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Change password state
  const [changePwModal, setChangePwModal] = useState(null); // admin object or null
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState({ text: '', type: '' });

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchAdmins = async () => {
    try {
      const { data } = await api.get('/api/auth/admins', getAuthHeaders());
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
      await api.post('/api/auth/add-admin', { name, email, password }, getAuthHeaders());
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

  const handleDeleteAdmin = async (adminId) => {
    const result = await Swal.fire({
      title: 'Delete this admin?',
      text: "They will immediately lose access to the admin panel. This cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete admin'
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/api/auth/admins/${adminId}`, getAuthHeaders());
      Swal.fire({
        title: 'Deleted!',
        text: 'The admin has been successfully removed.',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      fetchAdmins();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Failed to delete admin',
        icon: 'error'
      });
    }
  };

  const openChangePwModal = (admin) => {
    setChangePwModal(admin);
    setNewPassword('');
    setConfirmPassword('');
    setShowNewPw(false);
    setShowConfirmPw(false);
    setPwMessage({ text: '', type: '' });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMessage({ text: '', type: '' });

    if (newPassword.length < 6) {
      setPwMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    setPwLoading(true);
    try {
      await api.put(
        `/api/auth/change-password/${changePwModal._id}`,
        { newPassword },
        getAuthHeaders()
      );
      setPwMessage({ text: 'Password updated successfully!', type: 'success' });
      setTimeout(() => setChangePwModal(null), 1500);
    } catch (error) {
      setPwMessage({
        text: error.response?.data?.message || 'Failed to update password',
        type: 'error',
      });
    } finally {
      setPwLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.75rem',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '0.9rem',
    backgroundColor: 'var(--color-bg-light)',
    color: 'var(--color-text-main)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <>
      <style>{`
        /* Ultra Premium Mobile Responsive CSS */
        @media (max-width: 900px) {
          .admin-manage-container {
            flex-direction: column;
            gap: 1.5rem !important;
          }
          .admin-panel {
            flex: none !important;
            width: 100% !important;
            min-width: 0 !important;
            padding: 1.25rem !important;
          }
          
          /* Magic Table to Card Conversion for Mobile */
          .admin-table, .admin-table tbody, .admin-table tr, .admin-table td {
            display: block;
            width: 100%;
          }
          .admin-table thead {
            display: none; /* Hide standard headers on mobile */
          }
          .admin-table tr {
            background: var(--color-bg-light);
            border: 1px solid var(--border-color) !important;
            border-radius: 14px;
            margin-bottom: 1rem;
            padding: 1rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            transition: transform 0.2s ease;
          }
          .admin-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.6rem 0 !important;
            border-bottom: none !important;
            text-align: right;
          }
          /* Generate Labels dynamically from data-label attribute */
          .admin-table td::before {
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
          .admin-table td:last-child {
            margin-top: 0.5rem;
            padding-top: 1rem !important;
            padding-bottom: 0 !important;
            border-top: 1px dashed var(--border-color) !important;
            justify-content: center;
          }
          .admin-table td:last-child::before {
            display: none; /* No label for the action button */
          }
          
          /* Touch-friendly buttons */
          .pw-action-btn {
            flex: 1 !important;
            justify-content: center !important;
            padding: 0.85rem !important;
            font-size: 0.9rem !important;
            border-radius: 10px !important;
          }

          /* Modal sizing */
          .pw-modal-box {
            padding: 1.5rem !important;
            margin: 1rem;
            border-radius: 20px !important;
          }
        }
      `}</style>

      <div className="admin-manage-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

        {/* List Admins */}
        <div className="admin-panel" style={{ flex: '2', minWidth: '400px', backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', fontSize: '1.15rem', fontWeight: '600' }}>Active Administrators</h2>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: '600' }}>Email Address</th>
                <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: '600' }}>Role</th>
                <th style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: '600', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td data-label="Name" style={{ padding: '0.85rem 1rem', fontWeight: '500' }}>{admin.name}</td>
                  <td data-label="Email Address" style={{ padding: '0.85rem 1rem', color: 'var(--color-text-muted)', wordBreak: 'break-all' }}>{admin.email}</td>
                  <td data-label="Role" style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ padding: '0.2rem 0.6rem', backgroundColor: '#e0e7ff', color: '#3730a3', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                      Admin
                    </span>
                  </td>
                  <td data-label="Actions" style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', width: '100%' }}>
                      <button
                        className="pw-action-btn"
                        onClick={() => openChangePwModal(admin)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.4rem 0.85rem',
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(59,130,246,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <KeyRound size={14} /> Password
                      </button>
                      
                      {/* Delete Admin Button */}
                      <button
                        className="pw-action-btn"
                        onClick={() => handleDeleteAdmin(admin._id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.4rem 0.85rem',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(239,68,68,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add new Admin Form */}
        <div className="admin-panel" style={{ flex: '1', minWidth: '280px', backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem', fontWeight: '600' }}>
            <UserPlus size={20} /> Add New Admin
          </h2>

          {message.text && (
            <div style={{
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
              color: message.type === 'success' ? '#166534' : '#991b1b',
              fontSize: '0.85rem',
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreateAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem', display: 'block', fontWeight: '500' }}>Full Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem', display: 'block', fontWeight: '500' }}>Email Address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem', display: 'block', fontWeight: '500' }}>Temporary Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', borderRadius: '8px', padding: '0.85rem' }} disabled={loading}>
              {loading ? 'Adding...' : 'Create Admin'}
            </button>
          </form>
        </div>

        {/* Change Password Modal */}
        {changePwModal && (
          <div
            onClick={() => setChangePwModal(null)}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div
              className="pw-modal-box"
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '16px',
                padding: '2rem',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                position: 'relative',
                animation: 'modalIn 0.3s ease',
              }}
            >
              <style>{`
                @keyframes modalIn {
                  from { opacity: 0; transform: scale(0.95) translateY(10px); }
                  to { opacity: 1; transform: scale(1) translateY(0); }
                }
              `}</style>

              <button
                onClick={() => setChangePwModal(null)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'none', border: 'none',
                  color: 'var(--color-text-muted)', cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                }}>
                  <KeyRound size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-main)' }}>Change Password</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>for {changePwModal.name}</p>
                </div>
              </div>

              {pwMessage.text && (
                <div style={{
                  padding: '0.7rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  backgroundColor: pwMessage.type === 'success' ? '#dcfce7' : '#fee2e2',
                  color: pwMessage.type === 'success' ? '#166534' : '#991b1b',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                }}>
                  {pwMessage.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--color-text-muted)', marginBottom: '0.3rem', display: 'block' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      required
                      placeholder="Min 6 characters"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      style={{ ...inputStyle, paddingRight: '2.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '2px' }}
                    >
                      {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--color-text-muted)', marginBottom: '0.3rem', display: 'block' }}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPw ? 'text' : 'password'}
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      style={{ ...inputStyle, paddingRight: '2.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '2px' }}
                    >
                      {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={pwLoading}
                  style={{
                    padding: '0.85rem',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: pwLoading ? 'not-allowed' : 'pointer',
                    opacity: pwLoading ? 0.7 : 1,
                    transition: 'all 0.2s',
                    marginTop: '0.5rem',
                  }}
                >
                  {pwLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageAdmins;