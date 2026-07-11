import React from 'react';
import {
  Chart as ChartJS, ArcElement, CategoryScale, LinearScale,
  LineElement, PointElement, Filler, Tooltip, Legend
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { Leaf, Zap, Droplets, Recycle } from 'lucide-react';
import { sustainabilityMetrics, wasteData, energyData } from '../data/mockData';

ChartJS.register(ArcElement, CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend);

const ICONS = [Leaf, Zap, Recycle, Droplets];

export default function Sustainability() {
  const score = 87;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Sustainability Center</h1>
        <p>Green stadium initiative — FIFA World Cup 2026 carbon-neutral commitment</p>
      </div>

      {/* Score Banner */}
      <div className="sustain-banner animate-fade-in">
        <div className="sustain-score">
          <div className="sustain-score__ring">
            <svg viewBox="0 0 120 120" width="120" height="120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10"/>
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${score / 100 * 314} 314`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="sustain-score__center">
              <span className="sustain-score__value">{score}</span>
              <span className="sustain-score__label">/100</span>
            </div>
          </div>
        </div>
        <div className="sustain-banner__content">
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>Sustainability Score: Excellent</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
            FIFA World Cup 2026 is on track to achieve carbon neutrality. Current performance exceeds the 85-point target by 2 points.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            {['🌱 Carbon Offset: 120 tons', '⚡ Solar: 73% energy', '♻️ Recycled: 91% waste'].map(label => (
              <span key={label} className="sustain-badge">{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        {sustainabilityMetrics.map((m, i) => {
          const Icon = ICONS[i];
          const pct = Math.round(m.value / m.target * 100);
          const onTrack = m.value >= m.target;
          return (
            <div key={i} className={`card animate-fade-in delay-${i+1}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, background: m.color + '18', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={m.color} />
                </div>
                <span className={`badge ${onTrack ? 'badge-success' : 'badge-warning'}`}>
                  {onTrack ? '✓ On Track' : '↑ Below Target'}
                </span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.color }}>{m.value}{m.unit}</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{m.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>Target: {m.target}{m.unit}</div>
              <div className="progress-bar" style={{ marginTop: 10 }}>
                <div className="progress-fill" style={{ width: `${Math.min(m.value, 100)}%`, background: m.color }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid-2">
        {/* Waste Doughnut */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">♻️ Waste Management Breakdown</h3>
            <span className="badge badge-success">91% Diverted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ width: 180, flex: '0 0 180px' }}>
              <Doughnut
                data={wasteData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
                  },
                  cutout: '65%',
                }}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {wasteData.labels.map((label, i) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8375rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: wasteData.datasets[0].backgroundColor[i] }} />
                    {label}
                  </div>
                  <strong style={{ fontSize: '0.875rem' }}>{wasteData.datasets[0].data[i]}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Energy Line Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">⚡ Energy Usage — Solar vs Grid</h3>
            <span className="badge badge-primary">Live Data</span>
          </div>
          <div style={{ height: 220 }}>
            <Line
              data={energyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true, position: 'top', labels: { font: { size: 11 }, color: '#6B7280', boxWidth: 12, padding: 16 } },
                  tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9CA3AF' } },
                  y: { grid: { color: '#F3F4F6' }, ticks: { font: { size: 11 }, color: '#9CA3AF' } },
                }
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .sustain-banner {
          display: flex; align-items: center; gap: 32px;
          padding: 28px 32px;
          background: linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-xl);
        }
        .sustain-score { position: relative; }
        .sustain-score__ring { position: relative; width: 120px; height: 120px; }
        .sustain-score__center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .sustain-score__value { font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; }
        .sustain-score__label { font-size: 0.8rem; color: rgba(255,255,255,0.7); }
        .sustain-banner__content { flex: 1; }
        .sustain-badge {
          padding: 5px 12px;
          background: rgba(255,255,255,0.15);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          color: #fff;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
