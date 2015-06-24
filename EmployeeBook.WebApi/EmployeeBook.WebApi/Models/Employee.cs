using System.Collections.Generic;

namespace EmployeeBook.WebApi.Models
{
    public sealed class Employee
    {
        public Employee ()
        {
            Educations = new HashSet<Education>();
        }
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }

        public ICollection<Education> Educations { get; set; }
    }
}