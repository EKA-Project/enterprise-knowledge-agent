import { Link } from 'react-router-dom';
import AuthBackground from '../../../components/auth/AuthBackground';
import ekaLogo from '../../../assets/images/eka_logo.jpeg';
import styles from '../../../styles/auth.module.css';

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
  to,
}) 
{
  return (
    <div className={styles['option-card']}>
      <div className={`${styles['option-card-icon']} ${styles[iconClass]}`}>{icon}</div>
      <span className={`${styles['option-card-tag']} ${styles[tagClass]}`}>{tag}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles['option-card-note']}>
        {noteIcon} {note}
      </div>
      <Link to={to}  className={`${styles['option-card-btn']} ${styles[buttonClass]}`}>
        {buttonLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default function SignupChoicePage() {
  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />
      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <div className={styles['auth-card-brand']}>
            <img src={ekaLogo} alt="EKA" />
            EKA.
          </div>
          <div className={styles['auth-badge']}>✦ GET STARTED</div>
          <h2 className={styles['auth-title']}>How will you get started?</h2>
          <p className={styles['auth-description']}>
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
            to="/signup/join"
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
            to="/signup/admin/account"
          />
          <p className={styles['auth-footer']}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}