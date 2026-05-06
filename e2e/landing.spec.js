import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

// Evidence directory (ensure it exists)
const evidenceDir = path.join(process.cwd(), 'docs', 'evidence');
try {
  fs.mkdirSync(evidenceDir, { recursive: true });
} catch (err) {
  // If directory creation fails, rethrow as it's required for evidence
  // but include a helpful message
  throw new Error(`Failed to create evidence directory at ${evidenceDir}: ${err?.message ?? err}`);
}

// NOTE: Update these constants to match the exact Stitch-exported text and alt in the app if they differ.
// The tests assert exact equality; adjust to match the implemented landing page.
const EXPECTED_H1_TEXT = 'English Study Hub'; // verbatim H1 text from Stitch export
const EXPECTED_IMG_ALT = 'Landing Illustration'; // exact alt text for hero image

function buildTargetUrl(relative = '/') {
  // Prefer Playwright / CI env vars, fall back to common defaults for local dev
  const envBase =
    process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || process.env.BASE_URI || process.env.TARGET_URL;
  const defaultBase = 'http://localhost:3000';
  const base = (envBase || defaultBase).replace(/\/+$/, ''); // strip trailing slash
  if (!relative.startsWith('/')) relative = '/' + relative;
  return base + relative;
}

async function saveScreenshot(page, filename) {
  const filePath = path.join(evidenceDir, filename);
  await page.screenshot({ path: filePath, fullPage: true, timeout: 12000 }).catch((err) => {
    // convert screenshot failures into a clearer error
    throw new Error(`Failed to create screenshot ${filePath}: ${err?.message ?? err}`);
  });

  // Attach to the Playwright report if available
  try {
    await test.info().attach(filename, { path: filePath, contentType: 'image/png' });
  } catch {
    // attach may fail silently depending on reporter; ignore attachment errors
  }
  return filePath;
}

test.describe('Landing page - visual & content checks', () => {
  test('desktop 1280x720: loads and shows expected heading and image', async ({ page }) => {
    // Set viewport for desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    const target = buildTargetUrl('/');
    try {
      // Navigate to root. Using an absolute URL avoids reliance on Playwright config.
      const resp = await page.goto(target, { waitUntil: 'networkidle', timeout: 15000 });
      // If navigation failed with non-2xx, surface clear error
      if (resp && resp.status() >= 400) {
        throw new Error(`Navigation to ${target} returned HTTP ${resp.status()}`);
      }

      // Wait for H1 and assert exact text
      const h1 = await page.waitForSelector('h1', { state: 'visible', timeout: 7000 });
      const h1Text = (await h1.textContent())?.trim() ?? '';
      expect(h1Text).toBe(EXPECTED_H1_TEXT);

      // Wait for image with exact alt text and assert visibility
      const imgSelector = `img[alt="${EXPECTED_IMG_ALT}"]`;
      const img = await page.waitForSelector(imgSelector, { state: 'visible', timeout: 7000 });
      expect(await img.isVisible()).toBeTruthy();

      // Save screenshot evidence
      await saveScreenshot(page, 'screenshot-1280x720.png');
    } catch (err) {
      // On failure, capture a failure screenshot for debugging and rethrow
      try {
        await saveScreenshot(page, 'failure-1280x720.png');
      } catch {
        // ignore
      }
      // Enhance error message for CI logs then rethrow
      throw new Error(`Desktop test failed: ${err?.message ?? err}`);
    }
  });

  test('mobile 375x667: loads and shows expected heading and image', async ({ page }) => {
    // Set viewport for mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const target = buildTargetUrl('/');
    try {
      const resp = await page.goto(target, { waitUntil: 'networkidle', timeout: 15000 });
      if (resp && resp.status() >= 400) {
        throw new Error(`Navigation to ${target} returned HTTP ${resp.status()}`);
      }

      // Ensure heading exists and matches exactly
      const h1 = await page.waitForSelector('h1', { state: 'visible', timeout: 7000 });
      const h1Text = (await h1.textContent())?.trim() ?? '';
      expect(h1Text).toBe(EXPECTED_H1_TEXT);

      // Ensure image with exact alt is visible on mobile
      const imgSelector = `img[alt="${EXPECTED_IMG_ALT}"]`;
      const img = await page.waitForSelector(imgSelector, { state: 'visible', timeout: 7000 });
      expect(await img.isVisible()).toBeTruthy();

      // Save mobile screenshot evidence
      await saveScreenshot(page, 'screenshot-375x667.png');
    } catch (err) {
      try {
        await saveScreenshot(page, 'failure-375x667.png');
      } catch {
        // ignore
      }
      throw new Error(`Mobile test failed: ${err?.message ?? err}`);
    }
  });
});