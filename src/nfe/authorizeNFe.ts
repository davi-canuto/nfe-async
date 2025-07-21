// import { Builder } from "xml2js"
// import { api } from "../services/api"
// import { getSefazWsdl } from "./getSefazWsdl"

// export async function authorizeNFe(data: authorizeNFeT): Promise<string> {
//   const soapEnvelope = `
//   <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope" xmlns:nfe="http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4">
//     <soap12:Header/>
//     <soap12:Body>
//       <nfe:nfeDadosMsg>
//         ${buildNFeXml(data)}
//       </nfe:nfeDadosMsg>
//     </soap12:Body>
//   </soap12:Envelope>
//   `.trim()

//   try {
//     const url = getSefazWsdl(data.uf)

//     const { data } = await api.post(getSefazWsdl(data.uf), soapEnvelope, {
//       headers: {
//         'Content-Type': 'application/soap+xml; charset=utf-8',
//       }
//     })

//     return data
//   } catch (error) {
//     console.error("erro to connect with SEFAZ:", error)
//     throw error
//   }
// }

// function buildNFeXml(data: any): NFe {
//   const builder = new Builder({
//     headless: true,
//     xmldec: {
//       version: "1.0",
//       encoding: "UTF-8",
//       standalone: undefined
//     }
//   })

//   const nfeEnvelope = {
//     "enviNFe": {
//       "$": {
//         xmlns: "http://www.portalfiscal.inf.br/nfe",
//         versao: "4.00"
//       },
//       idLote: "000000000000001",
//       indSinc: "1",
//       NFe: {
//         "$": {
//           xmlns: "http://www.portalfiscal.inf.br/nfe"
//         },
//         infNFe: {
//           "$": {
//             versao: "4.00",
//             Id: `NFe${data.identificacao.cUF}${data.identificacao.cDV}`
//           },
//           ide: {
//             cUF: data.identificacao.cUF,
//             natOp: data.identificacao.natOp,
//             mod: data.identificacao.mod,
//             serie: data.identificacao.serie,
//             nNF: data.identificacao.nNF,
//             dhEmi: data.identificacao.dhEmi,
//             tpNF: data.identificacao.tpNF,
//             idDest: data.identificacao.idDest,
//             tpImp: data.identificacao.tpImp,
//             tpEmis: data.identificacao.tpEmis,
//             cDV: data.identificacao.cDV,
//             tpAmb: data.identificacao.tpAmb,
//             finNFe: data.identificacao.finNFe,
//             indFinal: data.identificacao.indFinal,
//             indPres: data.identificacao.indPres,
//             procEmi: data.identificacao.procEmi,
//             verProc: data.identificacao.verProc
//           },
//           emit: {
//             CNPJ: data.emitente.CNPJ,
//             xNome: data.emitente.xNome,
//             enderEmit: data.emitente.enderEmit,
//             IE: data.emitente.IE,
//             CRT: data.emitente.CRT
//           }
//         }
//       }
//     }
//   }

//   const xml = builder.buildObject(nfeEnvelope)
//   return xml
// }