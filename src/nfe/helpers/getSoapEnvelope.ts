export function getSoapEnvelope(xmlnsUrl: string, xmlBody: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:nfe="${xmlnsUrl}">
            <soap:Body>
              <nfe:nfeDadosMsg>${xmlBody}</nfe:nfeDadosMsg>
            </soap:Body>
          </soap:Envelope>`
}
