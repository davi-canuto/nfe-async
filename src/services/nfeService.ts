export async function processNfe(data: any) {
  const xml = generateXml(data)
  const signedXml = signXml(xml)
  const response = await sendNfe(signedXml)
  return response
}

function generateXml(data: any): string {
  return `<NFe><infNFe>${JSON.stringify(data)}</infNFe></NFe>`
}

function signXml(xml: string): string {
  return `<Signed>${xml}</Signed>`
}

async function sendNfe(signedXml: string): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { status: "authorized", protocolId: "x" }
}
