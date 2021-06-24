module.exports = {
  moduleNameMapper: {
    "@\/(.*)$": "<rootDir>/src/$1"
  },
  modulePathIgnorePatterns: ['<rootDir>/cypress/'],
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  testEnvironment: 'jsdom'
};
