import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    exclude: ['e2e/**', 'node_modules/**'],
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
});