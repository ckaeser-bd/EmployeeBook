namespace EmployeeBook.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CvDocuments1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CvDocument", "Employee_Id", "dbo.Employee");
            DropIndex("dbo.CvDocument", new[] { "Employee_Id" });
            RenameColumn(table: "dbo.CvDocument", name: "Employee_Id", newName: "EmployeeId");
            AlterColumn("dbo.CvDocument", "EmployeeId", c => c.Int(nullable: false));
            CreateIndex("dbo.CvDocument", "EmployeeId");
            AddForeignKey("dbo.CvDocument", "EmployeeId", "dbo.Employee", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CvDocument", "EmployeeId", "dbo.Employee");
            DropIndex("dbo.CvDocument", new[] { "EmployeeId" });
            AlterColumn("dbo.CvDocument", "EmployeeId", c => c.Int());
            RenameColumn(table: "dbo.CvDocument", name: "EmployeeId", newName: "Employee_Id");
            CreateIndex("dbo.CvDocument", "Employee_Id");
            AddForeignKey("dbo.CvDocument", "Employee_Id", "dbo.Employee", "Id");
        }
    }
}
