import { AWS, handlerPath } from "@shared";

// 'createUser' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        http: {
            path: "/user/user",
            method: "POST",
            cors: true,
            authorizer: "AWS_IAM",
            private: false // TODO: be true
        }
    }],
};