import { SignedXml } from 'xml-crypto'
import * as fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

export function signNFe(xml: string): string {
  const privateKey = fs.readFileSync(process.env.KEY_PATH || '', 'utf8')

  const sig = new SignedXml()
  sig.addReference(
    "//*[local-name()='infNFe']",
    ['http://www.w3.org/2000/09/xmldsig#enveloped-signature'],
    'http://www.w3.org/2001/10/xml-exc-c14n#'
  )
  sig.signingKey = privateKey
  sig.computeSignature(xml)
  return sig.getSignedXml()
}