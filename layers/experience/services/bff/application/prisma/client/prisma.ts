import { PrismaClient } from './generated'
export * from './generated'
// Initialize Prisma Client with error logging
export const prisma = new PrismaClient({
  log: ['error'],
})
