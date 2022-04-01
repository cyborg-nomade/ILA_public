namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddARFilePath : DbMigration
    {
        public override void Up()
        {
            AddColumn("ILA.ILA_ACCESS_REQUESTS", "EmailSuperiorPath", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("ILA.ILA_ACCESS_REQUESTS", "EmailSuperiorPath");
        }
    }
}
