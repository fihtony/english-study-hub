import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const DEFAULT_PORT = 5173;

/**
 * Resolve the port to use for the dev/preview server.
 * Preference order:
 *  - PORT env
 *  - VITE_PORT, DEV_SERVER_PORT
 *  - npm_package_config_port (when npm provides it)
 *  - DEFAULT_PORT
 */
function resolvePort() {
  const candidates = [
    process.env.PORT,
    process.env.VITE_PORT,
    process.env.DEV_SERVER_PORT,
    process.env.npm_package_config_port,
  ];

  for (const c of candidates) {
    if (!c) continue;
    const n = Number.parseInt(String(c), 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return DEFAULT_PORT;
}

const PORT = resolvePort();

/**
 * Detect whether tests should run against a built preview server.
 * Allow explicit overrides via env vars used by CI or local debugging.
 */
const isPreview =
  process.env.PW_PREVIEW === '1' ||
  process.env.PLAYWRIGHT_PREVIEW === '1' ||
  process.env.PREVIEW === '1' ||
  process.env.USE_PREVIEW === '1' ||
  // allow an explicit script selector in CI
  process.env.PW_USE_PREVIEW === 'true';

/**
 * Attempt to read package.json to choose a sensible start command.
 * Fallback order for dev:
 *  - npm run start
 *  - npm run dev
 * For preview:
 *  - npm run preview
 * If a chosen script isn't present, still return the conventional npm command;
 * webServer will surface an error if the script is missing.
 */
function pickStartCommand({ preferPreview = false } = {}) {
  let pkg;
  try {
    const pkgPath = path.join(process.cwd(), 'package.json');
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch {
    pkg = {};
  }
  const scripts = (pkg && pkg.scripts) || {};

  if (preferPreview) {
    if (scripts.preview) return 'npm run preview';
    // some projects expose `serve` or `preview:prod` — don't overreach; prefer preview script
    // fallback to `npm run build && npx serve -s dist` is environment dependent and not cross-platform here
    return 'npm run preview';
  }

  if (scripts.start) return 'npm run start';
  if (scripts.dev) return 'npm run dev';
  // last-resort: try `npm run start`
  return 'npm run start';
}

const startCommand = pickStartCommand({ preferPreview: isPreview });

/**
 * webServer config used by Playwright to start the app under test.
 * - Inject PORT into env for cross-platform consistency.
 * - reuseExistingServer is enabled locally to speed iteration, disabled in CI.
 */
const webServer = {
  command: startCommand,
  url: `http://localhost:${PORT}`,
  port: PORT,
  timeout: 120_000,
  reuseExistingServer: !process.env.CI,
  env: {
    PORT: String(PORT),
    NODE_ENV: isPreview ? 'production' : process.env.NODE_ENV || 'development',
  },
};

// Export Playwright configuration
export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000, // per-test timeout
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    // baseURL for page.goto and relative paths in tests
    baseURL: `http://localhost:${PORT}`,
    actionTimeout: 0,
    trace: 'on-first-retry', // capture trace on first retry to aid debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.CI ? true : true, // default to headless; callers may override via env
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Explicit viewport for chromium tests per requirement
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // keep default viewport for Firefox
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],

  // Ensure Playwright waits for the configured webServer before running tests
  webServer,
});