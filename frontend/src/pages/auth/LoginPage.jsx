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
        <button className="social-login-btn">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.8l5.7-5.7C33.5 6.5 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.2 0 19.5-8.5 19.5-19.5 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.9 18.9 13 24 13c2.8 0 5.3 1 7.3 2.8l5.7-5.7C33.5 6.5 29 4.5 24 4.5c-7.6 0-14.1 4.3-17.7 10.2z"/>
            <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.3l-6.2-5.2C29.3 34.7 26.8 35.5 24 35.5c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.8 39.1 16.3 43.5 24 43.5z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C40.1 36.4 43.5 30.8 43.5 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Google
        </button>

        <button className="social-login-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#181717">
            <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.2 11.68.6.11.82-.27.82-.6 0-.29-.01-1.06-.02-2.08-3.34.75-4.04-1.65-4.04-1.65-.55-1.43-1.34-1.81-1.34-1.81-1.09-.77.08-.75.08-.75 1.21.09 1.84 1.28 1.84 1.28 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.37-5.47-6.08 0-1.34.46-2.44 1.22-3.3-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.26a11.1 11.1 0 0 1 6 0c2.3-1.59 3.3-1.26 3.3-1.26.65 1.69.24 2.94.12 3.25.76.86 1.22 1.96 1.22 3.3 0 4.72-2.8 5.77-5.48 6.07.43.38.81 1.14.81 2.3 0 1.66-.01 3-.01 3.42 0 .33.22.72.83.6C20.57 22.34 24 17.73 24 12.3 24 5.5 18.63 0 12 0z"/>
          </svg>
          GitHub
        </button>

        <button className="social-login-btn">
          <svg width="18" height="18" viewBox="0 0 23 23">
            <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
            <rect x="12" y="1" width="10" height="10" fill="#7FBA00"/>
            <rect x="1" y="12" width="10" height="10" fill="#00A4EF"/>
            <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
          </svg>
          Microsoft
        </button>
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
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
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