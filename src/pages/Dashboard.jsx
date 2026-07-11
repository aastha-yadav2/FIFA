import React, { useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, Filler, Title, Tooltip, Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import {
  Users2, PercentCircle, Users, ShieldAlert,
  Clock, Leaf, Activity, Radio, Cpu, X, Loader2
} from 'lucide-react';
import { useRealTime } from '../context/RealTimeContext';
import { hourlyEntryData, crowdDensityData } from '../data/mockData';
import { generateOpsBrief } from '../lib/gemini';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Title, Tooltip, Legend);

const KPI_ICONS = {
  fans:       Users2,
  density:    PercentCircle,
  volunteers: Users,
  alerts:     ShieldAlert,
  queue:      Clock,
  sustain:    Leaf,
};

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9CA3AF' } },
    y: { grid: { color: '#F3F4F6' }, ticks: { font: { size: 11 }, color: '#9CA3AF' } },
  },
};

const LINE_OPTIONS = {
  ...CHART_OPTIONS,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: { font: { size: 11 }, color: '#6B7280', boxWidth: 12, padding: 16 }
    },
    tooltip: { mode: 'index', intersect: false }
  },
};

const SEVERITY_BG = {
  error:   '#FFEBEE', warning: '#FFF8E1',
  success: '#E8F5E9', info:    '#E1F5FE',
};
const SEVERITY_COLOR = {
  error:   '#C62828', warning: '#E65100',
  success: '#2E7D32', info:    '#0277BD',
};

