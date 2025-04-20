import { AWS, handlerPath } from '@shared'

// 'updateSignature' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: 'Update user signature from SIGNATURE_GENERATED event',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus:
          '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
        pattern: {
          'detail-type': ['SIGNATURE_GENERATED'],
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
        '${ssm:/moult/${self:custom.stage}/domain/user/users/infrastructure/storage/moult-user-event-store-table/arn}',
        '${ssm:/moult/${self:custom.stage}/domain/user/users/infrastructure/storage/moult-user-event-count-table/arn}',
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
    EVENTS_STORE_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/user/users/infrastructure/storage/moult-user-event-store-table/name}',
    EVENT_COUNTS_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/user/users/infrastructure/storage/moult-user-event-count-table/name}',
  },
}
