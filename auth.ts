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
    async jwt({ token, user }) {
      // On initial sign-in, include role from DB
      if (user) {
        token.role = user.role;
      } else {
        // When using getToken(), pull role from DB (optional fallback)
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email! },
        });
        token.role = dbUser?.role ?? 'USER';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
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
