namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoTempoRetencao
    {
        public TipoTempoRetencao(string value)
        {
            Value = value;
        }

        public TipoTempoRetencao()
        {
        }

        public string Value { get; private set; }

        public static TipoTempoRetencao Ano1() => new TipoTempoRetencao("1 ano");
        public static TipoTempoRetencao Ano5() => new TipoTempoRetencao("5 anos");
        public static TipoTempoRetencao Ano10() => new TipoTempoRetencao("10 anos");
        public static TipoTempoRetencao Ano15() => new TipoTempoRetencao("15 anos");
        public static TipoTempoRetencao Ano20() => new TipoTempoRetencao("20 anos");
    }
}