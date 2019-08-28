module.exports = {
  reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
  testMatch: [
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}',
    '<rootDir>/tests/storybook.test.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupUnitTests.js'],
  collectCoverage: true
};
