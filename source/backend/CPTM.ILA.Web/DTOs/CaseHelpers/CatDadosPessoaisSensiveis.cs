using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.CaseHelpers;

namespace CPTM.ILA.Web.DTOs.CaseHelpers
{
    [Table("ILA_CAT_DADOS_PESSOAIS_SENS")]
    public class CatDadosPessoaisSensiveis
    {
        public int Id { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> OrigemRacialEtnica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> ConviccaoReligiosa { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> OpiniaoPolitica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> FiliacaoSindicato { get; set; }


        public virtual ICollection<ItemCategoriaDadosPessoasDTO> FiliacaoOrgReligiosa { get; set; }

        public virtual ICollection<ItemCategoriaDadosPessoasDTO> FiliacaoCrencaFilosofica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> FiliacaoPreferenciaPolitica { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> SaudeVidaSexual { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> Geneticos { get; set; }
        public virtual ICollection<ItemCategoriaDadosPessoasDTO> Biometricos { get; set; }
    }
}