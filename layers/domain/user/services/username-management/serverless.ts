import { AWS } from '@shared'
import * as functions from '@adapters/primary'

/** Serverless configuration for the 'username-management' service. */
const serverlessConfiguration: AWS.Service = {
  service: 'moult-username-management',
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
      USERNAME_COUNTS_TABLE:
        '${ssm:/moult/${self:custom.stage}/domain/user/username-counts/table/name}',
      USERNAME_ASSIGNMENTS_TABLE:
        '${ssm:/moult/${self:custom.stage}/domain/user/username-assignments/table/name}',
      CENTRAL_EVENT_BUS_NAME:
        '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/name}',
    },
  },

  package: { individually: true },

  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],

  custom: {
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['@aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 1,
    },
  },

  functions,
}

module.exports = serverlessConfiguration
