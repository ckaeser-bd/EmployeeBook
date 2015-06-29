using System;
using System.Data.Entity.Migrations;
using System.Linq;
using EmployeeBook.WebApi.DAL;
using EmployeeBook.WebApi.Models;

namespace EmployeeBook.WebApi.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<EmployeeContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EmployeeContext context)
        {
            //if (System.Diagnostics.Debugger.IsAttached == false)
            //    System.Diagnostics.Debugger.Launch();
            context.Employees.AddOrUpdate(x => x.Id,
                new Employee {Id = 1, FirstName = "Christian", LastName = "Käser"},
                new Employee {Id = 2, FirstName = "Daniel", LastName = "Handschin"},
                new Employee {Id = 3, FirstName = "Michael ", LastName = "Seifried"},
                new Employee {Id = 4, FirstName = "Jörg", LastName = "Heimoz"}
                );

            context.SaveChanges();
            var employee = context.Employees.FirstOrDefault();
            context.Educations.AddOrUpdate(x => x.Id,
                new Education
                {
                    Employee = employee,
                    Name = "Test1",
                    Start = DateTime.Today.AddYears(-10),
                    End = DateTime.Today.AddYears(-5)
                },
                new Education
                {
                    Employee = employee,
                    Name = "Test2",
                    Start = DateTime.Today.AddYears(-5),
                    End = DateTime.Today.AddYears(-3)
                },
                new Education
                {
                    Employee = employee,
                    Name = "Test3",
                    Start = DateTime.Today.AddYears(-2),
                    End = DateTime.Today.AddYears(-1)
                }
                );
        }
    }
}

/*
Fiddler:
-----------------------------------------------------------
Post http://employeewebapi.azurewebsites.net/api/employee/
-----------------------------------------------------------
User-Agent: Fiddler
Host: employeewebapi.azurewebsites.net
Content-Type: application/json
Content-Length: 45
----------------------------------------------------------
{"LastName":"Käser","FirstName":"Christian"}
{"LastName":"Handschin","FirstName":"Daniel"}
{"LastName":"AAAAA","FirstName":"BBBBB"}
{"LastName":"AAAAA","FirstName":"CCCCC"} 
{"LastName":"AAAAA","FirstName":"BCBCB"}

*/