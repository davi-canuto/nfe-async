import { api } from "../services/api"
import { NFeInput, ufToCUF } from "../types/nfe"
import { XMLBuilder } from 'fast-xml-parser'

const builder = new XMLBuilder({ ignoreAttributes: false })
const WSDL = 'https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx'

function jsonBody(input: NFeInput) {
  const { emitente, destinatario, produtos, valorTotal } = input

  return {
    enviNFe: {
      '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
      '@_versao': '4.00',
      idLote: '000000001',
      indSinc: '1',
      NFe: {
        infNFe: {
          '@_versao': '4.00',
          '@_Id': 'NFe0000000000000001',
          ide: {
            cUF: 24,
            natOp: 'VENDA',
            mod: '55',
            serie: '1',
            nNF: '1',
            dhEmi: new Date().toISOString(),
            tpNF: '1',
            idDest: '1',
            tpImp: '1',
            tpEmis: '1',
            cDV: '0',
            tpAmb: '2',
            finNFe: '1',
            indFinal: '1',
            indPres: '1',
            procEmi: '0',
            verProc: '0.0.1'
          },
          emit: {
            CNPJ: emitente.cnpj,
            xNome: emitente.xNome,
            enderEmit: {
              xLgr: 'Rua Emitente',
              nro: '1',
              xBairro: 'Centro',
              cMun: '4115200',
              xMun: 'Curitiba',
              UF: emitente.UF,
              CEP: '80000000',
              cPais: '1058',
              xPais: 'BRASIL',
            },
            IE: emitente.IE,
            CRT: '3'
          },
          dest: {
            ...(destinatario.cpfCnpj.length === 11 ? { CPF: destinatario.cpfCnpj } : { CNPJ: destinatario.cpfCnpj }),
            xNome: destinatario.xNome,
            enderDest: {
              xLgr: 'Rua Cliente',
              nro: '10',
              xBairro: 'Centro',
              cMun: '4115200',
              xMun: 'Curitiba',
              UF: destinatario.UF,
              CEP: '80000000',
              cPais: '1058',
              xPais: 'BRASIL'
            },
            indIEDest: '9'
          },
          det: produtos.map((prod, idx) => ({
            '@_nItem': `${idx + 1}`,
            prod: {
              cProd: `${idx + 1}`,
              xProd: prod.xProd,
              NCM: prod.NCM,
              CFOP: prod.CFOP,
              uCom: prod.uCom,
              qCom: prod.qCom.toFixed(2),
              vUnCom: (prod.vProd / prod.qCom).toFixed(2),
              vProd: prod.vProd.toFixed(2)
            },
            imposto: {}
          })),
          total: {
            ICMSTot: {
              vProd: valorTotal.toFixed(2),
              vNF: valorTotal.toFixed(2)
            }
          },
          transp: { modFrete: '9' }
        }
      }
    }
  }
}

export async function authorizeNFe(input: any): Promise<string> {
  const xmlBody = builder.build(jsonBody(input))

  const soapEnvelope = getSoapEnvelope(
    "http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4",
    xmlBody
  )

  console.log(soapEnvelope)

  const data = await api(
    WSDL,
    soapEnvelope,
    'http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4/nfeAutorizacaoLote'
  )

  return data
}

export function getSoapEnvelope(xmlnsUrl: string, xmlBody: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
                 xmlns:nfe="${xmlnsUrl}">
  <soap12:Body>
    <nfe:nfeDadosMsg>
${xmlBody}
    </nfe:nfeDadosMsg>
  </soap12:Body>
</soap12:Envelope>`
}