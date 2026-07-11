// ============================================================
// StadiumMind AI — All Mock Data
// ============================================================

// ---------- KPI Cards ----------
export const kpiData = [
  { id: 'fans',        label: 'Total Fans Today',    value: '68,420',  change: '+12%',  up: true,  color: 'primary', unit: '' },
  { id: 'density',     label: 'Crowd Density',        value: '73%',     change: '+5%',   up: false, color: 'warning', unit: '' },
  { id: 'volunteers',  label: 'Active Volunteers',    value: '1,248',   change: '+8%',   up: true,  color: 'success', unit: '' },
  { id: 'alerts',      label: 'Active Alerts',        value: '7',       change: '-3',    up: true,  color: 'error',   unit: '' },
  { id: 'queue',       label: 'Avg Queue Time',       value: '4.2',     change: '-0.8',  up: true,  color: 'accent',  unit: 'min' },
  { id: 'sustain',     label: 'Sustainability Score', value: '87',      change: '+3pts', up: true,  color: 'success', unit: '/100' },
];

// ---------- Hourly Entry Data ----------
export const hourlyEntryData = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
  datasets: [{
    label: 'Fan Entry Count',
    data: [1200, 3400, 5800, 7200, 6900, 8100, 9500, 11200, 14800, 12300, 8900, 3200],
    backgroundColor: 'rgba(30,136,229,0.8)',
    borderRadius: 8,
    borderSkipped: false,
  }]
};

// ---------- Crowd Density Over Time ----------
export const crowdDensityData = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
  datasets: [
    {
      label: 'North Stand',
      data: [45, 55, 62, 70, 68, 75, 82, 90, 95, 88, 72, 45],
      borderColor: '#1E88E5',
      backgroundColor: 'rgba(30,136,229,0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'South Stand',
      data: [38, 48, 58, 65, 72, 78, 85, 88, 91, 82, 68, 40],
      borderColor: '#00ACC1',
      backgroundColor: 'rgba(0,172,193,0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'East Stand',
      data: [50, 60, 55, 68, 74, 80, 78, 85, 90, 80, 65, 38],
      borderColor: '#43A047',
      backgroundColor: 'rgba(67,160,71,0.1)',
      fill: true,
      tension: 0.4,
    }
  ]
};

// ---------- Activity Feed ----------
export const activityFeed = [
  { id: 1, type: 'alert',   icon: '🚨', text: 'High crowd density at Gate C — Zone 7 reaching 95%',              time: '2 min ago',  severity: 'error' },
  { id: 2, type: 'success', icon: '✅', text: 'Medical unit dispatched to Section 114 — ETA 3 minutes',          time: '8 min ago',  severity: 'success' },
  { id: 3, type: 'info',    icon: '📢', text: 'Metro Line 2 delays — estimated 12-minute disruption',             time: '15 min ago', severity: 'info' },
  { id: 4, type: 'warning', icon: '⚠️', text: 'Gate B queue time exceeding 15 minutes — rerouting recommended',  time: '22 min ago', severity: 'warning' },
  { id: 5, type: 'success', icon: '♻️', text: 'Waste recycling target 87% achieved — sustainability milestone',  time: '34 min ago', severity: 'success' },
  { id: 6, type: 'info',    icon: '🤖', text: 'AI crowd prediction model updated — next peak at 18:30',           time: '45 min ago', severity: 'info' },
  { id: 7, type: 'alert',   icon: '🔥', text: 'Smoke detected near catering zone B — fire team alerted',          time: '1h ago',     severity: 'error' },
];

