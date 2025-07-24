export type UF =
  | 'AM' | 'BA' | 'CE' | 'GO' | 'MA' | 'PA'
  | 'PE' | 'PI' | 'PR' | 'RN' | 'RR' | 'SE' | 'TO'

export interface NFSeInput {
  rps: {
    numero: string
    serie: string
    tipo: string
    dataEmissao?: string
  }
  emitente: {
    cnpj: string
    inscricaoMunicipal: string
  }
  servico: {
    valor: number
    issRetido: 1 | 2
    aliquota: number
    itemListaServico: string
    discriminacao: string
    codigoMunicipio: string
  }
  tomador: {
    cnpj: string
    razaoSocial: string
    endereco: {
      logradouro: string
      numero: string
      bairro: string
      codigoMunicipio: string
      uf: string
      cep: string
    }
  }
}