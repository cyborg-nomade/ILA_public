using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_AGENTE_TRATAMENTO")]
    public class AgenteTratamento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Area { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
    }
}