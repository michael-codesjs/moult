import { withLambdaIOStandard } from '@shared'
import { GENERATE_SIGNATURE_DOMAIN_COMMAND } from '@domain/events/types'
import { CommonInputHandler, withCommonInput } from '@shared'
import { SignatureAssignmentDTO } from '@domain/models'
import { generateSignature } from '@use-cases/signature'

/**
 * Maps the incoming event to the domain model and processes the signature generation
 *
 * This function extracts the necessary data from the incoming event,
 * calls the signature generation use case, and returns the result.
 *
 * @param input - The incoming event containing user data
 * @returns Promise resolving to the signature assignment
 */
export const inputMapper = async (
  input: GENERATE_SIGNATURE_DOMAIN_COMMAND,
): Promise<SignatureAssignmentDTO> => {
  try {
    console.log('Processing USER_CREATED event', input)

    // Extract required fields from the event payload
    const { name, id } = input.payload

    if (!name || !id) {
      throw new Error('Missing required fields: name and id must be provided')
    }

    // Call the signature generation use case
    const result = await generateSignature({
      user_id: id,
      full_name: name,
    })

    // Log success (minimal information for tracing)
    console.log('Signature generation completed successfully', {
      user_id: id,
      signature: result.signature,
    })

    return result
  } catch (error) {
    // Log detailed error information
    console.error('Signature generation failed in handler', {
      errorMessage: error.message,
      errorName: error.name,
      errorStack: error.stack,
      source: input?.source,
      userId: input?.payload?.id,
    })

    // Rethrow the error to be handled by the Lambda middleware
    throw new Error(`Signature generation failed: ${error.message}`)
  }
}

/**
 * Lambda handler for the generate-signature function
 *
 * This handler processes USER_CREATED events from EventBridge
 * and generates unique signatures for new users.
 */
export const handler: CommonInputHandler<
  GENERATE_SIGNATURE_DOMAIN_COMMAND,
  SignatureAssignmentDTO
> = withCommonInput(inputMapper, { singular: true as true })

/**
 * Main Lambda function handler with standard IO middleware
 *
 * This is the entry point for the Lambda function, wrapped with
 * middleware for standardized input/output handling and logging.
 */
export const main = withLambdaIOStandard(handler)
