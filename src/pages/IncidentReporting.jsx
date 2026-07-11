import React, { useState } from 'react';
import { Plus, AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';
import { incidents } from '../data/mockData';

const PRIORITY_CONFIG = {
  high:   { bg: 'var(--error-surface)',   color: 'var(--error)',   label: 'HIGH' },
  medium: { bg: 'var(--warning-surface)', color: 'var(--warning)', label: 'MED' },
  low:    { bg: 'var(--info-surface)',     color: 'var(--info)',    label: 'LOW' },
};
const STATUS_CONFIG = {
  'open':        { bg: 'var(--error-surface)',   color: 'var(--error)',   icon: AlertCircle },
  'in-progress': { bg: 'var(--warning-surface)', color: 'var(--warning)', icon: Activity },
  'resolved':    { bg: 'var(--success-surface)', color: 'var(--success)', icon: CheckCircle },
};

let incidentCounter = 7;

export default function IncidentReporting() {
  const [allIncidents, setAll] = useState(incidents);
  const [form, setForm] = useState({ type: '', location: '', description: '', priority: 'medium' });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    incidentCounter++;
    const newInc = {
      ...form,
      id: `INC-2026-${String(incidentCounter).padStart(3, '0')}`,
      status: 'open',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAll(prev => [newInc, ...prev]);
    setForm({ type: '', location: '', description: '', priority: 'medium' });
    setSubmitted(true);
    setShowForm(false);
    setToast(`Incident ${newInc.id} reported successfully and assigned to response team.`);
    setTimeout(() => { setToast(null); setSubmitted(false); }, 4000);
  };

  const handleStatusChange = (id, newStatus) => {
    setAll(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const statsMap = { open: 0, 'in-progress': 0, resolved: 0 };
  allIncidents.forEach(i => { statsMap[i.status] = (statsMap[i.status] || 0) + 1; });

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Incident Reporting</h1>
          <p>Safety & security management — Match Day 6</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
          id="btn-new-incident"
        >
          <Plus size={16} /> Report Incident
        </button>
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        {[
          { key: 'open',        label: 'Open',        color: 'var(--error)',   icon: AlertCircle },
          { key: 'in-progress', label: 'In Progress',  color: 'var(--warning)', icon: Activity },
          { key: 'resolved',    label: 'Resolved',     color: 'var(--success)', icon: CheckCircle },
        ].map((s, i) => (
          <div key={s.key} className={`card animate-fade-in delay-${i+1}`} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 52, height: 52, background: s.color + '15', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={24} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{statsMap[s.key]}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>{s.label} Incidents</div>
            </div>
          </div>
        ))}
      </div>

      {/* Incident Form */}
      {showForm && (
        <div className="card animate-scale-in" style={{ marginBottom: 'var(--space-xl)', border: '2px solid var(--primary)', borderColor: 'rgba(30,136,229,0.3)' }}>
          <div className="card-header">
            <h3 className="card-title">🚨 Report New Incident</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)} id="btn-close-form">Cancel</button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="input-incident-type">Incident Type *</label>
              <select
                id="input-incident-type"
                className="form-control"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                required
              >
                <option value="">Select type…</option>
                {['Medical', 'Security', 'Fire', 'Crowd', 'Infrastructure', 'Weather', 'Technical', 'Other'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-incident-location">Location *</label>
              <input
                id="input-incident-location"
                className="form-control"
                placeholder="e.g., Section 114, Gate C"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-incident-priority">Priority Level *</label>
              <select
                id="input-incident-priority"
                className="form-control"
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
              >
                <option value="low">Low — Informational</option>
                <option value="medium">Medium — Requires Attention</option>
                <option value="high">High — Immediate Response</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label" htmlFor="input-incident-desc">Description *</label>
              <textarea
                id="input-incident-desc"
                className="form-control"
                placeholder="Describe the incident in detail…"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
                style={{ minHeight: 80 }}
              />
            </div>
            <div style={{ gridColumn: '1/-1', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-danger" id="btn-submit-incident">
                <AlertCircle size={16} /> Submit Incident Report
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Incidents Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📋 Active & Recent Incidents</h3>
          <span className="badge badge-neutral">{allIncidents.length} total</span>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Type</th><th>Location</th><th>Description</th><th>Priority</th><th>Status</th><th>Time</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {allIncidents.map(inc => {
                const p = PRIORITY_CONFIG[inc.priority] || PRIORITY_CONFIG.low;
                const s = STATUS_CONFIG[inc.status] || STATUS_CONFIG.open;
                const StatusIcon = s.icon;
                return (
                  <tr key={inc.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700 }}>{inc.id}</td>
                    <td>{inc.type}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{inc.location}</td>
                    <td style={{ maxWidth: 200, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      {inc.description.length > 60 ? inc.description.slice(0, 60) + '…' : inc.description}
                    </td>
                    <td>
                      <span className="badge" style={{ background: p.bg, color: p.color }}>
                        {p.label}
                      </span>
                    </td>
                    <td>
                      <span className="badge" style={{ background: s.bg, color: s.color }}>
                        <StatusIcon size={10} />
                        {inc.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inc.time}</td>
                    <td>
                      {inc.status !== 'resolved' && (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleStatusChange(inc.id, inc.status === 'open' ? 'in-progress' : 'resolved')}
                          id={`btn-inc-action-${inc.id}`}
                        >
                          {inc.status === 'open' ? 'Assign' : 'Resolve'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <div className="toast-container">
          <div className="toast" style={{ background: 'var(--success)' }}>
            <CheckCircle size={16} />{toast}
          </div>
        </div>
      )}
    </div>
  );
}
