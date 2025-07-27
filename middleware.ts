import NextAuth from 'next-auth';
import authConfig from './auth.config';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
