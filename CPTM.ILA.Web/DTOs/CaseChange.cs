using CPTM.ILA.Web.Models;
using CPTM.ILA.Web.Models.ChangeLogging;

namespace CPTM.ILA.Web.DTOs
{
    public class CaseChange
    {
        public Case Case { get; set; }
        public ChangeLog ChangeLog { get; set; }
    }
}