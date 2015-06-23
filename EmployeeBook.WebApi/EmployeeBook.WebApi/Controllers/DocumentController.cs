using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using EmployeeBook.WebApi.DAL;
using EmployeeBook.WebApi.Models;

namespace EmployeeBook.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DocumentController : ApiController
    {
        private readonly EmployeeContext _db = new EmployeeContext();

        public IQueryable<CvDocument> GetDocuments()
        {
            return _db.CvDocuments;
        }

        [ResponseType(typeof(CvDocument))]
        public async Task<IHttpActionResult> GetCvDocument(int id)
        {
            var document = await _db.CvDocuments.FindAsync(id);

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDocument(int id, CvDocument document)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != document.Id)
            {
                return BadRequest();
            }

            _db.Entry(document).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(CvDocument))]
        public async Task<IHttpActionResult> PostDocument(CvDocument document)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.CvDocuments.Add(document);
            await _db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = document.Id }, document);
        }

        [ResponseType(typeof(Employee))]
        public async Task<IHttpActionResult> DeleteDocument(int id)
        {
            var document = await _db.CvDocuments.FindAsync(id);
            if (document == null)
            {
                return NotFound();
            }

            _db.CvDocuments.Remove(document);
            await _db.SaveChangesAsync();

            return Ok(document);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DocumentExists(int id)
        {
            return _db.CvDocuments.Count(d => d.Id == id) > 0;
        }
    }
}