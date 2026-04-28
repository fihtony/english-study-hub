import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/theme.css';

const mountApp = () => {
  const rootEl = document.getElementById('root');
  if (!rootEl) {
    const msg = 'Root element with id "root" not found. Ensure your index.html contains <div id="root"></div>.';
    // Fail fast during development, but also provide a clear message in production logs.
    // Throwing here prevents silent failures where the app appears to load but nothing renders.
    console.error(msg);
    throw new Error(msg);
  }

  try {
    const root = createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (err) {
    // If rendering fails, log full error for diagnostics and rethrow to surface the issue to any bundler/dev tooling.
    console.error('Failed to mount React application:', err);
    throw err;
  }
};

// If the DOM is already loaded, mount immediately. Otherwise wait for DOMContentLoaded.
// This makes the entrypoint robust regardless of script placement in index.html.
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mountApp();
} else {
  window.addEventListener('DOMContentLoaded', mountApp, { once: true });
}