// AuthBackground.jsx
// Shared left panel for all auth pages (signup, login, forgot password, etc.)
// Contains: back link, eyebrow, headline, subtext, and the decorative illustration.

import { Link } from 'react-router-dom';
import ekaBrain from '../../assets/images/eka_brain.jpeg';

function AuthIllustration() {
  return (
    <div className="auth-illustration">
      <div className="auth-orbit auth-orbit--one" />
      <div className="auth-orbit auth-orbit--two" />
      <div className="auth-core">
        <img src={ekaBrain} alt="" />
      </div>
      <div className="auth-tag auth-tag--docs">
        📄 42 docs
      </div>
      <div className="auth-tag auth-tag--learning">
        🧩 always learning
      </div>
    </div>
  );
}

export default function AuthBackground() {
  return (
    <div className="auth-brand-panel">
      <Link to="/" className="auth-back-link">← Back to EKA</Link>

      <div className="auth-eyebrow">
        <span className="auth-eyebrow-dot" />
        Knowledge in motion
      </div>

      <h1 className="auth-headline">
        Good work starts
        <br />
        with context.
      </h1>

      <p className="auth-subtext">
        One calm place for the questions, documents and ideas that move
        your team forward.
      </p>

      <AuthIllustration />
    </div>
  );
}