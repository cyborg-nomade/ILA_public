using System.ComponentModel;

namespace CPTM.ILA.Web.ViewModels
{
    public class ControleViewModel
    {
        [DisplayName("Padrão")]
        public string Padrao { get; set; }

        [DisplayName("CEP")]
        public string CEP { get; set; }

        [DisplayName("CNPJ")]
        public string CNPJ { get; set; }

        [DisplayName("CPF")]
        public string CPF { get; set; }

        [DisplayName("Data (dd/MM/aaaa)")]
        public string Data { get; set; }

        [DisplayName("Dia/Mês (dd/MM)")]
        public string DiaMes { get; set; }

        [DisplayName("MêsAno (MM/aaaa)")]
        public string MesAno { get; set; }

        [DisplayName("Horário (HH:mm)")]
        public string Hora { get; set; }

        [DisplayName("Data/Hora (dd/MM/aaaa HH:mm)")]
        public string DataHora { get; set; }

        [DisplayName("Data Mínima/Máxima")]
        public string DataMinMax { get; set; }

        [DisplayName("Data Mínima Campo")]
        public string DataMinCampo { get; set; }

        [DisplayName("Data Máxima Campo")]
        public string DataMaxCampo { get; set; }

        [DisplayName("Telefone")]
        public string Telefone { get; set; }

        [DisplayName("Telefone com DDD")]
        public string TelefoneComDDD { get; set; }

        [DisplayName("Telefone com País e DDD")]
        public string TelefoneComPaisDDD { get; set; }

        [DisplayName("Telefone Celular")]
        public string TelefoneCelular { get; set; }

        [DisplayName("Telefone Celular com DDD")]
        public string TelefoneCelularComDDD { get; set; }

        [DisplayName("Nextel")]
        public string Nextel { get; set; }

        [DisplayName("Moeda")]
        public string Moeda { get; set; }

        [DisplayName("Ano/Sequencial4")]
        public string AnoSequencial4 { get; set; }

        [DisplayName("Ano/Sequencial6")]
        public string AnoSequencial6 { get; set; }

        [DisplayName("Ano/Sequencial8")]
        public string AnoSequencial8 { get; set; }

        [DisplayName("Numérico")]
        public string Numerico { get; set; }

        [DisplayName("Alfa")]
        public string Alfa { get; set; }

        [DisplayName("Alfa sem Espaco")]
        public string AlfaSemEspaco { get; set; }

        [DisplayName("Alfa sem caracter especial")]
        public string AlfaSemCaracterEspecial { get; set; }

        [DisplayName("Alfa sem caracter especial e sem espaço")]
        public string AlfaSemCaracterEspecialSemEspaco { get; set; }

        [DisplayName("E-mail")]
        public string Email { get; set; }

        [DisplayName("Endereco IP")]
        public string EnderecoIP { get; set; }

        [DisplayName("Alfanumérico")]
        public string AlfaNumerico { get; set; }

        [DisplayName("Alfanumérico sem espaço")]
        public string AlfaNumericoSemEspaco { get; set; }

        [DisplayName("Alfanumérico sem caracter especial")]
        public string AlfaNumericoSemCaracterEspecial { get; set; }

        [DisplayName("Alfanumérico sem caracter especial e sem espaço")]
        public string AlfaNumericoSemCaracterEspecialSemEspaco { get; set; }
        
        [DisplayName("TextArea")]
        public string TextArea { get; set; }

        [DisplayName("Placa de veículo")]
        public string PlacaVeiculo { get; set; }
	}
}
