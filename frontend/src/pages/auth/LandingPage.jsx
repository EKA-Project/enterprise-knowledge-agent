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


export default function LandingPage() {
  return (
    <div>

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
            <span>EKA.</span>
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
      
     

    </div>
  );
}