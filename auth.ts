import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/app/_lib/prisma';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    // async signIn({ user, account, profile }) {
    //   // Allow only admins to log in
    //   if (user.email !== 'admin@example.com') return false;
    //   return true;
    // },
  },
});
