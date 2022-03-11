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

    public partial class Produto : BaseModel
    {
        #region Sequence

        public static string Sequence
        {
            get
            {
                return "ILA_SQ_PRODUTO";
            }
        }

        #endregion

        #region Propriedades

        [DisplayName("Cadastrado por")]
        public Usuario CadastradoPor { get; set; }

        [DisplayName("Alterado por")]
        public Usuario AlteradoPor { get; set; }

        public string AtivoImagem
        {
            get
            {
                return this.Ativo == 1 ? "<i class='fa fa-check' style='color:green'></i>" : "<i class='fa fa-close' style='color:red'></i>";
            }
        }


        #endregion

        #region Filtro

        public class Filtro : Produto
        {
            public Filtro()
            {
                this.CadastradoPor = new Usuario();
                this.Ativo = -1;
            }

            [DisplayName("Valor Inicial")]
            public decimal ValorInicial { get; set; }

            [DisplayName("Valor Final")]
            public decimal ValorFinal { get; set; }

            [DisplayName("Categorias")]
            public short[] CategoriaIds { get; set; }

            [DisplayName("Unidade de Medida")]
            public short[] UnidadeMedidaIds { get; set; }

            [DisplayName("Cadastrado Por")]
            public string CadastradoPorUserName { get; set; }

        }

        #endregion

    }
}

