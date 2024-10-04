import { AWS, handlerPath } from "@shared";

// 'publishUserCreatedEvent' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {

  description: "Publishes an estate created event.",
  handler: `${handlerPath(__dirname)}/handler.main`,

  events: [{
    stream: {
      type: "dynamodb",
      arn: "${ssm:/moult/${self:custom.stage}/service/user/infrastructure/storage/table/user/stream/arn}",
      filterPatterns: [{
        eventName: ["INSERT"],
        dynamodb: {
          NewImage: {
            entityType: {
              S: ["USER"]
            }
          }
        }
      }]
    },
  }],

  iamRoleStatements: [{
    Effect: "Allow",
    Action: ["events:putEvents"],
    Resource: "${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}"
  }],

  environment: {
    CENTRAL_EVENT_BUS_NAME: "${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/name}"
  }

};