'use strict';

const express = require('express');

/**
 * Build the health payload.
 *
 * @param {Object} [opts]
 * @param {boolean} [opts.forceError=false] - When true, throws an error to allow tests to simulate a 500.
 * @returns {{status: string, uptime: number}} health payload
 * @throws {Error} when forceError is true
 */
function getHealthPayload(opts = {}) {
  const { forceError = false } = opts || {};

  if (forceError) {
    // Throwing allows route tests to assert 500 responses without relying on fragile request-level injection.
    throw new Error('Simulated internal error for testing');
  }

  const rawUptime = process.uptime();
  const uptime = Number.isFinite(rawUptime) ? Math.floor(rawUptime) : 0;

  return {
    status: 'ok',
    uptime,
  };
}

const router = express.Router();

/**
 * GET /
 * Returns a concise health JSON used for liveness checks.
 *
 * Query parameter `simulate=error` will trigger a simulated 500 only when NODE_ENV === 'test'.
 * Tests should prefer calling exported getHealthPayload({forceError:true}) directly.
 */
router.get('/', (req, res) => {
  // Only allow query-based simulation in test environment to avoid accidental production abuse.
  const allowSimulate = process.env.NODE_ENV === 'test';
  const simulate = allowSimulate && String(req.query.simulate || '').toLowerCase() === 'error';
  try {
    const payload = getHealthPayload({ forceError: simulate });
    // Successful response (200)
    res.json(payload);
  } catch (err) {
    // Log minimal server-side information for operators; don't leak stack traces to clients.
    // In production, a structured logger with correlation IDs should be used.
    /* eslint-disable no-console */
    console.error('Health endpoint error:', err && err.message ? err.message : 'unknown');
    /* eslint-enable no-console */
    res.status(500).json({ status: 'error', uptime: null });
  }
});

// Export router as the module (so require('./health') returns the Router).
// Also attach the helper for testing: require('./health').getHealthPayload
module.exports = router;
module.exports.getHealthPayload = getHealthPayload;