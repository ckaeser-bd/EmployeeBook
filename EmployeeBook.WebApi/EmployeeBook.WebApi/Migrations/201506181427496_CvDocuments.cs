namespace EmployeeBook.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CvDocuments : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CvDocument",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Employee_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employee", t => t.Employee_Id)
                .Index(t => t.Employee_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CvDocument", "Employee_Id", "dbo.Employee");
            DropIndex("dbo.CvDocument", new[] { "Employee_Id" });
            DropTable("dbo.CvDocument");
        }
    }
}
