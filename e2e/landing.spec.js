import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('loads the page successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Linguist Library/)
  })

  test('displays the main heading', async ({ page }) => {
    await page.goto('/')
    const heading = page.locator('h1')
    await expect(heading).toContainText('Master Academic English with Scholarly Precision')
  })

  test('displays navigation bar with logo', async ({ page }) => {
    await page.goto('/')
    const logo = page.locator('[data-stitch-id="nav_logo"]')
    await expect(logo).toContainText('Linguist Library')
  })

  test('displays navigation links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Lessons')).toBeVisible()
    await expect(page.locator('text=Flashcards')).toBeVisible()
    await expect(page.locator('text=Progress')).toBeVisible()
    await expect(page.locator('[data-stitch-id="nav_library"]')).toBeVisible()
  })

  test('displays CTA button', async ({ page }) => {
    await page.goto('/')
    const ctaButton = page.locator('[data-stitch-id="cta_button"]')
    await expect(ctaButton).toContainText('Start Learning Now')
    await expect(ctaButton).toBeVisible()
  })

  test('displays category links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-stitch-id="category_grammar"]')).toContainText('Advanced Grammar')
    await expect(page.locator('[data-stitch-id="category_writing"]')).toContainText('Research Writing')
    await expect(page.locator('[data-stitch-id="category_vocabulary"]')).toContainText('Formal Vocabulary')
  })

  test('displays footer with copyright', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('[data-stitch-id="footer"]')
    await expect(footer).toContainText('© 2024 Linguist Library')
  })

  test('displays footer links', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('[data-stitch-id="footer"]')
    await expect(footer.locator('text=Terms of Service')).toBeVisible()
    await expect(footer.locator('text=Privacy Policy')).toBeVisible()
    await expect(footer.locator('text=Contact Support')).toBeVisible()
  })

  test('CTA button is interactive', async ({ page }) => {
    await page.goto('/')
    const ctaButton = page.locator('[data-stitch-id="cta_button"]')
    await expect(ctaButton).toBeEnabled()
  })

  test('navigation links are clickable', async ({ page }) => {
    await page.goto('/')
    const lessonsLink = page.locator('a:has-text("Lessons")')
    await expect(lessonsLink).toBeEnabled()
  })

  test('takes desktop screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'e2e/evidence/landing-desktop.png', fullPage: true })
  })

  test('responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await page.screenshot({ path: 'e2e/evidence/landing-mobile.png', fullPage: true })
  })
})
