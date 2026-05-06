import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/landing.css';

const ROOT_ID = 'root';
const rootEl = document.getElementById(ROOT_ID);

if (!rootEl) {
  throw new Error(
    `Root element with id "${ROOT_ID}" not found. Ensure index.html contains <div id="${ROOT_ID}"></div>`
  );
}

/**
 * Minimal, conditional fallback stylesheet injection.
 *
 * - Only injects a very small set of CSS variables and fallback UI rules
 *   when the canonical landing stylesheet (src/styles/landing.css) has not
 *   loaded or hasn't defined the core canonical token used by the UI.
 *
 * - This avoids duplicating the full token palette in JS and prevents
 *   two sources of truth. landing.css remains authoritative.
 *
 * - Detection strategy: check for a single canonical token that landing.css
 *   must define: --stitch-surface-container. If absent/empty, inject minimal
 *   fallbacks so the emergency UI is readable.
 */
function ensureFallbackStylesInjected() {
  const STYLE_ID = 'app-fallback-styles';
  if (document.getElementById(STYLE_ID)) return;

  // Detect whether landing.css has defined the canonical token.
  let tokenValue = '';
  try {
    tokenValue = getComputedStyle(document.documentElement).getPropertyValue(
      '--stitch-surface-container'
    ).trim();
  } catch (e) {
    tokenValue = '';
  }

  // If the canonical token exists and has a value, no need to inject fallbacks.
  if (tokenValue) return;

  const css = `
    :root{
      /* Minimal canonical fallbacks used only when landing.css failed to load.
         These intentionally use CSS variables so landing.css can override them. */
      --stitch-surface-container: #ffffff;
      --stitch-color-on-surface: #03204B;
      --stitch-font-stack: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    /* Very small, readable emergency UI used when the app fails to mount. */
    .app-fallback {
      font-family: var(--stitch-font-stack);
      color: var(--stitch-color-on-surface);
      background: var(--stitch-surface-container);
      padding: 1.25rem;
      border-radius: 0.5rem;
      max-width: 48rem;
      margin: 3rem auto;
      box-shadow: 0 6px 18px rgba(2,8,23,0.06);
      line-height: 1.4;
      text-align: left;
    }

    .app-fallback strong { display:block; margin-bottom:0.5rem; font-weight:600; }
    .app-fallback small { display:block; margin-top:0.75rem; color: rgba(3,32,75,0.65); }
  `;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.setAttribute('data-generated-by', 'src/main.jsx');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

try {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (err) {
  // Log the mounting error and show a small, styled fallback UI that relies on CSS aliases above.
  // Keep console output limited to diagnostics.
  // eslint-disable-next-line no-console
  console.error('Error mounting React application:', err);

  try {
    ensureFallbackStylesInjected();
    rootEl.innerHTML = `
      <div role="alert" class="app-fallback" aria-live="assertive">
        <strong>Application failed to load.</strong>
        <div>Please check the browser console for details.</div>
        <small>If this persists, capture the page URL and browser info and contact support.</small>
      </div>
    `;
  } catch (injectErr) {
    // If even the fallback render fails, fall back to the most minimal text-only message.
    // eslint-disable-next-line no-console
    console.error('Error rendering fallback UI:', injectErr);
    rootEl.textContent = 'Application failed to load. See console for details.';
  }
}

// Vite HMR support
if (import.meta && import.meta.hot) {
  import.meta.hot.accept();
}