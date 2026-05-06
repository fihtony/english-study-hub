import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

/**
 * Vite configuration
 *
 * - Official React plugin
 * - Development server runs on port 3000 (strictPort: true) unless overridden by DEV_PORT
 * - Preview server port is set for Playwright/e2e (default 5173) and can be overridden by PREVIEW_PORT or PLAYWRIGHT_PREVIEW_PORT
 * - Provides a safe alias "@" -> /src for cleaner imports
 * - Injects application version from package.json into the bundle as __APP_VERSION__
 * - Adds conservative security headers on dev/preview server to help catch unsafe patterns early
 *
 * This file is written defensively so it works in both ESM and CommonJS invocation contexts:
 * - If __dirname is unavailable (pure ESM), fallback to process.cwd()
 */

// Resolve a reliable project root (works when __dirname isn't defined in ESM)
const projectRoot = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const readPackageJsonVersion = () => {
  try {
    const pkgPath = path.resolve(projectRoot, 'package.json');
    const raw = fs.readFileSync(pkgPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.version === 'string') return parsed.version;
    return '0.0.0';
  } catch (err) {
    // Non-fatal; surface to stderr but allow dev workflows to continue
    // eslint-disable-next-line no-console
    console.error('Warning: could not read package.json to infer version:', err && err.message ? err.message : err);
    return '0.0.0';
  }
};

const APP_VERSION = readPackageJsonVersion();

// Ports (allow CI overrides via environment variables but default to task-specified ports)
const DEV_PORT = parseInt(process.env.DEV_PORT || process.env.PORT || '3000', 10);
const PREVIEW_PORT = parseInt(
  process.env.PLAYWRIGHT_PREVIEW_PORT || process.env.PREVIEW_PORT || process.env.PW_PORT || '5173',
  10
);

// Conservative security headers applied to dev and preview servers to catch unsafe behaviors early.
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

export default defineConfig({
  base: process.env.BASE_URL || '/',
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    // Provide a minimal NODE_ENV for libraries that check it during dev builds.
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },

  plugins: [
    // React plugin handles automatic JSX runtime and fast refresh
    react(),
  ],

  resolve: {
    alias: {
      // Example: import Button from '@/components/Button'
      '@': path.resolve(projectRoot, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },

  server: {
    port: DEV_PORT,
    strictPort: true,
    host: true, // bind to all interfaces (useful in containerized CI)
    fs: {
      // Prevent serving files outside the project root
      strict: true,
    },
    headers: securityHeaders,
    hmr: {
      protocol: 'ws',
    },
    open: false,
  },

  // Preview server configuration used by Playwright and other e2e tooling
  preview: {
    port: PREVIEW_PORT,
    strictPort: true,
    host: true,
    headers: securityHeaders,
  },

  build: {
    outDir: 'dist',
    target: 'es2018',
    sourcemap: false,
    minify: 'esbuild',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  esbuild: {
    jsx: 'automatic',
  },

  // Keep terminal output stable in CI
  clearScreen: false,
});