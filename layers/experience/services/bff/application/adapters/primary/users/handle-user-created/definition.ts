import { AWS, handlerPath } from '@shared'

export const definition: AWS.ServerlessLambdaFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus:
          '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
        pattern: {
          'detail-type': ['USER_CREATED'],
        },
      },
    },
  ],
  layers: [{ Ref: 'PrismaLayerLambdaLayer' }],
}
