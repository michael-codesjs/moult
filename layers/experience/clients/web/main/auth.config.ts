import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === '/login';
      
      // Redirect authenticated users from login page to dashboard
      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Allow access to login page
      if (isLoginPage) {
        return true;
      }

      // Protect all other pages
      if (!isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;