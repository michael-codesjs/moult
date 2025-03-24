import { AWS } from '@shared'
import * as functions from './application/adapters/primary'

const serverlessConfiguration: AWS.Service = {
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
      NODE_ENV: '${self:custom.stage}',
    },

    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['ssm:GetParameter', 'ssm:GetParameters'],
            Resource: [
              'arn:aws:ssm:${self:custom.region}:*:parameter/moult/${self:custom.stage}/*',
            ],
          },
          {
            Effect: 'Allow',
            Action: ['rds-db:connect', 'rds:*'],
            Resource: [
              'arn:aws:rds:${self:custom.region}:*:db:moult-db-${self:custom.stage}',
            ],
          },
          {
            Effect: 'Allow',
            Action: ['events:PutEvents'],
            Resource: [
              'arn:aws:events:${self:custom.region}:*:event-bus/${ssm:/moult/${self:custom.stage}/infrastructure/io/event-bus/central/name}',
            ],
          },
        ],
      },
    },
  },

  package: {
    individually: true,
    patterns: [
      '!node_modules/.prisma/client/libquery_engine-*',
      '!node_modules/@prisma/engines/**',
      'application/prisma/client/schema.prisma',
      'application/prisma/client/*.node',
      '!node_modules/**',
    ],
  },

  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],

  custom: {
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', '@prisma/client', '.prisma'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 1,
    },
  },

  functions,
}

module.exports = serverlessConfiguration
