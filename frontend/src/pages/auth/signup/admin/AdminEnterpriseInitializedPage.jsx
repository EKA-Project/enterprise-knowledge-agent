import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import styles from '../../../../styles/auth.module.css';
// Admin account creation steps
const ADMIN_STEPS = [
  { label: 'Account' },
  { label: 'Enterprise' },
  { label: 'Confirmation' },
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
            {step.label}
          </div>
          {i < steps.length - 1 && <span className={styles['step-arrow']}>→</span>}
        </Fragment>
      ))}
    </div>
  );
}

// Admin enterprise initialization page export

export default function AdminEnterpriseInitializedPage() {
  const navigate = useNavigate();

  function handleCreateEnterprise() {
    navigate('/signup/admin/confirmation');
  }

  return (
    <div className={styles['auth-shell']}>
      <AuthBackground />

      <div className={styles['auth-form-panel']}>
        <div className={styles['auth-card']}>
          <StepIndicator steps={ADMIN_STEPS} current={1} />

          <div className={styles['auth-context-row']}>
            <BackLink>← Back to account details</BackLink>
          </div>

          <div className={styles['auth-badge']}>🏢 ENTERPRISE PROFILE · STEP 2 OF 3</div>
          <h2 className={styles['auth-title']}>Set up your enterprise</h2>
          <p className={styles['auth-description']}>
            Configure the organization workspace and security parameters.
          </p>

          <div className={styles['auth-field']}>
            <label htmlFor="enterprise-name">Enterprise / Company Name</label>
            <input id="enterprise-name" type="text" defaultValue="Northstar Studio" />
          </div>

          <div className={styles['auth-field']}>
            <label htmlFor="workspace-domain">Company / Workspace Domain</label>
            <input id="workspace-domain" type="text" defaultValue="northstar.studio" />
          </div>
          <p className={styles['auth-field-hint']}>
            Used for corporate SSO matching and employee invitations.
          </p>

          <div className={styles['two-col-fields-row']}>
            <div className={styles['auth-field']}>
              <label htmlFor="industry">
                Industry <span className={styles['optional-label']}> (optional) </span>
              </label>
              <select id="industry" defaultValue="Technology & Software">
                <option>Technology &amp; Software</option>
                <option>Finance &amp; Banking</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>

            <div className={styles['auth-field']}>
              <label htmlFor="company-size">
                Company Size <span className={styles['optional-label']}> (optional) </span>
              </label>
              <select id="company-size" defaultValue="50-250 employees">
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>50-250 employees</option>
                <option>250+ employees</option>
              </select>
            </div>
          </div>

          <label className={styles['terms-checkbox-row']}>
            <input type="checkbox" defaultChecked />
            <span>
              I agree to EKA's <a href="#">Master Services Agreement</a> &amp;{' '}
              <a href="#">Data Isolation Charter</a>.
            </span>
          </label>

          <button
            onClick={handleCreateEnterprise}
            className={`${styles['option-card-btn']} ${styles['option-card-btn--teal']}`}
          >
            Create Enterprise
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}