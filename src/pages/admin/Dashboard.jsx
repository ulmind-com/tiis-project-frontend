import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Users, FileText, Briefcase, TrendingUp, ArrowUpRight,
  MessageSquare, FolderOpen, UserCheck, Clock, Eye,
  Newspaper, ImageIcon, UsersRound, Activity, ChevronRight
} from 'lucide-react';
import api from '../../api';

/* ─── Animated counter hook ─── */
const useCountUp = (target, duration = 1200) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
};

/* ─── Stat card ─── */
const StatCard = ({ title, value, icon: Icon, color, delay, isDark, subtitle, link }) => {
  const animatedValue = useCountUp(typeof value === 'number' ? value : 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{ textDecoration: 'none' }}
    >
      <Link to={link || '#'} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="premium-stat-card" style={{
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '1.75rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          boxShadow: isDark ? '0 4px 24px -4px rgba(0,0,0,0.3)' : '0 4px 24px -4px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s',
        }}>
          {/* Glow blob */}
          <div style={{
            position: 'absolute', top: '-30px', right: '-30px',
            width: '120px', height: '120px', borderRadius: '50%',
            background: color, filter: 'blur(50px)',
            opacity: isDark ? 0.15 : 0.08,
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-icon-wrap" style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: `${color}18`,
              border: `1px solid ${color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: color,
            }}>
              <Icon size={24} />
            </div>
            {subtitle && (
              <span className="stat-subtitle" style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                fontSize: '0.78rem', fontWeight: 600,
                color: 'var(--color-text-muted)',
                background: 'var(--color-bg-light)',
                padding: '0.3rem 0.7rem', borderRadius: '20px',
                border: '1px solid var(--border-color)',
              }}>
                {subtitle}
              </span>
            )}
          </div>

          <div>
            <h3 className="stat-value" style={{
              fontSize: '2.25rem', fontWeight: 800, margin: 0,
              color: 'var(--color-text-main)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {typeof value === 'number' ? animatedValue.toLocaleString() : value}
            </h3>
            <p className="stat-title" style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem', fontWeight: 500, margin: '0.3rem 0 0 0',
            }}>{title}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ─── Activity item ─── */
const ActivityItem = ({ icon: Icon, color, title, subtitle, time, isDark }) => (
  <div className="activity-item" style={{
    display: 'flex', alignItems: 'flex-start', gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid var(--border-color)',
  }}>
    <div style={{
      width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
      background: `${color}15`, border: `1px solid ${color}20`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: color,
    }}>
      <Icon size={18} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{title}</p>
      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitle}</p>
    </div>
    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '0.15rem' }}>{time}</span>
  </div>
);

/* ─── Quick action button ─── */
const QuickAction = ({ icon: Icon, label, to, color }) => (
  <Link to={to} className="quick-action-btn" style={{
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.9rem 1.2rem',
    borderRadius: '14px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--color-bg-light)',
    color: 'var(--color-text-main)',
    textDecoration: 'none',
    fontWeight: 500, fontSize: '0.9rem',
    transition: 'all 0.25s',
    cursor: 'pointer',
    flex: '1 1 180px',
  }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 4px 12px ${color}20`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border-color)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{
      width: '36px', height: '36px', borderRadius: '10px',
      background: `${color}15`, color: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={18} />
    </div>
    {label}
    <ChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.4 }} />
  </Link>
);

/* ─── Time ago helper ─── */
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

