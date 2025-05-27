import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { configureEnviromentVariables } from '@moult/sdk'

const { REGION, USER_POOL_ID } = configureEnviromentVariables()

/**
 * Input parameters for the updateCognitoUser use case
 */
type UpdateCognitoUserParams = {
  id: string
  name?: string
  email?: string
  phone_number?: string
  bio?: string
  profile_picture?: string
}

/**
 * Assigns a generated username to a Cognito user
 *
 * This use case updates the Cognito user's attributes to include
 * the generated username as the preferred_username attribute.
 *
 * Note: If the preferred_username attribute is not set up in the Cognito user pool,
 * this operation will fail. The attribute needs to be added to the user pool schema.
 *
 * @param params - Object containing user_id and username
 * @returns Promise that resolves when the username is assigned
 * @throws Error if the operation fails
 */
export const updateCognitoUser = async (
  params: UpdateCognitoUserParams,
): Promise<void> => {
  const { id, ...attributes } = params

  if (!id) {
    throw new Error('User ID is required for username assignment')
  }

  if (!USER_POOL_ID) {
    throw new Error('USER_POOL_ID environment variable is not set')
  }

  try {
    // Create the Cognito Identity Provider client
    const client = new CognitoIdentityProviderClient({
      region: REGION || 'eu-central-1',
    })

    // Create the command to update the user attributes
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: USER_POOL_ID,
      Username: id,
      UserAttributes: Object.entries(attributes)
        .filter(([key]) => ['phone_number', 'name', 'email'].includes(key))
        .map(([key, value]) => {
          return {
            Name: key,
            Value: value,
          }
        }),
    })

    // Send the command to update the user attributes
    await client.send(command)

    console.log('Username assigned successfully', params)
  } catch (error) {
    // Check if the error is related to the preferred_username attribute not being set up
    if (error.name === 'InvalidParameterException') {
      console.error('Attributes not set up in the Cognito user pool', params)
      throw new Error(
        'Attributes is not set up in the Cognito user pool. ' +
          'Please add this attribute to the user pool schema.',
      )
    }

    // Rethrow with clear error message
    throw new Error(
      `Failed to assign username to Cognito user: ${error.message}`,
    )
  }
}
