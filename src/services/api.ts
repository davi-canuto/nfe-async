import fetch from 'node-fetch'
import https from 'https'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const certPath = process.env.CERT_PATH
const keyPath = process.env.KEY_PATH

if (!certPath || !keyPath) {
  throw new Error("CERT_PATH or KEY_PATH not defined in .env")
}

const agent = new https.Agent({
  cert: fs.readFileSync(process.env.CERT_PATH!, 'utf-8'),
  key: fs.readFileSync(process.env.KEY_PATH!, 'utf-8'),
  rejectUnauthorized: false
})

export async function post(url: string, xml: string, soapAction: string, contentType = 'text/xml; charset=utf-8') {
  const response = await fetch(url, {
    method: 'POST',
    body: xml,
    headers: { 
      'Content-Type': contentType,
      'SOAPAction': soapAction
    },
    agent
  })

  if (!response.ok) {
    console.log(response)
    const errorText = await response.text()
    throw new Error(`code: ${response.status} \n response: ${errorText}`)
  }

  return response.text()
}