// ============================================================
// StadiumMind AI — Gemini AI Client
// Uses gemini-1.5-flash with stadium context injection.
// Falls back to mock responses when no API key is configured.
//
// TO ENABLE LIVE AI: create .env with VITE_GEMINI_API_KEY=<key>
// Get a key at: https://aistudio.google.com/app/apikey
// ============================================================
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TOOL_DECLARATIONS } from './geminiTools';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_AVAILABLE = !!API_KEY && API_KEY !== 'your_gemini_api_key_here';

let genAI    = null;
let model    = null;   // chat model (streaming, no tools)
let toolModel = null;  // tool-calling model (function declarations attached)

if (GEMINI_AVAILABLE) {
  genAI = new GoogleGenerativeAI(API_KEY);

  model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { maxOutputTokens: 350, temperature: 0.75, topP: 0.95 },
  });

  toolModel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
    generationConfig: { maxOutputTokens: 500, temperature: 0.4 },
  });
}

export const isGeminiAvailable = () => GEMINI_AVAILABLE;

/* ── System prompt builder ──────────────────────────────── */
function buildSystemPrompt(ctx = {}) {
  const zones = ctx.zones || [];
  const gates = ctx.gates || [];
  return `
You are StadiumMind AI, the intelligent operations assistant for FIFA World Cup 2026.
You assist stadium staff with real-time crowd management, safety, and operations.

CURRENT LIVE DATA (updated every 6 seconds):
── ZONE OCCUPANCY ──
${zones.map(z => `• ${z.zone}: ${z.pct}% full (${z.current?.toLocaleString()} / ${z.capacity?.toLocaleString()}) — ${z.status?.toUpperCase()}`).join('\n') || 'Loading...'}

── GATE QUEUE TIMES ──
${gates.map(g => `• ${g.name}: ${g.queue} min queue, ${g.occupancy}% capacity — ${g.status?.toUpperCase()}`).join('\n') || 'Loading...'}

── SUMMARY ──
• Total fans on site: ${ctx.totalFans || '68,420'}
• Active alerts: ${ctx.alertCount || '7'}
• Sustainability score: ${ctx.sustainScore || '87'}/100
• Security level: ${ctx.secLevel || 'GREEN'}

INSTRUCTIONS:
- Give concise, actionable, data-driven responses (max 150 words)
- Reference specific zones, gates and numbers from the live data above
- Use **bold** for key metrics and action items
- You can call tools to create incidents, assign volunteers, or broadcast announcements
- Always end with a specific operational recommendation
`.trim();
}

function buildHistory(messageHistory) {
  return messageHistory
    .filter(m => m.id !== 1)
    .slice(-8)
    .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] }));
}

/* ── Standard streaming chat (no tools) ─────────────────── */
export async function streamGeminiMessage(messageHistory, userText, ctx = {}, onChunk) {
  if (!GEMINI_AVAILABLE || !model) return null;
  const chat = model.startChat({
    history: [
      { role: 'user',  parts: [{ text: buildSystemPrompt(ctx) }] },
      { role: 'model', parts: [{ text: 'Understood. StadiumMind AI ready.' }] },
      ...buildHistory(messageHistory),
    ],
  });
  const result = await chat.sendMessageStream(userText);
  let full = '';
  for await (const chunk of result.stream) { full += chunk.text(); onChunk(full); }
  return full;
}

/* ── Tool-calling chat ───────────────────────────────────── */
// onToolCall(name, args) → must return the tool result object
// onFinalText(text) → called with final answer after tool loop
export async function sendGeminiWithTools(messageHistory, userText, ctx = {}, onToolCall, onFinalText) {
  if (!GEMINI_AVAILABLE || !toolModel) return null;

  const chat = toolModel.startChat({
    history: [
      { role: 'user',  parts: [{ text: buildSystemPrompt(ctx) }] },
      { role: 'model', parts: [{ text: 'Understood. StadiumMind AI with tool access ready.' }] },
      ...buildHistory(messageHistory),
    ],
  });

  let response = (await chat.sendMessage(userText)).response;

  // Tool-calling loop — Gemini may chain multiple tool calls
  for (let i = 0; i < 3; i++) {
    const calls = response.functionCalls?.() || [];
    if (!calls.length) break;

    const toolParts = [];
    for (const fc of calls) {
      const result = onToolCall ? await onToolCall(fc.name, fc.args) : { error: 'No handler' };
      toolParts.push({ functionResponse: { name: fc.name, response: result } });
    }
    response = (await chat.sendMessage(toolParts)).response;
  }

  const text = response.text();
  if (onFinalText) onFinalText(text);
  return text;
}

/* ── Ops Brief ───────────────────────────────────────────── */
export async function generateOpsBrief(ctx = {}) {
  if (GEMINI_AVAILABLE && model) {
    const zones  = ctx.zones || [];
    const gates  = ctx.gates || [];
    const prompt = `You are StadiumMind AI. Generate a concise 3-section executive operations brief.

LIVE STADIUM DATA:
Total Fans: ${ctx.totalFans} | Active Alerts: ${ctx.alertCount} | Security: ${ctx.secLevel} | Sustainability: ${ctx.sustainScore}/100

ZONES: ${zones.map(z => `${z.zone} ${z.pct}%(${z.status})`).join(' | ')}
GATES: ${gates.map(g => `${g.name} ${g.queue}min/${g.occupancy}%`).join(' | ')}

Write exactly 3 sections with these headers:
### Executive Summary
### Immediate Actions Required  
### Predictive Intelligence

Be specific with numbers. Use **bold** for critical items. Max 200 words total.`;

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch { /* fall through to mock */ }
  }
  return buildMockBrief(ctx);
}

function buildMockBrief(ctx) {
  const zones  = ctx.zones  || [];
  const gates  = ctx.gates  || [];
  const critical = zones.filter(z => z.status === 'critical');
  const leastGate = [...gates].sort((a, b) => a.occupancy - b.occupancy)[0];
  const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return `### Executive Summary
Stadium is operating at **${ctx.totalFans || '68,420'}** fans on site with overall density at **${zones[0]?.pct || 73}%**. ${critical.length ? `**${critical.map(z => z.zone).join(' & ')}** are at CRITICAL capacity and require immediate intervention.` : 'All zones within safe parameters.'} Security level: **${ctx.secLevel || 'GREEN'}** · Sustainability: **${ctx.sustainScore || 86}/100**.

### Immediate Actions Required
- ${critical[0] ? `🚨 Deploy stewards to **${critical[0].zone}** — ${critical[0].pct}% capacity` : '✅ Maintain current deployment'}
- 📢 PA broadcast directing fans to **${leastGate?.name || 'Gate D'}** (${leastGate?.occupancy || 42}% — shortest queue)
- 🚌 Dispatch 2 additional shuttle buses from Lot C (Metro Line 2 HIGH crowding)
- 🤝 Reassign 3 volunteers from Media Zone → ${critical[0]?.zone || 'North Stand'}
- ♻️ Activate Waste Zone B overflow — diversion rate at 94%

### Predictive Intelligence
Based on current patterns, a **secondary peak is expected in 18–25 minutes** as halftime ends. **${gates.filter(g => g.status !== 'normal').map(g => g.name).join(', ') || 'Gate B and Gate C'}** are projected to reach 15-min queues. Pre-position **2 medical units** at North Stand tunnel entrances.

---
*Generated ${ts} · Demo Mode — add \`VITE_GEMINI_API_KEY\` to enable live Gemini AI*`;
}
