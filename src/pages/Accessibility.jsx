import React, { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { accessibilityServices } from '../data/mockData';

export default function Accessibility() {
  const [requested, setRequested] = useState({});
  const [toast, setToast] = useState(null);

  const handleRequest = svc => {
    setRequested(prev => ({ ...prev, [svc.id]: true }));
    setToast(`${svc.name} request sent! A staff member will assist you shortly.`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Accessibility Services</h1>
        <p>Inclusive fan experience — FIFA World Cup 2026</p>
      </div>

      {/* Header Banner */}
      <div className="access-banner">
        <div className="access-banner__icon">♿</div>
        <div>
          <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>Accessibility First Stadium</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
            All services are complimentary. Staff are available 24/7 to assist fans with any accessibility needs.
          </p>
        </div>
        <div className="access-banner__stat">
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>100%</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>ADA Compliant</div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        {accessibilityServices.map((svc, i) => (
          <div key={svc.id} className={`access-card animate-fade-in delay-${i + 1}`}>
            <div className="access-card__icon" style={{ background: svc.color + '15', color: svc.color }}>
              <span style={{ fontSize: '1.75rem' }}>{svc.icon}</span>
            </div>
            <h3 className="access-card__title">{svc.name}</h3>
            <p className="access-card__desc">{svc.description}</p>
            <div className="access-card__footer">
              <div className="access-card__avail">
                <Clock size={12} color="var(--success)" />
                <span>{svc.available} available</span>
              </div>
              {requested[svc.id] ? (
                <button className="btn btn-sm" disabled style={{ background: 'var(--success-surface)', color: 'var(--success)' }}>
                  <CheckCircle size={12} /> Requested
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleRequest(svc)}
                  id={`btn-request-${svc.id}`}
                >
                  Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Routes Map Placeholder */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🗺️ Accessible Routes & Facilities</h3>
          <span className="badge badge-success">All Routes Clear</span>
        </div>
        <div className="access-map-placeholder">
          <div className="access-map-legend">
            {[
              { color: '#1565C0', label: 'Wheelchair Routes' },
              { color: '#2E7D32', label: 'Elevator Access' },
              { color: '#F57F17', label: 'Quiet Zones' },
              { color: '#7B1FA2', label: 'Assistance Points' },
            ].map(item => (
              <div key={item.label} className="access-map-legend-item">
                <div className="access-map-dot" style={{ background: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="access-map-visual">
            {/* Stadium schematic */}
            <svg viewBox="0 0 400 300" style={{ width: '100%', maxHeight: 260 }}>
              <ellipse cx="200" cy="150" rx="180" ry="130" fill="#F5F7FA" stroke="#D1D5DB" strokeWidth="2"/>
              <ellipse cx="200" cy="150" rx="100" ry="70" fill="#4CAF50" stroke="#fff" strokeWidth="1"/>
              {/* Accessible paths */}
              <path d="M200 20 L200 80" stroke="#1565C0" strokeWidth="4" strokeDasharray="8,4" strokeLinecap="round"/>
              <path d="M200 220 L200 280" stroke="#1565C0" strokeWidth="4" strokeDasharray="8,4" strokeLinecap="round"/>
              <path d="M20 150 L100 150" stroke="#1565C0" strokeWidth="4" strokeDasharray="8,4" strokeLinecap="round"/>
              <path d="M300 150 L380 150" stroke="#1565C0" strokeWidth="4" strokeDasharray="8,4" strokeLinecap="round"/>
              {/* Elevator icons */}
              {[[200,20],[200,280],[20,150],[380,150]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="10" fill="#2E7D32"/>
              ))}
              {/* Quiet zones */}
              <circle cx="340" cy="50" r="16" fill="#F57F17" opacity="0.7"/>
              <circle cx="60" cy="50" r="16" fill="#F57F17" opacity="0.7"/>
              {/* Assistance points */}
              {[[200,150],[120,150],[280,150]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="8" fill="#7B1FA2"/>
              ))}
              <text x="200" y="154" textAnchor="middle" fontSize="10" fill="white">♿</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <div className="toast" style={{ background: 'var(--success)', gap: 10 }}>
            <CheckCircle size={18} />
            {toast}
          </div>
        </div>
      )}

      <style>{`
        .access-banner {
          display: flex; align-items: center; gap: 20px;
          padding: 20px 24px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-xl);
        }
        .access-banner__icon { font-size: 2.5rem; }
        .access-banner__stat { margin-left: auto; text-align: center; color: #fff; }

        .access-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: var(--space-lg);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          transition: all var(--transition-base);
        }
        .access-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
        .access-card__icon {
          width: 60px; height: 60px;
          border-radius: var(--radius-xl);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px;
        }
        .access-card__title { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
        .access-card__desc  { font-size: 0.8375rem; color: var(--text-secondary); line-height: 1.5; flex: 1; }
        .access-card__footer { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
        .access-card__avail { display: flex; align-items: center; gap: 5px; font-size: 0.75rem; color: var(--success); font-weight: 500; }

        .access-map-placeholder { display: grid; grid-template-columns: 200px 1fr; gap: 24px; align-items: center; }
        .access-map-legend { display: flex; flex-direction: column; gap: 12px; }
        .access-map-legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.8125rem; }
        .access-map-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
        .access-map-visual { flex: 1; }

        @media (max-width: 768px) {
          .access-map-placeholder { grid-template-columns: 1fr; }
          .access-map-legend { flex-direction: row; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
