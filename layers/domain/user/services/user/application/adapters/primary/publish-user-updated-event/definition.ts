import { AWS, handlerPath } from "@shared";

// 'publishUserUpdatedEvent' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {

  description: "Pubish estate updated event lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,

  events: [{
    stream: {
      type: "dynamodb",
      arn: "${ssm:/moult/${self:custom.stage}/service/user/infrastructure/storage/table/user/stream/arn}",
      filterPatterns: [{
        eventName: ["MODIFY"],
        dynamodb: {
          NewImage: {
            entityType: {
              S: ["USER"]
            }
          }
        }
      }]
    }
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