using System.Collections.Generic;

namespace EmployeeBook.WebApi.Models
{
    public sealed class Employee
    {
        public Employee ()
        {
            CvDocuments = new HashSet<CvDocument>();
        }
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }

        public ICollection<CvDocument> CvDocuments { get; set; }
    }
}