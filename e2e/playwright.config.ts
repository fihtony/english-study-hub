import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const artifactFolder = path.join(__dirname, '..', 'artifacts', 'figma', 'gxd2LNayM2hh3V3qTlcyPF', '1_470');

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list']],
  outputDir: artifactFolder,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    headless: true,
    actionTimeout: 0,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      args: ['--disable-dev-shm-usage'],
    },
  },
  projects: [
    {
      name: 'Desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 800 },
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
      },
    },
    {
      name: 'Mobile',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 812 },
      },
    },
  ],
  webServer: {
    // Try the root dev script first, fall back to a simple node server
    command: 'sh -c "npm run dev --silent || node server/index.js"',
    url: process.env.BASE_URL || 'http://localhost:5173',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});