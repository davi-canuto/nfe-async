import { NFeInput, ufToCUF } from "../../types/nfe"

export function buildNFe(input: NFeInput) {
  const { emitente, destinatario, produtos, valorTotal } = input
  
  const cUF = ufToCUF[emitente.UF]
  const nNF = '1'

  return {
    "enviNFe": {
      "@_xmlns": "http://www.portalfiscal.inf.br/nfe",
      "@_versao": "4.00",
      "idLote": "000000001",
      "indSinc": "1",
      "NFe": {
        "infNFe": {
          "@_Id": "NFe41250746433021000100550010000000011000000015",
          "@_versao": "4.00",
          "ide": {
            "cUF": "41",
            "cNF": "00100001",
            "natOp": "VENDA",
            "mod": "55",
            "serie": "1",
            "nNF": "1",
            "dhEmi": "2025-07-22T09:00:00-03:00",
            "tpNF": "1",
            "idDest": "1",
            "cMunFG": "4115200",
            "tpImp": "1",
            "tpEmis": "1",
            "cDV": "5",
            "tpAmb": "2",
            "finNFe": "1",
            "indFinal": "1",
            "indPres": "1",
            "procEmi": "0",
            "verProc": "1.0"
          },
          "emit": {
            "CNPJ": "46433021000100",
            "xNome": "EMPRESA DE EXEMPLO HOMOLOGACAO LTDA",
            "enderEmit": {
              "xLgr": "Rua Teste Homologacao",
              "nro": "100",
              "xBairro": "Centro",
              "cMun": "4115200",
              "xMun": "Curitiba",
              "UF": "PR",
              "CEP": "80000000",
              "cPais": "1058",
              "xPais": "BRASIL"
            },
            "IE": "123456789",
            "CRT": "3"
          },
          "dest": {
            "CNPJ": "00000000000191",
            "xNome": "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL",
            "enderDest": {
              "xLgr": "Rua Teste",
              "nro": "100",
              "xBairro": "Centro",
              "cMun": "4115200",
              "xMun": "Curitiba",
              "UF": "PR",
              "CEP": "80000000",
              "cPais": "1058",
              "xPais": "BRASIL"
            },
            "indIEDest": "9"
          },
          "det": {
            "@_nItem": "1",
            "prod": {
              "cProd": "001",
              "cEAN": "SEM GTIN",
              "xProd": "Produto Teste Homologacao",
              "NCM": "39269090",
              "CFOP": "5102",
              "uCom": "UN",
              "qCom": "1.0000",
              "vUnCom": "100.00",
              "vProd": "100.00",
              "cEANTrib": "SEM GTIN",
              "uTrib": "UN",
              "qTrib": "1.0000",
              "vUnTrib": "100.00",
              "indTot": "1"
            },
            "imposto": {
              "ICMS": {
                "ICMS00": {
                  "orig": "0",
                  "CST": "00",
                  "modBC": "3",
                  "vBC": "100.00",
                  "pICMS": "0.00",
                  "vICMS": "0.00"
                }
              },
              "PIS": {
                "PISAliq": {
                  "CST": "01",
                  "vBC": "100.00",
                  "pPIS": "0.00",
                  "vPIS": "0.00"
                }
              },
              "COFINS": {
                "COFINSAliq": {
                  "CST": "01",
                  "vBC": "100.00",
                  "pCOFINS": "0.00",
                  "vCOFINS": "0.00"
                }
              }
            }
          },
          "total": {
            "ICMSTot": {
              "vBC": "100.00",
              "vICMS": "0.00",
              "vICMSDeson": "0.00",
              "vFCP": "0.00",
              "vBCST": "0.00",
              "vST": "0.00",
              "vFCPST": "0.00",
              "vFCPSTRet": "0.00",
              "vProd": "100.00",
              "vFrete": "0.00",
              "vSeg": "0.00",
              "vDesc": "0.00",
              "vII": "0.00",
              "vIPI": "0.00",
              "vIPIDevol": "0.00",
              "vPIS": "0.00",
              "vCOFINS": "0.00",
              "vOutro": "0.00",
              "vNF": "100.00"
            }
          },
          "transp": {
            "modFrete": "9"
          },
          "pag": {
            "detPag": {
              "tPag": "01",
              "vPag": "100.00"
            }
          }
        }
      }
    }
  }
}
