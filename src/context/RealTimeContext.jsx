// ============================================================
// StadiumMind AI — Real-Time Data Engine
// Syncs with Firestore, or falls back to local simulation if DB is empty
// ============================================================
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  kpiData, gateData, zoneData, activityFeed,
  metroStatus, parkingData, sustainabilityMetrics
} from '../data/mockData';

/* ── helpers ─────────────────────────────────────────────── */
const clone  = (v) => JSON.parse(JSON.stringify(v));
const clamp  = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const drift  = (v, lo, hi, step) =>
  clamp(v + (Math.random() - 0.5) * step * 2, lo, hi);
const driftI = (v, lo, hi, step) => Math.round(drift(v, lo, hi, step));
const driftF = (v, lo, hi, step, dp = 1) => +drift(v, lo, hi, step).toFixed(dp);

/* ── new feed events pool ────────────────────────────────── */
const POOL = [
  { type: 'alert',   icon: '🚨', text: 'Crowd surge detected in Section 112 — response team deployed',    severity: 'error'   },
  { type: 'success', icon: '✅', text: 'Additional volunteers dispatched to Gate B — queue reducing',       severity: 'success' },
  { type: 'info',    icon: '🤖', text: 'AI crowd flow model updated — next peak predicted in 18 minutes',   severity: 'info'    },
  { type: 'warning', icon: '⚠️', text: 'Metro Line 2 crowding now HIGH — recommend alternate routes',       severity: 'warning' },
  { type: 'success', icon: '♻️', text: 'Recycling milestone: 94% diversion rate achieved this hour',        severity: 'success' },
  { type: 'info',    icon: '🚌', text: 'Express Bus Route 1 at 91% — standby bus dispatched from depot',    severity: 'info'    },
  { type: 'alert',   icon: '🔊', text: 'PA announcement broadcast: Gate C fans redirected to Gate F',       severity: 'error'   },
  { type: 'success', icon: '🛡️', text: 'Security sweep complete — Concourse 3 cleared and reopened',       severity: 'success' },
  { type: 'warning', icon: '🌡️', text: 'Elevated temperature in Catering Zone B — ventilation adjusted',   severity: 'warning' },
  { type: 'info',    icon: '📡', text: 'Sensor array recalibrated — density readings now ±2% accuracy',     severity: 'info'    },
];

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ── gate status helper ──────────────────────────────────── */
function gateStatus(occ) {
  if (occ >= 92) return 'critical';
  if (occ >= 75) return 'warning';
  if (occ < 45)  return 'low';
  return 'normal';
}
function zoneStatus(pct) {
  if (pct >= 90) return 'critical';
  if (pct >= 75) return 'warning';
  return 'normal';
}

/* ── context ─────────────────────────────────────────────── */
const RealTimeContext = createContext(null);

export function useRealTime() {
  const ctx = useContext(RealTimeContext);
  if (!ctx) throw new Error('useRealTime must be used inside <RealTimeProvider>');
  return ctx;
}

