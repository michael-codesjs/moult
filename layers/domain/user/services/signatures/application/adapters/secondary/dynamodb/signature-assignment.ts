import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Table } from 'dynamodb-onetable'
import { Dynamo } from 'dynamodb-onetable/Dynamo'
import { SignatureAssignmentDTO } from '@domain/models'
import { configureEnviromentVariables } from '@shared'
import { v4 as uuidv4 } from 'uuid'

// Environment configuration
const { SIGNATURE_ASSIGNMENTS_TABLE, REGION = 'eu-central-1' } =
  configureEnviromentVariables()

// Schema definition for the signature assignments table
const SCHEMA = {
  format: 'onetable:1.1.0',
  version: '0.0.1',
  indexes: {
    primary: { hash: 'signature' },
    user: { hash: 'user_id', name: 'UserIdIndex' },
    base: { hash: 'base_signature', name: 'BaseSignatureIndex' },
  },
  models: {
    SignatureAssignment: {
      entity_type: {
        type: String,
        required: true,
        default: 'SIGNATURE_ASSIGNMENT',
      },
      id: {
        type: String,
        required: true,
        default: () => uuidv4(),
      },
      creator_type: {
        type: String,
        required: true,
        default: 'SIGNATURE_ASSIGNMENT',
      },
      creator: { type: String, required: true, default: 'system' },
      created: { type: Date, required: true, default: () => new Date() },
      modified: { type: Date, required: true, default: () => new Date() },
      discontinued: { type: Boolean, required: true, default: false },
      signature: { type: String, required: true },
      base_signature: { type: String, required: true },
      counter: { type: Number, required: false },
      user_id: { type: String, required: true },
      generated_at: { type: String, required: false },
      status: { type: String, required: false },
    },
  },
}

/**
 * Initialize DynamoDB client with OneTable
 *
 * This creates a singleton instance of the DynamoDB client and OneTable
 * to be reused across Lambda invocations for better performance.
 */
const client = new Dynamo({
  client: new DynamoDBClient({ region: REGION }),
})

// Initialize the table with the schema
const table = new Table({
  name: SIGNATURE_ASSIGNMENTS_TABLE,
  client,
  schema: SCHEMA,
  partial: true,
})

// Get the model for signature assignments
const SignatureAssignment = table.getModel('SignatureAssignment')

/**
 * Creates a new signature assignment record
 *
 * This function persists a signature assignment to DynamoDB, ensuring
 * that the signature is unique and all required fields are present.
 *
 * @param assignment - The signature assignment to create
 * @returns Promise resolving to the created signature assignment
 * @throws Error if the assignment creation fails
 */
export async function createSignatureAssignment(
  assignment: SignatureAssignmentDTO,
): Promise<SignatureAssignmentDTO> {
  try {
    if (!assignment.signature) {
      throw new Error('Signature is required for signature assignment')
    }

    if (!assignment.user_id) {
      throw new Error('User ID is required for signature assignment')
    }

    // Prepare the assignment data with required fields
    const assignment_data = {
      ...assignment,
      entity_type: 'SIGNATURE_ASSIGNMENT',
      creator_type: 'SIGNATURE_ASSIGNMENT',
      // Ensure required fields
      id: assignment.id || uuidv4(),
      creator: assignment.creator || 'SIGNATURE_MANAGEMENT_SERVICE',
      created: assignment.created || new Date(),
      modified: assignment.modified || new Date(),
      discontinued:
        assignment.discontinued !== undefined ? assignment.discontinued : false,
    }

    // Log minimal information for tracing
    console.log(
      `Creating signature assignment for user ${assignment.user_id}`,
      {
        signature: assignment.signature,
        baseSignature: assignment.base_signature,
      },
    )

    // Use OneTable's create method with exists: false to ensure it doesn't already exist
    const result = await SignatureAssignment.create(assignment_data, {
      exists: false,
    })

    if (!result) {
      throw new Error(
        'Failed to create signature assignment: No result returned',
      )
    }

    // Log success
    console.log(`Signature assignment created successfully`, {
      signature: result.signature,
      userId: result.user_id,
    })

    return result as SignatureAssignmentDTO
  } catch (error) {
    // Log detailed error information
    console.error('Failed to create signature assignment', {
      signature: assignment?.signature,
      userId: assignment?.user_id,
      errorMessage: error.message,
      errorName: error.name,
      tableName: table.name,
    })

    // Rethrow with clear error message
    throw new Error(`Failed to create signature assignment: ${error.message}`)
  }
}

/**
 * Gets all signature assignments for a user
 *
 * This function retrieves all signature assignments associated with a specific user ID.
 *
 * @param user_id - The user ID to get assignments for
 * @returns Promise resolving to an array of signature assignments
 */
export async function getSignatureAssignments(
  user_id: string,
): Promise<SignatureAssignmentDTO[]> {
  if (!user_id) {
    throw new Error('User ID is required to get signature assignments')
  }

  try {
    // Log the query
    console.log(`Retrieving signature assignments for user ${user_id}`)

    // Use OneTable's find method to query the UserIdIndex
    const results = await SignatureAssignment.find(
      { user_id },
      { index: 'user' },
    )

    // Log the results count
    console.log(
      `Found ${results?.length || 0} signature assignments for user ${user_id}`,
    )

    return (results as SignatureAssignmentDTO[]) || []
  } catch (error) {
    // Log detailed error information
    console.error(`Failed to get signature assignments for user ${user_id}`, {
      errorMessage: error.message,
      errorName: error.name,
      tableName: table.name,
    })

    return []
  }
}

/**
 * Gets all assignments for a base signature
 *
 * This function retrieves all signature assignments that share the same base signature.
 *
 * @param base_signature - The base signature to get assignments for
 * @returns Promise resolving to an array of signature assignments
 */
export async function getBaseSignatureAssignments(
  base_signature: string,
): Promise<SignatureAssignmentDTO[]> {
  if (!base_signature) {
    throw new Error('Base signature is required to get assignments')
  }

  try {
    // Log the query
    console.log(`Retrieving assignments for base signature ${base_signature}`)

    // Use OneTable's find method to query the BaseSignatureIndex
    const results = await SignatureAssignment.find(
      { base_signature },
      { index: 'base' },
    )

    // Log the results count
    console.log(
      `Found ${results?.length || 0} assignments for base signature ${base_signature}`,
    )

    return (results as SignatureAssignmentDTO[]) || []
  } catch (error) {
    // Log detailed error information
    console.error(
      `Failed to get assignments for base signature ${base_signature}`,
      {
        errorMessage: error.message,
        errorName: error.name,
        tableName: table.name,
      },
    )

    return []
  }
}
