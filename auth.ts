import NextAuth, { AuthError } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { signInSchema } from "./lib/zod"
import { ZodError } from "zod"
import { redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
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

            if (!credentials?.email || !credentials?.password) {
              throw new AuthError("Missing credentials");
            }

            const { email, password } = await signInSchema.parse(credentials);

            const user = await prisma.user.findUnique({
              where: { email: email as string },
            });

            if (!user) {
              throw new AuthError("User not found");
            }

            const userId = await prisma.account.findUnique({
              where: {
                provider_providerAccountId: {
                  provider: 'credentials',
                  providerAccountId: email as string,
                },
              },
            });

            if (!userId) {
              throw new AuthError("Invalid user or password is incorrect");
            }

            const compare = await bcrypt.compare(password as string, userId?.password as string);

            if (!compare) {
              throw new AuthError("Invalid user or password is incorrect");
            }
            return user;
          } catch (error) {
            if (error instanceof ZodError) {
              throw new AuthError(`${error.errors.map(e => e.message).join(", ")}`);
            }
            if (error instanceof AuthError) {
              throw new AuthError(error.message);
            }
            if (isRedirectError(error)) {
              throw error
            }
            return null
          }
        }
      })
    ],
})



