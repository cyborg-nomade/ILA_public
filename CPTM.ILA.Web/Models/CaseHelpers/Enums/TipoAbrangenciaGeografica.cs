namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoAbrangenciaGeografica
    {
        public TipoAbrangenciaGeografica(string value)
        {
            Value = value;
        }

        public TipoAbrangenciaGeografica()
        {
            Value = "";
        }

        public string Value { get; set; }

        public TipoAbrangenciaGeografica Nacional() => new TipoAbrangenciaGeografica("Nacional");
        public TipoAbrangenciaGeografica Estadual() => new TipoAbrangenciaGeografica("Estadual");
        public TipoAbrangenciaGeografica Municipal() => new TipoAbrangenciaGeografica("Municipal");
        public TipoAbrangenciaGeografica Regional() => new TipoAbrangenciaGeografica("Regional");
    }
}