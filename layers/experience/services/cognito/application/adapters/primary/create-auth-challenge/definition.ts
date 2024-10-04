import { AWS, handlerPath } from "@shared";

// 'createAuthChallenge' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        cognitoUserPool: {
            pool: "moult-user-pool-${self:custom.stage}",
            trigger: 'CreateAuthChallenge',
            existing: true
        },
    }],
    iamRoleStatements: [{
        Effect: 'Allow',
        Action: ['ses:SendEmail', 'ses:SendRawEmail', 'sns:Publish', 'ses:SendTemplatedEmail'],
        Resource: ['*'],
    }]
};