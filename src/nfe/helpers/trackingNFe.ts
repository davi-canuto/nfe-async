import { getMongo } from '../../database/mongo'
import { NFeInput } from '../../types/nfe'

export async function saveNFeLog(options: NFeInput, status = 'PROCESSING') {
  const db = getMongo()
  const collection = db.collection('nfe_logs')

  const result = await collection.insertOne({
    created_at: new Date(),
    status,
    payload: options
  })

  return result.insertedId
}

export async function updateNFeLog(id: number, status: string) {
  return
}
