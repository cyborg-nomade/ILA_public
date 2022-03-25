namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoFinalidadeCompartilhamento
    {
        public TipoFinalidadeCompartilhamento(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static TipoFinalidadeCompartilhamento ExecuçãoDescentralizadaAtividadePublica() =>
            new TipoFinalidadeCompartilhamento(
                "I. execução descentralizada de atividade pública, exclusivamente para esse fim específico e determinado");

        public static TipoFinalidadeCompartilhamento DadosAcessiveisPublicamente() =>
            new TipoFinalidadeCompartilhamento("II. dados acessíveis publicamente");

        public static TipoFinalidadeCompartilhamento PrevisãoLegal() =>
            new TipoFinalidadeCompartilhamento("III. previsão legal");

        public static TipoFinalidadeCompartilhamento TransferênciaRespaldadaContratos() =>
            new TipoFinalidadeCompartilhamento(
                "IV. transferência respaldada em contratos, convênios ou instrumentos congêneres comunicados previamente à ANPD, nos termos do artigo 26, § 2º da LGPD");

        public static TipoFinalidadeCompartilhamento PrevençãoFraudesIrregularidades() =>
            new TipoFinalidadeCompartilhamento("V. prevenção de fraudes e irregularidades");

        public static TipoFinalidadeCompartilhamento ProteçãoSegurancaIntegridadeTitular() =>
            new TipoFinalidadeCompartilhamento("VI. proteção à segurança e à integridade do Titular de Dados Pessoais");

        public static TipoFinalidadeCompartilhamento Consentimento() =>
            new TipoFinalidadeCompartilhamento("VII. com o consentimento do Titular de Dados Pessoais");
    }
}