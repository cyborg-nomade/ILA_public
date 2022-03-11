using System.Web;
using System.Web.Optimization;

namespace CPTM.ILA.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/funcoes").Include("~/Scripts/funcoes.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
        }
    }
}

