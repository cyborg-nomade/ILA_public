using System.Collections.Generic;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class CategoriasTitulares
    {
        public ICollection<ItemCategoriaTitulares> Categorias { get; set; }
        public ICollection<ItemCategoriaTitulares> CriancasAdolescentes { get; set; }
        public ICollection<ItemCategoriaTitulares> OutrosGruposVulneraveis { get; set; }
    }
}