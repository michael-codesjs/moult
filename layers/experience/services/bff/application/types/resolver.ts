import {
  AppSyncIdentity,
  AppSyncIdentityCognito,
  AppSyncIdentityIAM,
} from 'aws-lambda'

export type ResolveFunctionArgs = {
  type_name: 'Query' | 'Mutation'
  field_name: string
  args: any
  identity: AppSyncIdentity | AppSyncIdentityCognito | AppSyncIdentityIAM
  context?: any
}

type AuthMethods = AppSyncIdentity | AppSyncIdentityCognito | AppSyncIdentityIAM

export type Resolver<A extends any, I extends AuthMethods, R extends any> = (
  args: A,
  identity: I,
) => Promise<R>
export type ResolverMap = {
  Query: {
    [key: string]: Resolver<any, AuthMethods, any>
  }
  Mutation: {
    [key: string]: Resolver<any, AuthMethods, any>
  }
}
