import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Shield, ArrowRight, Zap, Users, BarChart3, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Monitor performance metrics live' },
    { icon: Users, title: 'Team Management', desc: 'Manage roles and permissions' },
    { icon: Zap, title: 'Quick Actions', desc: 'Streamlined content workflows' },
  ];

  /* ── Theme-aware color tokens ── */
  const t = isDark ? {
    // Dark mode
    pageBg: '#0a0e1a',
    leftBg: 'linear-gradient(145deg, #0f172a 0%, #0c1425 40%, #101d35 100%)',
    leftGlow1: 'rgba(59,130,246,0.08)',
    leftGlow2: 'rgba(177,32,35,0.06)',
    badgeBg: 'rgba(59,130,246,0.1)',
    badgeBorder: 'rgba(59,130,246,0.2)',
    badgeColor: '#60a5fa',
    titleColor: '#ffffff',
    subtitleColor: '#64748b',
    featureIconBg: 'rgba(59,130,246,0.1)',
    featureIconBorder: 'rgba(59,130,246,0.15)',
    featureIconColor: '#60a5fa',
    featureTitle: '#e2e8f0',
    featureDesc: '#64748b',
    rightBg: '#0f1629',
    rightGlow: 'rgba(59,130,246,0.03)',
    gridLine: 'rgba(59,130,246,0.03)',
    cardIconBg: 'linear-gradient(135deg, #1e3a5f 0%, #1a2d4a 100%)',
    cardIconBorder: 'rgba(59,130,246,0.2)',
    cardIconGlow: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(177,32,35,0.2))',
    cardIconColor: '#60a5fa',
    cardTitle: '#f1f5f9',
    cardSubtitle: '#64748b',
    errorBg: 'rgba(239,68,68,0.1)',
    errorBorder: 'rgba(239,68,68,0.2)',
    errorColor: '#fca5a5',
    labelColor: '#94a3b8',
    inputBg: 'rgba(15,23,42,0.6)',
    inputBgFocus: 'rgba(15,23,42,0.8)',
    inputBorder: 'rgba(71,85,105,0.3)',
    inputText: '#f1f5f9',
    inputPlaceholder: '#475569',
    inputIcon: '#475569',
    inputIconFocus: '#60a5fa',
    toggleColor: '#475569',
    toggleHover: '#94a3b8',
    footerBorder: 'rgba(71,85,105,0.2)',
    footerText: '#475569',
    footerSecure: '#64748b',
    themeBtnBg: 'rgba(255,255,255,0.05)',
    themeBtnBorder: 'rgba(255,255,255,0.1)',
    themeBtnColor: '#94a3b8',
  } : {
    // Light mode
    pageBg: '#f1f5f9',
    leftBg: 'linear-gradient(145deg, #01324e 0%, #012a42 40%, #013a5a 100%)',
    leftGlow1: 'rgba(59,130,246,0.12)',
    leftGlow2: 'rgba(177,32,35,0.08)',
    badgeBg: 'rgba(255,255,255,0.12)',
    badgeBorder: 'rgba(255,255,255,0.2)',
    badgeColor: '#93c5fd',
    titleColor: '#ffffff',
    subtitleColor: 'rgba(255,255,255,0.65)',
    featureIconBg: 'rgba(255,255,255,0.1)',
    featureIconBorder: 'rgba(255,255,255,0.15)',
    featureIconColor: '#93c5fd',
    featureTitle: '#ffffff',
    featureDesc: 'rgba(255,255,255,0.55)',
    rightBg: '#ffffff',
    rightGlow: 'rgba(1,50,78,0.02)',
    gridLine: 'rgba(1,50,78,0.03)',
    cardIconBg: 'linear-gradient(135deg, #01324e 0%, #013a5a 100%)',
    cardIconBorder: 'rgba(1,50,78,0.15)',
    cardIconGlow: 'linear-gradient(135deg, rgba(1,50,78,0.2), rgba(177,32,35,0.15))',
    cardIconColor: '#ffffff',
    cardTitle: '#01324e',
    cardSubtitle: '#64748b',
    errorBg: '#fef2f2',
    errorBorder: '#fecaca',
    errorColor: '#dc2626',
    labelColor: '#475569',
    inputBg: '#f8fafc',
    inputBgFocus: '#ffffff',
    inputBorder: '#e2e8f0',
    inputText: '#0f172a',
    inputPlaceholder: '#94a3b8',
    inputIcon: '#94a3b8',
    inputIconFocus: '#01324e',
    toggleColor: '#94a3b8',
    toggleHover: '#475569',
    footerBorder: '#e2e8f0',
    footerText: '#94a3b8',
    footerSecure: '#94a3b8',
    themeBtnBg: 'rgba(0,0,0,0.04)',
    themeBtnBorder: 'rgba(0,0,0,0.08)',
    themeBtnColor: '#64748b',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .admin-login-page * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
        }
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          overflow: hidden;
          transition: background 0.4s ease;
        }

        /* ── Left branding panel ── */
        .admin-login-left {
          flex: 1 1 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 5rem;
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        .admin-login-left::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, ${t.leftGlow1} 0%, transparent 70%);
          pointer-events: none;
        }
        .admin-login-left::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, ${t.leftGlow2} 0%, transparent 70%);
          pointer-events: none;
        }
        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 50px;
          padding: 0.5rem 1.2rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          width: fit-content;
          transition: all 0.4s ease;
        }
        .brand-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .brand-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 1rem;
          letter-spacing: -1.5px;
          transition: color 0.4s ease;
        }
        .brand-title span {
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-subtitle {
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 3.5rem;
          max-width: 420px;
          transition: color 0.4s ease;
        }
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          opacity: 0;
          transform: translateX(-20px);
          animation: slide-in 0.6s forwards;
        }
        .feature-item:nth-child(1) { animation-delay: 0.3s; }
        .feature-item:nth-child(2) { animation-delay: 0.5s; }
        .feature-item:nth-child(3) { animation-delay: 0.7s; }
        @keyframes slide-in {
          to { opacity: 1; transform: translateX(0); }
        }
        .feature-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.4s ease;
        }
        .feature-text h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0 0 0.2rem 0;
          transition: color 0.4s ease;
        }
        .feature-text p {
          font-size: 0.8rem;
          margin: 0;
          transition: color 0.4s ease;
        }

        /* ── Right login panel ── */
        .admin-login-right {
          flex: 1 1 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          position: relative;
          transition: background 0.4s ease;
        }
        .admin-login-right::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
          animation: card-float-up 0.8s 0.2s forwards;
        }
        @keyframes card-float-up {
          to { opacity: 1; transform: translateY(0); }
        }
        .login-card-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .login-icon-ring {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          position: relative;
          transition: all 0.4s ease;
        }
        .login-icon-ring::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 22px;
          z-index: -1;
          filter: blur(8px);
          opacity: 0.5;
        }
        .login-card-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.5px;
          transition: color 0.4s ease;
        }
        .login-card-header p {
          font-size: 0.9rem;
          margin: 0;
          transition: color 0.4s ease;
        }

        /* Error */
        .login-error {
          padding: 0.85rem 1.2rem;
          border-radius: 12px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          animation: shake 0.4s ease;
          transition: all 0.4s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        /* Form fields */
        .login-field {
          margin-bottom: 1.5rem;
        }
        .login-field label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: color 0.4s ease;
        }
        .login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .login-input-icon {
          position: absolute;
          left: 1rem;
          pointer-events: none;
          transition: color 0.3s;
        }
        .login-input {
          width: 100%;
          padding: 0.95rem 1rem 0.95rem 3rem;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 400;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s, color 0.3s;
        }
        .login-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.3s;
        }

        /* Submit button */
        .login-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        .login-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .login-submit:hover::before {
          opacity: 1;
        }
        .login-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(59,130,246,0.4);
        }
        .login-submit:active {
          transform: translateY(0);
        }
        .login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        .login-submit span {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        /* Spinner */
        .login-spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer */
        .login-footer {
          text-align: center;
          margin-top: 2.5rem;
          padding-top: 2rem;
        }
        .login-footer p {
          font-size: 0.8rem;
          margin: 0;
        }
        .login-footer .secure-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          margin-top: 0.7rem;
        }

        /* Grid lines decoration */
        .grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Theme toggle */
        .theme-toggle-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }
        .theme-toggle-btn:hover {
          transform: scale(1.08);
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .admin-login-page {
            flex-direction: column;
          }
          .admin-login-left {
            padding: 3rem 2rem;
            flex: none;
          }
          .brand-title {
            font-size: 2rem;
          }
          .feature-list {
            display: none;
          }
          .admin-login-right {
            flex: 1;
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div className="admin-login-page" style={{ background: t.pageBg }}>

        {/* ─── Left Panel ─── */}
        <div className="admin-login-left" style={{ background: t.leftBg }}>
          <div className="grid-lines" style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="brand-badge" style={{ background: t.badgeBg, border: `1px solid ${t.badgeBorder}`, color: t.badgeColor }}>
            <span className="dot" style={{ background: t.badgeColor }} />
            Secure Admin Portal
          </div>

          <h1 className="brand-title" style={{ color: t.titleColor }}>
            Welcome to<br />
            TIIS <span>Admin</span>
          </h1>

          <p className="brand-subtitle" style={{ color: t.subtitleColor }}>
            Access the centralized management console to oversee content, analytics, applications, and team operations.
          </p>

          <div className="feature-list">
            {features.map((f, i) => (
              <div className="feature-item" key={i}>
                <div className="feature-icon-wrap" style={{ background: t.featureIconBg, border: `1px solid ${t.featureIconBorder}`, color: t.featureIconColor }}>
                  <f.icon size={22} />
                </div>
                <div className="feature-text">
                  <h4 style={{ color: t.featureTitle }}>{f.title}</h4>
                  <p style={{ color: t.featureDesc }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right Panel ─── */}
        <div className="admin-login-right" style={{ background: t.rightBg }}>
          <div className="grid-lines" style={{
            backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          {/* Theme Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: t.themeBtnBg,
              border: `1px solid ${t.themeBtnBorder}`,
              color: t.themeBtnColor,
            }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="login-card">
            <div className="login-card-header">
              <div className="login-icon-ring" style={{ background: t.cardIconBg, border: `1px solid ${t.cardIconBorder}`, color: t.cardIconColor }}>
                <Shield size={28} />
              </div>
              <h2 style={{ color: t.cardTitle }}>Sign In</h2>
              <p style={{ color: t.cardSubtitle }}>Enter your credentials to continue</p>
            </div>

            {error && (
              <div className="login-error" style={{ background: t.errorBg, border: `1px solid ${t.errorBorder}`, color: t.errorColor }}>
                <Lock size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="login-field">
                <label htmlFor="admin-email" style={{ color: t.labelColor }}>Email Address</label>
                <div className="login-input-wrap">
                  <Mail size={18} className="login-input-icon" style={{ color: t.inputIcon }} />
                  <input
                    id="admin-email"
                    className="login-input"
                    type="email"
                    required
                    placeholder="admin@tiis.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    style={{
                      background: t.inputBg,
                      border: `1.5px solid ${t.inputBorder}`,
                      color: t.inputText,
                    }}
                    onFocus={(e) => { e.target.style.background = t.inputBgFocus; e.target.style.borderColor = '#3b82f6'; }}
                    onBlur={(e) => { e.target.style.background = t.inputBg; e.target.style.borderColor = t.inputBorder; }}
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="admin-password" style={{ color: t.labelColor }}>Password</label>
                <div className="login-input-wrap">
                  <Lock size={18} className="login-input-icon" style={{ color: t.inputIcon }} />
                  <input
                    id="admin-password"
                    className="login-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    style={{
                      paddingRight: '3rem',
                      background: t.inputBg,
                      border: `1.5px solid ${t.inputBorder}`,
                      color: t.inputText,
                    }}
                    onFocus={(e) => { e.target.style.background = t.inputBgFocus; e.target.style.borderColor = '#3b82f6'; }}
                    onBlur={(e) => { e.target.style.background = t.inputBg; e.target.style.borderColor = t.inputBorder; }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{ color: t.toggleColor }}
                    onMouseEnter={(e) => e.currentTarget.style.color = t.toggleHover}
                    onMouseLeave={(e) => e.currentTarget.style.color = t.toggleColor}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit" disabled={loading}>
                <span>
                  {loading ? (
                    <>
                      <div className="login-spinner" />
                      Authenticating…
                    </>
                  ) : (
                    <>
                      Access Dashboard
                      <ArrowRight size={18} />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="login-footer" style={{ borderTop: `1px solid ${t.footerBorder}` }}>
              <p style={{ color: t.footerText }}>Authorized personnel only</p>
              <div className="secure-badge" style={{ color: t.footerSecure }}>
                <Shield size={12} />
                256-bit SSL encrypted connection
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminLogin;
