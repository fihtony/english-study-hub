const { test, expect } = require('@playwright/test');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = 5173; // Vite default dev port; overridden by PORT env when provided
const baseUrl = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || `http://localhost:${process.env.PORT || DEFAULT_PORT}`;

/**
 * Poll a URL until it responds (status < 500) or timeout.
 * Resolves when server is reachable, rejects on timeout.
 */
function waitForServer(url, { timeoutMs = 30000, intervalMs = 500 } = {}) {
  const parsed = new URL(url);
  const isHttps = parsed.protocol === 'https:';
  const lib = isHttps ? https : http;
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = lib.request(
        {
          method: 'GET',
          hostname: parsed.hostname,
          port: parsed.port,
          path: parsed.pathname || '/',
          timeout: 2000,
        },
        (res) => {
          // Accept any 2xx-4xx as "up" (404 still means server running)
          if (res.statusCode && res.statusCode < 500) {
            res.resume();
            resolve();
          } else {
            res.resume();
            if (Date.now() - start > timeoutMs) {
              reject(new Error(`Server at ${url} returned status ${res.statusCode} and did not recover within ${timeoutMs}ms`));
            } else {
              setTimeout(attempt, intervalMs);
            }
          }
        }
      );

      req.on('error', (err) => {
        // connection refused or not up yet
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Unable to reach ${url}: ${err.message}`));
        } else {
          setTimeout(attempt, intervalMs);
        }
      });

      req.on('timeout', () => {
        req.destroy();
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Connection to ${url} timed out after ${timeoutMs}ms`));
        } else {
          setTimeout(attempt, intervalMs);
        }
      });

      req.end();
    };

    attempt();
  });
}

test.describe('Landing page visual checks', () => {
  test.beforeAll(async () => {
    // Verify dev server is running before e2e tests run.
    // Tests assume the dev server is started manually or by CI (documented in README).
    // Poll the expected base URL so tests are idempotent in CI runs.
    try {
      await waitForServer(baseUrl, { timeoutMs: 30000, intervalMs: 500 });
      // eslint-disable-next-line no-console
      console.log(`Dev server reachable at ${baseUrl}`);
    } catch (err) {
      // Provide actionable error message
      throw new Error(
        `Dev server not reachable at ${baseUrl}. Start the dev server (e.g. npm run dev) or set PLAYWRIGHT_BASE_URL/BASE_URL/PORT. Underlying error: ${err.message}`
      );
    }
  });

  test('loads landing page and captures desktop & mobile screenshots', async ({ page }) => {
    // Record Playwright output path for traceability (if Playwright runner provides it)
    let testOutputRoot = null;
    try {
      testOutputRoot = typeof test.info === 'function' && typeof test.info().outputPath === 'function' ? test.info().outputPath() : null;
    } catch (e) {
      testOutputRoot = null;
    }
    if (testOutputRoot) {
      // eslint-disable-next-line no-console
      console.log('Playwright test output root:', testOutputRoot);
    }

    // Navigate to the app root. Use '/' so Playwright's baseURL will be applied if configured.
    await page.goto('/', { waitUntil: 'networkidle' });
    // Ensure the page is fully idle before interacting / screenshotting
    await page.waitForLoadState('networkidle');

    // Desktop: 1024x768
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForLoadState('networkidle');

    // Ensure evidence dir exists
    const evidenceDir = path.resolve(process.cwd(), 'docs', 'evidence');
    fs.mkdirSync(evidenceDir, { recursive: true });

    const desktopPath = path.join(evidenceDir, 'screenshot-1024x768.png');
    await page.screenshot({ path: desktopPath, fullPage: true });

    // Mobile: 375x812 (iPhone-like)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForLoadState('networkidle');

    const mobilePath = path.join(evidenceDir, 'screenshot-375x812.png');
    await page.screenshot({ path: mobilePath, fullPage: true });

    // Accessibility / content checks:
    // - Ensure there's a top-level heading (level 1) and it's visible.
    // - Ensure there's at least one prominent button (CTA) visible and enabled.
    // Use role queries for robustness.
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();

    const primaryButton = page.getByRole('button').first();
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toBeEnabled();

    // Optionally log where screenshots were written
    // eslint-disable-next-line no-console
    console.log('Screenshots saved to:', desktopPath, mobilePath);
  });
});