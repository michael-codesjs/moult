import { withLambdaIOStandard } from '@shared'
import { GENERATE_USERNAME_DOMAIN_COMMAND } from '@domain/events/types'
import { CommonInputHandler, withCommonInput } from '@shared'
import { UsernameAssignmentDTO } from '@domain/models'
import { generateUsername } from '@use-cases/username'

/**
 * Maps the incoming event to the domain model and processes the username generation
 *
 * This function extracts the necessary data from the incoming event,
 * calls the username generation use case, and returns the result.
 *
 * @param input - The incoming event containing user data
 * @returns Promise resolving to the username assignment
 */
export const inputMapper = async (
  input: GENERATE_USERNAME_DOMAIN_COMMAND,
): Promise<UsernameAssignmentDTO> => {
  try {
    console.log('Processing USER_CREATED event', input)

    // Extract required fields from the event payload
    const { name, id } = input.payload

    if (!name || !id) {
      throw new Error('Missing required fields: name and id must be provided')
    }

    // Call the username generation use case
    const result = await generateUsername({
      user_id: id,
      full_name: name,
    })

    // Log success (minimal information for tracing)
    console.log('Username generation completed successfully', {
      userId: id,
      username: result.username,
    })

    return result
  } catch (error) {
    // Log detailed error information
    console.error('Username generation failed in handler', {
      errorMessage: error.message,
      errorName: error.name,
      errorStack: error.stack,
      source: input?.source,
      userId: input?.payload?.id,
    })

    // Rethrow the error to be handled by the Lambda middleware
    throw new Error(`Username generation failed: ${error.message}`)
  }
}

/**
 * Lambda handler for the generate-username function
 *
 * This handler processes USER_CREATED events from EventBridge
 * and generates unique usernames for new users.
 */
export const handler: CommonInputHandler<
  GENERATE_USERNAME_DOMAIN_COMMAND,
  UsernameAssignmentDTO
> = withCommonInput(inputMapper, { singular: true as true })

/**
 * Main Lambda function handler with standard IO middleware
 *
 * This is the entry point for the Lambda function, wrapped with
 * middleware for standardized input/output handling and logging.
 */
export const main = withLambdaIOStandard(handler)
