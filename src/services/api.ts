import axios from 'axios'
import https from 'https'
import fs from 'fs'

const httpsAgent = new https.Agent({
  cert: fs.readFileSync(process.env.CERT_PATH || '', 'utf-8'),
  key: fs.readFileSync(process.env.KEY_PATH || '', 'utf-8'),
  rejectUnauthorized: false
})

export const api = axios.create({
  httpsAgent,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/soap+xml; charset=utf-8',
  }
})