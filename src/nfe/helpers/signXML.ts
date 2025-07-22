import fs from 'fs'
import { SignedXml } from 'xml-crypto'

const privateKey = fs.readFileSync('./private-key.pem', 'utf-8')
const certBase64 = fs.readFileSync('./cert.pem', 'utf-8')
  .replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\r?\n/g, '')

export function signInfNFe(infNFeXml: string): string {
  const id = infNFeXml.match(/Id="([^"]+)"/)?.[1]
  if (!id) throw new Error('Não foi possível extrair o ID do infNFe')

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
  return signer.getSignatureXml()
}
