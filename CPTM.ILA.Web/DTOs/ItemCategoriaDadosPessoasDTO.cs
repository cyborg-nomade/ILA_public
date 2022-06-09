using CPTM.ILA.Web.Models.CaseHelpers;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.DTOs
{
    public class ItemCategoriaDadosPessoasDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public TipoTempoRetencao TempoRetencao { get; set; }
        public TipoFontesRetenção FonteRetencao { get; set; }
        public string LocalArmazenamento { get; set; }

        public static ItemCategoriaDadosPessoasDTO ConvertToItemCategoriaDadosPessoasDto(
            ItemCategoriaDadosPessoais itemCategoriaDadosPessoais)
        {
            var itemDto = new ItemCategoriaDadosPessoasDTO();
            return itemDto;
        }

        public static ItemCategoriaDadosPessoais ConvertToDomainItemCategoriaDadosPessoais(
            ItemCategoriaDadosPessoasDTO itemCategoriaDadosPessoasDto)
        {
            var itemDomain = new ItemCategoriaDadosPessoais();
            return itemDomain;
        }
    }
}