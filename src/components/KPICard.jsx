import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ label, value, unit = '', change, up, icon: Icon, color = 'primary', delay = 0 }) {
  const colorMap = {
    primary: { bg: 'var(--primary-surface)', icon: 'var(--primary)', text: 'var(--primary-dark)' },
    accent:  { bg: '#E0F7FA',                icon: 'var(--accent)',   text: 'var(--accent-dark)' },
    success: { bg: 'var(--success-surface)', icon: 'var(--success)',  text: 'var(--success)' },
    warning: { bg: 'var(--warning-surface)', icon: 'var(--warning)',  text: '#E65100' },
    error:   { bg: 'var(--error-surface)',   icon: 'var(--error)',    text: 'var(--error)' },
  };
  const c = colorMap[color] || colorMap.primary;

  return (
    <div className={`kpi-card animate-fade-in delay-${delay}`}>
      <div className="kpi-card__header">
        <div className="kpi-card__icon-wrap" style={{ background: c.bg }}>
          {Icon && <Icon size={20} color={c.icon} strokeWidth={2} />}
        </div>
        <span
          className={`kpi-card__change ${up ? 'kpi-card__change--up' : 'kpi-card__change--down'}`}
        >
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </span>
      </div>
      <div className="kpi-card__value">
        {value}
        {unit && <span className="kpi-card__unit">{unit}</span>}
      </div>
      <div className="kpi-card__label">{label}</div>

      <style>{`
        .kpi-card {
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
          cursor: default;
        }
        .kpi-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .kpi-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }
        .kpi-card__icon-wrap {
          width: 44px; height: 44px;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
        }
        .kpi-card__change {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 9px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .kpi-card__change--up   { background: var(--success-surface); color: var(--success); }
        .kpi-card__change--down { background: var(--error-surface);   color: var(--error); }
        .kpi-card__value {
          font-size: 1.875rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .kpi-card__unit {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .kpi-card__label {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          margin-top: 6px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
