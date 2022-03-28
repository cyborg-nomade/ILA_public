namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class HipotesesTratamento
    {
        public HipotesesTratamento(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static HipotesesTratamento Consentimento => new HipotesesTratamento("Consentimento do titular");

        public static HipotesesTratamento ObrigacaoLegal =>
            new HipotesesTratamento("Cumprimento de obrigação legal ou regulatória pelo controlador");

        public static HipotesesTratamento PoliticasPublicas =>
            new HipotesesTratamento("Execução de políticas públicas");

        public static HipotesesTratamento EstudoPesquisa =>
            new HipotesesTratamento("Alguma espécie de estudo realizado por órgão de pesquisa");

        public static HipotesesTratamento ExecucaoContratoTitular => new HipotesesTratamento(
            "Execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados");

        public static HipotesesTratamento ExercicioDireitos =>
            new HipotesesTratamento("Exercício regular de direitos em processo judicial, administrativo ou arbitral");

        public static HipotesesTratamento ProtecaoVidaTitular =>
            new HipotesesTratamento("Proteção da vida ou da incolumidade física do titular ou de terceiro");

        public static HipotesesTratamento TutelaSaude => new HipotesesTratamento("Tutela da saúde");

        public static HipotesesTratamento InteressesLegitimosControlador =>
            new HipotesesTratamento("Atender aos interesses legítimos do controlador ou de terceiro");

        public static HipotesesTratamento ProtecaoCredito => new HipotesesTratamento("Proteção do crédito");

        public static HipotesesTratamento PrevencaoFraude =>
            new HipotesesTratamento("Garantia da prevenção à fraude e à segurança do titular");
    }
}