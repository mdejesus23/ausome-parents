// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });

//   if (req.nextUrl.pathname.startsWith('/admin')) {
//     if (!token || token.role !== 'ADMIN') {
//       console.log('session token', token?.role);
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   }

//   return NextResponse.next();
// }

export async function middleware(req: NextRequest) {
  return NextResponse.next(); // disable all logic temporarily
}

// Limit it only to the needed paths
export const config = {
  matcher: ['/admin/:path*'],
};
