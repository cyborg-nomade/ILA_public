namespace CPTM.ILA.Web.Models.CaseHelpers.Enums
{
    public class TipoFontesRetenção
    {
        public TipoFontesRetenção(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static TipoFontesRetenção DocPapel => new TipoFontesRetenção("Documento em Papel");
        public static TipoFontesRetenção DocEletronico => new TipoFontesRetenção("Documento Eletrônico");
        public static TipoFontesRetenção Sistema => new TipoFontesRetenção("Sistema");
    }
}