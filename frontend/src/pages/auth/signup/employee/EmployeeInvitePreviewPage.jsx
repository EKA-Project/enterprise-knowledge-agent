import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';

function InviteStepIndicator() {
  return (
    <div className="step-indicator">
      <div className="step active">
        <span className="step-num step-num--check">✓</span> Verified
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
  );
}
