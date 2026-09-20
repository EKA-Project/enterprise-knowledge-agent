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