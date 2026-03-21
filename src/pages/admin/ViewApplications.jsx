import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Download, ChevronDown, User, Mail, Phone, Briefcase, Calendar, Filter } from 'lucide-react';

const STATUS_COLORS = {
  pending: { bg: '#fef9c3', color: '#854d0e' },
  reviewed: { bg: '#dbeafe', color: '#1e40af' },
  rejected: { bg: '#fee2e2', color: '#991b1b' },
  hired: { bg: '#dcfce7', color: '#166534' },
};

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterJob, setFilterJob] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      console.log('Fetching applications...');
      const { data } = await api.get('/api/applications', getAuthHeaders());
      console.log('Applications data received:', data);
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications', error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleStatusChange = async (appId, newStatus) => {
    setUpdatingId(appId);
    try {
      const { data } = await api.put(
        `/api/applications/${appId}/status`,
        { status: newStatus },
        getAuthHeaders()
      );
      setApplications(prev =>
        prev.map(a => a._id === appId ? { ...a, status: data.status } : a)
      );
    } catch (error) {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const uniqueJobs = [...new Map(
    applications
      .filter(a => a.job)
      .map(a => [a.job._id, a.job])
  ).values()];

  const filtered = applications.filter(a => {
    const statusMatch = filterStatus === 'all' || a.status === filterStatus;
    const jobMatch = filterJob === 'all' || (a.job && a.job._id === filterJob);
    return statusMatch && jobMatch;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--color-text-muted)' }}>
        Loading applications...
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Ultra Premium Mobile Responsive CSS */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .app-expanded-panel {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .filters-container {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
          }
          
          .filter-controls-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            width: 100%;
          }
          
          .filter-select {
            width: 100% !important;
            padding: 0.75rem !important;
          }

          /* Magic Collapsed List Item for Mobile */
          .app-row-header {
            grid-template-columns: 1fr auto !important;
            grid-template-rows: auto auto auto;
            gap: 0.3rem !important;
            padding: 1.25rem !important;
          }
          
          .app-col-name { grid-column: 1 / 2; grid-row: 1; }
          .app-col-job { 
            grid-column: 1 / 2; 
            grid-row: 2; 
            margin-left: 3.25rem; /* Aligns exactly under the text, passing the avatar */
          }
          .app-col-status { 
            grid-column: 1 / 2; 
            grid-row: 3; 
            margin-left: 3.25rem;
            margin-top: 0.35rem;
            justify-self: flex-start !important; 
          }
          .app-col-chevron { 
            grid-column: 2; 
            grid-row: 1 / 4; 
            align-self: center; 
          }
          
          /* Hide less important info on mobile collapsed view (visible in expanded) */
          .app-col-phone, .app-col-date {
            display: none !important;
          }

          /* Expanded Actions formatting */
          .status-btn-group {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.6rem !important;
          }
          .status-btn {
            width: 100% !important;
            padding: 0.75rem 0.5rem !important;
            text-align: center !important;
          }
        }
      `}</style>

      <div>
        {/* Stats Bar */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Applications', count: applications.length, color: '#3b82f6' },
            { label: 'Pending Review', count: applications.filter(a => a.status === 'pending').length, color: '#eab308' },
            { label: 'Shortlisted', count: applications.filter(a => a.status === 'reviewed').length, color: '#3b82f6' },
            { label: 'Hired', count: applications.filter(a => a.status === 'hired').length, color: '#22c55e' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${stat.color}` }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filters-container" style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.25rem 1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'max-content' }}>
            <Filter size={18} color="var(--color-text-muted)" />
            <span style={{ color: 'var(--color-text-muted)', fontWeight: '500', fontSize: '0.9rem' }}>Filter By:</span>
          </div>

          <div className="filter-controls-group" style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.9rem', backgroundColor: 'var(--color-card-bg)', color: 'var(--color-text-main)' }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>

            <select
              className="filter-select"
              value={filterJob}
              onChange={e => setFilterJob(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.9rem', backgroundColor: 'var(--color-card-bg)', color: 'var(--color-text-main)' }}
            >
              <option value="all">All Positions</option>
              {uniqueJobs.map(job => (
                <option key={job._id} value={job._id}>{job.title}</option>
              ))}
            </select>
          </div>

          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            Showing {filtered.length} of {applications.length}
          </span>
        </div>

        {/* Applications List */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--color-card-bg)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', color: 'var(--color-text-muted)' }}>
            <Briefcase size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p style={{ fontSize: '1.1rem' }}>No applications found matching the selected filters.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map(app => {
              const isExpanded = expandedId === app._id;
              const statusColors = STATUS_COLORS[app.status] || STATUS_COLORS.pending;

              return (
                <div
                  key={app._id}
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  {/* Application Row Header */}
                  <div
                    className="app-row-header"
                    onClick={() => setExpandedId(isExpanded ? null : app._id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr 1fr auto',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    {/* Applicant Name */}
                    <div className="app-col-name" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', flexShrink: 0
                      }}>
                        {app.name ? app.name[0].toUpperCase() : '?'}
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{app.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{app.email}</p>
                      </div>
                    </div>

                    {/* Job Applied For */}
                    <div className="app-col-job">
                      <p style={{ fontWeight: '500', color: 'var(--color-text-main)' }}>{app.job?.title || 'Unknown Position'}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Position Applied</p>
                    </div>

                    {/* Phone */}
                    <div className="app-col-phone" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                      <Phone size={14} />
                      <span style={{ fontSize: '0.9rem' }}>{app.phone}</span>
                    </div>

                    {/* Date Applied */}
                    <div className="app-col-date" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                      <Calendar size={14} />
                      <span style={{ fontSize: '0.9rem' }}>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Status Badge */}
                    <span className="app-col-status" style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      backgroundColor: statusColors.bg,
                      color: statusColors.color,
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      textAlign: 'center'
                    }}>
                      {app.status}
                    </span>

                    {/* Expand Arrow */}
                    <div className="app-col-chevron">
                      <ChevronDown
                        size={18}
                        color="var(--color-text-muted)"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                      />
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="app-expanded-panel" style={{
                      borderTop: '1px solid var(--border-color)',
                      padding: '1.5rem',
                      backgroundColor: 'var(--color-bg-light)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '2rem'
                    }}>
                      {/* Left: Applicant Details */}
                      <div>
                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: '600' }}>Applicant Details</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <User size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.1rem' }}>Full Name</p>
                              <p style={{ fontWeight: '500', color: 'var(--color-text-main)' }}>{app.name}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <Mail size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.1rem' }}>Email Address</p>
                              <a href={`mailto:${app.email}`} style={{ fontWeight: '500', color: '#3b82f6', textDecoration: 'none' }}>{app.email}</a>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <Phone size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.1rem' }}>Phone Number</p>
                              <a href={`tel:${app.phone}`} style={{ fontWeight: '500', color: '#3b82f6', textDecoration: 'none' }}>{app.phone}</a>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <Briefcase size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.1rem' }}>Applied For</p>
                              <p style={{ fontWeight: '500', color: 'var(--color-text-main)' }}>{app.job?.title || 'Unknown'}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <Calendar size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.1rem' }}>Applied On</p>
                              <p style={{ fontWeight: '500', color: 'var(--color-text-main)' }}>{new Date(app.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div>
                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: '600' }}>Actions</h4>

                        {/* CV Download */}
                        <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Curriculum Vitae (CV)</p>
                          <a
                            href={`https://tiis-project-backend.onrender.com${app.cvUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              backgroundColor: 'var(--color-primary)',
                              color: 'white',
                              padding: '0.6rem 1.25rem',
                              borderRadius: '6px',
                              fontWeight: '600',
                              fontSize: '0.9rem',
                              textDecoration: 'none',
                              width: '100%',
                            }}
                          >
                            <Download size={16} /> Download CV
                          </a>
                        </div>

                        {/* Update Status */}
                        <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Update Application Status</p>
                          <div className="status-btn-group" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {['pending', 'reviewed', 'rejected', 'hired'].map(status => (
                              <button
                                key={status}
                                className="status-btn"
                                onClick={() => handleStatusChange(app._id, status)}
                                disabled={app.status === status || updatingId === app._id}
                                style={{
                                  padding: '0.4rem 1rem',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  fontWeight: '500',
                                  cursor: app.status === status ? 'default' : 'pointer',
                                  border: '2px solid ' + (STATUS_COLORS[status]?.color || '#ccc'),
                                  backgroundColor: app.status === status
                                    ? STATUS_COLORS[status]?.bg || '#eee'
                                    : 'transparent',
                                  color: STATUS_COLORS[status]?.color || 'var(--color-text-main)',
                                  opacity: updatingId === app._id && app.status !== status ? 0.5 : 1,
                                  textTransform: 'capitalize',
                                  transition: 'all 0.15s',
                                }}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewApplications;