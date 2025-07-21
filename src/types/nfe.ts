export type UF = 'RS' | 'SP' | 'PR' | 'SC'

export interface NFeInput {
  cnpj: string
  valorTotal: number

  emitente: {
    cnpj: string
    xNome: string
    IE: string
    UF: UF
  }

  destinatario: {
    cpfCnpj: string
    xNome: string
    UF: UF
  }

  produtos: Array<{
    xProd: string
    vProd: number
    NCM: string
    CFOP: string
    uCom: string
    qCom: number
  }>
}
