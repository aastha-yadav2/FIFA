import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trophy, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('admin');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const ROLE_OPTIONS = [
    { value: 'admin',     label: '🛡️ Operations Manager', desc: 'Full access to all modules' },
    { value: 'security',  label: '🔒 Security Officer',   desc: 'Crowd, incidents & AI' },
    { value: 'volunteer', label: '🟢 Volunteer',          desc: 'Dashboard, navigation & AI' },
  ];

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle(role);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmail(email, password, role);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-page__bg">
        <div className="login-page__orb login-page__orb--1" />
        <div className="login-page__orb login-page__orb--2" />
      </div>

      {/* Back to Landing */}
      <button
        className="login-page__back"
        onClick={() => navigate('/')}
        id="btn-login-back"
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

      {/* Card */}
      <div className="login-card glass-dark animate-scale-in">
        {/* Header */}
        <div className="login-card__header">
          <div className="login-card__logo">
            <Trophy size={28} color="#64B5F6" />
          </div>
          <h1 className="login-card__title">Welcome Back</h1>
          <p className="login-card__subtitle">Sign in to StadiumMind AI Operations Center</p>
        </div>

        {/* Error */}
        {error && (
          <div className="login-card__error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Role Selector */}
        <div className="login-card__roles">
          <p className="login-card__roles-label">Select your role</p>
          <div className="login-card__roles-grid">
            {ROLE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`login-card__role-btn ${role === opt.value ? 'active' : ''}`}
                onClick={() => setRole(opt.value)}
                id={`btn-role-${opt.value}`}
              >
                <span className="login-card__role-name">{opt.label}</span>
                <span className="login-card__role-desc">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Google Button */}
        <button
          className="login-card__google-btn"
          onClick={handleGoogle}
          disabled={loading}
          id="btn-google-signin"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Signing in…' : 'Continue with Google'}
        </button>

        <div className="login-card__divider">
          <span>or sign in with email</span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmail} className="login-card__form">
          <div className="form-group">
            <label className="form-label" htmlFor="input-email">Email Address</label>
            <div className="login-card__input-wrap">
              <Mail size={16} className="login-card__input-icon" />
              <input
                id="input-email"
                type="email"
                className="form-control login-card__input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="input-password">Password</label>
            <div className="login-card__input-wrap">
              <Lock size={16} className="login-card__input-icon" />
              <input
                id="input-password"
                type={showPwd ? 'text' : 'password'}
                className="form-control login-card__input"
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-card__eye-btn"
                onClick={() => setShowPwd(!showPwd)}
                id="btn-toggle-password"
                tabIndex={-1}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            id="btn-email-signin"
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            {loading ? (
              <span className="animate-spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
            ) : 'Sign In to Operations Center'}
          </button>
        </form>

        <p className="login-card__demo-note">
          💡 <strong>Demo:</strong> Select a role, then use any email with 6+ char password — or click Google to sign in instantly.
        </p>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060D1F;
          position: relative;
          padding: 24px;
        }
        .login-page__bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .login-page__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
        }
        .login-page__orb--1 {
          width: 500px; height: 500px;
          background: radial-gradient(#1565C0, transparent);
          top: -200px; left: -200px;
        }
        .login-page__orb--2 {
          width: 400px; height: 400px;
          background: radial-gradient(#00ACC1, transparent);
          bottom: -150px; right: -150px;
        }
        .login-page__back {
          position: absolute;
          top: 24px; left: 24px;
          display: flex; align-items: center; gap: 8px;
          color: #64748B;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        .login-page__back:hover { color: #94A3B8; }

        .login-card {
          width: 100%;
          max-width: 420px;
          border-radius: var(--radius-xl);
          padding: 36px;
          position: relative;
          z-index: 1;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        .login-card__header { text-align: center; margin-bottom: 28px; }
        .login-card__logo {
          width: 60px; height: 60px;
          background: rgba(30,136,229,0.15);
          border: 1px solid rgba(30,136,229,0.3);
          border-radius: var(--radius-xl);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .login-card__title {
          font-size: 1.625rem;
          font-weight: 800;
          color: #F1F5F9;
          margin-bottom: 6px;
        }
        .login-card__subtitle { font-size: 0.875rem; color: #64748B; }

        .login-card__error {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 14px;
          background: rgba(198,40,40,0.12);
          border: 1px solid rgba(198,40,40,0.2);
          border-radius: var(--radius-md);
          color: #EF9A9A;
          font-size: 0.875rem;
          margin-bottom: 20px;
        }

        .login-card__google-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          color: #E2E8F0;
          font-size: 0.9375rem;
          font-weight: 600;
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .login-card__google-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }
        .login-card__google-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .login-card__divider {
          display: flex; align-items: center; gap: 16px;
          margin: 24px 0;
          color: #334155;
          font-size: 0.8125rem;
        }
        .login-card__divider::before, .login-card__divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .login-card__form { display: flex; flex-direction: column; gap: 16px; }
        .login-card__form .form-label { color: #94A3B8; }
        .login-card__form .form-control {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.1);
          color: #E2E8F0;
          padding-left: 40px;
        }
        .login-card__form .form-control::placeholder { color: #475569; }
        .login-card__form .form-control:focus {
          border-color: rgba(30,136,229,0.5);
          box-shadow: 0 0 0 3px rgba(30,136,229,0.12);
          background: rgba(30,136,229,0.05);
        }

        .login-card__input-wrap { position: relative; }
        .login-card__input-icon {
          position: absolute;
          left: 12px; top: 50%;
          transform: translateY(-50%);
          color: #475569;
          pointer-events: none;
        }
        .login-card__input { padding-left: 40px !important; }
        .login-card__eye-btn {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          color: #475569;
          display: flex; align-items: center;
          transition: color var(--transition-fast);
        }
        .login-card__eye-btn:hover { color: #94A3B8; }

        .login-card__demo-note {
          margin-top: 20px;
          padding: 12px;
          background: rgba(0,172,193,0.08);
          border: 1px solid rgba(0,172,193,0.15);
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          color: #64748B;
          text-align: center;
          line-height: 1.5;
        }
        .login-card__demo-note strong { color: #26C6DA; }
        .login-card__roles { margin-bottom: 20px; }
        .login-card__roles-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #64748B;
          margin-bottom: 10px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .login-card__roles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .login-card__role-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 10px 6px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          color: #94A3B8;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: inherit;
        }
        .login-card__role-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(30,136,229,0.3);
          color: #E2E8F0;
        }
        .login-card__role-btn.active {
          background: rgba(30,136,229,0.15);
          border-color: rgba(30,136,229,0.5);
          color: #90CAF9;
        }
        .login-card__role-name { font-size: 0.75rem; font-weight: 600; }
        .login-card__role-desc { font-size: 0.65rem; opacity: 0.6; text-align: center; line-height: 1.3; }
      `}</style>
    </div>
  );
}
