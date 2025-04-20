import { AWS, handlerPath } from '@shared'

// 'updateUser' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: 'Update user credentials lambda function/adapter.',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        path: '/user/users',
        method: 'PUT',
        cors: true,
        authorizer: 'AWS_IAM',
        private: false, // TODO: be true
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:PutItem',
        'dynamodb:Query',
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
