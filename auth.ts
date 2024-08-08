import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { signInSchema } from "./lib/zod"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers:
    [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID ?? "",
        clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
      }),
      Credentials({
        credentials: {
          email: {label : "Email", type: "email", placeholder: "email@example.com"},
          password: {label: "Password", type: "password"},
        },
        authorize: async(credentials) => {
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          const { email, password } = await signInSchema.parseAsync(credentials)
          
          const user = await prisma.user.findUnique({
            where: {email : email as string}
          })

          if (!user) {
            throw new Error('User not found')
          }

          const pwHashed = await bcrypt.hash(password as string, 10)


          return user
        }
      })
    ],
})



