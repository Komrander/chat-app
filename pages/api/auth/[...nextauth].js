import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
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
            email: credentials.email,
          }
        });

        if (user == null)
        {
          return null;
        }
        
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (isValid) {
          return {id: "aaaaaaaa", password: user.password, name: user.name, email: user.email};
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
})
