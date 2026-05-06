import React, { lazy } from 'react';
import { Routes, Route, Link, Navigate, useInRouterContext, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Lazy-load pages for code-splitting.
 * LandingBarebones expected at src/pages/LandingBarebones.jsx
 * ScreenJsonViewer expected at src/pages/ScreenJsonViewer.jsx (review required file)
 */
const LandingBarebones = lazy(() => import('./pages/LandingBarebones.jsx'));
const ScreenJsonViewer = lazy(() => import('./pages/ScreenJsonViewer.jsx'));

/**
 * Embedded component-scoped CSS to avoid inline styles and to reference design tokens.
 * In a larger app this would live in src/App.css or a design system package.
 */
const appCss = `
:root{
  --surface: #ffffff;
  --surface-container: #f8fafc;
  --primary: #0b5fff;
  --muted: #6b7280;
  --outline: #e6e9ee;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-8: 32px;
  --content-max-width: 1100px;
}

/* Reset / base */
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  color: #111827;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Skip link accessible and visible on focus */
.skip-link {
  position: absolute;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 100;
}
.skip-link:focus {
  left: var(--space-4);
  top: var(--space-4);
  width: auto;
  height: auto;
  padding: var(--space-2) var(--space-3);
  background: var(--primary);
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
}

/* Header */
.header {
  background-color: var(--surface-container);
  border-bottom: 1px solid var(--outline);
}
.header-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}
.brand-logo {
  font-size: 22px;
  line-height: 1;
}
.brand-name {
  font-weight: 700;
  font-size: 18px;
}

/* Nav */
.nav {
  display: flex;
  gap: 12px;
  align-items: center;
}
.nav-link {
  color: var(--muted);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
}
.nav-link:hover,
.nav-link:focus {
  color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(11,95,255,0.08);
}

/* Main content area */
.main {
  flex: 1 1 auto;
  max-width: var(--content-max-width);
  margin: 32px auto;
  padding: 0 20px;
  width: 100%;
}

/* Footer */
.footer {
  background-color: var(--surface-container);
  border-top: 1px solid var(--outline);
}
.footer-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}
.footer-text {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}
.footer-nav {
  display: flex;
  gap: 12px;
}
.footer-link {
  color: var(--muted);
  text-decoration: none;
  font-size: 14px;
}

/* Loading / NotFound */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  color: var(--muted);
  text-align: center;
}
.notfound {
  padding: 40px;
  text-align: center;
}
.notfound h1 {
  font-size: 28px;
  margin: 0 0 12px 0;
}
.notfound p {
  margin: 0;
  color: var(--muted);
}

/* Utility */
.container {
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .header-inner, .footer-inner {
    padding: 12px;
  }
  .brand-name { font-size: 16px; }
  .main { margin: 20px auto; }
}
`;

/**
 * LoadingFallback - accessible loading UI used while lazy components are resolving.
 * No inline styles — classes reference design tokens above.
 */
function LoadingFallback() {
  return (
    <main role="main" aria-live="polite" className="loading" aria-busy="true">
      <svg
        width="48"
        height="48"
        viewBox="0 0 50 50"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="var(--outline)"
          strokeWidth="6"
        />
        <path
          d="M45 25a20 20 0 0 1-20 20"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <span>Loading…</span>
    </main>
  );
}

/**
 * NotFound component with class-based styles.
 */
function NotFound() {
  return (
    <main role="main" className="notfound">
      <h1>404 — Page not found</h1>
      <p>
        The page you are looking for doesn't exist. <Link to="/">Return home</Link>.
      </p>
    </main>
  );
}

/**
 * RouteTitleManager - updates document.title based on the active route.
 * Rendered only when inside a Router to avoid hook errors.
 */
function RouteTitleManager() {
  const location = useLocation();
  React.useEffect(() => {
    try {
      if (location && location.pathname.startsWith('/screen-json')) {
        document.title = 'JSON (nodes) — English Study Hub';
      } else {
        document.title = 'English Study Hub';
      }
    } catch (err) {
      // If document is unavailable for any reason, fail silently.
      // eslint-disable-next-line no-console
      console.warn('RouteTitleManager failed to update title', err);
    }
  }, [location]);
  return null;
}

/**
 * AppRoutes: defines the route tree and layout shell (header/footer).
 *
 * Note: Suspense is expected to be provided by the application root (e.g., src/main.jsx).
 * If that is not the case, lazy-loaded routes will throw until wrapped in Suspense.
 */
function AppRoutes() {
  const inRouter = useInRouterContext();

  if (!inRouter) {
    // Developer guidance: App should be wrapped in a Router at the root.
    // eslint-disable-next-line no-console
    console.warn(
      'App rendered outside of a Router. Please wrap <App /> with a Router (BrowserRouter) in src/main.jsx.'
    );
  }

  return (
    <div className="app-shell" role="application">
      {/* Component-scoped CSS injection to avoid dependency on external files during development/testing */}
      <style>{appCss}</style>

      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="header" role="banner">
        <div className="header-inner">
          <Link to="/" aria-label="English Study Hub home" className="brand">
            <span className="brand-logo" aria-hidden="true">📘</span>
            <span className="brand-name">English Study Hub</span>
          </Link>

          <nav aria-label="Main navigation" className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/landing-barebones" className="nav-link">Landing</Link>
            <Link to="/screen-json" className="nav-link" title="JSON (nodes) screen">JSON (nodes)</Link>
          </nav>
        </div>
      </header>

      {/* Only mount RouteTitleManager when inside a Router to avoid hook misuse */}
      {inRouter && <RouteTitleManager />}

      <ErrorBoundary>
        <main id="main-content" role="main" className="main container">
          <Routes>
            <Route path="/" element={<LandingBarebones />} />
            <Route path="/landing-barebones" element={<LandingBarebones />} />
            <Route path="/screen-json" element={<ScreenJsonViewer />} />
            <Route path="/screens/45ac4478" element={<ScreenJsonViewer />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ErrorBoundary>

      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <p className="footer-text">© {new Date().getFullYear()} English Study Hub — All rights reserved.</p>
          <nav aria-label="Footer" className="footer-nav">
            <a href="/privacy" className="footer-link">Privacy</a>
            <a href="/terms" className="footer-link">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

/**
 * Main App export.
 */
export default function App() {
  return <AppRoutes />;
}