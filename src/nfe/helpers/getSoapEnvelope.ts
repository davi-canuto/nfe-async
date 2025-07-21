export function getSoapEnvelope(xmlnsUrl: string, xmlBody: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
          <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
                          xmlns:nfe="${xmlnsUrl}">
            <soap12:Body>
              <nfe:nfeDadosMsg>
                ${xmlBody}
              </nfe:nfeDadosMsg>
            </soap12:Body>
          </soap12:Envelope>`
}