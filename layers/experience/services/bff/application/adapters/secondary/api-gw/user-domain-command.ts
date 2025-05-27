import { UserDomainCommandAdapter } from '@interfaces'
import {
  CreateUserDomainCommand,
  CheckIfUserWithUsernameAttributeExistsCommand,
  UpdateUserDomainCommand,
  UpdateUserSignatureDomainCommand,
} from '@typings'
import { apiGatewaySignedFetch, configureEnviromentVariables } from '@moult/sdk'

const { CENTRAL_API_URL } = configureEnviromentVariables()

export class ApiGwDomainCommandAdapter implements UserDomainCommandAdapter {
  async sendCreateUserCommand(params: {
    [k: string]: string
    id: string
  }): Promise<void> {
    const createUserDomainCommand: CreateUserDomainCommand = {
      source: 'moult.experience.services.bff',
      name: 'CREATE_USER',
      payload: params,
    }

    const result = await apiGatewaySignedFetch(CENTRAL_API_URL + '/user/user', {
      method: 'POST',
      body: JSON.stringify(createUserDomainCommand),
    })

    console.log('result', result)
  }

  async sendUpdateUserCommand(params: {
    id: string
    name?: string
    email?: string
    bio?: string
    phone_number?: string
  }): Promise<void> {
    const updateUserDomainCommand: UpdateUserDomainCommand = {
      source: 'moult.experience.services.bff',
      name: 'UPDATE_USER',
      payload: params,
    }

    const result = await apiGatewaySignedFetch(
      CENTRAL_API_URL + '/user/users',
      {
        method: 'PUT',
        body: JSON.stringify(updateUserDomainCommand),
      },
    )

    console.log('result', result)
  }

  async sendUpdateUserSignatureCommand(params: {
    id: string
    signature: string
  }): Promise<boolean> {
    const updateUserSignatureDomainCommand: UpdateUserSignatureDomainCommand = {
      source: 'moult.experience.services.bff',
      name: 'UPDATE_USER_SIGNATURE',
      payload: params,
    }

    const result = await apiGatewaySignedFetch(
      CENTRAL_API_URL + '/user/users',
      {
        method: 'PUT',
        body: JSON.stringify(updateUserSignatureDomainCommand),
      },
    )

    console.log('result', result)

    return true
  }

  async sendCheckIfUserWithUsernameAttributeExistsCommand(
    params,
  ): Promise<boolean> {
    const checkIfUserWithUsernameAttributeExistsCommand: CheckIfUserWithUsernameAttributeExistsCommand =
      {
        source: 'moult.services.cognito.preSignUp',
        name: 'CHECK_IF_USER_WITH_USERNAME_ATTRIBUTES_EXISTS',
        payload: params,
      }

    const result = await apiGatewaySignedFetch(
      CENTRAL_API_URL + '/user/exists-with-username-attributes',
      {
        method: 'POST',
        body: JSON.stringify(checkIfUserWithUsernameAttributeExistsCommand),
      },
    )

    const { exists } = await result.json()

    return exists
  }
}
