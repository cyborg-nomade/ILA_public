﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
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
        public ICollection<GroupAccessExpiration> GroupAccessExpirations { get; set; }

        public static ComiteMember ReduceToComiteMember(User user)
        {
            var userAd = Seguranca.ObterUsuario(user.Username);

            return new ComiteMember()
            {
                Id = user.Id,
                Nome = CultureInfo.InvariantCulture.TextInfo.ToTitleCase(userAd.Nome.ToLower())
            };
        }
    }
}