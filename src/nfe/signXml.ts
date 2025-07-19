import { Builder } from "xml2js"
import { NFe } from "../types/nfe"

export async function signXML(xml: string) {
  try {
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