import { AWS } from '@moult/sdk'
import * as functions from '@adapters/primary'

/** Serverless configuration for the 'photos' service. */
const serverlessConfiguration: AWS.Service = {
  service: 'moult-photos',
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
      CENTRAL_EVENT_BUS_ARN:
        '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/arn}',
      CENTRAL_EVENT_BUS_NAME:
        '${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/name}',
    },
  },

  package: {
    individually: true,
  },

  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],

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
      concurrency: 1,
    },
  },

  functions,
}

module.exports = serverlessConfiguration
