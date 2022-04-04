using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using CPTM.ILA.Web.DTOs;

namespace CPTM.ILA.Web.Models.AccessControl
{
    [Table("ILA_ACCESS_REQUESTS")]
    public class AccessRequest
    {
        public int Id { get; set; }
        public string UsernameSolicitante { get; set; }
        public string UsernameSuperior { get; set; }
        public string Justificativa { get; set; }
        public string EmailSuperiorPath { get; set; }
        public ICollection<Group> Groups { get; set; }
        public TipoSolicitacaoAcesso TipoSolicitacaoAcesso { get; set; }

        public static AccessRequestDTO ReduceToDto(AccessRequest accessRequest) =>
            new AccessRequestDTO()
            {
                UsernameSuperior = accessRequest.UsernameSuperior,
                UsernameSolicitante = accessRequest.UsernameSolicitante,
                Justificativa = accessRequest.Justificativa,
                TipoSolicitacaoAcesso = accessRequest.TipoSolicitacaoAcesso,
                GroupNames = accessRequest.Groups.Select(accessRequestGroup => accessRequestGroup.Nome)
                    .ToList()
            };
    }

    public enum TipoSolicitacaoAcesso
    {
        AcessoAoSistema,
        AcessoAGrupos,
        AcessoComite
    }
}