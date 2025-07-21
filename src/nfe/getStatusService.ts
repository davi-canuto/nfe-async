import { api } from "../services/api"
import { UF } from "../types/nfe"
import { getSefazWsdl } from "./helpers/getSefazWsdl"
import { getSoapEnvelope } from "./helpers/getSoapEnvelope"
import { getUfCode } from "./helpers/getUfCode"
import { XMLBuilder, XMLParser } from 'fast-xml-parser'

const builder = new XMLBuilder({ ignoreAttributes: false })
const parser = new XMLParser({ ignoreAttributes: false });

function jsonBody(cUF: number, tpAmb = 1, xServ = 'STATUS') {
  return {
    consStatServ: {
      '@_versao': '4.00',
      '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
      tpAmb, // 1 for homolog, 2 for production
      cUF,
      xServ,
    }
  }
}

export async function getStatusService(uf: UF): Promise<number> {
  try {
    const soapEnvelope = getSoapEnvelope(
      "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4",
      builder.build(jsonBody(getUfCode(uf)))
    )

    const url = getSefazWsdl(uf, 'NfeStatusServico')
    if (!url) throw new Error("missing wsdl url")

    const data = await api(url, soapEnvelope, 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF')

    const parsedData = parser.parse(data)
    const status = parsedData['soap:Envelope']['soap:Body']['nfeResultMsg']['retConsStatServ']["cStat"]

    return status
  } catch (e) {
    throw e
  }
}