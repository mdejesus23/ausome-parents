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
    async signIn({ user }) {
      // Allow only admins to log in
      if (user.email !== 'dejesusmelnard@gmail.com') return false;
      return true;
    },
  },
});
