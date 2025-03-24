'use client'

import { Amplify, ResourcesConfig } from 'aws-amplify'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'
import { CookieStorage } from 'aws-amplify/utils'

export const resourcesConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      //   signUpVerificationMethod: 'code', // This can be 'code' or 'link'
      //   loginWith: {
      //     email: true,
      //     phone: true,
      //     username: false
      //   }
    },
  },
}

export const libraryOptions = { ssr: true }

Amplify.configure(resourcesConfig, libraryOptions)
// cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

export default function ConfigureAmplifyClientSide() {
  return null
}
