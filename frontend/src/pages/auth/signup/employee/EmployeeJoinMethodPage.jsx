import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';

// ===================== Component 1: Header section =====================
// Step indicator, back-to-choice row, title, description
function VerificationHeader() {
  return (
    <>
      <div className="step-indicator">
        <div className="step active">
          <span className="step-num">1</span> Verification
        </div>
        <span className="step-arrow">→</span>
        <div className="step">
          <span className="step-num">2</span> Account
        </div>
        <span className="step-arrow">→</span>
        <div className="step">
          <span className="step-num">3</span> Ready
        </div>
      </div>

      <div className="auth-context-row">
        <Link to="/signup">← Back to role choice</Link>
        <span className="auth-context-badge">👤 EMPLOYEE ONBOARDING</span>
      </div>

      <h2 className="auth-title">Join your enterprise</h2>
      <p className="auth-description">
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
        className={`radio-card ${selected === 'invitation' ? 'selected' : ''}`}
        onClick={() => setSelected('invitation')}
      >
        <span className="radio-dot">
          {selected === 'invitation' && <span className="radio-dot-fill" />}
        </span>
        <div>
          <div className="radio-card-title">
            Have an invitation?
            <span className="tag">Recommended</span>
          </div>
          <p>Instant access via your unique one-time invitation code or email link.</p>
        </div>
      </div>

      <div
        className={`radio-card ${selected === 'enterprise-id' ? 'selected' : ''}`}
        onClick={() => setSelected('enterprise-id')}
      >
        <span className="radio-dot">
          {selected === 'enterprise-id' && <span className="radio-dot-fill" />}
        </span>
        <div>
          <div className="radio-card-title">Don't have an invitation?</div>
          <p>Join using your organization's unique Enterprise ID (requires admin approval).</p>
        </div>
      </div>

      <div className="auth-field">
        <label htmlFor="invite-code">{fieldLabel}</label>
        <input id="invite-code" type="text" placeholder={fieldPlaceholder} />
      </div>
      <p className="auth-field-hint">{fieldHint}</p>

      <Link to={destination} className="option-card-btn option-card-btn--teal">
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
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <VerificationHeader />
          <InvitationForm selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </div>
  );
} 