using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_HABITOS")]
    public class Habitos
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> HabitosPessoais { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> EstiloVida { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> ViagensDeslocamento { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> ContatosSociais { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Posses { get; set; }


        public ICollection<ItemCategoriaDadosPessoais> DenunciasIncAcidentes { get; set; }

        public ICollection<ItemCategoriaDadosPessoais> Distincoes { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> UsoMidia { get; set; }
    }
}