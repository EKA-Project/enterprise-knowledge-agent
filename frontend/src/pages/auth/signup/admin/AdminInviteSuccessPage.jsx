import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';

function InvitedMemberRow({ initial, email, roleDept }) {
  return (
    <div className="invited-member-row">
      <span className="invited-member-avatar">{initial}</span>
      <div className="invited-member-info">
        <p className="invited-member-email">{email}</p>
        <p className="invited-member-role">{roleDept}</p>
      </div>
      <span className="invited-badge">Invited</span>
    </div>
  );
}

export default function AdminInviteSuccessPage() {
  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="success-header-row">
            <div className="status-icon-circle--success-sm">✓</div>
            <div>
              <h2 className="auth-title">Invitations ready</h2>
              <p className="auth-description">1 invitations dispatched to team members.</p>
            </div>
          </div>

          <div className="invited-members-list">
            <InvitedMemberRow
              initial="L"
              email="liam.o@northstar.studio"
              roleDept="Engineering · Employee"
            />
          </div>

          <Link to="/dashboard" className="option-card-btn option-card-btn--teal">
            Go to Admin Workspace
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}