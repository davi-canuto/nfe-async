import { api } from "../services/api"
import { UF } from "../types/nfe"
import { getSefazWsdl } from "./helpers/getSefazWsdl"
import { getSoapEnvelope } from "./helpers/getSoapEnvelope"
import { getUfCode } from "./helpers/getUfCode"
import { XMLBuilder } from 'fast-xml-parser'

const builder = new XMLBuilder({ ignoreAttributes: false })

function generateStatusServiceBodyJson() {
  return {}
}

export async function authorizeNFe(): Promise<string> {
  const bodyJson = generateAuthorizeNFeBodyJson()
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