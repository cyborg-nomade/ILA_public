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
    
    public partial class EstruturaOrganizacional : BaseModel
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

        [DisplayName("Ativo")]
        public string AtivoNome
        {
            get
            {
                return (this.Ativo ?? 0) == 1 ? "Sim" : "N�o";
            }
        }

        #endregion

        #region Filtro

        public class Filtro : EstruturaOrganizacional
        {
            [DisplayName("Diretoria")]
            public string[] DiretoriaSiglas { get; set; }

            [DisplayName("Ger�ncia Geral")]
            public string[] GerenciaGeralSiglas { get; set; }

            [DisplayName("Ger�ncia")]
            public string[] GerenciaSiglas { get; set; }

            [DisplayName("Departamento")]
            public string[] DepartamentoSiglas { get; set; }
        }
    
        #endregion
    
    }
}

