using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using CPTM.ActiveDirectory;
using CPTM.ILA.Web.DTOs;

namespace CPTM.ILA.Web.Models.AccessControl
{
    [Table("ILA_USERS")]
    public class User
    {
        public int Id { get; set; }
        [MaxLength(2000)] public string Username { get; set; }
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

        public static UserDto ReduceToUserDto(User user)
        {
            var userDto = new UserDto()
            {
                Id = user.Id, Username = user.Username, IsComite = user.IsComite, IsDPO = user.IsDPO,
                IsSystem = user.IsSystem, OriginGroup = user.OriginGroup, Groups = user.GroupAccessExpirations
                    .Select(gae => gae.Group)
                    .ToList(),
                Nome = Seguranca.ObterUsuario(user.Username)
                    .Nome.ToUpper()
            };

            return userDto;
        }
    }
}