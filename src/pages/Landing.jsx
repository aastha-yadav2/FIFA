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

        <div className="landing__hero-visual animate-float">
          <div className="landing__hero-card glass-dark">
            <div className="landing__hero-card-header">
              <span className="status-dot online" />
              <span>Live Operations · Match Day 6</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.6 }}>21:30 EST</span>
            </div>
            {[
              { label: 'Total Fans', value: '68,420', bar: 73, color: '#1E88E5' },
              { label: 'Crowd Density', value: '73%', bar: 73, color: '#F57F17' },
              { label: 'Safety Score', value: '96/100', bar: 96, color: '#43A047' },
            ].map(item => (
              <div key={item.label} className="landing__hero-metric">
                <div className="landing__hero-metric-row">
                  <span style={{ fontSize: '0.8rem', color: '#90CAF9' }}>{item.label}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{item.value}</span>
                </div>
                <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.1)', marginTop: 6 }}>
                  <div className="progress-fill" style={{ width: `${item.bar}%`, background: item.color }} />
                </div>
              </div>
            ))}
            <div className="landing__hero-alert">
              <span>🚨</span>
              <span style={{ fontSize: '0.75rem', color: '#EF9A9A' }}>Gate C density critical — AI rerouting active</span>
            </div>
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

        /* HERO VISUAL */
        .landing__hero-visual {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
        }
        .landing__hero-card {
          width: 100%;
          max-width: 380px;
          border-radius: var(--radius-xl);
          padding: var(--space-lg);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .landing__hero-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: #90CAF9;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .landing__hero-metric { margin-bottom: 16px; }
        .landing__hero-metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .landing__hero-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: rgba(198,40,40,0.12);
          border: 1px solid rgba(198,40,40,0.2);
          border-radius: var(--radius-md);
          margin-top: 16px;
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
        }

        @media (max-width: 640px) {
          .landing__stats { grid-template-columns: 1fr 1fr; }
          .landing__hero-actions { flex-direction: column; align-items: stretch; }
          .landing__nav-links a { display: none; }
        }
      `}</style>
    </div>
  );
}
