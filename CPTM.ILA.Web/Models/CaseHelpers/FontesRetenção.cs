namespace CPTM.ILA.Web.Models.CaseHelpers
{
    public class FontesRetenção
    {
        public FontesRetenção(string value)
        {
            Value = value;
        }

        public string Value { get; private set; }

        public static FontesRetenção Na => new FontesRetenção("Não se aplica");
        public static FontesRetenção DocPapel => new FontesRetenção("Documento em Papel");
        public static FontesRetenção MidiaEletronica => new FontesRetenção("Mídias Eletrônicas");

        public static FontesRetenção DocPapelMidiasEletronica =>
            new FontesRetenção("Documento em Papel e Mídias Eletrônicas");
    }
}