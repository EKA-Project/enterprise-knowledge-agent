import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ekaLogo from '../../assets/images/eka_logo.jpeg';
import ekaBrain from '../../assets/images/eka_brain.jpeg';
import styles from '../../styles/auth.module.css';

function ForgotPasswordIllustration() {
  return (
    <div className={styles['auth-illustration']}>
      <div className={`${styles['auth-orbit']} ${styles['auth-orbit--one']}`} />

      <div className={`${styles['auth-orbit']} ${styles['auth-orbit--two']}`} />
      <div className={styles['auth-core']}>
        <img src={ekaBrain} alt="" />
      </div>
      <div className={`${styles['auth-tag']} ${styles['auth-tag--docs']}`}>📄 42 docs</div>
      <div className={`${styles['auth-tag']} ${styles['auth-tag--learning']}`}>🧩 always learning</div>
    </div>
  );
}
// left panel for forgot password page

function ForgotPasswordLeftPanel() {
  return (
    <div className={styles['auth-brand-panel']}>
      <Link to="/login" className={styles['auth-back-link']}>← Back</Link>

      <div className={styles['auth-eyebrow']}>
        <span className={styles['auth-eyebrow-dot']} />
        Knowledge in motion
      </div>

      <h1 className={styles['auth-headline']}>
        Regain access to
        <br />
        <span className={styles['auth-headline--accent']}>your workspace.</span>
      </h1>

      <p className={styles['auth-subtext']}>
        Context is only a secure recovery token away. Enter your corporate
        credentials to reset.
      </p>

      <ForgotPasswordIllustration />
    </div>
  );
}
 // right panel for forgot password page
function RecoveryForm() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);

  function handleSendToken() {
    setStage(2);
  }

  function handleEnterWorkspace() {
    navigate('/dashboard');
  }

  return (
    <>
      <div className={styles['auth-card-brand']}>
        <img src={ekaLogo} alt="EKA" />
        EKA.
      </div>

      <div className={styles['auth-badge']}>🔑 RECOVERY</div>
      <h2 className={styles['auth-title']}>Reset Password</h2>
      <p className={styles['auth-description']}>Enter corporate email to receive your security code.</p>

      <div className={styles['auth-field']}>
        <label htmlFor="corporate-email">Corporate Email</label>
        <input id="corporate-email" type="email" defaultValue="maya@northstar.studio" />
      </div>

      {stage === 1 && (
        <button onClick={handleSendToken} className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}>
          Send Recovery Token
          <span aria-hidden="true">→</span>
        </button>
      )}

      {stage === 2 && (
        <>
          <div className={styles['auth-field']}>
            <label htmlFor="recovery-token">Recovery Token</label>
            <input id="recovery-token" type="text" placeholder="Enter your recovery token" />
          </div>

          <button onClick={handleEnterWorkspace} className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}>
            Enter workspace
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}

      <p className={styles['auth-footer']}>
        <Link to="/login">← Return to Sign in</Link>
      </p>
    </>
  );
}
//default export for forgot password page
export default function ForgotPasswordPage() {
  return (
    <div className={styles['auth-shell']}>
      <ForgotPasswordLeftPanel />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <RecoveryForm />
        </div>
      </div>
    </div>
  );
}