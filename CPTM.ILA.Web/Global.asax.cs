using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using CPTM.ILA.Web;
using System.Web;
using System.Web.Http;

namespace CPTM.ILA.Web
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Habilita a minificação dos JS e CSS
            BundleTable.EnableOptimizations = true;
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (Context.Request.HttpMethod == "OPTIONS")
            {
                if (Context.Request.Headers["Origin"] != null)
                    Context.Response.AddHeader("Access-Control-Allow-Origin", Context.Request.Headers["Origin"]);

                Context.Response.AddHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
                Context.Response.AddHeader("Access-Control-Allow-Methods", "*");
                Context.Response.AddHeader("Access-Control-Allow-Credentials", "true");

                Response.End();
            }
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}
