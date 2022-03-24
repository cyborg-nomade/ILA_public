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
        public TipoCompartilhamentoDados TipoCompartilhamentoDados { get; set; }
        public TipoNivelCompartilhamento NivelCompartilhamento { get; set; }
        [MaxLength(250)] public string DescricaoDadosCompartilhados { get; set; }
        public TipoFinalidadeCompartilhamento FinalidadeCompartilhamento { get; set; }
        [MaxLength(250)] public string DescricaoFinalidadeComp { get; set; }

        public ItemCompartilhamentoDados Rectify()
        {
            if (this.NivelCompartilhamento == TipoNivelCompartilhamento.TodoOProcesso())
            {
                this.DescricaoDadosCompartilhados = null;
            }

            if (this.TipoCompartilhamentoDados == TipoCompartilhamentoDados.Privado())
            {
                this.DescricaoFinalidadeComp = null;
            }

            if (this.TipoCompartilhamentoDados == TipoCompartilhamentoDados.Publico())
            {
                this.FinalidadeCompartilhamento = new TipoFinalidadeCompartilhamento(null);
            }

            return this;
        }
    }
}