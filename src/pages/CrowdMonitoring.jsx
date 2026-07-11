import React, { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useRealTime } from '../context/RealTimeContext';

const STATUS_COLOR = {
  critical: '#C62828', warning: '#F57F17', normal: '#2E7D32', low: '#1565C0'
};
const STATUS_BG = {
  critical: '#FFEBEE', warning: '#FFF8E1', normal: '#E8F5E9', low: '#E3F2FD'
};

export default function CrowdMonitoring() {
  const { gates, zones, tickCount } = useRealTime();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Draw heatmap
    ctx.clearRect(0, 0, W, H);

    // Stadium outline
    ctx.fillStyle = '#F0F4F8';
    ctx.beginPath();
    ctx.ellipse(W/2, H/2, W*0.45, H*0.42, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Field (pitch)
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.ellipse(W/2, H/2, W*0.25, H*0.22, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Build heatmap blobs from live zone data
    const zonePositions = [
      { key: 'North Stand', x: W*0.5,  y: H*0.12, r: 60 },
      { key: 'South Stand', x: W*0.5,  y: H*0.88, r: 60 },
      { key: 'West Stand',  x: W*0.12, y: H*0.5,  r: 50 },
      { key: 'East Stand',  x: W*0.88, y: H*0.5,  r: 50 },
      { key: 'VIP Lounge',  x: W*0.8,  y: H*0.15, r: 25 },
    ];

    zonePositions.forEach(pos => {
      const live = zones.find(z => z.zone === pos.key);
      const density = live ? live.pct / 100 : 0.7;
      const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pos.r);
      if (density >= 0.9) {
        grad.addColorStop(0, `rgba(198,40,40,${density})`);
        grad.addColorStop(0.5, `rgba(255,87,34,${density*0.6})`);
        grad.addColorStop(1, 'rgba(198,40,40,0)');
      } else if (density >= 0.75) {
        grad.addColorStop(0, `rgba(245,127,23,${density})`);
        grad.addColorStop(0.5, `rgba(255,193,7,${density*0.6})`);
        grad.addColorStop(1, 'rgba(245,127,23,0)');
      } else {
        grad.addColorStop(0, `rgba(46,125,50,${density})`);
        grad.addColorStop(0.5, `rgba(76,175,80,${density*0.6})`);
        grad.addColorStop(1, 'rgba(46,125,50,0)');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, pos.r, 0, Math.PI*2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#212121';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pos.key, pos.x, pos.y);
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.fillText(`${Math.round(density*100)}%`, pos.x, pos.y + 14);
    });
  }, [zones, tickCount]); // re-draw on every real-time tick

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Crowd Monitoring</h1>
        <p>Real-time crowd density tracking across all stadium zones</p>
      </div>

      {/* Alert Banner */}
      <div className="crowd-alert animate-fade-in">
        <AlertTriangle size={18} color="#C62828" />
        <div>
          <strong>CRITICAL:</strong> North Stand approaching maximum capacity (95%). AI system has initiated automatic fan rerouting to West Stand.
        </div>
        <span className="badge badge-error animate-pulse">CRITICAL</span>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        {/* Heatmap */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🗺️ Live Density Heatmap</h3>
            <span className="badge badge-error animate-pulse">Live</span>
          </div>
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
          />
          <div className="crowd-legend">
            <div className="crowd-legend-item"><span style={{ background: '#C62828' }} />Critical (90%+)</div>
            <div className="crowd-legend-item"><span style={{ background: '#F57F17' }} />Warning (75–90%)</div>
            <div className="crowd-legend-item"><span style={{ background: '#2E7D32' }} />Normal (&lt;75%)</div>
          </div>
        </div>

        {/* Gate Queue Cards */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">⏱️ Gate Queue Times</h3>
            <span className="badge badge-primary">6 Gates</span>
          </div>
          <div className="gate-grid">
            {gates.map(gate => (
              <div
                key={gate.id}
                className="gate-card"
                style={{ background: STATUS_BG[gate.status], borderColor: STATUS_COLOR[gate.status] + '40' }}
              >
                <div className="gate-card__top">
                  <span className="gate-card__name" style={{ color: STATUS_COLOR[gate.status] }}>{gate.name}</span>
                  <span className="gate-card__queue">{gate.queue} min</span>
                </div>
                <div className="progress-bar" style={{ marginTop: 8 }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${gate.occupancy}%`, background: STATUS_COLOR[gate.status] }}
                  />
                </div>
                <div className="gate-card__bottom">
                  <span style={{ fontSize: '0.72rem', color: '#666' }}>{gate.occupancy}% full</span>
                  <span
                    className="badge"
                    style={{ background: STATUS_BG[gate.status], color: STATUS_COLOR[gate.status], fontSize: '0.7rem', padding: '2px 7px' }}
                  >
                    {gate.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone Occupancy */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Zone Occupancy Details</h3>
          <span className="caption">Capacity management overview</span>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Current</th>
                <th>Capacity</th>
                <th>Occupancy</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {zones.map(z => (
                <tr key={z.zone}>
                  <td style={{ fontWeight: 600 }}>{z.zone}</td>
                  <td>{z.current.toLocaleString()}</td>
                  <td>{z.capacity.toLocaleString()}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="progress-bar" style={{ width: 80 }}>
                        <div className="progress-fill" style={{ width: `${z.pct}%`, background: STATUS_COLOR[z.status] }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{z.pct}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{ background: STATUS_BG[z.status], color: STATUS_COLOR[z.status] }}
                    >
                      {z.status === 'critical' ? <AlertTriangle size={10} /> : <CheckCircle size={10} />}
                      {z.status.charAt(0).toUpperCase() + z.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm" id={`btn-zone-action-${z.zone.replace(/\s/g,'-').toLowerCase()}`}>
                      {z.status === 'critical' ? 'Reroute Fans' : z.status === 'warning' ? 'Monitor' : 'Normal'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .crowd-alert {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px;
          background: var(--error-surface);
          border: 1.5px solid rgba(198,40,40,0.3);
          border-radius: var(--radius-lg);
          color: var(--error);
          margin-bottom: var(--space-xl);
          font-size: 0.9rem;
        }
        .crowd-legend { display: flex; gap: 20px; margin-top: 12px; flex-wrap: wrap; }
        .crowd-legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-secondary); }
        .crowd-legend-item span { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }

        .gate-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .gate-card {
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1.5px solid;
        }
        .gate-card__top { display: flex; justify-content: space-between; align-items: center; }
        .gate-card__name { font-size: 0.8125rem; font-weight: 700; }
        .gate-card__queue { font-size: 1rem; font-weight: 800; color: var(--text-primary); }
        .gate-card__bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
      `}</style>
    </div>
  );
}
