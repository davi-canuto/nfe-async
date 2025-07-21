export type UF =
  | 'AM' | 'BA' | 'CE' | 'GO' | 'MA' | 'PA'
  | 'PE' | 'PI' | 'PR' | 'RN' | 'RR' | 'SE' | 'TO';

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

export const ufToCUF: Record<UF, number> = {
  AM: 13,
  BA: 29,
  CE: 23,
  GO: 52,
  MA: 21,
  PA: 15,
  PE: 26,
  PI: 22,
  PR: 41,
  RN: 24,
  RR: 14,
  SE: 28,
  TO: 17
};