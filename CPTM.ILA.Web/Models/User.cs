﻿using System.Collections.Generic;

namespace CPTM.ILA.Web.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public bool IsComite { get; set; }
        public ICollection<Case> Cases { get; set; }
        public ICollection<Group> Groups { get; set; }
    }
}