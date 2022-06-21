using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.DTOs.CaseHelpers.CategoriasDadosPessoais
{
    [Table("ILA_HABITOS")]
    public class Habitos
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> HabitosPessoais { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> EstiloVida { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> ViagensDeslocamento { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> ContatosSociais { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> Posses { get; set; }


        public virtual ICollection<ItemCategoriaDadosPessoasDTO> DenunciasIncAcidentes { get; set; }

        public virtual ICollection<ItemCategoriaDadosPessoasDTO> Distincoes { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> UsoMidia { get; set; }
    }
}