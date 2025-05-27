import 'reflect-metadata'
import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@moult/sdk'
import { UserDTO } from '@domain/models'
import { container, dependencies } from '@dependencies'
import { UserUseCase } from '@interfaces'

/**
 * Type definition for the USERNAME_GENERATED event
 */
type SIGNATURE_GENERATED_DOMAIN_EVENT = {
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
    signature: string
    base_signature: string
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
  input: SIGNATURE_GENERATED_DOMAIN_EVENT,
): Promise<UserDTO> => {
  try {
    // Log the incoming event (sanitized for security)
    console.log('Processing SIGNATURE_GENERATED event', {
      source: input.source,
      name: input.name,
      user_id: input.payload?.user_id,
      signature: input.payload?.signature,
    })

    // Extract required fields from the event payload
    const { user_id, signature } = input.payload

    if (!user_id || !signature) {
      throw new Error(
        'Missing required fields: user_id and signature must be provided',
      )
    }

    // Get the user use case from the container
    const user_use_case: UserUseCase = container.get(dependencies.UserUseCase)

    // Update the user with the generated username
    const updated_user = await user_use_case.updateSignature({
      id: user_id,
      signature: signature,
    })

    // Log success (minimal information for tracing)
    console.log('Signature update completed successfully', {
      user_id,
      signature,
    })

    return updated_user
  } catch (error) {
    // Log detailed error information
    console.error('Signature update failed in handler', {
      error_message: error.message,
      error_name: error.name,
      error_stack: error.stack,
      source: input?.source,
      user_id: input?.payload?.user_id,
    })

    // Rethrow the error to be handled by the Lambda middleware
    throw new Error(`Signature update failed: ${error.message}`)
  }
}

/**
 * Lambda handler for the update-signature function
 *
 * This handler processes SIGNATURE_GENERATED events from EventBridge
 * and updates the user with the generated signature.
 */
export const handler: CommonInputHandler<
  SIGNATURE_GENERATED_DOMAIN_EVENT,
  UserDTO
> = withCommonInput(inputMapper, { singular: true as true })

/**
 * Main Lambda function handler with standard IO middleware
 *
 * This is the entry point for the Lambda function, wrapped with
 * middleware for standardized input/output handling and logging.
 */
export const main = withLambdaIOStandard(handler)
