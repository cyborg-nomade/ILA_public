namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class TipoGarantiaTransferenciaInternacional
    {
        public TipoGarantiaTransferenciaInternacional(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static TipoGarantiaTransferenciaInternacional AcordoCooperacaoInt =>
            new TipoGarantiaTransferenciaInternacional("Acordo de cooperação internacional");

        public static TipoGarantiaTransferenciaInternacional Certificacao =>
            new TipoGarantiaTransferenciaInternacional("Certificação regularmente emitida");

        public static TipoGarantiaTransferenciaInternacional ClausulasContratuaisEspecificas =>
            new TipoGarantiaTransferenciaInternacional(
                "Cláusulas contratuais específicas para determinada transferência");

        public static TipoGarantiaTransferenciaInternacional ClausulasContratuaisPadrao =>
            new TipoGarantiaTransferenciaInternacional("Cláusulas-padrão contratuais");

        public static TipoGarantiaTransferenciaInternacional CodigoConduta =>
            new TipoGarantiaTransferenciaInternacional("Código de conduta regularmente emitido");

        public static TipoGarantiaTransferenciaInternacional CooperacaoJuridicaInt =>
            new TipoGarantiaTransferenciaInternacional(
                "Cooperação jurídica internacional entre órgãos públicos de inteligência, de investigação e de persecução, de acordo com os instrumentos de direito internacional");

        public static TipoGarantiaTransferenciaInternacional CumprimentObrigacaoLegalRegulatorioa =>
            new TipoGarantiaTransferenciaInternacional(
                "Cumprimento de obrigação legal ou regulatória pelo controlador");

        public static TipoGarantiaTransferenciaInternacional ExecucaoContratoTitular =>
            new TipoGarantiaTransferenciaInternacional(
                "Execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular");

        public static TipoGarantiaTransferenciaInternacional ExecucaoPoliticaPublica =>
            new TipoGarantiaTransferenciaInternacional(
                "Execução de política pública ou atribuição legal do serviço público");

        public static TipoGarantiaTransferenciaInternacional ExercicioDireitos =>
            new TipoGarantiaTransferenciaInternacional(
                "Exercício regular de direitos em processo judicial, administrativo ou arbitral");

        public static TipoGarantiaTransferenciaInternacional ConsentimentoEspecificoTitular =>
            new TipoGarantiaTransferenciaInternacional(
                "Fornecimento de consentimento específico pelo titular dos dados pessoais");

        public static TipoGarantiaTransferenciaInternacional NormasCorporativasGlobais =>
            new TipoGarantiaTransferenciaInternacional("Normas corporativas globais");

        public static TipoGarantiaTransferenciaInternacional NivelAdequadoProtecaoPais =>
            new TipoGarantiaTransferenciaInternacional("País que fornece um nível adequado de proteção");

        public static TipoGarantiaTransferenciaInternacional ProtecaoVidaTitular =>
            new TipoGarantiaTransferenciaInternacional(
                "Proteção da vida ou da incolumidade física do titular ou de terceiro");

        public static TipoGarantiaTransferenciaInternacional Selo =>
            new TipoGarantiaTransferenciaInternacional("Selo regularmente emitido");

        public static TipoGarantiaTransferenciaInternacional AutorizadaAnpd =>
            new TipoGarantiaTransferenciaInternacional("Transferência autorizada pela ANPD");
    }
}