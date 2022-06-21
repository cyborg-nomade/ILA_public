using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        public static AccessRequestDTO ReduceToDto(AccessRequest accessRequest)
        {
            var accessRequestDto = new AccessRequestDTO()
            {
                Id = accessRequest.Id,
                UsernameSuperior = accessRequest.UsernameSuperior,
                UsernameSolicitante = accessRequest.UsernameSolicitante,
                Justificativa = accessRequest.Justificativa,
                TipoSolicitacaoAcesso = accessRequest.TipoSolicitacaoAcesso,
                GroupNames = new List<string>()
            };

            if (accessRequest.Groups != null)
            {
                accessRequestDto.GroupNames = accessRequest.Groups.Select(g => g.Nome)
                    .ToList();
            }

            return accessRequestDto;
        }
    }

    public enum TipoSolicitacaoAcesso
    {
        AcessoAoSistema,
        AcessoAGrupos,
        AcessoComite
    }
}