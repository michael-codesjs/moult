import { Auth, Amplify } from 'aws-amplify'
import { configureEnviromentVariables } from '@shared'

const { REGION, COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } =
  configureEnviromentVariables()

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: REGION,
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolWebClientId: COGNITO_CLIENT_ID,
  },
})

export const amplify = Amplify
export const auth = Auth
