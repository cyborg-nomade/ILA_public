using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.CaseHelpers;

namespace CPTM.ILA.Web.DTOs.CaseHelpers
{
    [Table("ILA_CAT_DADOS_PESSOAIS_SENS")]
    public class CatDadosPessoaisSensiveis
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> OrigemRacialEtnica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> ConviccaoReligiosa { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> OpiniaoPolitica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> FiliacaoSindicato { get; set; }


        public virtual ICollection<ItemCategoriaDadosPessoais> FiliacaoOrgReligiosa { get; set; }

        public virtual ICollection<ItemCategoriaDadosPessoais> FiliacaoCrencaFilosofica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> FiliacaoPreferenciaPolitica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> SaudeVidaSexual { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Geneticos { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoais> Biometricos { get; set; }
    }
}