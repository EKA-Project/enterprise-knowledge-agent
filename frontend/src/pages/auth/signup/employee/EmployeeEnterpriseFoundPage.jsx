import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import '../../../../styles/auth.css';

const NO_INVITE_STEPS = [
  { label: 'Verify', done: 'Verified' },
  { label: 'Found' },
  { label: 'Create Account' },
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
// ===================== Component: EnterpriseCard =====================
function EnterpriseCard() {
  return (
    <div className="invite-card invite-card--simple">
      <div className="invite-card-header invite-card-header--no-border">
        <span className="invite-avatar">NS</span>
        <div>
          <p className="invite-company-name">Northstar Studio</p>
          <p className="invite-enterprise-id">Enterprise ID: EKA-7K29F</p>
        </div>
      </div>
    </div>
  );
}
// ===================== Component: EmployeeEnterpriseFoundPage =====================
export default function EmployeeEnterpriseFoundPage() {
  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
        <StepIndicator steps={NO_INVITE_STEPS} current={1} />

          <div className="auth-context-row">
            <BackLink>← Back</BackLink>
        </div>

          <div className="auth-badge">🏢 ENTERPRISE FOUND</div>
          <h2 className="auth-title">Enterprise found</h2>
          <p className="auth-description">
            Your request will be sent to an administrator for approval.
          </p>
            <EnterpriseCard />
           <Link
                to="/signup/create-account"
                state={{ flow: 'enterprise-id' }}
                className="option-card-btn option-card-btn--teal"
                >
                Create Account
                <span aria-hidden="true">→</span>
            </Link>
          <p className="auth-page-footer">© 2026 EKA Technologies. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}