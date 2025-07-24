import { NFSeInput } from "../types/nfse"
import { connectMongo } from '../database/mongo'

import { saveNFeLog } from './helpers/trackingNFSe'
import { createNFSe } from './createNFSe'

export async function processNFe(options: NFSeInput) {
  try {
    await connectMongo()

    const insertedId = await saveNFeLog(options)

    const res = await createNFSe(options)
    console.log(res)

    return { success: true, id: insertedId }
  } catch (e) {
    console.error('error on process NF-e:', e)
    return { success: false, error: (e as Error).message }
  }
}