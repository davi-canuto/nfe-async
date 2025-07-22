import { XMLBuilder } from 'fast-xml-parser'
import fs from 'fs'
import { SignedXml } from 'xml-crypto'

const builder = new XMLBuilder({ ignoreAttributes: false, format: false })

const privateKey = fs.readFileSync('/home/davi-canuto/projects/nfe-async/private-key.pem', 'utf-8')
const certBase64 = fs.readFileSync('/home/davi-canuto/projects/nfe-async/cert.pem', 'utf-8')
  .replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\r?\n/g, '')

export function signXML(nfeJson: any): string {
  const infNFeXml = builder.build({ infNFe: nfeJson.enviNFe.NFe.infNFe })

  const idMatch = infNFeXml.match(/Id="([^"]+)"/)
  if (!idMatch) throw new Error('Não foi possível extrair o ID do infNFe')
  const id = idMatch[1]

  const signer = new SignedXml()
  signer.signingKey = privateKey
  signer.signatureAlgorithm = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1'
  signer.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'

  signer.keyInfoProvider = {
    getKeyInfo: () => `<X509Data><X509Certificate>${certBase64}</X509Certificate></X509Data>`,
    getKey: () => Buffer.from('')
  } as any

  signer.addReference(
    `//*[@Id='${id}']`,
    [
      'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
      'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
    ],
    'http://www.w3.org/2000/09/xmldsig#sha1'
  )

  signer.computeSignature(infNFeXml)
  const signatureXml = signer.getSignatureXml()

  const nfeXml = `
<NFe xmlns="http://www.portalfiscal.inf.br/nfe">
${infNFeXml}
${signatureXml}
</NFe>`.replace(/\s+</g, '<').trim()

  const enviNFeXml = `
<enviNFe xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
<idLote>${nfeJson.enviNFe.idLote}</idLote>
<indSinc>${nfeJson.enviNFe.indSinc}</indSinc>
${nfeXml}
</enviNFe>`.replace(/\s+</g, '<').trim()

  return enviNFeXml
}
