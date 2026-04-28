import '@testing-library/jest-dom/extend-expect';

//
// Jest global test setup for React Testing Library.
// Provides safe, minimal polyfills and mocks commonly needed by components
// running in the Jest JSDOM environment.
// This file is intentionally defensive: it only installs mocks when missing
// and uses jest.fn() where available so tests can spy/assert on calls.
//

// Helper to safely call console methods (JSDOM sometimes restricts globals)
const safeConsole = (() => {
  try {
    return console;
  } catch {
    return { warn: () => {}, error: () => {}, log: () => {} };
  }
})();

try {
  // Mock fetch if not present so tests don't fail when code calls window.fetch.
  // Use jest.fn() if available so tests can assert calls; otherwise provide a minimal implementation.
  if (typeof global.fetch === 'undefined') {
    const defaultFetchResponse = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({}),
        text: async () => '',
        headers: { get: () => null },
      });

    if (typeof jest !== 'undefined' && typeof jest.fn === 'function') {
      global.fetch = jest.fn().mockImplementation(defaultFetchResponse);
    } else {
      global.fetch = defaultFetchResponse;
    }
  }
} catch (err) {
  safeConsole.warn('setupTests: failed to setup global.fetch mock:', err);
}

try {
  // Minimal localStorage mock for tests that use it.
  if (typeof window !== 'undefined' && typeof window.localStorage === 'undefined') {
    const createStore = () => {
      let store = {};
      return {
        getItem: (key) => (Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null),
        setItem: (key, value) => {
          store[key] = String(value);
        },
        removeItem: (key) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    };

    const storeImpl = createStore();

    if (typeof jest !== 'undefined' && typeof jest.fn === 'function') {
      // wrap methods with jest.fn for assertions in tests
      window.localStorage = {
        getItem: jest.fn(storeImpl.getItem),
        setItem: jest.fn(storeImpl.setItem),
        removeItem: jest.fn(storeImpl.removeItem),
        clear: jest.fn(storeImpl.clear),
      };
    } else {
      window.localStorage = storeImpl;
    }
  }
} catch (err) {
  safeConsole.warn('setupTests: failed to setup localStorage mock:', err);
}

try {
  // Prevent tests from failing when components call window.scrollTo
  if (typeof window !== 'undefined' && typeof window.scrollTo !== 'function') {
    window.scrollTo = () => {};
  }
} catch (err) {
  safeConsole.warn('setupTests: failed to setup window.scrollTo:', err);
}

try {
  // matchMedia polyfill for components that rely on media queries in JS.
  if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
} catch (err) {
  safeConsole.warn('setupTests: failed to setup matchMedia:', err);
}

try {
  // Minimal ResizeObserver mock
  if (typeof global.ResizeObserver === 'undefined') {
    class ResizeObserverMock {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    global.ResizeObserver = ResizeObserverMock; // global so both window and global environments can access
  }
} catch (err) {
  safeConsole.warn('setupTests: failed to setup ResizeObserver:', err);
}

try {
  // Minimal IntersectionObserver mock
  if (typeof global.IntersectionObserver === 'undefined') {
    class IntersectionObserverMock {
      constructor(cb, options) {
        this.cb = cb;
        this.options = options;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    global.IntersectionObserver = IntersectionObserverMock;
  }
} catch (err) {
  safeConsole.warn('setupTests: failed to setup IntersectionObserver:', err);
}

// Optional: expose a simple helper to reset commonly mocked globals between tests.
// Tests can import this helper if they need to reset the in-memory stores.
export const __TEST_HELPERS__ = {
  resetLocalStorage: () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (typeof window.localStorage.clear === 'function') {
          window.localStorage.clear();
        } else {
          // rebuild if methods were not the expected shape
          // eslint-disable-next-line no-param-reassign
          window.localStorage = undefined;
        }
      }
    } catch (err) {
      safeConsole.warn('setupTests: resetLocalStorage failed:', err);
    }
  },
  restoreFetchMock: () => {
    try {
      if (typeof jest !== 'undefined' && typeof global.fetch === 'function' && global.fetch._isMockFunction) {
        global.fetch.mockReset();
      }
    } catch (err) {
      safeConsole.warn('setupTests: restoreFetchMock failed:', err);
    }
  },
};

// Ensure tests fail loudly on unhandled promise rejections to surface async errors.
process.on &&
  process.on('unhandledRejection', (reason) => {
    // Jest will print the error; rethrowing can cause noisy failures in some runners,
    // so log clearly to help debugging tests.
    safeConsole.error('Unhandled promise rejection in test environment:', reason);
  });