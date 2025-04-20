import { AWS, handlerPath } from '@shared'

// 'updateCognitoUser' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus:
          '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
        pattern: {
          'detail-type': ['USER_UPDATED'],
        },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['cognito-idp:AdminUpdateUserAttributes'],
      Resource: ['arn:aws:cognito-idp:${self:custom.region}:*:userpool/*'],
    },
  ],
  environment: {
    USER_POOL_ID:
      '${ssm:/moult/${self:custom.stage}/infrastructure/authentication/user-pool/id}',
  },
}
