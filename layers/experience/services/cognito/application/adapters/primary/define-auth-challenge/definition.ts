import { AWS, handlerPath } from '@shared'

/** 'defineAuthChallenge' sls definition. */
export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: 'moult-user-pool-${self:custom.stage}',
        trigger: 'DefineAuthChallenge',
        existing: true,
        forceDeploy: true,
      },
    },
  ],
}
