namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoMedidaSegurancaPrivacidade
    {
        public TipoMedidaSegurancaPrivacidade(string value)
        {
            Value = value;
        }

        public TipoMedidaSegurancaPrivacidade()
        {
            Value = "";
        }

        public string Value { get; set; }

        public static TipoMedidaSegurancaPrivacidade AberturaTransparenciaNotificacao() =>
            new TipoMedidaSegurancaPrivacidade("Abertura, Transparência e Notificação");

        public static TipoMedidaSegurancaPrivacidade Compliance() =>
            new TipoMedidaSegurancaPrivacidade("Compliance com a Privacidade");

        public static TipoMedidaSegurancaPrivacidade ConsentimentoEscolha() =>
            new TipoMedidaSegurancaPrivacidade("Consentimento e Escolha");

        public static TipoMedidaSegurancaPrivacidade ContinuidadeNegocio() =>
            new TipoMedidaSegurancaPrivacidade("Continuidade de Negócio");

        public static TipoMedidaSegurancaPrivacidade ControleCriptografico() =>
            new TipoMedidaSegurancaPrivacidade("Controles Criptográficos");

        public static TipoMedidaSegurancaPrivacidade ControlesAcessoLógico() =>
            new TipoMedidaSegurancaPrivacidade("Controles de Acesso Lógico");

        public static TipoMedidaSegurancaPrivacidade ControleAcessoPrivacidade() =>
            new TipoMedidaSegurancaPrivacidade("Controle de Acesso e Privacidade");

        public static TipoMedidaSegurancaPrivacidade ControlesSeguranceRedeFisicaAmbiente() =>
            new TipoMedidaSegurancaPrivacidade("Controles de Segurança em Redes, Proteção Física e do Ambiente");

        public static TipoMedidaSegurancaPrivacidade CopiaSeguranca() =>
            new TipoMedidaSegurancaPrivacidade("Cópia de Segurança");

        public static TipoMedidaSegurancaPrivacidade DesenvolvimentoSeguro() =>
            new TipoMedidaSegurancaPrivacidade("Desenvolvimento Seguro");

        public static TipoMedidaSegurancaPrivacidade GestaoCapacidadeRedundancia() =>
            new TipoMedidaSegurancaPrivacidade("Gestão de Capacidade e Redundância");

        public static TipoMedidaSegurancaPrivacidade GestaoMudancas() =>
            new TipoMedidaSegurancaPrivacidade("Gestão de Mudanças");

        public static TipoMedidaSegurancaPrivacidade GestaoRiscos() =>
            new TipoMedidaSegurancaPrivacidade("Gestão de Riscos");

        public static TipoMedidaSegurancaPrivacidade LegitimidadeEspecificacaoProposito() =>
            new TipoMedidaSegurancaPrivacidade("Legitimidade e Especificação de Propósito");

        public static TipoMedidaSegurancaPrivacidade LimitacaoColeta() =>
            new TipoMedidaSegurancaPrivacidade("Limitação de Coleta");

        public static TipoMedidaSegurancaPrivacidade MinimizacaoDados() =>
            new TipoMedidaSegurancaPrivacidade("Minimização de Dados");

        public static TipoMedidaSegurancaPrivacidade ParticipacaoIndividualAcesso() =>
            new TipoMedidaSegurancaPrivacidade("Participação Individual e Acesso");

        public static TipoMedidaSegurancaPrivacidade PrecisaoQualidade() =>
            new TipoMedidaSegurancaPrivacidade("Precisão e qualidade");

        public static TipoMedidaSegurancaPrivacidade RegistroEventosRastreabilidadeLogs() =>
            new TipoMedidaSegurancaPrivacidade("Registro de Eventos, Rastreabilidade e Salvaguarda de Logs");

        public static TipoMedidaSegurancaPrivacidade Responsabilizacao() =>
            new TipoMedidaSegurancaPrivacidade("Responsabilização");

        public static TipoMedidaSegurancaPrivacidade SegurancaWeb() =>
            new TipoMedidaSegurancaPrivacidade("Segurança Web");

        public static TipoMedidaSegurancaPrivacidade UsoRetencaoLimitacaoDivulgacao() =>
            new TipoMedidaSegurancaPrivacidade("Uso, Retenção e Limitação de Divulgação");

        public static TipoMedidaSegurancaPrivacidade RespostaIncidente() =>
            new TipoMedidaSegurancaPrivacidade("Resposta a Incidente");
    }
}