import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Users, FileText, Briefcase, TrendingUp, ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, delay, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: color, filter: 'blur(40px)', opacity: isDark ? 0.15 : 0.08 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
          <Icon size={24} />
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(16,185,129,0.1)', padding: '0.25rem 0.65rem', borderRadius: '20px' }}>
          <TrendingUp size={14} /> +12%
        </span>
      </div>
      
      <div>
        <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--color-text-main)' }}>{value}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500, margin: '0.25rem 0 0 0' }}>{title}</p>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const context = useOutletContext();
  const isDark = context?.isDark || false;
  
  const [stats, setStats] = useState({
    news: '-',
    jobs: '-',
    enquiries: '-',
    portfolio: '-'
  });

  // Example placeholder for fetching stats - in a real app you'd hit a summary endpoint
  useEffect(() => {
    // Simulating API load for the numbers
    setTimeout(() => {
      setStats({
        news: '24',
        jobs: '8',
        enquiries: '156',
        portfolio: '14'
      });
    }, 800);
  }, []);

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Overview</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>Monitor your platform metrics and recent activities.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <StatCard title="Total Enquiries" value={stats.enquiries} icon={Users} color="#3b82f6" delay={0.1} isDark={isDark} />
        <StatCard title="Active Jobs" value={stats.jobs} icon={Briefcase} color="#f59e0b" delay={0.2} isDark={isDark} />
        <StatCard title="Published News" value={stats.news} icon={FileText} color="#10b981" delay={0.3} isDark={isDark} />
        <StatCard title="Portfolio Items" value={stats.portfolio} icon={ArrowUpRight} color="#8b5cf6" delay={0.4} isDark={isDark} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
        style={{ 
          marginTop: '3rem', backgroundColor: 'var(--color-card-bg)', 
          border: '1px solid var(--border-color)', borderRadius: '16px', padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}
      >
        <h2 style={{ color: 'var(--color-text-main)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['Review Enquiries', 'Post New Job', 'Update Portfolio'].map((action, idx) => (
            <button key={idx} style={{ 
              padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', 
              backgroundColor: 'var(--color-bg-light)', color: 'var(--color-text-main)',
              fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s'
            }} onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
              {action}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
