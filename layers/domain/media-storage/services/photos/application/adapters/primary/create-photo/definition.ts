import { AWS, handlerPath } from '@shared'

// 'createPhoto' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: 'Create photo metadata lambda function/adapter.',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        path: '/photos',
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
      Action: [
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:PutItem',
        'dynamodb:Query',
      ],
      Resource: [
        '${ssm:/moult/${self:custom.stage}/domain/media-storage/service/photos/infrastructure/storage/moult-photos-event-store-table/arn}',
        '${ssm:/moult/${self:custom.stage}/domain/media-storage/service/photos/infrastructure/storage/moult-photos-event-count-table/arn}',
      ],
    },
    {
      Effect: 'Allow',
      Action: ['s3:GetObject'],
      Resource: [
        '${ssm:/moult/${self:custom.stage}/domain/media-storage/service/photos/infrastructure/storage/photos-bucket/arn}/*',
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
    PHOTOS_EVENTS_STORE_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/media-storage/service/photos/infrastructure/storage/moult-photos-event-store-table/name}',
    PHOTO_EVENT_COUNT_DYNAMODB_TABLE_NAME:
      '${ssm:/moult/${self:custom.stage}/domain/media-storage/service/photos/infrastructure/storage/moult-photos-event-count-table/name}',
    PHOTOS_BUCKET:
      '${ssm:/moult/${self:custom.stage}/domain/media-storage/service/photos/infrastructure/storage/photos-bucket/name}',
  },
}
