import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Table } from 'dynamodb-onetable'
import { Dynamo } from 'dynamodb-onetable/Dynamo'
import { configureEnviromentVariables } from '@shared'

// Environment configuration
const { USERNAME_COUNTS_TABLE, REGION = 'eu-central-1' } =
  configureEnviromentVariables()

// Schema definition for the username counts table
const SCHEMA = {
  format: 'onetable:1.1.0',
  version: '0.0.1',
  indexes: {
    primary: { hash: 'base_username' },
  },
  models: {
    UsernameCount: {
      base_username: { type: String, required: true },
      count: { type: Number, default: 0 },
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
  name: USERNAME_COUNTS_TABLE,
  client,
  schema: SCHEMA,
  partial: true,
})

// Get the model for username counts
const UsernameCount = table.getModel('UsernameCount')

/**
 * Increments and returns the counter for a given base username
 *
 * This function performs an atomic increment operation on the counter
 * for a specific base username. If the counter doesn't exist, it will
 * be created with an initial value of 0 and then incremented to 1.
 *
 * @param base_username - The normalized base username to increment counter for
 * @returns Promise resolving to the new counter value
 * @throws Error if the counter operation fails
 */
export async function incrementUsernameCounter(
  base_username: string,
): Promise<number> {
  if (!base_username) {
    throw new Error('Base username is required')
  }

  try {
    // Use OneTable's upsert method for atomic increment
    const result = await UsernameCount.upsert(
      {
        base_username,
        count: 0, // Initial value if created
      },
      {
        add: { count: 1 }, // Increment by 1
        return: 'UPDATED_NEW', // Return only updated values
      },
    )

    if (!result || typeof result.count !== 'number') {
      throw new Error('Failed to increment counter: Invalid response')
    }

    // Log minimal information for tracing
    console.log(`Counter incremented for "${base_username}"`, {
      newCount: result.count,
    })

    return result.count
  } catch (error) {
    // Log detailed error information
    console.error(`Failed to increment counter for "${base_username}"`, {
      tableName: table.name,
      region: REGION,
      errorMessage: error.message,
      errorName: error.name,
    })

    // Rethrow with clear error message
    throw new Error(`Failed to increment username counter: ${error.message}`)
  }
}

/**
 * Gets the current counter value for a base username
 *
 * This function retrieves the current counter value without incrementing it.
 * If no counter exists for the base username, it returns 0.
 *
 * @param base_username - The normalized base username to get counter for
 * @returns Promise resolving to the current counter value
 */
export async function getCurrentCounter(
  base_username: string,
): Promise<number> {
  if (!base_username) {
    return 0
  }

  try {
    const result = await UsernameCount.get({ base_username })
    return result?.count || 0
  } catch (error) {
    console.error(`Failed to get counter for "${base_username}"`, {
      errorMessage: error.message,
    })
    return 0
  }
}
