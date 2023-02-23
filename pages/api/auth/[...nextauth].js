import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"
var bcrypt = require('bcrypt');

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: "Email", type: "email"},
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        });

        if (user == null)
        {
          throw new Error("User does not exist!")
        }
        
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (isValid) {
          return user
        }
        else
        {
          throw new Error(user.password)//"Wrong email or password!")
        }
      }
    }),
  ],
})