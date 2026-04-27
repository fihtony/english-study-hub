import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

export const TEST_IDS = {
  hero: 'hero-section',
  cta: 'start-cta',
};

const APP_NAME = 'English Study Hub';

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const handleStart = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isNavigating) return;
      setError(null);
      setIsNavigating(true);
      try {
        // navigate is synchronous in react-router-dom v6, but keep async safety
        navigate('/quiz');
      } catch (err) {
        // Observability: log error and surface friendly message
        // Avoid exposing internal error details to users (OWASP).
        // eslint-disable-next-line no-console
        console.error('LandingPage: navigation to /quiz failed', err);
        setError('Unable to start the quiz right now. Please try again later.');
      } finally {
        // If navigation succeeded in this environment, component will likely unmount.
        setIsNavigating(false);
      }
    },
    [navigate, isNavigating]
  );

  return (
    <div className={styles.pageWrapper}>
      <header
        role="banner"
        className={styles.header}
        aria-label={`${APP_NAME} header`}
        data-testid="header"
      >
        <div className={styles.headerInner}>
          <h1 className={styles.appName}>{APP_NAME}</h1>
        </div>
      </header>

      <main className={styles.main} id="main-content" tabIndex={-1}>
        <section
          className={styles.hero}
          aria-labelledby="hero-title"
          data-testid={TEST_IDS.hero}
        >
          <h1 id="hero-title" data-testid="hero-title" className={styles.heroTitle}>
            Welcome to English Study Hub
          </h1>

          <p className={styles.description}>
            Short, focused quizzes and lessons to improve your English skills — practice anytime,
            anywhere.
          </p>

          <div className={styles.ctaWrap}>
            <button
              type="button"
              onClick={handleStart}
              className={styles.ctaButton}
              aria-label="Start quiz"
              data-testid={TEST_IDS.cta}
              disabled={isNavigating}
              aria-disabled={isNavigating}
            >
              {isNavigating ? 'Starting…' : 'Start Quiz'}
            </button>
          </div>

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className={styles.error}
              data-testid="cta-error"
            >
              {error}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}