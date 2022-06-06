using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.Messaging;

namespace CPTM.ILA.Web.Models.ChangeLogging
{
    [Table("ILA_CHANGELOGS")]
    public class ChangeLog
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UsernameResp { get; set; }
        public int CaseId { get; set; }
        public string CaseRef { get; set; }
        public DateTime ChangeDate { get; set; }
        public string CaseDiff { get; set; }
    }
}