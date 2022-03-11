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
    
    public partial class Usuario : BaseModel
    {
        public Usuario()
        {
            this.Preferencias = new HashSet<UsuarioPreferencia>();
            this.CasisGrupos = new HashSet<CasisGrupoUsuario>();
        }
    
        public int UsuarioId { get; set; }
        public string UserName { get; set; }
        public string Nome { get; set; }
        public string Apelido { get; set; }
        public Nullable<int> MixId { get; set; }
        public string EmpresaNome { get; set; }
        public string Matricula { get; set; }
        public string MatriculaAntiga { get; set; }
        public string MatriculaAlternativa { get; set; }
        public string AreaSigla { get; set; }
        public string EstruturaOrganizacionalId { get; set; }
        public Nullable<System.DateTime> DataNascimento { get; set; }
        public Nullable<System.DateTime> DataAdmissao { get; set; }
        public Nullable<System.DateTime> DataDemissao { get; set; }
        public Nullable<System.DateTime> DataAtualizacao { get; set; }
        public Nullable<System.DateTime> DataExpiracao { get; set; }
        public Nullable<System.DateTime> DataDesligamentoTerceiro { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public Nullable<decimal> FuncionarioId { get; set; }
        public string FuncionarioTipoId { get; set; }
        public string FuncionarioTipoNome { get; set; }
        public string Site { get; set; }
        public string BilheteServico { get; set; }
        public Nullable<int> CargoId { get; set; }
        public string CargoNome { get; set; }
        public Nullable<int> FuncaoId { get; set; }
        public string FuncaoNome { get; set; }
        public string Sexo { get; set; }
        public string TelefoneComercial { get; set; }
        public string TelefoneCelular { get; set; }
        public string Fax { get; set; }
        public string Endereco { get; set; }
        public string CEP { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Email { get; set; }
        public Nullable<int> UsuarioGestorId { get; set; }
        public string StatusEmpregadoId { get; set; }
        public string StatusEmpregadoNome { get; set; }
        public Nullable<int> ChefePontoId { get; set; }
        public string TipoChefeNome { get; set; }
        public Nullable<short> Empregado { get; set; }
        public Nullable<short> Ativo { get; set; }
        public Nullable<short> AtivoAD { get; set; }
        public Nullable<short> AtivoNormativo { get; set; }
    
        public virtual ICollection<UsuarioPreferencia> Preferencias { get; set; }
        public virtual ICollection<CasisGrupoUsuario> CasisGrupos { get; set; }
    }
}

