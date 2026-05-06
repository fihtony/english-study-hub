/**
 * Test setup for Vitest / React Testing Library
 * - Imports jest-dom matchers
 * - Ensures automatic cleanup between tests
 * - Adds small runtime shims commonly needed in browser-like tests
 *
 * This file intentionally exports nothing; it's intended to be referenced
 * in vitest configuration as the global setup file (e.g., vitest.config.js -> test.setupFiles).
 */

import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mark environment for React's act() when using React 18+
// Tests and React Testing Library rely on this being true so act() enqueues microtasks correctly.
if (typeof globalThis.IS_REACT_ACT_ENVIRONMENT === 'undefined') {
  // eslint-disable-next-line no-undef
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
}

// Ensure tests automatically clean up mounted DOM between runs
afterEach(() => {
  try {
    cleanup();
  } catch (err) {
    // If cleanup fails, surface a helpful error for debugging.
    // Do not swallow errors silently: rethrow after logging context.
    // console.error is acceptable in test environment to aid debugging.
    // eslint-disable-next-line no-console
    console.error('Error during test cleanup:', err);
    throw err;
  }
});

// Lightweight window.matchMedia mock for components that query media features.
// Many component libraries expect window.matchMedia to exist.
if (typeof window !== 'undefined' && typeof window.matchMedia === 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {}, // deprecated but some libs still call it
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    },
  });
}

// Provide a minimal fetch fallback to surface missing fetch mocks during tests.
// Tests that require network should explicitly mock fetch (e.g., vi.stubGlobal('fetch', ...))
// This prevents silent network calls and gives actionable guidance.
if (typeof globalThis.fetch === 'undefined') {
  // eslint-disable-next-line no-undef
  globalThis.fetch = async () => {
    throw new Error(
      'global.fetch is not available in the test environment. Mock global.fetch in your test (e.g., vi.stubGlobal("fetch", async () => ({ ok: true, json: async () => ({}) })))'
    );
  };
}

// Provide a minimal localStorage/sessionStorage shim if not present.
// Many components access localStorage during render; tests should override when needed.
if (typeof window !== 'undefined' && typeof window.localStorage === 'undefined') {
  const createStorage = () => {
    let store = Object.create(null);
    return {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
      },
      setItem(key, value) {
        store[key] = String(value);
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = Object.create(null);
      },
    };
  };
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    writable: true,
    value: createStorage(),
  });
  Object.defineProperty(window, 'sessionStorage', {
    configurable: true,
    writable: true,
    value: createStorage(),
  });
}

// Silence React act() warnings by ensuring requestAnimationFrame exists
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
}

// Minimal ResizeObserver mock for libs/components that rely on it in tests.
// Provides observe/unobserve/disconnect no-ops and a simple API.
if (typeof globalThis.ResizeObserver === 'undefined' && typeof window !== 'undefined') {
  // eslint-disable-next-line no-unused-vars
  globalThis.ResizeObserver = class {
    constructor(callback) {
      this._cb = callback;
    }
    observe() {
      // no-op
    }
    unobserve() {
      // no-op
    }
    disconnect() {
      // no-op
    }
  };
}

// If tests rely on computed styles (some libs call getComputedStyle), ensure it exists.
if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'undefined') {
  window.getComputedStyle = (elt) => {
    return {
      getPropertyValue: () => '',
    };
  };
}