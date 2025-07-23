import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"

const typeDefs = `
  type Query {
    jobStatus(jobId: String!): String
  }

  type Mutation {
    enqueueNFe(input: NFeInput!): String
  }

  input EnderecoInput {
    xLgr: String!
    nro: String!
    xBairro: String!
    cMun: String!
    xMun: String!
    UF: String!
    CEP: String!
    cPais: String!
    xPais: String!
  }

  input ProdutoInput {
    cProd: String!
    cEAN: String!
    xProd: String!
    NCM: String!
    CFOP: String!
    uCom: String!
    qCom: String!
    vUnCom: String!
    vProd: String!
    cEANTrib: String!
    uTrib: String!
    qTrib: String!
    vUnTrib: String!
    indTot: String!
    vBC: String!
    pICMS: String!
    vICMS: String!
    pPIS: String!
    vPIS: String!
    pCOFINS: String!
    vCOFINS: String!
  }

  input TotalInput {
    vBC: String!
    vICMS: String!
    vProd: String!
    vNF: String!
  }

  input EmitenteInput {
    CNPJ: String!
    xNome: String!
    IE: String!
    CRT: String!
    enderEmit: EnderecoInput!
  }

  input DestinatarioInput {
    CNPJ: String!
    enderDest: EnderecoInput!
    indIEDest: String!
  }

  input NFeInput {
    emitente: EmitenteInput!
    destinatario: DestinatarioInput!
    produtos: [ProdutoInput!]!
    total: TotalInput!
  }
`

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})