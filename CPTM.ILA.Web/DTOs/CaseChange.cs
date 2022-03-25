using CPTM.ILA.Web.Models.ChangeLogging;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class CaseChange
    {
        public Case Case { get; set; }
        public ChangeLog ChangeLog { get; set; }
    }
}