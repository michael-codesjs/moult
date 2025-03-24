import { PrismaClient } from '../prisma/client'

// Initialize Prisma Client with error logging
export const prisma = new PrismaClient({
  log: ['error'],
})
