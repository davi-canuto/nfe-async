import { api } from "../services/api"
import { UF, ufToCUF } from "../types/nfe"
import { XMLBuilder, XMLParser } from 'fast-xml-parser'

const builder = new XMLBuilder({ ignoreAttributes: false })
const parser = new XMLParser({ ignoreAttributes: false });

const WSDL = 'https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx'

function jsonBody(cUF: number, tpAmb = 2, xServ = 'STATUS') {
  return {
    consStatServ: {
      '@_versao': '4.00',
      '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
      tpAmb,
      cUF,
      xServ,
    }
  }
}

export async function getStatusService(uf: UF): Promise<number> {
  try {
    const xmlBody = builder.build(jsonBody(ufToCUF[uf]))
    const soapEnvelope = getSoapEnvelope(
      "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4",
      xmlBody
    )

    const data = await api(
      WSDL, 
      soapEnvelope, 
      'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF'
    )

    const parsedData = parser.parse(data)
    const status = parsedData['soap:Envelope']['soap:Body']['nfeResultMsg']['retConsStatServ']["cStat"]

    return status
  } catch (e) {
    throw e
  }
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
</soap12:Envelope>`;
}