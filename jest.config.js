module.exports = {
  reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
  testMatch: [
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}'
  ],
  collectCoverage: true
};
