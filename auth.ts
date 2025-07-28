import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import type { User } from '@/types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<
      User[]
    >`SELECT id, name, email, password, role FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// auth() — used in pages or server actions to get the current user/session
// signIn() / signOut() — can be used in UI to trigger auth
// handlers — for /api/auth/[...nextauth] route
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          if (!user.password) return null; // prevent bcrypt crash
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Inject custom properties into the session
      // session.user is created by default, just extend it
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Initial sign-in: attach custom properties to the JWT token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
});
