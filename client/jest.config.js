const path = require('path');

module.exports = {
  // Only run tests inside the client/src directory
  roots: ['<rootDir>/src'],

  // Use jsdom to emulate browser environment for React testing
  testEnvironment: 'jsdom',

  // Transform JS/TS using babel-jest
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },

  // Don't transform node_modules by default
  transformIgnorePatterns: ['/node_modules/'],

  // Provide module name mappings for CSS modules and static assets
  moduleNameMapper: {
    // CSS Modules -> identity-obj-proxy so className lookups work in tests
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Regular/global CSS -> identity-obj-proxy to avoid style side-effects in tests
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Static assets -> mocked file (create __mocks__/fileMock.js returning filename)
    '^.+\\.(png|jpg|jpeg|gif|webp|svg|eot|otf|ttf|woff|woff2)$':
      '<rootDir>/__mocks__/fileMock.js',

    // Allow absolute imports from src via '@/...' pattern
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Extend jest with testing-library DOM matchers
  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  // Recognize these file extensions
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Ignore build and node_modules directories when searching for tests
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Coverage settings (common sensible defaults)
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'v8',

  // Allow resolving modules from node_modules and src
  moduleDirectories: ['node_modules', 'src'],

  // Keep output concise by default
  verbose: false
};