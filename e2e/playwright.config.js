const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Directory with tests
  testDir: './e2e/tests',

  // Global timeout for each test (ms)
  timeout: 60_000, // 60 seconds per test

  // Output directory for screenshots, videos, traces and other artifacts
  outputDir: 'e2e/test-results',

  // Shared settings for all the projects below.
  use: {
    // Base URL for `page.goto()` and relative navigation in tests
    baseURL: 'http://localhost:5173',

    // Capture screenshots only on failure to reduce noise; files land under outputDir
    screenshot: 'only-on-failure',

    // Collect video only on failure
    video: 'retain-on-failure',

    // Collect trace on first retry to help debugging flaky tests
    trace: 'retain-on-failure',

    // Headless by default; can be overridden with PLAYWRIGHT_HEADLESS env var or CLI
    headless: true,
  },

  // Explicitly expose the per-test expect timeout as well
  expect: {
    timeout: 5000,
  },

  // Run tests across desktop / tablet / mobile viewport presets
  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        // Ensure baseURL is available in the context
        baseURL: 'http://localhost:5173',
      },
    },
    {
      name: 'tablet-ipad',
      use: {
        ...devices['iPad (gen 7)'],
        // iPad preset uses WebKit engine in Playwright device presets
        baseURL: 'http://localhost:5173',
      },
    },
    {
      name: 'mobile-pixel5',
      use: {
        ...devices['Pixel 5'],
        baseURL: 'http://localhost:5173',
      },
    },
  ],

  // Configure the dev server / preview server to be available before running tests
  webServer: {
    // Prefer running the dev server. If the repository also provides a preview/start script,
    // the project-level npm scripts can be updated to use that flow (e.g., npm run start:preview).
    command: 'npm run dev',
    url: 'http://localhost:5173',
    // Wait up to 120 seconds for the server to be available
    timeout: 120_000,
    // If a server is already running on the target URL/port, reuse it instead of spawning a new one.
    reuseExistingServer: true,
  },

  // Configure number of workers (optional; keeps CI deterministic if needed)
  // workers: process.env.CI ? 2 : undefined,

  // Reporters: default to list and html report in results directory
  reporter: [['list'], ['html', { outputFolder: 'e2e/test-results/html-report', open: 'never' }]],
});