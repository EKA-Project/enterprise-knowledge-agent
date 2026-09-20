import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import '../../../../styles/auth.css';

const NO_INVITE_STEPS = [
  { label: 'Verify', done: 'Verified' },
  { label: 'Found' },
  { label: 'Create Account & Request' },
  { label: 'Approval' },
];

function StepIndicator({ steps, current }) {
  return (
    <div className="step-indicator">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          <div className={`step ${i <= current ? 'active' : ''}`}>
            <span
              className={`step-num ${
                i < current ? 'step-num--check' : i === current ? 'step-num--current' : ''
              }`}
            >
              {i < current ? '✓' : i + 1}
            </span>
            {i < current && step.done ? step.done : step.label}
          </div>
          {i < steps.length - 1 && <span className="step-arrow">→</span>}
        </Fragment>
      ))}
    </div>
  );
}

//===================== Component: EmployeePendingApprovalPage =====================
export default function EmployeePendingApprovalPage() {
  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card auth-card--centered">
            <StepIndicator steps={NO_INVITE_STEPS} current={3} />

            <div className="auth-context-row">
                 <BackLink>← Back</BackLink>
            </div>

          <div className="status-icon-circle status-icon-circle--pending">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#b8aa94" strokeWidth="1.6" />
                <path d="M12 7v5l3 2" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="1.3" fill="#e08b2a" />
            </svg>
          </div>
          <span className="status-badge status-badge--pending">
            ● Status: Pending approval
          </span>

          <h2 className="auth-title">Request sent</h2>
          <p className="auth-description">
            Your request to join <strong>Northstar Studio</strong> is waiting
            for administrator approval.
          </p>

          <div className="info-box">
            <p className="info-box-title">
              Administrator: Maya Chen (northstar.studio)
            </p>
            <p className="info-box-text">
              We've notified the administrative team. Once approved,
              you'll receive access immediately.
            </p>
          </div>

          <Link to="/" className="option-card-btn option-card-btn--outline">
            Back to EKA
          </Link>
        </div>
        </div>
      </div>
  );
}