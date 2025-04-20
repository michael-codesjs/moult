import { User } from '@prisma/client'
import { prisma } from '@prisma-client'
import { AppSyncIdentityCognito } from 'aws-lambda'
import { ApiGwDomainCommandAdapter } from '@adapters/secondary/api-gw/user-domain-command'

const apiGwDomainCommandAdapter = new ApiGwDomainCommandAdapter()

type UpdateUserArgs = {
  input: {
    id: string
    name?: string
    email?: string
    bio?: string
    phone_number?: string
  }
}

export const updateUser = async (
  args: UpdateUserArgs,
  identity: AppSyncIdentityCognito,
): Promise<User | null> => {
  // TODO: Send update user domain command to user service

  const user_id = identity.sub

  // TODO: Send update user domain command to user service
  await apiGwDomainCommandAdapter.sendUpdateUserCommand({
    id: user_id,
    name: args.input.name,
    email: args.input.email,
    bio: args.input.bio,
    phone_number: args.input.phone_number,
  })

  return prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })
}
