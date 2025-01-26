import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === '/login';
      const isPublicPath = ['/', '/login', '/register', '/forgot-password'].includes(nextUrl.pathname);

      // Allow public paths
      if (isPublicPath) {
        // If logged in and trying to access login/register pages, redirect to dashboard
        if (isLoggedIn && isLoginPage) {
          return Response.redirect(new URL('/dashboard', nextUrl.origin));
        }
        return true;
      }

      // If not logged in and trying to access protected routes, redirect to login
      if (!isLoggedIn) {
        let from = nextUrl.pathname;
        if (nextUrl.search) {
          from += nextUrl.search;
        }
        const loginUrl = new URL('/login', nextUrl.origin);
        loginUrl.searchParams.set('from', from);
        return Response.redirect(loginUrl);
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;