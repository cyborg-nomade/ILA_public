namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoNivelCompartilhamento
    {
        public TipoNivelCompartilhamento(string value)
        {
            Value = value;
        }

        public TipoNivelCompartilhamento()
        {
            Value = "";
        }

        public string Value { get; set; }

        public static TipoNivelCompartilhamento TodoOProcesso => new TipoNivelCompartilhamento("Todo o processo");
        public static TipoNivelCompartilhamento Parcial => new TipoNivelCompartilhamento("Parcial");
    }
}