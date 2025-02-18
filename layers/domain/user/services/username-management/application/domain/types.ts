/** Represents a request to generate a unique username */
export interface GenerateUsernameRequest {
  /** The full name to generate a username from */
  fullName: string;
  /** Optional user ID if updating an existing user */
  userId?: string;
}

/** Represents the response from generating a unique username */
export interface GenerateUsernameResponse {
  /** The generated unique username */
  username: string;
  /** The base username before counter was added */
  baseUsername: string;
  /** The counter value used */
  counter: number;
  /** The user ID the username was generated for */
  userId?: string;
  /** Timestamp when the username was generated */
  generatedAt: string;
}

/** Represents a username assignment record */
export interface UsernameAssignment {
  /** The generated username */
  username: string;
  /** The base username used */
  baseUsername: string;
  /** The counter value used */
  counter: number;
  /** The user ID the username was generated for */
  userId: string;
  /** Timestamp when the username was generated */
  generatedAt: string;
  /** Status of the username assignment */
  status: UsernameAssignmentStatus;
}

/** Status of a username assignment */
export enum UsernameAssignmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

/** Represents an error that occurred during username generation */
export class UsernameGenerationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'UsernameGenerationError';
  }
}

/** Error codes for username generation */
export enum UsernameGenerationErrorCode {
  INVALID_FULL_NAME = 'INVALID_FULL_NAME',
  COUNTER_UPDATE_FAILED = 'COUNTER_UPDATE_FAILED',
  USERNAME_STORAGE_FAILED = 'USERNAME_STORAGE_FAILED',
  USERNAME_ASSIGNMENT_FAILED = 'USERNAME_ASSIGNMENT_FAILED'
} 