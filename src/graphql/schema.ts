import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"

const typeDefs = `
  type Query {
    jobStatus(jobId: String!): String
  }

   type Mutation {
    enqueueNFe(
      cnpj: String!
      emitente: EmitenteInput!
      destinatario: DestinatarioInput!
      produtos: [ProdutoInput!]!
      valorTotal: Float!
    ): String
  }

  input EmitenteInput {
    cnpj: String!
    xNome: String!
    IE: String!
    UF: String!
  }

  input DestinatarioInput {
    cpfCnpj: String!
    xNome: String!
    UF: String!
  }

  input ProdutoInput {
    xProd: String!
    vProd: Float!
    NCM: String!
    CFOP: String!
    uCom: String!
    qCom: Float!
  }
`

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})