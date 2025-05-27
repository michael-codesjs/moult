import { v4 as uuidv4 } from 'uuid'
import { SIGNATURE_GENERATED_DOMAIN_EVENT } from '@domain/events/types'
import { SignatureAssignmentDTO } from '@domain/models'
import {
  normalizeFullName,
  generateUniqueSignature,
  validateSignature,
} from '../domain/utils/signature'
import { incrementSignatureCounter } from '../adapters/secondary/dynamodb/signature-counter'
import {
  createSignatureAssignment,
  getSignatureAssignmentBySignature,
} from '../adapters/secondary/dynamodb/signature-assignment'
import { publishUserSignatureGenerated } from '@adapters/secondary/events/event-bridge/adapter'

/**
 * Input parameters for signature generation
 */
type GenerateSignatureInput = {
  full_name: string
  user_id: string
}

/**
 * Input parameters for custom signature assignment creation
 */
type CustomCreateAssignmentInput = {
  signature: string
  user_id: string
}

/**
 * Result of the custom assignment creation
 */
type CustomCreateAssignmentResult = {
  assignment: SignatureAssignmentDTO | null
  exists: boolean
  message: string
}

/**
 * Generates a unique signature for a user and publishes an event
 *
 * This use case handles the complete flow of signature generation:
 * 1. Normalizes the user's full name to create a base signature
 * 2. Increments a counter for the base signature to ensure uniqueness
 * 3. Generates a unique signature by combining the base and counter
 * 4. Validates the generated signature
 * 5. Creates a signature assignment record in the database
 * 6. Publishes a domain event for the generated signature
 *
 * @param props - Input containing user ID and full name
 * @returns Promise resolving to the created signature assignment
 * @throws Error if any step in the process fails
 */
export const generateSignature = async (
  props: GenerateSignatureInput,
): Promise<SignatureAssignmentDTO> => {
  const { full_name, user_id } = props

  if (!full_name) {
    throw new Error('Full name is required for signature generation')
  }

  if (!user_id) {
    throw new Error('User ID is required for signature generation')
  }

  try {
    // Step 1: Normalize the full name to create a base signature
    const base_signature = normalizeFullName(full_name)

    // Step 2: Increment the counter for this base signature
    const counter = await incrementSignatureCounter(base_signature)

    // Step 3: Generate a unique signature
    const signature = generateUniqueSignature(base_signature, counter)

    // Step 4: Validate the generated signature
    if (!validateSignature(signature)) {
      throw new Error(`Generated signature "${signature}" is invalid`)
    }

    // Log the generated signature (useful for debugging)
    console.log('Signature generated successfully', {
      userId: user_id,
      signature,
      baseSignature: base_signature,
      counter,
    })

    // Step 5: Create the signature assignment record
    const assignment: SignatureAssignmentDTO = {
      entity_type: 'SIGNATURE_ASSIGNMENT',
      id: uuidv4(),
      creator_type: 'SIGNATURE_ASSIGNMENT',
      creator: 'SIGNATURE_MANAGEMENT_SERVICE',
      created: new Date(),
      modified: new Date(),
      discontinued: false,
      signature,
      base_signature,
      counter,
      user_id,
      generated_at: new Date().toISOString(),
      status: 'IN_ACTIVE', // Initial status
    }

    // Persist the assignment to the database
    const assignment_result = await createSignatureAssignment(assignment)

    // Step 6: Create and publish the domain event
    const domain_event: SIGNATURE_GENERATED_DOMAIN_EVENT = {
      id: uuidv4(),
      source: 'SIGNATURE_MANAGEMENT',
      name: 'SIGNATURE_GENERATED',
      payload: assignment_result,
      date: new Date(),
    }

    // Publish the event asynchronously
    await publishUserSignatureGenerated(domain_event)

    return assignment_result
  } catch (error) {
    // Log the error with context
    console.error('Signature generation failed', {
      userId: user_id,
      fullName: full_name,
      errorMessage: error.message,
      errorStack: error.stack,
    })

    // Rethrow with clear error message
    throw new Error(`Failed to generate signature: ${error.message}`)
  }
}

/**
 * Creates a custom signature assignment for a user with a specific signature
 *
 * This use case handles the complete flow of custom signature assignment:
 * 1. Validates the provided signature
 * 2. Checks if the signature is already assigned to another user
 * 3. If available, creates a new signature assignment record
 * 4. Publishes a domain event for the generated signature
 *
 * @param props - Input containing user ID and desired signature
 * @returns Promise resolving to the result with assignment info and status
 * @throws Error if validation fails or required parameters are missing
 */
export const customCreateAssignment = async (
  props: CustomCreateAssignmentInput,
): Promise<CustomCreateAssignmentResult> => {
  const { signature, user_id } = props

  if (!signature) {
    throw new Error('Signature is required for custom assignment creation')
  }

  if (!user_id) {
    throw new Error('User ID is required for custom assignment creation')
  }

  try {
    // Step 1: Validate the provided signature
    if (!validateSignature(signature)) {
      throw new Error(`Provided signature "${signature}" is invalid`)
    }

    // Step 2: Check if the signature is already assigned
    const existing_assignment =
      await getSignatureAssignmentBySignature(signature)

    if (existing_assignment) {
      console.log('Signature already exists', {
        signature,
        existingUserId: existing_assignment.user_id,
        requestedUserId: user_id,
      })

      return {
        assignment: null,
        exists: true,
        message: `Signature "${signature}" is already taken`,
      }
    }

    // Step 3: Create the signature assignment record
    const assignment: SignatureAssignmentDTO = {
      entity_type: 'SIGNATURE_ASSIGNMENT',
      id: uuidv4(),
      creator_type: 'SIGNATURE_ASSIGNMENT',
      creator: 'CUSTOM_ASSIGNMENT_SERVICE',
      created: new Date(),
      modified: new Date(),
      discontinued: false,
      signature: signature,
      base_signature: signature.toLowerCase(), // Use lowercase as base
      counter: 0, // Custom assignments don't use counters
      user_id,
      generated_at: new Date().toISOString(),
      status: 'ACTIVE', // Custom assignments are immediately active
    }

    // Persist the assignment to the database
    const assignment_result = await createSignatureAssignment(assignment)

    // Log the successful assignment
    console.log('Custom signature assignment created successfully', {
      userId: user_id,
      signature,
      assignmentId: assignment_result.id,
    })

    // Step 4: Create and publish the domain event
    const domain_event: SIGNATURE_GENERATED_DOMAIN_EVENT = {
      id: uuidv4(),
      source: 'CUSTOM_ASSIGNMENT_MANAGEMENT',
      name: 'SIGNATURE_GENERATED',
      payload: assignment_result,
      date: new Date(),
    }

    // Publish the event asynchronously
    await publishUserSignatureGenerated(domain_event)

    return {
      assignment: assignment_result,
      exists: false,
      message: `Signature "${signature}" assigned successfully`,
    }
  } catch (error) {
    // Log the error with context
    console.error('Custom assignment creation failed', {
      userId: user_id,
      signature,
      errorMessage: error.message,
      errorStack: error.stack,
    })

    // Rethrow with clear error message
    throw new Error(`Failed to create custom assignment: ${error.message}`)
  }
}
