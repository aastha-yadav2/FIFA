import React, { useState } from 'react';
import { Map, Navigation2, Utensils, Heart, ShieldCheck, Accessibility, Car, Info, ChevronDown } from 'lucide-react';

// All 16 official FIFA World Cup 2026 host venues
const FIFA_VENUES = [
  { id: 'sofi',       name: 'SoFi Stadium',            city: 'Los Angeles, CA',     cap: '70,240',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.61!2d-118.33775!3d33.95384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b239d197e2c1%3A0x3f36a61de92f4edb!2sSoFi%20Stadium!5e0!3m2!1sen!2sus!4v1699900000000' },
  { id: 'att',        name: 'AT&T Stadium',            city: 'Dallas, TX',          cap: '80,000',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.76!2d-97.09302!3d32.74788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7ed24f0b2f41%3A0x2c963a51ebd3b0f8!2sAT%26T%20Stadium!5e0!3m2!1sen!2sus!4v1699900000000' },
  { id: 'metlife',    name: 'MetLife Stadium',         city: 'New York/NJ',         cap: '82,500',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.47!2d-74.07441!3d40.81358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25cf5f6bf2667%3A0xfb5e2be10cdeb7a1!2sMetLife%20Stadium!5e0!3m2!1sen!2sus!4v1699900000000' },
  { id: 'bca',        name: 'BC Place',                city: 'Vancouver, Canada',   cap: '54,500',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.1!2d-123.11173!3d49.27668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5486717f41ba2fb5%3A0x6a9b76e8d33f3bd1!2sBC%20Place!5e0!3m2!1sen!2sus!4v1699900000000' },
  { id: 'azteca',     name: 'Estadio Azteca',          city: 'Mexico City, Mexico', cap: '87,523',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.66!2d-99.15072!3d19.30296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce009a0cf3f8ad%3A0x3cf9e36f6c3fc80c!2sEstadio%20Azteca!5e0!3m2!1sen!2sus!4v1699900000000' },
  { id: 'gillette',   name: 'Gillette Stadium',        city: 'Boston, MA',          cap: '65,878',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.9!2d-71.26441!3d42.09076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3815b1c0e4f09%3A0x71e19c1e3e1db553!2sGillette%20Stadium!5e0!3m2!1sen!2sus!4v1699900000000' },
  { id: 'bofas',      name: 'Bank of America Stadium', city: 'Charlotte, NC',       cap: '74,867',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.6!2d-80.85296!3d35.22583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541f7f77ef29a1%3A0xed218ad6eb48a4f!2sBank%20of%20America%20Stadium!5e0!3m2!1sen!2sus!4v1699900000000' },
  { id: 'firstenergy',name: 'Arrowhead Stadium',       city: 'Kansas City, MO',     cap: '76,416',  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.52!2d-94.48399!3d39.04879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0f96e5e26bc45%3A0x4e5cd38b3ad7e2b9!2sARROWHEAD%20STADIUM!5e0!3m2!1sen!2sus!4v1699900000000' },
];

const DESTINATIONS = [
  { id: 'gate-a',    icon: Map,          label: 'Gate A',           desc: 'Main entrance – 2 min walk',     color: '#1565C0' },
  { id: 'gate-b',    icon: Map,          label: 'Gate B (VIP)',     desc: 'VIP entrance – 5 min walk',      color: '#7B1FA2' },
  { id: 'food',      icon: Utensils,     label: 'Food Courts',      desc: 'Concourse 1 & 3 – 3 min walk',  color: '#E65100' },
  { id: 'medical',   icon: Heart,        label: 'Medical Center',   desc: 'North corner – 4 min walk',      color: '#C62828' },
  { id: 'security',  icon: ShieldCheck,  label: 'Security Office',  desc: 'West Wing – 6 min walk',         color: '#1B5E20' },
  { id: 'access',    icon: Accessibility,label: 'Accessibility',    desc: 'All entrances – staff assist',   color: '#00695C' },
  { id: 'parking',   icon: Car,          label: 'Parking Lots',     desc: 'Lots A–F – shuttle available',   color: '#33691E' },
  { id: 'info',      icon: Info,         label: 'Info Desk',        desc: 'Main lobby – English/Spanish',   color: '#006064' },
];

const ROUTE_STEPS = {
  'gate-a':    ['Start at Main Concourse', 'Head East toward Entrance Plaza', 'Follow blue signage', 'Arrive at Gate A — estimated 2 min'],
  'gate-b':    ['Start at Main Concourse', 'Take VIP elevator to Level 2', 'Show VIP credential at checkpoint', 'Arrive at Gate B VIP — estimated 5 min'],
  'food':      ['Start at your current section', 'Follow orange "Food Court" signs', 'Take escalator to Concourse 1', 'Multiple food vendors available — estimated 3 min'],
  'medical':   ['Start at your location', 'Signal any volunteer for escort', 'Or proceed to North Corner', 'Medical Center open 24/7 — estimated 4 min'],
  'security':  ['Head toward West Wing', 'Follow blue security signs', 'Past Gate D, turn right', 'Security Office on your left — estimated 6 min'],
  'access':    ['Accessibility staff stationed at all gates', 'Signal any orange-vest volunteer', 'Wheelchair & mobility assistance available', 'Quiet zones available at Concourse 2'],
  'parking':   ['Exit through any main gate', 'Shuttle runs every 8 minutes', 'Follow parking signs P1–P6', 'Lot D shuttle drop-off closest to main entrance'],
  'info':      ['Main Lobby – Level 1', 'Follow "Information" signs in yellow', 'English & Spanish spoken', 'Open 8:00 AM – 11:00 PM'],
};

export default function Navigation() {
  const [selected, setSelected]   = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [step, setStep]           = useState(0);
  const [venueId, setVenueId]     = useState('sofi');
  const activeVenue = FIFA_VENUES.find(v => v.id === venueId) || FIFA_VENUES[0];

  const startRoute = (dest) => {
    setSelected(dest);
    setSimulating(true);
    setStep(0);
    const steps = ROUTE_STEPS[dest.id] || [];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStep(i);
      if (i >= steps.length - 1) clearInterval(interval);
    }, 1800);
  };

  const dest = selected ? DESTINATION_MAP[selected.id] : null;

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1>Stadium Navigation</h1>
          <p>Real-time wayfinding for FIFA World Cup 2026 · {activeVenue.city}</p>
        </div>
        {/* Venue selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Active Venue:</span>
          <div style={{ position: 'relative' }}>
            <select
              id="select-venue"
              className="form-control"
              value={venueId}
              onChange={e => { setVenueId(e.target.value); setSelected(null); setSimulating(false); }}
              style={{ paddingRight: 36, minWidth: 220, fontSize: '0.875rem' }}
            >
              {FIFA_VENUES.map(v => (
                <option key={v.id} value={v.id}>{v.name} — {v.city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="nav-layout">
        {/* Map Embed */}
        <div className="nav-map-card card">
          <div className="card-header">
            <div>
              <h3 className="card-title">📍 Live Stadium Map</h3>
              <p className="card-subtitle">{activeVenue.name} · Capacity {activeVenue.cap}</p>
            </div>
            {simulating && (
              <span className="badge badge-primary animate-pulse">
                <Navigation2 size={10} /> Routing…
              </span>
            )}
          </div>

          {/* Map placeholder */}
          <div className="nav-map-placeholder">
            <iframe
              key={activeVenue.id}
              title={`${activeVenue.name} Location`}
              src={activeVenue.embed}
              width="100%"
              height="320"
              style={{ border: 0, borderRadius: 'var(--radius-md)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay route steps */}
            {simulating && selected && (
              <div className="nav-route-overlay">
                <div className="nav-route-header">
                  <Navigation2 size={16} color="#1E88E5" />
                  <span>Route to {selected.label}</span>
                </div>
                <div className="nav-route-steps">
                  {(ROUTE_STEPS[selected.id] || []).map((s, i) => (
                    <div key={i} className={`nav-route-step ${i <= step ? 'nav-route-step--active' : ''}`}>
                      <div className={`nav-route-step__dot ${i <= step ? 'nav-route-step__dot--done' : ''}`} />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Destination Buttons */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🧭 Choose Destination</h3>
          </div>
          <div className="nav-destinations">
            {DESTINATIONS.map(dest => (
              <button
                key={dest.id}
                className={`nav-dest-btn ${selected?.id === dest.id ? 'nav-dest-btn--active' : ''}`}
                onClick={() => startRoute(dest)}
                id={`btn-nav-${dest.id}`}
              >
                <div className="nav-dest-icon" style={{ background: dest.color + '18', color: dest.color }}>
                  <dest.icon size={18} />
                </div>
                <div className="nav-dest-info">
                  <span className="nav-dest-label">{dest.label}</span>
                  <span className="nav-dest-desc">{dest.desc}</span>
                </div>
                <Navigation2 size={14} color="var(--text-secondary)" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .nav-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: var(--space-xl);
          align-items: start;
        }
        .nav-map-card .card-header { margin-bottom: var(--space-md); }
        .nav-map-placeholder { position: relative; border-radius: var(--radius-md); overflow: hidden; }

        .nav-route-overlay {
          position: absolute;
          top: var(--space-md);
          left: var(--space-md);
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-lg);
          padding: var(--space-md);
          box-shadow: var(--shadow-lg);
          min-width: 240px;
          animation: slideInLeft var(--transition-base) ease;
        }
        .nav-route-header {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.875rem; font-weight: 700;
          color: var(--primary);
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .nav-route-steps { display: flex; flex-direction: column; gap: 10px; }
        .nav-route-step {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.8125rem; color: var(--text-secondary);
          transition: color var(--transition-base);
        }
        .nav-route-step--active { color: var(--text-primary); font-weight: 500; }
        .nav-route-step__dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--border-strong);
          flex-shrink: 0;
          margin-top: 4px;
          transition: background var(--transition-base);
        }
        .nav-route-step__dot--done { background: var(--primary); box-shadow: 0 0 6px rgba(30,136,229,0.4); }

        .nav-destinations { display: flex; flex-direction: column; gap: 8px; }
        .nav-dest-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 12px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          width: 100%;
        }
        .nav-dest-btn:hover { border-color: var(--primary); background: var(--primary-surface); }
        .nav-dest-btn--active { border-color: var(--primary); background: var(--primary-surface); }
        .nav-dest-icon {
          width: 38px; height: 38px;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .nav-dest-info { flex: 1; }
        .nav-dest-label { display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .nav-dest-desc  { display: block; font-size: 0.75rem; color: var(--text-secondary); margin-top: 1px; }

        @media (max-width: 1024px) {
          .nav-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

const DESTINATION_MAP = Object.fromEntries(DESTINATIONS.map(d => [d.id, d]));
