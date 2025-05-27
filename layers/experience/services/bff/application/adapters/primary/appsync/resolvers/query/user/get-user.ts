import { prisma, User } from '@prisma-client'

type GetUserArgs = { id: string }

export const getUser = async (args: GetUserArgs): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id: args.id } })
}
