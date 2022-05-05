namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrectGroupAccessExpirationsTableName : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "ILA.ILA_GROUP_ACCESS_REQUESTS", newName: "ILA_GROUP_ACCESS_EXPIRATIONS");
        }
        
        public override void Down()
        {
            RenameTable(name: "ILA.ILA_GROUP_ACCESS_EXPIRATIONS", newName: "ILA_GROUP_ACCESS_REQUESTS");
        }
    }
}
