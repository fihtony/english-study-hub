import { test, expect } from '@playwright/test';

test('landing page renders all components', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('text=Linguist Library')).toBeVisible();
  await expect(page.locator('text=Lessons')).toBeVisible();
  await expect(page.locator('text=Flashcards')).toBeVisible();
  await expect(page.locator('text=Progress')).toBeVisible();
  await expect(page.locator('text=Library')).toBeVisible();
  await expect(page.locator('text=Sign In')).toBeVisible();
  await expect(page.locator('text=Master Academic English with Scholarly Precision.')).toBeVisible();
  await expect(page.locator('text=Start Learning Now')).toBeVisible();
  await expect(page.locator('text=Advanced Grammar')).toBeVisible();
  await expect(page.locator('text=Research Writing')).toBeVisible();
  await expect(page.locator('text=Formal Vocabulary')).toBeVisible();
  await expect(page.locator('text=© 2024 Linguist Library. Premium Academic English Study.')).toBeVisible();
  await expect(page.locator('text=Terms of Service')).toBeVisible();
  await expect(page.locator('text=Privacy Policy')).toBeVisible();
  await expect(page.locator('text=Contact Support')).toBeVisible();
});