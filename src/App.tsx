import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

type ErrorBoundaryState = { hasError: boolean; error?: Error };

/**
 * Simple Error Boundary to catch render-time errors in children and
 * present a safe fallback UI. This prevents the entire SPA from
 * failing silently and helps with graceful degradation in production.
 */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Production: send this info to logging/monitoring service.
    // Avoid exposing error details to users (no stack traces in UI).
    // eslint-disable-next-line no-console
    console.error('Unhandled error in App ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: 24, textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>We&apos;re unable to display this page right now. Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Top-level SPA application.
 *
 * - Uses react-router DOM BrowserRouter with explicit root routes.
 * - '/' -> LandingPage
 * - any other path -> Navigate to '/' (client-side redirect, replace history)
 *
 * Exporting both default and a named `app` reference for tests/importers.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

// Named export for tests that import an app reference.
export const app = App;

export default App;