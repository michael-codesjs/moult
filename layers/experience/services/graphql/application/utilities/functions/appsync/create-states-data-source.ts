type CreateStatesDataSourceParams<
  N extends string,
  S extends boolean,
  A extends string
> = {
  name: N,
  sync: S,
  stateMachineArn: A
};

type CreateStatesDataSource = <
  N extends string,
  S extends true | false,
  A extends string
> (params: CreateStatesDataSourceParams<N, S, A>) => {
  type: "HTTP",
  name: N,
  config: {
    endpoint: {
      "Fn::Sub": S extends true ? "https://sync-states.${self:custom.region}.amazonaws.com/" : "https://states.${self:custom.region}.amazonaws.com/"
    },
    authorizationConfig: {
      authorizationType: "AWS_IAM",
      awsIamConfig: {
        signingRegion: "${self:custom.region}",
        signingServiceName: "states"
      }
    },
    iamRoleStatements: [{
      Effect: "Allow",
      Action: [S extends true ? "states:StartSyncExecution" : "states:StartExecution"],
      Resource: [A]
    }]
  }
}

export const createStatesDataSource: CreateStatesDataSource = (params) => {
  // https://aws.amazon.com/blogs/mobile/invoke-aws-services-directly-from-aws-appsync/
  // https://confix.medium.com/aws-appsync-start-sync-step-function-express-workflow-d01bab650061
  const { name, sync, stateMachineArn } = params;
  return {
    type: "HTTP",
    name,
    config: {
      endpoint: {
        "Fn::Sub": sync ? "https://sync-states.${self:custom.region}.amazonaws.com/" : "https://states.${self:custom.region}.amazonaws.com/" as any
      },
      authorizationConfig: {
        authorizationType: "AWS_IAM",
        awsIamConfig: {
          signingRegion: "${self:custom.region}",
          signingServiceName: "states"
        }
      },
      iamRoleStatements: [{
        Effect: "Allow",
        Action: [sync ? "states:StartSyncExecution" : "states:StartExecution"] as any,
        Resource: [stateMachineArn]
      }]
    }
  }
}