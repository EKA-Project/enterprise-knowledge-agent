import { Link } from 'react-router-dom';
import AuthBackground from '../../../components/auth/AuthBackground';
import ekaLogo from '../../../assets/images/eka_logo.jpeg';
import '../../../styles/auth.css';

// Keep OptionCard() as-is — that's still local to this page

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
}) 
{
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

export default function SignupChoicePage() {
  return (
    <div className="auth-shell">
      <AuthBackground />
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