export function RealTimeProvider({ children }) {
  // Seed from mock data initially
  const [gates,      setGates]      = useState(clone(gateData));
  const [zones,      setZones]      = useState(clone(zoneData));
  const [kpis,       setKpis]       = useState(clone(kpiData));
  const [metro,      setMetro]      = useState(clone(metroStatus));
  const [parking,    setParking]    = useState(clone(parkingData));
  const [feed,       setFeed]       = useState(clone(activityFeed));
  const [sustain,    setSustain]    = useState(clone(sustainabilityMetrics));
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [tickCount,  setTickCount]  = useState(0);

  // Flags to track if we are receiving real data from Firestore
  const [realData, setRealData] = useState({
    gates: false, zones: false, kpis: false, metro: false, parking: false, sustain: false, feed: false
  });

  useEffect(() => {
    const unsubGates = onSnapshot(collection(db, 'gates'), snap => {
      if (!snap.empty) {
        setGates(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setRealData(r => ({ ...r, gates: true }));
      }
    });
    const unsubZones = onSnapshot(collection(db, 'zones'), snap => {
      if (!snap.empty) {
        setZones(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setRealData(r => ({ ...r, zones: true }));
      }
    });
    const unsubKpis = onSnapshot(collection(db, 'kpis'), snap => {
      if (!snap.empty) {
        setKpis(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setRealData(r => ({ ...r, kpis: true }));
      }
    });
    const unsubMetro = onSnapshot(collection(db, 'metro'), snap => {
      if (!snap.empty) {
        setMetro(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setRealData(r => ({ ...r, metro: true }));
      }
    });
    const unsubParking = onSnapshot(collection(db, 'parking'), snap => {
      if (!snap.empty) {
        setParking(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setRealData(r => ({ ...r, parking: true }));
      }
    });
    const unsubSustain = onSnapshot(collection(db, 'sustain'), snap => {
      if (!snap.empty) {
        setSustain(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setRealData(r => ({ ...r, sustain: true }));
      }
    });
    const unsubFeed = onSnapshot(collection(db, 'feed'), snap => {
      if (!snap.empty) {
        setFeed(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => b.timestamp - a.timestamp));
        setRealData(r => ({ ...r, feed: true }));
      }
    });

    return () => {
      unsubGates(); unsubZones(); unsubKpis(); unsubMetro(); unsubParking(); unsubSustain(); unsubFeed();
    };
  }, []);

  // Stable refs for simulator
  const gatesRef   = useRef(gates);
  const zonesRef   = useRef(zones);
  const kpisRef    = useRef(kpis);
  const metroRef   = useRef(metro);
  const parkingRef = useRef(parking);
  const sustainRef = useRef(sustain);

  useEffect(() => { gatesRef.current   = gates;   }, [gates]);
  useEffect(() => { zonesRef.current   = zones;   }, [zones]);
  useEffect(() => { kpisRef.current    = kpis;    }, [kpis]);
  useEffect(() => { metroRef.current   = metro;   }, [metro]);
  useEffect(() => { parkingRef.current = parking; }, [parking]);
  useEffect(() => { sustainRef.current = sustain; }, [sustain]);

  useEffect(() => {
    const id = setInterval(() => {
      /* gates */
      if (!realData.gates) {
        setGates(prev => prev.map(g => {
          const occ   = driftI(g.occupancy, 30, 99, 4);
          const queue = driftF(g.queue,     0.5, 28,  2);
          return { ...g, occupancy: occ, queue, status: gateStatus(occ) };
        }));
      }

      /* zones */
      if (!realData.zones) {
        setZones(prev => prev.map(z => {
          const pct     = driftI(z.pct, 40, 99, 3);
          const current = Math.round(z.capacity * pct / 100);
          return { ...z, pct, current, status: zoneStatus(pct) };
        }));
      }

      /* KPIs */
      if (!realData.kpis) {
        setKpis(prev => prev.map(k => {
          if (k.id === 'density') {
            const v = driftI(parseInt(k.value), 55, 98, 2);
            return { ...k, value: `${v}%` };
          }
          if (k.id === 'alerts') {
            const v = driftI(parseInt(k.value), 2, 18, 1);
            return { ...k, value: `${v}`, up: v < parseInt(k.value) };
          }
          if (k.id === 'queue') {
            const v = driftF(parseFloat(k.value), 1.8, 22, 0.5);
            return { ...k, value: `${v}`, up: v < parseFloat(k.value) };
          }
          if (k.id === 'sustain') {
            const v = driftI(parseInt(k.value), 78, 95, 1);
            return { ...k, value: `${v}` };
          }
          return k;
        }));
      }

      /* metro */
      if (!realData.metro) {
        setMetro(prev => prev.map(line => {
          const mins = driftI(parseInt(line.nextTrain) || 5, 1, 20, 2);
          const crowd = pickRandom(['low', 'moderate', 'high']);
          return { ...line, nextTrain: `${mins} min`, crowding: crowd };
        }));
      }

      /* parking */
      if (!realData.parking) {
        setParking(prev => prev.map(lot => {
          const pct   = driftI(lot.pct, 5, 99, 4);
          const avail = Math.round(lot.total * (100 - pct) / 100);
          return { ...lot, pct, available: avail };
        }));
      }

      /* sustainability */
      if (!realData.sustain) {
        setSustain(prev => prev.map(m => {
          const val = driftF(m.value, m.value - 5, Math.min(m.value + 5, 100), 0.5, 0);
          return { ...m, value: Math.round(val) };
        }));
      }

      /* activity feed */
      if (!realData.feed) {
        if (Math.random() < 0.35) {
          const event = pickRandom(POOL);
          setFeed(prev => [
            { ...event, id: Date.now(), time: 'just now' },
            ...prev.slice(0, 9).map((item, i) => ({
              ...item,
              time: i === 0 ? '1 min ago' : item.time,
            })),
          ]);
        }
      }

      setLastUpdate(new Date());
      setTickCount(c => c + 1);
    }, 6000); // every 6 seconds

    return () => clearInterval(id);
  }, [realData]); // Re-run effect if realData flags change

  return (
    <RealTimeContext.Provider value={{
      gates, zones, kpis, metro, parking, feed, sustain, lastUpdate, tickCount,
    }}>
      {children}
    </RealTimeContext.Provider>
  );
}
