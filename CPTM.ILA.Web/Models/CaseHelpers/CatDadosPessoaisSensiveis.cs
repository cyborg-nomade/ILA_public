using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_CAT_DADOS_PESSOAIS_SENS")]
    public class CatDadosPessoaisSensiveis
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> OrigemRacialEtnica { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> ConviccaoReligiosa { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> OpiniaoPolitica { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> FiliacaoSindicato { get; set; }


        public ICollection<ItemCategoriaDadosPessoais> FiliacaoOrgReligiosa { get; set; }

        public ICollection<ItemCategoriaDadosPessoais> FiliacaoCrencaFilosofica { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> FiliacaoPreferenciaPolitica { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> SaudeVidaSexual { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Geneticos { get; set; }
        public ICollection<ItemCategoriaDadosPessoais> Biometricos { get; set; }
    }
}