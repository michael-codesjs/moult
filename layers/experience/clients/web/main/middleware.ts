import { authenticatedUser } from './utils/amplify-server-utils';
import { type NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  try {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    // Define path types
    const publicPaths = ['/'];
    const authPaths = ['/auth'];
    const protectedPaths: string[] = [];
    
    const isPublicPath = publicPaths.some(path => pathname.includes(path));
    const isAuthPath = authPaths.some(path => pathname.includes(path));
    const isProtectedPath = protectedPaths.some(path => pathname.includes(path));

    // Allow access to public paths immediately
    if (isPublicPath && !isProtectedPath) {
      return response;
    }

    // Allow access to auth paths without authentication
    if (isAuthPath) {
      // Get authentication status only for redirect check
      try {
        const user = await authenticatedUser({ request, response });
        if (user) {
          return Response.redirect(new URL('/dashboard', request.nextUrl.origin));
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
      return response;
    }

    // For protected paths and all other paths, require authentication
    try {
      const user = await authenticatedUser({ request, response });
      if (!user) {
        const from = request.nextUrl.pathname + request.nextUrl.search;
        const loginUrl = new URL('/auth/login', request.nextUrl.origin);
        loginUrl.searchParams.set('from', encodeURIComponent(from));
        return Response.redirect(loginUrl);
      }
      return response;
    } catch (error) {
      console.error('Protected route auth error:', error);
      return Response.redirect(new URL('/auth/login', request.nextUrl.origin));
    }
  } catch (error) {
    console.error('Middleware error:', error);
    return Response.redirect(new URL('/auth/login', request.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public\\/).*)',
  ],
};