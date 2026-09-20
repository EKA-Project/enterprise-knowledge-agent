import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';

// HEADER INDICATOR FOR ADMIN SIGNUP FLOW
const ADMIN_STEPS = [
  { label: 'Account' },
  { label: 'Enterprise' },
  { label: 'Live' },
];

function StepIndicator({ steps }) {
  return (
    <div className="step-indicator">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          <div className="step active">
            <span className="step-num step-num--check">✓</span>
            {step.label}
          </div>
          {i < steps.length - 1 && <span className="step-arrow">→</span>}
        </Fragment>
      ))}
    </div>
  );
}
//ENterprise profile page export
export default function AdminEnterpriseProfilePage() {
  const [copied, setCopied] = useState(false);
  const enterpriseId = 'EKA-7K29F';

  function handleCopyId() {
    navigator.clipboard.writeText(enterpriseId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <StepIndicator steps={ADMIN_STEPS} />

          <div className="auth-badge">🚀 ENTERPRISE INITIALIZED</div>
          <h2 className="auth-title">Your enterprise is ready.</h2>
          <p className="auth-description">
            The dedicated workspace for <strong>Northstar Studio</strong> is active.
          </p>

          <div className="enterprise-id-box">
            <p className="enterprise-id-label">Enterprise ID</p>
            <div className="enterprise-id-row">
              <span className="enterprise-id-value">{enterpriseId}</span>
              <button onClick={handleCopyId} className="copy-id-btn">
                📋 {copied ? 'Copied!' : 'Copy ID'}
              </button>
            </div>
            <p className="enterprise-id-hint">
              Share this Enterprise ID with employees who need to request
              access to your workspace.
            </p>
          </div>

          <div className="info-box success-details-grid">
            <div>
              <p className="invite-label">Administrator</p>
              <p className="invite-value">Maya Chen</p>
            </div>
            <div>
              <p className="invite-label">Role</p>
              <p className="invite-value success-value--accent">Administrator</p>
            </div>
            <div>
              <p className="invite-label">Domain</p>
              <p className="invite-value">northstar.studio</p>
            </div>
            <div>
              <p className="invite-label">Vault Status</p>
              <p className="invite-value success-value--accent">Isolated &amp; Ready</p>
            </div>
          </div>

          <Link to="/dashboard" className="option-card-btn option-card-btn--teal">
            Go to Admin Workspace
            <span aria-hidden="true">→</span>
          </Link>

          <Link to="/signup/admin/invite" className="option-card-btn option-card-btn--outline">
            📩 Invite employees now
          </Link>
        </div>
      </div>
    </div>
  );
}