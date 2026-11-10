import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import styles from '../../../../styles/auth.module.css';
function InvitedMemberRow({ initial, email, roleDept }) {
  return (
    <div className={styles['invited-member-row']}>
      <span className={styles['invited-member-avatar']}>{initial}</span>
      <div className={styles['invited-member-info']}>
        <p className={styles['invited-member-email']}>{email}</p>
        <p className={styles['invited-member-role']}>{roleDept}</p>
      </div>
      <span className={styles['invited-badge']}>Invited</span>
    </div>
  );
}

export default function AdminInviteSuccessPage() {
  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <div className={styles['success-header-row']}>
            <div className={styles['status-icon-circle--success-sm']}>✓</div>
            <div>
              <h2 className={styles['auth-title']}>Invitations ready</h2>
              <p className={styles['auth-description']}>1 invitations dispatched to team members.</p>
            </div>
          </div>

          <div className={styles['invited-members-list']}>
            <InvitedMemberRow
              initial="L"
              email="liam.o@northstar.studio"
              roleDept="Engineering · Employee"
            />
          </div>

          <Link to="/dashboard" className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}>
            Go to Admin Workspace
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}