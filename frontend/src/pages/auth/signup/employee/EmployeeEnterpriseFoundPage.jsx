import { Link } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import '../../../../styles/auth.css';
// ===================== Component: FoundStepIndicator =====================
function FoundStepIndicator() {
  return (
    <div className="step-indicator">
      <div className="step active">
        <span className="step-num step-num--check">✓</span> Found
      </div>
      <span className="step-arrow">→</span>
      <div className="step active">
        <span className="step-num step-num--current">2</span> Request
      </div>
      <span className="step-arrow">→</span>
      <div className="step">
        <span className="step-num">3</span> Approval
      </div>
    </div>
  );
}
// ===================== Component: EnterpriseCard =====================
function EnterpriseCard() {
  return (
    <div className="invite-card invite-card--simple">
      <div className="invite-card-header invite-card-header--no-border">
        <span className="invite-avatar">NS</span>
        <div>
          <p className="invite-company-name">Northstar Studio</p>
          <p className="invite-enterprise-id">Enterprise ID: EKA-7K29F</p>
        </div>
      </div>
    </div>
  );
}
