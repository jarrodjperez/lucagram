import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";

const options = {
  pages: {
    signIn: "/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/profile", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM, // The "from" address that you want to use
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  callbacks: {
    async session(session, token) {
      // expose user id
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.id },
      });
    },
  },
};

// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;