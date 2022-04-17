using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.DTOs;

namespace CPTM.ILA.Web.Models.AccessControl
{
    [Table("ILA_USERS")]
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public bool IsComite { get; set; }
        public bool IsDPO { get; set; }
        public bool IsSystem { get; set; }
        public Group OriginGroup { get; set; }
        public ICollection<Group> Groups { get; set; }
        public DateTime GroupAccessExpirationDate { get; set; }

        public static ComiteMember ReduceToComiteMember(User user)
        {
            var userAd = Seguranca.ObterUsuario(user.Username);

            return new ComiteMember()
            {
                Id = user.Id,
                Nome = userAd.Nome
            };
        }
    }
}