import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Zap, Shield, Users, BarChart3, Globe, Cpu, ArrowRight, CheckCircle } from 'lucide-react';

const FEATURES = [
  { icon: Cpu,      title: 'AI-Powered Analytics',    desc: 'Gemini AI processes 50M+ data points in real-time for predictive crowd management and safety optimization.' },
  { icon: Users,    title: 'Crowd Intelligence',       desc: '360° crowd density monitoring across all zones with computer vision and IoT sensor fusion.' },
  { icon: Shield,   title: 'Incident Command',         desc: 'Automated incident detection, AI-assisted triage, and coordinated multi-agency emergency response.' },
  { icon: BarChart3,title: 'Executive Dashboard',      desc: 'Live KPIs, interactive charts, and AI-generated insights for stadium operations leadership.' },
  { icon: Globe,    title: 'Multi-Modal Transport',    desc: 'Integrated metro, bus, parking, and ride-share coordination with real-time capacity updates.' },
  { icon: Zap,      title: 'Sustainability Monitor',   desc: 'Carbon tracking, renewable energy management, and waste analytics for a greener World Cup.' },
  { icon: Trophy,   title: 'Volunteer Hub',            desc: 'AI-optimized volunteer scheduling, real-time zone assignments, and instant communications.' },
];

const STATS = [
  { value: '94K+',  label: 'Fan Capacity' },
  { value: '1,200+',label: 'Volunteers Managed' },
  { value: '50M+',  label: 'Data Points / Day' },
  { value: '99.9%', label: 'System Uptime' },
];

