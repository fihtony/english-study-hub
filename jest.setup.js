'use strict';

/**
 * jest.setup.js
 * Jest setup: testing-library matchers and a robust matchMedia polyfill for responsive tests.
 *
 * Responsibilities:
 *  - load @testing-library/jest-dom matchers (toBeInTheDocument, etc.)
 *  - provide a deterministic window.matchMedia polyfill that supports min/max-width and orientation
 *  - expose helpers: global.setViewport(width, height) and global.resetMatchMedia()
 *  - lightweight polyfills for requestAnimationFrame and ResizeObserver
 *
 * This file is CommonJS so Jest (CJS runner) can require it directly.
 */

/* eslint-disable no-console */
try {
  // Add Testing Library DOM matchers (toBeInTheDocument, etc.)
  // Use require so this file is safe in CommonJS Jest environments.
  require('@testing-library/jest-dom/extend-expect');
} catch (err) {
  // Friendly warning rather than hard failure: tests can still run without jest-dom.
  // eslint-disable-next-line no-console
  console.warn(
    'Warning: @testing-library/jest-dom is not installed. ' +
      'Install it with `npm install --save-dev @testing-library/jest-dom` to enable helpful DOM matchers.\n' +
      `Error: ${err && err.message ? err.message : String(err)}`
  );
}

