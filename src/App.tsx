import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';

type ErrorBoundaryState = { hasError: boolean; error?: Error };

/**
 * Simple error boundary to prevent the whole app from crashing on render errors.
 * Shows a minimal, safe error UI.
 */
class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production, send error and info to a monitoring service.
    // Keep console logging for developer diagnostics.
    // Avoid exposing stack traces to end users.
    // eslint-disable-next-line no-console
    console.error('Unhandled rendering error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
        >
          <div style={{ maxWidth: 720, textAlign: 'center' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>Something went wrong</h1>
            <p style={{ marginBottom: '1rem', color: '#444' }}>
              An unexpected error occurred while rendering the application. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#1f6feb',
                color: '#fff',
                padding: '0.6rem 1rem',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reload
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

/**
 * Placeholder Quiz page used when the real /quiz page is not available.
 * This guarantees the route exists and provides a minimal, accessible UI.
 */
const QuizPlaceholder: React.FC = () => {
  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 720 }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Quiz placeholder</h2>
        <p style={{ marginBottom: '1rem', color: '#444' }}>
          The quiz feature is coming soon. Click Start Quiz from the landing page when available.
        </p>
      </div>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header is intentionally outside routes so it renders on every page */}
        <Header />
        <ErrorBoundary>
          <Routes>
            {/* Root landing page route; ensure this comes before any wildcards */}
            <Route path="/" element={<LandingPage />} />

            {/* Keep /quiz route available; use placeholder if project doesn't provide a Quiz page */}
            <Route path="/quiz" element={<QuizPlaceholder />} />

            {/* Fallback: redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
};

export default App;