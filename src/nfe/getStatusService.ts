import { api } from "../services/api"
import { UF } from "../types/nfe"
import { getSefazWsdl } from "./helpers/getSefazWsdl"
import { getSoapEnvelope } from "./helpers/getSoapEnvelope"
import { getUfCode } from "./helpers/getUfCode"
import { XMLBuilder } from 'fast-xml-parser'

const builder = new XMLBuilder({ ignoreAttributes: false })

function generateStatusServiceBodyJson(cUF: number, tpAmb = 1, xServ = 'STATUS') {
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

export async function getStatusService(uf: UF): Promise<string> {
  const bodyJson = generateStatusServiceBodyJson(getUfCode(uf))
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