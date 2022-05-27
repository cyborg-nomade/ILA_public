using System.Collections.Generic;
using CPTM.ILA.Web.Models.AccessControl;
using CPTM.ILA.Web.Models.CaseHelpers;

namespace CPTM.ILA.Web.Util
{
    public class ApiResponseType<TPayload>
    {
        public string message;
        public TPayload data;
    }

    public class LoginResponseType
    {
        public string message;
        public User user;
        public AgenteTratamento areaTratamentoDados;
        public bool isDeveloper;
        public string token;
    }

    public class TotalsResponseType<TPayload>
    {
        public TPayload totals;
        public int totalQuantity;
    }

    public class GroupsResponseType
    {
        public List<string> diretorias;
        public List<string> gerencias;
        public List<string> dptos;
    }

    public class UsernameQueryResult
    {
        public string username;
        public string name;
    }
}