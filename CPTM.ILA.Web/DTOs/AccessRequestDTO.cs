using System.Collections.Generic;
using CPTM.ILA.Web.Models.AccessControl;

namespace CPTM.ILA.Web.DTOs
{
    public class AccessRequestDTO
    {
        public string UsernameSolicitante { get; set; }
        public string UsernameSuperior { get; set; }
        public string Justificativa { get; set; }
        public ICollection<Group> Groups { get; set; }
        public TipoSolicitacaoAcesso TipoSolicitacaoAcesso { get; set; }
    }
}