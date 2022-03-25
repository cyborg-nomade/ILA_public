namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoNivelCompartilhamento
    {
        public TipoNivelCompartilhamento(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static TipoNivelCompartilhamento TodoOProcesso() => new TipoNivelCompartilhamento("Todo o processo");
        public static TipoNivelCompartilhamento Parcial() => new TipoNivelCompartilhamento("Parcial");
    }
}