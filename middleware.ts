import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log('token', token);
  const { pathname } = req.nextUrl;

  // Allow unauthenticated access to /admin (login page)
  if (pathname === '/admin') {
    return NextResponse.next();
  }

  // Protect only /admin/dashboard and its subpaths
  if (pathname.startsWith('/admin/dashboard')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
