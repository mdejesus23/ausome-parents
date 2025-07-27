import authConfig from './auth.config';
import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Optional: block users who are not admins
  if (token.email !== 'dejesusmelnard@gmail.com') {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
