import fetch from 'node-fetch'
import https from 'https'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const agent = new https.Agent({
  cert: fs.readFileSync(process.env.CERT_PATH!, 'utf-8'),
  key: fs.readFileSync(process.env.KEY_PATH!, 'utf-8'),
  rejectUnauthorized: false
})

export async function api(url: string, xml: string, soapAction: string) {
  const response = await fetch(url, {
    method: 'POST',
    body: xml,
    headers: { 
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': soapAction
    },
    agent
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erro SEFAZ: ${response.status} ${errorText}`)
  }

  return response.text()
}