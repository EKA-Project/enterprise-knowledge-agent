import { useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import '../../../../styles/auth.css';
// ===================== Component 1: Step Indicator  Header=====================
const INVITE_STEPS = [
  { label: 'Verify', done: 'Verified' },
  { label: 'Account' },
  { label: 'Ready' },
];

const NO_INVITE_STEPS = [
  { label: 'Verify', done: 'Verified' },
  { label: 'Found', done: 'Found' },
  { label: 'Create Account' },
  { label: 'Approval' },
];
// ===================== Component 2: Step Indicator =====================
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
            {i < current && step.done ? step.done : step.label}
          </div>
          {i < steps.length - 1 && <span className="step-arrow">→</span>}
        </Fragment>
      ))}
    </div>
  );
}
