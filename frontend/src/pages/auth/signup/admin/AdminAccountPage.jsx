import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import '../../../../styles/auth.css';
// Admin account creation steps
const ADMIN_STEPS = [
  { label: 'Account' },
  { label: 'Enterprise' },
  { label: 'Confirmation' },
];
// Step indicator component
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
// Admin account creation page export
export default function AdminAccountPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleContinue() {
    navigate('/signup/admin/enterprise');
  }

  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <StepIndicator steps={ADMIN_STEPS} current={0} />

          <div className="auth-context-row">
            <BackLink>← Back to role choice</BackLink>
            <span className="auth-context-badge">🛡️ ADMINISTRATOR SETUP · STEP 1 OF 3</span>
          </div>

          <h2 className="auth-title">Create your EKA account</h2>
          <p className="auth-description">
            Set up your credentials to manage your enterprise workspace.
          </p>

          <div className="auth-field">
            <label htmlFor="full-name">Full Name</label>
            <input id="full-name" type="text" defaultValue="Maya Chen" />
          </div>

          <div className="auth-field">
            <label htmlFor="work-email">Work Email</label>
            <input id="work-email" type="email" defaultValue="maya@northstar.studio" />
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

          <div className="password-strength-bar--segmented">
            <span className="password-strength-segment password-strength-segment--filled" />
            <span className="password-strength-segment password-strength-segment--filled" />
            <span className="password-strength-segment password-strength-segment--filled" />
          </div>
          <p className="password-strength-label">Strong enterprise passphrase ✓</p>

          <div className="assigned-role-box">
            <span>Assigned Role:</span>
            <span className="assigned-role-badge">🛡️ Enterprise Administrator</span>
          </div>

          <button onClick={handleContinue} className="option-card-btn option-card-btn--teal">
            Continue
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}