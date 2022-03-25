namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoRiscoPrivacidade
    {
        public TipoRiscoPrivacidade(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static TipoRiscoPrivacidade AcessoNaoAutorizado => new TipoRiscoPrivacidade("Acesso não autorizado");

        public static TipoRiscoPrivacidade ModificacaoNaoAutorizada =>
            new TipoRiscoPrivacidade("Modificação não autorizada");

        public static TipoRiscoPrivacidade Perda =>
            new TipoRiscoPrivacidade("Perda");

        public static TipoRiscoPrivacidade Roubo =>
            new TipoRiscoPrivacidade("Roubo");

        public static TipoRiscoPrivacidade RemocaoNaoAutorizada =>
            new TipoRiscoPrivacidade("Remoção não autorizada");

        public static TipoRiscoPrivacidade ColecaoExcessiva =>
            new TipoRiscoPrivacidade("Coleção excessiva");

        public static TipoRiscoPrivacidade InformacaoInsuficienteFinalidadeTratamento =>
            new TipoRiscoPrivacidade("Informação insuficiente sobre a finalidade do tratamento");

        public static TipoRiscoPrivacidade TratamentoSemConsentimento =>
            new TipoRiscoPrivacidade(
                "Tratamento sem consentimento do titular dos dados pessoais (Caso o tratamento não esteja previsto em legislação ou regulação pertinente)");

        public static TipoRiscoPrivacidade FalhaConsiderarDireitos =>
            new TipoRiscoPrivacidade(
                "Falha em considerar os direitos do titular dos dados pessoais (Ex.: perda do direito de acesso)");

        public static TipoRiscoPrivacidade CompartilharDistribuirSemConsentimento =>
            new TipoRiscoPrivacidade(
                "Compartilhar ou distribuir dados pessoais com terceiros fora da administração pública federal sem o consentimento do titular dos dados pessoais");

        public static TipoRiscoPrivacidade RetencaoProlongadaSemNecessidade =>
            new TipoRiscoPrivacidade("Retenção prolongada de dados pessoais sem necessidade");

        public static TipoRiscoPrivacidade VinculacaoAssociacaoIndevida =>
            new TipoRiscoPrivacidade(
                "Vinculação ou associação indevida, direta ou indireta, dos dados pessoais ao titular");

        public static TipoRiscoPrivacidade FalhaErroProcessamento =>
            new TipoRiscoPrivacidade(
                "Falha ou erro de processamento (Ex.: execução de script de banco de dados que atualiza dado pessoal com informação equivocada, ausência de validação dos dados de entrada, etc.)");

        public static TipoRiscoPrivacidade ReidentificacaoPsudonimizados =>
            new TipoRiscoPrivacidade("Reidentificação de dados pseudonimizados");
    }
}