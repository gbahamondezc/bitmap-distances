// eslint-disable-next-line immutable/no-mutation
module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist'],
};
