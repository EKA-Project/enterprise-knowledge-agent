import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';

export default function EmployeePendingApprovalPage() {
  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card auth-card--centered">

          <div className="status-icon-circle status-icon-circle--pending">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#b8aa94" strokeWidth="1.6" />
                <path d="M12 7v5l3 2" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="1.3" fill="#e08b2a" />
            </svg>
          </div>
          <span className="status-badge status-badge--pending">
            ● Status: Pending approval
          </span>

          <h2 className="auth-title">Request sent</h2>
          <p className="auth-description">
            Your request to join <strong>Northstar Studio</strong> is waiting
            for administrator approval.
          </p>

          <div className="info-box">
            <p className="info-box-title">
              Administrator: Maya Chen (northstar.studio)
            </p>
            <p className="info-box-text">
              We've notified the administrative team. Once approved,
              you'll receive access immediately.
            </p>
          </div>

          <Link to="/" className="option-card-btn option-card-btn--outline">
            Back to EKA
          </Link>

        </div>
      </div>
    </div>
  );
}