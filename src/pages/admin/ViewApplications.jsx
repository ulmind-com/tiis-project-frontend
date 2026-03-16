import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, ChevronDown, User, Mail, Phone, Briefcase, Calendar, Filter } from 'lucide-react';

const STATUS_COLORS = {
  pending:  { bg: '#fef9c3', color: '#854d0e' },
  reviewed: { bg: '#dbeafe', color: '#1e40af' },
  rejected: { bg: '#fee2e2', color: '#991b1b' },
  hired:    { bg: '#dcfce7', color: '#166534' },
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
      const { data } = await axios.get('/api/applications', getAuthHeaders());
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
      const { data } = await axios.put(
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
    <div>
      {/* Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Applications', count: applications.length, color: '#3b82f6' },
          { label: 'Pending Review',     count: applications.filter(a => a.status === 'pending').length,  color: '#eab308' },
          { label: 'Shortlisted',        count: applications.filter(a => a.status === 'reviewed').length, color: '#3b82f6' },
          { label: 'Hired',              count: applications.filter(a => a.status === 'hired').length,    color: '#22c55e' },
        ].map(stat => (
          <div key={stat.label} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${stat.color}` }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ backgroundColor: 'white', padding: '1.25rem 1.5rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Filter size={18} color="var(--color-text-muted)" />
        <span style={{ color: 'var(--color-text-muted)', fontWeight: '500', fontSize: '0.9rem' }}>Filter By:</span>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: '0.4rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', backgroundColor: 'white' }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </select>

        <select
          value={filterJob}
          onChange={e => setFilterJob(e.target.value)}
          style={{ padding: '0.4rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', backgroundColor: 'white' }}
        >
          <option value="all">All Positions</option>
          {uniqueJobs.map(job => (
            <option key={job._id} value={job._id}>{job.title}</option>
          ))}
        </select>

        <span style={{ marginLeft: 'auto', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
          Showing {filtered.length} of {applications.length}
        </span>
      </div>

      {/* Applications List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', color: 'var(--color-text-muted)' }}>
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
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  border: '1px solid #f1f5f9',
                  transition: 'box-shadow 0.2s',
                }}
              >
                {/* Application Row Header */}
                <div
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                  <div>
                    <p style={{ fontWeight: '500', color: '#374151' }}>{app.job?.title || 'Unknown Position'}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Position Applied</p>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#555' }}>
                    <Phone size={14} />
                    <span style={{ fontSize: '0.9rem' }}>{app.phone}</span>
                  </div>

                  {/* Date Applied */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#555' }}>
                    <Calendar size={14} />
                    <span style={{ fontSize: '0.9rem' }}>{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Status Badge */}
                  <span style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backgroundColor: statusColors.bg,
                    color: statusColors.color,
                    textTransform: 'capitalize',
                    whiteSpace: 'nowrap'
                  }}>
                    {app.status}
                  </span>

                  {/* Expand Arrow */}
                  <ChevronDown
                    size={18}
                    color="var(--color-text-muted)"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  />
                </div>

                {/* Expanded Detail Panel */}
                {isExpanded && (
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    padding: '1.5rem',
                    backgroundColor: '#f8fafc',
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
                            <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.1rem' }}>Full Name</p>
                            <p style={{ fontWeight: '500' }}>{app.name}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <Mail size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.1rem' }}>Email Address</p>
                            <a href={`mailto:${app.email}`} style={{ fontWeight: '500', color: '#2563eb' }}>{app.email}</a>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <Phone size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.1rem' }}>Phone Number</p>
                            <a href={`tel:${app.phone}`} style={{ fontWeight: '500', color: '#2563eb' }}>{app.phone}</a>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <Briefcase size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.1rem' }}>Applied For</p>
                            <p style={{ fontWeight: '500' }}>{app.job?.title || 'Unknown'}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <Calendar size={16} color="var(--color-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.1rem' }}>Applied On</p>
                            <p style={{ fontWeight: '500' }}>{new Date(app.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div>
                      <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: '600' }}>Actions</h4>

                      {/* CV Download */}
                      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.75rem' }}>Curriculum Vitae (CV)</p>
                        <a
                          href={`http://localhost:5000${app.cvUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '6px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                          }}
                        >
                          <Download size={16} /> Download CV
                        </a>
                      </div>

                      {/* Update Status */}
                      <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                        <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.75rem' }}>Update Application Status</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {['pending', 'reviewed', 'rejected', 'hired'].map(status => (
                            <button
                              key={status}
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
                                  : 'white',
                                color: STATUS_COLORS[status]?.color || '#333',
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
  );
};

export default ViewApplications;
