import { AWS, handlerPath } from '@shared'

// 'updateUsername' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: 'Update user username from USERNAME_GENERATED event',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus:
          '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
        pattern: {
          source: ['moult.user.username-management'],
          'detail-type': ['USERNAME_GENERATED'],
        },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:Query',
        'dynamodb:PutItem',
      ],
      Resource: [
        '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-store-table/arn}',
        '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-count-table/arn}',
      ],
    },
    {
      Effect: 'Allow',
      Action: ['events:PutEvents'],
      Resource:
        '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
    },
  ],
  environment: {
    USER_EVENTS_STORE_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-store-table/name}',
    EVENT_COUNT_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-count-table/name}',
  },
}
