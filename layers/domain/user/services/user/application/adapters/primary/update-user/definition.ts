import { AWS, handlerPath } from '@shared'

// 'updateUser' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: 'Update user credentials lambda function/adapter.',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        path: '/user',
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
        '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/table/user/arn}',
        '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/table/events/arn}',
      ],
    },
    {
      Effect: 'Allow',
      Action: ['events:PutEvents'],
      Resource: ['${ssm:/moult/${self:custom.stage}/domain/io/event-bus/arn}'],
    },
  ],
  environment: {
    USER_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/table/user/name}',
    EVENTS_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/table/events/name}',
    EVENT_BUS_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/io/event-bus/name}',
  },
}
