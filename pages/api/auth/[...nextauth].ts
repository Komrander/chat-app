import NextAuth from "next-auth";
import type { NextAuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: "Email", type: "email"},
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          }
        });

        if (!user)
        {
          return null;
        }
        
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (isValid) {
          return {email: user.email} as User;
        }
        else
        {
          return null;
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy:"jwt",
  },
  pages: {
    signIn: '/signin',
  },
}

export default NextAuth(authOptions);