import { AWS, handlerPath } from "@shared";

// 'preSignUp' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        cognitoUserPool: {
            pool: "moult-user-pool-${self:custom.stage}",
            trigger: "PreSignUp",
            existing: true
        },
    }]
};