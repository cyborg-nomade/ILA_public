namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class TipoCategoriaTitulares
    {
        public TipoCategoriaTitulares(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static TipoCategoriaTitulares Beneficiarios => new TipoCategoriaTitulares("Beneficiários");
        public static TipoCategoriaTitulares Clientes => new TipoCategoriaTitulares("Clientes");
        public static TipoCategoriaTitulares Contribuintes => new TipoCategoriaTitulares("Contribuintes");
        public static TipoCategoriaTitulares Dependentes => new TipoCategoriaTitulares("Dependentes");
        public static TipoCategoriaTitulares Eleitores => new TipoCategoriaTitulares("Eleitores");
        public static TipoCategoriaTitulares Empregados => new TipoCategoriaTitulares("Empregados");
        public static TipoCategoriaTitulares Estudantes => new TipoCategoriaTitulares("Estudantes");
        public static TipoCategoriaTitulares Motoristas => new TipoCategoriaTitulares("Motoristas");
        public static TipoCategoriaTitulares Pacientes => new TipoCategoriaTitulares("Pacientes");
        public static TipoCategoriaTitulares Pessoas => new TipoCategoriaTitulares("Pessoas");
        public static TipoCategoriaTitulares Servidores => new TipoCategoriaTitulares("Servidores");
        public static TipoCategoriaTitulares Outros => new TipoCategoriaTitulares("Outros (Especificar)");
    }
}