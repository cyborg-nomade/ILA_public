using System.IO;

namespace CPTM.ILA.Web.Models.AccessControl
{
    public class AccessRequest
    {
        public int Id { get; set; }
        public string UsernameSolicitante { get; set; }
        public string Justificativa { get; set; }
        public string UsernameSuperior { get; set; }
        public TipoSolicitacaoAcesso TipoSolicitacaoAcesso { get; set; }
    }

    public enum TipoSolicitacaoAcesso
    {
        AcessoAoSistema,
        AcessoAGrupos,
        AcessoComite
    }
}