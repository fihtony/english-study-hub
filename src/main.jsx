import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useInRouterContext } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

/**
 * RouterWrapper
 * - Ensures the app is wrapped with a single BrowserRouter at the root.
 * - If a Router already exists (e.g., App.jsx wrapped it), do not double-wrap.
 */
function RouterWrapper({ children }) {
  // useInRouterContext may be called outside a router and will simply return false.
  // This allows the wrapper to conditionally avoid double-wrapping.
  const inRouter = useInRouterContext();
  return inRouter ? <>{children}</> : <BrowserRouter>{children}</BrowserRouter>;
}

/**
 * mountApp - robust application bootstrap
 * - Ensures #root exists
 * - Uses React 18 createRoot
 * - Single canonical router wrapper at the root (RouterWrapper)
 * - Uses a shared ErrorBoundary component (no duplicate error boundary logic here)
 * - Suspense is intentionally NOT declared at the root to avoid nested fallbacks if App.jsx
 *   uses per-route Suspense. Keep a single Suspense location (inside App.jsx) to reduce
 *   duplicate loading UI complexity as requested in the review.
 */
function mountApp() {
  try {
    let rootEl = document.getElementById("root");
    if (!rootEl) {
      rootEl = document.createElement("div");
      rootEl.setAttribute("id", "root");
      document.body.appendChild(rootEl);
    }

    const root = createRoot(rootEl);

    root.render(
      <React.StrictMode>
        <RouterWrapper>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </RouterWrapper>
      </React.StrictMode>
    );
  } catch (err) {
    // Fatal render error: surface it and keep console trace.
    // eslint-disable-next-line no-console
    console.error("Failed to mount React application:", err);
    // Render a minimal fallback so the user sees something actionable.
    try {
      const body = document.body;
      body.innerHTML = "";
      const container = document.createElement("div");
      container.style.padding = "24px";
      // Use design token for font to keep typography consistent with index.css
      container.style.fontFamily = "var(--font-sans)";
      container.style.background = "var(--surface)";
      container.style.color = "var(--on-surface)";
      container.innerHTML =
        "<h1>Application failed to start</h1><p>Check the console for details. If the problem persists, contact support.</p>";
      body.appendChild(container);
    } catch (e) {
      // If even that fails, there's nothing more to do.
    }
  }
}

// Defer mount until DOMContentLoaded to be robust in various environments.
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", mountApp, { once: true });
} else {
  mountApp();
}