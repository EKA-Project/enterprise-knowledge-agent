import { Link } from 'react-router-dom';
import ekaLogo from '../../assets/images/eka_logo.jpeg';
import '../../styles/auth.css';

function ForgotPasswordIllustration() {
  return (
    <div className="auth-illustration">
      <div className="auth-orbit auth-orbit--one" />
      <div className="auth-orbit auth-orbit--two" />
      <div className="auth-core">
        <img src={ekaBrain} alt="" />
      </div>
      <div className="auth-tag auth-tag--docs">📄 42 docs</div>
      <div className="auth-tag auth-tag--learning">🧩 always learning</div>
    </div>
  );
}
// left panel for forgot password page

function ForgotPasswordLeftPanel() {
  return (
    <div className="auth-brand-panel">
      <Link to="/login" className="auth-back-link">← Back</Link>

      <div className="auth-eyebrow">
        <span className="auth-eyebrow-dot" />
        Knowledge in motion
      </div>

      <h1 className="auth-headline">
        Regain access to
        <br />
        <span className="auth-headline--accent">your workspace.</span>
      </h1>

      <p className="auth-subtext">
        Context is only a secure recovery token away. Enter your corporate
        credentials to reset.
      </p>

      <ForgotPasswordIllustration />
    </div>
  );
}
 // right panel for forgot password page
 function RecoveryForm() {
  return (
    <>
      <div className="auth-card-brand">
        <img src={ekaLogo} alt="EKA" />
        EKA.
      </div>

      <div className="auth-badge">🔑 RECOVERY</div>
      <h2 className="auth-title">Reset Password</h2>
      <p className="auth-description">Enter corporate email to receive your security code.</p>

      <div className="auth-field">
        <label htmlFor="corporate-email">Corporate Email</label>
        <input id="corporate-email" type="email" defaultValue="maya@northstar.studio" />
      </div>

      <button className="option-card-btn option-card-btn--teal">
        Send Recovery Token
        <span aria-hidden="true">→</span>
      </button>

      <p className="auth-footer">
        <Link to="/login">← Return to Sign in</Link>
      </p>
    </>
  );
}
//default export for forgot password page
export default function ForgotPasswordPage() {
  return (
    <div className="auth-shell">
      <ForgotPasswordLeftPanel />

      <div className="auth-form-panel">
        <div className="auth-card">
          <RecoveryForm />
        </div>
      </div>
    </div>
  );
}