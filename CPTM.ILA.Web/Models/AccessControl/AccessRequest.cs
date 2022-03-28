using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;

namespace CPTM.ILA.Web.Models.AccessControl
{
    [Table("ILA_ACCESS_REQUESTS")]
    public class AccessRequest
    {
        public int Id { get; set; }
        public string UsernameSolicitante { get; set; }
        public string UsernameSuperior { get; set; }
        public string Justificativa { get; set; }
        public ICollection<Group> Groups { get; set; }
        public TipoSolicitacaoAcesso TipoSolicitacaoAcesso { get; set; }
    }

    public enum TipoSolicitacaoAcesso
    {
        AcessoAoSistema,
        AcessoAGrupos,
        AcessoComite
    }
}