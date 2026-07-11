import React from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, Filler, Title, Tooltip, Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { visitorAnalytics, peakHoursData } from '../data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Title, Tooltip, Legend);

const EXEC_KPIS = [
  { label: 'Total Match Day Fans', value: '68,420', change: '+12%', up: true, icon: Users, color: 'var(--primary)' },
  { label: 'Avg Entry Time',        value: '4.2 min', change: '-16%', up: true, icon: Clock, color: 'var(--success)' },
  { label: 'NPS Score',             value: '78/100',  change: '+5pts',up: true, icon: Award, color: 'var(--accent)' },
  { label: 'Revenue / Fan',         value: '$47.20',  change: '+8%',  up: true, icon: TrendingUp, color: 'var(--warning)' },
];

const CHART_BASE = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9CA3AF' } },
    y: { grid: { color: '#F3F4F6' }, ticks: { font: { size: 11 }, color: '#9CA3AF' } },
  },
};

export default function Analytics() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Analytics & Insights</h1>
        <p>Tournament intelligence dashboard — FIFA World Cup 2026</p>
      </div>

      {/* Executive KPIs */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        {EXEC_KPIS.map((kpi, i) => (
          <div key={i} className={`card animate-fade-in delay-${i+1}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, background: kpi.color + '18', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <kpi.icon size={20} color={kpi.color} />
              </div>
              <span
                className="badge"
                style={{
                  background: kpi.up ? 'var(--success-surface)' : 'var(--error-surface)',
                  color: kpi.up ? 'var(--success)' : 'var(--error)'
                }}
              >
                {kpi.change}
              </span>
            </div>
            <div style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>{kpi.value}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: 4 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Visitor Analytics */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="card animate-fade-in delay-2">
          <div className="card-header">
            <h3 className="card-title">🌍 Visitor Analytics by Match Day</h3>
            <span className="badge badge-primary">6 Match Days</span>
          </div>
          <div style={{ height: 260 }}>
            <Bar
              data={visitorAnalytics}
              options={{
                ...CHART_BASE,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: { font: { size: 11 }, color: '#6B7280', boxWidth: 12, padding: 16 }
                  }
                },
              }}
            />
          </div>
        </div>

        <div className="card animate-fade-in delay-3">
          <div className="card-header">
            <h3 className="card-title">⏰ Peak Activity Index</h3>
            <span className="badge badge-warning">Peak at 17:00–18:00</span>
          </div>
          <div style={{ height: 260 }}>
            <Line
              data={peakHoursData}
              options={{
                ...CHART_BASE,
                fill: true,
                plugins: { ...CHART_BASE.plugins, tooltip: { mode: 'index', intersect: false } },
              }}
            />
          </div>
        </div>
      </div>

      {/* Demographic & Queue Analysis */}
      <div className="grid-2">
        <div className="card animate-fade-in delay-4">
          <div className="card-header">
            <h3 className="card-title">🌐 Fan Demographics</h3>
            <span className="badge badge-neutral">Match Day 6</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'USA', pct: 38, flag: '🇺🇸', count: '25,998' },
              { label: 'Mexico', pct: 22, flag: '🇲🇽', count: '15,051' },
              { label: 'Morocco', pct: 14, flag: '🇲🇦', count: '9,578' },
              { label: 'Portugal', pct: 12, flag: '🇵🇹', count: '8,210' },
              { label: 'Brazil', pct: 8, flag: '🇧🇷', count: '5,473' },
              { label: 'Other', pct: 6, flag: '🌍', count: '4,110' },
            ].map(d => (
              <div key={d.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{d.flag} {d.label}</span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{d.count}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{d.pct}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${d.pct}%`, background: 'var(--primary-light)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card animate-fade-in delay-4">
          <div className="card-header">
            <h3 className="card-title">⏱️ Queue & Wait Analysis</h3>
            <span className="badge badge-neutral">Real-time</span>
          </div>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table className="table">
              <thead>
                <tr><th>Gate</th><th>Current Wait</th><th>Trend</th><th>Recommendation</th></tr>
              </thead>
              <tbody>
                {[
                  { gate: 'A', wait: '3.2 min', trend: '↓', rec: 'Optimal',         ok: true },
                  { gate: 'B', wait: '15.6 min', trend: '↑', rec: 'Add 2 staff',    ok: false },
                  { gate: 'C', wait: '22.1 min', trend: '↑↑', rec: 'Reroute fans',  ok: false },
                  { gate: 'D', wait: '2.8 min', trend: '→', rec: 'Optimal',         ok: true },
                  { gate: 'E', wait: '9.4 min', trend: '↑', rec: 'Monitor closely', ok: false },
                  { gate: 'F', wait: '1.2 min', trend: '↓', rec: 'Accept rerouted', ok: true },
                ].map(r => (
                  <tr key={r.gate}>
                    <td><strong>Gate {r.gate}</strong></td>
                    <td style={{ fontWeight: 700, color: r.ok ? 'var(--success)' : 'var(--error)' }}>{r.wait}</td>
                    <td style={{ fontWeight: 800, color: r.ok ? 'var(--success)' : 'var(--error)' }}>{r.trend}</td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{r.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
