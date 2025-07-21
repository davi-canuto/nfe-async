import axios from 'axios'
import https from 'https'
import fs from 'fs'
import dotenv from "dotenv"

dotenv.config()

const certPath = process.env.CERT_PATH
const keyPath = process.env.KEY_PATH

if (!certPath || !keyPath) {
  throw new Error("CERT_PATH or KEY_PATH not defineds in .env")
}

const httpsAgent = new https.Agent({
  cert: fs.readFileSync(certPath || '', 'utf-8'),
  key: fs.readFileSync(keyPath || '', 'utf-8'),
  rejectUnauthorized: false
})

export const api = axios.create({
  httpsAgent,
  timeout: 10000,
  headers: {
    'Content-Type': 'text/xml; charset=utf-8'
  }
})