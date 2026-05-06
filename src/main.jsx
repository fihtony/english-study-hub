import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App.jsx';

/**
 * Mount the React application into #root.
 * Uses defensive checks and logs unexpected errors to aid debugging.
 */
function mountApp() {
  try {
    const rootEl = document.getElementById('root');
    if (!rootEl) {
      throw new Error(
        'Root element not found. Ensure index.html contains <div id="root"></div>.'
      );
    }

    const root = ReactDOM.createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    // Surface the error clearly for developers; avoid exposing internal details to end users.
    // Do not use innerHTML or other unsafe patterns.
    // Rethrow so dev tooling (and Vite) can surface the stack trace.
    // Log a concise message first for clarity.
    // eslint-disable-next-line no-console
    console.error('Application failed to mount:', err);
    throw err;
  }
}

// Ensure DOM is ready before mounting (handles varied bundler/script ordering).
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp, { once: true });
} else {
  mountApp();
}

// Global error handlers to aid observability during runtime (non-invasive).
window.addEventListener('error', (evt) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught error:', evt.error || evt.message, evt);
});
window.addEventListener('unhandledrejection', (evt) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled promise rejection:', evt.reason);
});

// Enable HMR accept if available (Vite / dev environments).
if (import.meta && import.meta.hot) {
  import.meta.hot.accept();
}