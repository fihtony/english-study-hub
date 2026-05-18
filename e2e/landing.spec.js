import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Landing Page E2E', () => {
  test('loads landing page and verifies content', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Check headline
    await expect(page.locator('h1')).toContainText('Master Academic English with Scholarly Precision.');

    // Check CTA button
    await expect(page.getByRole('button', { name: 'Start Learning Now' })).toBeVisible();

    // Check nav items
    await expect(page.getByText('Linguist Library')).toBeVisible();
    await expect(page.getByText('Lessons')).toBeVisible();
    await expect(page.getByText('Flashcards')).toBeVisible();
    await expect(page.getByText('Progress')).toBeVisible();
    await expect(page.getByText('Library')).toBeVisible();
    await expect(page.getByText('Sign In')).toBeVisible();

    // Check category links
    await expect(page.getByText('Advanced Grammar')).toBeVisible();
    await expect(page.getByText('Research Writing')).toBeVisible();
    await expect(page.getByText('Formal Vocabulary')).toBeVisible();

    // Check footer
    await expect(page.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeVisible();
    await expect(page.getByText('Terms of Service')).toBeVisible();
    await expect(page.getByText('Privacy Policy')).toBeVisible();
    await expect(page.getByText('Contact Support')).toBeVisible();
  });
});