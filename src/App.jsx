import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

/**
 * Lazy-load the landing page to keep initial bundle small.
 * Path follows repo convention: src/pages/LandingPage.jsx
 */
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));

/**
 * Accessible loading indicator used as Suspense fallback.
 * Kept minimal and dependency-free so this file is self-contained.
 */
function LoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        minHeight: "24vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        gap: 12,
        padding: "1rem",
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 50 50"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.415, 31.415"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <span>Loading…</span>
    </div>
  );
}

/**
 * App: routing shell.
 *
 * Notes addressing review findings:
 * - Router context should be provided by the application entrypoint (e.g., src/main.jsx).
 *   Therefore App does not wrap itself with BrowserRouter here to avoid duplicate router contexts.
 * - ErrorBoundary implementation moved to src/components/ErrorBoundary.jsx to avoid duplication.
 * - Styling in this file avoids hardcoded colors; UI uses CSS custom properties from Stitch tokens:
 *   --stitch-color-primary and --stitch-border-muted and --stitch-surface-muted.
 *
 * Exported as default.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}