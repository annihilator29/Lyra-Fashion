module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/_*.{js,jsx,ts,tsx}',
    '!src/pages/**/*.{js,jsx,ts,tsx}',
    '!src/types/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.{config,setup}.{js,jsx,ts,tsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};