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
          <div className={styles['step'] + ' ' + (i <= current ? styles['step--active'] : '')}>
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

//===================== Component: EmployeePendingApprovalPage =====================
export default function EmployeePendingApprovalPage() {
  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card'] + ' ' + styles['auth-card--centered']}>
            <StepIndicator steps={NO_INVITE_STEPS} current={3} />

            <div className={styles['auth-context-row']}>
                 <BackLink>← Back</BackLink>
            </div>

          <div className={styles['status-icon-circle'] + ' ' + styles['status-icon-circle--pending']}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#b8aa94" strokeWidth="1.6" />
                <path d="M12 7v5l3 2" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="1.3" fill="#e08b2a" />
            </svg>
          </div>
          <span className={styles['status-badge'] + ' ' + styles['status-badge--pending']}>
            ● Status: Pending approval
          </span>

          <h2 className={styles['auth-title']}>Request sent</h2>
          <p className={styles['auth-description']}>
            Your request to join <strong>Northstar Studio</strong> is waiting
            for administrator approval.
          </p>

          <div className={styles['info-box']}>
            <p className={styles['info-box-title']}>
              Administrator: Maya Chen (northstar.studio)
            </p>
            <p className={styles['info-box-text']}>
              We've notified the administrative team. Once approved,
              you'll receive access immediately.
            </p>
          </div>

          <Link to="/" className={styles['option-card-btn'] + ' ' + styles['option-card-btn--outline']}>
            Back to EKA
          </Link>
        </div>
        </div>
      </div>
  );
}