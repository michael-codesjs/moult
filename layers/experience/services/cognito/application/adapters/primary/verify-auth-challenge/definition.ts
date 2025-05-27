import { AWS, handlerPath } from '@moult/sdk'

// 'verifyAuthChallenge' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: 'moult-user-pool-${self:custom.stage}',
        trigger: 'VerifyAuthChallengeResponse',
        existing: true,
        forceDeploy: true,
      },
    },
  ],
}
