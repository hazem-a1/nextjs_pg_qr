import { NextAuthOptions, AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from '@/db';
import { accounts, sessions, users, verificationTokens } from '@/db/schema/users';
import { Adapter } from 'next-auth/adapters';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  adapter: DrizzleAdapter(db,{
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    
  },
} satisfies NextAuthOptions;
