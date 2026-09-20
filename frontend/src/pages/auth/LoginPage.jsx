import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../components/auth/AuthBackground';
import ekaLogo from '../../assets/images/eka_logo.jpeg';
import '../../styles/auth.css';
// Social login buttons component
function SocialLogins() {
  return (
    <>
      <div className="auth-divider">
        <span>OR CONTINUE WITH</span>
      </div>

      <div className="social-login-row">
        <button className="social-login-btn">🔍 Google</button>
        <button className="social-login-btn">🐙 GitHub</button>
        <button className="social-login-btn">🪟 Microsoft</button>
      </div>
    </>
  );
}
 // Login page export
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-shell">
      <AuthBackground />

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-brand">
            <img src={ekaLogo} alt="EKA" />
            EKA.
          </div>

          <div className="auth-badge">🔐 WELCOME BACK</div>
          <h2 className="auth-title">Sign in to EKA</h2>
          <p className="auth-description">Enter your credentials to continue.</p>

          <div className="auth-field">
            <label htmlFor="work-email">Work Email</label>
            <input id="work-email" type="email" defaultValue="maya@northstar.studio" />
          </div>

          <div className="auth-field">
            <div className="auth-field-label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-link">Forgot?</Link>
            </div>
            <div className="password-input-wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                defaultValue="northstar123"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                👁️
              </button>
            </div>
          </div>

          <label className="terms-checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>Keep me signed in (30 days)</span>
          </label>

          <button className="option-card-btn option-card-btn--teal">
            Enter workspace
            <span aria-hidden="true">→</span>
          </button>

          <SocialLogins />

          <p className="auth-footer">
            New to EKA? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}