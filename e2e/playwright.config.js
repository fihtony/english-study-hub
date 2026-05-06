const fs = require('fs');
const path = require('path');
const { defineConfig, devices } = require('@playwright/test');

// Ensure evidence output directory exists (docs/evidence at repo root)
const evidenceDir = path.resolve(__dirname, '..', 'docs', 'evidence');
try {
  fs.mkdirSync(evidenceDir, { recursive: true });
} catch (err) {
  // Log to stderr so CI logs capture it; do not throw here to avoid masking Playwright errors later.
  // eslint-disable-next-line no-console
  console.error('Failed to create docs/evidence directory for Playwright artifacts:', err);
}

/**
 * Playwright configuration for e2e tests and screenshot artifact locations.
 *
 * Key settings:
 * - testDir: 'e2e/tests'
 * - baseURL: 'http://localhost:5173'
 * - headless: true
 * - viewport: null (projects set explicit viewports)
 * - projects: chromium-1024x768 and chromium-375x812
 * - outputDir: docs/evidence (absolute)
 *
 * Screenshot guidance for tests:
 * - To produce the canonical artifacts required by the workflow tests should call:
 *     await page.screenshot({ path: testInfo.outputPath('screenshot-1024x768.png') });
 *   and
 *     await page.screenshot({ path: testInfo.outputPath('screenshot-375x812.png') });
 * - Using testInfo.outputPath(...) places files under the configured outputDir so CI and reviewers
 *   can find them in docs/evidence/; tests may need to copy or rename files if a flat filename is strictly required.
 *
 * Notes on concurrency:
 * - Tests are deterministic about artifact names; to avoid races, workers is set conservatively.
 */
module.exports = defineConfig({
  testDir: 'e2e/tests',
  // Reasonable per-test timeout for end-to-end interactions
  timeout: 30 * 1000, // 30 seconds per test

  // Global expect timeout for assertions like toHaveText, toBeVisible, etc.
  expect: {
    timeout: 5 * 1000, // 5 seconds
  },

  // Limit parallelism to reduce artifact races (override in CI if desired)
  workers: process.env.CI ? undefined : 1,

  // Global artifacts directory for screenshots, traces, videos, etc.
  // Use an absolute path to avoid cwd-related surprises.
  outputDir: evidenceDir,

  // Fail fast for accidentally committed test.only in CI
  forbidOnly: !!process.env.CI,

  // Default settings for all projects
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    // Let projects set viewport explicitly; default null avoids Vite/Playwright clashes
    viewport: null,
    actionTimeout: 0,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    // Tests should manage explicit screenshots via testInfo.outputPath(...)
    screenshot: 'off',
    ignoreHTTPSErrors: false,
  },

  // Run a dev server for tests when not already running.
  // This assumes the app's dev server is started via `npm run dev` and listens on 5173.
  webServer: {
    command: 'npm run dev',
    port: 5173,
    timeout: 120 * 1000, // wait up to 2 minutes for the server to start
    // reuse server locally to speed up iteration; in CI prefer a fresh server unless PW_REUSE_SERVER set
    reuseExistingServer: !!process.env.PW_REUSE_SERVER || !process.env.CI,
  },

  // Define projects so e2e tests run with the two target viewports on Chromium.
  projects: [
    {
      name: 'chromium-1024x768',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'chromium-375x812',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 812 },
      },
    },
  ],

  // Retries: allow 1 retry on CI to reduce flakiness; no retries locally by default
  retries: process.env.CI ? 1 : 0,

  // Reporters: console summary + GitHub Actions friendly reporter + HTML report under docs/evidence/html-report
  reporter: [
    ['list'],
    // Include GitHub reporter only when running in GH Actions environment to avoid noisy local logs
    ...(process.env.GITHUB_ACTIONS ? [['github']] : []),
    ['html', { open: 'never', outputFolder: path.join(evidenceDir, 'html-report') }],
  ],
});