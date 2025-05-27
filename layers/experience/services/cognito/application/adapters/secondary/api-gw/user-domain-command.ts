import { UserDomainCommandAdapter } from '@interfaces'
import {
  CreateUserDomainCommand,
  CheckIfUserWithUsernameAttributeExistsCommand,
} from '@typings'
import { apiGatewaySignedFetch, configureEnviromentVariables } from '@moult/sdk'

const { CENTRAL_API_URL } = configureEnviromentVariables()

export class ApiGwDomainCommandAdapter implements UserDomainCommandAdapter {
  async sendCreateUserCommand(params: {
    [k: string]: string
    id: string
  }): Promise<void> {
    const createUserDomainCommand: CreateUserDomainCommand = {
      source: 'moult.services.cognito.confirmSignUp',
      name: 'CREATE_USER',
      payload: params,
    }

    const result = await apiGatewaySignedFetch(
      CENTRAL_API_URL + '/user/users',
      {
        method: 'POST',
        body: JSON.stringify(createUserDomainCommand),
      },
    )

    console.log('result', result)
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
