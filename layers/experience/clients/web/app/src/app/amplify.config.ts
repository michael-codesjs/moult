'use client'

import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { CookieStorage } from 'aws-amplify/utils'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'
import { fetchAuthSession } from 'aws-amplify/auth'

const env = process.env.NEXT_PUBLIC_ENV

// Configure cookie storage for SSR/CSR
cognitoUserPoolsTokenProvider.setKeyValueStorage(
  new CookieStorage({
    domain: env === 'prod' ? '.withmoult.com' : 'localhost',
    path: '/',
    expires: 365,
    sameSite: env === 'prod' ? 'strict' : 'lax',
    secure: env === 'prod',
  }),
)

// Log token provider state
console.log('Token provider configured:', cognitoUserPoolsTokenProvider)

Amplify.configure(
  {
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
  },
  { ssr: true },
)

export const client = generateClient()

export function ConfigureAmplifyClientSide() {
  return null
}
