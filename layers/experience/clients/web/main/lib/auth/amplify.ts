export const AuthConfig = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    signUpVerificationMethod: 'code',
    loginWith: {
      email: true,
      phone: true,
      username: false
    }
  }
}; 