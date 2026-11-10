import styles from '../../styles/auth.module.css';

export default function PasswordStrength({ password }) {
  const requirements = [
    { label: 'At least 8 char', met: password.length >= 8 },
    { label: 'One capital letter', met: /[A-Z]/.test(password) },
    { label: 'One small letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special char', met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <ul className={styles['password-requirements']}>
      {requirements.map((req) => (
        <li key={req.label} className={req.met ? styles['met'] : ''}>
          <span className={styles['req-icon']}>{req.met ? '✓' : '*'}</span>
          {req.label}
        </li>
      ))}
    </ul>
  );
}