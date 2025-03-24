import {
  withLambdaIOStandard,
  CommonInputHandler,
  withCommonInput,
} from '@shared'
import { USERNAME_GENERATED_DOMAIN_EVENT } from '../../../types/domain-events'
import { assignUsername } from '@use-cases/assign-username'

/**
 * Maps the incoming event to the domain model and processes the username assignment
 *
 * This function extracts the necessary data from the incoming event,
 * calls the username assignment use case, and returns the result.
 *
 * @param input - The incoming event containing username data
 * @returns Promise resolving when the username is assigned
 */
export const inputMapper = async (
  input: USERNAME_GENERATED_DOMAIN_EVENT,
): Promise<void> => {
  try {
    // Log the incoming event (sanitized for security)
    console.log('Processing USERNAME_GENERATED event', {
      source: input.source,
      name: input.name,
      userId: input.payload?.user_id,
      username: input.payload?.username,
    })

    // Extract required fields from the event payload
    const { user_id, username } = input.payload

    if (!user_id || !username) {
      throw new Error(
        'Missing required fields: user_id and username must be provided',
      )
    }

    // Call the username assignment use case
    await assignUsername({
      user_id,
      username,
    })

    // Log success (minimal information for tracing)
    console.log('Username assignment completed successfully', {
      user_id,
      username,
    })
  } catch (error) {
    // Log detailed error information
    console.error('Username assignment failed in handler', {
      error_message: error.message,
      error_name: error.name,
      error_stack: error.stack,
      source: input?.source,
      user_id: input?.payload?.user_id,
    })

    // Rethrow the error to be handled by the Lambda middleware
    throw new Error(`Username assignment failed: ${error.message}`)
  }
}

/**
 * Lambda handler for the assign-username function
 *
 * This handler processes USERNAME_GENERATED events from EventBridge
 * and assigns the generated username to the corresponding Cognito user.
 */
export const handler: CommonInputHandler<
  USERNAME_GENERATED_DOMAIN_EVENT,
  void
> = withCommonInput(inputMapper, { singular: true as true })

/**
 * Main Lambda function handler with standard IO middleware
 *
 * This is the entry point for the Lambda function, wrapped with
 * middleware for standardized input/output handling and logging.
 */
export const main = withLambdaIOStandard(handler)
