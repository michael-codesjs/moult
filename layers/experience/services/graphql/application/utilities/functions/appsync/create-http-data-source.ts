

type CreateHttpDataSourceParams<N extends string, E extends string> = {
  name: N,
  endpoint: E
};

type CreateEventsDataSource = <N extends string, E extends string>(params: CreateHttpDataSourceParams<N, E>) => {
  type: "HTTP",
  name: N,
  config: {
    endpoint: E,
    authorizationConfig: {
      authorizationType: "AWS_IAM",
      awsIamConfig: {
        signingRegion: "${self:custom.region}",
        signingServiceName: "api-gateway"
      }
    },
    iamRoleStatements: [{
      Effect: "Allow",
      Action: ["execute-api:Invoke"],
      Resource: ["*"]
    }]
  }
}

export const createHttpDataSource: CreateEventsDataSource = (params) => {
  const { name, endpoint } = params;
  return {
    type: "HTTP",
    name,
    config: {
      endpoint: endpoint,
      authorizationConfig: {
        authorizationType: "AWS_IAM",
        awsIamConfig: {
          signingRegion: "${self:custom.region}",
          signingServiceName: "api-gateway"
        }
      },
      iamRoleStatements: [{
        Effect: "Allow",
        Action: ["execute-api:Invoke"],
        Resource: ["*"]
      }]
    }
  }
};