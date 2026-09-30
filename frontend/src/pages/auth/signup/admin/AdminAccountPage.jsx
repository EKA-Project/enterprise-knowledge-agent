import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import PasswordInput from '../../../../components/auth/PasswordInput';
import PasswordStrength from '../../../../components/auth/PasswordStrength';
import styles from '../../../../styles/auth.module.css';
// Admin account creation steps
const ADMIN_STEPS = [
  { label: 'Account' },
  { label: 'Enterprise' },
  { label: 'Confirmation' },
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
// Admin account creation page export
export default function AdminAccountPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  function handleContinue() {
    navigate('/signup/admin/enterprise');
  }

  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <StepIndicator steps={ADMIN_STEPS} current={0} />

          <div className={styles['auth-context-row']}>
            <BackLink>← Back to role choice</BackLink>
            <span className={styles['auth-context-badge']}>🛡️ ADMINISTRATOR SETUP · STEP 1 OF 3</span>
          </div>

          <h2 className={styles['auth-title']}>Create your EKA account</h2>
          <p className={styles['auth-description']}>
            Set up your credentials to manage your enterprise workspace.
          </p>

          <div className={styles['auth-field']}>
            <label htmlFor="full-name">Full Name</label>
            <input id="full-name" type="text" defaultValue="Maya Chen" />
          </div>

          <div className={styles['auth-field']}>
            <label htmlFor="work-email">Work Email</label>
            <input id="work-email" type="email" defaultValue="maya@northstar.studio" />
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
          <div className={styles['assigned-role-box']}>
            <span>Assigned Role:</span>
            <span className={styles['assigned-role-badge']}>🛡️ Enterprise Administrator</span>
          </div>

          <button onClick={handleContinue} className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}>
            Continue
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}