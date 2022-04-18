namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveCedilhaRetencao : DbMigration
    {
        public override void Up()
        {
            AddColumn("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "FonteRetencao_Value", c => c.String());
            DropColumn("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "FonteRetenção_Value");
        }
        
        public override void Down()
        {
            AddColumn("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "FonteRetenção_Value", c => c.String());
            DropColumn("ILA.ILA_ITEM_CAT_DADOS_PESSOAIS", "FonteRetencao_Value");
        }
    }
}
