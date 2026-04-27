import React, { useEffect } from 'react';

/**
 * QuizPlaceholder
 *
 * Minimal placeholder component for the /quiz route so the Start Quiz CTA can be verified.
 * TODO: Replace this placeholder with the full Quiz page implementation.
 */
const QuizPlaceholder: React.FC = () => {
  useEffect(() => {
    try {
      // Best-effort: update the document title; guard against environments where document may be unavailable.
      if (typeof document !== 'undefined' && document.title !== undefined) {
        document.title = 'Quiz - English Study Hub';
      }
    } catch (error) {
      // Non-fatal: log any unexpected errors without breaking the UI.
      // eslint-disable-next-line no-console
      console.error('QuizPlaceholder: failed to set document title', error);
    }
  }, []);

  return (
    <main
      role="main"
      aria-labelledby="quiz-heading"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <section
        style={{
          maxWidth: 720,
          width: '100%',
          textAlign: 'center',
          borderRadius: 8,
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          background: '#fff',
        }}
        aria-describedby="quiz-desc"
      >
        <h1 id="quiz-heading" style={{ margin: 0, fontSize: '1.75rem', color: '#111' }}>
          Quiz page
        </h1>

        <p id="quiz-desc" style={{ marginTop: '0.75rem', color: '#444', lineHeight: 1.4 }}>
          This is a temporary placeholder for the quiz route. Clicking the Start Quiz CTA should
          navigate here for verification.
        </p>

        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
          <strong>TODO:</strong> Replace with the real quiz page implementation.
        </p>
      </section>
    </main>
  );
};

export default QuizPlaceholder;