const CAPABILITIES = [
  'Real-time crowd density heatmaps',
  'AI incident prediction & response',
  'Multilingual fan navigation',
  'Sustainability scoring engine',
  'Automated safety alerts',
  'Live volunteer coordination',
];

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouse = e => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty('--rx', `${y}deg`);
      el.style.setProperty('--ry', `${x}deg`);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="landing">
      {/* ---- NAVBAR ---- */}
      <nav className="landing__nav">
        <div className="landing__nav-brand">
          <Trophy size={24} color="#64B5F6" />
          <span>StadiumMind <strong>AI</strong></span>
        </div>
        <div className="landing__nav-links">
          <a href="#features">Features</a>
          <a href="#stats">Stats</a>
          <button className="btn btn-primary btn-sm" id="btn-nav-login" onClick={() => navigate('/login')}>
            Sign In <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ---- HERO ---- */}
      <section className="landing__hero" ref={heroRef}>
        <div className="landing__hero-bg">
          <div className="landing__hero-orb landing__hero-orb--1" />
          <div className="landing__hero-orb landing__hero-orb--2" />
          <div className="landing__hero-orb landing__hero-orb--3" />
        </div>

        <div className="landing__hero-content animate-fade-in">
          <div className="landing__hero-pill">
            <span className="status-dot online" />
            FIFA World Cup 2026 · North America
          </div>

          <h1 className="display-xl landing__hero-title">
            The Smartest<br />
            <span className="landing__hero-gradient">Stadium Operations</span><br />
            Platform Ever Built
          </h1>

          <p className="body-lg landing__hero-desc">
            StadiumMind AI combines Generative AI, real-time IoT sensors, and predictive analytics
            to orchestrate every aspect of the FIFA World Cup 2026 fan experience.
          </p>

          <div className="landing__hero-actions">
            <button
              className="btn btn-primary btn-lg animate-glow"
              id="btn-hero-get-started"
              onClick={() => navigate('/login')}
            >
              Launch Operations Center <ArrowRight size={18} />
            </button>
            <button className="btn btn-ghost btn-lg" id="btn-hero-demo" onClick={() => navigate('/login')}>
              View Live Demo
            </button>
          </div>

          <div className="landing__hero-capabilities">
            {CAPABILITIES.map(cap => (
              <div key={cap} className="landing__capability">
                <CheckCircle size={14} color="var(--accent)" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="landing__hero-visual">
          <div className="stadium-3d-wrapper">
            {/* Ambient glow behind stadium */}
            <div className="stadium-ambient-glow" />
            
            {/* 3D Stadium Scene */}
            <div className="stadium-3d-scene">
              <div className="stadium-3d-container">
                {/* Stadium Base / Foundation */}
                <div className="stadium-base" />
                
                {/* Stadium Field */}
                <div className="stadium-field">
                  <div className="stadium-field-lines" />
                  <div className="stadium-field-center-circle" />
                  <div className="stadium-field-center-line" />
                  <div className="stadium-field-penalty-left" />
                  <div className="stadium-field-penalty-right" />
                </div>
                
                {/* Stadium Stands */}
                <div className="stadium-stand stadium-stand--north">
                  <div className="stand-crowd">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={`n${i}`} className="crowd-dot" style={{ 
                        left: `${5 + (i % 10) * 10}%`, 
                        top: `${15 + Math.floor(i / 10) * 22}%`,
                        animationDelay: `${i * 0.15}s`,
                        background: ['#1E88E5', '#F57F17', '#43A047', '#E53935', '#00ACC1'][i % 5]
                      }} />
                    ))}
                  </div>
                </div>
                <div className="stadium-stand stadium-stand--south">
                  <div className="stand-crowd">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={`s${i}`} className="crowd-dot" style={{ 
                        left: `${5 + (i % 10) * 10}%`, 
                        top: `${15 + Math.floor(i / 10) * 22}%`,
                        animationDelay: `${i * 0.12 + 0.5}s`,
                        background: ['#E53935', '#1E88E5', '#F57F17', '#00ACC1', '#43A047'][i % 5]
                      }} />
                    ))}
                  </div>
                </div>
                <div className="stadium-stand stadium-stand--east">
                  <div className="stand-crowd">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={`e${i}`} className="crowd-dot" style={{ 
                        left: `${10 + (i % 5) * 18}%`, 
                        top: `${15 + Math.floor(i / 5) * 22}%`,
                        animationDelay: `${i * 0.18 + 0.3}s`,
                        background: ['#43A047', '#E53935', '#1E88E5', '#F57F17', '#00ACC1'][i % 5]
                      }} />
                    ))}
                  </div>
                </div>
                <div className="stadium-stand stadium-stand--west">
                  <div className="stand-crowd">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={`w${i}`} className="crowd-dot" style={{ 
                        left: `${10 + (i % 5) * 18}%`, 
                        top: `${15 + Math.floor(i / 5) * 22}%`,
                        animationDelay: `${i * 0.14 + 0.7}s`,
                        background: ['#00ACC1', '#43A047', '#F57F17', '#1E88E5', '#E53935'][i % 5]
                      }} />
                    ))}
                  </div>
                </div>

                {/* Stadium Roof Ring */}
                <div className="stadium-roof" />

                {/* Floodlights */}
                <div className="floodlight floodlight--1">
                  <div className="floodlight-pole" />
                  <div className="floodlight-beam" />
                </div>
                <div className="floodlight floodlight--2">
                  <div className="floodlight-pole" />
                  <div className="floodlight-beam" />
                </div>
                <div className="floodlight floodlight--3">
                  <div className="floodlight-pole" />
                  <div className="floodlight-beam" />
                </div>
                <div className="floodlight floodlight--4">
                  <div className="floodlight-pole" />
                  <div className="floodlight-beam" />
                </div>

                {/* Scanning laser line */}
                <div className="stadium-scan-line" />
              </div>
            </div>

            {/* Floating Holographic Panels */}
            <div className="holo-panel holo-panel--header">
              <div className="holo-panel-glow" />
              <div className="holo-panel-content">
                <div className="holo-status-row">
                  <span className="holo-status-dot" />
                  <span className="holo-status-text">Live Operations · Match Day 6</span>
                </div>
                <span className="holo-time">21:30 EST</span>
              </div>
            </div>

            <div className="holo-panel holo-panel--fans">
              <div className="holo-panel-glow" />
              <div className="holo-panel-content">
                <div className="holo-metric-label">Total Fans</div>
                <div className="holo-metric-value holo-metric-value--blue">68,420</div>
                <div className="holo-bar">
                  <div className="holo-bar-fill holo-bar-fill--blue" style={{ width: '73%' }} />
                </div>
              </div>
            </div>

            <div className="holo-panel holo-panel--density">
              <div className="holo-panel-glow" />
              <div className="holo-panel-content">
                <div className="holo-metric-label">Crowd Density</div>
                <div className="holo-metric-value holo-metric-value--amber">73%</div>
                <div className="holo-bar">
                  <div className="holo-bar-fill holo-bar-fill--amber" style={{ width: '73%' }} />
                </div>
              </div>
            </div>

            <div className="holo-panel holo-panel--safety">
              <div className="holo-panel-glow" />
              <div className="holo-panel-content">
                <div className="holo-metric-label">Safety Score</div>
                <div className="holo-metric-value holo-metric-value--green">96/100</div>
                <div className="holo-bar">
                  <div className="holo-bar-fill holo-bar-fill--green" style={{ width: '96%' }} />
                </div>
              </div>
            </div>

            <div className="holo-panel holo-panel--alert">
              <div className="holo-panel-glow holo-panel-glow--alert" />
              <div className="holo-panel-content holo-alert-content">
                <span className="holo-alert-icon">🚨</span>
                <span className="holo-alert-text">Gate C density critical — AI rerouting active</span>
              </div>
            </div>

            {/* Floating particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`p${i}`} className="stadium-particle" style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
              }} />
            ))}

            {/* Connection lines from panels to stadium */}
            <svg className="holo-connections" viewBox="0 0 600 500" preserveAspectRatio="none">
              <line x1="170" y1="55" x2="300" y2="200" className="holo-line" />
              <line x1="50" y1="190" x2="220" y2="250" className="holo-line" />
              <line x1="500" y1="160" x2="380" y2="230" className="holo-line" />
              <line x1="480" y1="300" x2="370" y2="280" className="holo-line" />
              <line x1="250" y1="420" x2="300" y2="320" className="holo-line holo-line--alert" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---- STATS ---- */}
      <section className="landing__stats" id="stats">
        {STATS.map((s, i) => (
          <div key={i} className={`landing__stat animate-fade-in delay-${i + 1}`}>
            <div className="landing__stat-value">{s.value}</div>
            <div className="landing__stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ---- FEATURES ---- */}
      <section className="landing__features" id="features">
        <div className="landing__section-header animate-fade-in">
          <div className="landing__section-pill">Platform Capabilities</div>
          <h2 className="display-md">Everything You Need to<br />Run a World Cup</h2>
          <p className="body-lg" style={{ color: '#94A3B8', maxWidth: 560, margin: '0 auto' }}>
            7 AI-powered modules covering every dimension of stadium operations, from crowd safety to sustainability.
          </p>
        </div>

        <div className="landing__features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`landing__feature-card animate-fade-in delay-${(i % 5) + 1}`}
              id={`feature-card-${i}`}
            >
              <div className="landing__feature-icon">
                <f.icon size={24} color="#64B5F6" />
              </div>
              <h3 className="landing__feature-title">{f.title}</h3>
              <p className="landing__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="landing__cta">
        <div className="landing__cta-content animate-fade-in">
          <Trophy size={48} color="#64B5F6" className="animate-float" />
          <h2 className="display-md" style={{ color: '#fff', marginTop: 16 }}>
            Ready to Command the World Cup?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.0625rem', marginTop: 12, maxWidth: 480 }}>
            Access the full StadiumMind AI operations center. Real-time data, AI insights, and complete stadium control.
          </p>
          <button
            className="btn btn-primary btn-lg animate-glow"
            id="btn-cta-launch"
            onClick={() => navigate('/login')}
            style={{ marginTop: 32 }}
          >
            Launch Operations Center <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="landing__footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trophy size={16} color="#64B5F6" />
          <span style={{ fontWeight: 600, color: '#E2E8F0' }}>StadiumMind AI</span>
        </div>
        <p style={{ color: '#475569', fontSize: '0.8125rem' }}>
          © 2026 StadiumMind AI · FIFA World Cup 2026 · Built with Gemini AI
        </p>
      </footer>

      <style>{`
        .landing {
          background: #060D1F;
          min-height: 100vh;
          color: #E2E8F0;
          overflow-x: hidden;
        }

        /* NAV */
        .landing__nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 60px;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(6,13,31,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .landing__nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.125rem;
          font-weight: 500;
          color: #CBD5E1;
        }
        .landing__nav-brand strong { color: #64B5F6; font-weight: 800; }
        .landing__nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .landing__nav-links a {
          color: #94A3B8;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        .landing__nav-links a:hover { color: #E2E8F0; }

        /* HERO */
        .landing__hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          padding: 80px 60px;
          position: relative;
          overflow: hidden;
        }
        .landing__hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .landing__hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
        }
        .landing__hero-orb--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #1565C0, transparent);
          top: -200px; left: -200px;
          animation: float 8s ease-in-out infinite;
        }
        .landing__hero-orb--2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #00ACC1, transparent);
          bottom: -150px; right: -150px;
          animation: float 10s ease-in-out infinite reverse;
        }
        .landing__hero-orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #2E7D32, transparent);
          top: 50%; left: 40%;
          animation: float 12s ease-in-out infinite;
        }

        .landing__hero-content { position: relative; z-index: 1; }
        .landing__hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(30,136,229,0.12);
          border: 1px solid rgba(30,136,229,0.3);
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          color: #90CAF9;
          font-weight: 500;
          margin-bottom: 24px;
        }
        .landing__hero-title {
          color: #F1F5F9;
          margin-bottom: 20px;
          line-height: 1.08;
        }
        .landing__hero-gradient {
          background: linear-gradient(135deg, #64B5F6, #00ACC1, #43A047);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }
        .landing__hero-desc {
          color: #94A3B8;
          margin-bottom: 32px;
          max-width: 520px;
        }
        .landing__hero-actions {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .landing__hero-capabilities {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .landing__capability {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: #94A3B8;
        }

        /* HERO VISUAL — 3D Stadium */
        .landing__hero-visual {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 520px;
        }

        .stadium-3d-wrapper {
          position: relative;
          width: 100%;
          max-width: 580px;
          height: 500px;
          perspective: 900px;
        }

        /* Ambient glow */
        .stadium-ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(30,136,229,0.25) 0%, rgba(0,172,193,0.12) 40%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          animation: stadiumGlowPulse 4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes stadiumGlowPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }

        /* 3D Scene */
        .stadium-3d-scene {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 320px;
          height: 220px;
          transform: translate(-50%, -50%) rotateX(55deg) rotateZ(-30deg);
          transform-style: preserve-3d;
          animation: stadiumFloat 6s ease-in-out infinite;
        }

        @keyframes stadiumFloat {
          0%, 100% { transform: translate(-50%, -50%) rotateX(55deg) rotateZ(-30deg) translateY(0); }
          50% { transform: translate(-50%, -50%) rotateX(55deg) rotateZ(-30deg) translateY(-8px); }
        }

        .stadium-3d-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        /* Stadium Base */
        .stadium-base {
          position: absolute;
          inset: -15px;
          background: linear-gradient(135deg, rgba(10,22,40,0.95), rgba(15,30,55,0.9));
          border-radius: 50%;
          border: 2px solid rgba(30,136,229,0.2);
          box-shadow: 
            0 0 40px rgba(30,136,229,0.15),
            inset 0 0 30px rgba(30,136,229,0.05);
          transform: translateZ(-8px);
        }

        /* Stadium Field */
        .stadium-field {
          position: absolute;
          top: 20%;
          left: 15%;
          width: 70%;
          height: 60%;
          background: linear-gradient(
            180deg,
            #1B5E20 0%, #2E7D32 12%, #1B5E20 12%, #1B5E20 25%,
            #2E7D32 25%, #2E7D32 37%, #1B5E20 37%, #1B5E20 50%,
            #2E7D32 50%, #2E7D32 62%, #1B5E20 62%, #1B5E20 75%,
            #2E7D32 75%, #2E7D32 87%, #1B5E20 87%, #1B5E20 100%
          );
          border-radius: 4px;
          border: 2px solid rgba(255,255,255,0.35);
          transform: translateZ(2px);
          box-shadow: 0 0 20px rgba(46,125,50,0.3);
        }

        .stadium-field-lines {
          position: absolute;
          inset: 0;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 2px;
        }

        .stadium-field-center-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30%;
          height: 40%;
          transform: translate(-50%, -50%);
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 50%;
        }

        .stadium-field-center-line {
          position: absolute;
          top: 0;
          left: 50%;
          width: 1.5px;
          height: 100%;
          background: rgba(255,255,255,0.3);
          transform: translateX(-50%);
        }

        .stadium-field-penalty-left {
          position: absolute;
          top: 25%;
          left: 0;
          width: 15%;
          height: 50%;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-left: none;
          border-radius: 0 3px 3px 0;
        }

        .stadium-field-penalty-right {
          position: absolute;
          top: 25%;
          right: 0;
          width: 15%;
          height: 50%;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-right: none;
          border-radius: 3px 0 0 3px;
        }

        /* Stadium Stands */
        .stadium-stand {
          position: absolute;
          transform-style: preserve-3d;
          overflow: hidden;
        }

        .stadium-stand--north {
          top: -8px;
          left: 10%;
          width: 80%;
          height: 28%;
          background: linear-gradient(180deg, rgba(21,101,192,0.6), rgba(21,101,192,0.25));
          border-radius: 80px 80px 0 0;
          transform: translateZ(12px) rotateX(-15deg);
          transform-origin: bottom center;
          border: 1px solid rgba(30,136,229,0.3);
          box-shadow: 0 -5px 20px rgba(30,136,229,0.2);
        }

        .stadium-stand--south {
          bottom: -8px;
          left: 10%;
          width: 80%;
          height: 28%;
          background: linear-gradient(0deg, rgba(21,101,192,0.6), rgba(21,101,192,0.25));
          border-radius: 0 0 80px 80px;
          transform: translateZ(12px) rotateX(15deg);
          transform-origin: top center;
          border: 1px solid rgba(30,136,229,0.3);
          box-shadow: 0 5px 20px rgba(30,136,229,0.2);
        }

        .stadium-stand--east {
          top: 10%;
          right: -8px;
          width: 22%;
          height: 80%;
          background: linear-gradient(270deg, rgba(0,172,193,0.6), rgba(0,172,193,0.25));
          border-radius: 0 60px 60px 0;
          transform: translateZ(12px) rotateY(-15deg);
          transform-origin: left center;
          border: 1px solid rgba(0,172,193,0.3);
          box-shadow: 5px 0 20px rgba(0,172,193,0.2);
        }

        .stadium-stand--west {
          top: 10%;
          left: -8px;
          width: 22%;
          height: 80%;
          background: linear-gradient(90deg, rgba(0,172,193,0.6), rgba(0,172,193,0.25));
          border-radius: 60px 0 0 60px;
          transform: translateZ(12px) rotateY(15deg);
          transform-origin: right center;
          border: 1px solid rgba(0,172,193,0.3);
          box-shadow: -5px 0 20px rgba(0,172,193,0.2);
        }

        /* Crowd dots */
        .stand-crowd {
          position: absolute;
          inset: 0;
        }

        .crowd-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          opacity: 0.8;
          animation: crowdPulse 2s ease-in-out infinite;
        }

        @keyframes crowdPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* Stadium Roof */
        .stadium-roof {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          border: 2.5px solid rgba(100,181,246,0.35);
          transform: translateZ(22px);
          box-shadow: 
            0 0 15px rgba(100,181,246,0.15),
            inset 0 0 15px rgba(100,181,246,0.05);
          background: transparent;
        }

        /* Floodlights */
        .floodlight {
          position: absolute;
          transform-style: preserve-3d;
        }

        .floodlight--1 { top: -5px; left: -5px; }
        .floodlight--2 { top: -5px; right: -5px; }
        .floodlight--3 { bottom: -5px; left: -5px; }
        .floodlight--4 { bottom: -5px; right: -5px; }

        .floodlight-pole {
          width: 3px;
          height: 12px;
          background: linear-gradient(to top, rgba(100,181,246,0.3), rgba(100,181,246,0.8));
          transform: translateZ(22px);
          border-radius: 1px;
        }

        .floodlight-beam {
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%) translateZ(28px);
          width: 6px;
          height: 6px;
          background: #64B5F6;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(100,181,246,0.8), 0 0 30px rgba(100,181,246,0.4);
          animation: floodlightGlow 3s ease-in-out infinite;
        }

        .floodlight--2 .floodlight-beam { animation-delay: 0.75s; }
        .floodlight--3 .floodlight-beam { animation-delay: 1.5s; }
        .floodlight--4 .floodlight-beam { animation-delay: 2.25s; }

        @keyframes floodlightGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(100,181,246,0.8), 0 0 30px rgba(100,181,246,0.4); }
          50% { box-shadow: 0 0 20px rgba(100,181,246,1), 0 0 50px rgba(100,181,246,0.6); }
        }

        /* Scanning Line */
        .stadium-scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(0,172,193,0.6), rgba(30,136,229,0.8), rgba(0,172,193,0.6), transparent);
          transform: translateZ(15px);
          animation: scanLine 4s ease-in-out infinite;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(0,172,193,0.5);
        }

        @keyframes scanLine {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* ---- Holographic Panels ---- */
        .holo-panel {
          position: absolute;
          border-radius: 12px;
          overflow: hidden;
          animation: holoFloat 5s ease-in-out infinite;
          z-index: 10;
        }

        .holo-panel-glow {
          position: absolute;
          inset: 0;
          background: rgba(10,22,50,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(100,181,246,0.25);
          border-radius: 12px;
          box-shadow: 
            0 8px 32px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .holo-panel-glow--alert {
          border-color: rgba(229,57,53,0.4);
          box-shadow: 
            0 8px 32px rgba(198,40,40,0.25),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .holo-panel-content {
          position: relative;
          z-index: 1;
          padding: 10px 14px;
        }

        /* Panel positions */
        .holo-panel--header {
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          min-width: 260px;
          animation-delay: 0s;
        }

        .holo-panel--fans {
          top: 120px;
          left: 0;
          min-width: 155px;
          animation-delay: 0.5s;
        }

        .holo-panel--density {
          top: 100px;
          right: 0;
          min-width: 155px;
          animation-delay: 1s;
        }

        .holo-panel--safety {
          bottom: 80px;
          right: 10px;
          min-width: 155px;
          animation-delay: 1.5s;
        }

        .holo-panel--alert {
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          min-width: 280px;
          animation-delay: 2s;
        }

        @keyframes holoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .holo-panel--header {
          animation: holoFloatCenter 5s ease-in-out infinite;
        }

        .holo-panel--alert {
          animation: holoFloatAlert 3s ease-in-out infinite;
        }

        @keyframes holoFloatCenter {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }

        @keyframes holoFloatAlert {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-4px); }
        }

        /* Holo panel content styles */
        .holo-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .holo-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #43A047;
          box-shadow: 0 0 8px #43A047;
          animation: statusBlink 2s ease-in-out infinite;
        }

        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .holo-status-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #90CAF9;
          letter-spacing: 0.03em;
        }

        .holo-time {
          font-size: 0.65rem;
          color: rgba(148,163,184,0.7);
          margin-left: auto;
        }

        .holo-panel--header .holo-panel-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .holo-metric-label {
          font-size: 0.65rem;
          font-weight: 500;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2px;
        }

        .holo-metric-value {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .holo-metric-value--blue {
          background: linear-gradient(135deg, #42A5F5, #1E88E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .holo-metric-value--amber {
          background: linear-gradient(135deg, #FFB74D, #F57F17);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .holo-metric-value--green {
          background: linear-gradient(135deg, #66BB6A, #2E7D32);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .holo-bar {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
          overflow: hidden;
        }

        .holo-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1.5s ease;
          position: relative;
        }

        .holo-bar-fill--blue {
          background: linear-gradient(90deg, #1E88E5, #42A5F5);
          box-shadow: 0 0 8px rgba(30,136,229,0.5);
        }

        .holo-bar-fill--amber {
          background: linear-gradient(90deg, #F57F17, #FFB74D);
          box-shadow: 0 0 8px rgba(245,127,23,0.5);
        }

        .holo-bar-fill--green {
          background: linear-gradient(90deg, #2E7D32, #66BB6A);
          box-shadow: 0 0 8px rgba(46,125,50,0.5);
        }

        /* Alert panel */
        .holo-alert-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .holo-alert-icon {
          font-size: 1rem;
          animation: alertPulse 1.5s ease-in-out infinite;
        }

        @keyframes alertPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .holo-alert-text {
          font-size: 0.7rem;
          font-weight: 600;
          color: #EF9A9A;
          letter-spacing: 0.02em;
        }

        /* Particles */
        .stadium-particle {
          position: absolute;
          background: rgba(100,181,246,0.6);
          border-radius: 50%;
          animation: particleFloat 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }

        @keyframes particleFloat {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          20% { opacity: 1; }
          80% { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
        }

        /* SVG Connection Lines */
        .holo-connections {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 6;
        }

        .holo-line {
          stroke: rgba(100,181,246,0.18);
          stroke-width: 1;
          stroke-dasharray: 6 4;
          animation: dashFlow 3s linear infinite;
        }

        .holo-line--alert {
          stroke: rgba(229,57,53,0.2);
        }

        @keyframes dashFlow {
          to { stroke-dashoffset: -30; }
        }

        /* STATS */
        .landing__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          background: rgba(255,255,255,0.03);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .landing__stat {
          padding: 40px 20px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .landing__stat:last-child { border-right: none; }
        .landing__stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #64B5F6, #00ACC1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .landing__stat-label {
          font-size: 0.875rem;
          color: #64748B;
          margin-top: 6px;
        }

        /* FEATURES */
        .landing__features {
          padding: 100px 60px;
          text-align: center;
        }
        .landing__section-header { margin-bottom: 60px; }
        .landing__section-pill {
          display: inline-block;
          padding: 5px 14px;
          background: rgba(0,172,193,0.1);
          border: 1px solid rgba(0,172,193,0.25);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          color: #26C6DA;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .landing__section-header h2 { color: #F1F5F9; margin-bottom: 16px; }
        .landing__features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          text-align: left;
        }
        .landing__feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-xl);
          padding: var(--space-xl);
          transition: all var(--transition-base);
          cursor: default;
        }
        .landing__feature-card:hover {
          background: rgba(30,136,229,0.06);
          border-color: rgba(30,136,229,0.2);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .landing__feature-icon {
          width: 52px; height: 52px;
          background: rgba(30,136,229,0.12);
          border: 1px solid rgba(30,136,229,0.2);
          border-radius: var(--radius-lg);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .landing__feature-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #E2E8F0;
          margin-bottom: 10px;
        }
        .landing__feature-desc {
          font-size: 0.875rem;
          color: #64748B;
          line-height: 1.6;
        }

        /* CTA */
        .landing__cta {
          padding: 100px 60px;
          text-align: center;
          background: linear-gradient(135deg, rgba(21,101,192,0.1), rgba(0,172,193,0.05));
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .landing__cta-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* FOOTER */
        .landing__footer {
          padding: 24px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 1024px) {
          .landing__hero { grid-template-columns: 1fr; text-align: center; }
          .landing__hero-visual { justify-content: center; }
          .landing__hero-capabilities { grid-template-columns: 1fr; }
          .landing__hero-desc { max-width: 100%; }
          .landing__stats { grid-template-columns: repeat(2, 1fr); }
          .landing__nav { padding: 20px 24px; }
          .landing__hero, .landing__features, .landing__cta { padding-left: 24px; padding-right: 24px; }
          .landing__footer { padding: 24px; }
          .stadium-3d-wrapper { max-width: 480px; height: 440px; }
          .stadium-3d-scene { width: 260px; height: 180px; }
          .holo-panel--fans { left: -10px; }
          .holo-panel--density { right: -10px; }
          .holo-panel--safety { right: 0; }
        }

        @media (max-width: 640px) {
          .landing__stats { grid-template-columns: 1fr 1fr; }
          .landing__hero-actions { flex-direction: column; align-items: stretch; }
          .landing__nav-links a { display: none; }
          .stadium-3d-wrapper { max-width: 360px; height: 400px; }
          .stadium-3d-scene { width: 200px; height: 140px; }
          .holo-panel--header { min-width: 220px; }
          .holo-panel--alert { min-width: 240px; }
          .holo-panel--fans, .holo-panel--density, .holo-panel--safety { min-width: 130px; }
          .holo-connections { display: none; }
        }
      `}</style>
    </div>
  );
}
