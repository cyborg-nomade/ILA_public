using CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class CategoriaDadosPessoais
    {
        public Identificacao Identificacao { get; set; }
        public Financeiros Financeiros { get; set; }
        public Caracteristicas Caracteristicas { get; set; }
        public Habitos Habitos { get; set; }
        public CaracteristicasPsicologicas CaracteristicasPsicologicas { get; set; }
        public ComposicaoFamiliar ComposicaoFamiliar { get; set; }
        public InteressesLazer InteressesLazer { get; set; }
        public Associacoes Associacoes { get; set; }
        public ProcessoJudAdmCrim ProcessoJudAdmCrim { get; set; }
        public HabitosConsumo HabitosConsumo { get; set; }
        public Residenciais Residenciais { get; set; }
        public EducacaoTreinamento EducacaoTreinamento { get; set; }
        public ProfissaoEmprego ProfissaoEmprego { get; set; }
        public RegVideoImgVoz RegVideoImgVoz { get; set; }
        public Outros Outros { get; set; }
    }
}