// ---------- Gates / Crowd Zones ----------
export const gateData = [
  { id: 'A', name: 'Gate A', occupancy: 78, capacity: 4000, queue: 3.2, status: 'normal' },
  { id: 'B', name: 'Gate B', occupancy: 92, capacity: 3500, queue: 15.6, status: 'warning' },
  { id: 'C', name: 'Gate C', occupancy: 97, capacity: 4500, queue: 22.1, status: 'critical' },
  { id: 'D', name: 'Gate D', occupancy: 65, capacity: 3000, queue: 2.8, status: 'normal' },
  { id: 'E', name: 'Gate E', occupancy: 88, capacity: 3200, queue: 9.4, status: 'warning' },
  { id: 'F', name: 'Gate F', occupancy: 42, capacity: 2800, queue: 1.2, status: 'low' },
];

export const zoneData = [
  { zone: 'North Stand',  capacity: 18000, current: 16200, pct: 90, status: 'critical' },
  { zone: 'South Stand',  capacity: 18000, current: 14400, pct: 80, status: 'warning' },
  { zone: 'East Stand',   capacity: 12000, current: 9600,  pct: 80, status: 'warning' },
  { zone: 'West Stand',   capacity: 12000, current: 7800,  pct: 65, status: 'normal' },
  { zone: 'Media Zone',   capacity: 2000,  current: 1200,  pct: 60, status: 'normal' },
  { zone: 'VIP Lounge',   capacity: 1500,  current: 1275,  pct: 85, status: 'warning' },
];

// ---------- Volunteers ----------
export const volunteers = [
  { id: 'V001', name: 'Maria Santos',   zone: 'Gate A',    role: 'Entry Marshal',     status: 'active',    shift: '08:00–16:00', phone: '+1-555-0101' },
  { id: 'V002', name: 'James Okonkwo',  zone: 'North Stand',role: 'Crowd Monitor',    status: 'active',    shift: '12:00–20:00', phone: '+1-555-0102' },
  { id: 'V003', name: 'Aisha Patel',    zone: 'Medical',   role: 'First Responder',   status: 'standby',   shift: '08:00–20:00', phone: '+1-555-0103' },
  { id: 'V004', name: 'Carlos Méndez',  zone: 'Gate C',    role: 'Entry Marshal',     status: 'active',    shift: '14:00–22:00', phone: '+1-555-0104' },
  { id: 'V005', name: 'Sophie Müller',  zone: 'VIP Lounge',role: 'Guest Services',    status: 'active',    shift: '10:00–20:00', phone: '+1-555-0105' },
  { id: 'V006', name: 'Yuki Tanaka',    zone: 'Media Zone',role: 'Press Liaison',     status: 'break',     shift: '09:00–18:00', phone: '+1-555-0106' },
  { id: 'V007', name: 'Omar Hassan',    zone: 'Transport', role: 'Shuttle Coordinator',status: 'active',   shift: '06:00–14:00', phone: '+1-555-0107' },
  { id: 'V008', name: 'Nina Kovač',     zone: 'West Stand',role: 'Accessibility Aid',  status: 'active',   shift: '12:00–22:00', phone: '+1-555-0108' },
];

// ---------- Incidents ----------
export const incidents = [
  { id: 'INC-2026-001', type: 'Medical',       location: 'Section 114', priority: 'high',   status: 'resolved',    time: '14:22', description: 'Fan collapsed, heat exhaustion. Medical team dispatched.' },
  { id: 'INC-2026-002', type: 'Security',      location: 'Gate B',      priority: 'medium', status: 'in-progress', time: '15:08', description: 'Unauthorized access attempt flagged by biometric scanner.' },
  { id: 'INC-2026-003', type: 'Infrastructure',location: 'Concourse 3', priority: 'low',    status: 'open',        time: '15:45', description: 'Water fountain malfunction reported by volunteer.' },
  { id: 'INC-2026-004', type: 'Crowd',         location: 'Gate C',      priority: 'high',   status: 'in-progress', time: '16:10', description: 'Dangerous density levels. Crowd management deployed.' },
  { id: 'INC-2026-005', type: 'Fire',          location: 'Catering B',  priority: 'high',   status: 'resolved',    time: '16:38', description: 'Smoke detected. Kitchen equipment fault. Contained.' },
  { id: 'INC-2026-006', type: 'Medical',       location: 'South Stand', priority: 'medium', status: 'open',        time: '17:02', description: 'Fan reported chest pain. Medical standby notified.' },
];

