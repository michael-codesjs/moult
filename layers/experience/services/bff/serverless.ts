import { AWS } from '@shared'
import * as functions from './application/adapters/primary'
import { resolvers } from './resolvers.serverless'
/**
 * Serverless Configuration for BFF service
 */
const serverless_configuration: AWS.Service = {
  service: 'moult-bff',
  frameworkVersion: '3',

  provider: {
    name: 'aws',
    region: 'eu-central-1',
    stage: 'dev',
    runtime: 'nodejs18.x',

    apiGateway: {
      restApiId:
        '${ssm:/moult/${self:custom.stage}/infrastructure/io/central/api/id}',
      restApiRootResourceId:
        '${ssm:/moult/${self:custom.stage}/infrastructure/io/central/api/root-resource-id}',
    },

    environment: {
      DATABASE_URL:
        '${ssm:/moult/${self:custom.stage}/infrastructure/storage/postgres/url}',
      PRISMA_QUERY_ENGINE_LIBRARY:
        '/opt/nodejs/node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node',
      NODE_ENV: '${self:custom.stage}',
    },
  },

  custom: {
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      packager: 'yarn',
    },
  },

  // Package configuration based on Prisma's AWS Lambda deployment guidelines
  package: {
    individually: true,
  },

  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    'serverless-appsync-plugin',
  ],

  // Define the Lambda Layer for Prisma
  layers: {
    PrismaLayer: {
      path: '.layers/prisma',
      name: '${self:service}-${self:provider.stage}-prisma-layer',
      description: 'Prisma Client, Engine and Prisma-AppSync generated files',
      compatibleRuntimes: ['nodejs18.x'],
      retain: false,
      package: {
        patterns: [
          '!node_modules/.prisma/client/query-engine-*',
          'node_modules/.prisma/client/query-engine-rhel-*',
          '!node_modules/prisma/*',
          '!node_modules/@prisma/engines/**',
        ],
      },
    },
  },

  appSync: {
    name: 'moult-api-${self:custom.stage}',
    schema: '../../schemas/graphql/schema.graphql',
    authentication: {
      type: 'AMAZON_COGNITO_USER_POOLS',
      config: {
        userPoolId:
          '${ssm:/moult/${self:custom.stage}/infrastructure/authentication/user-pool/id}',
        awsRegion: '${self:custom.region}',
        defaultAction: 'ALLOW',
      },
    },
    additionalAuthentications: [
      {
        type: 'AWS_IAM',
      },
    ],
    // apiId: '${ssm:/moult/${self:custom.stage}/infrastructure/api/graphql/id}',
    resolvers,
    dataSources: {
      prisma_appsync: {
        type: 'AWS_LAMBDA',
        name: 'prisma_appsync',
        config: {
          functionName: 'appsyncResolver',
        },
      },
    },
  },

  functions,
}

module.exports = serverless_configuration
