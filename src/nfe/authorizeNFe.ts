import { NFeInput } from "../types/nfe"
import { post } from "../services/api"
import { signXML } from './helpers/signXML'
import { generateInfNFe } from "./helpers/generateNFe"

const WSDL = 'https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx'
const NAMESPACE = 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4'

export async function authorizeNFe(input: NFeInput): Promise<string> {
  const infNFeXml = generateInfNFe(input)

  const nfeXml = `<NFe xmlns="http://www.portalfiscal.inf.br/nfe">${infNFeXml}</NFe>`

  const enviNFeXml = `<enviNFe xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
    <idLote>000000001</idLote>
    <indSinc>1</indSinc>
    ${nfeXml}
  </enviNFe>`.replace(/>\s+</g, '><').trim();

  const signedXML = await signXML(enviNFeXml)

  console.log(signedXML)

  const soapEnvelope = buildSoapEnvelope(NAMESPACE, signedXML)

  const response = await post(
    WSDL,
    soapEnvelope,
    `${NAMESPACE}/nfeAutorizacaoLote`
  )

  return response
}

function buildSoapEnvelope(namespace: string, xmlBody: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
          <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" xmlns:nfe="${namespace}">
            <soap12:Body>
              <nfe:nfeDadosMsg>
              ${
                xmlBody.replace(/<\?xml.*?\?>/, '') 
                       .replace(/>\s+</g, '><')     
                       .trim() 
              }
              </nfe:nfeDadosMsg>
            </soap12:Body>
          </soap12:Envelope>`
}