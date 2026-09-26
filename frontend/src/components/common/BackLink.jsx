import { useNavigate } from 'react-router-dom';

export default function BackLink({ children }) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="auth-back-step-link">
      {children}
    </button>
  );
}