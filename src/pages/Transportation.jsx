import React from 'react';
import { Car, Train, Bus, Bike, AlertCircle } from 'lucide-react';
import { useRealTime } from '../context/RealTimeContext';
import { busSchedule } from '../data/mockData';

const STATUS_COLOR = { normal: 'var(--success)', delayed: 'var(--warning)', suspended: 'var(--error)' };
const PARK_COLOR = pct => pct >= 90 ? 'var(--error)' : pct >= 70 ? 'var(--warning)' : 'var(--success)';

export default function Transportation() {
  const { metro, parking } = useRealTime();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Transportation Hub</h1>
        <p>Parking, metro, bus, and ride-share coordination — Match Day 6</p>
      </div>

      {/* Stats Row */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        {[
          { icon: Car,   label: 'Parking Lots',   value: '6',     sub: '3,020 spaces available' },
          { icon: Train, label: 'Metro Lines',     value: '4',     sub: '3 on-time, 1 delayed' },
          { icon: Bus,   label: 'Bus Routes',      value: '12',    sub: 'All routes operational' },
          { icon: Bike,  label: 'Shuttle Runs',    value: 'Every 8min', sub: 'Lots A–F covered' },
        ].map((stat, i) => (
          <div key={i} className={`card animate-fade-in delay-${i+1}`} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, background: 'var(--primary-surface)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={22} color="var(--primary)" />
              </div>
            </div>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{stat.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 3 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        {/* Parking Grid */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🅿️ Parking Availability</h3>
            <span className="badge badge-warning">2 Lots Near Full</span>
          </div>
          <div className="parking-grid">
            {parking.map(lot => (
              <div key={lot.lot} className="parking-slot">
                <div className="parking-slot__header">
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{lot.lot}</span>
                  <span className="badge" style={{ background: 'var(--surface-dim)', color: 'var(--text-secondary)', fontSize: '0.7rem', padding: '2px 6px' }}>
                    {lot.type}
                  </span>
                </div>
                <div style={{ fontSize: '1.375rem', fontWeight: 800, color: PARK_COLOR(lot.pct), margin: '8px 0' }}>
                  {lot.available}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 6 }}>spaces available</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${lot.pct}%`, background: PARK_COLOR(lot.pct) }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 4 }}>{lot.pct}% full</div>
              </div>
            ))}
          </div>
        </div>

        {/* Metro Status */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🚇 Metro Line Status</h3>
            <span className="badge badge-warning">1 Line Delayed</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {metro.map(line => (
              <div key={line.line} className="metro-card">
                <div className="metro-card__left">
                  <div className="metro-card__name">{line.line}</div>
                  <div className="metro-card__info">Next train: <strong>{line.nextTrain}</strong></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <span
                    className="badge"
                    style={{
                      background: line.status === 'normal' ? 'var(--success-surface)' : 'var(--warning-surface)',
                      color: line.status === 'normal' ? 'var(--success)' : 'var(--warning)'
                    }}
                  >
                    {line.status === 'delayed' && <AlertCircle size={10} />}
                    {line.status.charAt(0).toUpperCase() + line.status.slice(1)}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Crowding: {line.crowding}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ride-share zones */}
          <div style={{ marginTop: 20, padding: 14, background: 'var(--surface-variant)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 10 }}>🚗 Ride-Share Zones</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['Uber Zone A', 'Lyft Zone B', 'Taxi Zone C', 'VIP Zone D'].map(z => (
                <div key={z} style={{ fontSize: '0.8rem', padding: '6px 10px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  📍 {z}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bus Schedule */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🚌 Bus Schedule — Upcoming Departures</h3>
          <span className="badge badge-success">All Routes On Time</span>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr><th>Route</th><th>From</th><th>Departure</th><th>Arrival</th><th>Capacity</th><th>Status</th></tr>
            </thead>
            <tbody>
              {busSchedule.map(bus => (
                <tr key={bus.route}>
                  <td><strong>{bus.route}</strong></td>
                  <td>{bus.from}</td>
                  <td style={{ fontWeight: 600 }}>{bus.departure}</td>
                  <td>{bus.arrival}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: bus.capacity, background: parseInt(bus.capacity) >= 80 ? 'var(--warning)' : 'var(--success)' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem' }}>{bus.capacity}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-success">On Time</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .parking-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .parking-slot {
          padding: 12px;
          background: var(--surface-variant);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }
        .parking-slot__header { display: flex; justify-content: space-between; align-items: center; }
        .metro-card {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px;
          background: var(--surface-variant);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }
        .metro-card__name { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
        .metro-card__info { font-size: 0.8rem; color: var(--text-secondary); margin-top: 3px; }
        .metro-card__left {}
      `}</style>
    </div>
  );
}
