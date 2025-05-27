import { AWS, handlerPath } from '@moult/sdk'

/** Function definition for the generate-signature Lambda function */
export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        pattern: {
          source: ['User'],
          'detail-type': ['USER_CREATED'],
        },
        eventBus:
          '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:*'],
      Resource: [
        '${ssm:/moult/${self:custom.stage}/domain/user/signatures/infrastructure/storage/signature-assignments/table/arn}',
        '${ssm:/moult/${self:custom.stage}/domain/user/signatures/infrastructure/storage/signature-assignments/table/arn}/index/*',
        '${ssm:/moult/${self:custom.stage}/domain/user/signatures/infrastructure/storage/signature-counts/table/arn}',
        '${ssm:/moult/${self:custom.stage}/domain/user/signatures/infrastructure/storage/signature-counts/table/arn}/index/*',
      ],
    },
    {
      Effect: 'Allow',
      Action: ['events:PutEvents'],
      Resource: [
        '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
      ],
    },
  ],
  environment: {
    SIGNATURE_ASSIGNMENTS_TABLE:
      '${ssm:/moult/${self:custom.stage}/domain/user/signatures/infrastructure/storage/signature-assignments/table/name}',
    SIGNATURE_COUNTS_TABLE:
      '${ssm:/moult/${self:custom.stage}/domain/user/signatures/infrastructure/storage/signature-counts/table/name}',
  },
}
