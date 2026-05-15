import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should load the landing page', async ({ page }) => {
    await expect(page).toHaveTitle(/Linguist Library/);
  });

  test('should display hero section', async ({ page }) => {
    const heroSection = page.getByTestId('hero-section');
    await expect(heroSection).toBeVisible();
    
    const title = page.getByText(/Premium Academic English/);
    await expect(title).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    const featuresSection = page.getByTestId('features-section');
    await expect(featuresSection).toBeVisible();
    
    const sectionTitle = page.getByText(/Why Choose Linguist Library/);
    await expect(sectionTitle).toBeVisible();
  });

  test('should display all feature cards', async ({ page }) => {
    const features = ['Curated Texts', 'Interactive Learning', 'Progress Tracking'];
    
    for (const feature of features) {
      const card = page.getByText(feature);
      await expect(card).toBeVisible();
    }
  });

  test('should display CTA section', async ({ page }) => {
    const ctaSection = page.getByTestId('cta-section');
    await expect(ctaSection).toBeVisible();
    
    const ctaTitle = page.getByText(/Ready to Start Learning/);
    await expect(ctaTitle).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.getByTestId('footer');
    await expect(footer).toBeVisible();
    
    const copyright = page.getByText(/© 2024 Linguist Library/);
    await expect(copyright).toBeVisible();
  });

  test('should have clickable buttons', async ({ page }) => {
    const getStartedBtn = page.getByRole('button', { name: /Get Started/ });
    const learnMoreBtn = page.getByRole('button', { name: /Learn More/ });
    const ctaBtn = page.getByRole('button', { name: /Start Your Free Trial/ });
    
    await expect(getStartedBtn).toBeEnabled();
    await expect(learnMoreBtn).toBeEnabled();
    await expect(ctaBtn).toBeEnabled();
  });

  test('should capture desktop viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'docs/evidence/landing-page-desktop.png', fullPage: true });
  });

  test('should capture tablet viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'docs/evidence/landing-page-tablet.png', fullPage: true });
  });

  test('should capture mobile viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'docs/evidence/landing-page-mobile.png', fullPage: true });
  });
});
