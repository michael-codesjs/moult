import { AWS, handlerPath } from '@moult/sdk'

export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 5,
  memorySize: 1024,
  environment: {
    DATABASE_URL: '${self:provider.environment.DATABASE_URL}',
    CENTRAL_API_URL:
      '${ssm:/moult/${self:custom.stage}/infrastructure/io/central/api/url}',
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['rds-db:connect', 'rds:*'],
      Resource: [
        'arn:aws:rds:${self:custom.region}:*:db:moult-db-${self:custom.stage}',
      ],
    },
    {
      Effect: 'Allow',
      Action: ['execute-api:Invoke'],
      Resource: ['*'],
    },
  ],
}
