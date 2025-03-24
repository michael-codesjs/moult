import { v4 as uuidv4 } from 'uuid'
import { USERNAME_GENERATED_DOMAIN_EVENT } from '@domain/events/types'
import { UsernameAssignmentDTO } from '@domain/models'
import {
  normalizeFullName,
  generateUniqueUsername,
  validateUsername,
} from '../domain/utils/username'
import { incrementUsernameCounter } from '../adapters/secondary/dynamodb/username-counter'
import { createUsernameAssignment } from '../adapters/secondary/dynamodb/username-assignment'
import { publishUserUsernameGenerated } from '@adapters/secondary/events/event-bridge/adapter'

/**
 * Input parameters for username generation
 */
type GenerateUsernameInput = {
  full_name: string
  user_id: string
}

/**
 * Generates a unique username for a user and publishes an event
 *
 * This use case handles the complete flow of username generation:
 * 1. Normalizes the user's full name to create a base username
 * 2. Increments a counter for the base username to ensure uniqueness
 * 3. Generates a unique username by combining the base and counter
 * 4. Validates the generated username
 * 5. Creates a username assignment record in the database
 * 6. Publishes a domain event for the generated username
 *
 * @param props - Input containing user ID and full name
 * @returns Promise resolving to the created username assignment
 * @throws Error if any step in the process fails
 */
export const generateUsername = async (
  props: GenerateUsernameInput,
): Promise<UsernameAssignmentDTO> => {
  const { full_name, user_id } = props

  if (!full_name) {
    throw new Error('Full name is required for username generation')
  }

  if (!user_id) {
    throw new Error('User ID is required for username generation')
  }

  try {
    // Step 1: Normalize the full name to create a base username
    const base_username = normalizeFullName(full_name)

    // Step 2: Increment the counter for this base username
    const counter = await incrementUsernameCounter(base_username)

    // Step 3: Generate a unique username
    const username = generateUniqueUsername(base_username, counter)

    // Step 4: Validate the generated username
    if (!validateUsername(username)) {
      throw new Error(`Generated username "${username}" is invalid`)
    }

    // Log the generated username (useful for debugging)
    console.log('Username generated successfully', {
      userId: user_id,
      username,
      baseUsername: base_username,
      counter,
    })

    // Step 5: Create the username assignment record
    const assignment: UsernameAssignmentDTO = {
      entity_type: 'USERNAME_ASSIGNMENT',
      id: uuidv4(),
      creator_type: 'USERNAME_ASSIGNMENT',
      creator: 'USERNAME_MANAGEMENT_SERVICE',
      created: new Date(),
      modified: new Date(),
      discontinued: false,
      username,
      basename: base_username,
      counter,
      user_id,
      generated_at: new Date().toISOString(),
      status: 'IN_ACTIVE', // Initial status
    }

    // Persist the assignment to the database
    const assignment_result = await createUsernameAssignment(assignment)

    // Step 6: Create and publish the domain event
    const domain_event: USERNAME_GENERATED_DOMAIN_EVENT = {
      id: uuidv4(),
      source: 'USERNAME_MANAGEMENT',
      name: 'USERNAME_GENERATED',
      payload: assignment_result,
      version: 1,
      date: new Date(),
    }

    // Publish the event asynchronously
    await publishUserUsernameGenerated(domain_event)

    return assignment_result
  } catch (error) {
    // Log the error with context
    console.error('Username generation failed', {
      userId: user_id,
      fullName: full_name,
      errorMessage: error.message,
      errorStack: error.stack,
    })

    // Rethrow with clear error message
    throw new Error(`Failed to generate username: ${error.message}`)
  }
}
