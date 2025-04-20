import * as inquirer from 'inquirer'
import * as fs from 'fs'

// Mock dependencies
jest.mock('inquirer')
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  mkdir: jest.fn(),
  writeFile: jest.fn(),
}))

describe('Initialize Command', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fs.existsSync as jest.Mock).mockReturnValue(false)
  })

  it('should detect when run in a service directory', () => {
    // This is a placeholder test that can be expanded
    ;(fs.existsSync as jest.Mock).mockImplementation((path: string) => {
      if (path.endsWith('serverless.ts')) {
        return true
      }
      if (path.endsWith('config.mlt')) {
        return true
      }
      return false
    })

    // Setup test implementation as needed
    expect(fs.existsSync).toHaveBeenCalled()
  })
})
