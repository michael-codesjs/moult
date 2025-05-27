import { withLambdaIOStandard } from '@moult/sdk'
import { CommonInputHandler, withCommonInput } from '@moult/sdk'
import { customCreateAssignment } from '@use-cases/signature'

/**
 * Input type for the create custom assignment request
 */
type CreateCustomAssignmentRequest = {
  signature: string
  user_id: string
}

/**
 * Response type for the create custom assignment request
 */
type CreateCustomAssignmentResponse = {
  success: boolean
  exists: boolean
  message: string
  assignment?: {
    id: string
    signature: string
    user_id: string
    status: string
    created: string
  }
}

/**
 * Maps the incoming request to the domain model and processes the custom assignment creation
 *
 * This function extracts the necessary data from the incoming request,
 * calls the custom assignment use case, and returns the result.
 *
 * @param input - The incoming request containing signature and user_id
 * @returns Promise resolving to the custom assignment response
 */
export const inputMapper = async (
  input: CreateCustomAssignmentRequest,
): Promise<CreateCustomAssignmentResponse> => {
  try {
    console.log('Processing create custom assignment request', input)

    // Extract required fields from the request
    const { signature, user_id } = input

    if (!signature || !user_id) {
      throw new Error('Both signature and user_id are required')
    }

    // Call the custom assignment use case
    const result = await customCreateAssignment({
      signature,
      user_id,
    })

    // Prepare the response
    const response: CreateCustomAssignmentResponse = {
      success: !result.exists,
      exists: result.exists,
      message: result.message,
    }

    // Include assignment details if successful
    if (result.assignment) {
      response.assignment = {
        id: result.assignment.id,
        signature: result.assignment.signature!,
        user_id: result.assignment.user_id!,
        status: result.assignment.status!,
        created: result.assignment.created.toISOString(),
      }
    }

    console.log('Custom assignment request processed', {
      user_id,
      signature,
      success: response.success,
      exists: response.exists,
    })

    return response
  } catch (error) {
    console.error('Custom assignment request failed', {
      errorMessage: error.message,
      errorName: error.name,
      errorStack: error.stack,
      input,
    })

    // Rethrow the error to be handled by the Lambda middleware
    throw new Error(`Custom assignment creation failed: ${error.message}`)
  }
}

/**
 * Lambda handler for creating custom signature assignments
 *
 * This handler processes HTTP requests to create custom signature assignments
 * for users who want to specify their own signature.
 */
export const handler: CommonInputHandler<
  CreateCustomAssignmentRequest,
  CreateCustomAssignmentResponse
> = withCommonInput(inputMapper, { singular: true as true })

/**
 * Main Lambda function handler with standard IO middleware
 *
 * This is the entry point for the Lambda function, wrapped with
 * middleware for standardized input/output handling and logging.
 */
export const main = withLambdaIOStandard(handler)
