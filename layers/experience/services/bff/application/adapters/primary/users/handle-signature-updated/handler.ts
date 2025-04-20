import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@shared'
import { prisma } from '@prisma-client'

/**
 * Type definition for the USER_USERNAME_UPDATED event
 */
type USER_SIGNATURE_UPDATED_EVENT = {
  id: string
  payload: {
    signature: string
    id: string
  }
}

/**
 * Input mapper function that handles the username update logic
 */
const inputMapper = async (input: USER_SIGNATURE_UPDATED_EVENT) => {
  try {
    const { id, signature } = input.payload

    await prisma.user.update({
      where: { id },
      data: {
        signature,
      },
    })
  } catch (error) {
    console.error('Error handling signature update:', error)
    throw error
  }
}

/**
 * Lambda handler for the handle-username-updated function
 *
 * This handler processes USER_USERNAME_UPDATED events from EventBridge
 * and updates user records in the PostgreSQL database.
 */
export const handler: CommonInputHandler<USER_SIGNATURE_UPDATED_EVENT, void> =
  withCommonInput(inputMapper, { singular: true as true })

export const main = withLambdaIOStandard(handler)
