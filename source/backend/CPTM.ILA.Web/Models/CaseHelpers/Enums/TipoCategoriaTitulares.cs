namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoCategoriaTitulares
    {
        public TipoCategoriaTitulares(string value)
        {
            Value = value;
        }

        public TipoCategoriaTitulares()
        {
            Value = "";
        }

        public string Value { get; set; }

        public static TipoCategoriaTitulares Colaboradores() => new TipoCategoriaTitulares("Colaboradores");
        public static TipoCategoriaTitulares Dependentes() => new TipoCategoriaTitulares("Dependentes");
        public static TipoCategoriaTitulares Clientes() => new TipoCategoriaTitulares("Clientes");

        public static TipoCategoriaTitulares EmpregadosTerceirizados() =>
            new TipoCategoriaTitulares("Empregados Terceirizados");

        public static TipoCategoriaTitulares Outros() => new TipoCategoriaTitulares("Outros");
    }
}