namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoCompartilhamentoDados
    {
        public TipoCompartilhamentoDados(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static TipoCompartilhamentoDados Publico() => new TipoCompartilhamentoDados("Público");
        public static TipoCompartilhamentoDados Privado() => new TipoCompartilhamentoDados("Privado");
    }
}