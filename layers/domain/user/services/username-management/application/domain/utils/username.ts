/**
 * Username generation and validation utilities
 *
 * This module provides functions for normalizing, generating, and validating
 * usernames in a consistent manner across the application.
 */

// Constants for username validation
const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 30
const USERNAME_PATTERN = /^[a-z0-9_]+$/

/**
 * Normalizes a full name into a base username
 *
 * This function takes a user's full name and converts it to a normalized
 * base username by:
 * 1. Converting to lowercase
 * 2. Trimming whitespace
 * 3. Replacing spaces with underscores
 * 4. Removing any non-alphanumeric characters
 *
 * @param full_name - The user's full name to normalize
 * @returns The normalized base username
 * @throws Error if the full name is empty or invalid
 */
export function normalizeFullName(full_name: string): string {
  if (!full_name || typeof full_name !== 'string') {
    throw new Error('Full name must be a non-empty string')
  }

  // Convert to lowercase, trim spaces, replace spaces with underscores
  let normalized = full_name.toLowerCase().trim().replace(/\s+/g, '_')

  // Remove any characters that aren't alphanumeric or underscores
  normalized = normalized.replace(/[^a-z0-9_]/g, '')

  // Ensure the normalized name isn't empty after processing
  if (!normalized) {
    throw new Error('Normalized username cannot be empty')
  }

  return normalized
}

/**
 * Generates a unique username by combining the base username with a counter
 *
 * This function creates a unique username by appending a numeric counter
 * to the base username, separated by an underscore.
 *
 * @param base_username - The normalized base username
 * @param counter - The numeric counter to append
 * @returns The generated unique username
 * @throws Error if the base username is invalid
 */
export function generateUniqueUsername(
  base_username: string,
  counter: number,
): string {
  if (!base_username) {
    throw new Error('Base username is required')
  }

  if (typeof counter !== 'number' || counter < 0) {
    throw new Error('Counter must be a non-negative number')
  }

  return `${base_username}_${counter}`
}

/**
 * Validates a generated username against defined rules
 *
 * This function checks if a username meets the following criteria:
 * 1. Contains only lowercase letters, numbers, and underscores
 * 2. Has a length between MIN_USERNAME_LENGTH and MAX_USERNAME_LENGTH
 *
 * @param username - The username to validate
 * @returns true if the username is valid, false otherwise
 */
export function validateUsername(username: string): boolean {
  if (!username) {
    return false
  }

  // Check length constraints
  if (
    username.length < MIN_USERNAME_LENGTH ||
    username.length > MAX_USERNAME_LENGTH
  ) {
    return false
  }

  // Check character constraints using regex pattern
  return USERNAME_PATTERN.test(username)
}
