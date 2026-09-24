// LandingPage.jsx
// Public marketing landing page.
// NOTE: written as a single file for now — navbar markup lives directly here
// instead of being split into components/landing/Navbar.jsx


import { Link } from 'react-router-dom';
import ekaLogo from '../../assets/images/eka_logo.jpeg';
import '../../styles/landing.css';
import ekaBrain from '../../assets/images/eka_brain.jpeg';

//hero section small component 

function AvatarStack() {
  return (
    <div className="trust-row">
      <div className="avatar-stack">
        <span>AM</span>
        <span>JR</span>
        <span>SK</span>
        <span>+8</span>
      </div>
      <p>
        Trusted by curious teams
        <br />
        <strong>across 12 countries</strong>
      </p>
    </div>
  );
}

//floating part of hero section
function FloatingCard({ variant, iconClass, icon, title, subtitle, showCheck }) {
  return (
    <div className={`floating-card floating-card--${variant}`}>
      <span className={`card-icon ${iconClass}`}>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
      {showCheck && <b>✓</b>}
    </div>
  );
}

// left side of hero section 

function HeroContent() {
  return (
    <div className="hero-copy">
      <div className="eyebrow">
        <span className="eyebrow-dot" />
        Knowledge in motion
      </div>

      <h1>
        Your company's
        <br />
        <em>knowledge, alive.</em>
      </h1>

      <p className="hero-description">
        EKA connects every document, decision and discovery into one
        intelligent space — so your team can move with clarity.
      </p>

      <div className="hero-actions">
        <Link to="/signup" className="button">
          Bring EKA to life
          <span aria-hidden="true">→</span>
        </Link>

        <button className="watch-link">
          <span className="play-icon" aria-hidden="true">▶</span>
          See the workspace
        </button>
      </div>

      <AvatarStack />
    </div>
  );
}

// right side of hero section

function Herovisual() {
  return (
    <div className="hero-art">
      <div className="core-shadow" />
      <div className="orbit" />
      <div className="orbit orbit--two" />
      <div className="orbit orbit--three" />

      <div className="core">
        <div className="core-gradient">
          <img src={ekaBrain} alt="" />
        </div>
        <p className="core-label">EKA</p>
        <p className="core-subtitle">intelligence layer</p>
      </div>

      <FloatingCard
        variant="docs"
        iconClass="card-icon--mint"
        icon="📄"
        title="42 documents"
        subtitle="all knowledge connected"
        showCheck
      />

      <FloatingCard
        variant="ask"
        iconClass="card-icon--lilac"
        icon="💬"
        title="Ask anything"
        subtitle="answers with context"
      />
    <span className="ambient-dot ambient-dot--top" />
      <span className="ambient-dot ambient-dot--middle" />
      <span className="ambient-dot ambient-dot--bottom" />
    </div>
  );
}

// combining left and right side of hero section

function Hero() {
  return (
    <section className="hero">
      <HeroContent />
      <Herovisual />
    </section>
  );
}
 

export default function LandingPage() {
  return (
    <>
      {/* Page-wide decorative glows — fixed position, sit behind everything */}
      <div className="page-glow page-glow--mint" />
      <div className="page-glow page-glow--lavender" />

      {/* ===================== Navbar ===================== */}
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <img src={ekaLogo} alt="EKA" />
          </span>
          EKA<span className="brand-dot">.</span>
        </Link>

        <div className="header-actions">
          <Link to="/login" className="login-link">Log in</Link>
          <Link to="/signup" className="button button--small">
            Get started
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
      {/* =================== End Navbar =================== */}
      
     <Hero/>

    </>
  );
}