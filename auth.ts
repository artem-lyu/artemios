import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { signInSchema } from "./lib/zod"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login'
  },
  adapter: PrismaAdapter(prisma), // defaults session strategy to database
  providers:
    [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID ?? "",
        clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
      }),
      Credentials({
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email@example.com" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          try {
            if (!credentials?.email || !credentials.password) {
              throw new Error("Missing credentials");
            }
        
            const { email, password } = await signInSchema.parseAsync(credentials);
        
            const user = await prisma.user.findUnique({
              where: { email: email as string },
            });
        
            if (!user) {
              throw new Error("User not found");
            }
        
            const userId = await prisma.account.findUnique({
              where: {
                provider_providerAccountId: {
                  provider: 'credentials',
                  providerAccountId: email,
                },
              },
            });
        
            if (!userId) {
              throw new Error("User ID not found");
            }
        
            const compare = await bcrypt.compare(password as string, userId?.password as string);
        
            if (!compare) {
              throw new Error("Invalid password");
            }
        
            return user;
        
          } catch (error) {
            console.log("Error during authorization:", error);
            throw new Error("Authorization failed");
          }
          
        }
      })
    ],
})



