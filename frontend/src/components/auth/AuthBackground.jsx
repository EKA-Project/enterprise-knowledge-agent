// AuthBackground.jsx
// Shared left panel for all auth pages (signup, login, forgot password, etc.)
// Contains: back link, eyebrow, headline, subtext, and the decorative illustration.

import { Link } from 'react-router-dom';
import ekaBrain from '../../assets/images/eka_brain.jpeg';
import styles from '../../styles/auth.module.css';

function AuthIllustration() {
  return (
    <div className={styles['auth-illustration']}>
      <div className={`${styles['auth-orbit']} ${styles['auth-orbit--one']}`}/>
      <div className={`${styles['auth-orbit']} ${styles['auth-orbit--two']}`}/>
      <div className={styles['auth-core']}>
        <img src={ekaBrain} alt="" />
      </div>
      <div className={`${styles['auth-tag']} ${styles['auth-tag--docs']}`}>
        📄 42 docs
      </div>
      <div className={`${styles['auth-tag']} ${styles['auth-tag--learning']}`}>
        🧩 always learning
      </div>
    </div>
  );
}

export default function AuthBackground() {
  return (
    <div className={styles['auth-brand-panel']}>
      <Link to="/" className={styles['auth-back-link']}>← Back to EKA</Link>

      <div className={styles['auth-eyebrow']}>
        <span className={styles['auth-eyebrow-dot']} />
        Knowledge in motion
      </div>

      <h1 className={styles['auth-headline']}>
        Good work starts
        <br />
        with context.
      </h1>

      <p className="auth-subtext">
        One calm place for the questions, documents and ideas that move
        your team forward.
      </p>

      <AuthIllustration />
    </div>
  );
}