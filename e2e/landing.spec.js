import { test, expect } from '@playwright/test';

test('LandingPage renders correctly and captures screenshot', async ({ page }) => {
  await page.goto('/');

  // Verify page title
  await expect(page).toHaveTitle(/Linguist Library/);

  // Verify all key text elements are present
  await expect(page.getByText('Linguist Library')).toBeVisible();
  await expect(page.getByText('Lessons')).toBeVisible();
  await expect(page.getByText('Flashcards')).toBeVisible();
  await expect(page.getByText('Progress')).toBeVisible();
  await expect(page.getByText('Library')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByText('Master Academic English with Scholarly Precision.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start Learning Now' })).toBeVisible();
  await expect(page.getByText('Advanced Grammar')).toBeVisible();
  await expect(page.getByText('Research Writing')).toBeVisible();
  await expect(page.getByText('Formal Vocabulary')).toBeVisible();
  await expect(page.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeVisible();
  await expect(page.getByText('Terms of Service')).toBeVisible();
  await expect(page.getByText('Privacy Policy')).toBeVisible();
  await expect(page.getByText('Contact Support')).toBeVisible();

  // Capture screenshot for evidence
  await page.screenshot({ path: 'e2e/evidence/landing-page.png', fullPage: true });
});