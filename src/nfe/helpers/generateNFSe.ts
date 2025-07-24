import { NFSeInput } from "../../types/nfse"
import { format } from "date-fns"

export function generateLoteRpsXml(input: NFSeInput): string {
  const numeroRps = input.rps.numero
  const serie = input.rps.serie
  const tipo = input.rps.tipo
  const dataEmissao = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
  const idRps = `RPS${numeroRps}`

  return `<EnviarLoteRpsEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
          <LoteRps Id="lote001" versao="2.04">
            <NumeroLote>1</NumeroLote>
            <Cnpj>${input.emitente.cnpj}</Cnpj>
            <InscricaoMunicipal>${input.emitente.inscricaoMunicipal}</InscricaoMunicipal>
            <QuantidadeRps>1</QuantidadeRps>
            <ListaRps>
              <Rps>
                <InfDeclaracaoPrestacaoServico Id="${idRps}">
                  <Rps>
                    <IdentificacaoRps>
                      <Numero>${numeroRps}</Numero>
                      <Serie>${serie}</Serie>
                      <Tipo>${tipo}</Tipo>
                    </IdentificacaoRps>
                    <DataEmissao>${dataEmissao}</DataEmissao>
                    <Status>1</Status>
                  </Rps>
                  <Servico>
                    <Valores>
                      <ValorServicos>${input.servico.valor.toFixed(2)}</ValorServicos>
                      <IssRetido>${input.servico.issRetido}</IssRetido>
                      <Aliquota>${input.servico.aliquota}</Aliquota>
                    </Valores>
                    <ItemListaServico>${input.servico.itemListaServico}</ItemListaServico>
                    <Discriminacao>${input.servico.discriminacao}</Discriminacao>
                    <CodigoMunicipio>${input.servico.codigoMunicipio}</CodigoMunicipio>
                  </Servico>
                  <Prestador>
                    <Cnpj>${input.emitente.cnpj}</Cnpj>
                    <InscricaoMunicipal>${input.emitente.inscricaoMunicipal}</InscricaoMunicipal>
                  </Prestador>
                  <TomadorServico>
                    <IdentificacaoTomador>
                      <CpfCnpj>
                        ${input.tomador.cnpj.length === 14
              ? `<Cnpj>${input.tomador.cnpj}</Cnpj>`
              : `<Cpf>${input.tomador.cnpj}</Cpf>`}
                      </CpfCnpj>
                    </IdentificacaoTomador>
                    <RazaoSocial>${input.tomador.razaoSocial}</RazaoSocial>
                    <Endereco>
                      <Endereco>${input.tomador.endereco.logradouro}</Endereco>
                      <Numero>${input.tomador.endereco.numero}</Numero>
                      <Bairro>${input.tomador.endereco.bairro}</Bairro>
                      <CodigoMunicipio>${input.tomador.endereco.codigoMunicipio}</CodigoMunicipio>
                      <Uf>${input.tomador.endereco.uf}</Uf>
                      <Cep>${input.tomador.endereco.cep}</Cep>
                    </Endereco>
                  </TomadorServico>
                </InfDeclaracaoPrestacaoServico>
              </Rps>
            </ListaRps>
          </LoteRps>
        </EnviarLoteRpsEnvio>`.replace(/>\s+</g, '><').trim()
}
