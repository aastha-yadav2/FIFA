import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, RefreshCw, Zap, Wrench, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useRealTime } from '../context/RealTimeContext';
import { useOperations } from '../context/OperationsContext';
import { aiSuggestions } from '../data/mockData';
import {
  streamGeminiMessage,
  sendGeminiWithTools,
  isGeminiAvailable,
} from '../lib/gemini';
import { executeTool } from '../lib/geminiTools';

/* ── Context-aware mock fallback ─────────────────────────── */
function getMockResponse(text, ctx) {
  const t = text.toLowerCase();
  const zones = ctx?.zones || [];
  const gates = ctx?.gates || [];

  if (t.includes('crowd') || t.includes('density') || t.includes('gate')) {
    const critical = zones.filter(z => z.status === 'critical').map(z => z.zone).join(', ') || 'none';
    const leastGate = [...gates].sort((a, b) => a.occupancy - b.occupancy)[0];
    return `Current crowd analysis:\n\n**${zones.length} zones monitored** — critical zones: ${critical || '✅ None'}.\n\nGate congestion breakdown:\n${gates.slice(0, 4).map(g => `• **${g.name}**: ${g.occupancy}% capacity, ${g.queue} min queue (${g.status?.toUpperCase()})`).join('\n')}\n\n**Recommendation**: Direct fans to **${leastGate?.name || 'Gate D'}** — only ${leastGate?.occupancy || 42}% full with a ${leastGate?.queue || 3}-minute wait.`;
  }
  if (t.includes('sustain') || t.includes('green') || t.includes('eco')) {
    const score = ctx?.sustainScore || 87;
    return `Sustainability status update:\n\n**Overall Score: ${score}/100** 🌿\n\nKey metrics:\n• Renewable energy share: **78%** (+5% vs last match)\n• Waste diversion rate: **94%** — exceeding 90% target\n• Carbon footprint: **2.1 kg CO₂/fan** — below 3.0 kg target\n• Water recycling: **68%** of total usage\n\n**Recommendation**: Activate Catering Zone overflow composting — diversion can reach **97%** before final whistle.`;
  }
  if (t.includes('incident') || t.includes('alert') || t.includes('emergency')) {
    return `Incident status overview:\n\n**${ctx?.alertCount || 7} active alerts** across the venue.\n\nTop priority items:\n• 🚨 Gate C overcrowding — crowd team deployed\n• ⚠️ Medical standby requested — Concourse 2\n• 🔊 PA announcement queued for North Stand\n\n**Recommendation**: Escalate Gate C to **HIGH** priority and pre-position 2 additional stewards at Section 112 entrance.`;
  }
  if (t.includes('peak') || t.includes('predict') || t.includes('forecast')) {
    return `Predictive intelligence for current match:\n\n**Halftime in ~18 minutes** — secondary crowd surge predicted.\n\nExpected impact:\n• Gate A & B queues: **+8–12 minutes** above current\n• Concourse density: projected to hit **91%** in Sections 104–108\n• Metro Line 2 crowding: rising to **HIGH** within 25 minutes\n\n**Recommendation**: Pre-position 3 volunteers at Gate A now, and broadcast transport advisory to **North Stand** fans before the surge begins.`;
  }
  if (t.includes('volunteer')) {
    return `Volunteer deployment status:\n\n**Active volunteers on site** across all zones.\n\nZone assignments:\n• North Stand: ✅ Full coverage\n• Gate Area: ⚠️ 2 volunteers short\n• Accessibility: ✅ Adequately staffed\n• Catering: ✅ On schedule\n\n**Recommendation**: Redeploy 2 volunteers from Media Zone (currently underutilised) to Gate Area to address the coverage gap.`;
  }
  if (t.includes('queue') || t.includes('wait') || t.includes('line')) {
    const gates = ctx?.gates || [];
    const sorted = [...gates].sort((a, b) => b.queue - a.queue);
    return `Gate queue analysis (live):\n\n${sorted.slice(0, 4).map(g => `• **${g.name}**: ${g.queue} min — ${g.status?.toUpperCase()}`).join('\n')}\n\nAverage wait time: **${ctx?.avgQueue || '7.2'} minutes**\n\n**Recommendation**: Broadcast targeted PA announcement to fans in Sections 101–106 directing them to **${[...gates].sort((a,b) => a.queue - b.queue)[0]?.name || 'Gate D'}** — currently the shortest wait.`;
  }
  return `StadiumMind AI assistant is ready to help with FIFA World Cup 2026 operations.\n\nI have live access to:\n• **${zones.length} zone** occupancy feeds\n• **${gates.length} gate** queue and capacity data\n• **${ctx?.alertCount || 7}** active operational alerts\n• Volunteer deployments and incident reports\n\nAsk me about crowd density, gate queues, incidents, volunteer status, sustainability, or predictive analytics.`;
}

