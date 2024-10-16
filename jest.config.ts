export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@(api|components|context|features|guards|icons|models|routes|styles|utils|store)(.*)$': '<rootDir>/src/$1$2',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['stub.spec.ts$'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['<rootDir>/src'],
};

process.env = Object.assign(process.env, {
  NODE_ENV: 'test',
});
