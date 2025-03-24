import { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  verbose: true,
  maxConcurrency: 10,
  testTimeout: 2000000,
  testEnvironment: 'node',
  rootDir: 'src',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
  moduleDirectories: ['node_modules'],
}

export default jestConfig
