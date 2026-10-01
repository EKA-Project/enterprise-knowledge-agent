import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import styles from '../../../../styles/auth.module.css';
// HEADER INDICATOR FOR ADMIN SIGNUP FLOW
const ADMIN_STEPS = [
  { label: 'Account' },
  { label: 'Enterprise' },
  { label: 'Live' },
];

function StepIndicator({ steps }) {
  return (
    <div className={styles['step-indicator']}>
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          <div className={`${styles['step']} ${styles['active']}`}>
            <span className={`${styles['step-num']} ${styles['step-num--check']}`}>✓</span>
            {step.label}
          </div>
          {i < steps.length - 1 && <span className={styles['step-arrow']}>→</span>}
        </Fragment>
      ))}
    </div>
  );
}
//ENterprise profile page export
export default function AdminEnterpriseProfilePage() {
  const [copied, setCopied] = useState(false);
  const enterpriseId = 'EKA-7K29F';

  function handleCopyId() {
    navigator.clipboard.writeText(enterpriseId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <StepIndicator steps={ADMIN_STEPS} />

          <div className={styles['auth-badge']}>🚀 ENTERPRISE INITIALIZED</div>
          <h2 className={styles['auth-title']}>Your enterprise is ready.</h2>
          <p className={styles['auth-description']}>
            The dedicated workspace for <strong>Northstar Studio</strong> is active.
          </p>

          <div className={styles['enterprise-id-box']}>
            <p className={styles['enterprise-id-label']}>Enterprise ID</p>
            <div className={styles['enterprise-id-row']}>
              <span className={styles['enterprise-id-value']}>{enterpriseId}</span>
              <button onClick={handleCopyId} className={styles['copy-id-btn']}>
                📋 {copied ? 'Copied!' : 'Copy ID'}
              </button>
            </div>
            <p className={styles['enterprise-id-hint']}>
              Share this Enterprise ID with employees who need to request
              access to your workspace.
            </p>
          </div>

          <div className={styles['info-box']}>
            <div>
              <p className={styles['invite-label']}>Administrator</p>
              <p className={styles['invite-value']}>Maya Chen</p>
            </div>
            <div>
              <p className={styles['invite-label']}>Role</p>
              <p className={styles['invite-value'] + ' ' + styles['success-value--accent']}>Administrator</p>
            </div>
            <div>
              <p className={styles['invite-label']}>Domain</p>
              <p className={styles['invite-value']}>northstar.studio</p>
            </div>
            <div>
              <p className={styles['invite-label']}>Vault Status</p>
              <p className={styles['invite-value'] + ' ' + styles['success-value--accent']}>Isolated &amp; Ready</p>
            </div>
          </div>

          <Link to="/dashboard" className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}>
            Go to Admin Workspace
            <span aria-hidden="true">→</span>
          </Link>

          <Link to="/signup/admin/invite" className={`${styles['option-card-btn']} ${styles['option-card-btn--outline']}`}>
            📩 Invite employees now
          </Link>
        </div>
      </div>
    </div>
  );
}