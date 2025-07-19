import { NFe } from "../types/nfe";
import { connectMongo, getMongo } from '../database/mongo'
import { saveNFeLog } from '../handlers/nfeHandler'

export async function processNFe(options: NFe) {
  try {
    await connectMongo()
    const insertedId = await saveNFeLog(options, 'PROCESSING')

    console.log('NF-e registered with ID:', insertedId)

    return { success: true, insertedId }
  } catch (e) {
    console.error('error on process NF-e:', e)
    return { success: false, error: (e as Error).message }
  }
}