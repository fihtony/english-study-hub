import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

/**
 * Mount point: ensure a stable #root exists regardless of how index.html was provided.
 * This makes the entry resilient in test and CI environments where the HTML shell might be generated.
 */
const ensureRootElement = (id = 'root') => {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Centralized client-side error logging hook can be placed here.
    // Keep logs minimal and avoid leaking sensitive state.
    // In production, forward to a secure telemetry endpoint.
    // eslint-disable-next-line no-console
    console.error('Uncaught error in React tree:', error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      // Accessible, minimal fallback UI
      return (
        <div role="alert" style={{ padding: 24, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
          <h1 style={{ marginTop: 0 }}>Something went wrong</h1>
          <p>We're experiencing an unexpected error. Try refreshing the page.</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.info && '\n' + (this.state.info.componentStack || '')}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = ensureRootElement('root');
const root = createRoot(rootElement);

// Use a mutable reference so HMR can replace it.
let AppComponent = App;

/**
 * Render the application into the root.
 * Wrapped with React.StrictMode for dev-time checks and an ErrorBoundary for graceful failures.
 * BrowserRouter uses Vite's base URL when available so routing works correctly behind a subpath.
 */
const renderApp = () => {
  try {
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
            <AppComponent />
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    // If rendering throws synchronously (rare), replace UI with a safe fallback and log the error.
    // eslint-disable-next-line no-console
    console.error('Render failed:', err);
    root.render(
      <div role="alert" style={{ padding: 24 }}>
        <h1>Application failed to start</h1>
        <p>Check the console for more details.</p>
      </div>
    );
  }
};

renderApp();

/**
 * Vite Hot Module Replacement (HMR) - accept updates for the App component and re-render.
 * This block is safe in both dev and CI environments because import.meta.hot is undefined in production/static builds.
 */
if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', async (module) => {
    try {
      // Prefer the provided module if Vite passes it; otherwise dynamically import the updated module.
      const updated = module && module.default ? module.default : (await import('./App.jsx')).default;
      if (updated) {
        AppComponent = updated;
        renderApp();
      }
    } catch (hmrErr) {
      // eslint-disable-next-line no-console
      console.error('HMR update failed for App:', hmrErr);
    }
  });

  // Allow the whole module to be replaced in extreme cases (optional safety).
  import.meta.hot.accept((newModule) => {
    // If other imports change, re-render to pick up updates.
    try {
      // Attempt to re-import App to ensure AppComponent is current.
      import('./App.jsx')
        .then((m) => {
          AppComponent = m.default || AppComponent;
          renderApp();
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error('Failed to re-import App during full hot accept:', e);
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Unexpected error during full hot accept:', e);
    }
  });
}