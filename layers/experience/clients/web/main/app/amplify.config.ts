import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { defaultStorage } from 'aws-amplify/utils';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      signUpVerificationMethod: 'code', // This can be 'code' or 'link'
      loginWith: {
        email: true,
        phone: true,
        username: false
      }
    }
  }
}, {
  ssr: true
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage); 