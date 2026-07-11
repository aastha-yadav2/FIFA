import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, RefreshCw, Shield } from 'lucide-react';

const PAGE_TITLES = {
  '/dashboard':          { title: 'Operations Dashboard',    sub: 'FIFA World Cup 2026 · Live' },
  '/ai-assistant':       { title: 'AI Assistant',            sub: 'Powered by Gemini AI' },
  '/navigation':         { title: 'Stadium Navigation',      sub: 'Real-time wayfinding' },
  '/crowd-monitoring':   { title: 'Crowd Monitoring',        sub: 'Live density tracking' },
  '/accessibility':      { title: 'Accessibility Services',  sub: 'Inclusive fan experience' },
  '/transportation':     { title: 'Transportation Hub',      sub: 'Parking, metro & buses' },
  '/sustainability':     { title: 'Sustainability Center',   sub: 'Green stadium initiative' },
  '/volunteer-center':   { title: 'Volunteer Center',        sub: 'Team coordination' },
  '/incident-reporting': { title: 'Incident Reporting',      sub: 'Safety & security' },
  '/analytics':          { title: 'Analytics & Insights',    sub: 'Tournament intelligence' },
  '/settings':           { title: 'Settings',                sub: 'Account & preferences' },
};

export default function TopBar({ sidebarCollapsed }) {
  const location = useLocation();
  const info = PAGE_TITLES[location.pathname] || { title: 'StadiumMind AI', sub: '' };
  const [notifications, setNotifications] = useState(7);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className={`topbar ${sidebarCollapsed ? 'topbar--collapsed' : ''}`}>
        <div className="topbar__left">
          <div className="topbar__titles">
            <h1 className="topbar__title">{info.title}</h1>
            {info.sub && (
              <span className="topbar__sub">
                <span className="status-dot online" style={{ width: 6, height: 6 }} />
                {info.sub}
              </span>
            )}
          </div>
        </div>

        <div className="topbar__right">
          {/* Search */}
          <button
            className={`topbar__icon-btn ${searchOpen ? 'active' : ''}`}
            onClick={() => setSearchOpen(!searchOpen)}
            id="btn-topbar-search"
            aria-label="Open search"
          >
            <Search size={18} />
          </button>

          {/* Security Status */}
          <div className="topbar__security" title="Security Level: GREEN">
            <Shield size={14} color="#2E7D32" />
            <span>GREEN</span>
          </div>

          {/* Refresh */}
          <button
            className="topbar__icon-btn"
            id="btn-topbar-refresh"
            aria-label="Refresh data"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={18} />
          </button>

          {/* Notifications */}
          <button
            className="topbar__icon-btn"
            id="btn-topbar-notifications"
            aria-label={`${notifications} notifications`}
            onClick={() => setNotifications(0)}
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {notifications > 0 && (
              <span className="topbar__badge">{notifications}</span>
            )}
          </button>

          {/* Time */}
          <div className="topbar__time">
            <LiveTime />
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="topbar__search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="topbar__search-bar" onClick={e => e.stopPropagation()}>
            <Search size={18} color="var(--text-secondary)" />
            <input
              autoFocus
              type="text"
              placeholder="Search operations, incidents, volunteers…"
              id="input-global-search"
            />
          </div>
        </div>
      )}

      <style>{`
        .topbar {
          position: fixed;
          top: 0; right: 0;
          left: var(--sidebar-width);
          height: var(--topbar-height);
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-xl);
          z-index: 100;
          transition: left var(--transition-base);
          box-shadow: var(--shadow-sm);
        }
        .topbar--collapsed { left: var(--sidebar-collapsed); }

        .topbar__left { display: flex; align-items: center; gap: var(--space-md); }
        .topbar__titles { display: flex; flex-direction: column; }
        .topbar__title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .topbar__sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 1px;
        }

        .topbar__right {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .topbar__icon-btn {
          width: 38px; height: 38px;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-secondary);
          display: flex; align-items: center; justify-content: center;
          transition: all var(--transition-fast);
          position: relative;
        }
        .topbar__icon-btn:hover, .topbar__icon-btn.active {
          background: var(--surface-variant);
          color: var(--primary);
        }

        .topbar__badge {
          position: absolute;
          top: 4px; right: 4px;
          width: 17px; height: 17px;
          background: var(--error);
          color: #fff;
          font-size: 0.625rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid var(--surface);
        }

        .topbar__security {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: var(--success-surface);
          color: var(--success);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid rgba(46,125,50,0.2);
        }

        .topbar__time {
          padding: 4px 12px;
          background: var(--surface-variant);
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-variant-numeric: tabular-nums;
          min-width: 60px;
          text-align: center;
        }

        .topbar__search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 500;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 80px;
          backdrop-filter: blur(4px);
        }
        .topbar__search-bar {
          background: var(--surface);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: 14px 20px;
          width: min(600px, 90vw);
          animation: scaleIn var(--transition-fast) ease;
          border: 1px solid var(--border);
        }
        .topbar__search-bar input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          color: var(--text-primary);
          background: transparent;
        }
        .topbar__search-bar input::placeholder { color: var(--text-secondary); }
      `}</style>
    </>
  );
}

function LiveTime() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>;
}
