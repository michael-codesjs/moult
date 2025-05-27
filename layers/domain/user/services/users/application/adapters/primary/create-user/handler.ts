import 'reflect-metadata'
import { CREATE_USER_DOMAIN_COMMAND } from '@domain/events'
import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@moult/sdk'
import { UserDTO } from '@domain/models'
import { container, dependencies } from '@dependencies'
import { UserUseCase } from '@interfaces'

const inputMapper = async (
  input: CREATE_USER_DOMAIN_COMMAND,
): Promise<UserDTO> => {
  console.log('input', input)

  const userCredentials: UserUseCase = container.get(dependencies.UserUseCase)
  return await userCredentials.createUser(input.payload)
}

/** 'createUser' lambda function handler. */
export const handler: CommonInputHandler<CREATE_USER_DOMAIN_COMMAND, UserDTO> =
  withCommonInput(inputMapper, {
    singular: true as true,
  })

/** 'createUser' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler)
