namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeLogStructure : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("ILA.ILA_CHANGELOGS", "Case_Id", "ILA.ILA_CASES");
            DropForeignKey("ILA.ILA_ITEM_IDENTITIES", "ChangeLog_Id", "ILA.ILA_CHANGELOGS");
            DropForeignKey("ILA.ILA_CHANGELOGS", "User_Id", "ILA.ILA_USERS");
            DropIndex("ILA.ILA_CHANGELOGS", new[] { "Case_Id" });
            DropIndex("ILA.ILA_CHANGELOGS", new[] { "User_Id" });
            DropIndex("ILA.ILA_ITEM_IDENTITIES", new[] { "ChangeLog_Id" });
            AddColumn("ILA.ILA_CHANGELOGS", "UserId", c => c.Decimal(nullable: false, precision: 9, scale: 0));
            AddColumn("ILA.ILA_CHANGELOGS", "CaseId", c => c.Decimal(nullable: false, precision: 9, scale: 0));
            AddColumn("ILA.ILA_CHANGELOGS", "CaseDiff", c => c.String());
            DropColumn("ILA.ILA_CHANGELOGS", "Case_Id");
            DropColumn("ILA.ILA_CHANGELOGS", "User_Id");
            DropColumn("ILA.ILA_ITEM_IDENTITIES", "ChangeLog_Id");
        }
        
        public override void Down()
        {
            AddColumn("ILA.ILA_ITEM_IDENTITIES", "ChangeLog_Id", c => c.Decimal(precision: 9, scale: 0));
            AddColumn("ILA.ILA_CHANGELOGS", "User_Id", c => c.Decimal(precision: 9, scale: 0));
            AddColumn("ILA.ILA_CHANGELOGS", "Case_Id", c => c.Decimal(precision: 9, scale: 0));
            DropColumn("ILA.ILA_CHANGELOGS", "CaseDiff");
            DropColumn("ILA.ILA_CHANGELOGS", "CaseId");
            DropColumn("ILA.ILA_CHANGELOGS", "UserId");
            CreateIndex("ILA.ILA_ITEM_IDENTITIES", "ChangeLog_Id");
            CreateIndex("ILA.ILA_CHANGELOGS", "User_Id");
            CreateIndex("ILA.ILA_CHANGELOGS", "Case_Id");
            AddForeignKey("ILA.ILA_CHANGELOGS", "User_Id", "ILA.ILA_USERS", "Id");
            AddForeignKey("ILA.ILA_ITEM_IDENTITIES", "ChangeLog_Id", "ILA.ILA_CHANGELOGS", "Id");
            AddForeignKey("ILA.ILA_CHANGELOGS", "Case_Id", "ILA.ILA_CASES", "Id");
        }
    }
}