/* ── Bold / section text renderer ───────────────────────── */
function renderText(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

/* ── Tool result bubble ──────────────────────────────────── */
function ToolBubble({ toolName, result }) {
  const label = toolName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const success = result?.success !== false && !result?.error;
  return (
    <div className="tool-bubble">
      <div className="tool-bubble__header">
        <Wrench size={12} />
        <span className="tool-bubble__name">{label}</span>
        {success
          ? <CheckCircle2 size={12} color="var(--success)" />
          : <span style={{ color: 'var(--error)', fontSize: '0.7rem' }}>⚠ Failed</span>
        }
      </div>
      <p className="tool-bubble__msg">
        {result?.message || result?.error || JSON.stringify(result).slice(0, 120)}
      </p>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function AIAssistant() {
  const { t }           = useTranslation();
  const { currentUser } = useAuth();
  const { zones, gates, kpis } = useRealTime();
  const ops             = useOperations();
  const geminiOn        = isGeminiAvailable();

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: `Hello, ${currentUser?.displayName?.split(' ')[0] || 'Commander'}! 👋\n\nI'm **StadiumMind AI**, your intelligent operations assistant for FIFA World Cup 2026. I have real-time access to crowd data, incidents, volunteer status, sustainability metrics, and predictive analytics.\n\nHow can I help you manage today's match operations?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [input,   setInput]   = useState('');
  const [typing,  setTyping]  = useState(false);
  const bottomRef  = useRef(null);
  const historyRef = useRef(messages);

  useEffect(() => { historyRef.current = messages; }, [messages]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  /* Build live context snapshot */
  const getLiveContext = () => ({
    zones,
    gates,
    totalFans:    kpis.find(k => k.id === 'fans')?.value    || '68,420',
    alertCount:   kpis.find(k => k.id === 'alerts')?.value  || '7',
    sustainScore: kpis.find(k => k.id === 'sustain')?.value || '87',
    avgQueue:     kpis.find(k => k.id === 'queue')?.value   || '7.2',
    secLevel: 'GREEN',
  });

  /* Tool call handler — bridges Gemini → OperationsContext */
  const handleToolCall = async (name, args) => {
    const ctx = getLiveContext();
    const result = executeTool(name, args, ctx, ops);

    // Inject a tool-result bubble into the chat
    const toolMsg = {
      id: Date.now() + Math.random(),
      role: 'tool',
      toolName: name,
      toolResult: result,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, toolMsg]);

    return result;
  };

  const sendMessage = async (text) => {
    if (!text.trim() || typing) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const aiMsgId = Date.now() + 1;
    const ctx = getLiveContext();

    if (geminiOn) {
      // Try tool-calling first (action-oriented queries), else stream
      const isActionQuery = /incident|volunteer|announce|reroute|alert|assign|broadcast/i.test(text);

      if (isActionQuery) {
        // Add a "thinking" placeholder
        setMessages(prev => [...prev, {
          id: aiMsgId, role: 'assistant', text: '', streaming: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
        setTyping(false);

        try {
          await sendGeminiWithTools(
            historyRef.current,
            text.trim(),
            ctx,
            handleToolCall,
            (finalText) => {
              setMessages(prev =>
                prev.map(m => m.id === aiMsgId ? { ...m, text: finalText, streaming: false } : m)
              );
            }
          );
        } catch (err) {
          console.error('Tool-call error:', err);
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId
              ? { ...m, text: '⚠️ AI service error. ' + getMockResponse(text, ctx), streaming: false }
              : m
            )
          );
        }
      } else {
        // Streaming response for informational queries
        const placeholder = {
          id: aiMsgId, role: 'assistant', text: '', streaming: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, placeholder]);
        setTyping(false);

        try {
          await streamGeminiMessage(
            historyRef.current, text.trim(), ctx,
            (partial) => {
              setMessages(prev =>
                prev.map(m => m.id === aiMsgId ? { ...m, text: partial } : m)
              );
            }
          );
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId ? { ...m, streaming: false } : m)
          );
        } catch (err) {
          console.error('Gemini error:', err);
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId
              ? { ...m, text: '⚠️ AI service unavailable. ' + getMockResponse(text, ctx), streaming: false }
              : m
            )
          );
        }
      }
    } else {
      // Context-aware mock with realistic typing delay
      await new Promise(r => setTimeout(r, 900 + Math.random() * 800));
      setTyping(false);
      setMessages(prev => [...prev, {
        id: aiMsgId,
        role: 'assistant',
        text: getMockResponse(text, ctx),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  };

  const handleSubmit = e => { e.preventDefault(); sendMessage(input); };

  const clearChat = () => {
    setMessages([{
      id: 1,
      role: 'assistant',
      text: `Chat cleared. Ready to assist with FIFA World Cup 2026 operations!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  return (
    <div className="ai-page animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="ai-page__avatar">
            <Bot size={22} color="#64B5F6" />
          </div>
          <div>
            <h1>{t('ai.title')}</h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {geminiOn
                ? <><Zap size={12} color="var(--success)" /> {t('ai.geminiLive')}</>
                : <><span style={{ opacity: 0.6 }}>●</span> {t('ai.mockMode')}</>
              }
            </p>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={clearChat} id="btn-clear-chat">
          <RefreshCw size={14} /> {t('ai.clear')}
        </button>
      </div>

      <div className="ai-chat">
        {/* Messages */}
        <div className="ai-chat__messages" id="chat-messages">
          {messages.map((msg) => {
            /* Tool result bubble */
            if (msg.role === 'tool') {
              return (
                <div key={msg.id} className="ai-message ai-message--tool animate-fade-in">
                  <ToolBubble toolName={msg.toolName} result={msg.toolResult} />
                </div>
              );
            }

            return (
              <div key={msg.id} className={`ai-message ai-message--${msg.role} animate-fade-in`}>
                <div className="ai-message__icon">
                  {msg.role === 'assistant'
                    ? <Bot size={16} color="#64B5F6" />
                    : <User size={16} color="#fff" />
                  }
                </div>
                <div className="ai-message__bubble">
                  {msg.text
                    ? msg.text.split('\n').map((line, i) => (
                      <p key={i} style={{ marginBottom: line ? '6px' : 0 }}>{renderText(line)}</p>
                    ))
                    : <div className="ai-typing"><span /><span /><span /></div>
                  }
                  {msg.streaming && <span className="ai-streaming-cursor" />}
                  <span className="ai-message__time">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="ai-message ai-message--assistant animate-fade-in">
              <div className="ai-message__icon">
                <Bot size={16} color="#64B5F6" />
              </div>
              <div className="ai-message__bubble ai-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="ai-suggestions">
            <p className="ai-suggestions__label"><Sparkles size={12} /> {t('ai.suggested')}</p>
            <div className="ai-suggestions__grid">
              {aiSuggestions.map((s, i) => (
                <button
                  key={i}
                  className="ai-suggestion-btn"
                  onClick={() => sendMessage(s)}
                  id={`btn-suggestion-${i}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form className="ai-chat__input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            className="ai-chat__input"
            placeholder={t('ai.placeholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={typing}
            id="input-ai-message"
          />
          <button
            type="submit"
            className="btn btn-primary ai-chat__send"
            disabled={typing || !input.trim()}
            id="btn-send-message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <style>{`
        .ai-page { display: flex; flex-direction: column; height: calc(100vh - var(--topbar-height) - var(--space-xl) * 2); }
        .ai-page .page-header { display: flex; align-items: center; justify-content: space-between; }
        .ai-page__avatar {
          width: 46px; height: 46px;
          background: rgba(30,136,229,0.12);
          border: 1px solid rgba(30,136,229,0.25);
          border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
        }
        .ai-chat {
          flex: 1;
          background: var(--surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .ai-chat__messages {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ai-message { display: flex; gap: 12px; align-items: flex-start; max-width: 85%; }
        .ai-message--user { flex-direction: row-reverse; align-self: flex-end; }
        .ai-message--tool { max-width: 95%; align-self: center; width: 100%; }
        .ai-message__icon {
          width: 34px; height: 34px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .ai-message--assistant .ai-message__icon { background: rgba(30,136,229,0.1); border: 1px solid rgba(30,136,229,0.2); }
        .ai-message--user .ai-message__icon { background: var(--primary); }

        .ai-message__bubble {
          padding: 12px 16px;
          border-radius: var(--radius-lg);
          font-size: 0.9rem;
          line-height: 1.55;
          position: relative;
        }
        .ai-message--assistant .ai-message__bubble {
          background: var(--surface-variant);
          border: 1px solid var(--border);
          border-radius: 4px var(--radius-lg) var(--radius-lg) var(--radius-lg);
          color: var(--text-primary);
        }
        .ai-message--user .ai-message__bubble {
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          color: #fff;
          border-radius: var(--radius-lg) 4px var(--radius-lg) var(--radius-lg);
        }
        .ai-message__time {
          display: block;
          font-size: 0.7rem;
          margin-top: 6px;
          opacity: 0.6;
        }

        /* Tool bubble */
        .tool-bubble {
          background: rgba(46,125,50,0.06);
          border: 1px solid rgba(46,125,50,0.2);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          width: 100%;
        }
        .tool-bubble__header {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 5px;
          color: var(--success);
        }
        .tool-bubble__name {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          flex: 1;
        }
        .tool-bubble__msg {
          font-size: 0.8375rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        /* Streaming cursor */
        .ai-streaming-cursor {
          display: inline-block;
          width: 2px; height: 1em;
          background: var(--primary-light);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: pulse 0.8s step-end infinite;
        }

        .ai-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 14px 16px;
          min-width: 60px;
        }
        .ai-typing span {
          width: 7px; height: 7px;
          background: var(--primary-light);
          border-radius: 50%;
          animation: typingDot 1.2s ease-in-out infinite;
        }
        .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ai-typing span:nth-child(3) { animation-delay: 0.4s; }

        .ai-suggestions {
          padding: var(--space-md) var(--space-xl);
          border-top: 1px solid var(--border);
        }
        .ai-suggestions__label {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.75rem; font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase; letter-spacing: 0.05em;
          margin-bottom: 10px;
        }
        .ai-suggestions__grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ai-suggestion-btn {
          padding: 7px 14px;
          background: var(--primary-surface);
          color: var(--primary);
          border: 1px solid rgba(21,101,192,0.2);
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .ai-suggestion-btn:hover {
          background: var(--primary);
          color: #fff;
          transform: translateY(-1px);
        }

        .ai-chat__input-row {
          display: flex;
          gap: 10px;
          padding: var(--space-md) var(--space-xl);
          border-top: 1px solid var(--border);
          background: var(--surface);
        }
        .ai-chat__input {
          flex: 1;
          padding: 12px 16px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-xl);
          font-size: 0.9375rem;
          color: var(--text-primary);
          background: var(--surface-variant);
          outline: none;
          transition: all var(--transition-fast);
        }
        .ai-chat__input:focus {
          border-color: var(--primary-light);
          box-shadow: 0 0 0 3px rgba(30,136,229,0.1);
          background: var(--surface);
        }
        .ai-chat__send {
          width: 44px; height: 44px;
          padding: 0;
          border-radius: var(--radius-xl);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ai-chat__send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
      `}</style>
    </div>
  );
}
