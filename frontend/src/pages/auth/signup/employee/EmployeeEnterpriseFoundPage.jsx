import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';
// ===================== Component: FoundStepIndicator =====================
function FoundStepIndicator() {
  return (
    <div className="step-indicator">
      <div className="step active">
        <span className="step-num step-num--check">✓</span> Found
      </div>
      <span className="step-arrow">→</span>
      <div className="step active">
        <span className="step-num step-num--current">2</span> Request
      </div>
      <span className="step-arrow">→</span>
      <div className="step">
        <span className="step-num">3</span> Approval
      </div>
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
          <FoundStepIndicator />

          <div className="auth-badge">🏢 ENTERPRISE FOUND</div>
          <h2 className="auth-title">Enterprise found</h2>
          <p className="auth-description">
            Your request will be sent to an administrator for approval.
          </p>

          <EnterpriseCard />

          <div className="auth-field">
            <label htmlFor="full-name">Your Full Name</label>
            <input id="full-name" type="text" placeholder="Alex Morgan" />
          </div>

          <div className="auth-field">
            <label htmlFor="work-email">Your Work Email</label>
            <input id="work-email" type="email" placeholder="alex.morgan@northstar.studio" />
          </div>
          <p className="auth-field-hint">Must match your organization's verified email domain.</p>

          <button className="option-card-btn option-card-btn--teal">
            Request to Join
            <span aria-hidden="true">→</span>
          </button>

          <p className="auth-page-footer">© 2026 EKA Technologies. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}