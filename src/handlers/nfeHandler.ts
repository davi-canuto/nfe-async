export default {
  generateXml(data: any): string {
    return `<xml>Dados da Nfe: ${JSON.stringify(data)}</xml>`;
  },

  signXml(xml: string): string {
    return xml + '<Signed/>';
  },

  async sendNfe(signedXml: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { status: "authorized", protocolId: "x" };
  }
}