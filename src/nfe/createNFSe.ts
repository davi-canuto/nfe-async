import { NFSeInput } from "../types/nfse"
import { post } from "../services/api"
import { signXML } from './helpers/signXML'
import { generateLoteRpsXml } from "./helpers/generateNFSe"

const WSDL = 'https://niteroihomologacao.nfe.com.br/nfse/WSNacional2/nfse.asmx'

export async function createNFSe(input: NFSeInput): Promise<string> {
  const loteRpsXML = generateLoteRpsXml(input)

  const signedXML = await signXML(loteRpsXML)

  const soapEnvelope = buildSoapEnvelope(signedXML)

  console.log(soapEnvelope)
  const response = await post(
    WSDL,
    soapEnvelope,
    'http://nfse.abrasf.org.br/RecepcionarLoteRpsSincrono'
  )

  return response
}

function buildSoapEnvelope(xmlBody: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <RecepcionarLoteRpsSincronoRequest xmlns="http://nfse.abrasf.org.br/">
          <nfseCabecMsg xmlns="">
            <![CDATA[
              <cabecalho xmlns="http://www.abrasf.org.br/nfse.xsd" versao="2.04">
                <versaoDados>2.04</versaoDados>
              </cabecalho>
            ]]>
          </nfseCabecMsg>
          <nfseDadosMsg xmlns="">
            <![CDATA[
              ${xmlBody.replace(/<\?xml.*?\?>/, '').trim()}
            ]]>
          </nfseDadosMsg>
        </RecepcionarLoteRpsSincronoRequest>
      </soap:Body>
    </soap:Envelope>`;
}