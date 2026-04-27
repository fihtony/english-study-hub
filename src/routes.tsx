import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/**
 * ErrorBoundary to catch rendering/loading errors from lazy-loaded route components.
 * Keeps UX friendly and avoids full app crash on component load failures.
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production, replace console.error with telemetry/reporting integration
    // (Sentry, LogRocket, etc.). Keep minimal and safe here.
    // eslint-disable-next-line no-console
    console.error('Route ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          style={{
            display: 'flex',
            minHeight: '60vh',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          <div>
            <h1>Something went wrong</h1>
            <p>Unable to load this part of the app. Try refreshing the page.</p>
          </div>
        </main>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

/*
 * Lazy-load route components to keep initial bundle small.
 * LandingPage is mapped to '/', preserving any existing lazy-loading strategy.
 */
const LandingPage = lazy(() => import('./pages/LandingPage'));

/*
 * AppRoutes centralizes application routing.
 * Exported as default so App.tsx can render <AppRoutes /> instead of defining routes inline.
 */
const AppRoutes: React.FC = () => {
  // Use PUBLIC_URL as basename if app is deployed to a subpath (create-react-app convention)
  const basename = process.env.PUBLIC_URL || undefined;

  return (
    <BrowserRouter basename={basename}>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div
              role="status"
              aria-live="polite"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40vh',
              }}
            >
              <span>Loading…</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Preserve other application routes here as needed (examples)
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/app" element={<ProtectedRoute><AppShell /></ProtectedRoute>} />
            */}
            {/* Fallback: redirect unknown routes to landing page to avoid exposing 404s unintentionally */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;