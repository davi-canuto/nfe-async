import { NFeInput, UF} from "../types/nfe"
import { connectMongo } from '../database/mongo'

import { saveNFeLog } from './helpers/trackingNFe'
import { authorizeNFe } from './authorizeNFe'
import { getStatusService } from './getStatusService'

export async function processNFe(options: NFeInput) {
  try {
    await connectMongo()
    const insertedId = await saveNFeLog(options, 'PROCESSING')

    const uf: UF = options.emitente.UF

    const status = await getStatusService(uf)

    if (status != 107) throw `Sefaz service is down for ${uf}`

    const res = await authorizeNFe(options)
    console.log(res)

    return { success: true, id: insertedId }
  } catch (e) {
    console.error('error on process NF-e:', e)
    return { success: false, error: (e as Error).message }
  }
}