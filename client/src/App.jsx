import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import Cstl4Page from "./pages/Cstl4Page.jsx";

/**
 * Small accessible skip-link for keyboard users.
 * Kept minimal and inline so no external CSS dependency is required.
 */
const SkipLink = () => (
  <a
    href="#main-content"
    style={{
      position: "absolute",
      left: "-999px",
      top: "auto",
      width: "1px",
      height: "1px",
      overflow: "hidden",
    }}
    onFocus={(e) => {
      e.currentTarget.style.left = "1rem";
      e.currentTarget.style.top = "1rem";
      e.currentTarget.style.width = "auto";
      e.currentTarget.style.height = "auto";
      e.currentTarget.style.background = "#000";
      e.currentTarget.style.color = "#fff";
      e.currentTarget.style.padding = "0.5rem 1rem";
      e.currentTarget.style.zIndex = 1000;
    }}
    onBlur={(e) => {
      e.currentTarget.style.left = "-999px";
      e.currentTarget.style.top = "auto";
    }}
  >
    Skip to content
  </a>
);

/**
 * Simple Error Boundary to catch rendering errors and provide a safe UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, send this to an error-tracking service.
    // Keep minimal and safe here.
    this.setState({ info });
    // eslint-disable-next-line no-console
    console.error("Unhandled error in React tree:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          id="main-content"
          aria-live="polite"
          style={{
            padding: "2rem",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
          }}
        >
          <h2>Something went wrong</h2>
          <p>
            An unexpected error occurred. Please try refreshing the page or
            contact support if the problem persists.
          </p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary>Technical details</summary>
            <div>
              {this.state.error && this.state.error.toString()}
              {this.state.info && "\n" + JSON.stringify(this.state.info)}
            </div>
          </details>
          <p>
            <Link to="/">Return to home</Link>
          </p>
        </main>
      );
    }

    return this.props.children;
  }
}

/**
 * Minimal Home placeholder component.
 */
function Home() {
  return (
    <main
      id="main-content"
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <h1>Welcome</h1>
      <p>
        This is the home page. Use the navigation to open the CSTL-4 page.
      </p>
      <p>
        Direct-link to the CSTL-4 page: <Link to="/cstl-4">Open CSTL-4</Link>
      </p>
    </main>
  );
}

/**
 * NotFound route shown for unmatched paths within the SPA.
 * Server should still be configured to return index.html for unknown routes
 * in production so direct navigation works (done server-side).
 */
function NotFound() {
  const location = useLocation();
  return (
    <main
      id="main-content"
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <h1>Page not found</h1>
      <p>
        No route matches <code>{location.pathname}</code>.
      </p>
      <p>
        <Link to="/">Go back home</Link> or visit{" "}
        <Link to="/cstl-4">CSTL-4</Link>.
      </p>
    </main>
  );
}

/**
 * App header with accessible navigation.
 * Uses NavLink which provides aria-current for active links.
 */
function Header() {
  const navStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  };

  const brandStyle = {
    fontWeight: 700,
    textDecoration: "none",
    color: "inherit",
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#0b63e5" : "inherit",
    textDecoration: "none",
    padding: "0.25rem 0.5rem",
    borderRadius: 4,
  });

  return (
    <header
      role="banner"
      style={{
        borderBottom: "1px solid #e6e6e6",
        padding: "0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/" style={brandStyle} aria-label="Constellation home">
          Constellation
        </Link>
        <nav aria-label="Main navigation" style={navStyle}>
          <NavLink to="/" end style={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/cstl-4" style={navLinkStyle}>
            CSTL-4
          </NavLink>
        </nav>
      </div>
      <div>
        <a
          href="https://www.figma.com/file/gxd2LNayM2hh3V3qTlcyPF/Website-Wireframes-UI-Kit--Community-"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.9rem" }}
        >
          Design (Figma)
        </a>
      </div>
    </header>
  );
}

/**
 * Main App component exporting the Router and routes.
 */
export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <ErrorBoundary>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cstl-4" element={<Cstl4Page />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer
            style={{
              marginTop: "auto",
              borderTop: "1px solid #eee",
              padding: "1rem",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            <small>© {new Date().getFullYear()} Constellation</small>
          </footer>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}