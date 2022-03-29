using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.CaseHelpers.Enums;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_COMPARTILH_DADOS")]
    public class ItemCompartilhamentoDados
    {
        public int Id { get; set; }
        public string NomeInstituicao { get; set; }
        public TipoCompartilhamentoDados TipoCompDados { get; set; }
        public TipoNivelCompartilhamento NivelCompartilhamento { get; set; }
        [MaxLength(250)] public string DescricaoDadosCompartilhados { get; set; }
        public TipoFinalidadeCompartilhamento FinalidadeComp { get; set; }
        [MaxLength(250)] public string DescricaoFinalidadeComp { get; set; }

        public ItemCompartilhamentoDados Rectify()
        {
            if (NivelCompartilhamento == TipoNivelCompartilhamento.TodoOProcesso())
            {
                DescricaoDadosCompartilhados = null;
            }

            if (TipoCompDados == TipoCompartilhamentoDados.Privado())
            {
                DescricaoFinalidadeComp = null;
            }

            if (TipoCompDados == TipoCompartilhamentoDados.Publico())
            {
                FinalidadeComp = new TipoFinalidadeCompartilhamento(null);
            }

            return this;
        }
    }
}