using System.Web.Mvc;

namespace CPTM.ILA.Web
{
    /// <summary>
    /// Configuração de filtros
    /// </summary>
    public class FilterConfig
    {
        /// <summary>
        /// Registra os filtros globais da aplicação
        /// </summary>
        /// <param name="filters"></param>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}