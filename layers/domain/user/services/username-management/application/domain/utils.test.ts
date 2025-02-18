import { normalizeFullName, generateUniqueUsername, validateUsername } from './utils';
import { UsernameGenerationError } from './types';

describe('Username Management Utils', () => {
  describe('normalizeFullName', () => {
    it('should convert full name to lowercase and replace spaces with underscores', () => {
      expect(normalizeFullName('John Doe')).toBe('john_doe');
    });

    it('should remove special characters', () => {
      expect(normalizeFullName('John! @Doe#')).toBe('john_doe');
    });

    it('should handle multiple spaces', () => {
      expect(normalizeFullName('John  Doe   Smith')).toBe('john_doe_smith');
    });

    it('should throw error for empty string', () => {
      expect(() => normalizeFullName('')).toThrow(UsernameGenerationError);
    });
  });

  describe('generateUniqueUsername', () => {
    it('should combine base username with counter', () => {
      expect(generateUniqueUsername('john_doe', 1)).toBe('john_doe_1');
    });
  });

  describe('validateUsername', () => {
    it('should return true for valid username', () => {
      expect(validateUsername('john_doe_1')).toBe(true);
    });

    it('should throw error for invalid characters', () => {
      expect(() => validateUsername('john!doe')).toThrow(UsernameGenerationError);
    });

    it('should throw error for empty string', () => {
      expect(() => validateUsername('')).toThrow(UsernameGenerationError);
    });
  });
}); 