/* ─── Main Dashboard ─── */
const Dashboard = () => {
  const context = useOutletContext();
  const isDark = context?.isDark || false;

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enquiries: 0, jobs: 0, news: 0, portfolio: 0,
    applications: 0, team: 0, admins: 0,
    newEnquiries: 0, pendingApps: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentNews, setRecentNews] = useState([]);

  const getAuthHeaders = () => {
    const adminStr = localStorage.getItem('adminInfo');
    if (!adminStr) return {};
    const admin = JSON.parse(adminStr);
    return { headers: { Authorization: `Bearer ${admin.token}` } };
  };

  const adminName = (() => {
    try {
      return JSON.parse(localStorage.getItem('adminInfo'))?.name || 'Admin';
    } catch { return 'Admin'; }
  })();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const headers = getAuthHeaders();
        const [enquiriesRes, jobsRes, newsRes, portfolioRes, applicationsRes, teamRes, adminsRes] = await Promise.all([
          api.get('/api/enquiries', headers).catch(() => ({ data: [] })),
          api.get('/api/jobs?admin=true', headers).catch(() => ({ data: [] })),
          api.get('/api/news', headers).catch(() => ({ data: [] })),
          api.get('/api/portfolio', headers).catch(() => ({ data: [] })),
          api.get('/api/applications', headers).catch(() => ({ data: [] })),
          api.get('/api/team', headers).catch(() => ({ data: [] })),
          api.get('/api/auth/admins', headers).catch(() => ({ data: [] })),
        ]);

        const enquiries = enquiriesRes.data;
        const applications = applicationsRes.data;

        setStats({
          enquiries: enquiries.length,
          jobs: jobsRes.data.length,
          news: newsRes.data.length,
          portfolio: portfolioRes.data.length,
          applications: applications.length,
          team: teamRes.data.length,
          admins: adminsRes.data.length,
          newEnquiries: enquiries.filter(e => e.status === 'new').length,
          pendingApps: applications.filter(a => a.status === 'pending').length,
        });

        setRecentEnquiries(enquiries.slice(0, 5));
        setRecentApplications(applications.slice(0, 5));
        setRecentNews(newsRes.data.slice(0, 3));
      } catch (err) {
        console.error('Dashboard fetch error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div style={{
          width: '40px', height: '40px',
          border: '3px solid var(--border-color)',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '2rem' }}>

      {/* Ultra Premium Mobile Responsive Styles Injector */}
      <style>{`
        /* Tablet & Mobile Stack */
        @media (max-width: 1024px) {
          .dashboard-bottom-row {
            grid-template-columns: 1fr !important;
          }
        }

        /* Mobile App-like Adjustments */
        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 1.5rem !important;
          }
          
          /* Force 2x2 grid for stat cards on mobile for that premium App feel */
          .dashboard-grid-1, .dashboard-grid-2 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          /* Make the last odd item in grid 2 span full width for symmetry */
          .dashboard-grid-2 > div:last-child {
             grid-column: span 2;
          }

          .premium-stat-card {
            padding: 1.1rem !important;
            border-radius: 16px !important;
            gap: 0.75rem !important;
          }

          .stat-icon-wrap {
            width: 40px !important;
            height: 40px !important;
            border-radius: 10px !important;
          }
          
          .stat-icon-wrap svg {
            width: 20px !important;
            height: 20px !important;
          }

          .stat-value {
            font-size: 1.6rem !important;
          }

          .stat-title {
            font-size: 0.75rem !important;
          }

          .stat-subtitle {
            font-size: 0.65rem !important;
            padding: 0.2rem 0.5rem !important;
          }

          .premium-panel {
            padding: 1.25rem !important;
            border-radius: 16px !important;
          }

          .quick-action-btn {
            padding: 0.85rem 1rem !important;
          }
          
          .activity-item {
            padding: 0.85rem 0 !important;
          }
        }
        
        /* Ultra small screens (iPhone SE etc) */
        @media (max-width: 380px) {
          .dashboard-grid-1, .dashboard-grid-2 {
             grid-template-columns: 1fr !important;
          }
          .dashboard-grid-2 > div:last-child {
             grid-column: span 1;
          }
        }
      `}</style>

      {/* Header */}
      <motion.div className="dashboard-header" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0 0 0.3rem 0', fontWeight: 500 }}>{greeting} 👋</p>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0 }}>
          Welcome back, <span style={{ color: '#3b82f6' }}>{adminName}</span>
        </h1>
      </motion.div>

      {/* Stats Grid 1 */}
      <div className="dashboard-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Total Enquiries" value={stats.enquiries} icon={MessageSquare} color="#3b82f6" delay={0.05} isDark={isDark} subtitle={`${stats.newEnquiries} new`} link="/admin/enquiries" />
        <StatCard title="Job Applications" value={stats.applications} icon={UserCheck} color="#f59e0b" delay={0.1} isDark={isDark} subtitle={`${stats.pendingApps} pending`} link="/admin/applications" />
        <StatCard title="Active Jobs" value={stats.jobs} icon={Briefcase} color="#10b981" delay={0.15} isDark={isDark} link="/admin/careers" />
        <StatCard title="Published News" value={stats.news} icon={Newspaper} color="#8b5cf6" delay={0.2} isDark={isDark} link="/admin/news" />
      </div>

      {/* Stats Grid 2 */}
      <div className="dashboard-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <StatCard title="Portfolio Items" value={stats.portfolio} icon={FolderOpen} color="#ec4899" delay={0.25} isDark={isDark} link="/admin/portfolio" />
        <StatCard title="Team Members" value={stats.team} icon={UsersRound} color="#06b6d4" delay={0.3} isDark={isDark} link="/admin/team" />
        <StatCard title="Admin Users" value={stats.admins} icon={Users} color="#f97316" delay={0.35} isDark={isDark} link="/admin/admins" />
      </div>

      {/* Bottom row: Activity + Quick Actions */}
      <div className="dashboard-bottom-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>

        {/* Recent Activity */}
        <motion.div
          className="premium-panel"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px', padding: '1.75rem',
            boxShadow: isDark ? '0 4px 24px -4px rgba(0,0,0,0.3)' : '0 4px 24px -4px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.15rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} style={{ color: '#3b82f6' }} /> Recent Activity
            </h2>
          </div>

          <div>
            {recentEnquiries.map((enq, i) => (
              <ActivityItem
                key={`enq-${enq._id}`}
                icon={MessageSquare}
                color="#3b82f6"
                title={`New enquiry from ${enq.contactPerson}`}
                subtitle={`${enq.companyName} — ${enq.serviceRequired}`}
                time={timeAgo(enq.createdAt)}
                isDark={isDark}
              />
            ))}
            {recentApplications.map((app, i) => (
              <ActivityItem
                key={`app-${app._id}`}
                icon={UserCheck}
                color="#f59e0b"
                title={`Application from ${app.name}`}
                subtitle={app.email}
                time={timeAgo(app.createdAt)}
                isDark={isDark}
              />
            ))}
            {recentEnquiries.length === 0 && recentApplications.length === 0 && (
              <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0', fontSize: '0.9rem' }}>No recent activity</p>
            )}
          </div>
        </motion.div>

        {/* Right column: Quick Actions + Recent News */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div
            className="premium-panel"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px', padding: '1.75rem',
              boxShadow: isDark ? '0 4px 24px -4px rgba(0,0,0,0.3)' : '0 4px 24px -4px rgba(0,0,0,0.06)',
            }}
          >
            <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <QuickAction icon={Eye} label="Review Enquiries" to="/admin/enquiries" color="#3b82f6" />
              <QuickAction icon={Briefcase} label="Manage Jobs" to="/admin/careers" color="#10b981" />
              <QuickAction icon={Newspaper} label="Publish News" to="/admin/news" color="#8b5cf6" />
              <QuickAction icon={FolderOpen} label="Update Portfolio" to="/admin/portfolio" color="#ec4899" />
            </div>
          </motion.div>

          {/* Recent News mini-feed */}
          {recentNews.length > 0 && (
            <motion.div
              className="premium-panel"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px', padding: '1.75rem',
                boxShadow: isDark ? '0 4px 24px -4px rgba(0,0,0,0.3)' : '0 4px 24px -4px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Latest News</h2>
                <Link to="/admin/news" style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>View All</Link>
              </div>
              {recentNews.map((article, i) => (
                <div key={article._id} style={{
                  display: 'flex', gap: '0.85rem', alignItems: 'center',
                  padding: '0.7rem 0',
                  borderBottom: i < recentNews.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                    backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : 'none',
                    backgroundColor: 'var(--color-bg-light)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {!article.imageUrl && <FileText size={20} style={{ color: 'var(--color-text-muted)' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0, fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{article.title}</p>
                    <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {new Date(article.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;