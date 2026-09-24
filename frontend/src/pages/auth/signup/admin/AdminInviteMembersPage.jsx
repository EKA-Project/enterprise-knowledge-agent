import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthBackground from '../../../../components/auth/AuthBackground';
import BackLink from '../../../../components/common/BackLink';
import '../../../../styles/auth.css';

function EmailChip({ email, onRemove }) {
  return (
    <span className="email-chip">
      {email}
      <button onClick={onRemove} aria-label={`Remove ${email}`}>
        ×
      </button>
    </span>
  );
}