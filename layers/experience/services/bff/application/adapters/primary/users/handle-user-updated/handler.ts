import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@shared'
import { prisma } from '@prisma-client'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Type definition for the USER_UPDATED event
 */
type USER_UPDATED_EVENT = {
  id: string
  payload: {
    id: string
    name?: string
    email?: string
    phone_number?: string
    bio?: string
    profile_picture?: string
  }
}

/**
 * Input mapper function that handles the user creation logic
 */
const inputMapper = async (input: USER_UPDATED_EVENT) => {
  try {
    console.log('input:', JSON.stringify(input, null, 2))
    const params = {
      where: { id: input.id },
      data: input.payload,
    }
    console.log('params', params)
    const result = await prisma.user.update(params)
    console.log('result', result)
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
export const handler: CommonInputHandler<USER_UPDATED_EVENT, void> =
  withCommonInput(inputMapper, { singular: true as true })

export const main = withLambdaIOStandard(handler)
