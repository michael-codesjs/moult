import { resourcesConfig } from '@/app/amplify.config';
import { createServerRunner, NextServer } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server';

export const { runWithAmplifyServerContext } = createServerRunner({
    config: resourcesConfig
});

export const authenticatedUser = async (context: NextServer.Context) => {
    try {
        return await runWithAmplifyServerContext({
            nextServerContext: context,
            operation: async (contextSpec) => {
            //     try {
            //         const session = await fetchAuthSession(contextSpec, { });
            //         console.log('session', session);
            //         if (!session.tokens) return null;

            //     const currentUser = await getCurrentUser(contextSpec);
            //     console.log('currentUser', currentUser);
            //     return {
            //             ...currentUser,
            //             isAdmin: false
            //         };
            //     } catch (error) {
            //         console.error('OPuuuu error:', error);
            //         return null;
            //     }
            // }
            }
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}