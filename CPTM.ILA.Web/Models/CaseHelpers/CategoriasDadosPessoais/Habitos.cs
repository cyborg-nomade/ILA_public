using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_HABITOS")]
    public class Habitos
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> HabitosPessoais { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> EstiloVida { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> ViagensDeslocamento { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> ContatosSociais { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Posses { get; set; }


        public virtual ICollection<ItemCategoriaDadosPessoais> DenunciasIncAcidentes { get; set; }

        public virtual ICollection<ItemCategoriaDadosPessoais> Distincoes { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> UsoMidia { get; set; }
    }
}