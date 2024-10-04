import { AWS, handlerPath } from "@shared";

// 'updateUserCredentials' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Update user credentials lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        path: "/authentication/authentication",
        method: "PUT",
        cors: true,
        authorizer: "AWS_IAM",
        private: false // TODO: be true
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:GetItem", "dynamodb:UpdateItem"],
      Resource: "${ssm:/moult/${self:custom.stage}/domain/authentication/service/authentication/infrastructure/storage/table/user-credentials/arn}"
    },
  ],
  environment: {
    USER_CREDENTIALS_DYNAMODB_TABLE_NAME: "${ssm:/moult/${self:custom.stage}/service/authentication/infrastructure/storage/table/user-credentials/stream/arn}"
  }
};