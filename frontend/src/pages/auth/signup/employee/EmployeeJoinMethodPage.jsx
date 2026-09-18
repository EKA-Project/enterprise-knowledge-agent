import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';

// ===================== Component 1: Header section =====================
// Step indicator, back-to-choice row, title, description
function VerificationHeader() {
  return (
    <>
      <div className="step-indicator">
        <div className="step active">
          <span className="step-num">1</span> Verification
        </div>
        <span className="step-arrow">→</span>
        <div className="step">
          <span className="step-num">2</span> Account
        </div>
        <span className="step-arrow">→</span>
        <div className="step">
          <span className="step-num">3</span> Ready
        </div>
      </div>

      <div className="auth-context-row">
        <Link to="/signup">← Back to role choice</Link>
        <span className="auth-context-badge">👤 EMPLOYEE ONBOARDING</span>
      </div>

      <h2 className="auth-title">Join your enterprise</h2>
      <p className="auth-description">
        Enter the details provided by your organization to connect your account.
      </p>
    </>
  );
}
