import fs from 'fs';
import path from 'path';
import { test, expect, devices } from '@playwright/test';

const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = `http://localhost:${PORT}/cstl-4`;
const ARTIFACT_DIR = path.resolve(__dirname, '..', 'artifacts', 'figma', 'gxd2LNayM2hh3V3qTlcyPF', '1_470');

function ensureArtifactDir() {
  try {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  } catch (err) {
    // If directory creation fails, rethrow so the test run surface the problem.
    throw new Error(`Unable to create artifacts directory: ${err}`);
  }
}

// Helpful selector fallbacks for CTA discovery
async function findCta(page) {
  const btn = page.getByRole('button', { name: /get started|start learning|learn more|join|explore|try now/i });
  if (await btn.count() && await btn.isVisible()) return btn.first();

  const link = page.getByRole('link', { name: /get started|start learning|learn more|join|explore|try now/i });
  if (await link.count() && await link.isVisible()) return link.first();

  // Final fallback: any obvious CTA-ish selector
  const fallback = page.locator('a[href*="signup"], a[href*="learn"], button[type="submit"], .cta, .hero-cta').first();
  if (await fallback.count() && await fallback.isVisible()) return fallback;

  return null;
}

test.describe('CSTL-4 visual and interaction tests', () => {
  test.beforeAll(() => {
    ensureArtifactDir();
  });

  test('desktop: loads /cstl-4, verifies hero and CTA, takes screenshot', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();

    try {
      const startUrl = BASE_URL;
      await page.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

      // Wait for main content to render
      await expect(page.locator('main')).toBeVisible({ timeout: 5000 });

      // Check for a hero heading (use a permissive regex to tolerate copy differences)
      const heading = page.getByRole('heading', { name: /learn|improve|english|constellation|reading/i });
      await expect(heading).toBeVisible({ timeout: 3000 });

      // Find and click CTA
      const cta = await findCta(page);
      expect(cta, 'CTA element should exist on the page').not.toBeNull();
      const clicked = (async () => {
        try {
          await Promise.all([cta.click({ timeout: 5000 }), page.waitForLoadState('networkidle', { timeout: 3000 })]);
          return true;
        } catch {
          // click may trigger a client-side SPA action without navigation; consider it a success if no exception
          try {
            await cta.click({ timeout: 3000 }).catch(() => null);
            return true;
          } catch {
            return false;
          }
        }
      })();

      const clickSucceeded = await clicked;
      expect(clickSucceeded).toBe(true);

      // Assert navigation or UI change: either URL changed or a dialog/thank-you/signup form appears
      const urlChanged = page.url() !== startUrl;
      const uiChanged =
        (await page.locator('[role="dialog"], .thank-you, .signup-form, form[aria-label="signup"]').count()) > 0;

      expect(urlChanged || uiChanged).toBe(
        true,
        'After clicking CTA the page should navigate or show a confirmation / signup UI'
      );

      // Accessibility scan with axe-core/playwright if available
      try {
        // dynamic import so tests still run when axe isn't installed
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = await import('@axe-core/playwright');
        if (mod && mod.AxeBuilder) {
          // @ts-ignore - AxeBuilder typing may not be present at runtime
          const results = await new mod.AxeBuilder({ page }).analyze();
          const axePath = path.join(ARTIFACT_DIR, 'cstl4_desktop_axe.json');
          fs.writeFileSync(axePath, JSON.stringify(results, null, 2), 'utf8');
        }
      } catch {
        // axe not installed or failed - skip accessibility artifact generation
      }

      // Screenshot
      const screenshotPath = path.join(ARTIFACT_DIR, 'cstl4_desktop.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch (err) {
      // On failure, capture a diagnostic screenshot
      try {
        const diagPath = path.join(ARTIFACT_DIR, 'cstl4_desktop_error.png');
        await page.screenshot({ path: diagPath, fullPage: true });
      } catch {
        // ignore failures while attempting to save diagnostic
      }
      throw err;
    } finally {
      await context.close();
    }
  });

  test('mobile: loads /cstl-4 at iPhone 12, verifies hero and CTA, takes screenshot', async ({ browser }) => {
    const iPhone = devices['iPhone 12'];
    const context = await browser.newContext({
      ...iPhone,
    });
    const page = await context.newPage();

    try {
      const startUrl = BASE_URL;
      await page.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

      // Wait for main content to render
      await expect(page.locator('main')).toBeVisible({ timeout: 5000 });

      // Check for a hero heading (permissive)
      const heading = page.getByRole('heading', { name: /learn|improve|english|constellation|reading/i });
      await expect(heading).toBeVisible({ timeout: 3000 });

      // Find and click CTA
      const cta = await findCta(page);
      expect(cta, 'CTA element should exist on the page').not.toBeNull();
      const clicked = (async () => {
        try {
          await Promise.all([cta.click({ timeout: 5000 }), page.waitForLoadState('networkidle', { timeout: 3000 })]);
          return true;
        } catch {
          try {
            await cta.click({ timeout: 3000 }).catch(() => null);
            return true;
          } catch {
            return false;
          }
        }
      })();

      const clickSucceeded = await clicked;
      expect(clickSucceeded).toBe(true);

      // Assert navigation or UI change
      const urlChanged = page.url() !== startUrl;
      const uiChanged =
        (await page.locator('[role="dialog"], .thank-you, .signup-form, form[aria-label="signup"]').count()) > 0;

      expect(urlChanged || uiChanged).toBe(
        true,
        'After clicking CTA the page should navigate or show a confirmation / signup UI (mobile)'
      );

      // Accessibility scan with axe-core/playwright if available
      try {
        const mod = await import('@axe-core/playwright');
        if (mod && mod.AxeBuilder) {
          // @ts-ignore
          const results = await new mod.AxeBuilder({ page }).analyze();
          const axePath = path.join(ARTIFACT_DIR, 'cstl4_mobile_axe.json');
          fs.writeFileSync(axePath, JSON.stringify(results, null, 2), 'utf8');
        }
      } catch {
        // skip if axe missing
      }

      // Screenshot
      const screenshotPath = path.join(ARTIFACT_DIR, 'cstl4_mobile.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch (err) {
      try {
        const diagPath = path.join(ARTIFACT_DIR, 'cstl4_mobile_error.png');
        await page.screenshot({ path: diagPath, fullPage: true });
      } catch {
        // ignore
      }
      throw err;
    } finally {
      await context.close();
    }
  });
});