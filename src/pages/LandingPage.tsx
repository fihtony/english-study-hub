import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    try {
      navigate('/quiz');
    } catch (err) {
      // Log error and attempt hard navigation as a safe fallback
      // (should rarely be necessary in a properly configured SPA)
      // eslint-disable-next-line no-console
      console.error('Failed to navigate to /quiz via router:', err);
      try {
        window.location.assign('/quiz');
      } catch (innerErr) {
        // eslint-disable-next-line no-console
        console.error('Fallback navigation failed:', innerErr);
      }
    }
  };

  return (
    <div className={styles.container ?? 'landing-container'}>
      <Header />
      <main
        className={styles.hero ?? 'landing-hero'}
        role="main"
        aria-labelledby="landing-hero-title"
      >
        <h1 id="landing-hero-title" className={styles.title ?? 'landing-title'}>
          Welcome to English Study Hub
        </h1>

        <p className={styles.subtitle ?? 'landing-subtitle'}>
          Improve your English with quick, engaging quizzes.
        </p>

        <div className={styles.ctaWrap ?? 'cta-wrap'}>
          {/* Primary CTA using react-router Link for accessible client-side navigation */}
          <Link
            to="/quiz"
            className={styles.ctaLink ?? 'cta-link'}
            aria-label="Start the quiz"
            onClick={(e) => {
              // Defensive: prefer router navigation but ensure exceptional errors are handled
              try {
                // no-op: Link handles navigation; keep for analytics hooks if needed
              } catch (err) {
                // If Link fails for any reason, fallback to programmatic navigation
                // eslint-disable-next-line no-console
                console.error('Link click handler error, falling back to navigate:', err);
                handleStartClick();
              }
            }}
          >
            Start Quiz
          </Link>

          {/* Secondary accessible button that also navigates; keeps semantics clear if JS navigation needed */}
          <button
            type="button"
            className={styles.ctaButton ?? 'cta-button'}
            onClick={handleStartClick}
            aria-hidden="false"
          >
            Start Quiz
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;