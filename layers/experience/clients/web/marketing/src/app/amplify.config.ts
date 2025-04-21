'use client'

import { Amplify, ResourcesConfig } from 'aws-amplify'
import { CookieStorage } from 'aws-amplify/utils'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'

const env = process.env.NEXT_PUBLIC_ENV

const resourcesConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    },
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_APPSYNC_URL!,
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'eu-central-1',
      defaultAuthMode: 'userPool',
    },
  },
}

const libraryOptions = { ssr: true }
const cookieStorage = new CookieStorage({
  domain: env === 'prod' ? '.withmoult.com' : 'localhost',
  path: '/',
  expires: 365,
  sameSite: 'none',
})

Amplify.configure(resourcesConfig, libraryOptions)
cognitoUserPoolsTokenProvider.setKeyValueStorage(cookieStorage)

export default function ConfigureAmplifyClientSide() {
  return null
}