export default function Dashboard() {
  const { kpis, feed, zones, gates, lastUpdate } = useRealTime();

  /* ── Ops Brief state ──────────────────────────────────── */
  const [briefOpen,    setBriefOpen]    = useState(false);
  const [briefContent, setBriefContent] = useState('');
  const [briefLoading, setBriefLoading] = useState(false);

  const buildCtx = useCallback(() => ({
    zones,
    gates,
    totalFans:    kpis.find(k => k.id === 'fans')?.value    || '68,420',
    alertCount:   kpis.find(k => k.id === 'alerts')?.value  || '7',
    sustainScore: kpis.find(k => k.id === 'sustain')?.value || '87',
    secLevel: 'GREEN',
  }), [zones, gates, kpis]);

  const handleOpsBrief = useCallback(async () => {
    setBriefOpen(true);
    if (briefContent && !briefLoading) return; // already loaded, just re-open
    setBriefLoading(true);
    try {
      const text = await generateOpsBrief(buildCtx());
      setBriefContent(text);
    } finally {
      setBriefLoading(false);
    }
  }, [briefContent, briefLoading, buildCtx]);

  const refreshBrief = useCallback(async () => {
    setBriefLoading(true);
    setBriefContent('');
    try {
      const text = await generateOpsBrief(buildCtx());
      setBriefContent(text);
    } finally {
      setBriefLoading(false);
    }
  }, [buildCtx]);

  return (
    <div className="animate-fade-in">
      {/* Live ticker */}
      <div className="ticker-wrap">
        <div className="ticker-label"><Radio size={12} /> LIVE</div>
        <div className="ticker-content">
          <span>⚽ Morocco vs Portugal — Match Day 6 · 68,420 fans on site</span>
          <span>🚨 Gate C crowd density critical — AI rerouting active</span>
          <span>♻️ Sustainability score: 87/100 — Above target</span>
          <span>🚌 Metro Line 2 delayed 12 min — Alternative routes suggested</span>
        </div>
      </div>

      {/* Ops Brief Trigger */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-md)' }}>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleOpsBrief}
          id="btn-ops-brief"
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Cpu size={14} /> Generate Ops Brief
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        {kpis.map((kpi, i) => (
          <KPICard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            change={kpi.change}
            up={kpi.up}
            icon={KPI_ICONS[kpi.id]}
            color={kpi.color}
            delay={i + 1}
          />
        ))}
      </div>

      {/* Ops Brief Panel */}
      {briefOpen && (
        <OpsBriefPanel
          loading={briefLoading}
          content={briefContent}
          onClose={() => setBriefOpen(false)}
          onRefresh={refreshBrief}
        />
      )}

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        <ChartCard
          title="Hourly Fan Entry"
          subtitle="Today's gate entry flow by hour"
          className="animate-fade-in delay-3"
        >
          <div style={{ height: 240 }}>
            <Bar
              data={hourlyEntryData}
              options={{
                ...CHART_OPTIONS,
                plugins: { ...CHART_OPTIONS.plugins, legend: { display: false } }
              }}
            />
          </div>
        </ChartCard>

        <ChartCard
          title="Crowd Density Trends"
          subtitle="Zone occupancy % throughout the day"
          className="animate-fade-in delay-4"
        >
          <div style={{ height: 240 }}>
            <Line data={crowdDensityData} options={LINE_OPTIONS} />
          </div>
        </ChartCard>
      </div>

      {/* Activity Feed + Zone Status */}
      <div className="grid-2">
        <ChartCard
          title="Live Activity Feed"
          subtitle="Real-time operational events"
          className="animate-fade-in delay-5"
          controls={
            <span className="badge badge-error" style={{ animation: 'pulse 2s infinite' }}>
              <Activity size={10} /> Live
            </span>
          }
        >
          <div className="activity-feed">
            {feed.map(item => (
              <div key={item.id} className="activity-item">
                <div
                  className="activity-item__icon"
                  style={{ background: SEVERITY_BG[item.severity], color: SEVERITY_COLOR[item.severity] }}
                >
                  {item.icon}
                </div>
                <div className="activity-item__body">
                  <p className="activity-item__text">{item.text}</p>
                  <span className="activity-item__time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Zone Status Overview"
          subtitle="Real-time occupancy by stand"
          className="animate-fade-in delay-5"
          controls={
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              Updated {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          }
        >
          <ZoneStatus zones={zones} />
        </ChartCard>
      </div>

      <style>{`
        /* Ticker */
        .ticker-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--primary-dark);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          margin-bottom: var(--space-xl);
          overflow: hidden;
        }
        .ticker-label {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          background: var(--error);
          padding: 3px 8px;
          border-radius: var(--radius-full);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ticker-content {
          display: flex;
          gap: 60px;
          overflow: hidden;
          color: #BBDEFB;
          font-size: 0.8125rem;
          animation: ticker 30s linear infinite;
          white-space: nowrap;
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Activity Feed */
        .activity-feed { display: flex; flex-direction: column; gap: 12px; }
        .activity-item { display: flex; gap: 12px; align-items: flex-start; }
        .activity-item__icon {
          width: 34px; height: 34px;
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .activity-item__body { flex: 1; }
        .activity-item__text { font-size: 0.8375rem; color: var(--text-primary); line-height: 1.45; }
        .activity-item__time { font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px; display: block; }

        /* Ops Brief Panel */
        .ops-brief-panel {
          background: linear-gradient(135deg, rgba(13,71,161,0.06), rgba(21,101,192,0.03));
          border: 1.5px solid rgba(21,101,192,0.2);
          border-radius: var(--radius-xl);
          padding: var(--space-xl);
          margin-bottom: var(--space-xl);
          animation: fadeIn 0.3s ease;
        }
        .ops-brief-panel__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }
        .ops-brief-panel__title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary);
        }
        .ops-brief-panel__actions { display: flex; gap: 8px; align-items: center; }
        .ops-brief-section { margin-bottom: var(--space-md); }
        .ops-brief-section h3 {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--primary);
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(21,101,192,0.15);
        }
        .ops-brief-section p,
        .ops-brief-section li {
          font-size: 0.8875rem;
          line-height: 1.65;
          color: var(--text-primary);
        }
        .ops-brief-section ul { padding-left: 20px; margin: 0; }
        .ops-brief-section li { margin-bottom: 4px; }
        .ops-brief-meta {
          font-size: 0.75rem;
          color: var(--text-secondary);
          border-top: 1px solid var(--border);
          padding-top: 10px;
          margin-top: 4px;
          font-style: italic;
        }
        .ops-brief-skeleton { display: flex; flex-direction: column; gap: 10px; }
        .skel-line {
          height: 14px;
          background: linear-gradient(90deg, var(--border) 25%, rgba(21,101,192,0.1) 50%, var(--border) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 4px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ── Ops Brief Panel ─────────────────────────────────────── */
function OpsBriefPanel({ loading, content, onClose, onRefresh }) {
  return (
    <div className="ops-brief-panel">
      <div className="ops-brief-panel__header">
        <div className="ops-brief-panel__title">
          <Cpu size={16} />
          AI Operations Brief
          <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
            {loading ? 'Generating…' : 'Ready'}
          </span>
        </div>
        <div className="ops-brief-panel__actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={onRefresh}
            disabled={loading}
            id="btn-refresh-brief"
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <Loader2 size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            id="btn-close-brief"
            style={{ width: 30, height: 30, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="ops-brief-skeleton">
          <div className="skel-line" style={{ width: '28%', height: 11, marginBottom: 6 }} />
          {[100, 88, 92, 72, 95].map((w, i) => (
            <div key={i} className="skel-line" style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }} />
          ))}
          <div className="skel-line" style={{ width: '32%', height: 11, margin: '14px 0 6px' }} />
          {[86, 78, 83, 91].map((w, i) => (
            <div key={i + 5} className="skel-line" style={{ width: `${w}%`, animationDelay: `${(i + 5) * 0.1}s` }} />
          ))}
          <div className="skel-line" style={{ width: '30%', height: 11, margin: '14px 0 6px' }} />
          {[95, 80, 74].map((w, i) => (
            <div key={i + 9} className="skel-line" style={{ width: `${w}%`, animationDelay: `${(i + 9) * 0.1}s` }} />
          ))}
        </div>
      ) : (
        <BriefContent raw={content} />
      )}
    </div>
  );
}

/* ── Markdown-lite renderer ──────────────────────────────── */
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

function BriefContent({ raw }) {
  if (!raw) return null;
  const lines  = raw.split('\n');
  const output = [];
  let listItems = [];

  const flushList = (key) => {
    if (listItems.length) {
      output.push(
        <div key={`ul-${key}`} className="ops-brief-section">
          <ul>{listItems.map((li, j) => <li key={j}>{renderInline(li)}</li>)}</ul>
        </div>
      );
      listItems = [];
    }
  };

  let sectionKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      flushList(i);
      const heading = trimmed.slice(4);
      // Collect body lines until next ### or ---
      const body = [];
      while (i + 1 < lines.length && !lines[i + 1].startsWith('### ') && !lines[i + 1].startsWith('---')) {
        i++;
        body.push(lines[i]);
      }
      output.push(
        <div key={`sec-${sectionKey++}`} className="ops-brief-section">
          <h3>{heading}</h3>
          {body.filter(l => l.trim()).map((l, j) => {
            const t = l.trim();
            if (t.startsWith('- ')) return <ul key={j}><li>{renderInline(t.slice(2))}</li></ul>;
            return <p key={j}>{renderInline(t)}</p>;
          })}
        </div>
      );
    } else if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed.startsWith('---')) {
      flushList(i);
    } else if (trimmed.startsWith('*') && !trimmed.startsWith('**')) {
      flushList(i);
      output.push(<p key={`meta-${i}`} className="ops-brief-meta">{trimmed.replace(/^\*|\*$/g, '')}</p>);
    } else if (trimmed) {
      flushList(i);
      output.push(<div key={`p-${i}`} className="ops-brief-section"><p>{renderInline(trimmed)}</p></div>);
    }
  }
  flushList('end');

  return <>{output}</>;
}

/* ── Zone Status sub-component ───────────────────────────── */
function ZoneStatus({ zones = [] }) {
  const barColor = s => s === 'critical' ? 'var(--error)' : s === 'warning' ? 'var(--warning)' : 'var(--success)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {zones.map(z => (
        <div key={z.zone}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <span style={{ fontSize: '0.8375rem', fontWeight: 500 }}>{z.zone}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {z.current.toLocaleString()} / {z.capacity.toLocaleString()}
              </span>
              <span
                className={`badge badge-${z.status === 'critical' ? 'error' : z.status === 'warning' ? 'warning' : 'success'}`}
                style={{ fontSize: '0.7rem', padding: '2px 7px', transition: 'all 0.5s ease' }}
              >
                {z.pct}%
              </span>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${z.pct}%`, background: barColor(z.status), transition: 'width 1s ease' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
