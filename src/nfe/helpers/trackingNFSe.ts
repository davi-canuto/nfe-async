import { getMongo } from '../../database/mongo'
import { NFSeInput } from '../../types/nfse'

enum NFeStatus {
  PROCESSING = 'PROCESSING',
  AUTHORIZED = 'AUTHORIZED',
  DENIED = 'DENIED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED'
}

export async function saveNFeLog(options: NFSeInput) {
  const db = getMongo()
  const collection = db.collection('nfe_logs')

  const result = await collection.insertOne({
    created_at: new Date(),
    status: NFeStatus.PROCESSING,
    payload: options
  })

  return result.insertedId
}

export async function updateNFeLog(id: string, status: NFeStatus) {
  const db = getMongo()
  const collection = db.collection('nfe_logs')

  await collection.updateOne(
    { _id: new Object(id) },
    { $set: { status } }
  )
}