import { api } from "../services/api"
import { NFeInput, ufToCUF } from "../types/nfe"
import { XMLBuilder } from 'fast-xml-parser'

const builder = new XMLBuilder({ ignoreAttributes: false })
const WSDL = 'https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx'

function calculateCDV(nNF: string): string {
  let sum = 0;
  const reversed = nNF.split('').reverse().map(Number);
  for (let i = 0; i < reversed.length; i++) {
    sum += reversed[i] * (i + 2);
  }
  const mod = sum % 11;
  return (mod === 0 || mod === 1) ? '0' : (11 - mod).toString();
}

function jsonBody(input: NFeInput) {
  const { emitente, destinatario, produtos, valorTotal } = input;
  const cUF = ufToCUF[emitente.UF];
  const nNF = '1';
  const cDV = calculateCDV(nNF);

  const infNFe = {
    '@_versao': '4.00',
    '@_Id': `NFe000000000000000${nNF}`,
    ide: {
      cUF,
      natOp: 'VENDA',
      mod: '55',
      serie: '1',
      nNF,
      dhEmi: new Date().toISOString(),
      tpNF: '1',
      idDest: '1',
      tpImp: '1',
      tpEmis: '1',
      cDV,
      tpAmb: '2',
      finNFe: '1',
      indFinal: '1',
      indPres: '1',
      procEmi: '0',
      verProc: '0.0.1'
    },
    emit: {
      CNPJ: emitente.cnpj,
      xNome: emitente.xNome,
      enderEmit: {
        xLgr: 'Rua Emitente',
        nro: '1',
        xBairro: 'Centro',
        cMun: '2408102',  // Exemplo: Mossoró-RN
        xMun: 'Mossoró',
        UF: emitente.UF,
        CEP: '59600000',
        cPais: '1058',
        xPais: 'BRASIL',
      },
      IE: emitente.IE,
      CRT: '3'
    },
    dest: {
      ...(destinatario.cpfCnpj.length === 11
        ? { CPF: destinatario.cpfCnpj }
        : { CNPJ: destinatario.cpfCnpj }),
      xNome: destinatario.xNome,
      enderDest: {
        xLgr: 'Rua Cliente',
        nro: '10',
        xBairro: 'Centro',
        cMun: '2408102',
        xMun: 'Mossoró',
        UF: destinatario.UF,
        CEP: '59600000',
        cPais: '1058',
        xPais: 'BRASIL'
      },
      indIEDest: '9'
    },
    det: produtos.map((prod, idx) => ({
      '@_nItem': `${idx + 1}`,
      prod: {
        cProd: `${idx + 1}`,
        xProd: prod.xProd,
        NCM: prod.NCM,
        CFOP: prod.CFOP,
        uCom: prod.uCom,
        qCom: prod.qCom.toFixed(2),
        vUnCom: (prod.vProd / prod.qCom).toFixed(2),
        vProd: prod.vProd.toFixed(2)
      },
      imposto: {
        ICMS: { ICMS00: { orig: '0', CST: '00', modBC: '3', vBC: prod.vProd.toFixed(2), pICMS: '0.00', vICMS: '0.00' } },
        PIS: { PISAliq: { CST: '01', vBC: prod.vProd.toFixed(2), pPIS: '0.00', vPIS: '0.00' } },
        COFINS: { COFINSAliq: { CST: '01', vBC: prod.vProd.toFixed(2), pCOFINS: '0.00', vCOFINS: '0.00' } }
      }
    })),
    total: {
      ICMSTot: {
        vBC: valorTotal.toFixed(2),
        vICMS: '0.00',
        vICMSDeson: '0.00',
        vFCP: '0.00',
        vBCST: '0.00',
        vST: '0.00',
        vFCPST: '0.00',
        vFCPSTRet: '0.00',
        vProd: valorTotal.toFixed(2),
        vFrete: '0.00',
        vSeg: '0.00',
        vDesc: '0.00',
        vII: '0.00',
        vIPI: '0.00',
        vIPIDevol: '0.00',
        vPIS: '0.00',
        vCOFINS: '0.00',
        vOutro: '0.00',
        vNF: valorTotal.toFixed(2),
      }
    },
    transp: { modFrete: '9' },
    pag: { detPag: { tPag: '01', vPag: valorTotal.toFixed(2) } },
    // Signature: {} // Aqui entra a assinatura correta após gerar o XML
  };

  return {
    enviNFe: {
      '@_xmlns': 'http://www.portalfiscal.inf.br/nfe',
      '@_versao': '4.00',
      idLote: '000000001',
      indSinc: '1',
      NFe: { infNFe /* assinatura precisa ser inserida depois */ }
    }
  }
}

export async function authorizeNFe(input: NFeInput): Promise<string> {
  const xmlBody = builder.build(jsonBody(input));

  const soapEnvelope = getSoapEnvelope(
    "http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4",
    xmlBody
  );

  console.log(soapEnvelope);

  const data = await api(
    WSDL,
    soapEnvelope,
    'http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4/nfeAutorizacaoLote'
  );

  return data;
}

export function getSoapEnvelope(xmlnsUrl: string, xmlBody: string): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:nfe="${xmlnsUrl}">
  <soap:Body>
    <nfe:nfeDadosMsg>
${xmlBody}
    </nfe:nfeDadosMsg>
  </soap:Body>
</soap:Envelope>`;
}