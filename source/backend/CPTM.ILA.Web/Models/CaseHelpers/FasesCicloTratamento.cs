using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_FASES_CICLO_TRATAMENTO")]
    public class FasesCicloTratamento
    {
        public int Id { get; set; }
        public bool Coleta { get; set; }
        public bool Retencao { get; set; }
        public bool Processamento { get; set; }
        public bool Compartilhamento { get; set; }
        public bool Eliminacao { get; set; }
    }
}