import { NextServer, createServerRunner } from '@aws-amplify/adapter-nextjs'
import { fetchAuthSession, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export type AuthenticatedUser = Awaited<ReturnType<typeof getAuthenticatedUser>>

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
  ;['cookie', 'authorization', 'x-amz-user-agent'].forEach(key => {
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

export async function getAuthenticatedUser() {
  // Use the utility function to create server context with headers and cookies
  const context = await createServerContext()

  try {
    // Get both user and attributes in parallel
    const [user, attributes] = await Promise.all([
      authenticatedUser(context),
      runWithAmplifyServerContext({
        nextServerContext: context,
        operation: async contextSpec => {
          const attrs = await fetchUserAttributes(contextSpec)
          return attrs || {}
        },
      }),
    ])

    return {
      username: user?.username || '',
      ...(attributes || {}),
      isAdmin: user?.isAdmin || false,
    }
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async contextSpec => {
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
      }
    },
  })
}
