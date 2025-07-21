import { api } from "../services/api"
import { getSefazWsdl } from "./helpers/getSefazWsdl"
import { getSoapEnvelope } from "./helpers/getSoapEnvelope"
import { XMLBuilder } from 'fast-xml-parser'

const builder = new XMLBuilder({ ignoreAttributes: false })

function generateStatusServiceBodyJson(tpAmb: number, cUF: number, xServ = 'STATUS') {
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

export async function getStatusService(): Promise<string> {
  const bodyJson = generateStatusServiceBodyJson(1, 43)
  const soapEnvelope = getSoapEnvelope(
    "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4",
    builder.build(bodyJson)
  )

  const url = getSefazWsdl("RS", 'NfeStatusServico')
  if (!url) throw new Error("missing wsdl url")

  const { data } = await api.post(url, soapEnvelope, {
    headers: {
      'SOAPAction': 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF',
    },
  })

  return data
}