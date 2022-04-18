namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoFrequenciaTratamento
    {
        public TipoFrequenciaTratamento(string value)
        {
            Value = value;
        }

        public TipoFrequenciaTratamento()
        {
            Value = "";
        }

        public string Value { get; set; }

        public static TipoFrequenciaTratamento Total24por7() => new TipoFrequenciaTratamento("27/7");

        public static TipoFrequenciaTratamento HorarioOperacional() =>
            new TipoFrequenciaTratamento("Horário Operacional");

        public static TipoFrequenciaTratamento HorarioComercial() => new TipoFrequenciaTratamento("Horário Comercial");
    }
}