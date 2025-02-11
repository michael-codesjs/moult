import { AWS, handlerPath } from "@shared";

// 'createUser' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Create user credentials lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        path: "/user/user",
        method: "POST",
        cors: true,
        authorizer: "AWS_IAM",
        private: false // TODO: be true
      }
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:PutItem"],
      Resource: "${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-store-table/arn}"
    },
  ],
  environment: {
    USER_EVENTS_STORE_DYNAMODB_TABLE_NAME: "${ssm:/moult/${self:custom.stage}/domain/authentication/service/user/infrastructure/storage/moult-user-event-store-table/name}"
  }
};