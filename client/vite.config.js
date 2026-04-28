import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    base: '/',
    plugins: [
      react({
        // Keep sensible defaults; allow React fast refresh in dev
        jsxRuntime: 'automatic'
      })
    ],
    resolve: {
      alias: {
        // Convenient alias for imports: import Foo from '@/components/Foo'
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      modules: {
        // Local scope by default. Use readable classnames in dev, compact hashes in prod.
        scopeBehaviour: 'local',
        generateScopedName: isDev
          ? '[name]__[local]--[hash:base64:5]'
          : '[hash:base64:8]',
        hashPrefix: 'cstl'
      },
      // Keep option available for preprocessors if project uses them
      preprocessorOptions: {}
    },
    server: {
      // Default dev port; CI/hosts can override via PORT env if desired
      port: 5173,
      strictPort: false,
      open: false,
      // Proxy API requests to the Express backend during development
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          ws: false,
          // keep path prefix (/api) so backend routes remain consistent
          rewrite: (p) => p
        }
      }
    },
    build: {
      // Output directory for production builds
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      sourcemap: isDev,
      // Keep defaults but allow future rollup customization
      rollupOptions: {}
    },
    // Expose mode to client code if needed via import.meta.env.MODE; this defines a fallback for libraries expecting process.env.NODE_ENV
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  };
});