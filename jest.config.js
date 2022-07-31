/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__test__/**/*.test.ts'],
  verbose: true,
  // setupFiles: ['./src/__test__/test_server.ts'],
};
