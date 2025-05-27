import { AWS, handlerPath } from '@moult/sdk'

// 'postConfirmation' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: 'moult-user-pool-${self:custom.stage}',
        trigger: 'PostConfirmation',
        existing: true,
        forceDeploy: true,
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['execute-api:Invoke'],
      Resource: ['*'],
    },
  ],
  environment: {
    CENTRAL_API_URL:
      '${ssm:/moult/${self:custom.stage}/infrastructure/io/central/api/url}',
  },
}
