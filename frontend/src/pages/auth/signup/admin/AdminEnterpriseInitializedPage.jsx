import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import '../../../../styles/auth.css';
// Admin account creation steps
const ADMIN_STEPS = [
  { label: 'Account' },
  { label: 'Enterprise' },
  { label: 'Confirmation' },
];

function StepIndicator({ steps, current }) {
  return (
    <div className="step-indicator">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          <div className={`step ${i <= current ? 'active' : ''}`}>
            <span
              className={`step-num ${
                i < current ? 'step-num--check' : i === current ? 'step-num--current' : ''
              }`}
            >
              {i < current ? '✓' : i + 1}
            </span>
            {step.label}
          </div>
          {i < steps.length - 1 && <span className="step-arrow">→</span>}
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
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <StepIndicator steps={ADMIN_STEPS} current={1} />

          <div className="auth-context-row">
            <BackLink>← Back to account details</BackLink>
          </div>

          <div className="auth-badge">🏢 ENTERPRISE PROFILE · STEP 2 OF 3</div>
          <h2 className="auth-title">Set up your enterprise</h2>
          <p className="auth-description">
            Configure the organization workspace and security parameters.
          </p>

          <div className="auth-field">
            <label htmlFor="enterprise-name">Enterprise / Company Name</label>
            <input id="enterprise-name" type="text" defaultValue="Northstar Studio" />
          </div>

          <div className="auth-field">
            <label htmlFor="workspace-domain">Company / Workspace Domain</label>
            <input id="workspace-domain" type="text" defaultValue="northstar.studio" />
          </div>
          <p className="auth-field-hint">
            Used for corporate SSO matching and employee invitations.
          </p>

          <div className="two-col-fields-row">
            <div className="auth-field">
              <label htmlFor="industry">
                Industry <span className="optional-label">(optional)</span>
              </label>
              <select id="industry" defaultValue="Technology & Software">
                <option>Technology &amp; Software</option>
                <option>Finance &amp; Banking</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>

            <div className="auth-field">
              <label htmlFor="company-size">
                Company Size <span className="optional-label">(optional)</span>
              </label>
              <select id="company-size" defaultValue="50-250 employees">
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>50-250 employees</option>
                <option>250+ employees</option>
              </select>
            </div>
          </div>

          <label className="terms-checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>
              I agree to EKA's <a href="#">Master Services Agreement</a> &amp;{' '}
              <a href="#">Data Isolation Charter</a>.
            </span>
          </label>

          <button
            onClick={handleCreateEnterprise}
            className="option-card-btn option-card-btn--teal"
          >
            Create Enterprise
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}