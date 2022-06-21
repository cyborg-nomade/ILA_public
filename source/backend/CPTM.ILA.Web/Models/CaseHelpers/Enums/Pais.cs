using System.Collections.Generic;
using System.Globalization;

namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class Pais
    {
        public static ICollection<string> ListaDePaises()
        {
            var cultureList = new List<string>();
            var getCultureInfo = CultureInfo.GetCultures(CultureTypes.SpecificCultures);

            foreach (var getCulture in getCultureInfo)
            {
                var getRegionInfo = new RegionInfo(getCulture.LCID);

                if (!(cultureList.Contains(getRegionInfo.DisplayName)))
                {
                    cultureList.Add(getRegionInfo.DisplayName);
                }
            }

            cultureList.Sort();

            return cultureList;
        }

        public static bool IsPais(string nomePais)
        {
            return ListaDePaises()
                .Contains(nomePais);
        }
    }
}