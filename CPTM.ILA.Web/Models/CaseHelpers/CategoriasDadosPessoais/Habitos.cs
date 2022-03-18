using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_HABITOS")]
    public class Habitos
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais HabitosPessoais { get; set; }
        public ItemCategoriaDadosPessoais EstiloVida { get; set; }
        public ItemCategoriaDadosPessoais ViagensDeslocamento { get; set; }
        public ItemCategoriaDadosPessoais ContatosSociais { get; set; }
        public ItemCategoriaDadosPessoais Posses { get; set; }


        public ItemCategoriaDadosPessoais DenunciasIncAcidentes { get; set; }

        public ItemCategoriaDadosPessoais Distincoes { get; set; }
        public ItemCategoriaDadosPessoais UsoMidia { get; set; }
    }
}