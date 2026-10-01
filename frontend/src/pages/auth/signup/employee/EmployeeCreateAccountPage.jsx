import { useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import PasswordInput from '../../../../components/auth/PasswordInput';
import PasswordStrength from '../../../../components/auth/PasswordStrength';
import styles from '../../../../styles/auth.module.css';
/// STEP INDICATOR TOP
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
// Step indicator component
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
//WORKSPACE CARD
function WorkspaceCard() {
  return (
    <div className={`${styles['invite-card']} ${styles['invite-card--simple']}`}>
      <div className={`${styles['invite-card-header']} ${styles['invite-card-header--no-border']}`}>
        <span className={styles['invite-avatar']}>NS</span>
        <div>
          <p className={styles['invite-label']}>Joining Workspace</p>
          <p className={styles['invite-company-name']}>Northstar Studio</p>
        </div>
        <span className={styles['workspace-role-badge']}>🔒 Engineering · Employee</span>
      </div>
    </div>
  );
}
///EXPORT PAGE MAIN COMPONENT
export default function EmployeeCreateAccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const flow = location.state?.flow || 'invitation';
  const steps = flow === 'enterprise-id' ? NO_INVITE_STEPS : INVITE_STEPS;
  const current = flow === 'enterprise-id' ? 2 : 1;

  function handleCreateAccount() {
    navigate('/signup/request-sent');
  }

  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <StepIndicator steps={steps} current={current} />

          <div className={styles['auth-context-row']}>
            <BackLink>← Back</BackLink>
            <span className={styles['auth-context-badge']}>👤 EMPLOYEE ACCOUNT</span>
          </div>

          <h2 className={styles['auth-title']}>Create your EKA account</h2>
          <p className={styles['auth-description']}>Set up your secure access credentials.</p>

          <WorkspaceCard />

          <div className={styles['auth-field']}>
            <label htmlFor="full-name">Full Name</label>
            <input id="full-name" type="text" defaultValue="Alex Morgan" />
          </div>

          <div className={styles['auth-field']}>
            <div className={styles['auth-field-label-row']}>
              <label htmlFor="work-email">Work Email</label>
              {flow === 'invitation' && (
                <span className={styles['prefilled-badge']}>🔒 Pre-filled from invitation</span>
              )}
            </div>
            <input
              id="work-email"
              type="email"
              defaultValue="alex.morgan@northstar.studio"
            />
          </div>

          <div className={styles['password-fields-row']}>
            <div className={styles['auth-field']}>
              <label htmlFor="password">Password</label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                placeholder="••••••••••••••"
              />
              <PasswordStrength password={password} />
            </div>

            <div className={styles['auth-field']}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input id="confirm-password" type="password" placeholder="••••••••••••••" />
            </div>
          </div>

          
          <label className={styles['terms-checkbox-row']}>
            <input type="checkbox" defaultChecked />
            <span>
              I agree to EKA's <a href="#">Terms of Service</a> &amp; <a href="#">Privacy Policy</a>.
            </span>
          </label>

          <button onClick={handleCreateAccount} className={styles['option-card-btn'] + ' ' + styles['option-card-btn--teal']}>
            Send Request
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}