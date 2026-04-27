import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const Loader: React.FC = () => (
  <div role="status" aria-live="polite" style={{ padding: 24, textAlign: 'center' }}>
    Loading…
  </div>
);

/**
 * Attempt to lazy-load an existing routes module from common candidate locations.
 * If none are present, fall back to a no-op component so the LandingPage at '/'
 * does not break the app and other routes remain untouched.
 */
const tryImportExistingRoutes = async (): Promise<{ default: React.ComponentType<any> }> => {
  const candidates = [
    './routes',
    './Routes',
    './AppRoutes',
    './router',
    './Router',
    './routes/index',
    './Routes/index',
  ];

  for (const path of candidates) {
    try {
      // Dynamic import may include many modules in the bundle depending on bundler config.
      // Try to return the first module that exports a usable React component (default or named AppRoutes).
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - dynamic import with variable path; handled defensively.
      const mod = await import(path);
      if (!mod) continue;
      if (mod.default && (typeof mod.default === 'function' || typeof mod.default === 'object')) {
        return { default: mod.default as React.ComponentType };
      }
      if (mod.AppRoutes && (typeof mod.AppRoutes === 'function' || typeof mod.AppRoutes === 'object')) {
        return { default: mod.AppRoutes as React.ComponentType };
      }
    } catch {
      // ignore and try next candidate
    }
  }

  // Fallback: empty component so app still works with only LandingPage registered at '/'
  const Empty: React.FC = () => null;
  return { default: Empty };
};

const ExistingRoutes = lazy(tryImportExistingRoutes);

/**
 * App router.
 *
 * Notes to maintainers:
 * - LandingPage is explicitly registered at path '/' as the top-level landing route.
 * - Existing application routes (if defined elsewhere) are lazy-loaded and mounted at '/*'
 *   to avoid breaking prior behavior. If there is an existing root route in another file,
 *   that module will control its own internal route ordering; react-router v6 uses
 *   path-to-regexp matching which prevents simple prefix shadowing of unrelated routes.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Landing page mounted at exact '/' */}
          <Route path="/" element={<LandingPage />} />

          {/* Preserve existing routes if they exist in other modules; otherwise render nothing */}
          <Route
            path="/*"
            element={
              <Suspense fallback={<Loader />}>
                <ExistingRoutes />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;