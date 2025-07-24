import { makeExecutableSchema } from "@graphql-tools/schema"
import { resolvers } from "./resolvers"

const typeDefs = `
  type Query {
    jobStatus(jobId: String!): String
  }

  type Mutation {
    enqueueNFSe(input: NFSeInput!): String
  }

  input NFSeInput {
    rps: RpsInput!
    emitente: EmitenteInput!
    servico: ServicoInput!
    tomador: TomadorInput!
  }

  input RpsInput {
    numero: String!
    serie: String!
    tipo: String!
    dataEmissao: String
  }

  input EmitenteInput {
    cnpj: String!
    inscricaoMunicipal: String!
    razaoSocial: String!
  }

  input ServicoInput {
    valor: Float!
    issRetido: Int! # 1 = Sim, 2 = Não
    aliquota: Float!
    itemListaServico: String!
    discriminacao: String!
    codigoMunicipio: String!
  }

  input TomadorInput {
    cnpj: String!
    razaoSocial: String!
    endereco: EnderecoInput!
  }

  input EnderecoInput {
    logradouro: String!
    numero: String!
    bairro: String!
    codigoMunicipio: String!
    uf: String!
    cep: String!
  }
`

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
