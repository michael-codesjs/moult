import {
  AppSyncResolverEvent,
  AppSyncIdentityCognito,
  AppSyncIdentityIAM,
  AppSyncIdentity,
} from 'aws-lambda'
import { resolve } from './resolvers'

export const main = async (event: AppSyncResolverEvent<any>) => {
  try {
    console.log('AppSync event received:', JSON.stringify(event, null, 2))

    const type_name = event.info.parentTypeName
    const field_name = event.info.fieldName
    const args = event.arguments

    const identity:
      | AppSyncIdentityCognito
      | AppSyncIdentityIAM
      | AppSyncIdentity = event.identity

    console.log(`Routing request for ${type_name}.${field_name}`)

    const result = await resolve({
      type_name: type_name as any,
      field_name,
      args,
      identity,
    })
    return result
  } catch (error) {
    // logging, sentry, etc
    throw error // Re-throw error to AppSync
  }
}
