namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveUserFromGroups : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("ILA.ILA_USERS", "Group_Id", "ILA.ILA_GROUPS");
            DropIndex("ILA.ILA_USERS", new[] { "Group_Id" });
            DropColumn("ILA.ILA_USERS", "Group_Id");
        }
        
        public override void Down()
        {
            AddColumn("ILA.ILA_USERS", "Group_Id", c => c.Decimal(precision: 9, scale: 0));
            CreateIndex("ILA.ILA_USERS", "Group_Id");
            AddForeignKey("ILA.ILA_USERS", "Group_Id", "ILA.ILA_GROUPS", "Id");
        }
    }
}
