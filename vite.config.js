import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode (.env, .env.development, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  // Respect runtime PORT, then env files, then default 5173
  const portRaw = process.env.PORT ?? env.PORT ?? '5173';
  const port = Number(portRaw);

  // Basic validation to avoid binding to an invalid port
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid PORT value: ${portRaw}`);
  }

  const projectRoot = process.cwd();

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // Convenient alias for imports: import X from '@/...'
        '@': path.resolve(projectRoot, 'src'),
      },
    },
    server: {
      host: true,
      port,
      // allow falling back to another port if requested port is in use
      strictPort: false,
      fs: {
        // Restrict filesystem serving to project root for safety
        allow: [projectRoot],
      },
    },
    preview: {
      host: true,
      port,
    },
    build: {
      target: 'es2020',
      sourcemap: mode !== 'production',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // Keep vendor chunking reasonable for caching
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
    // Do not implicitly expose server env vars to the client; Vite exposes VITE_* via import.meta.env
    define: {
      'process.env': {},
    },
    esbuild: {
      jsx: 'automatic',
    },
    // Ensure Vitest uses the jsdom environment so DOM globals (window/document) exist for testing
    test: {
      environment: 'jsdom'
    },
  };
});