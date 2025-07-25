// @ts-nocheck
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/app/_lib/prisma';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
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
      if (session?.user && token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt', // 👈 this is important
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
