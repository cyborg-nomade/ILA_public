using System.Web.Mvc;
using System.Web.Routing;

namespace CPTM.ILA.Web
{
    /// <summary>
    /// Configuração das rotas
    /// </summary>
    public class RouteConfig
    {
        /// <summary>
        /// Registra as rotas da aplicação
        /// </summary>
        /// <param name="routes"></param>
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("{resource}.aspx/{*pathInfo}");
            routes.IgnoreRoute("{*allaspx}", new { allaspx = @".*(CrystalImageHandler).*" });

            routes.MapRoute(name: "Default", url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional });
        }
    }
}