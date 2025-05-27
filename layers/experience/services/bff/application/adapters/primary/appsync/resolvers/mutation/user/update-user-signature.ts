import { User, prisma } from '@prisma-client'
import { AppSyncIdentityCognito } from 'aws-lambda'
import { ApiGwDomainCommandAdapter } from '@adapters/secondary/api-gw/user-domain-command'

const apiGwDomainCommandAdapter = new ApiGwDomainCommandAdapter()

type UpdateUserSignatureArgs = {
  signature: string
}

export const updateUserSignature = async (
  args: UpdateUserSignatureArgs,
  identity: AppSyncIdentityCognito,
): Promise<User | null> => {
  // TODO: Send update user domain command to user service

  const user_id = identity.sub
  console.log('updating user', args)
  console.log('user_id', user_id)

  // TODO: Send update user domain command to user service
  await apiGwDomainCommandAdapter.sendUpdateUserSignatureCommand({
    id: user_id,
    signature: args.signature,
  })

  return prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })
}
