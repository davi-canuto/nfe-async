export type UF =
  | 'AM' | 'BA' | 'CE' | 'GO' | 'MA' | 'PA'
  | 'PE' | 'PI' | 'PR' | 'RN' | 'RR' | 'SE' | 'TO';

export interface NFeInput {
  emitente: {
    CNPJ: string
    xNome: string
    IE: string
    CRT: string

    enderEmit: {
      xLgr: string
      nro: string
      xBairro: string
      cMun: string
      xMun: string
      UF: UF
      CEP: string
      cPais: string
      xPais: string
    }
  }

  destinatario: {
    CNPJ: string
    enderDest: {
      xLgr: string
      nro: string
      xBairro: string
      cMun: string
      xMun: string
      UF: string
      CEP: string
      cPais: string
      xPais: string
    }
    indIEDest: string
  }

  produtos: Array<{
    cProd: string
    cEAN: string
    xProd: string
    NCM: string
    CFOP: string
    uCom: string
    qCom: string
    vUnCom: string
    vProd: string
    cEANTrib: string
    uTrib: string
    qTrib: string
    vUnTrib: string
    indTot: string
    vBC: string
    pICMS: string
    vICMS: string
    pPIS: string
    vPIS: string
    pCOFINS: string
    vCOFINS: string
  }>

  total: {
    vBC: string
    vICMS: string
    vProd: string
    vNF: string
  }
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
}