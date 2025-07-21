import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({ ignoreAttributes: false });

const statusCodeMessages: Record<string, string> = {
  '100': 'Autorizado o uso da NF-e',
  '107': 'Serviço em operação',
  '108': 'Serviço paralisado momentaneamente',
  '109': 'Serviço paralisado sem previsão',
  '110': 'Uso denegado',
  '111': 'Consulta cadastro com sucesso',
  '410': 'UF não atendida pelo WebService',
  '588': 'Caracteres inválidos ou formatação incorreta',
  '999': 'Erro não catalogado',
};

export function extractStatusCode(xml: string) {
  const parsed = parser.parse(xml);
  const retConsStatServ =
    parsed?.['soap:Envelope']?.['soap:Body']?.['nfeResultMsg']?.['retConsStatServ'];

  if (!retConsStatServ) {
    throw new Error('Invalid SEFAZ response: retConsStatServ not found');
  }

  const cStat = retConsStatServ.cStat;
  const xMotivo = retConsStatServ.xMotivo;
  const descricao = statusCodeMessages[cStat] || 'Código não catalogado';

  return {
    cStat,
    xMotivo,
    descricao,
    full: retConsStatServ
  };
}
