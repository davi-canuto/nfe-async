import { api } from "../services/api"
import { getSefazWsdl } from "./getSefazWsdl"
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

function generateSoapEnvelope(xmlBody: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:nfe="http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4">
            <soap:Body>
              <nfe:nfeDadosMsg>${xmlBody}</nfe:nfeDadosMsg>
            </soap:Body>
          </soap:Envelope>`
}

export async function getStatusService(): Promise<string> {
  const bodyJson = generateStatusServiceBodyJson(1, 43)
  const soapEnvelope = generateSoapEnvelope(builder.build(bodyJson))

  const url = getSefazWsdl("RS", 'NfeStatusServico')
  if (!url) throw new Error("missing wsdl url")

  const { data } = await api.post(url, soapEnvelope, {
    headers: {
      'SOAPAction': 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4/nfeStatusServicoNF',
    },
  })

  return data
}