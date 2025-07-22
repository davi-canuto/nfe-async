import { api } from "../services/api"
import { NFeInput } from "../types/nfe"
import { XMLBuilder } from 'fast-xml-parser'
import { buildNFe } from "./helpers/buildNFe"
import { signXML } from "./helpers/signXML"

const builder = new XMLBuilder({ ignoreAttributes: false, format: false })
const WSDL = 'https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx'

export async function authorizeNFe(input: NFeInput): Promise<string> {
  const signedXmlBody = signXML(buildNFe(input))

  console.log(signedXmlBody)
  const soapEnvelope = getSoapEnvelope(
    "http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4",
    signedXmlBody
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