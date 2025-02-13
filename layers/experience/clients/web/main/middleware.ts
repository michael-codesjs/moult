import { NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // Skip files
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  // Define path patterns
  const isAuthPath = pathname.startsWith('/auth/');
  const isAppPath = pathname.startsWith('/app/');
  const isPublicPath = pathname === '/';

  // Public paths are accessible to everyone
  if (isPublicPath) {
    if(user) return NextResponse.redirect(new URL('/app', request.nextUrl.origin))
    return response;
  }

  // Auth paths are only accessible to non-authenticated users
  if (isAuthPath) {
    if (user) {
      // Redirect authenticated users to app home
      return NextResponse.redirect(new URL('/app', request.nextUrl.origin));
    }
    return response;
  }

  // App paths require authentication
  if (isAppPath) {
    if (!user) {
      // Redirect non-authenticated users to login
      const loginUrl = new URL('/auth/login', request.nextUrl.origin);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  // Default behavior for unspecified paths
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};