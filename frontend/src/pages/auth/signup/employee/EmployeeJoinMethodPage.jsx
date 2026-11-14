import { useState,Fragment } from 'react';
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

// ===================== Component 1: Header section =====================
// Step indicator, back-to-choice row, title, description
function VerificationHeader({ selected }) {
  const steps =
    selected === 'invitation'
      ? [{ label: 'Verify', done: 'Verified' }, { label: 'Ready' }]
      : NO_INVITE_STEPS;

  return (
    <>
      <StepIndicator steps={steps} current={0} />
      
      <div className={styles['auth-context-row']}>
        <BackLink>← Back to role choice</BackLink>
        <span className={styles['auth-context-badge']}>👤 EMPLOYEE ONBOARDING</span>
      </div>

      <h2 className={styles['auth-title']}>Join your enterprise</h2>
      <p className={styles['auth-description']}>
        Enter the details provided by your organization to connect your account.
      </p>
    </>
  );
}
// ===================== Component 2: Invitation form =====================
// Radio cards, invitation code input, submit button, footer link
function InvitationForm({ selected, setSelected }) {
  const isInvitation = selected === 'invitation';

  const destination = isInvitation ? '/signup/invite-preview' : '/signup/enterprise-found';
  const buttonLabel = isInvitation ? 'Continue with Invitation' : 'Find Enterprise';
  const fieldLabel = isInvitation ? 'Invitation Code' : 'Enterprise Code';
  const fieldPlaceholder = isInvitation ? 'INV-NSTAR-9482' : 'EKA-7K29F';
  const fieldHint = isInvitation
    ? "Codes are sent to your work inbox by your enterprise administrator."
    : "Ask your admin for your organization's unique Enterprise ID.";

  return (
    <>
      <div
        className={`${styles['radio-card']} ${
          selected === 'invitation' ? styles['selected'] : ''
        }`}
        onClick={() => setSelected('invitation')}
      >
        <span className={styles['radio-dot']}>
          {selected === 'invitation' && <span className={styles['radio-dot-fill']} />}
        </span>
        <div>
          <div className={styles['radio-card-title']}>
            Have an invitation?
            <span className={styles['tag']}>Recommended</span>
          </div>
          <p>Instant access via your unique one-time invitation code or email link.</p>
        </div>
      </div>

      <div
        className={`${styles['radio-card']} ${
          selected === 'enterprise-id' ? styles['selected'] : ''
        }`}
        onClick={() => setSelected('enterprise-id')}
      >
        <span className={styles['radio-dot']}>
          {selected === 'enterprise-id' && <span className={styles['radio-dot-fill']} />}
        </span>
        <div>
          <div className={styles['radio-card-title']}>Don't have an invitation?</div>
          <p>Join using your organization's unique Enterprise ID (requires admin approval).</p>
        </div>
      </div>

      <div className={styles['auth-field']}>
        <label htmlFor="invite-code">{fieldLabel}</label>
        <input id="invite-code" type="text" placeholder={fieldPlaceholder} />
      </div>
      <p className={styles['auth-field-hint']}>{fieldHint}</p>

      <Link to={destination} className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}>
        {buttonLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </>
  );
}
// ===================== Page =====================
export default function EmployeeJoinMethodPage() {
  const [selected, setSelected] = useState('invitation');

  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />
      

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
           <VerificationHeader selected={selected} />
          <InvitationForm selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </div>
  );
} 