import { Builder } from "xml2js"
import { NFe } from "../types/nfe"
import { connectMongo } from '../database/mongo'

import { saveNFeLog } from './trackingNFe'
import { getSefazWsdl } from "./getSefazWsdl"

export async function processNFe(options: NFe) {
  try {
    await connectMongo()
    const insertedId = await saveNFeLog(options, 'PROCESSING')

    const emitentUF = options.emitente.enderEmit.UF
    const url = getSefazWsdl(emitentUF, 'NFeAutorizacao');

    console.log('NF-e registered with ID:', insertedId)
    console.log(buildNFeXml(options))

    return { success: true, insertedId }
  } catch (e) {
    console.error('error on process NF-e:', e)
    return { success: false, error: (e as Error).message }
  }
}

export function buildNFeXml(data: NFe): string {
  const builder = new Builder({ headless: true })
  return builder.buildObject({ NFe: data })
}