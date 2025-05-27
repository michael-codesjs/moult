import { prisma, User } from '@prisma-client'

type CheckSignatureAvailabilityArgs = { signature: string }

export const checkSignatureAvailability = async ({
  signature,
}: CheckSignatureAvailabilityArgs): Promise<boolean> => {
  console.log('checking signature availability', { signature })
  const exists = await prisma.user.count({
    where: { signature },
  })

  console.log('user exists with signature', { user: !!exists })

  return !exists
}
