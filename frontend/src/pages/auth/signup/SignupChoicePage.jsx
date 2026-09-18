import { Link } from 'react-router-dom';
import ekaLogo from '../../../assets/images/eka_logo.jpeg';
import ekaBrain from '../../../assets/images/eka_brain.jpeg';
import '../../../styles/auth.css';

//left panel decorative illustration

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

//optioncard on the right side of the page 

function OptionCard({
  iconClass,
  icon,
  tag,
  tagClass,
  title,
  description,
  noteIcon,
  note,
  buttonLabel,
  buttonClass,
}) {
  return (
    <div className="option-card">
      <div className={`option-card-icon ${iconClass}`}>{icon}</div>
      <span className={`option-card-tag ${tagClass}`}>{tag}</span>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="option-card-note">
        {noteIcon} {note}
      </div>

      <button className={`option-card-btn ${buttonClass}`}>
        {buttonLabel}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
//export all the choices and combine in the pages 
export default function SignupChoicePage() {
  return (
    <div className="auth-shell">
      <AuthBrandPanel />

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-brand">
            <img src={ekaLogo} alt="EKA" />
            EKA.
          </div>

          <div className="auth-badge">✦ GET STARTED</div>
          <h2 className="auth-title">How will you get started?</h2>
          <p className="auth-description">
            Choose how you wish to connect with your organization's workspace.
          </p>

          <OptionCard
            iconClass="option-card-icon--mint"
            icon="👥"
            tag="TEAM MEMBER"
            tagClass="option-card-tag--mint"
            title="Join an Enterprise"
            description="Join your organization and access its shared EKA workspace, playbooks, and intelligence layer."
            noteIcon="🕐"
            note="Use an invitation or Enterprise ID"
            buttonLabel="Join an Enterprise"
            buttonClass="option-card-btn--teal"
          />

          <OptionCard
            iconClass="option-card-icon--violet"
            icon="💼"
            tag="ADMINISTRATOR"
            tagClass="option-card-tag--violet"
            title="Create an Enterprise"
            description="Set up EKA for your organization, configure company knowledge vaults, and become its administrator."
            noteIcon="🛡️"
            note="Full administrative control & RBAC"
            buttonLabel="Create an Enterprise"
            buttonClass="option-card-btn--dark"
          />

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}