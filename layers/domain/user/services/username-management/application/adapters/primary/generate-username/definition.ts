import { AWS } from "@shared";

/** Function definition for the generate-username Lambda function */
export const definition: AWS.ServerlessLambdaFunction = {
  handler: "adapters/primary/generate-username/handler.handler",
  events: [
    {
      eventBridge: {
        pattern: {
          source: ["moult.user"],
          "detail-type": ["USER_CREATED"]
        }
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:UpdateItem", "dynamodb:GetItem", "dynamodb:PutItem"],
      Resource: [
        "${ssm:/moult/${self:custom.stage}/domain/user/username-assignments/table/arn}",
        "${ssm:/moult/${self:custom.stage}/domain/user/username-counts/table/arn}"
      ]
    },
    {
      Effect: "Allow",
      Action: ["events:PutEvents"],
      Resource: ["${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/arn}"]
    }
  ]
}; 