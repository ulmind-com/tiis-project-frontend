import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  Users, Eye, Monitor, Smartphone, Tablet, Globe, Clock,
  TrendingUp, BarChart3, Cookie, Shield, MousePointer,
  ChevronLeft, ChevronRight, ArrowUpRight, Timer, Scroll,
  Zap, Mail, Cpu, Battery, Wifi, UserCheck,
} from 'lucide-react';
import api from '../../api';

/* ─── Animated counter ─── */
const useCountUp = (target, dur = 1000) => {
  const [c, setC] = useState(0);
  useEffect(() => {
    if (!target) { setC(0); return; }
    const s = performance.now();
    const step = (n) => {
      const p = Math.min((n - s) / dur, 1);
      setC(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return c;
};

/* ─── Mini stat card ─── */
const MiniStat = ({ label, value, icon: Icon, color, isDark, suffix }) => {
  const anim = useCountUp(typeof value === 'number' ? value : 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        background: 'var(--color-card-bg)', border: '1px solid var(--border-color)',
        borderRadius: '18px', padding: '1.25rem', position: 'relative', overflow: 'hidden',
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '90px', height: '90px', borderRadius: '50%', background: color, filter: 'blur(40px)', opacity: isDark ? 0.15 : 0.08 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${color}15`, border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          <Icon size={18} />
        </div>
      </div>
      <h3 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0, color: 'var(--color-text-main)', fontVariantNumeric: 'tabular-nums' }}>
        {typeof value === 'number' ? anim.toLocaleString() : value}{suffix || ''}
      </h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 500, margin: '0.2rem 0 0 0' }}>{label}</p>
    </motion.div>
  );
};

/* ─── Bar chart ─── */
const SimpleBarChart = ({ data }) => {
  if (!data.length) return <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0' }}>No data yet</p>;
  const max = Math.max(...data.map(d => d.count), 1);
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.4rem', height: '120px', padding: '0.5rem 0' }}>
      {data.map((d, i) => {
        const pct = (d.count / max) * 100;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{d.count}</span>
            <motion.div initial={{ height: 0 }} animate={{ height: `${Math.max(pct, 5)}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{ width: '100%', maxWidth: '32px', borderRadius: '6px 6px 3px 3px', background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)', minHeight: '4px' }} />
            <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{dayLabels[new Date(d._id).getDay()]}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Donut chart ─── */
const DonutChart = ({ data, colors, size = 100 }) => {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const dash = circ * (d.count / total);
        const o = offset; offset += dash;
        return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={colors[i % colors.length]} strokeWidth="12" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-o} strokeLinecap="round" style={{ transition: 'all 0.8s ease' }} />;
      })}
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fill="var(--color-text-main)" fontSize="1.1rem" fontWeight="800">{total}</text>
    </svg>
  );
};

/* ─── Progress bar row ─── */
const ProgressRow = ({ label, value, max, color, suffix }) => (
  <div style={{ marginBottom: '0.65rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
      <span style={{ color: 'var(--color-text-main)', fontWeight: 500, wordBreak: 'break-all', paddingRight: '1rem' }}>{label}</span>
      <span style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>{value}{suffix || ''}</span>
    </div>
    <div style={{ height: '5px', borderRadius: '3px', background: 'var(--color-bg-light)' }}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${(value / (max || 1)) * 100}%` }} transition={{ duration: 0.8 }}
        style={{ height: '100%', borderRadius: '3px', background: color || '#3b82f6' }} />
    </div>
  </div>
);

/* ─── Main ─── */
const VisitorAnalytics = () => {
  const context = useOutletContext();
  const isDark = context?.isDark || false;

  const [analytics, setAnalytics] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const getAuthHeaders = () => {
    const a = localStorage.getItem('adminInfo');
    if (!a) return {};
    return { headers: { Authorization: `Bearer ${JSON.parse(a).token}` } };
  };

  const fetchData = async (p = 1) => {
    try {
      const h = getAuthHeaders();
      const [aRes, vRes] = await Promise.all([
        api.get('/api/visitors/analytics', h),
        api.get(`/api/visitors?page=${p}&limit=20`, h),
      ]);
      setAnalytics(aRes.data);
      setVisitors(vRes.data.visitors);
      setTotalPages(vRes.data.totalPages);
      setTotal(vRes.data.total);
    } catch (e) { console.error('Failed to fetch analytics', e); }
    finally { setLoading(false); }
  };

  const fetchDetail = async (id) => {
    try { const { data } = await api.get(`/api/visitors/${id}`, getAuthHeaders()); setSelectedVisitor(data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { fetchData(page); }, [page]);

  const a = analytics || {};
  const cardStyle = { background: 'var(--color-card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem', boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.05)' };
  const deviceColors = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];
  const consentColors = ['#10b981', '#ef4444', '#64748b'];
  const browserColors = ['#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];
  const deviceIcon = (t) => t === 'Mobile' ? Smartphone : t === 'Tablet' ? Tablet : Monitor;

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        /* Ultra Premium Mobile Responsive CSS */
        @media (max-width: 1024px) {
          .analytics-chart-row-1, .analytics-chart-row-2 {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 768px) {
          /* Stack stats & charts on mobile */
          .analytics-stat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .analytics-chart-row-1, .analytics-chart-row-2 {
            grid-template-columns: 1fr !important;
          }
          
          /* Table to Card Conversion for Mobile */
          .visitor-table, .visitor-table tbody, .visitor-table tr, .visitor-table td {
            display: block;
            width: 100%;
          }
          .visitor-table thead {
            display: none; /* Hide headers */
          }
          .visitor-table tr {
            background: var(--color-bg-light);
            border: 1px solid var(--border-color) !important;
            border-radius: 16px;
            margin-bottom: 1rem;
            padding: 1rem 1.25rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            transition: transform 0.2s ease;
          }
          .visitor-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0 !important;
            border-bottom: 1px solid var(--border-color) !important;
            text-align: right;
            gap: 1rem;
          }
          
          /* Labels for mobile cards */
          .visitor-table td::before {
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
          
          .visitor-table td:last-child {
            border-bottom: none !important;
          }

          /* Force word break for IPs and long text in table */
          .visitor-table td > span {
            word-break: break-all;
            text-align: right;
          }

          /* Modal adjustments */
          .visitor-modal-content {
            padding: 1.5rem 1.25rem !important;
          }
          .visitor-modal-grid {
            grid-template-columns: 1fr !important; /* Single column data list in modal */
            gap: 0.5rem !important;
          }
          .visitor-modal-grid > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 0.4rem;
          }
          .visitor-modal-grid p {
            margin: 0 !important;
          }
          .visitor-modal-grid > div > p:first-child {
            width: 40%;
          }
          .visitor-modal-grid > div > p:last-child {
            text-align: right;
            width: 60%;
          }
        }

        @media (max-width: 480px) {
          .analytics-stat-grid {
            grid-template-columns: 1fr !important; /* Single column stats for very small phones */
          }
        }
      `}</style>

      <div style={{ paddingBottom: '2rem' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={26} style={{ color: '#3b82f6' }} /> Visitor Analytics
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Complete visitor intelligence — device, engagement, and reach data.</p>
        </motion.div>

        {/* Row 1: Key stats */}
        <div className="analytics-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <MiniStat label="Total Visitors" value={a.totalVisitors || 0} icon={Users} color="#3b82f6" isDark={isDark} />
          <MiniStat label="Today" value={a.todayVisitors || 0} icon={TrendingUp} color="#10b981" isDark={isDark} />
          <MiniStat label="Last 7 Days" value={a.last7dVisitors || 0} icon={Clock} color="#f59e0b" isDark={isDark} />
          <MiniStat label="Page Views" value={a.totalPageViews || 0} icon={Eye} color="#8b5cf6" isDark={isDark} />
          <MiniStat label="Returning" value={a.returningVisitors || 0} icon={ArrowUpRight} color="#ec4899" isDark={isDark} />
          <MiniStat label="Contacts Linked" value={a.contactLinked || 0} icon={Mail} color="#06b6d4" isDark={isDark} />
        </div>

        {/* Row 2: Engagement stats */}
        <div className="analytics-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <MiniStat label="Avg Time Spent" value={a.avgTimeSpent || 0} icon={Timer} color="#f97316" isDark={isDark} suffix="s" />
          <MiniStat label="Avg Scroll Depth" value={a.avgScrollDepth || 0} icon={Scroll} color="#14b8a6" isDark={isDark} suffix="%" />
          <MiniStat label="Avg Clicks" value={a.avgClicks || 0} icon={MousePointer} color="#a855f7" isDark={isDark} />
          <MiniStat label="Bounce Rate" value={a.bounceRate || 0} icon={Zap} color="#ef4444" isDark={isDark} suffix="%" />
        </div>

        {/* Row 3: Charts */}
        <div className="analytics-chart-row-1" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Daily chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={cardStyle}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0' }}>Daily Visitors (7 Days)</h3>
            <SimpleBarChart data={a.dailyVisitors || []} />
          </motion.div>

          {/* Devices */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={cardStyle}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0' }}>Devices</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <DonutChart data={a.deviceStats || []} colors={deviceColors} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(a.deviceStats || []).map((d, i) => {
                  const DI = deviceIcon(d._id);
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: deviceColors[i % deviceColors.length] }} />
                      <DI size={13} style={{ color: 'var(--color-text-muted)' }} />
                      <span style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>{d._id || '?'}</span>
                      <span style={{ color: 'var(--color-text-muted)', marginLeft: 'auto' }}>{d.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Consent */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={cardStyle}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Cookie size={16} /> Consent
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <DonutChart data={a.consentStats || []} colors={consentColors} size={90} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(a.consentStats || []).map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: consentColors[i % consentColors.length] }} />
                    <span style={{ color: 'var(--color-text-main)', fontWeight: 500, textTransform: 'capitalize' }}>{c._id}</span>
                    <span style={{ color: 'var(--color-text-muted)', marginLeft: 'auto' }}>{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 4: Top Pages + Browsers + OS */}
        <div className="analytics-chart-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={cardStyle}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0' }}>Top Pages</h3>
            {(a.topPages || []).map((p, i) => <ProgressRow key={i} label={p._id} value={p.views} max={(a.topPages || [])[0]?.views} color="linear-gradient(90deg,#3b82f6,#8b5cf6)" suffix=" views" />)}
            {(!a.topPages || !a.topPages.length) && <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '1rem 0', fontSize: '0.85rem' }}>No data yet</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={cardStyle}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0' }}>Browsers</h3>
            {(a.browserStats || []).map((b, i) => <ProgressRow key={i} label={b._id || 'Unknown'} value={b.count} max={(a.browserStats || [])[0]?.count} color={browserColors[i % browserColors.length]} />)}
            {(!a.browserStats || !a.browserStats.length) && <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '1rem 0', fontSize: '0.85rem' }}>No data yet</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={cardStyle}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 0.75rem 0' }}>Operating Systems</h3>
            {(a.osStats || []).map((o, i) => <ProgressRow key={i} label={o._id || 'Unknown'} value={o.count} max={(a.osStats || [])[0]?.count} color={browserColors[i % browserColors.length]} />)}
            {(!a.osStats || !a.osStats.length) && <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '1rem 0', fontSize: '0.85rem' }}>No data yet</p>}
          </motion.div>
        </div>

        {/* Visitors Table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ ...cardStyle, padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>All Visitors ({total})</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'var(--color-bg-light)', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.4 : 1, color: 'var(--color-text-main)' }}><ChevronLeft size={16} /></button>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'var(--color-bg-light)', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1, color: 'var(--color-text-main)' }}><ChevronRight size={16} /></button>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="visitor-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg-light)', textAlign: 'left' }}>
                  {['Device', 'Browser', 'OS', 'IP', 'Timezone', 'Pages', 'Time', 'Clicks', 'Contact', 'Consent', 'Last Visit'].map(h => (
                    <th key={h} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--color-text-muted)', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visitors.map(v => (
                  <tr key={v._id} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }}
                    onClick={() => fetchDetail(v._id)}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-light)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                    <td data-label="Device" style={{ padding: '0.75rem' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600,
                        background: v.device === 'Mobile' ? '#f59e0b15' : v.device === 'Tablet' ? '#10b98115' : '#3b82f615',
                        color: v.device === 'Mobile' ? '#f59e0b' : v.device === 'Tablet' ? '#10b981' : '#3b82f6'
                      }}>
                        {v.device}{v.deviceVendor ? ` · ${v.deviceVendor}` : ''}
                      </span>
                    </td>
                    <td data-label="Browser" style={{ padding: '0.75rem', color: 'var(--color-text-main)', fontWeight: 500 }}>{v.browser}</td>
                    <td data-label="OS" style={{ padding: '0.75rem', color: 'var(--color-text-muted)' }}>{v.os}</td>
                    <td data-label="IP" style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><span>{v.ip?.replace('::1', 'localhost') || '—'}</span></td>
                    <td data-label="Timezone" style={{ padding: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}><span>{v.timezone || '—'}</span></td>
                    <td data-label="Pages" style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{v.totalPageViews}</td>
                    <td data-label="Time" style={{ padding: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{v.totalTimeSpent ? `${v.totalTimeSpent}s` : '—'}</td>
                    <td data-label="Clicks" style={{ padding: '0.75rem', color: 'var(--color-text-muted)' }}>{v.totalClicks || '—'}</td>
                    <td data-label="Contact" style={{ padding: '0.75rem' }}>
                      {v.contactInfo?.email ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600, background: '#06b6d415', color: '#06b6d4' }}>
                          <Mail size={12} /> {v.contactInfo.email.length > 15 ? v.contactInfo.email.slice(0, 15) + '…' : v.contactInfo.email}
                        </span>
                      ) : <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>—</span>}
                    </td>
                    <td data-label="Consent" style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize',
                        background: v.cookieConsent === 'accepted' ? '#10b98115' : v.cookieConsent === 'rejected' ? '#ef444415' : '#64748b15',
                        color: v.cookieConsent === 'accepted' ? '#10b981' : v.cookieConsent === 'rejected' ? '#ef4444' : '#64748b'
                      }}>
                        {v.cookieConsent}
                      </span>
                    </td>
                    <td data-label="Last Visit" style={{ padding: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
                      {new Date(v.lastVisit).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
                {!visitors.length && <tr><td colSpan={11} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No visitors tracked yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Visitor Detail Modal ── */}
        {selectedVisitor && (
          <div onClick={() => setSelectedVisitor(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="visitor-modal-content" onClick={e => e.stopPropagation()} style={{ background: 'var(--color-card-bg)', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '720px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', animation: 'modalIn 0.3s ease' }}>
              <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Visitor Details</h2>
                <button onClick={() => setSelectedVisitor(null)} style={{ background: 'var(--color-bg-light)', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', fontSize: '1.2rem', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>

              {/* Contact Info (if linked) */}
              {selectedVisitor.contactInfo?.email && (
                <div style={{ background: '#06b6d410', border: '1px solid #06b6d425', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 700, color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <UserCheck size={16} /> Identified Contact
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                    {selectedVisitor.contactInfo.name && <div><strong style={{ color: 'var(--color-text-muted)' }}>Name:</strong> {selectedVisitor.contactInfo.name}</div>}
                    {selectedVisitor.contactInfo.email && <div><strong style={{ color: 'var(--color-text-muted)' }}>Email:</strong> {selectedVisitor.contactInfo.email}</div>}
                    {selectedVisitor.contactInfo.phone && <div><strong style={{ color: 'var(--color-text-muted)' }}>Phone:</strong> {selectedVisitor.contactInfo.phone}</div>}
                    {selectedVisitor.contactInfo.company && <div><strong style={{ color: 'var(--color-text-muted)' }}>Company:</strong> {selectedVisitor.contactInfo.company}</div>}
                  </div>
                </div>
              )}

              {/* All details - Grid responsive magic here */}
              <div className="visitor-modal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  ['Visitor ID', selectedVisitor.visitorId],
                  ['Canvas FP', selectedVisitor.canvasFingerprint],
                  ['Device', `${selectedVisitor.device}${selectedVisitor.deviceVendor ? ` · ${selectedVisitor.deviceVendor}` : ''}${selectedVisitor.deviceModel ? ` ${selectedVisitor.deviceModel}` : ''}`],
                  ['Browser', `${selectedVisitor.browser} ${selectedVisitor.browserVersion}`],
                  ['OS', `${selectedVisitor.os} ${selectedVisitor.osVersion || ''}`],
                  ['Screen', selectedVisitor.screenResolution],
                  ['Viewport', selectedVisitor.viewportSize],
                  ['Color Depth', selectedVisitor.screenColorDepth ? `${selectedVisitor.screenColorDepth}-bit` : '—'],
                  ['Language', selectedVisitor.language],
                  ['All Languages', selectedVisitor.languages?.join(', ')],
                  ['Timezone', selectedVisitor.timezone],
                  ['TZ Offset', selectedVisitor.timezoneOffset ? `UTC${selectedVisitor.timezoneOffset > 0 ? '-' : '+'}${Math.abs(selectedVisitor.timezoneOffset / 60)}` : '—'],
                  ['CPU Cores', selectedVisitor.cpuCores || '—'],
                  ['RAM', selectedVisitor.deviceMemory ? `${selectedVisitor.deviceMemory} GB` : '—'],
                  ['Touch Points', selectedVisitor.maxTouchPoints || '0'],
                  ['GPU', selectedVisitor.gpu || '—'],
                  ['GPU Vendor', selectedVisitor.gpuVendor || '—'],
                  ['IP Address', selectedVisitor.ip?.replace('::1', 'localhost')],
                  ['Connection', selectedVisitor.connectionType || '—'],
                  ['Speed', selectedVisitor.connectionSpeed || '—'],
                  ['Battery', selectedVisitor.batteryLevel !== undefined ? `${selectedVisitor.batteryLevel}%${selectedVisitor.batteryCharging ? ' ⚡' : ''}` : '—'],
                  ['Referrer', selectedVisitor.referrerDomain || 'Direct'],
                  ['Cookies', selectedVisitor.cookiesEnabled ? '✅' : '❌'],
                  ['Do Not Track', selectedVisitor.doNotTrack ? '✅' : '❌'],
                  ['Ad Blocker', selectedVisitor.adBlockerDetected ? '🚫 Yes' : '✅ No'],
                  ['Bot/Webdriver', selectedVisitor.webdriver ? '⚠️ Yes' : '✅ No'],
                  ['Platform', selectedVisitor.platform || '—'],
                  ['Consent', selectedVisitor.cookieConsent],
                  ['Total Visits', selectedVisitor.visitCount],
                  ['Page Views', selectedVisitor.totalPageViews],
                  ['Time Spent', selectedVisitor.totalTimeSpent ? `${selectedVisitor.totalTimeSpent}s` : '—'],
                  ['Avg Scroll', selectedVisitor.avgScrollDepth ? `${selectedVisitor.avgScrollDepth}%` : '—'],
                  ['Total Clicks', selectedVisitor.totalClicks || '—'],
                  ['First Visit', new Date(selectedVisitor.firstVisit).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })],
                  ['Last Visit', new Date(selectedVisitor.lastVisit).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k}</p>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 500, wordBreak: 'break-all' }}>{v || '—'}</p>
                  </div>
                ))}
              </div>

              {/* Plugins */}
              {selectedVisitor.plugins?.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>Browser Plugins</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {selectedVisitor.plugins.map((p, i) => (
                      <span key={i} style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', background: 'var(--color-bg-light)', color: 'var(--color-text-main)', border: '1px solid var(--border-color)', fontWeight: 500 }}>{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Page History */}
              <div style={{ background: 'var(--color-bg-light)', borderRadius: '12px', padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  Page History ({selectedVisitor.pages?.length || 0})
                </h3>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {(selectedVisitor.pages || []).slice().reverse().map((pg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', gap: '1rem' }}>
                      <span style={{ color: '#3b82f6', fontWeight: 600, wordBreak: 'break-all' }}>{pg.path}</span>
                      <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end', textAlign: 'right' }}>
                        {pg.duration > 0 && <span>⏱ {pg.duration}s</span>}
                        {pg.scrollDepth > 0 && <span>↕ {pg.scrollDepth}%</span>}
                        {pg.clicks > 0 && <span>👆 {pg.clicks}</span>}
                        <span style={{ fontWeight: 500 }}>{new Date(pg.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))}
                  {(!selectedVisitor.pages || !selectedVisitor.pages.length) && <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '1rem 0' }}>No pages</p>}
                </div>
              </div>

              {/* User Agent (raw) */}
              {selectedVisitor.userAgent && (
                <details style={{ marginTop: '1rem' }}>
                  <summary style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 600, padding: '0.5rem', background: 'var(--color-bg-light)', borderRadius: '6px' }}>View Raw User Agent</summary>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-main)', background: 'var(--color-bg-light)', padding: '0.75rem', borderRadius: '8px', wordBreak: 'break-all', marginTop: '0.5rem', lineHeight: 1.5, border: '1px solid var(--border-color)' }}>{selectedVisitor.userAgent}</p>
                </details>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VisitorAnalytics;