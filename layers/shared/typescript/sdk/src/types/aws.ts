import type { AWS as DefaultAWS } from '@serverless/typescript'
import { ChangeTypeOfKeys } from './utility'

export namespace AWS {
  type RequiredAWS = Required<DefaultAWS>

  type FnFunctions = {
    'Fn::Gett': Array<string>
  }

  export type iamRoleStatement = {
    Effect: 'Allow' | 'Deny'
    Resource: FnFunctions | Array<FnFunctions> | Array<string> | string
    Action: Array<string>
  }

  export type AwsFunctionsWithIamRoleStatements = {
    [k: string]: RequiredAWS['functions'][string | number] & {
      iamRoleStatements?: Array<iamRoleStatement>
      iamRoleStatementsName?: string
    }
  }

  export type Compose = {
    services: {
      [k: string]: {
        path: string
        dependsOn?: Array<string>
      }
    }
  }

  export type ServerlessLambdaFunction = AwsFunctionsWithIamRoleStatements[
    | string
    | number]

  export type ServerlessAppsyncPluginConfig = {
    schema: string
    resolvers?: string | Record<string, any>
    name?: string
    authenticationType?:
      | 'API_KEY'
      | 'AWS_IAM'
      | 'AMAZON_COGNITO_USER_POOLS'
      | 'OPENID_CONNECT'
      | 'AWS_LAMBDA'
    authentication?: {
      type:
        | 'API_KEY'
        | 'AWS_IAM'
        | 'AMAZON_COGNITO_USER_POOLS'
        | 'OPENID_CONNECT'
        | 'AWS_LAMBDA'
      config?: {
        userPoolId: string
        awsRegion: string
        defaultAction: 'ALLOW' | 'DENY'
      }
    }
    apiId?: string
    apiKeys?: Array<{
      name: string
      description?: string
      expiresAfter?: string
    }>
    additionalAuthentications?: Array<{
      type:
        | 'API_KEY'
        | 'AWS_IAM'
        | 'AMAZON_COGNITO_USER_POOLS'
        | 'OPENID_CONNECT'
        | 'AWS_LAMBDA'
      apiKeyConfig?: {
        name: string
        description?: string
        expiresAfter?: string
      }
      config?: Record<string, any>
    }>
    logConfig?: {
      level?: 'NONE' | 'ERROR' | 'ALL'
      retentionInDays?: number
      excludeVerboseContent?: boolean
    }
    xrayEnabled?: boolean
    dataSources?: Record<
      string,
      {
        type:
          | 'AMAZON_DYNAMODB'
          | 'AMAZON_ELASTICSEARCH'
          | 'AWS_LAMBDA'
          | 'HTTP'
          | 'NONE'
          | 'RELATIONAL_DATABASE'
        name: string
        description?: string
        config: Record<string, any>
      }
    >
    mappingTemplates?: Array<{
      dataSource: string
      type: string
      field: string
      request?: string
      response?: string
    }>
    caching?: {
      behavior?: 'FULL_REQUEST_CACHING' | 'PER_RESOLVER_CACHING'
      ttl: number
      atRestEncryption?: boolean
      transitEncryption?: boolean
      type?:
        | 'T2_SMALL'
        | 'T2_MEDIUM'
        | 'R4_LARGE'
        | 'R4_XLARGE'
        | 'R4_2XLARGE'
        | 'R4_4XLARGE'
        | 'R4_8XLARGE'
    }
    tags?: Record<string, string>
  }

  export type Service = ChangeTypeOfKeys<
    DefaultAWS,
    'functions',
    AwsFunctionsWithIamRoleStatements
  > & {
    appSync?: ServerlessAppsyncPluginConfig
  }
}
