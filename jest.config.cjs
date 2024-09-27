module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [require.resolve('./.jest/setup-tests.js')],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
  },
};
