import { AWS, handlerPath } from "@shared";

// 'createUserCredentials' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Pre sign up handler",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: '${ssm:/moult/${self:custom.stage}/infrastructure/authentication/user-pool/name}',
        trigger: 'PreSignUp',
        existing: true
      }
    }
  ]
};