// ---------- Transportation ----------
export const parkingData = [
  { lot: 'Lot A1', total: 800,  available: 234, pct: 71, type: 'Regular' },
  { lot: 'Lot A2', total: 600,  available: 45,  pct: 93, type: 'Regular' },
  { lot: 'Lot B1', total: 400,  available: 180, pct: 55, type: 'VIP' },
  { lot: 'Lot B2', total: 1200, available: 890, pct: 26, type: 'Regular' },
  { lot: 'Lot C',  total: 200,  available: 12,  pct: 94, type: 'Accessible' },
  { lot: 'Lot D',  total: 500,  available: 310, pct: 38, type: 'Regular' },
];

export const metroStatus = [
  { line: 'Line 1 (Blue)', status: 'normal',  nextTrain: '3 min',  crowding: 'moderate' },
  { line: 'Line 2 (Red)',  status: 'delayed', nextTrain: '14 min', crowding: 'high' },
  { line: 'Line 3 (Green)',status: 'normal',  nextTrain: '5 min',  crowding: 'low' },
  { line: 'Line 7 (Gold)', status: 'normal',  nextTrain: '2 min',  crowding: 'high' },
];

export const busSchedule = [
  { route: 'Express 1', from: 'City Center',    departure: '17:00', arrival: '17:25', capacity: '85%' },
  { route: 'Express 2', from: 'Airport',        departure: '17:15', arrival: '17:50', capacity: '62%' },
  { route: 'Route 44',  from: 'North Station',  departure: '17:10', arrival: '17:40', capacity: '90%' },
  { route: 'Route 78',  from: 'South Terminal', departure: '17:20', arrival: '17:55', capacity: '45%' },
  { route: 'Shuttle X', from: 'Lot D Parking',  departure: '17:05', arrival: '17:12', capacity: '70%' },
];

// ---------- Sustainability ----------
export const sustainabilityMetrics = [
  { label: 'Carbon Neutral Score',   value: 87, target: 90, unit: '/100', color: '#2E7D32' },
  { label: 'Renewable Energy Usage', value: 73, target: 80, unit: '%',    color: '#00ACC1' },
  { label: 'Waste Recycled',         value: 91, target: 85, unit: '%',    color: '#43A047' },
  { label: 'Water Conservation',     value: 68, target: 75, unit: '%',    color: '#1565C0' },
];

export const wasteData = {
  labels: ['Recycled', 'Compost', 'General Waste', 'Hazardous', 'Electronic'],
  datasets: [{
    data: [45, 28, 18, 5, 4],
    backgroundColor: ['#2E7D32', '#43A047', '#F57F17', '#C62828', '#1565C0'],
    borderWidth: 0,
    hoverOffset: 8,
  }]
};

export const energyData = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
  datasets: [
    {
      label: 'Solar',
      data: [120, 145, 180, 200, 195, 210, 190, 165, 120, 80, 45],
      borderColor: '#F9A825',
      backgroundColor: 'rgba(249,168,37,0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Grid',
      data: [80, 90, 85, 95, 100, 110, 120, 130, 150, 140, 110],
      borderColor: '#1565C0',
      backgroundColor: 'rgba(21,101,192,0.1)',
      fill: true,
      tension: 0.4,
    }
  ]
};

// ---------- Analytics ----------
export const visitorAnalytics = {
  labels: ['Match Day 1', 'Match Day 2', 'Match Day 3', 'Match Day 4', 'Match Day 5', 'Match Day 6'],
  datasets: [
    {
      label: 'Domestic Fans',
      data: [28000, 32000, 29500, 35000, 38000, 42000],
      backgroundColor: 'rgba(21,101,192,0.85)',
      borderRadius: 8,
      borderSkipped: false,
    },
    {
      label: 'International Fans',
      data: [18000, 22000, 20000, 25000, 28000, 26420],
      backgroundColor: 'rgba(0,172,193,0.85)',
      borderRadius: 8,
      borderSkipped: false,
    }
  ]
};

