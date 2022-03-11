//-----------------------------------------------------------------------------------------------------------------------
// <CPTM>
//
//  Este codigo foi gerado automaticamente por um template.
//
//  Apos a geracao dos arquivos de extensao, altere o atributo Custom Tool de "TextTemplatingFileGenerator" para 
//  "TextTemplatingFileGenerator_" nas propriedades do arquivo Extensoes\ILAContext.tt.
//
//  Caso essa alteracao nao seja realizada, o template podera sobreescrever qualquer alteracao se o codigo for regerado.
//
// <CPTM>
//-----------------------------------------------------------------------------------------------------------------------

namespace CPTM.ILA.Web.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using CPTM.Comum.Web;
    
    public partial class Usuario : BaseModel
    {   
        #region Sequence
    
        public static string Sequence 
        {
            get 
            {
                return string.Empty;
            }
        }

        #endregion

        #region Propriedades

        public byte[] Foto { get; set; }

        [DisplayName("Endere�o")]
        public string EnderecoCompleto
        {
            get
            {
                return $"{this.Endereco} - {this.Cidade} / {this.Estado} - {this.CEP}";
            }
        }

        public string UsuarioGestorNome { get; set; }

        public string UsuarioGestorLogin { get; set; }

        [DisplayName("Ativo")]
        public string AtivoNome
        {
            get
            {
                return this.Ativo == 1 ? "Sim" : "N�o";
            }
        }

        [DisplayName("Ativo Rede")]
        public string AtivoADNome
        {
            get
            {
                return this.AtivoAD == 1 ? "Sim" : "N�o";
            }
        }

        #endregion

        #region Filtro

        public class Filtro : Usuario
        {
            #region Propriedades

            public string NomeUsuario { get; set; }
            public decimal CasisGrupoId { get; set; }
            public bool SomenteUsuarioAplicacao { get; set; }

            #endregion
        }

        #endregion
    }
}

