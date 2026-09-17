import { Link } from 'react-router-dom';

//left panel decorative illustration

function AuthIllustration() {
  return (
    <div className="auth-illustration">
      <div className="auth-orbit" />
      <div className="auth-core">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4">
          <path d="M12 3c-4 0-7 3-7 7 0 3 2 5 4 6-1 1-2 1-3 1v2c3 0 5-1 6-3 1 2 3 3 6 3v-2c-1 0-2 0-3-1 2-1 4-3 4-6 0-4-3-7-7-7z" />
        </svg>
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

//whole left side of the page  
function AuthBrandPanel() {
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
export default function SignupChoicePage() {
  return (
    <>
      <AuthBrandPanel />
      <AuthIllustration />
    </>
  );
}