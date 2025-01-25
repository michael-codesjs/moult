import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
    
        const isLoggedIn = !!auth?.user;
        const isApp = nextUrl.hostname.startsWith('app')

        if((!isLoggedIn || (!isLoggedIn && isApp)) && nextUrl.pathname !== '/login') {
            return Response.redirect(new URL('/login', process.env.APP_CLIENT_URL!));
        }

        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;