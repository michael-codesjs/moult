import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@moult/sdk'
import { prisma } from '@prisma-client'

/**
 * Type definition for the USER_CREATED event
 */
type USER_CREATED_EVENT = {
  id: string
  payload: {
    id: string
    name: string
    email?: string
    phone_number?: string
    username?: string
  }
}

/**
 * Input mapper function that handles the user creation logic
 */
const inputMapper = async (input: USER_CREATED_EVENT) => {
  try {
    const { id, name, email, phone_number } = input.payload
    await prisma.user.create({
      data: {
        id,
        name,
        email,
        phone_number,
      },
    })
  } catch (error) {
    console.error('Error handling user creation:', error)
    throw error
  }
}

/**
 * Lambda handler for the handle-user-created function
 *
 * This handler processes USER_CREATED events from EventBridge
 * and creates user records in the PostgreSQL database.
 */
export const handler: CommonInputHandler<USER_CREATED_EVENT, void> =
  withCommonInput(inputMapper, { singular: true as true })

export const main = withLambdaIOStandard(handler)
