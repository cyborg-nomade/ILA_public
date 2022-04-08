namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveCommentsListFromThreads : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("ILA.ILA_COMMENTS", "RefItem_Id", "ILA.ILA_ITEM_IDENTITIES");
            DropIndex("ILA.ILA_COMMENTS", new[] { "RefItem_Id" });
            AddColumn("ILA.ILA_COMMENTS", "RefItem", c => c.String());
            DropColumn("ILA.ILA_COMMENTS", "RefItem_Id");
            DropTable("ILA.ILA_ITEM_IDENTITIES");
        }
        
        public override void Down()
        {
            CreateTable(
                "ILA.ILA_ITEM_IDENTITIES",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 9, scale: 0, identity: true),
                        Identifier = c.String(),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("ILA.ILA_COMMENTS", "RefItem_Id", c => c.Decimal(precision: 9, scale: 0));
            DropColumn("ILA.ILA_COMMENTS", "RefItem");
            CreateIndex("ILA.ILA_COMMENTS", "RefItem_Id");
            AddForeignKey("ILA.ILA_COMMENTS", "RefItem_Id", "ILA.ILA_ITEM_IDENTITIES", "Id");
        }
    }
}
