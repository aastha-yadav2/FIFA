// ============================================================
// Gemini Function-Calling Tool Definitions + Executors
// Schema auto-registered when VITE_GEMINI_API_KEY is present.
// ============================================================

/* ── 5 Tool Declarations (Gemini function-calling schema) ─── */
export const TOOL_DECLARATIONS = [
  {
    name: 'get_live_crowd_density',
    description: 'Get real-time crowd density for a specific zone or all zones',
    parameters: {
      type: 'object',
      properties: {
        zone: { type: 'string', description: '"North Stand" | "Gate C" | "all"' }
      },
      required: ['zone']
    }
  },
  {
    name: 'recommend_least_crowded_exit',
    description: 'Recommend least crowded gate/exit from live occupancy & queue data',
    parameters: {
      type: 'object',
      properties: {
        reason: { type: 'string', description: 'Why the recommendation is needed' }
      },
      required: ['reason']
    }
  },
  {
    name: 'create_incident',
    description: 'Create a new safety/security incident and alert the response team',
    parameters: {
      type: 'object',
      properties: {
        title:       { type: 'string' },
        severity:    { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
        zone:        { type: 'string' },
        description: { type: 'string' },
        category:    { type: 'string', enum: ['safety', 'medical', 'security', 'crowd', 'infrastructure', 'other'] }
      },
      required: ['title', 'severity', 'zone']
    }
  },
  {
    name: 'assign_volunteer',
    description: 'Assign an available volunteer to a zone or task',
    parameters: {
      type: 'object',
      properties: {
        zone:     { type: 'string' },
        task:     { type: 'string' },
        priority: { type: 'string', enum: ['low', 'normal', 'urgent'] }
      },
      required: ['zone', 'task']
    }
  },
  {
    name: 'generate_stadium_announcement',
    description: 'Generate and log a PA announcement for stadium broadcast',
    parameters: {
      type: 'object',
      properties: {
        message_type: { type: 'string', enum: ['crowd_flow', 'safety', 'information', 'emergency', 'transport'] },
        target_zone:  { type: 'string' },
        language:     { type: 'string', enum: ['en', 'es', 'fr', 'ar'] }
      },
      required: ['message_type', 'target_zone']
    }
  }
];

/* ── Individual executors ────────────────────────────────── */
function execCrowdDensity(args, ctx) {
  const { zones = [], gates = [] } = ctx;
  if (args.zone === 'all') {
    return {
      zones: zones.map(z => ({ name: z.zone, pct: z.pct, status: z.status, current: z.current, capacity: z.capacity })),
      gates: gates.map(g => ({ name: g.name, queue_min: g.queue, occupancy: g.occupancy, status: g.status }))
    };
  }
  const q = args.zone.toLowerCase();
  const z = zones.find(z => z.zone.toLowerCase().includes(q));
  const g = gates.find(g => g.name.toLowerCase().includes(q));
  if (z) return { name: z.zone, pct: z.pct, status: z.status, current: z.current, capacity: z.capacity };
  if (g) return { name: g.name, queue_min: g.queue, occupancy: g.occupancy, status: g.status };
  return { error: `Zone "${args.zone}" not found. Zones: ${zones.map(z => z.zone).join(', ')}` };
}

function execRecommendExit(args, ctx) {
  const gates = [...(ctx.gates || [])].sort((a, b) => a.occupancy - b.occupancy);
  if (!gates.length) return { error: 'No gate data' };
  return {
    recommended: { gate: gates[0].name, queue_min: gates[0].queue, occupancy: gates[0].occupancy },
    alternative: { gate: gates[1]?.name, queue_min: gates[1]?.queue, occupancy: gates[1]?.occupancy },
    avoid: gates.slice(-2).map(g => g.name),
    reason: args.reason
  };
}

function execCreateIncident(args, ops) {
  return ops.createIncident({
    title: args.title, severity: args.severity, zone: args.zone,
    description: args.description || '', category: args.category || 'other'
  });
}

function execAssignVolunteer(args, ops) {
  return ops.assignVolunteer({ zone: args.zone, task: args.task, priority: args.priority || 'normal' });
}

function execAnnouncement(args, ops) {
  const templates = {
    crowd_flow:  `Attention fans in ${args.target_zone}: please proceed to the nearest available gate to improve crowd flow. Gates D and F have shorter waiting times.`,
    safety:      `Important safety notice for ${args.target_zone}: please follow steward directions and do not block emergency exits.`,
    information: `Information for fans in ${args.target_zone}: real-time updates are available on the StadiumMind app.`,
    emergency:   `Emergency announcement for ${args.target_zone}: please remain calm and follow staff instructions immediately.`,
    transport:   `Transport update for ${args.target_zone}: shuttle buses are now available at Exit 3. Metro Line 2 is running with delays.`,
  };
  const text = templates[args.message_type] || `Announcement for ${args.target_zone}.`;
  return ops.logAnnouncement({ text, message_type: args.message_type, target_zone: args.target_zone, language: args.language || 'en' });
}

/* ── Main dispatcher ─────────────────────────────────────── */
export function executeTool(name, args, ctx, ops) {
  switch (name) {
    case 'get_live_crowd_density':         return execCrowdDensity(args, ctx);
    case 'recommend_least_crowded_exit':   return execRecommendExit(args, ctx);
    case 'create_incident':                return execCreateIncident(args, ops);
    case 'assign_volunteer':               return execAssignVolunteer(args, ops);
    case 'generate_stadium_announcement':  return execAnnouncement(args, ops);
    default: return { error: `Unknown tool: ${name}` };
  }
}
