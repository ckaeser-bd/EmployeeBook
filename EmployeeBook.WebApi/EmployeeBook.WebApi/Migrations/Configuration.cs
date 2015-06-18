using System.Collections.Generic;
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

            var employees = new List<Employee>
            {
                new Employee {FirstName = "Christian", LastName = "K�ser"},
                new Employee {FirstName = "Daniel", LastName = "Handschin"},
                new Employee {FirstName = "Michael ", LastName = "Seifried"},
                new Employee {FirstName = "J�rg", LastName = "Heimoz"},
            };

            employees.ForEach(e => context.Employees.Add(e));
            context.SaveChanges();

            var employee = employees.FirstOrDefault();
            if (employee != null) employee.CvDocuments.Add(new CvDocument{Name = "TestDok.docx"});

            context.SaveChanges();
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
{"LastName":"K�ser","FirstName":"Christian"}
{"LastName":"Handschin","FirstName":"Daniel"}
{"LastName":"AAAAA","FirstName":"BBBBB"}
{"LastName":"AAAAA","FirstName":"CCCCC"} 
{"LastName":"AAAAA","FirstName":"BCBCB"}

*/