export const peakHoursData = {
  labels: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
  datasets: [{
    label: 'Fan Activity Index',
    data: [15, 25, 45, 65, 75, 72, 78, 85, 92, 98, 95, 88, 70, 40],
    borderColor: '#1E88E5',
    backgroundColor: 'rgba(30,136,229,0.15)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#1565C0',
    pointRadius: 4,
  }]
};

// ---------- AI Chat Responses ----------
export const aiSuggestions = [
  'Show me crowd density by zone',
  'What is the current sustainability score?',
  'Are there any active incidents?',
  'Predict peak crowd time today',
  'Show volunteer assignment status',
  'What is Gate C queue time?',
];

export const aiResponses = {
  'crowd': 'Based on real-time sensor data, Gate C is currently at **97% capacity** with a 22-minute queue. I recommend redirecting fans to Gate D (65% capacity) and Gate F (42% capacity) via the mobile app push notification. Automated PA announcements can be triggered via the Crowd Management module.',
  'sustainability': 'The current sustainability score is **87/100** — 3 points above last match! Key highlights: 91% waste recycling, 73% renewable energy, and water usage 18% below baseline. You\'re on track to exceed the 85% target for the tournament.',
  'incident': 'There are **7 active alerts** right now. High priority: Crowd density at Gate C (97%), medical standby at South Stand. 2 incidents are in-progress and 2 have been resolved this shift. Recommend deploying reserve crowd management team to Gate C immediately.',
  'peak': 'AI prediction model forecasts the next crowd peak at **18:30 local time** with an estimated 76,000 fans on-site. Confidence: 94%. Historical patterns show a secondary peak 30 minutes post-kickoff. Pre-staging additional entry staff at Gates A, B, and E is recommended.',
  'volunteer': 'Currently **1,248 volunteers active** across all zones. 8 volunteers are on break, 3 on standby. Zone coverage: all critical areas staffed. Notable: Gate B and Gate C could benefit from 2 additional crowd marshals each given current density levels.',
  'queue': 'Gate C queue time: **22.1 minutes** — CRITICAL. Gate B: 15.6 min — WARNING. Gates A, D, F are under 5 minutes each. AI routing suggests using the mobile app to send 2,000 fans from Gate C to Gate F, potentially reducing queue time by 60% in 15 minutes.',
  'default': 'I\'m analyzing the latest stadium operations data. Based on current patterns, all critical systems are monitored. Please specify what you\'d like to know: crowd density, volunteer status, incidents, transportation, or sustainability metrics.'
};

// ---------- Accessibility Services ----------
export const accessibilityServices = [
  { id: 'wheelchair', name: 'Wheelchair Assistance',  description: 'Dedicated escorts from entrance to seating', available: 8,  icon: '♿', color: '#1565C0' },
  { id: 'elevator',   name: 'Priority Elevator Access',description: 'Fast-track elevator access for mobility needs', available: 12, icon: '🛗', color: '#00ACC1' },
  { id: 'audio',      name: 'Audio Description',       description: 'Live audio commentary for visually impaired',  available: 50, icon: '🎧', color: '#2E7D32' },
  { id: 'sign',       name: 'Sign Language Interpreter',description: 'BSL/ASL interpreters at key locations',       available: 4,  icon: '🤟', color: '#F57F17' },
  { id: 'sensory',    name: 'Sensory Quiet Zone',       description: 'Low-stimulation areas for sensory sensitivities',available: 3, icon: '🧘', color: '#7B1FA2' },
  { id: 'guide',      name: 'Wayfinding Assistance',    description: 'Personal guide for navigation assistance',     available: 15, icon: '🗺️', color: '#C62828' },
];
