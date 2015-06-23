namespace EmployeeBook.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDocumentColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CvDocument", "Document", c => c.Binary());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CvDocument", "Document");
        }
    }
}
