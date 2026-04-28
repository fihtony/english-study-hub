import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read numeric port from environment, fallback to 5173
const DEFAULT_PORT = 5173;
const port = Number.parseInt(process.env.PORT || String(DEFAULT_PORT), 10) || DEFAULT_PORT;

// Base path for serving the app (useful when previewing a built app or deploying under a subpath)
const base = process.env.BASE_URL || '/';

export default defineConfig({
  base,
  plugins: [
    // React plugin with automatic refresh and fast refresh support
    react({
      // Enable React refresh for local development; Vite enables it by default,
      // but explicitly set to true to avoid surprises in different environments.
      fastRefresh: true,
    }),
  ],
  server: {
    // Bind to all interfaces so containerized environments can reach the dev server.
    host: '0.0.0.0',
    port,
    strictPort: false, // allow falling back to next available port if occupied
    // Default HMR settings are typically fine; keep secure defaults.
    // Avoid exposing the dev server over insecure public networks unintentionally.
    hmr: {
      host: process.env.HMR_HOST || undefined,
    },
  },
  preview: {
    // Preview should mirror server settings for CI and preview environments.
    host: '0.0.0.0',
    port,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2019',
    // Keep Rollup options explicit for predictable builds
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        // Use deterministic filenames for cacheability in production
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/chunk-[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Restrict large inline assets
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      // Convenience alias for imports from src
      '@': path.resolve(__dirname, 'src'),
    },
    // Preserve file extensions resolution behavior
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  define: {
    // Avoid leaking runtime process.env contents into client bundle.
    // Consumers should explicitly inject known safe env vars via VITE_* prefixed vars.
    'process.env': {},
  },
  esbuild: {
    // In production drop console/debugger to reduce noise and potential info leaks.
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  // Optimize dependencies for faster dev server start
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      // Keep optimized deps secure by disallowing arbitrary code execution transforms.
      // No special options needed here, but keep block explicit.
    },
  },
});