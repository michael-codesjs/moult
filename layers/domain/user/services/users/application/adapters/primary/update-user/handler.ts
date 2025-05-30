import 'reflect-metadata'
import { UPDATE_USER_DOMAIN_COMMAND } from '@domain/events'
import {
  withCommonInput,
  withLambdaIOStandard,
  CommonInputHandler,
} from '@moult/sdk'
import { UserDTO } from '@domain/models'
import { container, dependencies } from '@dependencies'
import { UserUseCase } from '@interfaces'

const inputMapper = async (
  input: UPDATE_USER_DOMAIN_COMMAND,
): Promise<UserDTO> => {
  const user: UserUseCase = container.get(dependencies.UserUseCase)
  return await user.updateUser(input.payload)
}

/** 'createUser' lambda function handler. */
export const handler: CommonInputHandler<UPDATE_USER_DOMAIN_COMMAND, UserDTO> =
  withCommonInput(inputMapper, {
    singular: true as true,
  })

/** 'createUser' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler)
