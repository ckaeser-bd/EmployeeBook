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
    public class EducationController : ApiController
    {
        private readonly EmployeeContext _db = new EmployeeContext();

        public IQueryable<Education> GetEducations()
        {
            return _db.Educations;
        }

        [ResponseType(typeof(Education))]
        public async Task<IHttpActionResult> GetEducation(int id)
        {
            var education = await _db.Educations.FindAsync(id);

            if (education == null)
            {
                return NotFound();
            }

            return Ok(education);
        }

        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEducation(int id, Education education)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != education.Id)
            {
                return BadRequest();
            }

            _db.Entry(education).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EducationExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(Education))]
        public async Task<IHttpActionResult> PostEducation(Education education)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Educations.Add(education);
            await _db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = education.Id }, education);
        }

        [ResponseType(typeof(Education))]
        public async Task<IHttpActionResult> DeleteEducation(int id)
        {
            var education = await _db.Educations.FindAsync(id);
            if (education == null)
            {
                return NotFound();
            }

            _db.Educations.Remove(education);
            await _db.SaveChangesAsync();

            return Ok(education);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EducationExists(int id)
        {
            return _db.Educations.Count(d => d.Id == id) > 0;
        }
    }
}