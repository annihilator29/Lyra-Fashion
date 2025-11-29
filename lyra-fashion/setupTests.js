// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js modules
jest.mock('next/router', () => require('next-router-mock'));

// Mock fetch for API calls
global.fetch = jest.fn(() =>
 Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
 })
);