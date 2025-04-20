import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**/*',
  ],
  verbose: true,
  testTimeout: 15000,
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
}

export default config
