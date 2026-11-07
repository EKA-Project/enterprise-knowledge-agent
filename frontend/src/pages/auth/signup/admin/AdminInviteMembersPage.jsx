import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import styles from '../../../../styles/auth.module.css';
function EmailChip({ email, onRemove }) {
  return (
    <span className={styles['email-chip']}>
      {email}
      <button onClick={onRemove} aria-label={`Remove ${email}`}>
        ×
      </button>
    </span>
  );
}

export default function AdminInviteMembersPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [emails, setEmails] = useState(['liam.o@northstar.studio']);
  const [role, setRole] = useState('Member (Standard)');

  function handleAdd() {
    const trimmed = inputValue.trim();
    if (trimmed && !emails.includes(trimmed)) {
      setEmails([...emails, trimmed]);
      setInputValue('');
    }
  }

function handleRemove(emailToRemove) {
    setEmails(emails.filter((e) => e !== emailToRemove));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }

  function handleSendInvitations() {
    navigate('/signup/admin/invite-success');
  }

  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <div className={styles['auth-context-row']}>
            <BackLink>← Back to enterprise overview</BackLink>
          </div>

          <h2 className={styles['auth-title']}>Invite members</h2>
          <p className={styles['auth-description']}>
            Enter email addresses to invite colleagues to <strong>Northstar Studio</strong>.
          </p>

          <div className={styles['invite-members-box']}>
            <div className={styles['invite-email-input-row']}>
              <input
                type="email"
                placeholder="name@company.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleAdd} className={styles['add-email-btn']}>
                + Add
              </button>
            </div>

            {emails.length > 0 && (
              <div className={styles['email-chip-list']}>
                {emails.map((email) => (
                  <EmailChip
                    key={email}
                    email={email}
                    onRemove={() => handleRemove(email)}
                  />
                ))}
              </div>
            )}

            <div className={styles['default-role-row']}>
              <label htmlFor="default-role">Default role for new invites:</label>
              <select
                id="default-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Member (Standard)</option>
                <option>Manager</option>
                <option>Employee</option>
              </select>
            </div>
          </div>

          <p className={styles['invite-tip']}>
            💡 You can always invite more members or adjust permissions later in settings.
          </p>

          <button
            onClick={handleSendInvitations}
            className={styles['option-card-btn'] + ' ' + styles['option-card-btn--teal']}
          >
            Send Invitations
            <span aria-hidden="true">→</span>
          </button>

          <Link to="/dashboard" className={styles['option-card-btn'] + ' ' + styles['option-card-btn--outline']}>
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  );
}