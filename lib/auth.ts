import { PrismaClient } from '@prisma/client'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

const auth = betterAuth({
  database: prismaAdapter(new PrismaClient(), {
    provider: 'postgresql'
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_APP_CLIENT_ID!,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET!
    }
  },
  plugins: [nextCookies()]
})

export default auth
