import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/compte', '/reservation'];
const ADMIN_PATHS = ['/admin'];
const AUTH_PATHS = ['/connexion', '/inscription', '/mot-de-passe-oublie'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie =
    request.cookies.get('session')?.value ??
    request.cookies.get('__session')?.value;

  const isAuthenticated = !!sessionCookie;
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAdmin = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  // Redirect to login if accessing protected routes without session
  if ((isProtected || isAdmin) && !isAuthenticated) {
    const loginUrl = new URL('/connexion', request.url);
    loginUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/compte', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/compte/:path*',
    '/reservation/:path*',
    '/admin/:path*',
    '/connexion',
    '/inscription',
    '/mot-de-passe-oublie',
  ],
};
