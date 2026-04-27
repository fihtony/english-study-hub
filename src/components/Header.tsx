import React from 'react';

interface HeaderProps {
  /**
   * Optional override for the application name.
   * If not provided, the component will attempt to read in this order:
   * 1. window.__APP_NAME__ (if set by hosting environment)
   * 2. process.env.REACT_APP_NAME (compile-time env variable commonly used in React apps)
   * 3. fallback literal "English Study Hub"
   */
  appName?: string;
}

/**
 * Simple accessible Header component rendering the application name.
 * - Uses role="banner" for assistive technologies.
 * - Keeps styling minimal and inline to avoid external stylesheet dependencies.
 * - Safe rendering: React escapes all text to prevent XSS.
 */
const DEFAULT_APP_NAME = 'English Study Hub';

function resolveAppName(override?: string): string {
  if (override && override.trim().length > 0) {
    return override.trim();
  }

  try {
    // Check a window-provided global (non-breaking if window is undefined)
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.__APP_NAME__ && typeof win.__APP_NAME__ === 'string' && win.__APP_NAME__.trim().length > 0) {
        return win.__APP_NAME__.trim();
      }
    }
  } catch {
    // swallow any errors reading window
  }

  try {
    // Check environment variable commonly used in React apps (compile-time)
    // Protect access in environments where process may be undefined.
    // Casting to any to avoid TS inference issues in different setups.
    // This does not execute code or eval user-provided content.
    if (typeof process !== 'undefined') {
      const envName = (process as any).env && (process as any).env.REACT_APP_NAME;
      if (typeof envName === 'string' && envName.trim().length > 0) {
        return envName.trim();
      }
    }
  } catch {
    // swallow any errors reading process.env
  }

  return DEFAULT_APP_NAME;
}

export const Header: React.FC<HeaderProps> = ({ appName }) => {
  const name = resolveAppName(appName);

  return (
    <header
      role="banner"
      aria-label={`${name} banner`}
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(16,24,40,0.06)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Minimal accessible logo: decorative square with aria-hidden */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <rect width="24" height="24" rx="4" fill="#2563EB" />
            <path d="M6 8h12v2H6zM6 12h8v2H6z" fill="#fff" />
          </svg>

          <h1
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.2,
              margin: 0,
              color: '#0f172a',
              fontWeight: 600,
            }}
          >
            {name}
          </h1>
        </div>

        {/* Optional right-side slot for future actions (kept empty to avoid layout shifts) */}
        <div aria-hidden style={{ width: 48 }} />
      </div>
    </header>
  );
};

export default Header;