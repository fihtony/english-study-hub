import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Read port from environment if provided, fallback to 5173 to support dynamic assignment in CI/containers
const PORT = Number(process.env.PORT || 5173);

// Vite configuration for a React application.
// - Exposes a sensible dev server port (strictPort to surface port conflicts in CI)
// - Provides a convenient alias "@" -> src
// - Enables fast React refresh and JSX handling via @vitejs/plugin-react
export default defineConfig({
  plugins: [
    react({
      // Opt into the recommended automatic JSX runtime and fast refresh
      jsxRuntime: 'automatic',
      // Enable some helpful runtime checks in development
      babel: {
        plugins: [],
      },
    }),
  ],
  // Development server configuration
  server: {
    port: PORT,
    strictPort: true, // fail if port already in use to make failures explicit in CI
    host: true, // listen on all addresses (useful in containerized environments)
    open: false, // don't open browser automatically in CI
    fs: {
      // Restrict file serving to project root for safety
      strict: true,
    },
  },
  // Preview server (vite preview) should use same port behavior
  preview: {
    port: PORT,
    strictPort: true,
  },
  // Resolve helpers and aliases
  resolve: {
    alias: {
      // Use "@/..." to reference files inside src
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Build optimizations and sensible defaults for production
  build: {
    target: 'es2018',
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep vendor chunking explicit for caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  // Provide a small, safe injection for code that expects process.env.NODE_ENV
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  // Dependency optimization: keep defaults but explicit for clarity
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'es2018',
    },
  },
});