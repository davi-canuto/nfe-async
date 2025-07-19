import { NFe } from "../types/nfe"
import { connectMongo, getMongo } from '../database/mongo'

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

// methods

async function saveNFeLog(options: NFe, status = 'PROCESSING') {
  const db = getMongo()
  const collection = db.collection('nfe_logs')

  const result = await collection.insertOne({
    created_at: new Date(),
    status,
    payload: options
  })

  return result.insertedId
}

async function updateNFeLog(id: number, status: string) {
  return
}