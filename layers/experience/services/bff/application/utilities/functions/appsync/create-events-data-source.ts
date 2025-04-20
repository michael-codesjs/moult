type CreateEventsDataSourceParams<N extends string, A extends string> = {
  name: N
  eventBusArn: A
}

type CreateEventsDataSource = <N extends string, A extends string>(
  params: CreateEventsDataSourceParams<N, A>,
) => {
  type: 'HTTP'
  name: N
  config: {
    endpoint: {
      'Fn::Sub': `https://events.\${self:custom.region}.amazonaws.com/`
    }
    authorizationConfig: {
      authorizationType: 'AWS_IAM'
      awsIamConfig: {
        signingRegion: '${self:custom.region}'
        signingServiceName: 'events'
      }
    }
    iamRoleStatements: [
      {
        Effect: 'Allow'
        Action: ['events:PutEvents']
        Resource: [A]
      },
    ]
  }
}

export const createEventsDataSource: CreateEventsDataSource = (params) => {
  // https://github.com/aws-samples/serverless-patterns/blob/main/appsync-eventbridge/cdk/lib/appsync-eventbridge-stack.ts
  const { name, eventBusArn } = params
  return {
    type: 'HTTP',
    name,
    config: {
      endpoint: {
        'Fn::Sub': `https://events.\${self:custom.region}.amazonaws.com/`,
      },
      authorizationConfig: {
        authorizationType: 'AWS_IAM',
        awsIamConfig: {
          signingRegion: '${self:custom.region}',
          signingServiceName: 'events',
        },
      },
      iamRoleStatements: [
        {
          Effect: 'Allow',
          Action: ['events:PutEvents'],
          Resource: [eventBusArn],
        },
      ],
    },
  }
}
