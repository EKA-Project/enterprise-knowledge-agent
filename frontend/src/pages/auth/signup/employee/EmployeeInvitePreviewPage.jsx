import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import styles from '../../../../styles/auth.module.css';
// header section
function InviteStepIndicator() {
  return (
    <div className={styles['step-indicator']}>
      <div className={`${styles['step']} ${styles['active']}`}>
        <span className={`${styles['step-num']} ${styles['step-num--check']}`}>✓</span> Verified
      </div>
      <span className={styles['step-arrow']}>→</span>
      <div className={`${styles['step']} ${styles['step--current']}`}>
        <span className={`${styles['step-num']} ${styles['step-num--current']}`}>2</span> Ready
      </div>
    </div>
  );
}
 // invitation card section
function InvitationCard() {
  return (
    <div className={styles['invite-card']}>
      <div className={styles['invite-card-header']}>
        <span className={styles['invite-avatar']}>NS</span>
        <div>
          <p className={styles['invite-company-name']}>Northstar Studio</p>
          <p className={styles['invite-company-domain']}>northstar.studio</p>
        </div>
      </div>

      <div className={styles['invite-details-grid']}>
        <div>
          <p className={styles['invite-label']}>Invited by</p>
          <p className={styles['invite-value']}>Maya Chen</p>
          <p className={styles['invite-sub']}>Administrator</p>
        </div>
        <div>
          <p className={styles['invite-label']}>Workspace</p>
          <p className={styles['invite-value']}>Northstar Studio</p>
          <p className={styles['invite-sub']}>Dedicated Neural Vault</p>
        </div>
        <div>
          <p className={styles['invite-label']}>Department</p>
          <p className={styles['invite-value']}>Engineering</p>
        </div>
        <div>
          <p className={styles['invite-label']}>Workspace Role</p>
          <p className={styles['invite-value']}>Employee</p>
        </div>
      </div>

      <div className={styles['invite-status-row']}>
        <p className={styles['invite-label']}>Invitation Status</p>
        <span className={styles['invite-status-badge']}>✓ Valid &amp; Verified</span>
      </div>
    </div>
  );
}
//complete page component
export default function EmployeeInvitePreviewPage() {
  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <InviteStepIndicator />

          <div className={styles['auth-context-row']}>
            <BackLink>← Back</BackLink>
          </div>

          <div className={styles['auth-badge']}>📄 OFFICIAL INVITATION</div>
          <h2 className={styles['auth-title']}>You're invited to join EKA</h2>
          <p className={styles['auth-description']}>
            Review your organization and role details before activating your account.
          </p>

          <InvitationCard />

          <Link to="/dashboard" className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}>
            Accept Invitation
            <span aria-hidden="true">→</span>
          </Link>

          <p className={styles['auth-page-footer']}>© 2026 EKA Technologies. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}