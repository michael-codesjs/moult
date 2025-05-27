import {
  withLambdaIOStandard,
  CommonInputHandler,
  withCommonInput,
} from '@moult/sdk'
import { USER_UPDATED_DOMAIN_EVENT } from '../../../types/domain-events'
import { updateCognitoUser } from '@use-cases'

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
  input: USER_UPDATED_DOMAIN_EVENT,
): Promise<void> => {
  try {
    console.log('Processing USERNAME_GENERATED event', {
      input,
    })

    // Extract required fields from the event payload
    const { id } = input
    input.payload

    await updateCognitoUser({
      id,
      ...input.payload,
    })

    // Call the username assignment use case
  } catch (error) {
    // Log detailed error information
    console.error('Username assignment failed in handler', {
      error_message: error.message,
      error_name: error.name,
      error_stack: error.stack,
      source: input?.source,
      user_id: input?.payload?.id,
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
export const handler: CommonInputHandler<USER_UPDATED_DOMAIN_EVENT, void> =
  withCommonInput(inputMapper, { singular: true as true })

/**
 * Main Lambda function handler with standard IO middleware
 *
 * This is the entry point for the Lambda function, wrapped with
 * middleware for standardized input/output handling and logging.
 */
export const main = withLambdaIOStandard(handler)
