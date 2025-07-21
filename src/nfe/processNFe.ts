import { NFe } from "../types/nfe"
import { connectMongo } from '../database/mongo'

import { saveNFeLog } from './helpers/trackingNFe'
// import { authorizeNFe } from './authorizeNFe'
import { getStatusService } from './getStatusService'

export async function processNFe(options: NFe) {
  try {
    await connectMongo()
    const insertedId = await saveNFeLog(options, 'PROCESSING')

    const status = await getStatusService("RS")
    // 43 for RS, need hash for state=>code

    console.log("Resposta da SEFAZ:", status)
    console.log('NF-e registered with ID:', insertedId)

    return { success: true, id: insertedId }
  } catch (e) {
    console.error('error on process NF-e:', e)
    return { success: false, error: (e as Error).message }
  }
}