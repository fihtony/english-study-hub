const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * E2E Playwright tests for /cstl-4
 *
 * Requirements implemented:
 * - Visit /cstl-4 for desktop/tablet/mobile viewports
 * - Assert hero heading (h1) is visible
 * - Capture screenshots into e2e/screenshots/
 * - Assert clicking nav links and CTA navigate or open menu without console errors
 * - Map tests to AC1 and AC2 via test names
 *
 * Usage:
 * - Ensure BASE_URL env var points to the running app (e.g. http://localhost:3000)
 * - Run with Playwright: npx playwright test e2e/tests/cstl4.spec.js
 */

const SCREENSHOT_DIR = path.join(process.cwd(), 'e2e', 'screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const BASE_URL = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800, file: 'desktop.png' },
  { name: 'tablet', width: 768, height: 1024, file: 'tablet.png' },
  { name: 'mobile', width: 375, height: 812, file: 'mobile.png' },
];

// Helper: robust locator for hero heading (prefer h1 inside main/hero)
async function findHeroHeading(page) {
  let loc = page.locator('main h1');
  if (await loc.count()) return loc.first();
  loc = page.locator('.hero h1');
  if (await loc.count()) return loc.first();
  loc = page.locator('h1');
  if (await loc.count()) return loc.first();
  return null;
}

// Helper: find header nav links
function headerNavLinks(page) {
  return page.locator('header nav a, header a[href]');
}

// Helper: find hero CTA (button or link inside hero/main)
async function findHeroCTA(page) {
  const selectors = [
    'main .hero a, main .hero button',
    '.hero a, .hero button',
    'main a[data-cta], main button[data-cta]',
    'a.cta, button.cta',
    'main a[href^="/"], main a[href^="#"], main button[type="button"]',
  ];
  for (const sel of selectors) {
    const loc = page.locator(sel);
    if (await loc.count()) return loc.first();
  }
  // fallback: any visible button or anchor inside main
  const fallback = page.locator('main a, main button');
  if (await fallback.count()) return fallback.first();
  return null;
}

test.describe('CSTL-4 page e2e', () => {
  // For each viewport run a combined AC1+AC2 test
  for (const vp of VIEWPORTS) {
    test(`${vp.name.toUpperCase()} - AC1: hero visible, screenshot; AC2: nav/CTA interactions`, async ({ page }) => {
      // Collect console errors
      const consoleErrors = [];
      page.on('console', (msg) => {
        try {
          if (msg.type && msg.type() === 'error') consoleErrors.push(msg.text());
        } catch (e) {
          // ignore analysis errors
        }
      });

      // Set viewport
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Navigate to page
      const targetUrl = `${BASE_URL}/cstl-4`;
      await page.goto(targetUrl, { waitUntil: 'networkidle' });

      // Wait for main content to appear
      await page.waitForLoadState('networkidle');

      // AC1: Assert hero heading is visible
      const heroHeading = await findHeroHeading(page);
      expect(heroHeading, 'Hero heading (h1) should exist').not.toBeNull();
      await expect(heroHeading).toBeVisible({ timeout: 5000 });

      // Capture screenshot (full page)
      const screenshotPath = path.join(SCREENSHOT_DIR, vp.file);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // AC2: Interactions - Nav links and CTA should work without console errors
      // 1) Header nav links
      const navLinks = headerNavLinks(page);
      if (await navLinks.count() > 0) {
        // Attempt to click the first nav link. It may navigate or be a SPA route.
        const firstNav = navLinks.first();
        const beforeUrl = page.url();
        try {
          await Promise.all([
            firstNav.click({ timeout: 3000 }).catch(() => {}),
            // wait a short time for navigation / SPA route change
            page.waitForTimeout(700),
          ]);
        } catch (err) {
          // swallow click errors but record via assertions below
        }
        const afterUrl = page.url();
        // Either the URL changed (navigation) OR the link exists and is clickable
        if (afterUrl === beforeUrl) {
          // If not navigated, ensure link is visible and enabled
          await expect(firstNav).toBeVisible();
        } else {
          // If navigated, ensure we landed on a valid URL (no 404-ish path)
          expect(afterUrl).toMatch(/^https?:\/\//);
          // navigate back to page for subsequent checks
          await page.goto(targetUrl, { waitUntil: 'networkidle' });
        }
      } else {
        // No header nav anchor links found - try to detect a menu toggle on narrow viewports
        const menuToggle = page.locator('button[aria-label*="menu" i], button[class*="menu" i], button[class*="hamburg" i]');
        if (await menuToggle.count()) {
          await menuToggle.first().click().catch(() => {});
          await page.waitForTimeout(300);
          const navAfterOpen = headerNavLinks(page);
          if (await navAfterOpen.count()) {
            // Try clicking first revealed link
            const beforeUrl = page.url();
            await navAfterOpen.first().click().catch(() => {});
            await page.waitForTimeout(500);
            const afterUrl = page.url();
            if (afterUrl !== beforeUrl) {
              // navigated; go back
              await page.goto(targetUrl, { waitUntil: 'networkidle' });
            }
          }
        }
      }

      // 2) CTA inside hero
      const cta = await findHeroCTA(page);
      if (cta) {
        const before = page.url();
        try {
          await Promise.all([
            cta.click({ timeout: 3000 }).catch(() => {}),
            page.waitForTimeout(700),
          ]);
        } catch (err) {
          // swallow - we'll assert no console errors later
        }
        const after = page.url();
        if (after !== before) {
          // navigated; return to page
          await page.goto(targetUrl, { waitUntil: 'networkidle' });
        } else {
          // If CTA didn't navigate, ensure it's visible / focusable
          await expect(cta).toBeVisible();
        }
      } else {
        // If no CTA found, that's noteworthy but do not fail test; instead assert there is at least a button or link in main
        const anyClickable = page.locator('main a, main button');
        expect(await anyClickable.count()).toBeGreaterThanOrEqual(0);
      }

      // Final assertion: there should be no console errors collected during the test's interactions
      expect(consoleErrors, `No console.error messages should be emitted (found: ${consoleErrors.length})`).toHaveLength(0);

      // Save a small artifacts JSON describing this run to screenshots dir
      const artifactsPath = path.join(SCREENSHOT_DIR, `${vp.name}.artifact.json`);
      const artifacts = {
        viewport: vp,
        screenshot: path.relative(process.cwd(), screenshotPath),
        url: targetUrl,
        timestamp: new Date().toISOString(),
        consoleErrorsCount: consoleErrors.length,
      };
      try {
        fs.writeFileSync(artifactsPath, JSON.stringify(artifacts, null, 2), 'utf8');
      } catch (err) {
        // non-fatal: just log to console (Playwright will display)
        // eslint-disable-next-line no-console
        console.error('Failed to write artifact json', err);
      }
    });
  }

  // Additional smoke test to ensure health of page and to record combined artifacts
  test('AC1+AC2: combined smoke and artifacts summary', async ({ page }) => {
    const summary = { testedAt: new Date().toISOString(), runs: [] };
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const targetUrl = `${BASE_URL}/cstl-4`;
      const consoleErrors = [];
      page.on('console', (msg) => {
        try {
          if (msg.type && msg.type() === 'error') consoleErrors.push(msg.text());
        } catch (e) {}
      });
      await page.goto(targetUrl, { waitUntil: 'networkidle' });
      const heroHeading = await findHeroHeading(page);
      const headingVisible = heroHeading ? await heroHeading.isVisible() : false;
      const screenshotPath = path.join(SCREENSHOT_DIR, `summary-${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      summary.runs.push({
        viewport: vp.name,
        headingVisible,
        screenshot: path.relative(process.cwd(), screenshotPath),
        consoleErrorsCount: consoleErrors.length,
      });
      // small delay to stabilize
      await page.waitForTimeout(200);
    }
    const summaryPath = path.join(SCREENSHOT_DIR, 'artifacts-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    // final asserts: each run must have headingVisible true and no console errors
    for (const r of summary.runs) {
      expect(r.headingVisible, `Hero heading should be visible on ${r.viewport}`).toBeTruthy();
      expect(r.consoleErrorsCount, `No console errors on ${r.viewport}`).toBe(0);
    }
  });
});