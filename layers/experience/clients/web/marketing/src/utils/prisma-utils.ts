import { PrismaClient } from '@prisma/client'

// Initialize Prisma Client with error logging
// Using a singleton pattern to prevent multiple instances in development
let prisma: PrismaClient

// if (process.env.NODE_ENV === 'production') {
prisma = new PrismaClient({
  log: ['error'],
})
// } else {
//   // In development, use a global variable to prevent multiple instances
//   if (!(global as any).prisma) {
//     ;(global as any).prisma = new PrismaClient({
//       log: ['error'],
//     })
//   }
//   prisma = (global as any).prisma
// }

export { prisma }
