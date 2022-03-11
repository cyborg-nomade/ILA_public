//-----------------------------------------------------------------------------------------------------------------------
// <CPTM>
//
//  Este codigo foi gerado automaticamente por um template e não pode ser alterado.
//
// <CPTM>
//-----------------------------------------------------------------------------------------------------------------------

namespace CPTM.ILA.Web.Models
{
    using System;
    using System.Collections.Generic;
    using CPTM.Comum.Web;
    
    public partial class EstruturaOrganizacional : BaseModel
    {
        public string EstruturaOrganizacionalId { get; set; }
        public string Nome { get; set; }
        public string NomeReduzido { get; set; }
        public string Logradouro { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string CentroCusto { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string EnderecoCompleto { get; set; }
        public string Sigla { get; set; }
        public Nullable<decimal> Nivel { get; set; }
        public string DepartamentoSigla { get; set; }
        public string GerenciaSigla { get; set; }
        public string GerenciaGeralSigla { get; set; }
        public string DiretoriaSigla { get; set; }
        public Nullable<decimal> Ativo { get; set; }
    }
}