(function () {
  if (typeof global === 'undefined' || typeof window === 'undefined') {
    // Not a browser-like environment, nothing to polyfill.
    return;
  }

  // requestAnimationFrame / cancelAnimationFrame polyfill (minimal)
  if (typeof window.requestAnimationFrame !== 'function') {
    window.requestAnimationFrame = function (cb) {
      return setTimeout(function () {
        try {
          cb(Date.now());
        } catch (e) {
          // swallow animation callback errors during tests
          // eslint-disable-next-line no-console
          console.error('requestAnimationFrame callback error', e);
        }
      }, 0);
    };
  }
  if (typeof window.cancelAnimationFrame !== 'function') {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  // ------- matchMedia polyfill -------
  var originalMatchMedia = window.matchMedia;
  var mqlRegistry = new Map(); // key: query string -> mql object
  var activeMqls = new Set();

  function parseQueryBounds(query) {
    var bounds = { min: null, max: null };
    try {
      var minMatch = query.match(/\(min-width:\s*([0-9]+)px\)/i);
      var maxMatch = query.match(/\(max-width:\s*([0-9]+)px\)/i);
      if (minMatch) bounds.min = Number(minMatch[1]);
      if (maxMatch) bounds.max = Number(maxMatch[1]);
    } catch (e) {
      // ignore parse errors
    }
    return bounds;
  }

  function evalMatches(query, width, height) {
    if (!query || query.trim() === '' || /^\s*(all|screen)\s*$/i.test(query)) {
      return true;
    }

    var bounds = parseQueryBounds(query);
    var min = bounds.min;
    var max = bounds.max;

    // orientation handling
    if (min == null && max == null) {
      if (/\(orientation:\s*portrait\)/i.test(query)) {
        return (height || window.innerHeight || 0) >= (width || window.innerWidth || 0);
      }
      if (/\(orientation:\s*landscape\)/i.test(query)) {
        return (width || window.innerWidth || 0) >= (height || window.innerHeight || 0);
      }
      // Unknown query -> false conservatively
      return false;
    }

    if (typeof width !== 'number' || Number.isNaN(width)) {
      width = Number(window.innerWidth) || 0;
    }
    if (min != null && width < min) return false;
    if (max != null && width > max) return false;
    return true;
  }

  function createMql(query) {
    var matches = evalMatches(query, window.innerWidth, window.innerHeight);
    var deprecatedListeners = new Set();
    var eventListeners = new Set();

    var mql = {
      matches: !!matches,
      media: String(query || ''),
      onchange: null,
      addListener: function addListener(fn) {
        if (typeof fn === 'function') deprecatedListeners.add(fn);
      },
      removeListener: function removeListener(fn) {
        if (typeof fn === 'function') deprecatedListeners.delete(fn);
      },
      addEventListener: function addEventListener(type, fn) {
        if (type === 'change' && typeof fn === 'function') eventListeners.add(fn);
      },
      removeEventListener: function removeEventListener(type, fn) {
        if (type === 'change' && typeof fn === 'function') eventListeners.delete(fn);
      },
      dispatchEvent: function dispatchEvent(evt) {
        var eventObj = typeof evt === 'object' ? evt : { type: evt };
        var changeEvent = Object.assign({ matches: mql.matches, media: mql.media }, eventObj || {});
        deprecatedListeners.forEach(function (fn) {
          try {
            fn(changeEvent);
          } catch (e) {
            // swallow to avoid breaking tests
            // eslint-disable-next-line no-console
            console.error('matchMedia listener error', e);
          }
        });
        eventListeners.forEach(function (fn) {
          try {
            fn(changeEvent);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('matchMedia event listener error', e);
          }
        });
        if (typeof mql.onchange === 'function') {
          try {
            mql.onchange(changeEvent);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('matchMedia onchange handler error', e);
          }
        }
        return true;
      },
      _updateMatches: function _updateMatches(newMatches) {
        var prev = mql.matches;
        mql.matches = !!newMatches;
        if (prev !== mql.matches) {
          var changeEvent = { matches: mql.matches, media: mql.media };
          deprecatedListeners.forEach(function (fn) {
            try {
              fn(changeEvent);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error('matchMedia listener error', e);
            }
          });
          eventListeners.forEach(function (fn) {
            try {
              fn(changeEvent);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error('matchMedia event listener error', e);
            }
          });
          if (typeof mql.onchange === 'function') {
            try {
              mql.onchange(changeEvent);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error('matchMedia onchange handler error', e);
            }
          }
        }
      }
    };

    return mql;
  }

  function matchMediaPolyfill(query) {
    var q = String(query || '');
    if (mqlRegistry.has(q)) {
      return mqlRegistry.get(q);
    }
    var mql = createMql(q);
    try {
      mql.matches = evalMatches(q, window.innerWidth, window.innerHeight);
    } catch (e) {
      mql.matches = false;
    }
    mqlRegistry.set(q, mql);
    activeMqls.add(mql);
    return mql;
  }

  // Install polyfill only if native not present OR to ensure deterministic test behavior
  try {
    window.matchMedia = matchMediaPolyfill;
  } catch (e) {
    // If assignment fails, avoid blowing up tests; keep original if present.
    // eslint-disable-next-line no-console
    console.warn('Warning: failed to install matchMedia polyfill:', e && e.message ? e.message : e);
  }

  // Notify all registered mqls about current viewport
  function _notifyAllMqlsForViewport(width, height) {
    var w = typeof width === 'number' && !Number.isNaN(width) ? width : Number(window.innerWidth) || 0;
    var h = typeof height === 'number' && !Number.isNaN(height) ? height : Number(window.innerHeight) || 0;
    mqlRegistry.forEach(function (mql, query) {
      try {
        var newMatches = evalMatches(query, w, h);
        mql._updateMatches(newMatches);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error evaluating media query during viewport update', e);
      }
    });
  }

  // Expose deterministic viewport control to tests.
  function setViewport(width, height) {
    if (typeof width !== 'number' || Number.isNaN(width) || width < 0) {
      throw new TypeError('setViewport: width must be a non-negative number');
    }
    if (typeof height !== 'number' || Number.isNaN(height) || height < 0) {
      height = Number(window.innerHeight) || 800;
    }

    // Update jsdom window dimensions
    try {
      // jsdom supports setting these properties directly.
      Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: Math.round(width) });
      Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: Math.round(height) });

      // documentElement client sizes are used by some libraries
      if (document && document.documentElement) {
        try {
          Object.defineProperty(document.documentElement, 'clientWidth', {
            configurable: true,
            writable: true,
            value: Math.round(width)
          });
          Object.defineProperty(document.documentElement, 'clientHeight', {
            configurable: true,
            writable: true,
            value: Math.round(height)
          });
        } catch (e) {
          // some jsdom versions may not allow redefining; ignore
        }
      }

      // body client sizes
      if (document && document.body) {
        try {
          Object.defineProperty(document.body, 'clientWidth', {
            configurable: true,
            writable: true,
            value: Math.round(width)
          });
          Object.defineProperty(document.body, 'clientHeight', {
            configurable: true,
            writable: true,
            value: Math.round(height)
          });
        } catch (e) {
          // ignore
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Warning: failed to set window/document dimensions on jsdom:', e && e.message ? e.message : e);
    }

    // notify mqls
    try {
      _notifyAllMqlsForViewport(width, height);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error notifying matchMedia listeners after setViewport', e);
    }

    // Trigger a window resize event so libraries reacting to it can run
    try {
      var resizeEvent;
      try {
        resizeEvent = new Event('resize');
      } catch (e) {
        // older environments
        resizeEvent = document.createEvent('Event');
        resizeEvent.initEvent('resize', true, true);
      }
      window.dispatchEvent(resizeEvent);
    } catch (e) {
      // swallow
    }
  }

  function resetMatchMedia() {
    // Clear registry and restore native if present
    try {
      mqlRegistry.forEach(function (mql) {
        // Best-effort: remove listeners
        if (mql && typeof mql.removeListener === 'function') {
          // no-op: we don't have refs to listeners here, but let GC handle them
        }
      });
      mqlRegistry.clear();
      activeMqls.clear();

      if (originalMatchMedia) {
        try {
          window.matchMedia = originalMatchMedia;
        } catch (e) {
          // if restore fails, leave polyfill in place
          // eslint-disable-next-line no-console
          console.warn('Warning: failed to restore original matchMedia:', e && e.message ? e.message : e);
        }
      } else {
        // reinstall a fresh polyfill instance so tests can continue
        try {
          window.matchMedia = matchMediaPolyfill;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Warning: failed to reinstall matchMedia polyfill:', e && e.message ? e.message : e);
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error during resetMatchMedia', e);
    }
  }

  // Attach helpers to global for tests to call
  try {
    if (typeof global.setViewport !== 'function') {
      global.setViewport = setViewport;
    }
    if (typeof global.resetMatchMedia !== 'function') {
      global.resetMatchMedia = resetMatchMedia;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Warning: failed to attach viewport helpers to global', e && e.message ? e.message : e);
  }

  // ------- ResizeObserver polyfill (lightweight) -------
  if (typeof window.ResizeObserver !== 'function') {
    var ROObservers = new Set();

    var SimpleResizeObserver = function SimpleResizeObserver(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('ResizeObserver callback must be a function');
      }
      this._callback = callback;
      this._elements = new Map(); // element -> lastRect
      ROObservers.add(this);
    };

    SimpleResizeObserver.prototype.observe = function (element) {
      if (!element || typeof element.getBoundingClientRect !== 'function') {
        // ignore invalid elements
        return;
      }
      try {
        var rect = element.getBoundingClientRect();
        this._elements.set(element, rect);
        // Immediately notify once to simulate initial observation
        this._callback(
          Array.from(this._elements.keys()).map(function (el) {
            return { target: el, contentRect: el.getBoundingClientRect() };
          }),
          this
        );
      } catch (e) {
        // swallow
      }
    };

    SimpleResizeObserver.prototype.unobserve = function (element) {
      if (this._elements.has(element)) {
        this._elements.delete(element);
      }
    };

    SimpleResizeObserver.prototype.disconnect = function () {
      this._elements.clear();
      ROObservers.delete(this);
    };

    // Utility to trigger resize notifications for all observers (useful in tests)
    function _notifyResizeObservers() {
      ROObservers.forEach(function (ro) {
        try {
          var entries = Array.from(ro._elements.keys()).map(function (el) {
            return { target: el, contentRect: el.getBoundingClientRect() };
          });
          if (entries.length > 0) {
            ro._callback(entries, ro);
          }
        } catch (e) {
          // swallow
        }
      });
    }

    // Expose a global helper to request ResizeObserver notifications (tests can call after DOM changes)
    try {
      if (typeof global.triggerResizeObservers !== 'function') {
        global.triggerResizeObservers = _notifyResizeObservers;
      }
    } catch (e) {
      // ignore
    }

    try {
      window.ResizeObserver = SimpleResizeObserver;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Warning: failed to install ResizeObserver polyfill:', e && e.message ? e.message : e);
    }
  } else {
    // If native exists, still provide triggerResizeObservers to force synchronous notifications in tests.
    try {
      if (typeof global.triggerResizeObservers !== 'function') {
        global.triggerResizeObservers = function () {
          // best-effort: for native RO, dispatch a fake resize event on window
          try {
            var ev;
            try {
              ev = new Event('resize');
            } catch (e) {
              ev = document.createEvent('Event');
              ev.initEvent('resize', true, true);
            }
            window.dispatchEvent(ev);
          } catch (e) {
            // swallow
          }
        };
      }
    } catch (e) {
      // ignore
    }
  }

  // Ensure tests start with predictable viewport; many test suites expect 1024x768 by default
  try {
    if (typeof global.__DEFAULT_TEST_VIEWPORT__ === 'undefined') {
      global.__DEFAULT_TEST_VIEWPORT__ = { width: 1024, height: 768 };
    }
    // Initialize viewport to default for the test run
    try {
      setViewport(global.__DEFAULT_TEST_VIEWPORT__.width, global.__DEFAULT_TEST_VIEWPORT__.height);
    } catch (e) {
      // ignore failures; tests may set explicitly per-case
    }
  } catch (e) {
    // ignore
  }

  // Provide a convenience helper to emulate mobile/desktop quickly
  try {
    if (typeof global.setMobileViewport !== 'function') {
      global.setMobileViewport = function setMobileViewport() {
        return setViewport(375, 812);
      };
    }
    if (typeof global.setDesktopViewport !== 'function') {
      global.setDesktopViewport = function setDesktopViewport() {
        return setViewport(1280, 800);
      };
    }
  } catch (e) {
    // ignore
  }
})();