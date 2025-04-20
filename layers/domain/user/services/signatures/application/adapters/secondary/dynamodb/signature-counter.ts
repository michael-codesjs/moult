import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Table } from 'dynamodb-onetable'
import { Dynamo } from 'dynamodb-onetable/Dynamo'
import { configureEnviromentVariables } from '@shared'

// Environment configuration
const { SIGNATURE_COUNTS_TABLE, REGION = 'eu-central-1' } =
  configureEnviromentVariables()

// Schema definition for the signature counts table
const SCHEMA = {
  format: 'onetable:1.1.0',
  version: '0.0.1',
  indexes: {
    primary: { hash: 'base_signature' },
  },
  models: {
    SignatureCount: {
      base_signature: { type: String, required: true },
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
  name: SIGNATURE_COUNTS_TABLE,
  client,
  schema: SCHEMA,
  partial: true,
})

// Get the model for signature counts
const SignatureCount = table.getModel('SignatureCount')

/**
 * Increments and returns the counter for a given base signature
 *
 * This function performs an atomic increment operation on the counter
 * for a specific base signature. If the counter doesn't exist, it will
 * be created with an initial value of 0 and then incremented to 1.
 *
 * @param base_signature - The normalized base signature to increment counter for
 * @returns Promise resolving to the new counter value
 * @throws Error if the counter operation fails
 */
export async function incrementSignatureCounter(
  base_signature: string,
): Promise<number> {
  if (!base_signature) {
    throw new Error('Base signature is required')
  }

  try {
    // Use OneTable's upsert method for atomic increment
    const result = await SignatureCount.upsert(
      {
        base_signature,
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
    console.log(`Counter incremented for "${base_signature}"`, {
      newCount: result.count,
    })

    return result.count
  } catch (error) {
    // Log detailed error information
    console.error(`Failed to increment counter for "${base_signature}"`, {
      tableName: table.name,
      region: REGION,
      errorMessage: error.message,
      errorName: error.name,
    })

    // Rethrow with clear error message
    throw new Error(`Failed to increment signature counter: ${error.message}`)
  }
}

/**
 * Gets the current counter value for a base signature
 *
 * This function retrieves the current counter value without incrementing it.
 * If no counter exists for the base signature, it returns 0.
 *
 * @param base_signature - The normalized base signature to get counter for
 * @returns Promise resolving to the current counter value
 */
export async function getCurrentCounter(
  base_signature: string,
): Promise<number> {
  if (!base_signature) {
    return 0
  }

  try {
    const result = await SignatureCount.get({ base_signature })
    return result?.count || 0
  } catch (error) {
    console.error(`Failed to get counter for "${base_signature}"`, {
      errorMessage: error.message,
    })
    return 0
  }
}
