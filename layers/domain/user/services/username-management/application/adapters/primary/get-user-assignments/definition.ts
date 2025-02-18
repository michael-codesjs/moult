import { AWS } from "@shared";

/** Function definition for retrieving user's username assignments */
export const definition: AWS.ServerlessLambdaFunction = {
  handler: "adapters/primary/get-user-assignments/handler.handler",
  events: [
    {
      http: {
        method: "get",
        path: "username/assignments/{userId}",
        cors: true,
        request: {
          parameters: {
            paths: {
              userId: true
            }
          }
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
    }
  ]
}; 