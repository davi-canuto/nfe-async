import { NFeInput } from "../../types/nfe"

export function generateInfNFe(input: NFeInput): string {
  const infNFeId = `NFe412507${input.emitente.CNPJ}000100000000011000000015`.replace(/>\s+</g, '><').trim();

  const produtosXml = input.produtos.map((p, index) => `
    <det nItem="${index + 1}">
      <prod>
        <cProd>${p.cProd}</cProd>
        <cEAN>${p.cEAN}</cEAN>
        <xProd>${p.xProd}</xProd>
        <NCM>${p.NCM}</NCM>
        <CFOP>${p.CFOP}</CFOP>
        <uCom>${p.uCom}</uCom>
        <qCom>${p.qCom}</qCom>
        <vUnCom>${p.vUnCom}</vUnCom>
        <vProd>${p.vProd}</vProd>
        <cEANTrib>${p.cEANTrib}</cEANTrib>
        <uTrib>${p.uTrib}</uTrib>
        <qTrib>${p.qTrib}</qTrib>
        <vUnTrib>${p.vUnTrib}</vUnTrib>
        <indTot>${p.indTot}</indTot>
      </prod>
      <imposto>
        <ICMS>
          <ICMS00>
            <orig>0</orig>
            <CST>00</CST>
            <modBC>3</modBC>
            <vBC>${p.vBC}</vBC>
            <pICMS>${p.pICMS}</pICMS>
            <vICMS>${p.vICMS}</vICMS>
          </ICMS00>
        </ICMS>
        <PIS>
          <PISAliq>
            <CST>01</CST>
            <vBC>${p.vBC}</vBC>
            <pPIS>${p.pPIS}</pPIS>
            <vPIS>${p.vPIS}</vPIS>
          </PISAliq>
        </PIS>
        <COFINS>
          <COFINSAliq>
            <CST>01</CST>
            <vBC>${p.vBC}</vBC>
            <pCOFINS>${p.pCOFINS}</pCOFINS>
            <vCOFINS>${p.vCOFINS}</vCOFINS>
          </COFINSAliq>
        </COFINS>
      </imposto>
    </det>
  `).join('').replace(/>\s+</g, '><').trim()

  const documentoDest = input.destinatario.CNPJ.length === 14
    ? `<CNPJ>${input.destinatario.CNPJ}</CNPJ>`
    : `<CPF>${input.destinatario.CNPJ}</CPF>`

  return `<infNFe Id="${infNFeId}" versao="4.00">
    <ide>
      <cUF>41</cUF>
      <cNF>00100001</cNF>
      <natOp>VENDA</natOp>
      <mod>55</mod>
      <serie>1</serie>
      <nNF>1</nNF>
      <dhEmi>2025-07-22T09:00:00-03:00</dhEmi>
      <tpNF>1</tpNF>
      <idDest>1</idDest>
      <cMunFG>4115200</cMunFG>
      <tpImp>1</tpImp>
      <tpEmis>1</tpEmis>
      <cDV>5</cDV>
      <tpAmb>2</tpAmb>
      <finNFe>1</finNFe>
      <indFinal>1</indFinal>
      <indPres>1</indPres>
      <procEmi>0</procEmi>
      <verProc>1.0</verProc>
    </ide>
    <emit>
      <CNPJ>${input.emitente.CNPJ}</CNPJ>
      <xNome>${input.emitente.xNome}</xNome>
      <xFant>${input.emitente.xNome}</xFant>
      <enderEmit>
        <xLgr>${input.emitente.enderEmit.xLgr}</xLgr>
        <nro>${input.emitente.enderEmit.nro}</nro>
        <xBairro>${input.emitente.enderEmit.xBairro}</xBairro>
        <cMun>${input.emitente.enderEmit.cMun}</cMun>
        <xMun>${input.emitente.enderEmit.xMun}</xMun>
        <UF>${input.emitente.enderEmit.UF}</UF>
        <CEP>${input.emitente.enderEmit.CEP}</CEP>
        <cPais>${input.emitente.enderEmit.cPais}</cPais>
        <xPais>${input.emitente.enderEmit.xPais}</xPais>
      </enderEmit>
      <IE>${input.emitente.IE}</IE>
      <CRT>${input.emitente.CRT}</CRT>
    </emit>
    <dest>
      ${documentoDest}
      <xNome>${input.destinatario.xNome}</xNome>
      <enderDest>
        <xLgr>${input.destinatario.enderDest.xLgr}</xLgr>
        <nro>${input.destinatario.enderDest.nro}</nro>
        <xBairro>${input.destinatario.enderDest.xBairro}</xBairro>
        <cMun>${input.destinatario.enderDest.cMun}</cMun>
        <xMun>${input.destinatario.enderDest.xMun}</xMun>
        <UF>${input.destinatario.enderDest.UF}</UF>
        <CEP>${input.destinatario.enderDest.CEP}</CEP>
        <cPais>${input.destinatario.enderDest.cPais}</cPais>
        <xPais>${input.destinatario.enderDest.xPais}</xPais>
      </enderDest>
      <indIEDest>${input.destinatario.indIEDest}</indIEDest>
    </dest>
    ${produtosXml}
    <total>
      <ICMSTot>
        <vBC>${input.total.vBC}</vBC>
        <vICMS>${input.total.vICMS}</vICMS>
        <vICMSDeson>0.00</vICMSDeson>
        <vFCP>0.00</vFCP>
        <vBCST>0.00</vBCST>
        <vST>0.00</vST>
        <vFCPST>0.00</vFCPST>
        <vFCPSTRet>0.00</vFCPSTRet>
        <vProd>${input.total.vProd}</vProd>
        <vFrete>0.00</vFrete>
        <vSeg>0.00</vSeg>
        <vDesc>0.00</vDesc>
        <vII>0.00</vII>
        <vIPI>0.00</vIPI>
        <vIPIDevol>0.00</vIPIDevol>
        <vPIS>0.00</vPIS>
        <vCOFINS>0.00</vCOFINS>
        <vOutro>0.00</vOutro>
        <vNF>${input.total.vNF}</vNF>
      </ICMSTot>
    </total>
    <transp><modFrete>9</modFrete></transp>
    <pag><detPag><tPag>01</tPag><vPag>${input.total.vNF}</vPag></detPag></pag>
  </infNFe>`.replace(/>\s+</g, '><').trim()
}