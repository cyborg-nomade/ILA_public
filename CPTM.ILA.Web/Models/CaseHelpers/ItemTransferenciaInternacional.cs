using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_ITEM_TRANSF_INTERNACIONAL")]
    public class ItemTransferenciaInternacional
    {
        public int Id { get; set; }
        public string NomeOrganizacao { get; set; }
        public string Pais { get; set; }
        public string DadosTransferidos { get; set; }
        [MaxLength(250)] public string TipoGarantia { get; set; }

        public ItemTransferenciaInternacional Rectify()
        {
            if (!Enums.Pais.IsPais(Pais))
            {
                Pais = Enums.Pais.ListaDePaises()
                    .OrderBy(p => string.CompareOrdinal(p, Pais))
                    .First();
            }

            return this;
        }
    }
}