import React, { useState } from 'react';
import { Search, Bell, CheckCircle, Clock, Coffee } from 'lucide-react';
import { volunteers } from '../data/mockData';

const STATUS_CONFIG = {
  active:   { bg: 'var(--success-surface)',  color: 'var(--success)',  icon: '🟢' },
  standby:  { bg: 'var(--info-surface)',      color: 'var(--info)',     icon: '🔵' },
  break:    { bg: 'var(--warning-surface)',  color: 'var(--warning)',  icon: '🟡' },
  off:      { bg: 'var(--surface-dim)',       color: 'var(--text-secondary)', icon: '⚫' },
};

export default function VolunteerCenter() {
  const [search, setSearch]   = useState('');
  const [notified, setNotified] = useState({});
  const [toast, setToast]      = useState(null);

  const filtered = volunteers.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.zone.toLowerCase().includes(search.toLowerCase()) ||
    v.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleNotify = v => {
    setNotified(prev => ({ ...prev, [v.id]: true }));
    setToast(`Notification sent to ${v.name} — Zone ${v.zone}`);
    setTimeout(() => setToast(null), 3500);
  };

  const stats = [
    { icon: CheckCircle, label: 'Active',  value: volunteers.filter(v => v.status === 'active').length,  color: 'var(--success)' },
    { icon: Clock,       label: 'Standby', value: volunteers.filter(v => v.status === 'standby').length, color: 'var(--info)' },
    { icon: Coffee,      label: 'On Break',value: volunteers.filter(v => v.status === 'break').length,   color: 'var(--warning)' },
    { icon: Bell,        label: 'Total',   value: volunteers.length,                                      color: 'var(--primary)' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Volunteer Center</h1>
        <p>Team coordination — {volunteers.length} registered volunteers today</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        {stats.map((s, i) => (
          <div key={i} className={`card animate-fade-in delay-${i+1}`} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, background: s.color + '15', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={22} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Zone Assignment Cards */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        {[
          { zone: 'Entry Gates', count: 3, status: 'Full', color: 'var(--success)' },
          { zone: 'North & South Stand', count: 2, status: 'Full', color: 'var(--success)' },
          { zone: 'Medical & Emergency', count: 1, status: 'Understaffed', color: 'var(--error)' },
          { zone: 'VIP & Media', count: 2, status: 'Full', color: 'var(--success)' },
          { zone: 'Transportation', count: 1, status: 'Full', color: 'var(--success)' },
          { zone: 'Accessibility Aid', count: 1, status: 'Full', color: 'var(--success)' },
        ].map((zone, i) => (
          <div key={i} className={`card animate-fade-in delay-${i+1}`} style={{ display: 'flex', align: 'center', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>📍 {zone.zone}</span>
              <span className="badge" style={{ background: zone.color + '15', color: zone.color, flexShrink: 0 }}>
                {zone.status}
              </span>
            </div>
            <div style={{ marginTop: 10, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {zone.count} volunteer{zone.count > 1 ? 's' : ''} assigned
            </div>
            <div className="progress-bar" style={{ marginTop: 8 }}>
              <div className="progress-fill" style={{
                width: zone.status === 'Understaffed' ? '50%' : '100%',
                background: zone.color
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer Roster Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">👥 Volunteer Roster</h3>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                className="form-control"
                style={{ paddingLeft: 32, width: 220, height: 36 }}
                placeholder="Search name, zone, role…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="input-volunteer-search"
              />
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Zone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Shift</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => {
                const sc = STATUS_CONFIG[v.status] || STATUS_CONFIG.off;
                return (
                  <tr key={v.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{v.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
                          color: '#fff', fontWeight: 700, fontSize: '0.75rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {v.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span style={{ fontWeight: 600 }}>{v.name}</span>
                      </div>
                    </td>
                    <td>{v.zone}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{v.role}</td>
                    <td>
                      <span className="badge" style={{ background: sc.bg, color: sc.color }}>
                        {sc.icon} {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{v.shift}</td>
                    <td>
                      {notified[v.id] ? (
                        <span className="badge badge-success"><CheckCircle size={10} /> Notified</span>
                      ) : (
                        <button className="btn btn-ghost btn-sm" onClick={() => handleNotify(v)} id={`btn-notify-${v.id}`}>
                          <Bell size={12} /> Notify
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="empty-state" style={{ padding: 40 }}>
            <Search size={32} />
            <h3>No volunteers found</h3>
            <p>Try a different search term</p>
          </div>
        )}
      </div>

      {toast && (
        <div className="toast-container">
          <div className="toast"><Bell size={16} />{toast}</div>
        </div>
      )}
    </div>
  );
}
