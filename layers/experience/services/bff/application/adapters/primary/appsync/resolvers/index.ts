import { ResolveFunctionArgs, ResolverMap } from '@typings/resolver'
import * as Query from './query'
import * as Mutation from './mutation'

const resolvers: ResolverMap = {
  Query,
  Mutation,
} as const

export const resolve = async (params: ResolveFunctionArgs) => {
  const { type_name, field_name, args, identity } = params
  const resolver = resolvers[type_name][field_name]
  return await resolver(args, identity)
}
