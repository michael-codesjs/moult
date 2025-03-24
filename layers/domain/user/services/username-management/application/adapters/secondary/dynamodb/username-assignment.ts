import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Table } from 'dynamodb-onetable'
import { Dynamo } from 'dynamodb-onetable/Dynamo'
import { UsernameAssignmentDTO } from '@domain/models'
import { configureEnviromentVariables } from '@shared'
import { v4 as uuidv4 } from 'uuid'

// Environment configuration
const { USERNAME_ASSIGNMENTS_TABLE, REGION = 'eu-central-1' } =
  configureEnviromentVariables()

// Schema definition for the username assignments table
const SCHEMA = {
  format: 'onetable:1.1.0',
  version: '0.0.1',
  indexes: {
    primary: { hash: 'username' },
    user: { hash: 'user_id', name: 'UserIdIndex' },
    base: { hash: 'basename', name: 'BaseUsernameIndex' },
  },
  models: {
    UsernameAssignment: {
      entity_type: {
        type: String,
        required: true,
        default: 'USERNAME_ASSIGNMENT',
      },
      id: {
        type: String,
        required: true,
        default: () => uuidv4(),
      },
      creator_type: {
        type: String,
        required: true,
        default: 'USERNAME_ASSIGNMENT',
      },
      creator: { type: String, required: true, default: 'system' },
      created: { type: Date, required: true, default: () => new Date() },
      modified: { type: Date, required: true, default: () => new Date() },
      discontinued: { type: Boolean, required: true, default: false },
      username: { type: String, required: true },
      basename: { type: String, required: true },
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
  name: USERNAME_ASSIGNMENTS_TABLE,
  client,
  schema: SCHEMA,
  partial: true,
})

// Get the model for username assignments
const UsernameAssignment = table.getModel('UsernameAssignment')

/**
 * Creates a new username assignment record
 *
 * This function persists a username assignment to DynamoDB, ensuring
 * that the username is unique and all required fields are present.
 *
 * @param assignment - The username assignment to create
 * @returns Promise resolving to the created username assignment
 * @throws Error if the assignment creation fails
 */
export async function createUsernameAssignment(
  assignment: UsernameAssignmentDTO,
): Promise<UsernameAssignmentDTO> {
  try {
    if (!assignment.username) {
      throw new Error('Username is required for username assignment')
    }

    if (!assignment.user_id) {
      throw new Error('User ID is required for username assignment')
    }

    // Prepare the assignment data with required fields
    const assignment_data = {
      ...assignment,
      entity_type: 'USERNAME_ASSIGNMENT',
      creator_type: 'USERNAME_ASSIGNMENT',
      // Ensure required fields
      id: assignment.id || uuidv4(),
      creator: assignment.creator || 'USERNAME_MANAGEMENT_SERVICE',
      created: assignment.created || new Date(),
      modified: assignment.modified || new Date(),
      discontinued:
        assignment.discontinued !== undefined ? assignment.discontinued : false,
    }

    // Log minimal information for tracing
    console.log(`Creating username assignment for user ${assignment.user_id}`, {
      username: assignment.username,
      basename: assignment.basename,
    })

    // Use OneTable's create method with exists: false to ensure it doesn't already exist
    const result = await UsernameAssignment.create(assignment_data, {
      exists: false,
    })

    if (!result) {
      throw new Error(
        'Failed to create username assignment: No result returned',
      )
    }

    // Log success
    console.log(`Username assignment created successfully`, {
      username: result.username,
      userId: result.user_id,
    })

    return result as UsernameAssignmentDTO
  } catch (error) {
    // Log detailed error information
    console.error('Failed to create username assignment', {
      username: assignment?.username,
      userId: assignment?.user_id,
      errorMessage: error.message,
      errorName: error.name,
      tableName: table.name,
    })

    // Rethrow with clear error message
    throw new Error(`Failed to create username assignment: ${error.message}`)
  }
}

/**
 * Gets all username assignments for a user
 *
 * This function retrieves all username assignments associated with a specific user ID.
 *
 * @param user_id - The user ID to get assignments for
 * @returns Promise resolving to an array of username assignments
 */
export async function getUsernameAssignments(
  user_id: string,
): Promise<UsernameAssignmentDTO[]> {
  if (!user_id) {
    throw new Error('User ID is required to get username assignments')
  }

  try {
    // Log the query
    console.log(`Retrieving username assignments for user ${user_id}`)

    // Use OneTable's find method to query the UserIdIndex
    const results = await UsernameAssignment.find(
      { user_id },
      { index: 'user' },
    )

    // Log the results count
    console.log(
      `Found ${results?.length || 0} username assignments for user ${user_id}`,
    )

    return (results as UsernameAssignmentDTO[]) || []
  } catch (error) {
    // Log detailed error information
    console.error(`Failed to get username assignments for user ${user_id}`, {
      errorMessage: error.message,
      errorName: error.name,
      tableName: table.name,
    })

    return []
  }
}

/**
 * Gets all assignments for a base username
 *
 * This function retrieves all username assignments that share the same base username.
 *
 * @param basename - The base username to get assignments for
 * @returns Promise resolving to an array of username assignments
 */
export async function getBaseUsernameAssignments(
  basename: string,
): Promise<UsernameAssignmentDTO[]> {
  if (!basename) {
    throw new Error('Base username is required to get assignments')
  }

  try {
    // Log the query
    console.log(`Retrieving assignments for base username ${basename}`)

    // Use OneTable's find method to query the BaseUsernameIndex
    const results = await UsernameAssignment.find(
      { basename },
      { index: 'base' },
    )

    // Log the results count
    console.log(
      `Found ${results?.length || 0} assignments for base username ${basename}`,
    )

    return (results as UsernameAssignmentDTO[]) || []
  } catch (error) {
    // Log detailed error information
    console.error(`Failed to get assignments for base username ${basename}`, {
      errorMessage: error.message,
      errorName: error.name,
      tableName: table.name,
    })

    return []
  }
}
