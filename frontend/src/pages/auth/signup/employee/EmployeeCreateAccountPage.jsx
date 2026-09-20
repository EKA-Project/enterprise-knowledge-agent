import { useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import '../../../../styles/auth.css';

const INVITE_STEPS = [
  { label: 'Verify', done: 'Verified' },
  { label: 'Account' },
  { label: 'Ready' },
];

const NO_INVITE_STEPS = [
  { label: 'Verify', done: 'Verified' },
  { label: 'Found', done: 'Found' },
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

function WorkspaceCard() {
  return (
    <div className="invite-card invite-card--simple">
      <div className="invite-card-header invite-card-header--no-border">
        <span className="invite-avatar">NS</span>
        <div>
          <p className="invite-label">Joining Workspace</p>
          <p className="invite-company-name">Northstar Studio</p>
        </div>
        <span className="workspace-role-badge">🔒 Engineering · Employee</span>
      </div>
    </div>
  );
}

export default function EmployeeCreateAccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const flow = location.state?.flow || 'invitation';
  const steps = flow === 'enterprise-id' ? NO_INVITE_STEPS : INVITE_STEPS;
  const current = flow === 'enterprise-id' ? 2 : 1;

  function handleCreateAccount() {
    navigate('/signup/request-sent');
  }

  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <StepIndicator steps={steps} current={current} />

          <div className="auth-context-row">
            <BackLink>← Back</BackLink>
            <span className="auth-context-badge">👤 EMPLOYEE ACCOUNT</span>
          </div>

          <h2 className="auth-title">Create your EKA account</h2>
          <p className="auth-description">Set up your secure access credentials.</p>

          <WorkspaceCard />

          <div className="auth-field">
            <label htmlFor="full-name">Full Name</label>
            <input id="full-name" type="text" defaultValue="Alex Morgan" />
          </div>

          <div className="auth-field">
            <div className="auth-field-label-row">
              <label htmlFor="work-email">Work Email</label>
              {flow === 'invitation' && (
                <span className="prefilled-badge">🔒 Pre-filled from invitation</span>
              )}
            </div>
            <input
              id="work-email"
              type="email"
              defaultValue="alex.morgan@northstar.studio"
            />
          </div>

          <div className="password-fields-row">
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••••"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input id="confirm-password" type="password" placeholder="••••••••••••••" />
            </div>
          </div>

          <div className="password-strength-bar password-strength-bar--segmented">
            <span className="password-strength-segment password-strength-segment--filled" />
            <span className="password-strength-segment password-strength-segment--filled" />
            <span className="password-strength-segment password-strength-segment--filled" />
          </div>
          <p className="password-strength-label">Strong enterprise password ✓</p>

          <label className="terms-checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>
              I agree to EKA's <a href="#">Terms of Service</a> &amp; <a href="#">Privacy Policy</a>.
            </span>
          </label>

          <button onClick={handleCreateAccount} className="option-card-btn option-card-btn--teal">
            Send Request
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}