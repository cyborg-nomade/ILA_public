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
            var itemDto = new ItemCategoriaDadosPessoasDTO
            {
                Descricao = itemCategoriaDadosPessoais.Descricao,
                FonteRetencao = itemCategoriaDadosPessoais.FonteRetencao,
                Id = itemCategoriaDadosPessoais.Id,
                LocalArmazenamento = itemCategoriaDadosPessoais.LocalArmazenamento,
                TempoRetencao = itemCategoriaDadosPessoais.TempoRetencao
            };
            return itemDto;
        }

        public static ItemCategoriaDadosPessoais ConvertToDomainItemCategoriaDadosPessoais(
            ItemCategoriaDadosPessoasDTO itemCategoriaDadosPessoasDto, CategoriaDadosPessoaisEnum categoria)
        {
            var itemDomain = new ItemCategoriaDadosPessoais
            {
                Descricao = itemCategoriaDadosPessoasDto.Descricao,
                FonteRetencao = itemCategoriaDadosPessoasDto.FonteRetencao,
                Id = itemCategoriaDadosPessoasDto.Id,
                LocalArmazenamento = itemCategoriaDadosPessoasDto.LocalArmazenamento,
                TempoRetencao = itemCategoriaDadosPessoasDto.TempoRetencao,
                CategoriaDadosPessoais = categoria
            };
            return itemDomain;
        }
    }
}