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