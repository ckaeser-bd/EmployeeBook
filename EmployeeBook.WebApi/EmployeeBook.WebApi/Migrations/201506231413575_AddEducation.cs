namespace EmployeeBook.WebApi.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class AddEducation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Education",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Start = c.DateTime(nullable: false),
                        End = c.DateTime(nullable: false),
                        EmployeeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employee", t => t.EmployeeId, cascadeDelete: true)
                .Index(t => t.EmployeeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Education", "EmployeeId", "dbo.Employee");
            DropIndex("dbo.Education", new[] { "EmployeeId" });
            DropTable("dbo.Education");
        }
    }
}
