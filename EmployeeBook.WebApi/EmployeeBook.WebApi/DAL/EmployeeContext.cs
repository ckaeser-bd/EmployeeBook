using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using EmployeeBook.WebApi.Models;

namespace EmployeeBook.WebApi.DAL
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext() : base("EmployeeContext")
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Education> Educations { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}