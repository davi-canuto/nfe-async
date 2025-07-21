export type UF = 'RS' | 'SP' | 'PR' | 'SC'

export interface NFe {
  cnpj: string,
  value: number,
  identificacao: {
    cUF: string
    natOp: string
    mod: string
    serie: string
    nNF: string
    dhEmi: string
    tpNF: '0' | '1'
    idDest: '1' | '2' | '3'
    tpImp: string
    tpEmis: string
    cDV: string
    tpAmb: '1' | '2'
    finNFe: string
    indFinal: string
    indPres: string
    procEmi: string
    verProc: string
  }
  emitente: {
    CNPJ: string
    xNome: string
    enderEmit: {
      xLgr: string
      nro: string
      xBairro: string
      cMun: string
      xMun: string
      UF: string
      CEP: string
      cPais: string
      xPais: string
      fone?: string
    }
    IE: string
    CRT: string
  }
  destinatario: {
    CNPJ?: string
    CPF?: string
    xNome: string
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
      fone?: string
    }
    indIEDest: string
    IE?: string
  }
  produtos: Array<{
    cProd: string
    xProd: string
    NCM: string
    CFOP: string
    uCom: string
    qCom: string
    vUnCom: string
    vProd: string
    indTot: string
    imposto: {
      ICMS: any
      PIS: any
      COFINS: any
    }
  }>
  total: {
    vProd: string
    vNF: string
  }
  transporte: {
    modFrete: string
  }
  pagamento: Array<{
    tPag: string
    vPag: string
  }>
}