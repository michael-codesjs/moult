import { AuthConfig } from "../lib/auth/amplify";
import { NextServer, createServerRunner } from '@aws-amplify/adapter-nextjs'

export const { runWithAmplifyServerContext } = createServerRunner({
    config: {
        Auth: AuthConfig
    }
});