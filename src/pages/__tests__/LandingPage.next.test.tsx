/**
 * Next-specific LandingPage test removed.
 * This file is intentionally kept as a skipped placeholder to avoid duplicate/contradictory tests.
 * SPA (react-router) tests under src/pages/__tests__/LandingPage.test.tsx are the canonical tests.
 *
 * Rationale:
 * - Prevents Next.js-specific test variants from running in CI.
 * - Keeps historical context while ensuring only SPA tests execute.
 *
 * No runtime behavior is exercised here; file exists only to indicate removal of Next variant.
 */

describe.skip('LandingPage.next.test.tsx (removed)', () => {
  test('placeholder - Next-specific tests are removed; SPA tests cover landing page', () => {
    expect(true).toBe(true);
  });
});