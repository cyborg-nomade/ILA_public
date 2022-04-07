namespace CPTM.ILA.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeGroupsAndUsersInCaseToInt : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("ILA.ILA_CASES", "GrupoCriador_Id", "ILA.ILA_GROUPS");
            DropForeignKey("ILA.ILA_CASES", "UsuarioCriador_Id", "ILA.ILA_USERS");
            DropIndex("ILA.ILA_CASES", new[] { "GrupoCriador_Id" });
            DropIndex("ILA.ILA_CASES", new[] { "UsuarioCriador_Id" });
            AddColumn("ILA.ILA_CASES", "GrupoCriadorId", c => c.Decimal(nullable: false, precision: 9, scale: 0));
            AddColumn("ILA.ILA_CASES", "UsuarioCriadorId", c => c.Decimal(nullable: false, precision: 9, scale: 0));
            DropColumn("ILA.ILA_CASES", "GrupoCriador_Id");
            DropColumn("ILA.ILA_CASES", "UsuarioCriador_Id");
        }
        
        public override void Down()
        {
            AddColumn("ILA.ILA_CASES", "UsuarioCriador_Id", c => c.Decimal(precision: 9, scale: 0));
            AddColumn("ILA.ILA_CASES", "GrupoCriador_Id", c => c.Decimal(precision: 9, scale: 0));
            DropColumn("ILA.ILA_CASES", "UsuarioCriadorId");
            DropColumn("ILA.ILA_CASES", "GrupoCriadorId");
            CreateIndex("ILA.ILA_CASES", "UsuarioCriador_Id");
            CreateIndex("ILA.ILA_CASES", "GrupoCriador_Id");
            AddForeignKey("ILA.ILA_CASES", "UsuarioCriador_Id", "ILA.ILA_USERS", "Id");
            AddForeignKey("ILA.ILA_CASES", "GrupoCriador_Id", "ILA.ILA_GROUPS", "Id");
        }
    }
}
