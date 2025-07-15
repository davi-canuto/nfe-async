import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"

const typeDefs = `
  type Query {
    jobStatus(jobId: String!): String
  }

  type Mutation {
    enqueueNfe(cnpj: String!, value: Float!): String
  }
`

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})