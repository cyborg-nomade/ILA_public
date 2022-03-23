using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CPTM.ILA.Web.Models.CaseHelpers
{
    [Table("ILA_CATEGORIA_TITULARES")]
    public class CategoriasTitulares
    {
        public int Id { get; set; }
        public ICollection<ItemCategoriaTitulares> Categorias { get; set; }

        public ICollection<ItemCategoriaTitulares> CriancasAdolescentes { get; set; }

        public ICollection<ItemCategoriaTitulares> OutrosGruposVulneraveis { get; set; }
    }
}