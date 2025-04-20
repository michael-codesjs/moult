'use client'

import { Amplify, ResourcesConfig } from 'aws-amplify'

export const resourcesConfig: ResourcesConfig = {
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

export const libraryOptions = { ssr: true }

Amplify.configure(resourcesConfig, libraryOptions)
// cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

export default function ConfigureAmplifyClientSide() {
  return null
}
