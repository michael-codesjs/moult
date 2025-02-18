import { UsernameGenerationError, UsernameGenerationErrorCode } from './types';

/**
 * Normalizes a full name into a base username
 * @param fullName The full name to normalize
 * @returns The normalized base username
 * @throws {UsernameGenerationError} If the full name is invalid
 */
export function normalizeFullName(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') {
    throw new UsernameGenerationError(
      'Full name must be a non-empty string',
      UsernameGenerationErrorCode.INVALID_FULL_NAME
    );
  }

  return fullName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

/**
 * Generates a unique username by combining the base username with a counter
 * @param baseUsername The normalized base username
 * @param counter The counter value to append
 * @returns The unique username
 */
export function generateUniqueUsername(baseUsername: string, counter: number): string {
  return `${baseUsername}_${counter}`;
}

/**
 * Validates a generated username
 * @param username The username to validate
 * @returns true if valid, throws error if invalid
 */
export function validateUsername(username: string): boolean {
  if (!username || typeof username !== 'string') {
    throw new UsernameGenerationError(
      'Username must be a non-empty string',
      UsernameGenerationErrorCode.INVALID_FULL_NAME
    );
  }

  const usernameRegex = /^[a-z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    throw new UsernameGenerationError(
      'Username can only contain lowercase letters, numbers, and underscores',
      UsernameGenerationErrorCode.INVALID_FULL_NAME
    );
  }

  return true;
} 