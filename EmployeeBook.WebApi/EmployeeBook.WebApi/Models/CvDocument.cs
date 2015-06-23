using System.IO;

namespace EmployeeBook.WebApi.Models
{
    public class CvDocument
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Document { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
    }
}