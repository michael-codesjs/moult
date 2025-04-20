/**
 * Signature generation and validation utilities
 *
 * This module provides functions for normalizing, generating, and validating
 * signatures in a consistent manner across the application.
 */

// Constants for signature validation
const MIN_SIGNATURE_LENGTH = 3
const MAX_SIGNATURE_LENGTH = 30
const SIGNATURE_PATTERN = /^[a-z0-9_]+$/

/**
 * Normalizes a full name into a base signature
 *
 * This function takes a user's full name and converts it to a normalized
 * base signature by:
 * 1. Converting to lowercase
 * 2. Trimming whitespace
 * 3. Replacing spaces with underscores
 * 4. Removing any non-alphanumeric characters
 *
 * @param full_name - The user's full name to normalize
 * @returns The normalized base signature
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
    throw new Error('Normalized signature cannot be empty')
  }

  return normalized
}

/**
 * Generates a unique signature by combining the base signature with a counter
 *
 * This function creates a unique signature by appending a numeric counter
 * to the base signature, separated by an underscore.
 *
 * @param base_signature - The normalized base signature
 * @param counter - The numeric counter to append
 * @returns The generated unique signature
 * @throws Error if the base signature is invalid
 */
export function generateUniqueSignature(
  base_signature: string,
  counter: number,
): string {
  if (!base_signature) {
    throw new Error('Base signature is required')
  }

  if (typeof counter !== 'number' || counter < 0) {
    throw new Error('Counter must be a non-negative number')
  }

  return `${base_signature}_${counter}`
}

/**
 * Validates a generated signature against defined rules
 *
 * This function checks if a signature meets the following criteria:
 * 1. Contains only lowercase letters, numbers, and underscores
 * 2. Has a length between MIN_SIGNATURE_LENGTH and MAX_SIGNATURE_LENGTH
 *
 * @param signature - The signature to validate
 * @returns true if the signature is valid, false otherwise
 */
export function validateSignature(signature: string): boolean {
  if (!signature) {
    return false
  }

  // Check length constraints
  if (
    signature.length < MIN_SIGNATURE_LENGTH ||
    signature.length > MAX_SIGNATURE_LENGTH
  ) {
    return false
  }

  // Check character constraints using regex pattern
  return SIGNATURE_PATTERN.test(signature)
}
