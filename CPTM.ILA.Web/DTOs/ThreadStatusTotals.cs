using CPTM.ILA.Web.Models.Messaging;

namespace CPTM.ILA.Web.DTOs
{
    public class ThreadStatusTotals
    {
        public ThreadStatus Status { get; set; }
        public int QuantityInStatus { get; set; }
    }
}