/**
 * Jest configuration tailored for a React project using Babel
 *
 * Notes:
 * - testEnvironment: set to the explicit package name 'jest-environment-jsdom' to
 *   make environment resolution explicit. Ensure devDependency `jest-environment-jsdom`
 *   is installed (npm i -D jest-environment-jsdom) so CI/test runners resolve correctly.
 * - transform: use babel-jest for .js/.jsx files and point at project's babel.config.cjs
 * - setupFilesAfterEnv: run jest.setup.js to configure testing-library / jest-dom
 * - roots: limit test discovery to src/ for deterministic runs
 *
 * Keep this file at the repository root as jest will resolve <rootDir> relative to it.
 */

module.exports = {
  // Use the explicit jsdom implementation package for React component testing.
  // NOTE: Ensure `jest-environment-jsdom` is present in devDependencies.
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    // Allow timers/resources to behave like a browser
    resources: 'usable',
    url: 'http://localhost/'
  },

  // Only look for tests under src/ to keep runs fast and predictable
  roots: ['<rootDir>/src/'],

  // Use babel-jest to transform JS and JSX. Point to project's babel.config.cjs if present.
  // This ensures JSX and modern syntax are transpiled consistently with the build.
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: '<rootDir>/babel.config.cjs' }]
  },

  // Files to run after the testing environment is set up.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Resolve these file extensions when importing modules in tests
  moduleFileExtensions: ['js', 'jsx', 'json'],

  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.+(js|jsx)',
    '**/?(*.)+(spec|test).+(js|jsx)'
  ],

  // Helpful mappings for static assets and styles used in components
  moduleNameMapper: {
    // CSS modules & style imports -> identity-obj-proxy so className access works in tests
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // Static assets: Jest will try to load this path when components import images.
    // Provide a lightweight file mock at <rootDir>/__mocks__/fileMock.js
    '\\.(jpg|jpeg|png|gif|webp|svg|ico)$': '<rootDir>/__mocks__/fileMock.js'
  },

  // By default ignore node_modules; keep it simple and conservative.
  // If you need to transform specific ESM packages, add exceptions here, e.g.:
  // transformIgnorePatterns: ['/node_modules/(?!(some-esm-lib)/)']
  transformIgnorePatterns: ['/node_modules/'],

  // Ignore build/output folders
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/docs/'],

  // Coverage collection defaults (can be overridden by CLI flags)
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/index.{js,jsx}',
    '!src/**/__mocks__/**'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],

  // Ensure clean mocks between tests to avoid bleed
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Speed up runs by caching transformed files
  cacheDirectory: '<rootDir>/.jest-cache',

  // Module resolution paths (allow absolute imports from src/)
  moduleDirectories: ['node_modules', 'src'],

  // Developer-friendly output
  verbose: false,
  bail: false,
  silent: false,

  // Add reasonable timeout for slower CI environments
  testTimeout: 10000
};