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
  const avatars = [
    { initials: 'AM', color: 'bg-purple-400' },
    { initials: 'JR', color: 'bg-blue-400' },
    { initials: 'SK', color: 'bg-orange-400' },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {avatars.map((a) => (
          <span
            key={a.initials}
            className={`w-8 h-8 rounded-full ${a.color} border-2 border-bg flex items-center justify-center text-[11px] font-semibold text-white`}
          >
            {a.initials}
          </span>
        ))}
        <span className="w-8 h-8 rounded-full bg-white border-2 border-bg flex items-center justify-center text-[11px] font-semibold text-muted">
          +8
        </span>
      </div>
      <p className="text-sm text-muted">
        Trusted by curious teams
        <br />
        <span className="font-semibold text-ink">across 12 countries</span>
      </p>
    </div>
  );
}

 // floating card component for hero section

function FloatingCard({ icon, iconBg, title, subtitle, showCheck, position }) {
  return (
    <div className={`absolute ${position} bg-white rounded-2xl shadow-md px-4 py-3 flex items-center gap-3`}>
      <span className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
      {showCheck && <span className="text-primary ml-2">✓</span>}
    </div>
  );
}

// hero content main 
// Left half of the Hero section: eyebrow badge, headline, subtext, CTAs, trust row.
function HeroContent() {
  return (
    <div>
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        Knowledge in motion
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold text-ink leading-tight mb-6">
        Your company's
        <br />
        <span className="text-primary">knowledge, alive.</span>
      </h1>

      {/* Subtext */}
      <p className="text-muted text-lg leading-relaxed max-w-md mb-8">
        EKA connects every document, decision and discovery into one
        intelligent space — so your team can move with clarity.
      </p>

      {/* CTA row */}
      <div className="flex items-center gap-6 mb-10">
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3.5 rounded-full transition-colors"
        >
          Bring EKA to life
          <span aria-hidden="true">→</span>
        </Link>

        <button className="inline-flex items-center gap-3 text-ink font-medium">
          <span className="w-9 h-9 rounded-full bg-mint/40 flex items-center justify-center">
            <span aria-hidden="true">▶</span>
          </span>
          See the workspace
        </button>
      </div>

      <AvatarStack />
    </div>
  );
}

// Right half of the Hero section: decorative blobs, central brain card,

// and two floating info cards built from the reusable FloatingCard piece.
function HeroVisual() {
  return (
    <div className="relative h-[480px] flex items-center justify-center">

      {/* Decorative background blobs — soft but visible */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-mint/25 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200/30 rounded-full blur-2xl" />

      {/* Orbit rings — centered behind the card using top-1/2 left-1/2 + translate */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-teal-700/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-teal-700/10" />

     {/* Central gradient card */}
      <div className="relative w-56 h-56 rounded-[2.5rem] bg-gradient-to-br from-teal-200 via-cyan-200 to-blue-300 flex flex-col items-center justify-center shadow-lg">
        <img src={ekaBrain} alt="" className="w-16 h-16 object-contain mb-2" />
        <p className="text-ink font-semibold text-sm">EKA</p>
        <p className="text-muted text-xs">intelligence layer</p>
      </div>

      <FloatingCard
        icon="📄"
        iconBg="bg-mint/40 text-primary"
        title="42 documents"
        subtitle="all knowledge connected"
        showCheck
        position="top-6 left-0"
      />

      <FloatingCard
        icon="💬"
        iconBg="bg-purple-100 text-purple-500"
        title="Ask anything"
        subtitle="answers with context"
        position="bottom-8 right-0"
      />
    </div>
  );
}

// Combines both leftpart and rightpart into the two-column section layout.

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <HeroContent />
        <HeroVisual />
      </div>
    </section>
  );
}


export default function LandingPage() {
  return (
    <div className="bg-bg min-h-screen">

      {/* ===================== Navbar ===================== */}
      <header className="sticky top-0 z-40 bg-bg border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* Brand / logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-ink no-underline">
            <img
              src={ekaLogo}
              alt="EKA"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-ink font-bold">EKA</span>
          </Link> 

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-ink no-underline"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark focus-visible:bg-primary-dark text-white text-sm font-semibold px-4.5 py-2.5 rounded-full transition-colors"
            >
              Get started
              <span aria-hidden="true">→</span>
            </Link>
          </div>

        </div>
      </header>
      {/* =================== End Navbar =================== */}
      
     <Hero/>

    </div>
  );
}