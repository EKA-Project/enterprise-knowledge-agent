import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import styles from '../../../../styles/auth.module.css';

const NO_INVITE_STEPS = [
  { label: 'Verify', done: 'Verified' },
  { label: 'Found' },
  { label: 'Create Account' },
  { label: 'Approval' },
];

function StepIndicator({ steps, current }) {
  return (
    <div className={styles['step-indicator']}>
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          <div className={`${styles['step']} ${i <= current ? styles['active'] : ''}`}>
            <span
              className={`${styles['step-num']} ${
                i < current
                ? styles['step-num--check']
                : i === current
                ? styles['step-num--current']
                : ''
              }`}
            >
              {i < current ? '✓' : i + 1}
            </span>
            {i < current && step.done ? step.done : step.label}
          </div>
          {i < steps.length - 1 && <span className={styles['step-arrow']}>→</span>}
        </Fragment>
      ))}
    </div>
  );
}
// ===================== Component: EnterpriseCard =====================
function EnterpriseCard() {
  return (
    <div className={`${styles['invite-card']} ${styles['invite-card--simple']}`}>
      <div className={`${styles['invite-card-header']} ${styles['invite-card-header--no-border']}`}>
        <span className={styles['invite-avatar']}>NS</span>
        <div>
          <p className={styles['invite-company-name']}>Northstar Studio</p>
          <p className={styles['invite-enterprise-id']}>Enterprise ID: EKA-7K29F</p>
        </div>
      </div>
    </div>
  );
}
// ===================== Component: EmployeeEnterpriseFoundPage =====================
export default function EmployeeEnterpriseFoundPage() {
  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <StepIndicator steps={NO_INVITE_STEPS} current={1} />

          <div className={styles['auth-context-row']}>
            <BackLink>← Back</BackLink>
        </div>

          <div className={styles['auth-badge']}>🏢 ENTERPRISE FOUND</div>
          <h2 className={styles['auth-title']}>Enterprise found</h2>
          <p className={styles['auth-description']}>
            Your request will be sent to an administrator for approval.
          </p>
            <EnterpriseCard />
           <Link
                to="/signup/create-account"
                state={{ flow: 'enterprise-id' }}
                className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}
                >
                Create Account
                <span aria-hidden="true">→</span>
            </Link>
          <p className={styles['auth-page-footer']}>© 2026 EKA Technologies. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}