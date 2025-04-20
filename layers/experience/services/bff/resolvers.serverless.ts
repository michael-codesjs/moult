const queries = {
  getUser: {
    dataSource: 'prisma_appsync',
    kind: 'UNIT',
  },
}

const queryEntries = Object.entries(queries).reduce((acc, [key, value]) => {
  acc[`Query.${key}`] = {
    dataSource: 'prisma_appsync',
    kind: 'UNIT',
  }
  return acc
}, {})

const mutations = {
  updateUser: {
    dataSource: 'prisma_appsync',
    kind: 'UNIT',
  },
}

const mutationEntries = Object.entries(mutations).reduce(
  (acc, [key, value]) => {
    acc[`Mutation.${key}`] = {
      dataSource: 'prisma_appsync',
      kind: 'UNIT',
    }
    return acc
  },
  {},
)

export const resolvers = {
  ...queryEntries,
  ...mutationEntries,
} as const
