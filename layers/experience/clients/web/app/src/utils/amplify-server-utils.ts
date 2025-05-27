import { NextServer, createServerRunner } from '@aws-amplify/adapter-nextjs'
import {
  fetchAuthSession,
  getCurrentUser,
  fetchUserAttributes,
} from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'

export type AuthenticatedUser = Awaited<ReturnType<typeof authenticatedUser>>

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      },
    },
  },
})

export async function createServerContext() {
  const headersList = await headers()
  const headersObject: Record<string, string> = {}

  // Convert headers to a plain object using get()
  ;['cookie', 'authorization', 'x-amz-user-agent'].forEach((key) => {
    const value = headersList.get(key)
    if (value) {
      headersObject[key] = value
    }
  })

  // Get the actual request URL
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const host = headersList.get('host') || 'localhost'
  const url = `${protocol}://${host}`

  const request = new NextRequest(url, {
    headers: headersObject,
  })
  const response = NextResponse.next()
  return { request, response }
}

export async function getAuthenticatedCognitoUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec)
        if (!session.tokens) {
          return
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
        }
        const groups = session.tokens.accessToken.payload['cognito:groups']
        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes('Admins'))

        return user
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  })
}
