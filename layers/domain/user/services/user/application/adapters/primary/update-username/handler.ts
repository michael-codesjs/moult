import 'reflect-metadata'
import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@shared'
import { UserDTO } from '@domain/models'
import { container, dependencies } from '@dependencies'
import { UserUseCase } from '@interfaces'

/**
 * Type definition for the USERNAME_GENERATED event
 */
type USERNAME_GENERATED_DOMAIN_EVENT = {
  id: string
  source: string
  name: string
  payload: {
    entity_type: string
    id: string
    creator_type: string
    creator: string
    created: string
    modified: string
    discontinued: boolean
    username: string
    basename: string
    counter: number
    user_id: string
    generated_at: string
    status: string
  }
  version: number
  date: string
}

/**
 * Maps the incoming event to the domain model and processes the username update
 *
 * This function extracts the necessary data from the incoming event,
 * calls the user update use case, and returns the result.
 *
 * @param input - The incoming event containing username data
 * @returns Promise resolving to the updated user
 */
const inputMapper = async (
  input: USERNAME_GENERATED_DOMAIN_EVENT,
): Promise<UserDTO> => {
  try {
    // Log the incoming event (sanitized for security)
    console.log('Processing USERNAME_GENERATED event', {
      source: input.source,
      name: input.name,
      user_id: input.payload?.user_id,
      username: input.payload?.username,
    })

    // Extract required fields from the event payload
    const { user_id, username } = input.payload

    if (!user_id || !username) {
      throw new Error(
        'Missing required fields: user_id and username must be provided',
      )
    }

    // Get the user use case from the container
    const user_use_case: UserUseCase = container.get(dependencies.UserUseCase)

    // Update the user with the generated username
    const updated_user = await user_use_case.updateUsername({
      id: user_id,
      username: username,
    })

    // Log success (minimal information for tracing)
    console.log('Username update completed successfully', {
      user_id,
      username,
    })

    return updated_user
  } catch (error) {
    // Log detailed error information
    console.error('Username update failed in handler', {
      error_message: error.message,
      error_name: error.name,
      error_stack: error.stack,
      source: input?.source,
      user_id: input?.payload?.user_id,
    })

    // Rethrow the error to be handled by the Lambda middleware
    throw new Error(`Username update failed: ${error.message}`)
  }
}

/**
 * Lambda handler for the update-username function
 *
 * This handler processes USERNAME_GENERATED events from EventBridge
 * and updates the user with the generated username.
 */
export const handler: CommonInputHandler<
  USERNAME_GENERATED_DOMAIN_EVENT,
  UserDTO
> = withCommonInput(inputMapper, { singular: true as true })

/**
 * Main Lambda function handler with standard IO middleware
 *
 * This is the entry point for the Lambda function, wrapped with
 * middleware for standardized input/output handling and logging.
 */
export const main = withLambdaIOStandard(handler)
