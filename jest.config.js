module.exports = {
  moduleNameMapper: {
    "@\/(.*)$": "<rootDir>/src/$1"
  },
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  testEnvironment: 'jsdom'
};
