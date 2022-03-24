namespace CPTM.ILA.Web.Models
{
    public class TipoAbrangenciaGeografica
    {
        public TipoAbrangenciaGeografica(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public TipoAbrangenciaGeografica Nacional() => new TipoAbrangenciaGeografica("Nacional");
        public TipoAbrangenciaGeografica Estadual() => new TipoAbrangenciaGeografica("Estadual");
        public TipoAbrangenciaGeografica Municipal() => new TipoAbrangenciaGeografica("Municipal");
        public TipoAbrangenciaGeografica Regional() => new TipoAbrangenciaGeografica("Regional");
    }
}