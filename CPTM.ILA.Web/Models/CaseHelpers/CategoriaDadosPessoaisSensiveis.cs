using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_CAT_DADOS_PESSOAIS_SENS")]
    public class CategoriaDadosPessoaisSensiveis
    {
        public int Id { get; set; }
        public ItemCategoriaDadosPessoais OrigemRacialEtnica { get; set; }
        public ItemCategoriaDadosPessoais ConviccaoReligiosa { get; set; }
        public ItemCategoriaDadosPessoais OpiniaoPolitica { get; set; }
        public ItemCategoriaDadosPessoais FiliacaoSindicato { get; set; }


        public ItemCategoriaDadosPessoais FiliacaoOrgReligiosa { get; set; }

        public ItemCategoriaDadosPessoais FiliacaoCrencaFilosofica { get; set; }
        public ItemCategoriaDadosPessoais FiliacaoPreferenciaPolitica { get; set; }
        public ItemCategoriaDadosPessoais SaudeVidaSexual { get; set; }
        public ItemCategoriaDadosPessoais Geneticos { get; set; }
        public ItemCategoriaDadosPessoais Biometricos { get; set; }
    }
}