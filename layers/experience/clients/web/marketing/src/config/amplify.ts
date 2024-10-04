export const amplifyConfig = {
  s3: {
    region: process.env.REACT_APP_REGION,
    bucket: process.env.REACT_APP_BUCKET_NAME,
  },
  apiGateway: {
    region: process.env.REACT_APP_REGION,
    url: process.env.REACT_APP_REST_URL,
  },
  appsync: {
    endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    region: process.env.REACT_APP_REGION,
    authenticationType: "AMAZON_COGNITO_USER_POOLS" as const,
  },
  cognito: {
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolClient: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  },
  websocket: {
    url: process.env.REACT_APP_WEBSOCKET_URL
  }
};