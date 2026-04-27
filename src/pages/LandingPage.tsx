import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

const APP_NAME = 'English Study Hub';

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setError(null);
      try {
        // navigate is synchronous; keeping try/catch for safety in unexpected environments
        navigate('/quiz');
      } catch (err) {
        // Log the error for observability and show a user-friendly message
        // eslint-disable-next-line no-console
        console.error('LandingPage: navigation to /quiz failed', err);
        setError('Unable to start the quiz right now. Please try again.');
      }
    },
    [navigate]
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

      <main className={styles.main} id="main-content">
        <section
          className={styles.hero}
          aria-labelledby="hero-title"
          data-testid="hero-section"
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
              onClick={handleStartQuiz}
              className={styles.ctaButton}
              aria-label="Start quiz"
              data-testid="cta-button"
            >
              Start Quiz
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