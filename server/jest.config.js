/**
 * Jest configuration for server tests
 *
 * - testEnvironment: node (suitable for Express backend)
 * - testMatch: only run tests under server/src by default (spec|test).js(x)
 * - coverage: collect coverage for src (but exclude test files), with focused thresholds for routes
 *
 * Notes:
 * Keep this file at server/jest.config.js so <rootDir> resolves to the server/ package root.
 */
module.exports = {
  // Run tests in a Node environment (no browser globals)
  testEnvironment: 'node',

  // Only match server-side tests located under server/src by convention
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)'],

  // Root directory for tests and module resolution
  roots: ['<rootDir>/src'],

  // File extensions recognized by Jest
  moduleFileExtensions: ['js', 'json', 'node'],

  // Ensure mocks are cleared between tests to avoid cross-test leakage
  clearMocks: true,

  // Collect coverage information and output to server/coverage
  collectCoverage: true,
  collectCoverageFrom: [
    // Collect from all JS files in src
    'src/**/*.js',
    // But exclude tests and test helpers
    '!src/**/__tests__/**',
    '!src/**/*.test.js',
    '!src/**/*.spec.js'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],

  // Useful coverage reporters for CI and local inspection
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // Coverage thresholds: enforce minimum coverage, with explicit focus on routes
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85
    },
    // Per-file pattern for route files (helps ensure routes are tested)
    'src/routes/.*\\.js$': {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },

  // Increase default timeout for potentially slow integration tests (supertest, DB etc.)
  testTimeout: 10000,

  // Helpful verbose output during CI runs
  verbose: true,

  // Security-conscious defaults: do not allow automocking — tests should explicitly mock
  automock: false
};