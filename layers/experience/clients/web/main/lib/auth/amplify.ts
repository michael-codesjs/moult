'use client'
import { Amplify, type ResourcesConfig } from 'aws-amplify';

export const AuthConfig: ResourcesConfig['Auth'] = {
    Cognito: {
        userPoolId: process.env.AWS_COGNITO_POOL_ID!,
        userPoolClientId: process.env.AWS_COGNITO_APP_CLIENT_ID!,
    }
} 

Amplify.configure(
    {
        Auth: AuthConfig,
    },
    {
    ssr: true
    }
);

export default function ConfigureAmplifyClientSide() {
    return null
}