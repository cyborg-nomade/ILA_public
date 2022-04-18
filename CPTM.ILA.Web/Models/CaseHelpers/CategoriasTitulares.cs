using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_CATEGORIA_TITULARES")]
    public class CategoriasTitulares
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaTitulares> Categorias { get; set; }

        public ItemCategoriaTitularesExtra CriancasAdolescentes { get; set; }

        public ItemCategoriaTitularesExtra OutrosGruposVulneraveis { get; set; }
    }
}