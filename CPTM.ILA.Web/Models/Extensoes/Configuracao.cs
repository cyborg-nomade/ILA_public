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
    
    public partial class Configuracao : BaseModel
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

        [DisplayName("Cadastrado por")]
        public Usuario CadastradoPor { get; set; }

        [DisplayName("Alterado por")]
        public Usuario AlteradoPor { get; set; }


        #endregion

        #region Filtro

        public class Filtro : Configuracao
        {
    
        }
    
        #endregion
    
    }
}

