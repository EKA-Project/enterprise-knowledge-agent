import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';
// header section
function InviteStepIndicator() {
  return (
    <div className="step-indicator">
      <div className="step active">
        <span className="step-num step-num--check">✓</span> Verified
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
  );
}
 // invitation card section
function InvitationCard() {
  return (
    <div className="invite-card">
      <div className="invite-card-header">
        <span className="invite-avatar">NS</span>
        <div>
          <p className="invite-company-name">Northstar Studio</p>
          <p className="invite-company-domain">northstar.studio</p>
        </div>
      </div>

      <div className="invite-details-grid">
        <div>
          <p className="invite-label">Invited by</p>
          <p className="invite-value">Maya Chen</p>
          <p className="invite-sub">Administrator</p>
        </div>
        <div>
          <p className="invite-label">Workspace</p>
          <p className="invite-value">Northstar Studio</p>
          <p className="invite-sub">Dedicated Neural Vault</p>
        </div>
        <div>
          <p className="invite-label">Department</p>
          <p className="invite-value">Engineering</p>
        </div>
        <div>
          <p className="invite-label">Workspace Role</p>
          <p className="invite-value">Employee</p>
        </div>
      </div>

      <div className="invite-status-row">
        <p className="invite-label">Invitation Status</p>
        <span className="invite-status-badge">✓ Valid &amp; Verified</span>
      </div>
    </div>
  );
}
export default function EmployeeInvitePreviewPage() {
  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <InviteStepIndicator />

          <div className="auth-badge">📄 OFFICIAL INVITATION</div>
          <h2 className="auth-title">You're invited to join EKA</h2>
          <p className="auth-description">
            Review your organization and role details before activating your account.
          </p>

          <InvitationCard />

          <button className="option-card-btn option-card-btn--teal">
            Accept Invitation
            <span aria-hidden="true">→</span>
          </button>

          <button className="option-card-btn option-card-btn--outline">
            Use a different invitation
          </button>

          <p className="auth-page-footer">© 2026 EKA Technologies. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}