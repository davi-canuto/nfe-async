import { api } from "../services/api"
import { getSefazWsdl } from "./getSefazWsdl"

export async function getStatusService(): Promise<string> {
  const soapEnvelope = `
  <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" xmlns:nfe="http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4">
    <tpAmb>1</tpAmb>
    <cUF>35</cUF>
    <xServ>STATUS</xServ>
  </soap12:Envelope>
  `.trim()

  try {
    const url = getSefazWsdl("SP", 'NfeStatusServico')

    if (url === null) {
      throw "missing wsdl url"
    }

    const { data } = await api.post(url, soapEnvelope, {
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
      }
    })

    return data
  } catch (error) {
    console.error("erro to connect with SEFAZ:", error)
    throw error
  }
}