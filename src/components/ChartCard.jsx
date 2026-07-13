import React from 'react';
import PropTypes from 'prop-types';

export default function ChartCard({ title, subtitle, children, controls, className = '' }) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">{title}</h3>
          {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
        </div>
        {controls && <div className="chart-card__controls">{controls}</div>}
      </div>
      <div className="chart-card__body">
        {children}
      </div>

      <style>{`
        .chart-card {
          background: var(--surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          padding: var(--space-lg);
          transition: box-shadow var(--transition-base);
        }
        .chart-card:hover { box-shadow: var(--shadow-md); }
        .chart-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
          gap: var(--space-md);
        }
        .chart-card__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .chart-card__subtitle {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          margin-top: 3px;
        }
        .chart-card__controls {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          flex-shrink: 0;
        }
        .chart-card__body {
          position: relative;
          min-height: 200px;
        }
      `}</style>
    </div>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  controls: PropTypes.node,
  className: PropTypes.string,
};
