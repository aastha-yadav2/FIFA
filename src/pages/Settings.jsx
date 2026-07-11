import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Bell, Globe, Moon, LogOut, Save, CheckCircle } from 'lucide-react';

export default function Settings() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const [notifs, setNotifs] = useState({
    crowdAlerts: true, incidents: true, voluntary: false, transport: true, sustainability: false
  });
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [theme, setTheme]       = useState('light');
  const [saved, setSaved]       = useState(false);

  const handleSave = () => {
    i18n.changeLanguage(language);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const initials = currentUser?.displayName
    ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>{t('settings.title')}</h1>
        <p>{t('settings.sub')}</p>
      </div>

      <div className="settings-layout">
        {/* Profile */}
        <div className="card animate-fade-in delay-1">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <User size={18} color="var(--primary)" />
              <h3 className="card-title">Profile</h3>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
            <div style={{
              width: 72, height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>{currentUser?.displayName || 'Admin User'}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{currentUser?.email}</div>
              <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, marginTop: 4 }}>
                {currentUser?.role || 'Stadium Operations Manager'}
              </div>
            </div>
          </div>
          <div className="settings-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="input-display-name">Display Name</label>
              <input id="input-display-name" className="form-control" defaultValue={currentUser?.displayName || ''} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-email">Email</label>
              <input id="input-email" className="form-control" defaultValue={currentUser?.email || ''} type="email" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-role">Role</label>
              <select id="input-role" className="form-control" defaultValue="ops-manager">
                <option value="ops-manager">Operations Manager</option>
                <option value="security-chief">Security Chief</option>
                <option value="volunteer-coord">Volunteer Coordinator</option>
                <option value="sustainability-lead">Sustainability Lead</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-stadium">Assigned Stadium</label>
              <select id="input-stadium" className="form-control">
                <option>SoFi Stadium, Los Angeles</option>
                <option>MetLife Stadium, New York</option>
                <option>AT&T Stadium, Dallas</option>
                <option>Levi's Stadium, San Francisco</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card animate-fade-in delay-2">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bell size={18} color="var(--primary)" />
              <h3 className="card-title">Notification Preferences</h3>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { key: 'crowdAlerts',    label: 'Crowd Density Alerts',       desc: 'Notify when zones exceed 80% capacity' },
              { key: 'incidents',      label: 'Incident Reports',            desc: 'New incidents and status updates' },
              { key: 'voluntary',      label: 'Volunteer Updates',           desc: 'Shift changes and zone assignments' },
              { key: 'transport',      label: 'Transportation Disruptions',  desc: 'Metro delays and parking alerts' },
              { key: 'sustainability', label: 'Sustainability Reports',       desc: 'Daily sustainability score updates' },
            ].map(n => (
              <div key={n.key} className="settings-notif-row">
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{n.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>{n.desc}</div>
                </div>
                <button
                  className={`settings-toggle ${notifs[n.key] ? 'settings-toggle--on' : ''}`}
                  onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                  id={`toggle-notif-${n.key}`}
                  role="switch"
                  aria-checked={notifs[n.key]}
                >
                  <span className="settings-toggle__thumb" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Language & Theme */}
        <div className="card animate-fade-in delay-3">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Globe size={18} color="var(--primary)" />
              <h3 className="card-title">Language & Appearance</h3>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="select-language">Interface Language</label>
                <select id="select-language" className="form-control" value={language}
                  onChange={e => setLanguage(e.target.value)}>
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="ar">🇸🇦 العربية</option>
                  <option value="pt">🇵🇹 Português</option>
                  <option value="de">🇩🇪 Deutsch</option>
                </select>
            </div>
            <div>
              <div className="form-label" style={{ marginBottom: 10 }}>
                <Moon size={14} style={{ display: 'inline', marginRight: 6 }} />Theme
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['light', 'dark', 'auto'].map(t => (
                  <button
                    key={t}
                    className={`settings-theme-btn ${theme === t ? 'settings-theme-btn--active' : ''}`}
                    onClick={() => setTheme(t)}
                    id={`btn-theme-${t}`}
                  >
                    {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '🖥️'} {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card animate-fade-in delay-4">
          <div className="card-header">
            <h3 className="card-title">Account Actions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              id="btn-save-settings"
              style={{ justifyContent: 'center' }}
            >
              {saved ? <><CheckCircle size={16} /> {t('settings.saved')}</> : <><Save size={16} /> {t('settings.save')}</>}
            </button>
            <div className="divider" />
            <button
              className="btn btn-danger"
              onClick={handleSignOut}
              id="btn-settings-signout"
              style={{ justifyContent: 'center' }}
            >
              <LogOut size={16} /> {t('settings.signOut')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .settings-layout { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); }
        .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }

        .settings-notif-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .settings-notif-row:last-child { border-bottom: none; padding-bottom: 0; }

        .settings-toggle {
          width: 44px; height: 24px;
          border-radius: var(--radius-full);
          background: var(--surface-dim);
          border: 1.5px solid var(--border);
          position: relative;
          transition: all var(--transition-base);
          flex-shrink: 0;
          cursor: pointer;
        }
        .settings-toggle--on { background: var(--primary); border-color: var(--primary); }
        .settings-toggle__thumb {
          position: absolute;
          top: 2px; left: 2px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform var(--transition-base);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .settings-toggle--on .settings-toggle__thumb { transform: translateX(20px); }

        .settings-theme-btn {
          flex: 1;
          padding: 10px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border);
          background: var(--surface-variant);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .settings-theme-btn:hover { border-color: var(--primary); color: var(--primary); }
        .settings-theme-btn--active {
          border-color: var(--primary);
          background: var(--primary-surface);
          color: var(--primary);
          font-weight: 700;
        }

        @media (max-width: 1024px) { .settings-layout { grid-template-columns: 1fr; } }
        @media (max-width: 640px)  { .settings-grid  { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
