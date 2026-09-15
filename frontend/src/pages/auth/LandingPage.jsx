// LandingPage.jsx
// Public marketing landing page.
// NOTE: written as a single file for now — navbar markup lives directly here
// instead of being split into components/landing/Navbar.jsx


import { Link } from 'react-router-dom';
import ekaLogo from '../assets/images/eka_logo.jpeg';
import '../styles/landing.css';

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

      {/* Hero, HeroVisual, PreviewBanner sections will go here next */}

    </div>
  );
}