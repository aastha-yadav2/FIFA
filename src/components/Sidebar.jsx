import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, Bot, Map, Users2, ShieldAlert,
  Accessibility, Bus, Leaf, Users, FileWarning,
  BarChart3, Settings, ChevronLeft, ChevronRight,
  Trophy, LogOut, Wifi
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard',         icon: LayoutDashboard, key: 'dashboard' },
  { path: '/ai-assistant',      icon: Bot,              key: 'aiAssistant' },
  { path: '/navigation',        icon: Map,              key: 'navigation' },
  { path: '/crowd-monitoring',  icon: Users2,           key: 'crowdMonitor' },
  { path: '/accessibility',     icon: Accessibility,    key: 'accessibility' },
  { path: '/transportation',    icon: Bus,              key: 'transportation' },
  { path: '/sustainability',    icon: Leaf,             key: 'sustainability' },
  { path: '/volunteer-center',  icon: Users,            key: 'volunteers' },
  { path: '/incident-reporting',icon: FileWarning,      key: 'incidents' },
  { path: '/analytics',         icon: BarChart3,        key: 'analytics' },
  { path: '/settings',          icon: Settings,         key: 'settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const initials = currentUser?.displayName
    ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
        {/* Logo */}
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <Trophy size={22} color="#1E88E5" />
          </div>
          {!collapsed && (
            <div className="sidebar__logo-text">
              <span className="sidebar__logo-name">StadiumMind</span>
              <span className="sidebar__logo-sub">AI Platform</span>
            </div>
          )}
          <button
            className="sidebar__collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            id="btn-sidebar-toggle"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Live Indicator */}
        {!collapsed && (
          <div className="sidebar__live">
            <span className="status-dot online" />
            <span>Live Operations</span>
            <Wifi size={12} style={{ marginLeft: 'auto', opacity: 0.7 }} />
          </div>
        )}

        {/* Nav Items */}
        <nav className="sidebar__nav" role="navigation" aria-label="Main navigation">
          {NAV_ITEMS.map(({ path, icon: Icon, key }) => {
            const label = t(`nav.${key}`);
            return (
            <NavLink
              key={path}
              to={path}
              id={`nav-${key}`}
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={20} className="sidebar__nav-icon" />
              {!collapsed && <span className="sidebar__nav-label">{label}</span>}
            </NavLink>
          );
          })}
        </nav>

        {/* User Section */}
        <div className="sidebar__footer">
          <div className="sidebar__user" title={collapsed ? currentUser?.displayName : undefined}>
            <div className="sidebar__avatar">{initials}</div>
            {!collapsed && (
              <div className="sidebar__user-info">
                <span className="sidebar__user-name">{currentUser?.displayName || 'Admin'}</span>
                <span className="sidebar__user-role">{currentUser?.roleLabel || 'Operations'}</span>
              </div>
            )}
            {!collapsed && (
              <button
                className="sidebar__signout"
                onClick={handleSignOut}
                id="btn-sign-out"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
          {collapsed && (
            <button
              className="sidebar__signout sidebar__signout--center"
              onClick={handleSignOut}
              id="btn-sign-out-collapsed"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      <style>{`
        .sidebar {
          position: fixed;
          left: 0; top: 0; bottom: 0;
          width: var(--sidebar-width);
          background: var(--sidebar-bg);
          border-right: 1px solid var(--sidebar-border);
          display: flex;
          flex-direction: column;
          z-index: 200;
          transition: width var(--transition-base);
          overflow: hidden;
        }
        .sidebar--collapsed { width: var(--sidebar-collapsed); }

        .sidebar__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 16px;
          border-bottom: 1px solid var(--sidebar-border);
          min-height: var(--topbar-height);
        }
        .sidebar__logo-icon {
          width: 36px; height: 36px;
          background: rgba(30,136,229,0.15);
          border: 1px solid rgba(30,136,229,0.3);
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sidebar__logo-text { flex: 1; min-width: 0; }
        .sidebar__logo-name { display: block; font-size: 0.9375rem; font-weight: 700; color: #fff; }
        .sidebar__logo-sub  { display: block; font-size: 0.7rem; color: var(--sidebar-text); opacity: 0.7; }

        .sidebar__collapse-btn {
          width: 28px; height: 28px;
          border-radius: var(--radius-sm);
          background: var(--sidebar-hover);
          color: var(--sidebar-text);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .sidebar__collapse-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .sidebar__live {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          font-size: 0.72rem;
          color: var(--sidebar-text);
          border-bottom: 1px solid var(--sidebar-border);
          background: rgba(46,125,50,0.08);
        }

        .sidebar__nav {
          flex: 1;
          overflow-y: auto;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar__nav::-webkit-scrollbar { width: 0; }

        .sidebar__nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 10px;
          border-radius: var(--radius-sm);
          color: var(--sidebar-text);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          white-space: nowrap;
          overflow: hidden;
        }
        .sidebar__nav-item:hover {
          background: var(--sidebar-hover);
          color: #fff;
        }
        .sidebar__nav-item--active {
          background: var(--sidebar-active);
          color: var(--sidebar-active-text);
          font-weight: 600;
        }
        .sidebar__nav-item--active .sidebar__nav-icon { color: var(--sidebar-active-text); }
        .sidebar__nav-icon { flex-shrink: 0; }
        .sidebar__nav-label { overflow: hidden; text-overflow: ellipsis; }

        .sidebar__footer {
          padding: 12px 8px;
          border-top: 1px solid var(--sidebar-border);
        }
        .sidebar__user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: var(--radius-sm);
          cursor: default;
        }
        .sidebar__avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-light), var(--accent));
          color: #fff;
          font-size: 0.8125rem;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sidebar__user-info { flex: 1; min-width: 0; }
        .sidebar__user-name { display: block; font-size: 0.8rem; font-weight: 600; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sidebar__user-role { display: block; font-size: 0.7rem; color: var(--sidebar-text); }

        .sidebar__signout {
          width: 30px; height: 30px;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--sidebar-text);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }
        .sidebar__signout:hover { background: rgba(198,40,40,0.2); color: #EF9A9A; }
        .sidebar__signout--center { margin: 0 auto; display: flex; }
      `}</style>
    </>
  );
}
