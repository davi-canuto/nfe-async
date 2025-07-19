import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

let db: Db

export async function connectMongo() {
  if (!db) {
    await client.connect()
    db = client.db(process.env.MONGO_DB_NAME || 'nfe-async')
    console.log('MongoDB connected')
  }
  return db
}

export function getMongo(): Db {
  if (!db) throw new Error('MongoDB not connected')
  return db
}
