import React from 'react';
import Landing from './components/Landing';
import './styles.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    /* eslint-disable no-console */
    console.error('ErrorBoundary caught an error', error, info);
    /* eslint-enable no-console */
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="error-fallback"
        >
          <h2 className="error-title">Something went wrong</h2>
          <p className="error-description">
            An unexpected error occurred while rendering the application. Try refreshing the page.
          </p>

          <div className="error-actions">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh
            </button>

            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn btn-outline"
            >
              Dismiss
            </button>
          </div>

          <details className="error-details">
            <summary>Technical details</summary>
            <pre>{this.state.error ? String(this.state.error) : 'No details available.'}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  // Top-level SPA shell with landmarks and accessible skip link.
  // Visual styles and color tokens are provided by src/styles.css.
  return (
    <>
      <a href="#main" className="sr-only sr-only--focusable">
        Skip to main content
      </a>

      <header role="banner" className="app-header">
        <div className="container header-inner">
          <a href="/" className="brand" aria-label="English Study Hub home">
            English Study Hub
          </a>

          <nav aria-label="Primary" className="primary-nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      <ErrorBoundary>
        <main id="main" role="main" tabIndex={-1} className="app-main">
          <div className="container content-wrapper">
            <Landing />
          </div>
        </main>
      </ErrorBoundary>

      <footer data-testid="footer" role="contentinfo" className="app-footer">
        <div className="container footer-inner">
          <p className="muted">&copy; {new Date().getFullYear()} English Study Hub</p>
          <nav aria-label="Footer" className="footer-nav">
            <a href="/privacy" className="nav-link">Privacy</a>
            <a href="/terms" className="nav-link">Terms</a>
          </nav>
        </div>
      </footer>
    </>
  );
}