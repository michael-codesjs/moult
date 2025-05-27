import { AWS, handlerPath } from '@moult/sdk'

/** Function definition for the create-custom-assignment Lambda function */
export const definition: AWS.ServerlessLambdaFunction = {
  description: 'Create custom signature assignment lambda function/adapter.',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        path: '/signatures/custom',
        method: 'POST',
        cors: true,
        authorizer: 'AWS_IAM',
        private: false, // TODO: be true
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
  },
}
