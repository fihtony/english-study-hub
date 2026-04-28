import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import CSTL4Page from "./pages/CSTL4Page";
import "./styles/global.css";

/**
 * ErrorBoundary - simple, production-ready React error boundary.
 * Catches render errors in the tree and provides a safe fallback UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Store error details for debugging/monitoring.
    // Avoid exposing error details to users (no XSS).
    this.setState({ errorInfo });
    // Example: send to external monitoring endpoint (fire-and-forget)
    try {
      const payload = JSON.stringify({
        message: error?.message || "Unknown error",
        stack: error?.stack,
        info: errorInfo?.componentStack || null,
        time: new Date().toISOString(),
        source: "client.App.ErrorBoundary",
      });
      // navigator.sendBeacon is safe for fire-and-forget analytics
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        // Replace '/api/monitor' with real endpoint when available.
        navigator.sendBeacon("/api/monitor", payload);
      }
    } catch (e) {
      // swallow telemetry errors to avoid infinite loops
      // eslint-disable-next-line no-console
      console.warn("Telemetry failed", e);
    }
    // Always log to console in development for debugging.
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV !== "production") {
      console.error(error, errorInfo);
    }
  }

  handleReload = () => {
    // Soft reload to attempt recovery.
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Generic, non-revealing UI
      return (
        <main
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            boxSizing: "border-box",
            background: "var(--bg, #fff)",
            color: "var(--text, #111)",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
          }}
        >
          <div style={{ maxWidth: 680, textAlign: "center" }}>
            <h1 style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}>Something went wrong</h1>
            <p style={{ marginBottom: "1rem", color: "var(--muted, #555)" }}>
              An unexpected error occurred while loading this page. Try reloading the page.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: 6,
                  border: "1px solid var(--accent, #0b5fff)",
                  background: "var(--accent, #0b5fff)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Reload
              </button>
              <Link
                to="/"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: 6,
                  border: "1px solid var(--muted, #cfcfcf)",
                  background: "transparent",
                  color: "var(--text, #111)",
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                Home
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

/**
 * AppLayout - top-level layout used across routes.
 * Keeps header/footer and main content consistent for the SPA.
 */
function AppLayout({ children }) {
  return (
    <div className="app-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          borderBottom: "1px solid var(--border, #e6e6e6)",
          padding: "0.75rem 1rem",
          background: "var(--header-bg, #fff)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/cstl-4" aria-label="Constellation home" style={{ textDecoration: "none", color: "inherit" }}>
            <strong style={{ fontSize: "1rem" }}>Constellation</strong>
          </Link>
          <nav aria-label="Main navigation" style={{ marginLeft: "auto" }}>
            <Link
              to="/cstl-4"
              style={{ marginLeft: 12, textDecoration: "none", color: "var(--muted, #444)", fontSize: "0.95rem" }}
            >
              CSTL-4
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: "1 1 auto", width: "100%" }}>{children}</main>

      <footer
        style={{
          borderTop: "1px solid var(--border, #e6e6e6)",
          padding: "0.75rem 1rem",
          background: "var(--footer-bg, #fff)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", color: "var(--muted, #666)", fontSize: "0.9rem" }}>
          © {new Date().getFullYear()} Constellation — All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/**
 * App - top-level router and route definitions.
 * Routes:
 *   /cstl-4 -> CSTL4Page
 *   /       -> Redirect to /cstl-4 (replace)
 */
export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppLayout>
          <Routes>
            <Route path="/cstl-4" element={<CSTL4Page />} />
            <Route path="/" element={<Navigate to="/cstl-4" replace />} />
            <Route path="*" element={<Navigate to="/cstl-4" replace />} />
          </Routes>
        </AppLayout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}