using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeBook.WebApi.Models
{
    public class CvDocument
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
    }
}