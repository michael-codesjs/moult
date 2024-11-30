import { AWS, handlerPath } from "@shared";

// 'createUserCredentials' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Create user credentials lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    // {
    //   http: {
    //     path: "/authentication/authentication",
    //     method: "POST",
    //     cors: true,
    //     authorizer: "AWS_IAM",
    //     private: false // TODO: be true
    //   }
    // },
    {
      cognitoUserPool: {
        pool: '${ssm:/moult/${self:custom.stage}/infrastructure/authentication/user-pool/name}',
        trigger: 'PostConfirmation',
        existing: true
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:PutItem"],
      Resource: "${ssm:/moult/${self:custom.stage}/domain/authentication/service/user-credentials/infrastructure/storage/moult-user-credentials-event-store-table/arn}"
    },
  ],
  environment: {
    USER_CREDENTIALS_EVENTS_STORE_DYNAMODB_TABLE_NAME: "${ssm:/moult/${self:custom.stage}/domain/authentication/service/user-credentials/infrastructure/storage/moult-user-credentials-event-store-table/name}"
  }
};